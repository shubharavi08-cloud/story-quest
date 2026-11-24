/* Kitty Party Circle — core helpers shared by every page */
window.KP = window.KP || {};
(() => {
const KP = window.KP;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ic = (n, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* ---------- storage (this phone only) ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('kp_' + k); return v == null ? d : JSON.parse(v) } catch (e) { return d } },
  set(k, v) { try { localStorage.setItem('kp_' + k, JSON.stringify(v)); return true } catch (e) { return false } },
  del(k) { try { localStorage.removeItem('kp_' + k) } catch (e) {} }
};
/* IndexedDB for photos */
const idb = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((res, rej) => {
      try {
        const r = indexedDB.open('kitty-photos', 1);
        r.onupgradeneeded = () => { const d = r.result; if (!d.objectStoreNames.contains('photos')) { const s = d.createObjectStore('photos', { keyPath: 'id' }); s.createIndex('album', 'album') } };
        r.onsuccess = () => { this.db = r.result; res(this.db) };
        r.onerror = () => rej(r.error);
      } catch (e) { rej(e) }
    });
  },
  async tx(mode, fn) { const d = await this.open(); return new Promise((res, rej) => { const t = d.transaction('photos', mode); const s = t.objectStore('photos'); const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error) }) },
  put(p) { return this.tx('readwrite', s => s.put(p)) },
  del(id) { return this.tx('readwrite', s => s.delete(id)) },
  async all() { const d = await this.open(); return new Promise((res, rej) => { const r = d.transaction('photos').objectStore('photos').getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => rej(r.error) }) }
};

/* ---------- language ---------- */
KP.L = store.get('lang', 'kn');
const t = (k, ...a) => { const v = (KP.W[KP.L] || {})[k] ?? KP.W.en[k]; if (v == null) return '⟦' + k + '⟧'; return typeof v === 'function' ? v(...a) : v };
const tx = o => o == null ? '' : typeof o === 'string' ? o : (o[KP.L] ?? o.en ?? '');
const applyWords = (root = document) => {
  document.documentElement.lang = KP.L;
  $$('[data-t]', root).forEach(e => { const v = t(e.dataset.t); if (typeof v === 'string') e.textContent = v });
  $$('[data-tp]', root).forEach(e => e.placeholder = t(e.dataset.tp));
  $$('.langBtn', root).forEach(lb => lb.textContent = KP.L === 'kn' ? 'English' : 'ಕನ್ನಡ');
};

/* ---------- dates ---------- */
const pad = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parseISO = s => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) };
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d };
const fmtDate = (v, opt = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) => { const d = typeof v === 'string' ? parseISO(v) : v; if (!d) return ''; try { return d.toLocaleDateString(KP.L === 'kn' ? 'kn-IN' : 'en-IN', opt) } catch (e) { return iso(d) } };
const fmtShort = v => fmtDate(v, { day: 'numeric', month: 'short' });
const fmtTime = v => { if (!v) return ''; const [h, m] = v.split(':').map(Number); const hm = ((h % 12) || 12) + ':' + pad(m); return KP.L === 'kn' ? (h < 12 ? 'ಬೆಳಿಗ್ಗೆ ' : h < 16 ? 'ಮಧ್ಯಾಹ್ನ ' : h < 19 ? 'ಸಂಜೆ ' : 'ರಾತ್ರಿ ') + hm : hm + (h < 12 ? ' am' : ' pm') };
const daysUntil = d => Math.round((d - today()) / 86400000);
/* next yearly occurrence of a MM-DD */
const nextYearly = md => { if (!md) return null; const [m, d] = md.split('-').map(Number); const t0 = today(); let x = new Date(t0.getFullYear(), m - 1, d); if (x < t0) x = new Date(t0.getFullYear() + 1, m - 1, d); return x };

/* ---------- links & sharing ---------- */
const isWeb = /^https?:/.test(location.protocol) && !/claude|anthropic|usercontent/.test(location.host);
const APP_URL = isWeb ? location.origin + location.pathname.replace(/index\.html$/, '') : '';
const b64e = o => { const s = unescape(encodeURIComponent(JSON.stringify(o))); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') };
const b64d = s => { try { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return JSON.parse(decodeURIComponent(escape(atob(s)))) } catch (e) { return null } };
const cleanPhone = p => { let d = String(p || '').replace(/\D/g, ''); if (d.length === 10) d = '91' + d; if (d.length === 11 && d[0] === '0') d = '91' + d.slice(1); return d };
const waLink = (text, phone) => 'https://wa.me/' + (phone ? cleanPhone(phone) : '') + '?text=' + encodeURIComponent(text);
const copyText = async s => { try { await navigator.clipboard.writeText(s); toast(t('copied')); return true } catch (e) { toast(t('copyFail')); return false } };
const shareFile = async (blob, name, text) => {
  try { const f = new File([blob], name, { type: blob.type }); if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], text: text || '' }); return 'shared' } } catch (e) { if (e && e.name === 'AbortError') return 'cancel' }
  try { const u = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); return 'downloaded' } catch (e) { return 'fail' }
};
const loadScript = src => new Promise((res, rej) => { if ($(`script[src="${src}"]`)) return res(); const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s) });

/* ---------- UI bits ---------- */
const toast = m => { const e = $('#toast'); e.textContent = m; e.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => e.classList.remove('on'), 2200) };
const dlg = {
  open(html, onClose) { const d = $('#dlg'); $('#dlgSheet').innerHTML = html; d.classList.add('on'); this.onClose = onClose; const f = $('#dlgSheet').querySelector('input,select,textarea,button'); if (f) setTimeout(() => { try { f.focus({ preventScroll: true }) } catch (e) {} }, 50); return $('#dlgSheet') },
  close() { $('#dlg').classList.remove('on'); $('#dlgSheet').innerHTML = ''; if (this.onClose) { const f = this.onClose; this.onClose = null; f() } }
};
document.addEventListener('click', e => { if (e.target.id === 'dlg') dlg.close(); if (e.target.closest('[data-close]')) dlg.close() });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#dlg').classList.contains('on')) dlg.close() });
const ask = (title, body, yes, yesLabel) => {
  const s = dlg.open(`<h3>${esc(title)}</h3><p>${esc(body)}</p><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('no'))}</button><button class="btn wine" id="askYes" type="button">${esc(yesLabel || t('yes'))}</button></div>`);
  $('#askYes', s).onclick = () => { dlg.close(); yes() };
};
const empty = (icon, text) => `<div class="empty">${ic(icon)}<div>${esc(text)}</div></div>`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const initials = n => String(n || '?').trim().split(/\s+/).map(w => [...w][0] || '').slice(0, 2).join('').toUpperCase();
const lotusDivider = () => `<div class="divider"><svg viewBox="0 0 64 40"><use href="#i-lotus"/></svg></div>`;

/* ---------- sound & voice ---------- */
const beep = (f, d) => { try { const a = beep.ctx || (beep.ctx = new (window.AudioContext || window.webkitAudioContext)()); const o = a.createOscillator(), g = a.createGain(); o.frequency.value = f; o.connect(g); g.connect(a.destination); g.gain.setValueAtTime(.22, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + d); o.start(); o.stop(a.currentTime + d) } catch (e) {} };
const chime = () => { beep(660, .15); setTimeout(() => beep(880, .2), 150); setTimeout(() => beep(1175, .35), 320) };
const speak = (textKn, textEn) => { try { const s = window.speechSynthesis; if (!s) return; s.cancel(); const vs = s.getVoices(); const kv = vs.find(v => /^kn/i.test(v.lang)); const useKn = KP.L === 'kn' && kv && textKn; const u = new SpeechSynthesisUtterance(useKn ? textKn : textEn); u.lang = useKn ? 'kn-IN' : 'en-IN'; u.rate = .88; const v = useKn ? kv : vs.find(v => /en.IN/i.test(v.lang)); if (v) u.voice = v; s.speak(u) } catch (e) {} };

/* ---------- reusable timer ---------- */
function makeTimer(el, secs, onEnd) {
  const C = 263.9; let id = null, end = 0, left = secs, total = secs, last = 0;
  el.innerHTML = `<div class="timer"><div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" stroke="#F1E1BE" stroke-width="9" fill="none"/><circle class="arc" cx="50" cy="50" r="42" stroke="#650B32" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="0"/></svg><b class="tl">${secs}</b></div><div class="row"><button class="btn wine sm tgo" type="button">${esc(t('start'))}</button><button class="btn ghost sm treset" type="button">${esc(t('reset'))}</button></div></div>`;
  const arc = $('.arc', el), tl = $('.tl', el), go = $('.tgo', el);
  const draw = () => { tl.textContent = Math.ceil(left); arc.style.strokeDashoffset = C * (1 - left / total) };
  const tick = () => { left = Math.max(0, (end - Date.now()) / 1000); draw(); const c = Math.ceil(left); if (left <= 5 && left > 0 && c !== last) { last = c; beep(660, .08) } if (left <= 0) { stop(); beep(440, .8); toast(t('timeUp')); onEnd && onEnd() } };
  const start = () => { if (id) return; end = Date.now() + left * 1000; id = setInterval(tick, 150); go.textContent = t('pause'); beep(880, .08) };
  const stop = () => { clearInterval(id); id = null; go.textContent = t('start') };
  const reset = (s) => { stop(); if (s) total = s; left = total; draw() };
  go.onclick = () => id ? stop() : start(); $('.treset', el).onclick = () => reset();
  return { start, stop, reset, get running() { return !!id } };
}

/* ---------- scoreboard (teams or players) ---------- */
function makeScores(el, key, defaults, opts = {}) {
  let S = store.get('score_' + key, null) || { names: defaults.slice(), pts: defaults.map(() => 0), turn: 0 };
  const save = () => store.set('score_' + key, S);
  const draw = () => {
    el.innerHTML = `<div class="teams">${S.names.map((n, i) => `<div class="team ${opts.turns && S.turn === i ? 'turn' : ''}"><input data-i="${i}" value="${esc(n)}" aria-label="${esc(t('teamName'))}"><div class="pts">${S.pts[i]}</div><div class="row"><button class="btn ghost sm" data-m="${i}" type="button" aria-label="-1">−</button><button class="btn sm" data-p="${i}" type="button">+${opts.step || 1}</button></div></div>`).join('')}</div>
      <div class="row" style="margin-top:10px">${opts.turns ? `<button class="btn ghost sm" data-next type="button">${esc(t('nextTurn'))}</button>` : ''}<button class="btn ghost sm" data-add type="button">${ic('plus')}${esc(t('addTeam'))}</button><button class="btn ghost sm" data-rm type="button" ${S.names.length <= 2 ? 'disabled' : ''}>${esc(t('removeTeam'))}</button><button class="btn ghost sm" data-zero type="button">${esc(t('resetScores'))}</button><button class="btn gold sm" data-win type="button">${ic('trophy')}${esc(t('showWinner'))}</button></div>`;
  };
  el.addEventListener('input', e => { const i = e.target.dataset.i; if (i != null) { S.names[+i] = e.target.value; save() } });
  el.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.p != null) { S.pts[+b.dataset.p] += (opts.step || 1); beep(990, .07) }
    else if (b.dataset.m != null) { S.pts[+b.dataset.m] = Math.max(0, S.pts[+b.dataset.m] - (opts.step || 1)) }
    else if (b.hasAttribute('data-next')) S.turn = (S.turn + 1) % S.names.length;
    else if (b.hasAttribute('data-add')) { S.names.push(t('team') + ' ' + (S.names.length + 1)); S.pts.push(0) }
    else if (b.hasAttribute('data-rm')) { if (S.names.length > 2) { S.names.pop(); S.pts.pop(); S.turn %= S.names.length } }
    else if (b.hasAttribute('data-zero')) { ask(t('resetScoresQ'), t('resetScoresB'), () => { S.pts = S.names.map(() => 0); S.turn = 0; save(); draw() }); return }
    else if (b.hasAttribute('data-win')) { api.announce(); return }
    else return;
    save(); draw();
  });
  const api = {
    add(i, n = opts.step || 1) { S.pts[i] += n; save(); draw() },
    get turn() { return S.turn }, next() { S.turn = (S.turn + 1) % S.names.length; save(); draw() },
    get names() { return S.names }, get pts() { return S.pts },
    announce() { const max = Math.max(...S.pts); if (max <= 0) { toast(t('noScoresYet')); return } const w = S.names.filter((n, i) => S.pts[i] === max); winner(w.join(' & '), t('pointsN', max)) }
  };
  draw(); return api;
}

/* ---------- winner celebration ---------- */
function winner(name, sub) {
  const w = document.createElement('div'); w.className = 'winner';
  w.innerHTML = `<canvas></canvas><div class="card"><svg class="corner tl"><use href="#i-corner"/></svg><svg class="corner br"><use href="#i-corner"/></svg><div class="ic" style="margin:0 auto 8px;width:56px;height:56px;background:var(--gold-soft)">${ic('trophy')}</div><p class="muted" style="margin:0">${esc(t('winnerIs'))}</p><h2>${esc(name)}</h2><p>${esc(sub || '')}</p><button class="btn wine" type="button">${esc(t('close'))}</button></div>`;
  document.body.appendChild(w); chime();
  const close = () => { w.remove() }; w.querySelector('button').onclick = close;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = w.querySelector('canvas'), x = c.getContext('2d'); const W = c.width = innerWidth, H = c.height = innerHeight;
  const cols = ['#D6AD62', '#B21F58', '#087F73', '#FFF7ED', '#650B32'];
  const P = Array.from({ length: 140 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * .5, r: 3 + Math.random() * 5, vy: 2 + Math.random() * 3, vx: -1 + Math.random() * 2, c: pick(cols), a: Math.random() * 6 }));
  let n = 0; const step = () => { if (!w.isConnected || n++ > 260) return; x.clearRect(0, 0, W, H); P.forEach(p => { p.y += p.vy; p.x += p.vx + Math.sin((p.a += .05)) * .6; x.fillStyle = p.c; x.beginPath(); x.ellipse(p.x, p.y, p.r, p.r * .6, p.a, 0, 7); x.fill() }); requestAnimationFrame(step) }; step();
}

/* ---------- install guide ---------- */
const UA = navigator.userAgent || '';
const isIOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const iosOther = isIOS && /CriOS|FxiOS|EdgiOS/.test(UA);
let deferredInstall = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e });
const isStandalone = () => { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone } catch (e) { return false } };
async function install() {
  if (deferredInstall) { deferredInstall.prompt(); try { await deferredInstall.userChoice } catch (e) {} deferredInstall = null; return }
  const k = isIOS ? (iosOther ? 'gIosChrome' : 'gIos') : 'gAndroid';
  $('#gTitle').textContent = t('gTitle'); $('#gSteps').innerHTML = t(k).map(x => `<li>${esc(x)}</li>`).join(''); $('#gNote').textContent = t('gNote'); $('#gClose').textContent = t('gOk');
  const a = $('#gArrow'); const down = isIOS && !iosOther; a.classList.toggle('down', down); a.classList.toggle('up', !down); $('#guide').hidden = false;
}

/* ---------- image helpers ---------- */
const fileToJpeg = (file, max = 1600, q = .82) => new Promise((res, rej) => {
  const r = new FileReader(); r.onerror = rej;
  r.onload = () => { const img = new Image(); img.onerror = rej; img.onload = () => { const s = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); c.toBlob(b => b ? res(b) : rej(new Error('blob')), 'image/jpeg', q) }; img.src = r.result };
  r.readAsDataURL(file);
});
const blobToDataURL = b => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b) });

/* ---------- activity log (home "recent") ---------- */
const log = (kn, en) => { const L = store.get('log', []); L.unshift({ at: Date.now(), kn, en }); store.set('log', L.slice(0, 20)) };

/* inline copy of an icon (so invitation pictures keep their decoration) */
const svgInline = (id, cls = '', style = '') => { const sy = document.getElementById('i-' + id); if (!sy) return ''; return `<svg class="${cls}" viewBox="${sy.getAttribute('viewBox')}" ${style ? `style="${style}"` : ''} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${sy.innerHTML}</svg>` };
const ptitle = (title, sub) => `<div class="ptitle"><h1>${esc(title)}</h1><div class="lotus-div"><svg viewBox="0 0 64 40"><use href="#i-lotus"/></svg></div>${sub ? `<p class="muted">${esc(sub)}</p>` : ''}</div>`;
const ornate = inner => `<div class="ornate-wrap"><svg class="arch" viewBox="0 0 170 25" style="--archfill:#7B1342"><use href="#i-arch"/></svg><div class="ornate"><svg class="mc tl"><use href="#i-mandala2"/></svg><svg class="mc tr"><use href="#i-mandala2"/></svg><svg class="mc ml"><use href="#i-mandala2"/></svg><svg class="mc mr"><use href="#i-mandala2"/></svg>${inner}<div class="o-band"></div></div></div>`;
const mandC = () => `<svg class="mand-c tr" aria-hidden="true"><use href="#i-mandala2"/></svg>`;
Object.assign(KP, { ptitle, ornate, mandC, svgInline, $, $$, esc, ic, store, idb, t, tx, applyWords, pad, iso, parseISO, today, fmtDate, fmtShort, fmtTime, daysUntil, nextYearly, isWeb, APP_URL, b64e, b64d, cleanPhone, waLink, copyText, shareFile, loadScript, toast, dlg, ask, empty, pick, shuffle, uid, initials, lotusDivider, beep, chime, speak, makeTimer, makeScores, winner, install, isStandalone, fileToJpeg, blobToDataURL, log });
})();
