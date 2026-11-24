/* Kitty Party Circle — Games library */
(() => {
const KP = window.KP, C = KP.C, D = KP.D;
const { $, $$, esc, ic, store, t, tx, toast, dlg, ask, empty, pick, shuffle, uid, beep, chime, speak, makeTimer, makeScores, winner, log } = KP;

let active = null; // cleanup hook for the open game
KP.renderGames = (el, sub) => {
  if (active) { try { active() } catch (e) {} active = null }
  const g = C.GAME_LIST.find(x => x.id === sub);
  if (!g) {
    el.innerHTML = KP.ptitle(t('gamesTitle'), t('gamesSub')) + `<div class="rgrid">${C.GAME_LIST.map(x => `<a class="rtile" href="#game-${x.id}"><svg class="mc"><use href="#i-mandala2"/></svg><span class="ri">${ic(x.icon)}</span><i></i><span><b>${esc(x[KP.L][0])}</b><span>${esc(x[KP.L][1])}</span></span>${ic('right', 'chev')}</a>`).join('')}</div>`;
    el.onclick = null; el.oninput = null; el.onchange = null; return;
  }
  el.innerHTML = `<div class="game-head"><a class="btn ghost sm icon" href="#games" aria-label="${esc(t('allGames'))}">${ic('left')}</a><h2>${esc(g[KP.L][0])}</h2></div><div id="gameBody"></div>`;
  el.onclick = null; el.oninput = null; el.onchange = null;
  const body = $('#gameBody', el);
  ({ housie: Housie, draw: LuckyDraw, wheel: Wheel, gk: q => Quiz(q, 'gk'), film: q => Quiz(q, 'film'), pic: q => Quiz(q, 'pic'), song: Song, antakshari: Antakshari, memory: Memory, words: Words, rapid: Rapid, team: TeamGames })[g.id](body);
  log('ಆಟ: ' + g.kn[0], 'Played: ' + g.en[0]);
};
const names = () => D.members().map(m => m.name);
const howTo = key => `<details class="card" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:600;color:var(--wine)">${esc(t('howToPlay'))}</summary><p class="small" style="margin:8px 0 0">${esc(t(key))}</p></details>`;

/* ================= HOUSIE ================= */
const hashStr = s => { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19 } h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return (h ^ h >>> 16) >>> 0 };
const rng = seed => { let a = hashStr(seed); return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296 } };
const norm = s => s.trim().toLowerCase().replace(/\s+/g, ' ');
function makeTicket(code, name, game) {
  const r = rng(norm(code) + '|' + norm(name) + '|' + game);
  const sh = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a };
  let rows; for (;;) { rows = [0, 1, 2].map(() => sh([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 5)); const cnt = Array(9).fill(0); rows.flat().forEach(c => cnt[c]++); if (cnt.every(x => x >= 1)) break }
  const T = [0, 1, 2].map(() => Array(9).fill(0));
  for (let c = 0; c < 9; c++) { const lo = c === 0 ? 1 : c * 10, hi = c === 8 ? 90 : c * 10 + 9; const pool = []; for (let n = lo; n <= hi; n++) pool.push(n); const rs = [0, 1, 2].filter(i => rows[i].includes(c)); const nums = sh(pool).slice(0, rs.length).sort((a, b) => a - b); rs.forEach((ri, k) => T[ri][c] = nums[k]) }
  return T;
}
KP.makeTicket = makeTicket;
const ticketHTML = (T, cls) => T.flat().map(n => n ? `<button type="button" class="${cls(n)}" data-n="${n}">${n}</button>` : '<div></div>').join('');
const PKEYS = ['early', 'top', 'mid', 'bot', 'corners', 'full'];
const prizeCheck = (T, has) => { const r = T.map(row => row.filter(Boolean)); const all = r.flat(); return [all.filter(has).length >= 5, r[0].every(has), r[1].every(has), r[2].every(has), [r[0][0], r[0][4], r[2][0], r[2][4]].every(has), all.every(has)] };
const phraseKn = n => { const KU = ['ಸೊನ್ನೆ', 'ಒಂದು', 'ಎರಡು', 'ಮೂರು', 'ನಾಲ್ಕು', 'ಐದು', 'ಆರು', 'ಏಳು', 'ಎಂಟು', 'ಒಂಬತ್ತು']; const s = n < 10 ? C.knNum(n) : String(n).split('').map(d => KU[+d]).join(' ') + ', ' + C.knNum(n); return (C.CALLS_KN[n] ? C.CALLS_KN[n] + ' — ' : '') + s };
const phraseEn = n => { const s = n < 10 ? 'Single number ' + n : String(n).split('').join(' and ') + ', ' + n; return (C.CALLS_EN[n] ? C.CALLS_EN[n] + ' — ' : '') + s };
const phraseOf = n => KP.L === 'kn' ? phraseKn(n) : phraseEn(n);
let fsKind = null;
function Housie(el) {
  const defCode = () => { const c = D.cal()[KP.currentTurnIdx()]; return (((c && c.host) || 'KITTY').replace(/[^a-z]/gi, '').slice(0, 5).toUpperCase() || 'KITTY') + (c ? c.m + 1 : '') };
  let H = store.get('host2', null) || { code: defCode(), game: '1', called: [], prizes: {}, voice: true };
  let P = store.get('player', null);
  let mode = store.get('mode', 'host');
  const saveH = () => store.set('host2', H);
  const mkKey = () => 'marks_' + P.code + '|' + norm(P.name) + '|' + P.game;
  el.innerHTML = `<div class="seg" style="margin-bottom:14px"><button type="button" data-mode="host">${esc(t('modeHost'))}</button><button type="button" data-mode="play">${esc(t('modePlay'))}</button></div><div id="hz"></div>`;
  const hz = $('#hz', el);
  const drawMode = () => { $$('[data-mode]', el).forEach(b => b.classList.toggle('on', b.dataset.mode === mode)); store.set('mode', mode); mode === 'host' ? drawHost() : drawPlayer() };
  function drawHost() {
    const set = new Set(H.called), last = H.called[H.called.length - 1];
    hz.innerHTML = `<div class="cols"><div class="stack">
      <div class="card royal"><div class="row between"><div><div class="muted small">${esc(t('codeTell'))}</div><div class="codebig" style="color:var(--gold)">${esc(H.code)}${H.game !== '1' ? ' · ' + esc(t('game')) + ' ' + esc(H.game) : ''}</div></div><div class="row"><label class="small" for="hCode">${esc(t('code'))}</label><input id="hCode" style="width:120px" maxlength="10" value="${esc(H.code)}"><label class="small" for="hGame">${esc(t('game'))}</label><select id="hGame" style="width:70px">${['1', '2', '3'].map(g => `<option ${H.game === g ? 'selected' : ''}>${g}</option>`).join('')}</select></div></div></div>
      <div class="card callbox"><div class="ball" id="ball">${last || '–'}</div><div><div class="phrase" id="phrase">${esc(last ? phraseOf(last) : t('begin'))}</div><p class="small muted" style="margin:.3em 0">${esc(t('count', H.called.length))}</p>
        <div class="row"><button class="btn wine" id="callNext" type="button" ${H.called.length >= 90 ? 'disabled' : ''}>${esc(t('callNext'))}</button><button class="btn ghost sm" id="undo" type="button" ${H.called.length ? '' : 'disabled'}>${esc(t('undo'))}</button><button class="btn ghost sm" id="voice" type="button" aria-pressed="${H.voice}">${esc(H.voice ? t('voiceOn') : t('voiceOff'))}</button><button class="btn gold sm" id="big" type="button">${esc(t('bigScreen'))}</button></div>
        <div class="hist">${H.called.slice(-8, -1).reverse().map(n => `<span>${n}</span>`).join('')}</div></div></div>
      <div class="card"><p class="small muted">${esc(t('boardHint'))}</p><div class="board" id="board">${Array.from({ length: 90 }, (_, i) => `<button type="button" data-n="${i + 1}" class="${set.has(i + 1) ? 'c' : ''} ${i + 1 === last ? 'last' : ''}">${i + 1}</button>`).join('')}</div></div>
    </div><div class="stack">
      <div class="card"><h3>${esc(t('prizesTitle'))}</h3>${t('prizes').map((p, i) => `<div class="prize"><span>${esc(p)}</span><input data-p="${PKEYS[i]}" placeholder="${esc(t('winner'))}" value="${esc(H.prizes[PKEYS[i]] || '')}" list="memList"></div>`).join('')}<datalist id="memList">${names().map(n => `<option value="${esc(n)}">`).join('')}</datalist></div>
      <div class="card"><h3>${esc(t('checkTitle'))}</h3><p class="small muted">${esc(t('checkHint'))}</p><div class="row"><input id="chkName" style="flex:1" placeholder="${esc(t('phHerName'))}" list="memList"><button class="btn" id="chkBtn" type="button">${esc(t('check'))}</button></div><div id="chkOut" style="margin-top:12px"></div></div>
      <button class="btn danger" id="resetGame" type="button">${esc(t('newGame'))}</button>
    </div></div>`;
  }
  function drawPlayer() {
    if (!P) {
      hz.innerHTML = `<div class="card" style="max-width:520px"><h3>${esc(t('getCard'))}</h3><label class="lab" for="pCode">${esc(t('pCode'))}</label><input id="pCode" maxlength="10" autocapitalize="characters"><label class="lab" for="pName">${esc(t('pName'))}</label><input id="pName" value="${esc(store.get('myName', ''))}"><label class="lab" for="pGame">${esc(t('game'))}</label><select id="pGame"><option>1</option><option>2</option><option>3</option></select><p class="small" id="pErr" style="color:var(--danger)" hidden></p><div class="row" style="margin-top:14px"><button class="btn wine" id="joinBtn" type="button">${esc(t('showCard'))}</button></div><p class="small muted" style="margin-top:8px">${esc(t('oneCard'))}</p></div>`;
      return;
    }
    const T = makeTicket(P.code, P.name, P.game), mk = new Set(P.marks || []);
    hz.innerHTML = `<div style="max-width:640px"><div class="row between" style="margin-bottom:10px"><div><b style="color:var(--wine)">${esc(P.name)}</b> <span class="muted small">${esc(t('meta', P.code, P.game))}</span></div><div class="row"><button class="btn ghost sm" id="clearMarks" type="button">${esc(t('clearMarks'))}</button><button class="btn ghost sm" id="changeCard" type="button">${esc(t('change'))}</button></div></div>
      <div class="ticket tapme" id="myTicket" role="button" tabindex="0" aria-label="${esc(t('openBig'))}">${ticketHTML(T, n => mk.has(n) ? 'mk' : '')}</div>
      <div class="row" style="margin-top:12px"><button class="btn gold" id="openBig" type="button">${esc(t('openBig'))}</button></div><p class="small muted" style="margin-top:10px">${esc(t('playHint'))}</p></div>`;
  }
  const call = n => { if (H.called.includes(n)) return; H.called.push(n); saveH(); drawHost(); if (fsKind === 'host') drawFS(); KP.$$('.ball').forEach(b => { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop') }); if (H.voice) speak(phraseKn(n), phraseEn(n)) };
  const callNext = () => { const left = []; for (let i = 1; i <= 90; i++) if (!H.called.includes(i)) left.push(i); if (left.length) call(pick(left)) };
  const undo = () => { H.called.pop(); saveH(); drawHost(); if (fsKind === 'host') drawFS() };
  const toggleMark = n => { const m = new Set(P.marks); m.has(n) ? m.delete(n) : m.add(n); P.marks = [...m]; store.set('player', P); store.set(mkKey(), P.marks); drawPlayer(); if (fsKind === 'ticket') drawFS(); try { navigator.vibrate && navigator.vibrate(15) } catch (e) {} };
  function drawFS() {
    const b = $('#fsBody');
    if (fsKind === 'ticket' && P) { const T = makeTicket(P.code, P.name, P.game), mk = new Set(P.marks || []); $('#fsTitle').textContent = P.name + ' · ' + t('meta', P.code, P.game); b.innerHTML = `<div class="ticket">${ticketHTML(T, n => mk.has(n) ? 'mk' : '')}</div>` }
    if (fsKind === 'host') { const set = new Set(H.called), last = H.called[H.called.length - 1]; $('#fsTitle').textContent = t('code') + ' ' + H.code + ' · ' + t('count', H.called.length); b.innerHTML = `<div class="fs-host"><div class="side"><div class="ball">${last || '–'}</div><div class="phrase">${esc(last ? phraseOf(last) : t('begin'))}</div><button class="btn gold" data-a="next" type="button" ${H.called.length >= 90 ? 'disabled' : ''}>${esc(t('callNext'))}</button><button class="btn ghost" style="color:#fff" data-a="undo" type="button" ${H.called.length ? '' : 'disabled'}>${esc(t('undo'))}</button></div><div class="fsboard">${Array.from({ length: 90 }, (_, i) => `<span class="${set.has(i + 1) ? 'c' : ''} ${i + 1 === last ? 'last' : ''}">${i + 1}</span>`).join('')}</div></div>` }
  }
  function openFS(kind) {
    fsKind = kind; $('#fs').hidden = false; $('#fsClose').textContent = t('close'); drawFS();
    try { const d = document.documentElement; const p = d.requestFullscreen ? d.requestFullscreen({ navigationUI: 'hide' }) : d.webkitRequestFullscreen && d.webkitRequestFullscreen(); if (p && p.then) p.then(() => { try { screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {}) } catch (e) {} }).catch(() => {}) } catch (e) {}
  }
  function closeFS() { fsKind = null; $('#fs').hidden = true; try { screen.orientation && screen.orientation.unlock && screen.orientation.unlock() } catch (e) {} try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}) } catch (e) {} }
  $('#fsClose').onclick = closeFS;
  $('#fsBody').onclick = e => { if (fsKind === 'ticket') { const b = e.target.closest('button[data-n]'); if (b) toggleMark(+b.dataset.n) } if (fsKind === 'host') { const a = e.target.closest('button[data-a]'); if (!a) return; a.dataset.a === 'next' ? callNext() : undo() } };
  el.onclick = e => {
    const b = e.target.closest('button'); const tk = e.target.closest('#myTicket');
    if (tk) { openFS('ticket'); return }
    if (!b) return;
    if (b.dataset.mode) { mode = b.dataset.mode; drawMode(); return }
    if (b.id === 'callNext') { callNext(); return }
    if (b.dataset.n && b.closest('#board')) { const n = +b.dataset.n; if (H.called.includes(n)) ask(t('removeQ', n), t('removeB'), () => { H.called = H.called.filter(x => x !== n); saveH(); drawHost() }); else call(n); return }
    if (b.id === 'undo') { undo(); return }
    if (b.id === 'voice') { H.voice = !H.voice; saveH(); drawHost(); return }
    if (b.id === 'big') { openFS('host'); return }
    if (b.id === 'resetGame') { ask(t('clearQ'), t('clearB'), () => { H.called = []; H.prizes = {}; saveH(); drawHost() }); return }
    if (b.id === 'chkBtn') { const n = $('#chkName').value.trim(); if (!n) { toast(t('typeName')); return } const T = makeTicket(H.code, n, H.game), set = new Set(H.called), has = x => set.has(x), res = prizeCheck(T, has); $('#chkOut').innerHTML = `<div class="ticket mini">${ticketHTML(T, x => has(x) ? 'hit' : '')}</div><div style="margin-top:10px">${t('prizes').map((p, i) => `<div>${res[i] ? '<span class="ok">✓ ' + esc(p) + '</span>' : '<span class="no">· ' + esc(p) + '</span>'}</div>`).join('')}</div><p class="small muted" style="margin-top:6px">${esc(t('greenCalled'))}</p>`; return }
    if (b.id === 'joinBtn') { const code = $('#pCode').value.trim().toUpperCase().replace(/\s/g, ''), name = $('#pName').value.trim(); if (!code || !name) { const er = $('#pErr'); er.textContent = t('needBoth'); er.hidden = false; return } P = { code, name, game: $('#pGame').value, marks: [] }; P.marks = store.get(mkKey(), []); store.set('player', P); drawPlayer(); openFS('ticket'); return }
    if (b.id === 'openBig') { openFS('ticket'); return }
    if (b.id === 'clearMarks') { ask(t('clearMQ'), t('clearMB'), () => { P.marks = []; store.set('player', P); store.set(mkKey(), []); drawPlayer() }); return }
    if (b.id === 'changeCard') { const old = P; P = null; store.set('player', null); drawPlayer(); $('#pCode').value = old.code; $('#pName').value = old.name; $('#pGame').value = old.game; return }
  };
  el.onkeydown = e => { if (e.target.id === 'myTicket' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFS('ticket') } };
  el.onchange = e => {
    if (e.target.id === 'hCode') { const v = e.target.value.trim().toUpperCase().replace(/\s/g, ''); if (v) { H.code = v; saveH(); drawHost() } }
    if (e.target.id === 'hGame') { const g = e.target.value; if (g === H.game) return; ask(t('gameQ', g), t('gameB', g), () => { H.game = g; H.called = []; H.prizes = {}; saveH(); drawHost() }); drawHost() }
  };
  el.oninput = e => { const i = e.target.dataset.p; if (i) { H.prizes[i] = e.target.value; saveH() } };
  drawMode();
  active = () => { if (fsKind) closeFS() };
}

/* ================= LUCKY DRAW ================= */
function LuckyDraw(el) {
  let S = store.get('draw', null) || { list: names().join('\n'), removeWinner: true, history: [] };
  const save = () => store.set('draw', S);
  let spinning = false;
  const draw = () => {
    el.innerHTML = howTo('drawHow') + `<div class="cols"><div class="card"><label class="lab" for="dList">${esc(t('drawNames'))}</label><textarea id="dList" rows="8" style="min-height:180px">${esc(S.list)}</textarea>
      <div class="row" style="margin-top:8px"><button class="btn ghost sm" id="dMembers" type="button">${ic('users')}${esc(t('loadMembers'))}</button><label class="row small" style="gap:6px"><input type="checkbox" id="dRm" ${S.removeWinner ? 'checked' : ''} style="width:22px;min-height:22px">${esc(t('removeWinner'))}</label></div></div>
      <div class="stack"><div class="card royal center"><div class="muted">${esc(t('drawResult'))}</div><div class="drawbox" id="dOut">${esc(S.history[0] ? S.history[0].n : '—')}</div><button class="btn gold" id="dGo" type="button">${ic('gift')}${esc(t('drawNow'))}</button></div>
      <div class="card"><div class="card-title"><h3>${esc(t('drawHistory'))}</h3><button class="btn ghost sm" id="dClr" type="button" ${S.history.length ? '' : 'disabled'}>${esc(t('clear'))}</button></div>${S.history.length ? `<div class="list">${S.history.map((h, i) => `<div class="li"><span class="badge gold">${S.history.length - i}</span><div class="grow"><b>${esc(h.n)}</b><span class="small muted">${esc(new Date(h.at).toLocaleString(KP.L === 'kn' ? 'kn-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }))}</span></div></div>`).join('')}</div>` : `<p class="small muted" style="margin:0">${esc(t('noDrawYet'))}</p>`}</div></div></div>`;
  };
  draw();
  el.oninput = e => { if (e.target.id === 'dList') { S.list = e.target.value; save() } };
  el.onchange = e => { if (e.target.id === 'dRm') { S.removeWinner = e.target.checked; save() } };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b || spinning) return;
    if (b.id === 'dMembers') { const n = names(); if (!n.length) { toast(t('noMembersYet')); return } S.list = n.join('\n'); save(); draw(); return }
    if (b.id === 'dClr') { ask(t('clearHistQ'), t('cantUndo'), () => { S.history = []; save(); draw() }); return }
    if (b.id === 'dGo') {
      const L = S.list.split('\n').map(x => x.trim()).filter(Boolean); if (L.length < 1) { toast(t('drawNeedNames')); return }
      spinning = true; b.disabled = true; const out = $('#dOut'); let k = 0; const total = 22 + Math.floor(Math.random() * 8); const win = pick(L);
      const step = () => { k++; out.textContent = k < total ? L[k % L.length] : win; beep(500 + k * 12, .04); if (k < total) setTimeout(step, 30 + k * 5); else { spinning = false; S.history.unshift({ n: win, at: Date.now() }); if (S.removeWinner) S.list = L.filter((x, i) => i !== L.indexOf(win)).join('\n'); save(); draw(); winner(win, t('drawWon')) } };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { k = total - 1 } step();
    }
  };
}

/* ================= SPIN THE WHEEL ================= */
function Wheel(el) {
  const DEF = { kn: ['ಹಾಡು ಹೇಳಿ', 'ಒಂದು ತಮಾಷೆ ಹೇಳಿ', 'ಪುಟ್ಟ ಬಹುಮಾನ', 'ಕುಣಿದು ತೋರಿಸಿ', 'ಮತ್ತೊಮ್ಮೆ ತಿರುಗಿಸಿ', 'ಒಂದು ನೆನಪು ಹಂಚಿಕೊಳ್ಳಿ', 'ಸಿನಿಮಾ ಮಾತು ಹೇಳಿ', 'ಎಲ್ಲರನ್ನೂ ಹೊಗಳಿ'], en: ['Sing a song', 'Tell a joke', 'Small prize', 'Dance a step', 'Spin again', 'Share a memory', 'Say a film dialogue', 'Praise everyone'] };
  let S = store.get('wheel', null) || { items: DEF[KP.L].join('\n') };
  const save = () => store.set('wheel', S);
  let rot = 0, spinning = false;
  const cols = ['#650B32', '#D6AD62', '#087F73', '#B21F58', '#520B2B', '#E9CF9E', '#0E5A52', '#F3DCE5'];
  const items = () => S.items.split('\n').map(x => x.trim()).filter(Boolean).slice(0, 16);
  el.innerHTML = howTo('wheelHow') + `<div class="cols"><div class="card"><div class="wheel-wrap"><div class="wheel-pin"></div><canvas id="wc" width="840" height="840" aria-label="${esc(t('wheel'))}"></canvas></div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn wine" id="spin" type="button">${ic('wheel')}${esc(t('spin'))}</button></div><div class="drawbox" id="wOut" style="font-size:clamp(22px,5vw,32px);color:var(--wine)"></div></div>
    <div class="card"><label class="lab" for="wItems">${esc(t('wheelItems'))}</label><textarea id="wItems" style="min-height:220px">${esc(S.items)}</textarea><div class="row" style="margin-top:8px"><button class="btn ghost sm" id="wMem" type="button">${ic('users')}${esc(t('loadMembers'))}</button><button class="btn ghost sm" id="wDef" type="button">${ic('refresh')}${esc(t('wheelDefault'))}</button></div></div></div>`;
  const cv = $('#wc', el), x = cv.getContext('2d');
  const paint = () => {
    const L = items(); const n = Math.max(L.length, 1), R = 410, cx = 420, cy = 420; x.clearRect(0, 0, 840, 840);
    x.save(); x.translate(cx, cy); x.rotate(rot);
    for (let i = 0; i < n; i++) { const a0 = i * 2 * Math.PI / n - Math.PI / 2, a1 = a0 + 2 * Math.PI / n; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, R, a0, a1); x.closePath(); x.fillStyle = cols[i % cols.length]; x.fill(); x.strokeStyle = '#FFF7ED'; x.lineWidth = 3; x.stroke();
      x.save(); const mid = a0 + Math.PI / n; x.rotate(mid); const flip = Math.cos(mid + rot) < 0; if (flip) x.rotate(Math.PI); x.textAlign = flip ? 'left' : 'right'; x.textBaseline = 'middle'; const light = ['#D6AD62', '#E9CF9E', '#F3DCE5'].includes(cols[i % cols.length]); x.fillStyle = light ? '#520B2B' : '#fff'; x.font = `600 ${n > 10 ? 24 : 30}px "Noto Sans Kannada",Inter,sans-serif`; let s = L[i] || ''; while (x.measureText(s).width > R - 90 && s.length > 3) s = s.slice(0, -2) + '…'; x.fillText(s, flip ? -(R - 26) : R - 26, 0); x.restore() }
    x.restore(); x.beginPath(); x.arc(cx, cy, R, 0, 7); x.lineWidth = 10; x.strokeStyle = '#D6AD62'; x.stroke(); x.beginPath(); x.arc(cx, cy, 46, 0, 7); x.fillStyle = '#520B2B'; x.fill(); x.lineWidth = 5; x.stroke();
  };
  paint();
  el.oninput = e => { if (e.target.id === 'wItems') { S.items = e.target.value; save(); paint() } };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b || spinning) return;
    if (b.id === 'wMem') { const n = names(); if (!n.length) { toast(t('noMembersYet')); return } S.items = n.join('\n'); save(); $('#wItems').value = S.items; paint(); return }
    if (b.id === 'wDef') { S.items = DEF[KP.L].join('\n'); save(); $('#wItems').value = S.items; paint(); return }
    if (b.id === 'spin') {
      const L = items(); if (L.length < 2) { toast(t('wheelNeed2')); return }
      spinning = true; b.disabled = true; $('#wOut').textContent = '';
      const n = L.length, target = Math.floor(Math.random() * n); const seg = 2 * Math.PI / n;
      const base = rot % (2 * Math.PI); const want = -(target * seg + seg / 2) ; const extra = 2 * Math.PI * (5 + Math.floor(Math.random() * 3));
      const from = rot, to = rot - base + extra + ((want % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const dur = matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 4200; const t0 = performance.now(); let lastSeg = -1;
      const anim = now => { const p = Math.min(1, (now - t0) / dur); const ease = 1 - Math.pow(1 - p, 4); rot = from + (to - from) * ease; paint(); const s = Math.floor(((-rot % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI) / seg); if (s !== lastSeg) { lastSeg = s; beep(700, .02) } if (p < 1) requestAnimationFrame(anim); else { spinning = false; b.disabled = false; const res = L[target]; $('#wOut').textContent = res; chime() } };
      requestAnimationFrame(anim);
    }
  };
}

/* ================= QUIZZES (GK, Film, Picture) ================= */
function Quiz(el, kind) {
  const bank = kind === 'gk' ? C.GK_Q : kind === 'film' ? C.FILM_Q : C.PIC_Q;
  const key = 'quiz_' + kind;
  let S = store.get(key, null); if (!S || S.order.length !== bank.length) S = { order: shuffle(bank.map((_, i) => i)), pos: 0 };
  const save = () => store.set(key, S);
  el.innerHTML = howTo('quizHow') + `<div class="cols"><div class="stack"><div id="qBox"></div></div><div class="card"><h3>${esc(t('scores'))}</h3><div id="qScores"></div></div></div>`;
  const sc = makeScores($('#qScores', el), key, [t('team') + ' 1', t('team') + ' 2'], { step: 10, turns: true });
  let answered = false;
  const drawQ = () => {
    answered = false;
    if (S.pos >= S.order.length) { $('#qBox').innerHTML = `<div class="qcard"><div class="q">${esc(t('quizDone'))}</div><div class="row" style="justify-content:center"><button class="btn gold" id="qWin" type="button">${ic('trophy')}${esc(t('showWinner'))}</button><button class="btn ghost" style="color:#fff" id="qAgain" type="button">${ic('refresh')}${esc(t('playAgain'))}</button></div></div>`; return }
    const q = bank[S.order[S.pos]];
    const opts = q.o.map((o, i) => ({ o, i }));
    $('#qBox').innerHTML = `<div class="qcard"><div class="qmeta">${esc(t('qOf', S.pos + 1, S.order.length))} · ${esc(t('turnOfTeam', sc.names[sc.turn]))}</div>${kind === 'pic' ? `<div class="emo" aria-label="${esc(t('picClue'))}">${esc(q.e)}</div><div class="q" style="font-size:18px">${esc(t('picQ'))}</div>` : `<div class="q">${esc(tx(q.q))}</div>`}<div class="opts">${opts.map(({ o, i }) => `<button type="button" data-o="${i}">${esc(tx(o))}</button>`).join('')}</div><div class="answer" id="qAns"></div><div class="row" style="justify-content:center;margin-top:12px"><button class="btn ghost" style="color:#fff" id="qShow" type="button">${esc(t('showAnswer'))}</button><button class="btn gold" id="qNext" type="button">${esc(t('nextQ'))}${ic('right')}</button></div></div>`;
  };
  drawQ();
  $('#qBox', el).onclick = e => {
    const b = e.target.closest('button'); if (!b) return; const q = bank[S.order[S.pos]];
    if (b.dataset.o != null && !answered) { answered = true; const right = +b.dataset.o === q.a; $$('#qBox [data-o]').forEach(x => { if (+x.dataset.o === q.a) x.classList.add('right'); else if (x === b) x.classList.add('wrong') }); $('#qAns').textContent = right ? t('correct', sc.names[sc.turn]) : t('wrongAns', tx(q.o[q.a])); if (right) { sc.add(sc.turn); chime() } else beep(220, .3); return }
    if (b.id === 'qShow') { answered = true; $$('#qBox [data-o]').forEach(x => { if (+x.dataset.o === q.a) x.classList.add('right') }); $('#qAns').textContent = t('answerIs', tx(q.o[q.a])); return }
    if (b.id === 'qNext') { S.pos++; save(); sc.next(); drawQ(); return }
    if (b.id === 'qWin') { sc.announce(); return }
    if (b.id === 'qAgain') { S = { order: shuffle(bank.map((_, i) => i)), pos: 0 }; save(); drawQ(); return }
  };
}

/* ================= GUESS THE SONG ================= */
function Song(el) {
  let used = store.get('songUsed', []);
  el.innerHTML = howTo('songHow') + `<div class="cols"><div class="stack"><div class="qcard"><div class="qmeta">${esc(t('songCard'))}</div><div class="q" id="sPrompt">${esc(t('songTap'))}</div><button class="btn gold" id="sNext" type="button">${ic('music')}${esc(t('newCard'))}</button></div><div class="card"><h3>${esc(t('timer30'))}</h3><div id="sTimer"></div></div></div><div class="card"><h3>${esc(t('scores'))}</h3><div id="sScores"></div></div></div>`;
  const tm = makeTimer($('#sTimer', el), 30);
  const sc = makeScores($('#sScores', el), 'song', [t('team') + ' 1', t('team') + ' 2'], { step: 10, turns: true });
  $('#sNext', el).onclick = () => { let pool = C.SONG_PROMPTS.map((_, i) => i).filter(i => !used.includes(i)); if (!pool.length) { used = []; pool = C.SONG_PROMPTS.map((_, i) => i) } const i = pick(pool); used.push(i); store.set('songUsed', used); $('#sPrompt').textContent = tx(C.SONG_PROMPTS[i]) + ' — ' + t('turnOfTeam', sc.names[sc.turn]); tm.reset(30); tm.start() };
  active = () => tm.stop();
}

/* ================= ANTAKSHARI ================= */
function Antakshari(el) {
  el.innerHTML = howTo('antaHow') + `<div class="cols"><div class="stack"><div class="qcard"><div class="qmeta" id="aTurn"></div><div class="emo" id="aLetter" style="font-family:var(--f-head)">${KP.L === 'kn' ? 'ಅ' : 'A'}</div><p class="qmeta">${esc(t('antaSing'))}</p><div class="row" style="justify-content:center"><button class="btn gold" id="aNew" type="button">${ic('refresh')}${esc(t('newLetter'))}</button><button class="btn ghost" style="color:#fff" id="aLang" type="button">${esc(KP.L === 'kn' ? 'A–Z' : 'ಅ–ಹ')}</button></div></div><div class="card"><h3>${esc(t('timer30'))}</h3><div id="aTimer"></div></div></div><div class="card"><h3>${esc(t('scores'))}</h3><div id="aScores"></div></div></div>`;
  let kn = KP.L === 'kn';
  const tm = makeTimer($('#aTimer', el), 30, () => { toast(t('antaOut')) });
  const sc = makeScores($('#aScores', el), 'anta', [t('team') + ' 1', t('team') + ' 2'], { step: 10, turns: true });
  const turn = () => { $('#aTurn').textContent = t('turnOfTeam', sc.names[sc.turn]) }; turn();
  $('#aNew', el).onclick = () => { $('#aLetter').textContent = pick(kn ? C.ANTA_KN : C.ANTA_EN); sc.next(); turn(); tm.reset(30); tm.start() };
  $('#aLang', el).onclick = e => { kn = !kn; e.target.textContent = kn ? 'A–Z' : 'ಅ–ಹ'; $('#aLetter').textContent = pick(kn ? C.ANTA_KN : C.ANTA_EN) };
  $('#aScores', el).addEventListener('click', () => setTimeout(turn, 0));
  active = () => tm.stop();
}

/* ================= MEMORY ================= */
function Memory(el) {
  const keys = Object.keys(C.MEM_PICS);
  let deck, open, done, moves, t0, tid, player = store.get('myName', '');
  const best = () => store.get('memBest', []);
  const start = () => { deck = shuffle([...keys, ...keys]); open = []; done = new Set(); moves = 0; t0 = 0; clearInterval(tid); draw() };
  const secs = () => t0 ? Math.round((Date.now() - t0) / 1000) : 0;
  const draw = () => {
    el.innerHTML = howTo('memHow') + `<div class="cols"><div class="card"><div class="row between" style="margin-bottom:10px"><span class="badge rose">${esc(t('moves', moves))}</span><span class="badge gold" id="mT">${esc(t('secsN', secs()))}</span><button class="btn ghost sm" id="mRe" type="button">${ic('refresh')}${esc(t('restart'))}</button></div><div class="mem">${deck.map((k, i) => `<button type="button" data-i="${i}" class="${done.has(i) ? 'done' : open.includes(i) ? 'open' : ''}" aria-label="${esc(t('card'))} ${i + 1}"><svg viewBox="0 0 64 64">${C.MEM_PICS[k]}</svg></button>`).join('')}</div></div>
      <div class="card"><h3>${esc(t('bestScores'))}</h3><label class="lab" for="mName">${esc(t('playerName'))}</label><input id="mName" value="${esc(player)}">${best().length ? `<div class="list" style="margin-top:10px">${best().map((b, i) => `<div class="li"><span class="badge gold">${i + 1}</span><div class="grow"><b>${esc(b.n)}</b><span class="small muted">${esc(t('moves', b.m))} · ${esc(t('secsN', b.s))}</span></div></div>`).join('')}</div>` : `<p class="small muted" style="margin-top:10px">${esc(t('noBest'))}</p>`}</div></div>`;
  };
  start();
  el.oninput = e => { if (e.target.id === 'mName') player = e.target.value };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'mRe') { start(); return }
    if (b.dataset.i == null) return; const i = +b.dataset.i; if (done.has(i) || open.includes(i) || open.length === 2) return;
    if (!t0) { t0 = Date.now(); tid = setInterval(() => { const m = $('#mT'); if (m) m.textContent = t('secsN', secs()); else clearInterval(tid) }, 1000) }
    open.push(i); b.classList.add('open'); beep(760, .04);
    if (open.length === 2) { moves++; const [a, c] = open; if (deck[a] === deck[c]) { done.add(a); done.add(c); open = []; beep(990, .1); draw(); if (done.size === deck.length) { clearInterval(tid); const s = secs(); const L = best(); L.push({ n: player || t('player'), m: moves, s }); L.sort((x, y) => x.m - y.m || x.s - y.s); store.set('memBest', L.slice(0, 8)); draw(); winner(player || t('player'), t('memDone', moves, s)) } } else { setTimeout(() => { open = []; draw() }, 800); draw() } }
  };
  active = () => clearInterval(tid);
}

/* ================= WORD GAME ================= */
function Words(el) {
  let order = shuffle(C.WORDS.map((_, i) => i)), pos = 0, picked = [], letters = [];
  el.innerHTML = howTo('wordsHow') + `<div class="cols"><div class="stack"><div class="card center"><div class="qmeta" id="wMeta" style="color:var(--muted)"></div><p id="wHint" style="font-weight:600;color:var(--wine)"></p><div class="slot" id="wSlot"></div><div class="letters" id="wLetters" style="margin-top:14px"></div><div class="row" style="justify-content:center;margin-top:14px"><button class="btn ghost sm" id="wBack" type="button">${esc(t('backspace'))}</button><button class="btn ghost sm" id="wShow" type="button">${esc(t('showAnswer'))}</button><button class="btn wine sm" id="wNext" type="button">${esc(t('nextWord'))}${ic('right')}</button></div><p class="answer" id="wAns" style="color:var(--emerald)"></p></div><div class="card"><h3>${esc(t('timer60'))}</h3><div id="wTimer"></div></div></div><div class="card"><h3>${esc(t('scores'))}</h3><div id="wScores"></div></div></div>`;
  const tm = makeTimer($('#wTimer', el), 60);
  const sc = makeScores($('#wScores', el), 'words', [t('team') + ' 1', t('team') + ' 2'], { step: 10, turns: true });
  const load = () => { const W = C.WORDS[order[pos % order.length]]; let s; do { s = shuffle(W.w.split('')) } while (s.join('') === W.w && W.w.length > 2); letters = s.map((c, i) => ({ c, i, used: false })); picked = []; $('#wHint').textContent = t('hint') + ': ' + tx(W.h); $('#wMeta').textContent = t('turnOfTeam', sc.names[sc.turn]); $('#wAns').textContent = ''; paint() };
  const paint = () => { $('#wSlot').textContent = picked.map(p => p.c).join('') || '·'; $('#wLetters').innerHTML = letters.map((l, k) => `<button type="button" data-k="${k}" ${l.used ? 'disabled' : ''}>${l.c}</button>`).join('') };
  load();
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return; const W = C.WORDS[order[pos % order.length]];
    if (b.dataset.k != null) { const l = letters[+b.dataset.k]; if (l.used) return; l.used = true; picked.push(l); paint(); beep(800, .03); if (picked.length === W.w.length) { if (picked.map(p => p.c).join('') === W.w) { $('#wAns').textContent = t('correct', sc.names[sc.turn]); sc.add(sc.turn); chime(); tm.stop() } else { $('#wAns').textContent = t('tryAgain'); beep(220, .3) } } return }
    if (b.id === 'wBack') { const l = picked.pop(); if (l) l.used = false; $('#wAns').textContent = ''; paint(); return }
    if (b.id === 'wShow') { $('#wAns').textContent = t('answerIs', W.w); return }
    if (b.id === 'wNext') { pos++; sc.next(); load(); tm.reset(60); tm.start(); return }
  };
  active = () => tm.stop();
}

/* ================= RAPID FIRE ================= */
function Rapid(el) {
  let qs = shuffle(C.RAPID_Q), qi = 0, score = 0, running = false, endAt = 0, tid = null;
  const board = () => store.get('rapidBoard', []);
  el.innerHTML = howTo('rapidHow') + `<div class="cols"><div class="stack"><div class="card"><label class="lab" for="rName">${esc(t('playerName'))}</label><input id="rName" value="${esc(store.get('myName', ''))}"></div><div class="qcard"><div class="qmeta" id="rTime">60</div><div class="q" id="rQ">${esc(t('rapidReady'))}</div><div class="row" style="justify-content:center"><button class="btn gold" id="rStart" type="button">${ic('bolt')}${esc(t('start'))}</button></div><div class="row" style="justify-content:center;margin-top:10px" id="rBtns" hidden><button class="btn" id="rYes" type="button">${ic('check')}${esc(t('rightBtn'))}</button><button class="btn ghost" style="color:#fff" id="rNo" type="button">${esc(t('passBtn'))}</button></div><div class="answer" id="rScore"></div></div></div><div class="card"><h3>${esc(t('rapidBoard'))}</h3><div id="rBoard"></div><button class="btn ghost sm" id="rClr" type="button" style="margin-top:10px">${esc(t('clear'))}</button></div></div>`;
  const drawBoard = () => { const B = board(); $('#rBoard').innerHTML = B.length ? `<div class="list">${B.map((b, i) => `<div class="li"><span class="badge gold">${i + 1}</span><div class="grow"><b>${esc(b.n)}</b></div><b style="color:var(--burgundy)">${b.s}</b></div>`).join('')}</div>` : `<p class="small muted" style="margin:0">${esc(t('noBest'))}</p>` };
  drawBoard();
  const showQ = () => { $('#rQ').textContent = tx(qs[qi % qs.length]); $('#rScore').textContent = t('scoreN', score) };
  const finish = () => { running = false; clearInterval(tid); $('#rBtns').hidden = true; $('#rStart').hidden = false; const n = $('#rName').value.trim() || t('player'); const B = board(); B.push({ n, s: score }); B.sort((a, b) => b.s - a.s); store.set('rapidBoard', B.slice(0, 10)); drawBoard(); beep(440, .8); winner(n, t('scoreN', score)) };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'rStart') { qs = shuffle(C.RAPID_Q); qi = 0; score = 0; running = true; endAt = Date.now() + 60000; b.hidden = true; $('#rBtns').hidden = false; showQ(); beep(880, .1); tid = setInterval(() => { const l = Math.max(0, Math.ceil((endAt - Date.now()) / 1000)); $('#rTime').textContent = l; if (l <= 5 && l > 0) beep(660, .05); if (l <= 0) finish() }, 250); return }
    if (!running) { if (b.id === 'rClr') ask(t('clearHistQ'), t('cantUndo'), () => { store.set('rapidBoard', []); drawBoard() }); return }
    if (b.id === 'rYes') { score++; qi++; beep(990, .05); showQ(); return }
    if (b.id === 'rNo') { qi++; showQ(); return }
  };
  active = () => clearInterval(tid);
}

/* ================= TEAM & ONE-MINUTE GAMES ================= */
function TeamGames(el) {
  let chosen = store.get('minuteGame', null), filter = 'all';
  el.innerHTML = howTo('teamHow') + `<div class="cols"><div class="stack"><div class="card"><h3 id="tgName">${esc(chosen ? (C.MINUTE_GAMES.find(g => g.id === chosen) || {})[KP.L]?.[0] || t('pickGame') : t('pickGame'))}</h3><div id="tgTimer"></div><button class="btn gold sm" id="tgRand" type="button" style="margin-top:10px">${ic('idea')}${esc(t('surpriseGame'))}</button></div><div class="card"><h3>${esc(t('scores'))}</h3><div id="tgScores"></div></div></div>
    <div><div class="chips" id="tgF" style="margin-bottom:12px"></div><div class="grid" id="tgList"></div></div></div>`;
  const tm = makeTimer($('#tgTimer', el), 60);
  makeScores($('#tgScores', el), 'team', [t('team') + ' 1', t('team') + ' 2'], { step: 1 });
  const list = () => { $('#tgF').innerHTML = [['all', 'fAll'], ['none', 'fNone'], ['props', 'fProps']].map(([k, l]) => `<button type="button" class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${esc(t(l))}</button>`).join(''); $('#tgList').innerHTML = C.MINUTE_GAMES.filter(g => g.id !== 'housie' && (filter === 'all' || g.t === filter)).map(g => `<div class="icard ${chosen === g.id ? 'pick' : ''}"><svg class="mc"><use href="#i-mandala2"/></svg><div class="ih"><span class="ri">${ic(g.t === 'none' ? 'team' : 'gift')}</span><h3>${esc(g[KP.L][0])}</h3></div><div class="small" style="color:var(--emerald);font-weight:600">${esc(t('need') + g[KP.L][1])}</div><p class="small" style="margin:.4em 0 .7em">${esc(g[KP.L][2])}</p><button class="btn ghost sm" data-g="${g.id}" type="button">${esc(t('playThis'))}</button></div>`).join('') };
  list();
  const choose = id => { chosen = id; store.set('minuteGame', id); $('#tgName').textContent = C.MINUTE_GAMES.find(g => g.id === id)[KP.L][0]; tm.reset(60); list(); window.scrollTo({ top: 0, behavior: 'smooth' }) };
  el.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.f) { filter = b.dataset.f; list() } if (b.dataset.g) choose(b.dataset.g); if (b.id === 'tgRand') choose(pick(C.MINUTE_GAMES.filter(g => g.id !== 'housie' && g.id !== chosen)).id) };
  active = () => tm.stop();
}
})();
