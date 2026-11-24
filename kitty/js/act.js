/* Kitty Party Circle — Activities (calendar, members, photos, celebrations), Food, Ideas */
(() => {
const KP = window.KP, C = KP.C, D = KP.D;
const { $, $$, esc, ic, store, idb, t, tx, fmtDate, fmtShort, fmtTime, parseISO, iso, today, daysUntil, nextYearly, waLink, copyText, shareFile, toast, dlg, ask, empty, uid, initials, pick, b64e, APP_URL, fileToJpeg, blobToDataURL, log } = KP;
const nm = n => KP.nm(n);

/* ================= ACTIVITIES HUB ================= */
const SUBS = [['calendar', 'cal', 'aCal'], ['members', 'users', 'aMembers'], ['gallery', 'photo', 'aGallery'], ['celebrations', 'cake', 'aCeleb']];
KP.renderAct = (el, sub) => {
  sub = SUBS.some(s => s[0] === sub) ? sub : store.get('actSub', 'calendar'); store.set('actSub', sub);
  el.innerHTML = KP.ptitle(t('actTitle')) + `<div class="row" style="justify-content:center;margin-bottom:14px"><div class="seg">${SUBS.map(([id, i, k]) => `<button type="button" data-sub="${id}" class="${sub === id ? 'on' : ''}">${esc(t(k))}</button>`).join('')}</div></div><div id="actBody"></div>`;
  el.onclick = e => { const b = e.target.closest('[data-sub]'); if (b) location.hash = 'act-' + b.dataset.sub };
  ({ calendar: renderCalendar, members: renderMembers, gallery: renderGallery, celebrations: renderCeleb })[sub]($('#actBody', el));
};

/* ================= CALENDAR ================= */
function allEvents() {
  const ev = [];
  D.invs().forEach(x => { const d = x.data; if (d.date) ev.push({ id: 'inv-' + x.id, kind: 'party', date: d.date, title: d.title || t('cKitty'), host: d.host, time: d.time, venue: d.secrets && d.secrets.place ? '' : [d.venueType === 'other' ? d.venueName : t('atHome', d.host || ''), d.address].filter(Boolean).join(' · ') }) });
  const y0 = today().getFullYear();
  C.FESTIVALS.forEach(f => ev.push({ id: 'fest-' + f.id, kind: 'fest', date: f.d, title: tx(f), note: tx(f.idea) }));
  D.members().forEach(m => [['bday', 'bdayOf'], ['anniv', 'annivOf']].forEach(([k, lab]) => { if (!m[k]) return; [y0, y0 + 1].forEach(y => ev.push({ id: k + '-' + m.id + '-' + y, kind: 'bday', date: y + '-' + m[k].slice(5), title: m.name + ' — ' + t(lab), member: m, wishKey: k })) }));
  return ev.sort((a, b) => a.date < b.date ? -1 : 1);
}
KP.allEvents = allEvents;
function renderCalendar(el) {
  let cm = store.get('calMonth', null); const now = today();
  if (!cm) cm = { y: now.getFullYear(), m: now.getMonth() };
  let sel = store.get('calSel', iso(now));
  const draw = () => {
    const ev = allEvents(); const byDay = {}; ev.forEach(e => (byDay[e.date] = byDay[e.date] || []).push(e));
    const first = new Date(cm.y, cm.m, 1); const startDow = (first.getDay() + 6) % 7; const days = new Date(cm.y, cm.m + 1, 0).getDate();
    const cells = []; for (let i = 0; i < 42; i++) { const d = new Date(cm.y, cm.m, 1 - startDow + i); cells.push(d); if (i >= 34 && d.getMonth() !== cm.m && i % 7 === 0) break }
    const dows = KP.L === 'kn' ? ['ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ', 'ಭಾ'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const cal = D.cal(); const turn = cal.find(c => c.y === cm.y && c.m === cm.m);
    const selEv = byDay[sel] || [];
    const up = ev.filter(e => e.date >= iso(now)).slice(0, 8);
    const pastParties = ev.filter(e => e.kind === 'party' && e.date < iso(now)).reverse().slice(0, 6);
    el.innerHTML = `<div class="cols">
      <div class="card"><div class="cal-head"><button class="btn ghost icon" data-mv="-1" type="button" aria-label="${esc(t('prevMonth'))}">${ic('left')}</button><h3>${esc(KP.monthLabel(cm.y, cm.m))}</h3><button class="btn ghost icon" data-mv="1" type="button" aria-label="${esc(t('nextMonth'))}">${ic('right')}</button></div>
        ${turn ? `<p class="small" style="text-align:center;margin:-2px 0 10px"><span class="badge rose">${esc(t('turnOf', nm(turn.host)))}</span></p>` : ''}
        <div class="cal-grid">${dows.map(d => `<div class="dow">${d}</div>`).join('')}${cells.map(d => { const k = iso(d); const es = byDay[k] || []; const kinds = [...new Set(es.map(e => e.kind))]; return `<button type="button" data-day="${k}" class="${d.getMonth() !== cm.m ? 'out' : ''} ${k === iso(now) ? 'today' : ''} ${k === sel ? 'sel' : ''}" aria-label="${esc(fmtDate(d))}${es.length ? ' — ' + es.length : ''}">${d.getDate()}<span class="dots">${kinds.map(x => `<i class="d-${x}"></i>`).join('')}</span></button>` }).join('')}</div>
        <div class="legend"><span><i class="d-party"></i>${esc(t('lgParty'))}</span><span><i class="d-fest"></i>${esc(t('lgFest'))}</span><span><i class="d-bday"></i>${esc(t('lgBday'))}</span></div>
        <div class="row" style="margin-top:12px"><button class="btn ghost sm" id="today" type="button">${esc(t('todayBtn'))}</button><button class="btn ghost sm" id="turns" type="button">${ic('users')}${esc(t('turnsList'))}</button><a class="btn sm adm" href="#invite">${ic('plus')}${esc(t('newEvent'))}</a></div>
      </div>
      <div class="stack">
        <div class="card"><h3>${esc(fmtDate(sel))}</h3>${selEv.length ? `<div class="list">${selEv.map(evRow).join('')}</div>` : `<p class="muted small" style="margin:0">${esc(t('noEventsDay'))}</p>`}</div>
        <div class="card"><h3>${esc(t('upcoming'))}</h3>${up.length ? `<div class="list">${up.map(evRow).join('')}</div>` : empty('cal', t('noUpcoming'))}</div>
        <div class="card"><h3>${esc(t('pastParties'))}</h3>${pastParties.length ? `<div class="list">${pastParties.map(evRow).join('')}</div>` : `<p class="muted small" style="margin:0">${esc(t('noPast'))}</p>`}</div>
      </div></div>`;
  };
  const evRow = e => { const d = parseISO(e.date); return `<button type="button" class="ev ${e.kind}" data-ev="${esc(e.id)}"><span class="dt"><b>${d.getDate()}</b><span>${esc(d.toLocaleDateString(KP.L === 'kn' ? 'kn-IN' : 'en-IN', { month: 'short' }))}</span></span><span style="flex:1"><b style="display:block;color:var(--wine)">${esc(e.title)}</b><span class="small muted">${esc(e.kind === 'party' ? [e.time ? fmtTime(e.time) : '', e.host ? t('hostedBy', e.host) : ''].filter(Boolean).join(' · ') : e.kind === 'fest' ? t('lgFest') : t('lgBday'))}</span></span>${ic('right')}</button>` };
  draw();
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mv) { cm.m += +b.dataset.mv; if (cm.m < 0) { cm.m = 11; cm.y-- } if (cm.m > 11) { cm.m = 0; cm.y++ } store.set('calMonth', cm); draw(); return }
    if (b.dataset.day) { sel = b.dataset.day; store.set('calSel', sel); draw(); return }
    if (b.id === 'today') { const n = today(); cm = { y: n.getFullYear(), m: n.getMonth() }; sel = iso(n); store.set('calMonth', cm); store.set('calSel', sel); draw(); return }
    if (b.id === 'turns') { turnsDialog(draw); return }
    if (b.dataset.ev) { const ev = allEvents().find(x => x.id === b.dataset.ev); if (ev) eventDialog(ev, draw) }
  };
}
function turnsDialog(after) {
  const cal = D.cal(); const cur = KP.currentTurnIdx();
  if (!KP.canEdit()) { dlg.open(`<h3>${esc(t('turnsList'))}</h3><div class="list">${cal.map((c, i) => `<div class="li"><div class="grow"><span class="small muted">${esc(KP.monthLabel(c.y, c.m))}</span><b>${esc(nm(c.host))}</b></div>${i === cur ? `<span class="badge gold">${esc(t('nextTag'))}</span>` : ''}</div>`).join('')}</div><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`); return }
  const s = dlg.open(`<h3>${esc(t('turnsList'))}</h3><p class="small muted">${esc(t('turnsHint'))}</p><div class="list">${cal.map((c, i) => `<div class="li"><div class="grow"><span class="small muted">${esc(KP.monthLabel(c.y, c.m))}</span><input data-i="${i}" value="${esc(nm(c.host))}" style="margin-top:4px"></div>${i === cur ? `<span class="badge gold">${esc(t('nextTag'))}</span>` : ''}</div>`).join('')}</div><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="tOk" type="button">${esc(t('save'))}</button></div>`);
  $('#tOk', s).onclick = () => { $$('input[data-i]', s).forEach(inp => { const c = cal[+inp.dataset.i]; const v = inp.value.trim(); if (v && v !== nm(c.host)) c.host = v }); D.setCal(cal); dlg.close(); toast(t('saved')); after && after() };
}
function icsFor(e) {
  const dt = e.date.replace(/-/g, ''); const tm = (e.time || '16:00').replace(':', '') + '00';
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//KittyPartyCircle//EN', 'BEGIN:VEVENT', 'UID:' + e.id + '@kitty', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z', e.kind === 'party' ? 'DTSTART;TZID=Asia/Kolkata:' + dt + 'T' + tm : 'DTSTART;VALUE=DATE:' + dt, 'SUMMARY:' + e.title.replace(/[,;]/g, ' '), e.venue ? 'LOCATION:' + e.venue.replace(/[,;\n]/g, ' ') : '', 'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:' + e.title.replace(/[,;]/g, ' '), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].filter(Boolean).join('\r\n');
}
function eventDialog(e, after) {
  const start = e.date.replace(/-/g, '') + (e.kind === 'party' ? 'T' + (e.time || '16:00').replace(':', '') + '00' : '');
  const endD = e.kind === 'party' ? start : (() => { const d = parseISO(e.date); d.setDate(d.getDate() + 1); return iso(d).replace(/-/g, '') })();
  const gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(e.title) + '&dates=' + start + '/' + endD + (e.venue ? '&location=' + encodeURIComponent(e.venue) : '') + '&ctz=Asia/Kolkata';
  const members = D.members(); const att = store.get('att', {}); const here = new Set(att[e.id] || []);
  let body = `<h3>${esc(e.title)}</h3><p style="margin:0">${esc(fmtDate(e.date))}${e.time ? ' · ' + esc(fmtTime(e.time)) : ''}</p>`;
  if (e.host) body += `<p class="small muted" style="margin:2px 0">${esc(t('hostedBy', e.host))}</p>`;
  if (e.venue) body += `<p class="small" style="margin:2px 0">${ic('home', '')} ${esc(e.venue)}</p>`;
  if (e.note) body += `<p class="small">${esc(e.note)}</p>`;
  body += `<div class="row" style="margin:12px 0"><a class="btn ghost sm" target="_blank" rel="noopener" href="${esc(gcal)}">${ic('cal')}${esc(t('addToCal'))}</a><button class="btn ghost sm" id="ics" type="button">${ic('down')}${esc(t('icsBtn'))}</button>`;
  if (e.kind === 'fest') { const f = C.FESTIVALS.find(x => 'fest-' + x.id === e.id); if (f) body += `<a class="btn sm" target="_blank" rel="noopener" href="${esc(waLink(tx(f.wish)))}">${ic('wa')}${esc(t('sendWish'))}</a>` }
  if (e.kind === 'bday' && e.member) { const msg = tx(C.WISHES[e.wishKey === 'bday' ? 'bday' : 'anniv']).replace('{n}', e.member.name); body += `<a class="btn sm" target="_blank" rel="noopener" href="${esc(waLink(msg, e.member.phone))}">${ic('wa')}${esc(t('wish'))}</a>` }
  body += `</div>`;
  if (e.kind === 'party') {
    body += `<h4>${esc(t('attendance'))}</h4>` + (members.length ? `<p class="small muted adm">${esc(t('attHint'))}</p><div class="chips" id="att">${members.map(m => `<button type="button" class="chip ${here.has(m.id) ? 'on' : ''}" data-m="${m.id}">${esc(m.name)}</button>`).join('')}</div><p class="small" id="attCount" style="margin-top:8px">${esc(t('attCount', here.size, members.length))}</p>` : `<p class="small muted">${esc(t('attNoMembers'))}</p>`);
  }
  body += `<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`;
  const s = dlg.open(body, after);
  const ib = $('#ics', s); if (ib) ib.onclick = () => shareFile(new Blob([icsFor(e)], { type: 'text/calendar' }), 'kitty-event.ics');
  const ab = $('#att', s); if (ab && KP.canEdit()) ab.onclick = ev => { const c = ev.target.closest('[data-m]'); if (!c) return; here.has(c.dataset.m) ? here.delete(c.dataset.m) : here.add(c.dataset.m); c.classList.toggle('on'); att[e.id] = [...here]; store.set('att', att); $('#attCount', s).textContent = t('attCount', here.size, members.length) };
}

/* ================= MEMBERS ================= */
let mFilter = 'all', mQuery = '';
function renderMembers(el) {
  const draw = () => {
    const all = D.members(); const q = mQuery.trim().toLowerCase();
    const list = all.filter(m => (mFilter === 'all' || m.cat === mFilter) && (!q || m.name.toLowerCase().includes(q))).sort((a, b) => a.name.localeCompare(b.name));
    const soon = KP.upcomingPeople(all, 30);
    el.innerHTML = `<div class="cols">
      <div class="card"><div class="card-title"><span class="ic">${ic('users')}</span><h3>${esc(t('membersTitle'))} (${all.length})</h3><button class="btn sm adm" id="mAdd" type="button">${ic('plus')}${esc(t('addMember'))}</button></div>
        <div class="row" style="margin-bottom:10px"><div style="flex:1;position:relative"><input id="mQ" type="search" value="${esc(mQuery)}" placeholder="${esc(t('searchMembers'))}" aria-label="${esc(t('searchMembers'))}"></div></div>
        <div class="chips" style="margin-bottom:12px"><button type="button" class="chip ${mFilter === 'all' ? 'on' : ''}" data-f="all">${esc(t('allCats'))}</button>${C.MEMBER_CATS.map(c => `<button type="button" class="chip ${mFilter === c.id ? 'on' : ''}" data-f="${c.id}">${esc(tx(c))}</button>`).join('')}</div>
        ${list.length ? `<div class="list">${list.map(m => `<button type="button" class="li" data-mid="${m.id}" style="text-align:left;font:inherit;cursor:pointer;width:100%"><span class="avatar">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : esc(initials(m.name))}</span><span class="grow"><b>${esc(m.name)}</b><span class="small muted">${esc([tx(C.MEMBER_CATS.find(c => c.id === m.cat) || C.MEMBER_CATS[1]), m.bday ? t('bdayShort') + ' ' + fmtShort(KP.nextYearly(m.bday.slice(5))) : ''].filter(Boolean).join(' · '))}</span></span>${ic('right')}</button>`).join('')}</div>` : empty('users', all.length ? t('noMatch') : t('noMembersYet'))}
      </div>
      <div class="stack">
        <div class="card"><div class="card-title"><span class="ic">${ic('cake')}</span><h3>${esc(t('soonTitle'))}</h3></div>${soon.length ? `<div class="list">${soon.map(KP.personRow).join('')}</div>` : `<p class="small muted" style="margin:0">${esc(t('noSoon'))}</p>`}</div>
        <div class="card rose adm"><div class="card-title"><span class="ic" style="background:#fff">${ic('lock')}</span><h3>${esc(t('privacyTitle'))}</h3></div><p class="small">${esc(t('membersPrivacy'))}</p><div class="row"><button class="btn ghost sm" id="mShare" type="button" ${all.length ? '' : 'disabled'}>${ic('share')}${esc(t('shareList'))}</button></div></div>
      </div></div>`;
  };
  draw();
  el.oninput = e => { if (e.target.id === 'mQ') { mQuery = e.target.value; const pos = e.target.selectionStart; draw(); const i = $('#mQ'); i.focus(); try { i.setSelectionRange(pos, pos) } catch (x) {} } };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.f) { mFilter = b.dataset.f; draw(); return }
    if (b.id === 'mAdd') { if (KP.canEdit()) memberDialog(null, draw); return }
    if (b.dataset.mid) { const m = D.members().find(x => x.id === b.dataset.mid); KP.canEdit() ? memberDialog(m, draw) : memberView(m); return }
    if (b.id === 'mShare') { shareMembers(); return }
  };
}
function memberView(m) {
  if (!m) return;
  const cat = C.MEMBER_CATS.find(c => c.id === m.cat) || C.MEMBER_CATS[1];
  const row = (lab, v) => v ? `<div class="li"><div class="grow"><span class="small muted">${esc(lab)}</span><b>${esc(v)}</b></div></div>` : '';
  dlg.open(`<h3>${esc(t('viewMember'))}</h3><div class="row"><span class="avatar" style="width:64px;height:64px">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : esc(initials(m.name))}</span><div><b style="font-size:20px;color:var(--wine)">${esc(m.name)}</b><div class="small muted">${esc(tx(cat))}</div></div></div>
    <div class="list" style="margin-top:12px">${row(t('mBday'), m.bday ? fmtDate(KP.nextYearly(m.bday.slice(5)), { day: 'numeric', month: 'long' }) : '')}${row(t('mAnniv'), m.anniv ? fmtDate(KP.nextYearly(m.anniv.slice(5)), { day: 'numeric', month: 'long' }) : '')}</div>
    <div class="row" style="justify-content:flex-end;margin-top:14px">${m.phone ? `<a class="btn ghost" target="_blank" rel="noopener" href="${esc(waLink('', m.phone))}">${ic('wa')}WhatsApp</a>` : ''}<button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`);
}
function memberDialog(m, after) {
  const isNew = !m; m = m ? JSON.parse(JSON.stringify(m)) : { id: uid(), name: '', phone: '', bday: '', anniv: '', since: '', cat: 'member', photo: '' };
  const s = dlg.open(`<h3>${esc(isNew ? t('addMember') : t('editMember'))}</h3>
    <div class="row"><span class="avatar" id="mAv" style="width:64px;height:64px">${m.photo ? `<img src="${esc(m.photo)}" alt="">` : esc(initials(m.name))}</span><label class="btn ghost sm" style="cursor:pointer">${ic('photo')}${esc(t('addPhoto'))}<input type="file" accept="image/*" id="mPh" hidden></label>${m.photo ? `<button class="btn ghost sm" id="mPhX" type="button">${esc(t('removePhoto'))}</button>` : ''}</div>
    <label class="lab" for="mN">${esc(t('mName'))} <span class="opt">*</span></label><input id="mN" value="${esc(m.name)}" maxlength="50">
    <label class="lab" for="mP">${esc(t('mPhone'))} <span class="opt">${esc(t('opt'))}</span></label><input id="mP" inputmode="tel" value="${esc(m.phone)}" placeholder="98xxxxxxxx">
    <div class="row" style="align-items:flex-start"><div style="flex:1"><label class="lab" for="mB">${esc(t('mBday'))}</label><input id="mB" type="date" value="${esc(m.bday)}"></div><div style="flex:1"><label class="lab" for="mA">${esc(t('mAnniv'))}</label><input id="mA" type="date" value="${esc(m.anniv)}"></div></div>
    <div class="row" style="align-items:flex-start"><div style="flex:1"><label class="lab" for="mS">${esc(t('mSince'))}</label><input id="mS" type="date" value="${esc(m.since)}"></div><div style="flex:1"><label class="lab" for="mC">${esc(t('mCat'))}</label><select id="mC">${C.MEMBER_CATS.map(c => `<option value="${c.id}" ${m.cat === c.id ? 'selected' : ''}>${esc(tx(c))}</option>`).join('')}</select></div></div>
    <p class="small muted" style="margin-top:10px">${esc(t('mYearNote'))}</p>
    <p class="small" id="mErr" style="color:var(--danger)" hidden></p>
    <div class="row" style="justify-content:space-between;margin-top:14px">${isNew ? '<span></span>' : `<div class="row">${m.phone ? `<a class="btn ghost sm" target="_blank" rel="noopener" href="${esc(waLink('', m.phone))}">${ic('wa')}WhatsApp</a>` : ''}<button class="btn danger sm" id="mDel" type="button">${ic('trash')}${esc(t('delete'))}</button></div>`}<div class="row"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="mOk" type="button">${esc(t('save'))}</button></div></div>`);
  $('#mPh', s).onchange = async ev => { const f = ev.target.files[0]; if (!f) return; try { const b = await fileToJpeg(f, 240, .8); m.photo = await blobToDataURL(b); $('#mAv', s).innerHTML = `<img src="${m.photo}" alt="">` } catch (x) { toast(t('photoFail')) } };
  const px = $('#mPhX', s); if (px) px.onclick = () => { m.photo = ''; $('#mAv', s).textContent = initials($('#mN', s).value || m.name) };
  $('#mOk', s).onclick = () => {
    m.name = $('#mN', s).value.trim(); m.phone = $('#mP', s).value.trim(); m.bday = $('#mB', s).value; m.anniv = $('#mA', s).value; m.since = $('#mS', s).value; m.cat = $('#mC', s).value;
    if (!m.name) { const er = $('#mErr', s); er.textContent = t('fillThese', t('mName')); er.hidden = false; $('#mN', s).focus(); return }
    if (m.phone && KP.cleanPhone(m.phone).length < 11) { const er = $('#mErr', s); er.textContent = t('badPhone'); er.hidden = false; $('#mP', s).focus(); return }
    const L = D.members(); const i = L.findIndex(x => x.id === m.id); i < 0 ? L.push(m) : (L[i] = m);
    if (!KP.store.set('members', L)) { toast(t('storageFull')); return }
    if (isNew) log('ಹೊಸ ಸದಸ್ಯೆ: ' + m.name, 'New member: ' + m.name);
    dlg.close(); toast(t('saved')); after && after();
  };
  const del = $('#mDel', s); if (del) del.onclick = () => ask(t('delMemberQ', m.name), t('cantUndo'), () => { D.setMembers(D.members().filter(x => x.id !== m.id)); after && after() }, t('delete'));
}
function shareMembers() {
  const s = dlg.open(`<h3>${esc(t('shareList'))}</h3><p class="small muted">${esc(t('shareListNote'))}</p><label class="row" style="gap:8px;margin:10px 0"><input type="checkbox" id="incPh" style="width:22px;min-height:22px"> ${esc(t('incPhones'))}</label><div class="row"><button class="btn" id="shWa" type="button">${ic('wa')}${esc(t('sendWa'))}</button><button class="btn ghost" id="shCopy" type="button">${ic('copy')}${esc(t('copy'))}</button><button class="btn ghost" data-close type="button">${esc(t('close'))}</button></div>`);
  const build = () => { const inc = $('#incPh', s).checked; const L = D.members().map(m => ({ n: m.name, c: m.cat, b: m.bday ? m.bday.slice(5) : '', a: m.anniv ? m.anniv.slice(5) : '', p: inc ? m.phone : '' }));
    if (APP_URL) return t('membersLinkMsg') + '\n' + APP_URL + '?members=' + b64e(L);
    return t('membersTextHead') + '\n' + L.map(x => '• ' + x.n + (x.b ? ' — ' + t('bdayShort') + ' ' + fmtShort(KP.nextYearly(x.b)) : '') + (x.p ? ' — ' + x.p : '')).join('\n') };
  $('#shWa', s).onclick = () => window.open(waLink(build()), '_blank', 'noopener');
  $('#shCopy', s).onclick = () => copyText(build());
}
KP.importMembers = L => {
  if (!Array.isArray(L) || !L.length) return;
  const cur = D.members(); const names = new Set(cur.map(m => m.name.toLowerCase()));
  const fresh = L.filter(x => x && x.n && !names.has(String(x.n).toLowerCase())).slice(0, 200);
  const s = dlg.open(`<h3>${esc(t('importQ', fresh.length))}</h3><p class="small muted">${esc(t('importB'))}</p><div class="chips" style="margin:10px 0">${fresh.map(x => `<span class="chip">${esc(x.n)}</span>`).join('')}</div><div class="row" style="justify-content:flex-end"><button class="btn ghost" data-close type="button">${esc(t('no'))}</button><button class="btn wine" id="impOk" type="button" ${fresh.length ? '' : 'disabled'}>${esc(t('addThem'))}</button></div>`);
  $('#impOk', s).onclick = () => { const y = today().getFullYear(); fresh.forEach(x => cur.push({ id: uid(), name: String(x.n).slice(0, 50), phone: String(x.p || '').slice(0, 20), bday: /^\d\d-\d\d$/.test(x.b || '') ? '2000-' + x.b : '', anniv: /^\d\d-\d\d$/.test(x.a || '') ? '2000-' + x.a : '', since: '', cat: ['founder', 'member', 'guest'].includes(x.c) ? x.c : 'member', photo: '' })); D.setMembers(cur); dlg.close(); toast(t('saved')); location.hash = 'act-members' };
};

/* ================= GALLERY ================= */
let openAlbum = null;
function renderGallery(el) {
  const draw = async () => {
    let photos = []; try { photos = await KP.photos.all() } catch (e) { el.innerHTML = empty('photo', t('photosUnavailable')); return }
    const albums = D.albums();
    if (openAlbum && !albums.find(a => a.id === openAlbum)) openAlbum = null;
    if (!openAlbum) {
      el.innerHTML = `<div class="row between" style="margin-bottom:12px"><p class="small muted" style="margin:0;flex:1">${esc(KP.photos.cloud() ? t('viewerNote') : t('galleryNote'))}</p><button class="btn adm" id="aNew" type="button">${ic('plus')}${esc(t('newAlbum'))}</button></div>
        ${albums.length ? `<div class="grid">${albums.map(a => { const ps = photos.filter(p => p.album === a.id); const cov = ps[0]; return `<button type="button" class="card album" data-alb="${a.id}"><div class="cover" ${cov ? `style="background-image:url('${esc(cov.src)}')"` : ''}>${cov ? '' : ic('photo')}</div><div class="meta"><b style="color:var(--wine);font-family:var(--f-head)">${esc(a.name)}</b><div class="small muted">${esc([a.date ? fmtDate(a.date, { day: 'numeric', month: 'short', year: 'numeric' }) : '', t('nPhotos', ps.length)].filter(Boolean).join(' · '))}</div></div></button>` }).join('')}</div>` : empty('photo', t('noAlbums'))}`;
      return;
    }
    const a = albums.find(x => x.id === openAlbum); const ps = photos.filter(p => p.album === a.id).sort((x, y) => x.at - y.at);
    el.innerHTML = `<div class="row" style="margin-bottom:10px"><button class="btn ghost sm" id="aBack" type="button">${ic('left')}${esc(t('allAlbums'))}</button></div>
      <div class="card"><div class="card-title"><span class="ic">${ic('photo')}</span><h3>${esc(a.name)}</h3><button class="btn ghost sm icon adm" id="aEdit" type="button" aria-label="${esc(t('edit'))}">${ic('edit')}</button></div>
      ${a.date ? `<p class="small muted" style="margin-top:-6px">${esc(fmtDate(a.date))}</p>` : ''}
      ${KP.canEdit() ? `<label class="lab" for="aMem">${esc(t('memoryNote'))}</label><textarea id="aMem" placeholder="${esc(t('memoryPh'))}">${esc(a.memory || '')}</textarea>` : (a.memory ? `<p style="white-space:pre-line">${esc(a.memory)}</p>` : '')}
      <div class="row adm" style="margin:12px 0"><label class="btn" style="cursor:pointer">${ic('plus')}${esc(t('addPhotos'))}<input type="file" accept="image/*" multiple id="aAdd" hidden></label><button class="btn danger sm" id="aDel" type="button">${ic('trash')}${esc(t('deleteAlbum'))}</button></div>
      <p class="small muted" id="upMsg" hidden></p>
      ${ps.length ? `<div class="gal">${ps.map((p, i) => `<button type="button" data-ph="${i}" aria-label="${esc(p.caption || t('photo') + ' ' + (i + 1))}"><img src="${esc(p.src)}" alt="${esc(p.caption || '')}" loading="lazy"></button>`).join('')}</div>` : empty('photo', t('noPhotosAlbum'))}</div>`;
    if ($('#aMem')) $('#aMem').onchange = e => { const L = D.albums(); const x = L.find(y => y.id === a.id); x.memory = e.target.value; D.setAlbums(L); toast(t('saved')) };
    $('#aAdd').onchange = async e => {
      const files = [...e.target.files].filter(f => /^image\//.test(f.type)).slice(0, 40); if (!files.length) return;
      const m = $('#upMsg'); m.hidden = false; let ok = 0;
      for (const f of files) { m.textContent = t('uploading', ok + 1, files.length); try { const blob = await fileToJpeg(f, 1600, .82); await KP.photos.add(a.id, blob, Date.now() + ok); ok++ } catch (x) {} }
      toast(ok < files.length ? t('photoUpFail') : t('photosAdded', ok)); log('ಫೋಟೋ ಸೇರಿಸಲಾಗಿದೆ: ' + a.name, 'Added photos: ' + a.name); draw();
    };
    $$('[data-ph]').forEach(b => b.onclick = () => lightbox(ps, +b.dataset.ph, draw));
  };
  draw();
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (!KP.canEdit() && ['aNew', 'aEdit', 'aDel'].includes(b.id)) return;
    if (b.id === 'aNew') { albumDialog(null, id => { openAlbum = id; draw() }); return }
    if (b.dataset.alb) { openAlbum = b.dataset.alb; draw(); return }
    if (b.id === 'aBack') { openAlbum = null; draw(); return }
    if (b.id === 'aEdit') { albumDialog(D.albums().find(a => a.id === openAlbum), () => draw()); return }
    if (b.id === 'aDel') { const a = D.albums().find(x => x.id === openAlbum); ask(t('delAlbumQ', a.name), t('delAlbumB'), async () => { const ps = (await KP.photos.all()).filter(p => p.album === a.id); await KP.photos.del(ps.map(p => p.id)); D.setAlbums(D.albums().filter(x => x.id !== a.id)); openAlbum = null; draw() }, t('delete')) }
  };
}
function albumDialog(a, after) {
  const isNew = !a; a = a ? Object.assign({}, a) : { id: uid(), name: '', date: KP.iso(today()), memory: '' };
  const s = dlg.open(`<h3>${esc(isNew ? t('newAlbum') : t('editAlbum'))}</h3><label class="lab" for="alN">${esc(t('albumName'))} <span class="opt">*</span></label><input id="alN" value="${esc(a.name)}" placeholder="${esc(t('albumPh'))}" maxlength="60"><label class="lab" for="alD">${esc(t('fDate'))}</label><input id="alD" type="date" value="${esc(a.date)}"><p class="small" id="alErr" style="color:var(--danger)" hidden></p><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="alOk" type="button">${esc(t('save'))}</button></div>`);
  $('#alOk', s).onclick = () => { a.name = $('#alN', s).value.trim(); a.date = $('#alD', s).value; if (!a.name) { const er = $('#alErr', s); er.textContent = t('fillThese', t('albumName')); er.hidden = false; return } const L = D.albums(); const i = L.findIndex(x => x.id === a.id); i < 0 ? L.unshift(a) : (L[i] = Object.assign(L[i], a)); D.setAlbums(L); dlg.close(); after && after(a.id) };
}
function lightbox(ps, i, after) {
  const w = document.createElement('div'); w.className = 'lightbox'; w.setAttribute('role', 'dialog'); document.body.appendChild(w);
  const draw = () => { const p = ps[i]; w.innerHTML = `<div class="row between" style="color:#fff"><span>${i + 1} / ${ps.length}</span><button class="btn gold sm" data-x type="button">${ic('x')}${esc(t('close'))}</button></div><div class="lb-img"><img src="${esc(p.src)}" alt="${esc(p.caption || '')}"></div>${KP.canEdit() ? `<input class="cap" id="lbCap" value="${esc(p.caption || '')}" placeholder="${esc(t('captionPh'))}" style="max-width:520px;margin:8px auto;background:rgba(255,255,255,.1);color:#fff;border-color:rgba(214,173,98,.5)">` : (p.caption ? `<p class="center" style="color:#fff;margin:8px auto">${esc(p.caption)}</p>` : '')}<div class="row"><button class="btn ghost sm" data-p type="button" style="color:#fff" aria-label="${esc(t('prev'))}">${ic('left')}</button><button class="btn sm" data-sh type="button">${ic('share')}${esc(t('share'))}</button><button class="btn danger sm adm" data-del type="button" style="color:#fff;border-color:#fff6">${ic('trash')}${esc(t('delete'))}</button><button class="btn ghost sm" data-n type="button" style="color:#fff" aria-label="${esc(t('next'))}">${ic('right')}</button></div>` };
  draw();
  const close = () => { w.remove(); after && after() };
  w.onchange = async e => { if (e.target.id === 'lbCap' && KP.canEdit()) { ps[i].caption = e.target.value; await KP.photos.caption(ps[i], e.target.value); toast(t('saved')) } };
  w.onclick = async e => { const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-x')) close();
    if (b.hasAttribute('data-p')) { i = (i - 1 + ps.length) % ps.length; draw() }
    if (b.hasAttribute('data-n')) { i = (i + 1) % ps.length; draw() }
    if (b.hasAttribute('data-sh')) { let bl; try { bl = await KP.photos.blob(ps[i]) } catch (x) { toast(t('picFail')); return } const r = await shareFile(bl, 'kitty-photo.jpg', ps[i].caption || ''); if (r === 'downloaded') toast(t('picSaved')) }
    if (b.hasAttribute('data-del') && KP.canEdit()) { await KP.photos.del(ps[i].id); ps.splice(i, 1); if (!ps.length) { close(); return } i = Math.min(i, ps.length - 1); draw() } };
  let sx = null; w.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true }); w.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { i = (i + (dx < 0 ? 1 : -1) + ps.length) % ps.length; draw() } sx = null });
}

/* ================= CELEBRATIONS ================= */
function renderCeleb(el) {
  const ppl = KP.upcomingPeople(D.members(), 366);
  const fests = C.FESTIVALS.map(f => ({ f, d: parseISO(f.d) })).filter(x => x.d >= today());
  el.innerHTML = `<div class="cols">
    <div class="card"><div class="card-title"><span class="ic">${ic('cake')}</span><h3>${esc(t('bdaysAnnivs'))}</h3><a class="btn ghost sm adm" href="#act-members">${ic('plus')}${esc(t('addMember'))}</a></div>
      ${ppl.length ? `<div class="list">${ppl.slice(0, 12).map(KP.personRow).join('')}</div>` : empty('cake', t('noMembersYet'))}</div>
    <div class="stack">
      <div class="card royal"><svg class="corner tl"><use href="#i-corner"/></svg><h3>${esc(t('kittyAnniv'))}</h3><p class="muted">${esc(tx(C.WISHES.kitty))}</p><a class="btn gold sm" target="_blank" rel="noopener" href="${esc(waLink(tx(C.WISHES.kitty)))}">${ic('wa')}${esc(t('sendWish'))}</a></div>
      <div class="sec-head" style="margin-top:6px"><h3>${esc(t('festivals'))}</h3></div>
      ${fests.map(({ f, d }) => `<div class="card"><div class="card-title"><span class="ic">${ic('cal')}</span><h3>${esc(tx(f))}</h3><span class="badge gold">${esc(fmtShort(d))}</span></div><p class="small">${esc(tx(f.idea))}</p><div class="row"><a class="btn sm" target="_blank" rel="noopener" href="${esc(waLink(tx(f.wish)))}">${ic('wa')}${esc(t('sendWish'))}</a><button class="btn ghost sm adm" type="button" data-theme="${esc(tx(f))}">${ic('mail')}${esc(t('planKitty'))}</button></div></div>`).join('')}
    </div></div>`;
  el.onclick = e => { const b = e.target.closest('[data-theme]'); if (!b || !KP.canEdit()) return; const d = store.get('invDraft', null) || KP.blankInv(); d.activities = b.dataset.theme; d.tpl = 'festival'; store.set('invDraft', d); location.hash = 'invite'; toast(t('themeAdded')) };
}

/* ================= FOOD ================= */
let foodTab = 'plan';
KP.mixMenu = () => { const L = t('mixLabels'); return [0, 1, 2, 3, 5].map((ci, k) => L[k] + ': ' + pick(C.MENU[ci].i[KP.L])).join('\n') };
KP.renderFood = el => {
  const plan = store.get('menuPlan', { sel: {}, custom: {} });
  const pot = store.get('potluck', []);
  const menuText = () => C.MENU.map((c, ci) => { const items = (plan.sel[ci] || []).map(i => typeof i === 'number' ? c.i[KP.L][i] : i); return items.length ? tx(c) + ': ' + items.join(', ') : '' }).filter(Boolean).join('\n');
  const draw = () => {
    const mt = menuText();
    el.innerHTML = KP.ptitle(t('foodTitle')) + `<div class="row" style="justify-content:center;margin-bottom:14px"><div class="seg">${[['plan', 'tPlan'], ['potluck', 'tPotluck'], ['ready', 'tReady']].map(([k, l]) => `<button type="button" data-tab="${k}" class="${foodTab === k ? 'on' : ''}">${esc(t(l))}</button>`).join('')}</div></div><div id="foodBody"></div>`;
    const fb = $('#foodBody', el);
    if (foodTab === 'plan') {
      fb.innerHTML = `<div class="cols"><div class="stack"><p class="muted" style="margin:0">${esc(t('planHint'))}</p>${C.MENU.map((c, ci) => `<div class="food"><div class="fh"><span class="ic" style="background:#fff">${ic('food')}</span><h3>${esc(tx(c))}</h3></div><div class="items">${c.i[KP.L].map((it, ii) => `<button type="button" class="chip ${(plan.sel[ci] || []).includes(ii) ? 'on' : ''}" data-ci="${ci}" data-ii="${ii}">${esc(it)}</button>`).join('')}${(plan.sel[ci] || []).filter(x => typeof x === 'string').map(x => `<button type="button" class="chip on" data-ci="${ci}" data-cs="${esc(x)}">${esc(x)} ✕</button>`).join('')}<button type="button" class="chip" data-addc="${ci}">${ic('plus', '')} ${esc(t('addOwn'))}</button></div></div>`).join('')}</div>
        <div style="position:sticky;top:12px"><div class="menu-card"><svg class="corner tl" style="position:absolute;width:56px;height:56px;color:var(--gold);left:6px;top:6px"><use href="#i-corner"/></svg><svg viewBox="0 0 64 40" style="width:56px;height:34px;color:var(--gold)"><use href="#i-lotus"/></svg><h3>${esc(t('hostMenu'))}</h3>${mt ? C.MENU.map((c, ci) => { const items = (plan.sel[ci] || []).map(i => typeof i === 'number' ? c.i[KP.L][i] : i); return items.length ? `<div class="mc-cat">${esc(tx(c))}</div><div class="mc-items">${esc(items.join(' · '))}</div>` : '' }).join('') : `<p class="muted">${esc(t('menuEmpty'))}</p>`}</div>
        <div class="row" style="margin-top:12px;justify-content:center"><button class="btn adm" id="mUse" type="button" ${mt ? '' : 'disabled'}>${ic('mail')}${esc(t('useMenu'))}</button><a class="btn ghost" target="_blank" rel="noopener" href="${esc(waLink('🍽 ' + t('hostMenu') + '\n' + mt))}" ${mt ? '' : 'aria-disabled="true" style="pointer-events:none;opacity:.45"'}>${ic('wa')}${esc(t('sendWa'))}</a><button class="btn ghost" id="mClear" type="button" ${mt ? '' : 'disabled'}>${esc(t('clear'))}</button></div></div></div>`;
    } else if (foodTab === 'potluck') {
      const mem = D.members();
      fb.innerHTML = `<div class="cols"><div class="card"><div class="card-title"><span class="ic">${ic('users')}</span><h3>${esc(t('potluckTitle'))}</h3></div><p class="small muted">${esc(t('potluckHint'))}</p>
        <div class="row adm" style="align-items:flex-end"><div style="flex:2"><label class="lab" for="pDish">${esc(t('dish'))}</label><input id="pDish" list="dishList" placeholder="${esc(t('dishPh'))}"><datalist id="dishList">${C.MENU.flatMap(c => c.i[KP.L]).map(x => `<option value="${esc(x)}">`).join('')}</datalist></div><div style="flex:1.4"><label class="lab" for="pWho">${esc(t('bringer'))}</label><input id="pWho" list="whoList" placeholder="${esc(t('bringerPh'))}"><datalist id="whoList">${mem.map(m => `<option value="${esc(m.name)}">`).join('')}</datalist></div><button class="btn" id="pAdd" type="button">${ic('plus')}${esc(t('add'))}</button></div>
        <p class="small" id="pErr" style="color:var(--danger)" hidden></p>
        <div class="list" style="margin-top:12px">${pot.length ? pot.map(p => `<div class="li"><input type="checkbox" data-done="${p.id}" ${p.done ? 'checked' : ''} ${KP.canEdit() ? '' : 'disabled'} style="width:24px;min-height:24px" aria-label="${esc(t('brought'))}"><div class="grow"><b style="${p.done ? 'text-decoration:line-through' : ''}">${esc(p.dish)}</b><span class="small muted">${esc(p.who || t('notAssigned'))}</span></div><button class="btn danger sm icon adm" data-pdel="${p.id}" type="button" aria-label="${esc(t('delete'))}">${ic('trash')}</button></div>`).join('') : empty('food', t('noPotluck'))}</div>
        <div class="row" style="margin-top:12px"><a class="btn" target="_blank" rel="noopener" href="${esc(waLink('🍲 ' + t('potluckTitle') + '\n' + pot.map(p => '• ' + p.dish + ' — ' + (p.who || '?') + (p.done ? ' ✓' : '')).join('\n')))}" ${pot.length ? '' : 'aria-disabled="true" style="pointer-events:none;opacity:.45"'}>${ic('wa')}${esc(t('sendWa'))}</a><button class="btn ghost adm" id="pClear" type="button" ${pot.length ? '' : 'disabled'}>${esc(t('clearList'))}</button></div></div>
        <div class="card rose"><h3>${esc(t('potluckTips'))}</h3><p class="small">${esc(t('potluckTipsBody'))}</p></div></div>`;
    } else {
      fb.innerHTML = `<div class="card"><h3>${esc(t('presetsTitle'))}</h3><div class="chips" id="pres">${C.PRESETS.map((p, i) => `<button type="button" class="chip" data-pi="${i}">${esc(p[KP.L][0])}</button>`).join('')}<button type="button" class="chip" id="mix">${esc(t('mixMenu'))}</button></div><div class="menu-card" style="margin-top:12px;white-space:pre-line" id="presOut">${esc(store.get('presetPick', '') || C.PRESETS[0][KP.L][1])}</div><div class="row" style="margin-top:12px;justify-content:center"><button class="btn adm" id="pUse" type="button">${ic('mail')}${esc(t('useMenu'))}</button><button class="btn ghost" id="pCopy" type="button">${ic('copy')}${esc(t('copy'))}</button></div></div>`;
    }
  };
  draw();
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.tab) { foodTab = b.dataset.tab; draw(); return }
    if (b.dataset.ii != null) { const ci = b.dataset.ci, ii = +b.dataset.ii; const s = new Set(plan.sel[ci] || []); s.has(ii) ? s.delete(ii) : s.add(ii); plan.sel[ci] = [...s]; store.set('menuPlan', plan); draw(); return }
    if (b.dataset.cs != null) { const ci = b.dataset.ci; plan.sel[ci] = (plan.sel[ci] || []).filter(x => x !== b.dataset.cs); store.set('menuPlan', plan); draw(); return }
    if (b.dataset.addc != null) { const ci = b.dataset.addc; const s = dlg.open(`<h3>${esc(t('addOwn'))} — ${esc(tx(C.MENU[ci]))}</h3><input id="ownIn" maxlength="50"><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="ownOk" type="button">${esc(t('add'))}</button></div>`); $('#ownOk', s).onclick = () => { const v = $('#ownIn').value.trim(); if (!v) { toast(t('typeSomething')); return } plan.sel[ci] = [...(plan.sel[ci] || []), v]; store.set('menuPlan', plan); dlg.close(); draw() }; return }
    if (!KP.canEdit() && (['mUse', 'pAdd', 'pClear', 'pUse'].includes(b.id) || b.dataset.pdel)) return;
    if (b.id === 'mUse') { useInInvite(menuText()); return }
    if (b.id === 'mClear') { ask(t('clearMenuQ'), t('cantUndo'), () => { plan.sel = {}; store.set('menuPlan', plan); draw() }); return }
    if (b.id === 'pAdd') { const dish = $('#pDish').value.trim(), who = $('#pWho').value.trim(); if (!dish) { const er = $('#pErr'); er.textContent = t('fillThese', t('dish')); er.hidden = false; return } pot.push({ id: uid(), dish, who, done: false }); store.set('potluck', pot); draw(); return }
    if (b.dataset.pdel) { const i = pot.findIndex(p => p.id === b.dataset.pdel); pot.splice(i, 1); store.set('potluck', pot); draw(); return }
    if (b.id === 'pClear') { ask(t('clearListQ'), t('cantUndo'), () => { pot.length = 0; store.set('potluck', pot); draw() }); return }
    if (b.dataset.pi != null) { const v = C.PRESETS[+b.dataset.pi][KP.L][1]; store.set('presetPick', v); $('#presOut').textContent = v; $$('#pres .chip').forEach(c => c.classList.toggle('on', c === b)); return }
    if (b.id === 'mix') { const v = KP.mixMenu(); store.set('presetPick', v); $('#presOut').textContent = v; return }
    if (b.id === 'pUse') { useInInvite($('#presOut').textContent); return }
    if (b.id === 'pCopy') { copyText($('#presOut').textContent); return }
  };
  el.onchange = e => { const id = e.target.dataset.done; if (id && KP.canEdit()) { const p = pot.find(x => x.id === id); p.done = e.target.checked; store.set('potluck', pot); draw() } };
};
function useInInvite(text) { const d = store.get('invDraft', null) || KP.blankInv(); d.menu = text; store.set('invDraft', d); location.hash = 'invite'; toast(t('menuAdded')) }

/* ================= IDEAS ================= */
let ideaCat = 'themes', ideaPick = -1;
KP.renderIdeas = el => {
  const items = () => ideaCat === 'themes' ? C.THEMES_OLD : ideaCat === 'games' ? C.MINUTE_GAMES.map(g => ({ en: [g.en[0], g.en[2]], kn: [g.kn[0], g.kn[2]] })) : (C.IDEAS_MORE[ideaCat] || []);
  const draw = () => {
    const L = items();
    const cat = C.IDEA_CATS.find(c => c.id === ideaCat);
    el.innerHTML = KP.ptitle(t('ideasTitle'), t('ideasSub')) + `
      <div class="chips" style="margin-bottom:14px;justify-content:center">${C.IDEA_CATS.map(c => `<button type="button" class="chip ${ideaCat === c.id ? 'on' : ''}" data-cat="${c.id}">${esc(tx(c))}</button>`).join('')}</div>
      <div class="row" style="margin-bottom:12px;justify-content:center"><button class="btn gold" id="iRand" type="button">${ic('idea')}${esc(t('surpriseMe'))}</button>${ideaCat === 'games' ? `<a class="btn ghost" href="#game-team">${ic('clock')}${esc(t('openTimer'))}</a>` : ''}${ideaCat === 'food' ? `<a class="btn ghost" href="#food">${ic('food')}${esc(t('openPlanner'))}</a>` : ''}</div>
      <div class="grid">${L.map((x, i) => `<div class="icard ${ideaPick === i ? 'pick' : ''}" id="idea${i}"><svg class="mc"><use href="#i-mandala2"/></svg><div class="ih"><span class="ri">${ic(cat.icon)}</span><h3>${esc(x[KP.L][0])}</h3></div><p class="small">${esc(x[KP.L][1])}</p>${['themes', 'dress', 'season'].includes(ideaCat) ? `<button class="btn ghost sm adm" type="button" data-use="${i}">${ic('mail')}${esc(t('useTheme'))}</button>` : ''}</div>`).join('')}</div>`;
  };
  draw();
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.cat) { ideaCat = b.dataset.cat; ideaPick = -1; draw(); return }
    if (b.id === 'iRand') { const L = items(); let i; do { i = Math.floor(Math.random() * L.length) } while (L.length > 1 && i === ideaPick); ideaPick = i; draw(); const c = $('#idea' + i); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    if (b.dataset.use != null && KP.canEdit()) { const x = items()[+b.dataset.use]; const d = store.get('invDraft', null) || KP.blankInv(); if (ideaCat === 'dress') d.dress = x[KP.L][0]; else d.activities = x[KP.L][0]; store.set('invDraft', d); location.hash = 'invite'; toast(t('themeAdded')) }
  };
};
})();
