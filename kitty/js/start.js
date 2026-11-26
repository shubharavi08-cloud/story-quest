/* Kitty Party Circle — navigation, routing and start-up */
(() => {
const KP = window.KP;
const { $, $$, esc, ic, store, t, applyWords, b64d } = KP;
const NAV = [['home', 'home', 'tHome'], ['invite', 'mail', 'tInvite'], ['game-housie', 'ticket', 'tHousie'], ['games', 'clock', 'tGames'], ['chat', 'chat', 'tChat'], ['food', 'cup', 'tFood']];
const drawNav = () => {
  const html = NAV.map(([r, i, k]) => `<a href="#${r}" data-r="${r}">${ic(i)}<span>${esc(t(k))}</span></a>`).join('');
  $('#nav').innerHTML = html; $('#deskNav').innerHTML = html;
};
const route = keep => {
  const h = location.hash.slice(1) || 'home';
  let top = h, sub = '';
  if (h.startsWith('game-')) { top = 'games'; sub = h.slice(5) }
  else if (h.startsWith('act-')) { top = 'act'; sub = h.slice(4) }
  if (!['home', 'invite', 'games', 'act', 'food', 'ideas', 'chat', 'people'].includes(top)) top = 'home';
  if (top === 'people' && !KP.isAdmin()) top = 'home';
  const navKey = h === 'game-housie' ? 'game-housie' : top;
  $$('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + top));
  $$('[data-r]').forEach(a => { a.classList.toggle('on', a.dataset.r === navKey); if (a.dataset.r === navKey) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current') });
  if (keep !== true) $('#drawer').hidden = true; drawBell(); KP.chatBadge && KP.chatBadge();
  const el = $('#v-' + top);
  try {
    ({ home: KP.renderHome, invite: KP.renderInvite, games: KP.renderGames, act: KP.renderAct, food: KP.renderFood, ideas: KP.renderIdeas, chat: KP.renderChat, people: KP.renderPeople })[top](el, sub);
  } catch (e) { console.error(e); el.innerHTML = `<div class="empty">${esc(t('somethingWrong'))}</div>` }
  if (keep === true) return;
  KP.dlg && $('#dlg').classList.contains('on') && KP.dlg.close();
  $$('.winner,.lightbox').forEach(w => w.remove());
  window.scrollTo(0, 0);
};
KP.route = route;
const drawAll = () => { applyWords(); drawNav(); route() };
KP.drawAll = drawAll;
/* side menu */
const DRAWER = [['menuTitle', [['home', 'home', 'tHome'], ['invite', 'mail', 'tInvite'], ['game-housie', 'ticket', 'tHousie'], ['games', 'games', 'tGames'], ['chat', 'chat', 'tChat'], ['food', 'cup', 'tFood'], ['ideas', 'idea', 'tIdeas']]], ['menuMore', [['act-calendar', 'cal', 'aCal'], ['act-members', 'users', 'aMembers'], ['act-gallery', 'photo', 'aGallery'], ['act-celebrations', 'cake', 'aCeleb']]]];
const openDrawer = () => {
  const cur = location.hash.slice(1) || 'home';
  $('#drawerBody').innerHTML = DRAWER.map(([h, L]) => `<div class="dsec">${esc(t(h))}</div>` + L.map(([r, i, k]) => `<a class="dlink ${cur === r ? 'on' : ''}" href="#${r}">${ic(i)}${esc(t(k))}</a>`).join('')).join('') + `<div class="dsec">${esc(t('menuApp'))}</div><button class="dlink" type="button" id="dLang">${ic('lang')}${esc(t('langSwitch'))}</button>` + (KP.isStandalone() ? '' : `<button class="dlink" type="button" id="dInst">${ic('install')}${esc(t('instBtn'))}</button>`)
    + (KP.isAdmin() ? `<a class="dlink ${cur === 'people' ? 'on' : ''}" href="#people">${ic('phone')}${esc(t('peopleTitle'))}</a>` : '')
    + (KP.cloud && KP.cloud.sb ? `<button class="dlink" type="button" id="dHost">${ic('key')}${esc(KP.isAdmin() ? t('logout') : t('hostLogin'))}</button>` : '');
  applyWords($('#drawer')); $('#drawer').hidden = false; $('#drawerX').focus();
};
$('#menuBtn').onclick = openDrawer;
$('#drawerX').onclick = () => { $('#drawer').hidden = true };
$('#drawer').onclick = e => { if (e.target.id === 'drawer') $('#drawer').hidden = true; if (e.target.closest('#dLang')) { $('#drawer').hidden = true; KP.toggleLang() } if (e.target.closest('#dInst')) { $('#drawer').hidden = true; KP.install() } if (e.target.closest('#dHost')) { $('#drawer').hidden = true; KP.hostLogin() } if (e.target.closest('a.dlink')) $('#drawer').hidden = true };
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#drawer').hidden = true });
/* bell: reminders */
function bellItems() {
  const out = []; const np = KP.nextParty && KP.nextParty();
  if (np && np.inv) { const n = KP.daysUntil(KP.parseISO(np.inv.date)); if (n <= 14) out.push({ i: 'mail', h: '#invite', a: t('bellParty'), b: KP.fmtDate(np.inv.date, { weekday: 'short', day: 'numeric', month: 'long' }) + ' · ' + t('inDays', n) }) }
  KP.upcomingPeople(KP.D.members(), 7).forEach(p => out.push({ i: 'cake', h: '#act-celebrations', a: p.m.name + ' — ' + t(p.lab), b: p.n === 0 ? t('today') : t('inDays', p.n) }));
  KP.C.FESTIVALS.forEach(f => { const n = KP.daysUntil(KP.parseISO(f.d)); if (n >= 0 && n <= 14) out.push({ i: 'cal', h: '#act-celebrations', a: t('bellFest') + ': ' + KP.tx(f), b: t('inDays', n) }) });
  store.get('ann', []).slice(0, 3).forEach(a => out.push({ i: 'bell', h: '#home', a: a.text.slice(0, 80), b: KP.fmtShort(new Date(a.at)) }));
  const un = KP.chatUnread ? KP.chatUnread() : 0; if (un) out.unshift({ i: 'chat', h: '#chat', a: t('newMsg'), b: String(un) });
  return out;
}
function drawBell() { try { $('#bellDot').hidden = !bellItems().length } catch (e) {} }
KP.drawBell = drawBell;
$('#bellBtn').onclick = () => { const L = bellItems(); KP.dlg.open(`<h3>${esc(t('bellTitle'))}</h3>${L.length ? `<div class="list">${L.map(x => `<a class="li" href="${x.h}" data-close style="text-decoration:none;color:inherit"><span class="ic">${ic(x.i)}</span><div class="grow"><b>${esc(x.a)}</b><span class="small muted">${esc(x.b)}</span></div></a>`).join('')}</div>` : `<p class="muted">${esc(t('bellEmpty'))}</p>`}<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`) };
KP.toggleLang = () => { KP.L = KP.L === 'kn' ? 'en' : 'kn'; store.set('lang', KP.L); drawAll() };
$('#gClose').onclick = () => { $('#guide').hidden = true };
addEventListener('hashchange', route);

/* links shared from the app */
const q = new URLSearchParams(location.search);
if (q.get('inv')) { const d = b64d(q.get('inv')); applyWords(); if (d) { KP.renderSharedInvite(d); return } }
drawAll();
KP.cloudStart && KP.cloudStart();
setTimeout(() => KP.buildFestCache && KP.buildFestCache(), 4000);
if (q.get('members')) { const L = b64d(q.get('members')); if (L && KP.canEdit()) KP.importMembers(L); try { history.replaceState(null, '', location.pathname + location.hash) } catch (e) {} }
try { if (KP.APP_URL && 'serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {}) } catch (e) {}
})();
