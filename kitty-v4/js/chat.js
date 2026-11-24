/* Kitty Party Circle — group chat and the admin's "who has joined" list */
(() => {
const KP = window.KP;
const { $, $$, esc, ic, store, t, toast, ask, empty, initials, waLink, fmtDate, shareFile, uid } = KP;
const C = KP.cloud;
let msgs = store.get('chatCache', []), chan = null, loaded = false;

const lastRead = () => store.get('chatRead', 0);
KP.chatUnread = () => { const me = C.user && C.user.id; return msgs.filter(m => m.id > lastRead() && m.uid !== me).length };
KP.chatBadge = () => { const n = KP.chatUnread(); $$('[data-r="chat"]').forEach(a => { let d = a.querySelector('.ndot'); if (n && !d) { d = document.createElement('i'); d.className = 'ndot'; a.appendChild(d) } if (!n && d) d.remove() }) };
const onChat = () => (location.hash.slice(1) || 'home') === 'chat' && document.visibilityState === 'visible';
const markRead = () => { if (msgs.length) store.set('chatRead', msgs[msgs.length - 1].id); KP.chatBadge(); KP.drawBell && KP.drawBell() };
const keep = () => store.set('chatCache', msgs.slice(-80));

KP.chatPull = async () => {
  if (!C.sb || !C.user) return;
  try {
    const { data, error } = await C.sb.from('messages').select('id,uid,name,body,is_host,created_at').order('id', { ascending: false }).limit(150);
    if (error) throw error;
    msgs = data.reverse(); loaded = true; keep();
    if (onChat()) { drawList(true); markRead() } else KP.chatBadge();
    KP.drawBell && KP.drawBell();
  } catch (e) {}
};
KP.chatStart = () => {
  if (!C.sb || !C.user || chan) return;
  KP.chatPull();
  chan = C.sb.channel('chat-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, p => { const m = p.new; if (!m || msgs.some(x => x.id === m.id)) return; msgs.push(m); keep(); if (onChat()) { drawList(); markRead() } else { KP.chatBadge(); KP.drawBell && KP.drawBell(); if (m.uid !== C.user.id) toast('💬 ' + m.name + ': ' + m.body.slice(0, 60)) } })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, p => { const id = p.old && p.old.id; if (!id) return; msgs = msgs.filter(x => x.id !== id); keep(); if (onChat()) drawList() })
    .subscribe();
};

const dayLabel = d => { const a = new Date(d); a.setHours(0, 0, 0, 0); const n = KP.today(); const diff = Math.round((n - a) / 864e5); return diff === 0 ? t('chatToday') : diff === 1 ? t('chatYesterday') : fmtDate(a, { day: 'numeric', month: 'long' }) };
const hhmm = d => { const x = new Date(d); return KP.fmtTime(String(x.getHours()).padStart(2, '0') + ':' + String(x.getMinutes()).padStart(2, '0')) };
function drawList(jump) {
  const box = $('#chatList'); if (!box) return;
  const atEnd = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
  const me = C.user && C.user.id; let lastDay = '';
  box.innerHTML = msgs.length ? msgs.map(m => {
    const day = dayLabel(m.created_at); const sep = day !== lastDay ? `<div class="cday"><span>${esc(day)}</span></div>` : ''; lastDay = day;
    const mine = m.uid === me; const canDel = mine || KP.isAdmin();
    return sep + `<div class="msg ${mine ? 'me' : ''}">${mine ? '' : `<div class="who">${esc(m.name)}${m.is_host ? ` <span class="badge gold">${esc(t('owner'))}</span>` : ''}</div>`}<div class="bub">${esc(m.body)}</div><div class="mt">${esc(hhmm(m.created_at))}${canDel ? ` <button type="button" class="mdel" data-del="${m.id}" aria-label="${esc(t('delete'))}">${ic('trash')}</button>` : ''}</div></div>`;
  }).join('') : empty('chat', t('chatEmpty'));
  if (jump || atEnd) box.scrollTop = box.scrollHeight;
}
KP.renderChat = el => {
  if (!C.sb) { el.innerHTML = KP.ptitle(t('chatTitle')) + empty('chat', t('chatOffline')); return }
  if (!C.user) { el.innerHTML = KP.ptitle(t('chatTitle')) + `<div class="center">${empty('chat', t('chatNeedJoin'))}<button class="btn" id="cJoin" type="button">${esc(t('joinBtn'))}</button></div>`; $('#cJoin', el).onclick = () => KP.joinScreen(false); return }
  el.innerHTML = `<div class="chat"><div class="chat-head"><h2>${ic('chat', '')} ${esc(t('chatTitle'))}</h2></div><div class="chat-list" id="chatList" aria-live="polite"></div>
    <div class="chat-bar"><div class="qr">${t('quickReplies').map(q => `<button type="button" class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
    <div class="row cin"><textarea id="chatIn" rows="1" maxlength="1000" placeholder="${esc(t('chatPh'))}" aria-label="${esc(t('chatPh'))}"></textarea><button class="btn wine icon big" id="chatSend" type="button" aria-label="${esc(t('send'))}">${ic('send')}</button></div></div></div>`;
  drawList(true); markRead();
  if (!loaded) KP.chatPull();
  const inp = $('#chatIn', el);
  const grow = () => { inp.style.height = 'auto'; inp.style.height = Math.min(120, inp.scrollHeight) + 'px' };
  inp.oninput = grow;
  const send = async text => {
    text = (text || '').trim(); if (!text) return;
    const b = $('#chatSend'); b.disabled = true;
    try {
      const { data, error } = await C.sb.from('messages').insert({ body: text.slice(0, 1000) }).select('id,uid,name,body,is_host,created_at').single();
      if (error) throw error;
      if (!msgs.some(x => x.id === data.id)) { msgs.push(data); keep() }
      if (text === inp.value.trim()) { inp.value = ''; grow() }
      drawList(true); markRead();
    } catch (e) { toast(t('chatFail')) }
    b.disabled = false;
  };
  $('#chatSend', el).onclick = () => send(inp.value);
  inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey && !/Android|iPhone|iPad/.test(navigator.userAgent)) { e.preventDefault(); send(inp.value) } };
  el.onclick = e => {
    const q = e.target.closest('[data-q]'); if (q) { send(q.dataset.q); return }
    const d = e.target.closest('[data-del]'); if (d) { const id = +d.dataset.del; ask(t('delMsgQ'), '', async () => { try { const { error } = await C.sb.from('messages').delete().eq('id', id); if (error) throw error; msgs = msgs.filter(x => x.id !== id); keep(); drawList() } catch (x) { toast(t('chatFail')) } }, t('delete')) }
  };
};

/* ---------- admin: who has joined ---------- */
KP.renderPeople = async el => {
  el.innerHTML = KP.ptitle(t('peopleTitle'), t('peopleSub')) + `<div class="card" id="pplBox"><p class="muted">${esc(t('wait'))}</p></div>`;
  let rows = [];
  try { const { data, error } = await C.sb.from('people').select('uid,name,phone,joined_at,last_seen,device').order('joined_at', { ascending: false }); if (error) throw error; rows = data } catch (e) { $('#pplBox').innerHTML = empty('users', t('peopleFail')); return }
  /* one line per phone number (the same lady may join from two phones or from the app and the browser) */
  const by = {}; rows.filter(r => r.phone !== '0000000000').forEach(r => { const k = r.phone; const x = by[k]; if (!x) by[k] = Object.assign({ uids: [r.uid], devices: [r.device].filter(Boolean) }, r); else { x.uids.push(r.uid); if (r.device && !x.devices.includes(r.device)) x.devices.push(r.device); if (r.last_seen > x.last_seen) { x.last_seen = r.last_seen; x.name = r.name } if (r.joined_at < x.joined_at) x.joined_at = r.joined_at } });
  const L = Object.values(by).sort((a, b) => a.name.localeCompare(b.name));
  const draw = () => {
    const mem = KP.D.members(); const has = p => mem.some(m => KP.cleanPhone(m.phone) === KP.cleanPhone(p.phone) || m.name.trim().toLowerCase() === p.name.trim().toLowerCase());
    const fd = d => fmtDate(new Date(d), { day: 'numeric', month: 'short' });
    $('#pplBox').innerHTML = `<div class="card-title"><span class="ic">${ic('users')}</span><h3>${esc(t('peopleCount', L.length))}</h3>${L.length ? `<button class="btn ghost sm" id="pplCsv" type="button">${ic('down')}${esc(t('saveListFile'))}</button>` : ''}</div>
      ${L.length ? `<div class="list">${L.map((p, i) => `<div class="li ppl"><span class="avatar">${esc(initials(p.name))}</span><div class="grow"><b>${esc(p.name)}</b><span class="small">${esc(p.phone)}</span><span class="small muted">${esc(t('joinedOn', fd(p.joined_at)) + ' · ' + t('lastSeen', fd(p.last_seen)))}</span></div>
        <div class="row" style="gap:6px;justify-content:flex-end"><a class="btn ghost sm icon" href="tel:+91${esc(p.phone)}" aria-label="${esc(t('call'))}">${ic('phone')}</a><a class="btn ghost sm icon" target="_blank" rel="noopener" href="${esc(waLink('', p.phone))}" aria-label="WhatsApp">${ic('wa')}</a>${has(p) ? `<span class="badge">${esc(t('inMembers'))}</span>` : `<button class="btn sm" type="button" data-add="${i}">${ic('plus')}${esc(t('addToMembers'))}</button>`}<button class="btn danger sm icon" type="button" data-rm="${i}" aria-label="${esc(t('delete'))}">${ic('trash')}</button></div></div>`).join('')}</div>` : empty('users', t('noPeople'))}`;
  };
  draw();
  el.onclick = async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.add) { const p = L[+b.dataset.add]; const M = KP.D.members(); M.push({ id: uid(), name: p.name, phone: p.phone, bday: '', anniv: '', since: p.joined_at.slice(0, 10), cat: 'member', photo: '' }); KP.D.setMembers(M); toast(t('addedMember', p.name)); draw(); return }
    if (b.dataset.rm) { const p = L[+b.dataset.rm]; ask(t('removePersonQ', p.name), '', async () => { try { const { error } = await C.sb.from('people').delete().in('uid', p.uids); if (error) throw error; L.splice(+b.dataset.rm, 1); draw() } catch (x) { toast(t('peopleFail')) } }, t('delete')); return }
    if (b.id === 'pplCsv') { const q = s => '"' + String(s).replace(/"/g, '""') + '"'; const csv = '﻿' + [['Name', 'Phone', 'Joined', 'Last seen', 'Device'].join(','), ...L.map(p => [q(p.name), q('+91 ' + p.phone), q(p.joined_at.slice(0, 10)), q(p.last_seen.slice(0, 10)), q(p.devices.join(' / '))].join(','))].join('\n'); shareFile(new Blob([csv], { type: 'text/csv' }), 'kitty-members.csv') }
  };
};
})();
