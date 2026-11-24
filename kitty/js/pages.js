/* Kitty Party Circle — Home, Invitations, shared invitation page */
(() => {
const KP = window.KP, C = KP.C;
const { ptitle, ornate, mandC } = KP;
const { $, $$, esc, ic, store, t, tx, fmtDate, fmtShort, fmtTime, parseISO, iso, today, daysUntil, nextYearly, waLink, copyText, shareFile, loadScript, toast, dlg, ask, empty, uid, initials, lotusDivider, b64e, b64d, APP_URL, log } = KP;
const nm = n => KP.L === 'kn' ? (C.KN_NAMES[n] || n) : n;
KP.nm = nm;

/* ================= shared data ================= */
const D = KP.D = {
  cal() { return store.get('cal2', null) || C.CAL0.map(c => ({ y: c[0], m: c[1], host: c[2] })) },
  setCal(v) { store.set('cal2', v) },
  invs() { return store.get('invs', []) },
  setInvs(v) { store.set('invs', v) },
  members() { return store.get('members', []) },
  setMembers(v) { store.set('members', v) },
  albums() { return store.get('albums', []) },
  setAlbums(v) { store.set('albums', v) }
};
const monthKey = (y, m) => y * 12 + m;
KP.currentTurnIdx = () => { const cal = D.cal(); const d = new Date(); const k = monthKey(d.getFullYear(), d.getMonth()) + (d.getDate() > 20 ? 1 : 0); const i = cal.findIndex(c => monthKey(c.y, c.m) >= k); return i < 0 ? cal.length - 1 : i };
const monthLabel = (y, m) => { try { return new Date(y, m, 1).toLocaleDateString(KP.L === 'kn' ? 'kn-IN' : 'en-IN', { month: 'long', year: 'numeric' }) } catch (e) { return (m + 1) + '/' + y } };
KP.monthLabel = monthLabel;

/* next party: the soonest saved invitation with a future date, else this turn from the calendar */
KP.nextParty = () => {
  const now = Date.now();
  const inv = D.invs().map(x => x.data).filter(d => d.date).map(d => ({ d, at: new Date(d.date + 'T' + (d.time || '16:00')).getTime() })).filter(x => x.at > now - 3 * 3600e3).sort((a, b) => a.at - b.at)[0];
  if (inv) return { inv: inv.d, at: inv.at, host: inv.d.host, title: inv.d.title };
  const cal = D.cal(); const c = cal[KP.currentTurnIdx()]; if (!c) return null;
  return { turn: c, host: nm(c.host) };
};

/* migrate the first version's saved invite once */
(function migrate() {
  if (store.get('v2migrated', false)) return;
  const o = store.get('inv', null);
  if (o && (o.iHost || o.iDate || o.iPlace)) {
    const s = store.get('secrets', {});
    const d = blankInv(); Object.assign(d, { host: o.iHost || '', date: o.iDate || '', time: o.iTime || '16:00', venueName: o.iVenue || '', address: o.iPlace || '', activities: o.iTheme || '', menu: o.iMenu || '', kitty: o.iKitty || '', note: o.iNote || '', privateNote: o.iPrivate || '', venueType: store.get('vtype', 'home'), games: store.get('invGames2', ['housie']), secrets: { place: !!s.place, act: !!s.theme, menu: !!s.menu, games: !!s.games } });
    store.set('invDraft', d);
  }
  store.set('v2migrated', true);
})();
function blankInv() { return { id: '', tpl: 'royal', accent: '', title: '', host: '', date: '', time: '16:00', venueType: 'home', venueName: '', address: '', activities: '', dress: '', games: ['housie'], menu: '', note: '', rsvpBy: '', phone: '', kitty: '', privateNote: '', secrets: { place: false, act: false, menu: false, games: false } } }
KP.blankInv = blankInv;

/* ================= invitation card ================= */
const gameName = id => { const g = C.MINUTE_GAMES.find(x => x.id === id); return g ? g[KP.L][0] : id };
function invParts(d) {
  const P = [], add = (k, v, sec, secTxt) => { if (sec) P.push([k, secTxt || t('secretTxt'), 1]); else if (v) P.push([k, v, 0]) };
  add('bWhere', [d.venueType === 'other' ? d.venueName : '', d.address].filter(Boolean).join('\n'), d.secrets.place, t('secretPlace'));
  add('bTheme', d.activities, d.secrets.act && d.activities);
  add('bDress', d.dress);
  add('bGames', (d.games || []).map(gameName).join(', '), d.secrets.games && (d.games || []).length);
  add('bMenu', d.menu, d.secrets.menu && d.menu);
  add('bKitty', d.kitty); add('bNote', d.note);
  return P;
}
const DESIGN = {
  royal: { top0: '#7B1342', c: 'mandala2', pos: ['tl', 'tr', 'ml', 'mr'], top: '', div: 'lotus', band: '' },
  traditional: { top0: '#972914', c: 'paisley', pos: ['tl', 'tr', 'ml', 'mr'], top: 'kalash', div: 'lotus', band: 'b-temple' },
  floral: { top0: '#FFF5F2', c: 'roses', pos: ['tl', 'tr', 'ml', 'mr'], top: '', div: 'roses', band: 'b-vine' },
  pastel: { top0: '#F6F1FB', c: 'wreath', pos: ['tl', 'tr'], top: '', div: 'lotus', band: 'b-dots' },
  festive: { top0: '#771979', c: 'mandala2', pos: ['tl', 'tr'], top: 'diyas', div: 'diya', band: 'b-stars' },
  minimal: { top0: '#FFFDF8', c: '', pos: [], top: '', div: 'flour', band: 'b-none' },
  wedding: { top0: '#FFF8EC', c: 'paisley', pos: ['ml', 'mr'], top: 'toran', div: 'kalash', band: 'b-paisley' },
  festival: { top0: '#116C62', c: 'rangoli', pos: ['tl', 'tr', 'ml', 'mr'], top: 'toran', div: 'diya', band: 'b-marigold' }
};
const ROW_IC = { bWhere: 'pin', bTheme: 'spark', bDress: 'dress', bGames: 'popper', bMenu: 'food', bKitty: 'coin', bNote: 'bell' };
KP.invHTML = (d) => {
  const S = KP.svgInline, tpl = DESIGN[d.tpl] ? d.tpl : 'royal', cfg = DESIGN[tpl];
  const host = d.host || t('cHostDef');
  const who = d.venueType === 'home' ? t('atHome', host) : t('hostedAt', host);
  const acc = d.accent ? `--iacc:${esc(d.accent)};` : '';
  let h = `<div class="invx">${S('arch', 'arch', `color:${d.accent ? esc(d.accent) : 'var(--gold)'};--archfill:${cfg.top0}`)}<div class="inv t-${esc(tpl)}" style="${acc}">`;
  h += cfg.pos.map(p => S(cfg.c, 'deco ' + p)).join('');
  if (cfg.top === 'toran') h += `<div class="itoran"></div>`;
  if (cfg.top === 'kalash') h += `<div class="itop kalash">${S('kalash')}</div>`;
  if (cfg.top === 'diyas') h += `<div class="itop">${S('diya')}${S('diya')}${S('diya')}</div>`;
  h += `<div class="pre">${esc(t('cInvites'))}</div>${S('flour', 'flour')}<div class="title">${esc(d.title || t('cKitty'))}</div><div class="o-sub">${esc(t('cAtShort'))}</div><div class="host">${esc(who)}</div>`;
  if (d.venueType === 'other' && d.venueName && !d.secrets.place) h += `<div class="vn">${esc(d.venueName)}</div>`;
  const dv = cfg.div === 'flour' ? S('flour', '', 'width:90px;height:10px') : S(cfg.div === 'roses' ? 'roses' : cfg.div, '');
  h += `<div class="lotus-div">${dv}</div>`;
  h += `<div class="o-dt"><div class="d">${S('cal')}<span>${esc(d.date ? fmtDate(d.date) : t('pickDate'))}</span></div><i></i><div class="t">${S('clock')}<span>${d.time ? `<small style="display:block">${esc(fmtTime(d.time).replace(/[0-9:]+.*$/, '').trim() || '')}</small><b>${esc((fmtTime(d.time).match(/[0-9]+:[0-9]+/) || [''])[0])}</b>${KP.L === 'en' ? ' ' + esc(fmtTime(d.time).slice(-2)) : ''}` : '—'}</span></div></div>`;
  h += invParts(d).map(([k, v, s]) => `<div class="o-row ${s ? 'sec' : ''}">${S(ROW_IC[k] || 'spark')}<i></i><div><b>${esc(t(k))}</b><span>${esc(v)}</span></div></div>`).join('');
  if (d.rsvpBy || d.phone) h += `<div class="rsvp">${esc(t('rsvpLine', d.rsvpBy ? fmtShort(d.rsvpBy) : '', d.phone ? host : ''))}</div>`;
  h += `<div class="foot">${esc(t('appName'))}</div><div class="o-band ${cfg.band}"></div></div></div>`;
  return h;
};
KP.invText = (d, link) => {
  const host = d.host || t('cHostDef'); const o = ['🌸 *' + (d.title || t('cKitty')) + '* 🌸', '', d.venueType === 'home' ? t('waCome', host) : t('waInvite', host)];
  if (d.date) o.push('📅 ' + fmtDate(d.date) + (d.time ? ' · ' + fmtTime(d.time) : ''));
  const icn = { bWhere: '📍', bTheme: '✨', bDress: '👗', bGames: '🎲', bMenu: '🍽', bKitty: '💰', bNote: '📝' };
  invParts(d).forEach(([k, v]) => o.push('', icn[k] + ' *' + t(k) + ':* ' + v));
  if (d.rsvpBy) o.push('', '🙏 ' + t('rsvpBy') + ': ' + fmtDate(d.rsvpBy, { day: 'numeric', month: 'long' }));
  if (link) o.push('', '💌 ' + t('openInvite') + ': ' + link);
  o.push('', '🎉 ' + t('waApp')); if (APP_URL && !link) o.push(APP_URL);
  return o.join('\n');
};
/* share link carries only what the guests may see */
KP.invLink = d => { if (!APP_URL) return ''; const s = JSON.parse(JSON.stringify(d)); delete s.privateNote; delete s.id; if (s.secrets.place) { s.address = ''; s.venueName = '' } if (s.secrets.act) s.activities = s.activities ? '•' : ''; if (s.secrets.menu) s.menu = s.menu ? '•' : ''; return APP_URL + '?inv=' + b64e(s) };
async function invImage(node) {
  const el = node.closest('.invx') || node;
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js');
    const opt = { pixelRatio: 2, cacheBust: true, skipFonts: false };
    try { await window.htmlToImage.toBlob(el, opt) } catch (e) {} // first pass warms up fonts (needed on iPhone)
    const b = await window.htmlToImage.toBlob(el, opt);
    if (b && b.size > 5000) return b;
  } catch (e) {}
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  const canvas = await window.html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
  return new Promise(r => canvas.toBlob(r, 'image/png'));
}
KP.invImage = invImage;

/* ================= HOME ================= */
let homeTimer = null;
KP.renderHome = el => {
  clearInterval(homeTimer);
  const np = KP.nextParty(); const myName = store.get('myName', '');
  const h = new Date().getHours(); const greet = t(h < 12 ? 'gMorning' : h < 16 ? 'gAfternoon' : 'gEvening');
  const members = D.members();
  const soon = upcomingPeople(members, 30);
  const ann = store.get('ann', []); const logs = store.get('log', []);
  const fest = C.FESTIVALS.map(f => ({ f, d: parseISO(f.d) })).filter(x => x.d >= today())[0];
  let next = '';
  if (np && np.inv) {
    const d = np.inv;
    next = ornate(`<div class="o-pre">${esc(t('nextParty'))}</div><svg class="flour" viewBox="0 0 90 10"><use href="#i-flour"/></svg><div class="o-title" style="font-size:clamp(28px,7.5vw,40px)">${esc(fmtDate(d.date, { weekday: 'short', day: 'numeric', month: 'long' }))}</div><div class="o-sub">${esc(d.venueType === 'home' ? t('atHome', d.host || t('cHostDef')) : t('hostedAt', d.host || t('cHostDef')))}</div>
      <div class="lotus-div"><svg viewBox="0 0 64 40"><use href="#i-lotus"/></svg></div>
      <div class="count" id="countdown">${['days', 'hours', 'mins', 'secs'].map(k => `<div><b data-k="${k}">0</b><span>${esc(t('c_' + k))}</span></div>`).join('')}</div>
      <div class="btns"><a class="btn" href="#invite">${ic('mail')}${esc(t('openInviteBtn'))}${ic('right', 'chev')}</a><a class="btn ghost" href="#game-housie">${ic('ticket')}${esc(t('startHousie'))}</a></div>`);
  } else if (np) {
    next = ornate(`<div class="o-pre">${esc(t('nextParty'))}</div><svg class="flour" viewBox="0 0 90 10"><use href="#i-flour"/></svg><div class="o-title">${esc(monthLabel(np.turn.y, np.turn.m))}</div><div class="o-sub">${esc(t('hostedBy', np.host))}</div>
      <div class="lotus-div"><svg viewBox="0 0 64 40"><use href="#i-lotus"/></svg></div><p style="color:var(--gold-soft);margin:0 0 14px">${esc(t('noDateYet'))}</p>
      <div class="btns"><a class="btn" href="#invite">${ic('mail')}${esc(t('makeInvite'))}${ic('right', 'chev')}</a><a class="btn ghost" href="#game-housie">${ic('ticket')}${esc(t('startHousie'))}</a></div>`);
  }
  const quick = [['invite', 'mail', 'qInvite'], ['game-housie', 'ticket', 'qHousie'], ['game-wheel', 'wheel', 'qWheel'], ['game-draw', 'gift', 'qDraw'], ['act-calendar', 'cal', 'qCal'], ['food', 'food', 'qMenu'], ['act-members', 'users', 'qMembers'], ['act-gallery', 'photo', 'qPhotos']];
  el.innerHTML = `
  <div class="hero">
    <div>
      <div class="row between"><p class="welcome" style="margin:0">${esc(greet)}${myName ? ', ' + esc(myName) : ''}</p><button class="btn ghost sm langBtn" id="homeLang" type="button">${KP.L === 'kn' ? 'English' : 'ಕನ್ನಡ'}</button></div>
      <p class="muted" style="margin-bottom:12px">${esc(t('welcomeSub'))} <button class="btn ghost sm" id="setName" type="button" style="margin-left:4px">${ic('edit')}${esc(myName ? t('changeName') : t('setName'))}</button></p>
      ${next}
    </div>
    <div class="stack">
      <div class="card">${mandC()}<div class="card-title"><span class="ic">${ic('cake')}</span><h3>${esc(t('soonTitle'))}</h3><a class="btn ghost sm" href="#act-celebrations">${esc(t('seeAll'))}</a></div>
        ${soon.length ? `<div class="list">${soon.slice(0, 4).map(p => personRow(p)).join('')}</div>` : empty('cake', members.length ? t('noSoon') : t('noMembersYet'))}
      </div>
      ${fest ? `<div class="card rose"><div class="card-title"><span class="ic" style="background:#fff">${ic('cal')}</span><h3>${esc(tx(fest.f))}</h3><span class="badge gold">${esc(t('inDays', daysUntil(fest.d)))}</span></div><p class="small" style="margin:0 0 10px">${esc(tx(fest.f.idea))}</p><a class="btn ghost sm" href="${esc(waLink(tx(fest.f.wish)))}" target="_blank" rel="noopener">${ic('wa')}${esc(t('sendWish'))}</a></div>` : ''}
    </div>
  </div>
  <div class="ptitle" style="margin-top:18px"><h2>${esc(t('quickTitle'))}</h2><div class="lotus-div"><svg viewBox="0 0 64 40"><use href="#i-lotus"/></svg></div></div>
  <div class="quick">${quick.map(([r, i, k]) => `<a class="tile" href="#${r}"><span class="ic">${ic(i)}</span><b>${esc(t(k))}</b></a>`).join('')}</div>
  <div class="cols even" style="margin-top:16px">
    <div class="card"><div class="card-title"><span class="ic">${ic('bell')}</span><h3>${esc(t('annTitle'))}</h3><button class="btn sm" id="annAdd" type="button">${ic('plus')}${esc(t('add'))}</button></div>
      ${ann.length ? `<div class="list">${ann.map(a => `<div class="li"><div class="grow"><div style="white-space:pre-line">${esc(a.text)}</div><span class="small muted">${esc(fmtDate(new Date(a.at), { day: 'numeric', month: 'short' }))}</span></div><a class="btn ghost sm icon" href="${esc(waLink(a.text))}" target="_blank" rel="noopener" aria-label="${esc(t('sendWa'))}">${ic('wa')}</a><button class="btn danger sm icon" data-del-ann="${a.id}" type="button" aria-label="${esc(t('delete'))}">${ic('trash')}</button></div>`).join('')}</div>` : empty('bell', t('noAnn'))}
    </div>
    <div class="card"><div class="card-title"><span class="ic">${ic('photo')}</span><h3>${esc(t('latestPhotos'))}</h3><a class="btn ghost sm" href="#act-gallery">${esc(t('seeAll'))}</a></div><div id="homeThumbs">${empty('photo', t('noPhotos'))}</div></div>
  </div>
  <div class="cols even" style="margin-top:16px">
    <div class="card"><div class="card-title"><span class="ic">${ic('refresh')}</span><h3>${esc(t('recentTitle'))}</h3></div>
      ${logs.length ? `<div class="list">${logs.slice(0, 5).map(l => `<div class="li"><div class="grow">${esc(KP.L === 'kn' ? l.kn : l.en)}</div><span class="small muted">${esc(fmtDate(new Date(l.at), { day: 'numeric', month: 'short' }))}</span></div>`).join('')}</div>` : empty('refresh', t('noRecent'))}
    </div>
    ${KP.isStandalone() ? '' : `<div class="card"><div class="card-title"><span class="ic">${ic('install')}</span><h3>${esc(t('instTitle'))}</h3></div><p class="small">${esc(t('instShort'))}</p><button class="btn" id="installBtn" type="button">${ic('install')}${esc(t('instBtn'))}</button></div>`}
  </div>`;
  // countdown
  if (np && np.inv) {
    const tick = () => { const ms = Math.max(0, np.at - Date.now()); const v = { days: Math.floor(ms / 864e5), hours: Math.floor(ms / 36e5) % 24, mins: Math.floor(ms / 6e4) % 60, secs: Math.floor(ms / 1e3) % 60 }; $$('#countdown b').forEach(b => b.textContent = v[b.dataset.k]); if (!$('#countdown')) clearInterval(homeTimer) };
    tick(); homeTimer = setInterval(tick, 1000);
  }
  // thumbs
  KP.idb.all().then(ps => { const box = $('#homeThumbs'); if (!box || !ps.length) return; const last = ps.sort((a, b) => b.at - a.at).slice(0, 4); box.innerHTML = `<a class="thumbs" href="#act-gallery">${last.map(p => `<img src="${URL.createObjectURL(p.blob)}" alt="${esc(p.caption || '')}" loading="lazy">`).join('')}</a>` }).catch(() => {});
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'setName') { const s = dlg.open(`<h3>${esc(t('yourName'))}</h3><input id="nmIn" value="${esc(myName)}" maxlength="40"><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="nmOk" type="button">${esc(t('save'))}</button></div>`); $('#nmOk', s).onclick = () => { store.set('myName', $('#nmIn').value.trim()); dlg.close(); KP.renderHome(el) } }
    if (b.id === 'annAdd') { const s = dlg.open(`<h3>${esc(t('annNew'))}</h3><textarea id="annIn" data-tp="annPh" maxlength="600" placeholder="${esc(t('annPh'))}"></textarea><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="annOk" type="button">${esc(t('save'))}</button></div>`); $('#annOk', s).onclick = () => { const v = $('#annIn').value.trim(); if (!v) { toast(t('typeSomething')); return } const a = store.get('ann', []); a.unshift({ id: uid(), text: v, at: Date.now() }); store.set('ann', a.slice(0, 20)); log('ಹೊಸ ಸೂಚನೆ ಸೇರಿಸಲಾಗಿದೆ', 'Added an announcement'); dlg.close(); KP.renderHome(el) } }
    if (b.dataset.delAnn) ask(t('delAnnQ'), t('cantUndo'), () => { store.set('ann', store.get('ann', []).filter(a => a.id !== b.dataset.delAnn)); KP.renderHome(el) }, t('delete'));
    if (b.id === 'installBtn') KP.install();
    if (b.id === 'homeLang') KP.toggleLang();
  };
};
function upcomingPeople(members, days) {
  const out = [];
  members.forEach(m => { [['bday', 'bdayOf'], ['anniv', 'annivOf']].forEach(([k, lab]) => { if (!m[k]) return; const md = m[k].slice(5); const d = nextYearly(md); const n = daysUntil(d); if (n <= days) out.push({ m, k, d, n, lab }) }) });
  return out.sort((a, b) => a.n - b.n);
}
KP.upcomingPeople = upcomingPeople;
function personRow(p) {
  const msg = (p.k === 'bday' ? tx(C.WISHES.bday) : tx(C.WISHES.anniv)).replace('{n}', p.m.name);
  return `<div class="li"><span class="avatar">${p.m.photo ? `<img src="${esc(p.m.photo)}" alt="">` : esc(initials(p.m.name))}</span><div class="grow"><b>${esc(p.m.name)}</b><span class="small muted">${esc(t(p.lab))} · ${esc(p.n === 0 ? t('today') : fmtShort(p.d))}</span></div><a class="btn ghost sm" href="${esc(waLink(msg, p.m.phone))}" target="_blank" rel="noopener">${ic('wa')}${esc(t('wish'))}</a></div>`;
}
KP.personRow = personRow;

/* ================= INVITATIONS ================= */
let invTab = 'edit';
KP.renderInvite = el => {
  let d = store.get('invDraft', null) || blankInv();
  if (!d.secrets) d.secrets = { place: false, act: false, menu: false, games: false };
  const save = () => store.set('invDraft', d);
  if (!d.host) { const np = KP.nextParty(); if (np && np.turn) d.host = np.host }
  const invs = D.invs();
  const lock = k => `<button type="button" class="secret ${d.secrets[k] ? 'on' : ''}" data-s="${k}" aria-pressed="${!!d.secrets[k]}">${ic('lock')}${esc(d.secrets[k] ? t('secretOn') : t('secret'))}</button>`;
  el.innerHTML = `
  ${ptitle(t('invTitle'))}<div class="row" style="justify-content:center;margin-bottom:14px">
    <div class="seg" role="tablist"><button type="button" class="${invTab === 'edit' ? 'on' : ''}" data-tab="edit">${esc(t('tabCreate'))}</button><button type="button" class="${invTab === 'saved' ? 'on' : ''}" data-tab="saved">${esc(t('tabSaved'))} (${invs.length})</button></div></div>
  <div id="invEdit" ${invTab === 'edit' ? '' : 'hidden'}>
   <p class="muted center">${esc(t('invSub'))}</p>
   <div class="cols">
    <form class="card" id="invForm" autocomplete="off" novalidate>
      <label class="lab">${esc(t('fTemplate'))}</label>
      <div class="tpl-pick">${C.TEMPLATES.map(x => `<button type="button" data-tpl="${x.id}" class="${d.tpl === x.id ? 'on' : ''}" style="background:${x.sw}">${esc(tx(x))}</button>`).join('')}</div>
      <label class="lab">${esc(t('fAccent'))}</label>
      <div class="row"><div class="swatches">${C.ACCENTS.map(c => `<button type="button" class="swatch ${d.accent === c ? 'on' : ''}" data-acc="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}<button type="button" class="swatch ${!d.accent ? 'on' : ''}" data-acc="" style="background:conic-gradient(#D6AD62,#B21F58,#087F73,#D6AD62)" aria-label="${esc(t('accentAuto'))}"></button></div><input type="color" id="accIn" value="${esc(d.accent || '#D6AD62')}" aria-label="${esc(t('fAccent'))}"></div>
      <label class="lab" for="f_title">${esc(t('fTitle'))}</label><input id="f_title" data-f="title" value="${esc(d.title)}" placeholder="${esc(t('cKitty'))}">
      <label class="lab" for="f_host">${esc(t('fHost'))} <span class="opt">*</span></label><input id="f_host" data-f="host" value="${esc(d.host)}" required>
      <div class="row" style="align-items:flex-start"><div style="flex:1"><label class="lab" for="f_date">${esc(t('fDate'))} <span class="opt">*</span></label><input id="f_date" type="date" data-f="date" value="${esc(d.date)}" required></div><div style="flex:1"><label class="lab" for="f_time">${esc(t('fTime'))}</label><input id="f_time" type="time" data-f="time" value="${esc(d.time)}"></div></div>
      <label class="lab">${esc(t('fWhere'))}</label>
      <div class="seg"><button type="button" data-vt="home" class="${d.venueType === 'home' ? 'on' : ''}">${esc(t('vHome'))}</button><button type="button" data-vt="other" class="${d.venueType === 'other' ? 'on' : ''}">${esc(t('vOther'))}</button></div>
      <div ${d.venueType === 'other' ? '' : 'hidden'} id="venueWrap"><label class="lab" for="f_vn">${esc(t('fVenue'))}</label><input id="f_vn" data-f="venueName" value="${esc(d.venueName)}" placeholder="${esc(t('phVenue'))}"></div>
      <label class="lab" for="f_addr"><span>${esc(t('fPlace'))}</span>${lock('place')}</label><textarea id="f_addr" data-f="address" placeholder="${esc(t('phPlace'))}">${esc(d.address)}</textarea>
      <label class="lab" for="f_act"><span>${esc(t('fTheme'))}</span><span class="opt">${esc(t('opt'))}</span>${lock('act')}</label><input id="f_act" data-f="activities" value="${esc(d.activities)}" placeholder="${esc(t('phTheme'))}" list="themeList"><datalist id="themeList">${C.THEMES_OLD.map(x => `<option value="${esc(x[KP.L][0])}">`).join('')}</datalist>
      <label class="lab" for="f_dress">${esc(t('fDress'))} <span class="opt">${esc(t('opt'))}</span></label><input id="f_dress" data-f="dress" value="${esc(d.dress)}" placeholder="${esc(t('phDress'))}">
      <label class="lab"><span>${esc(t('fGames'))}</span><span class="opt">${esc(t('optTap'))}</span>${lock('games')}</label>
      <div class="chips" id="gChips">${C.MINUTE_GAMES.map(g => `<button type="button" class="chip ${(d.games || []).includes(g.id) ? 'on' : ''}" data-g="${g.id}">${esc(g[KP.L][0])}</button>`).join('')}</div>
      <label class="lab" for="f_menu"><span>${esc(t('fMenu'))}</span><span class="opt">${esc(t('opt'))}</span>${lock('menu')}</label><textarea id="f_menu" data-f="menu" placeholder="${esc(t('phMenu'))}">${esc(d.menu)}</textarea>
      <div class="row" style="margin-top:6px"><button type="button" class="btn ghost sm" id="menuGen">${ic('food')}${esc(t('suggestMenu'))}</button><a class="btn ghost sm" href="#food">${esc(t('openPlanner'))}</a></div>
      <label class="lab" for="f_note">${esc(t('fNote'))} <span class="opt">${esc(t('opt'))}</span></label><textarea id="f_note" data-f="note" placeholder="${esc(t('phNote'))}">${esc(d.note)}</textarea>
      <div class="row" style="align-items:flex-start"><div style="flex:1"><label class="lab" for="f_rsvp">${esc(t('fRsvp'))}</label><input id="f_rsvp" type="date" data-f="rsvpBy" value="${esc(d.rsvpBy)}"></div><div style="flex:1"><label class="lab" for="f_phone">${esc(t('fPhone'))}</label><input id="f_phone" data-f="phone" inputmode="tel" value="${esc(d.phone)}" placeholder="98xxxxxxxx"></div></div>
      <label class="lab" for="f_kitty">${esc(t('fKitty'))} <span class="opt">${esc(t('opt'))}</span></label><input id="f_kitty" data-f="kitty" value="${esc(d.kitty)}" placeholder="${esc(t('phKitty'))}">
      <label class="lab" for="f_priv">${ic('lock')} ${esc(t('fPrivate'))}</label><textarea id="f_priv" data-f="privateNote" placeholder="${esc(t('phPrivate'))}">${esc(d.privateNote)}</textarea>
      <p class="small muted" style="margin-top:10px">${esc(t('privacyNote'))}</p>
      <p class="small" id="invErr" style="color:var(--danger)" hidden></p>
    </form>
    <div style="position:sticky;top:12px">
      <div class="inv-wrap" id="invPrev">${KP.invHTML(d)}</div>
      <div style="display:grid;gap:12px;max-width:420px;margin:18px auto 0">
        <button class="btn big" type="button" id="invWa">${ic('wa')}${esc(t('sendWa'))}${ic('right', 'chev')}</button>
        <button class="btn ghost big" type="button" id="invImg">${ic('photo')}${esc(t('sharePic'))}${ic('right', 'chev')}</button>
        ${APP_URL ? `<button class="btn ghost" type="button" id="invLinkBtn">${ic('share')}${esc(t('shareLink'))}</button>` : ''}
      </div>
      <div class="row" style="margin-top:10px;justify-content:center">
        <button class="btn wine sm" type="button" id="invSave">${ic('check')}${esc(d.id ? t('saveChanges') : t('saveInv'))}</button>
        <button class="btn ghost sm" type="button" id="invCopy">${ic('copy')}${esc(t('copyText'))}</button>
        <button class="btn ghost sm" type="button" id="invPrint">${ic('print')}${esc(t('print'))}</button>
        <button class="btn ghost sm" type="button" id="invNew">${ic('plus')}${esc(t('newInv'))}</button>
      </div>
      <p class="small muted center" style="margin-top:8px">${esc(APP_URL ? t('picNote') : t('picNotePreview'))}</p>
    </div>
   </div>
  </div>
  <div id="invSaved" ${invTab === 'saved' ? '' : 'hidden'}>
    ${invs.length ? `<div class="grid">${invs.map(x => `<div class="card"><div class="card-title"><span class="ic">${ic('mail')}</span><h3>${esc(x.data.title || t('cKitty'))}</h3></div><p class="small" style="margin:0">${esc(x.data.date ? fmtDate(x.data.date) : t('pickDate'))}</p><p class="small muted">${esc(t('hostedBy', x.data.host || '—'))}</p><div class="row"><button class="btn sm" data-open="${x.id}" type="button">${ic('edit')}${esc(t('open'))}</button><button class="btn ghost sm" data-dup="${x.id}" type="button">${ic('copy')}${esc(t('duplicate'))}</button><button class="btn danger sm icon" data-del="${x.id}" type="button" aria-label="${esc(t('delete'))}">${ic('trash')}</button></div></div>`).join('')}</div>` : empty('mail', t('noSaved'))}
  </div>`;
  const prev = () => { $('#invPrev').innerHTML = KP.invHTML(d) };
  const valid = () => { const miss = []; if (!d.host.trim()) miss.push(t('fHost')); if (!d.date) miss.push(t('fDate')); const e = $('#invErr'); if (miss.length) { e.textContent = t('fillThese', miss.join(', ')); e.hidden = false; $(!d.host.trim() ? '#f_host' : '#f_date').focus(); return false } e.hidden = true; return true };
  el.oninput = e => { const f = e.target.dataset.f; if (f) { d[f] = e.target.value; save(); prev() } if (e.target.id === 'accIn') { d.accent = e.target.value; save(); prev(); $$('.swatch').forEach(s => s.classList.remove('on')) } };
  el.onclick = async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.tab) { invTab = b.dataset.tab; KP.renderInvite(el); return }
    if (b.dataset.tpl) { d.tpl = b.dataset.tpl; save(); $$('[data-tpl]').forEach(x => x.classList.toggle('on', x === b)); prev(); return }
    if (b.dataset.acc != null) { d.accent = b.dataset.acc; save(); $$('.swatch').forEach(x => x.classList.toggle('on', x === b)); prev(); return }
    if (b.dataset.vt) { d.venueType = b.dataset.vt; save(); $$('[data-vt]').forEach(x => x.classList.toggle('on', x === b)); $('#venueWrap').hidden = d.venueType !== 'other'; prev(); return }
    if (b.dataset.s) { d.secrets[b.dataset.s] = !d.secrets[b.dataset.s]; save(); b.classList.toggle('on', d.secrets[b.dataset.s]); b.setAttribute('aria-pressed', d.secrets[b.dataset.s]); b.innerHTML = ic('lock') + esc(d.secrets[b.dataset.s] ? t('secretOn') : t('secret')); prev(); return }
    if (b.dataset.g) { const g = new Set(d.games || []); g.has(b.dataset.g) ? g.delete(b.dataset.g) : g.add(b.dataset.g); d.games = [...g]; save(); b.classList.toggle('on'); prev(); return }
    if (b.id === 'menuGen') { d.menu = KP.mixMenu(); save(); $('#f_menu').value = d.menu; prev(); return }
    if (b.id === 'invWa') { if (!valid()) return; window.open(waLink(KP.invText(d, KP.invLink(d))), '_blank', 'noopener'); log('ಆಹ್ವಾನ ವಾಟ್ಸ್‌ಆಪ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ', 'Sent the invitation on WhatsApp'); return }
    if (b.id === 'invCopy') { copyText(KP.invText(d, KP.invLink(d))); return }
    if (b.id === 'invLinkBtn') { if (!valid()) return; const L = KP.invLink(d); const s = dlg.open(`<h3>${esc(t('shareLink'))}</h3><p class="small muted">${esc(t('linkNote'))}</p><input readonly value="${esc(L)}" id="lnk"><div class="row" style="margin-top:12px"><button class="btn" id="lnkCopy" type="button">${ic('copy')}${esc(t('copy'))}</button><a class="btn ghost" target="_blank" rel="noopener" href="${esc(waLink(t('linkMsg', d.title || t('cKitty')) + '\n' + L))}">${ic('wa')}${esc(t('sendWa'))}</a><button class="btn ghost" data-close type="button">${esc(t('close'))}</button></div>`); $('#lnkCopy', s).onclick = () => copyText(L); return }
    if (b.id === 'invImg') { if (!valid()) return; b.disabled = true; const old = b.innerHTML; b.innerHTML = esc(t('making')); try { const blob = await invImage($('#invPrev .inv')); const r = await shareFile(blob, 'kitty-invite.png', KP.invText(d, KP.invLink(d))); if (r === 'downloaded') toast(t('picSaved')); if (r === 'fail') toast(t('picFail')); log('ಆಹ್ವಾನದ ಚಿತ್ರ ತಯಾರಿಸಲಾಗಿದೆ', 'Made the invitation picture') } catch (err) { toast(t('picFail')) } b.disabled = false; b.innerHTML = old; return }
    if (b.id === 'invPrint') { $('#printArea').innerHTML = KP.invHTML(d); try { window.print() } catch (err) { toast(t('printFail')) } return }
    if (b.id === 'invSave') { if (!valid()) return; const L = D.invs(); if (!d.id) d.id = uid(); const i = L.findIndex(x => x.id === d.id); const rec = { id: d.id, updated: Date.now(), data: JSON.parse(JSON.stringify(d)) }; i < 0 ? L.unshift(rec) : (L[i] = rec); D.setInvs(L); save(); toast(t('saved')); log('ಆಹ್ವಾನ ಉಳಿಸಲಾಗಿದೆ: ' + (d.title || 'ಕಿಟ್ಟಿ ಪಾರ್ಟಿ'), 'Saved invitation: ' + (d.title || 'Kitty Party')); KP.renderInvite(el); return }
    if (b.id === 'invNew') { ask(t('newInvQ'), t('newInvB'), () => { d = blankInv(); const np = KP.nextParty(); if (np && np.turn) d.host = np.host; store.set('invDraft', d); KP.renderInvite(el) }); return }
    if (b.dataset.open) { const x = D.invs().find(v => v.id === b.dataset.open); if (x) { store.set('invDraft', JSON.parse(JSON.stringify(x.data))); invTab = 'edit'; KP.renderInvite(el) } return }
    if (b.dataset.dup) { const x = D.invs().find(v => v.id === b.dataset.dup); if (x) { const c = JSON.parse(JSON.stringify(x.data)); c.id = ''; c.date = ''; store.set('invDraft', c); invTab = 'edit'; KP.renderInvite(el); toast(t('dupDone')) } return }
    if (b.dataset.del) { ask(t('delInvQ'), t('cantUndo'), () => { D.setInvs(D.invs().filter(v => v.id !== b.dataset.del)); KP.renderInvite(el) }, t('delete')); return }
  };
};

/* ================= shared invitation page (?inv=) ================= */
KP.renderSharedInvite = d => {
  d = Object.assign(blankInv(), d); d.secrets = Object.assign({ place: false, act: false, menu: false, games: false }, d.secrets || {});
  const host = d.host || t('cHostDef');
  const yes = t('rsvpYesMsg', d.title || t('cKitty'), d.date ? fmtDate(d.date) : ''), no = t('rsvpNoMsg', d.title || t('cKitty'));
  const start = d.date ? d.date.replace(/-/g, '') + 'T' + (d.time || '16:00').replace(':', '') + '00' : '';
  const gcal = start ? 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(d.title || t('cKitty')) + '&dates=' + start + '/' + start + '&details=' + encodeURIComponent(t('hostedBy', host)) + '&location=' + encodeURIComponent(d.secrets.place ? '' : [d.venueName, d.address].filter(Boolean).join(', ')) + '&ctz=Asia/Kolkata' : '';
  $('.nav').hidden = true; $('#deskNav').hidden = true; $('#main').innerHTML = `<div class="shared-inv"><div style="max-width:480px;margin:0 auto">
    <div class="inv-wrap">${KP.invHTML(d)}</div>
    <div class="card" style="margin-top:16px;text-align:center"><h3>${esc(t('rsvpQ'))}</h3>
      ${d.phone ? `<div class="row" style="justify-content:center"><a class="btn" target="_blank" rel="noopener" href="${esc(waLink(yes, d.phone))}">${ic('check')}${esc(t('rsvpYes'))}</a><a class="btn ghost" target="_blank" rel="noopener" href="${esc(waLink(no, d.phone))}">${esc(t('rsvpNo'))}</a></div>` : `<p class="small muted">${esc(t('rsvpGroup'))}</p>`}
      <div class="row" style="justify-content:center;margin-top:10px">${gcal ? `<a class="btn ghost sm" target="_blank" rel="noopener" href="${esc(gcal)}">${ic('cal')}${esc(t('addToCal'))}</a>` : ''}<a class="btn wine sm" href="${esc(APP_URL || './')}">${ic('home')}${esc(t('openApp'))}</a></div>
    </div></div></div>`;
};
})();
