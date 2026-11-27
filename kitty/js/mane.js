/* Kitty Party Circle — home help: home accounts (on this phone only), kitty money (shared, owner edits),
   official bill and scheme links, festival prep, safety numbers and scam alerts, children's study links. */
(() => {
const KP = window.KP;
const { $, $$, esc, ic, store, t, tx, toast, dlg, ask, uid, pad, iso, today, fmtDate, waLink, ptitle, empty } = KP;
const M = () => KP.MANE;
const L = () => KP.L === 'kn' ? 'kn' : 'en';
const back = () => `<a class="btn ghost sm" href="#mane" style="margin-bottom:10px">${ic('left')}${esc(t('back'))}</a>`;
const money = n => '₹' + Math.round(n).toLocaleString('en-IN');
const mkey = c => c.y + '-' + pad(c.m + 1);
const mlabel = c => KP.monthLabel(c.y, c.m);
const shiftM = (c, d) => { let m = c.m + d, y = c.y; if (m < 0) { m = 11; y-- } if (m > 11) { m = 0; y++ } return { y, m } };
const nowM = () => { const n = today(); return { y: n.getFullYear(), m: n.getMonth() } };
const monthBar = c => `<div class="cal-head" style="margin-bottom:12px"><button class="btn ghost icon" data-mv="-1" type="button" aria-label="${esc(t('prevMonth'))}">${ic('left')}</button><h3>${esc(mlabel(c))}</h3><button class="btn ghost icon" data-mv="1" type="button" aria-label="${esc(t('nextMonth'))}">${ic('right')}</button></div>`;
const TILES = [['acct', 'coin', 'mAcct', 'mAcctS'], ['fund', 'users', 'mFund', 'mFundS'], ['bills', 'bolt', 'mBills', 'mBillsS'], ['fest', 'diya', 'mFest', 'mFestS'], ['safe', 'lock', 'mSafe', 'mSafeS'], ['study', 'brain', 'mStudy', 'mStudyS']];
KP.maneTiles = () => `<div class="quick mane-q">${TILES.map(([r, i, k, s]) => `<a class="tile" href="#mane-${r}"><span class="ic">${ic(i)}</span><b>${esc(t(k))}</b><span>${esc(t(s))}</span></a>`).join('')}</div>`;

KP.renderMane = (el, sub) => {
  const R = { acct: renderAcct, fund: renderFund, bills: renderBills, fest: renderFest, safe: renderSafe, study: renderStudy }[sub];
  if (R) { R(el); return }
  el.innerHTML = ptitle(t('maneTitle'), t('maneSub')) + KP.maneTiles();
  el.onclick = null;
};

/* ================= HOME ACCOUNTS (this phone only) ================= */
let acM = nowM();
const acGet = () => { let a = store.get('acct', null); if (!a || !Array.isArray(a.items)) { a = { items: t('acDef').map(([n, k, u]) => ({ id: uid(), n, k, p: 0, q: 1, u, free: 0, cut: 0 })), m: {} }; store.set('acct', a) } a.m = a.m || {}; return a };
const acRec = (a, c) => { const k = mkey(c); a.m[k] = a.m[k] || { mk: {}, ex: [], paid: {} }; const r = a.m[k]; r.mk = r.mk || {}; r.ex = r.ex || []; r.paid = r.paid || {}; return r };
const lastDay = c => { const n = today(), dim = new Date(c.y, c.m + 1, 0).getDate(); if (c.y === n.getFullYear() && c.m === n.getMonth()) return n.getDate(); return (c.y > n.getFullYear() || (c.y === n.getFullYear() && c.m > n.getMonth())) ? 0 : dim };
function acCalc(it, r, c) {
  const mk = r.mk[it.id] || {}, last = lastDay(c);
  if (it.k === 'daily') { let days = 0, qty = 0; for (let d = 1; d <= last; d++) { const mul = mk[d] === undefined ? 1 : mk[d]; if (mul > 0) { days++; qty += mul * (+it.q || 1) } } return { days, qty, amt: qty * (+it.p || 0) } }
  if (it.k === 'staff') { const lv = Object.keys(mk).filter(d => mk[d] && +d <= new Date(c.y, c.m + 1, 0).getDate()).length; return { lv, amt: Math.max(0, (+it.p || 0) - Math.max(0, lv - (+it.free || 0)) * (+it.cut || 0)) } }
  return { amt: +it.p || 0 };
}
function acGrid(it, r, c) {
  const mk = r.mk[it.id] || {}, dim = new Date(c.y, c.m + 1, 0).getDate(), lead = new Date(c.y, c.m, 1).getDay(), last = lastDay(c);
  const wd = (KP.L === 'kn' ? ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).map(x => `<i>${x}</i>`).join('');
  let h = wd + '<i></i>'.repeat(lead);
  for (let d = 1; d <= dim; d++) {
    const v = mk[d]; let lab = '', cls = '';
    if (it.k === 'daily') { const mul = v === undefined ? 1 : v; lab = d > last ? '' : mul === 0 ? '✕' : mul === 1 ? '✓' : mul + '×'; cls = d > last ? 'fut' : mul === 0 ? 'no' : mul > 1 ? 'more' : 'yes' }
    else { lab = v ? 'L' : ''; cls = v ? 'lv' : (d > last ? 'fut' : '') }
    h += `<button type="button" class="${cls}" data-ac-day="${d}" data-it="${it.id}" ${it.k === 'daily' && d > last ? 'disabled' : ''} aria-label="${d}${lab ? ' ' + lab : ''}"><b>${d}</b><span>${lab}</span></button>`;
  }
  return `<div class="ac-grid">${h}</div><p class="small muted" style="margin:6px 0 0">${esc(t(it.k === 'daily' ? 'acTapDaily' : 'acTapStaff'))}</p>`;
}
const acMsg = (it, x, c) => it.k === 'daily' ? t('acMsgDaily', it.n, mlabel(c), x.days, x.qty, it.u || '', it.p || 0, Math.round(x.amt)) : it.k === 'staff' ? t('acMsgStaff', it.n, mlabel(c), x.lv, Math.round(x.amt)) : t('acMsgMonth', it.n, mlabel(c), Math.round(x.amt));
function renderAcct(el) {
  const a = acGet(), c = acM, r = acRec(a, c); let total = 0;
  const cards = a.items.map(it => {
    const x = acCalc(it, r, c); total += x.amt; const paid = !!r.paid[it.id];
    const line = it.k === 'daily' ? `${esc(t('acDays', x.days))} · ${x.qty} ${esc(it.u || '')} × ${money(it.p || 0)}` : it.k === 'staff' ? `${esc(t('acLeaves', x.lv))}${+it.cut ? ' · ' + esc(t('acFree')) + ': ' + (+it.free || 0) : ''}` : esc(t('acMonth'));
    return `<div class="card ac-item"><div class="card-title"><span class="ic">${ic(it.k === 'staff' ? 'users' : it.k === 'month' ? 'cal' : 'cup')}</span><h3>${esc(it.n)}</h3><button class="btn ghost sm icon" data-ac-edit="${it.id}" type="button" aria-label="${esc(t('acEdit'))}">${ic('edit')}</button></div>
      <div class="row between"><div><b class="ac-amt">${+it.p ? money(x.amt) : `<button class="btn sm" data-ac-edit="${it.id}" type="button">${esc(t('acSetPrice'))}</button>`}</b><div class="small muted">${line}</div></div>
      <div class="row" style="gap:6px"><button class="chip ${paid ? 'on' : ''}" data-ac-paid="${it.id}" type="button" aria-pressed="${paid}">${paid ? ic('check') + ' ' : ''}${esc(paid ? t('acPaid') : t('acNotPaid'))}</button><a class="btn ghost sm icon" href="${esc(waLink(acMsg(it, x, c)))}" target="_blank" rel="noopener" aria-label="${esc(t('acShare'))}">${ic('wa')}</a></div></div>
      ${it.k !== 'month' ? acGrid(it, r, c) : ''}</div>`;
  }).join('');
  const exTotal = r.ex.reduce((s, e) => s + (+e.amt || 0), 0); total += exTotal;
  el.innerHTML = `${back()}${ptitle(t('acTitle'), t('acSub'))}
  <div class="card">${monthBar(c)}<div class="ac-total"><span>${esc(t('acTotal'))}</span><b>${money(total)}</b></div>
    <div class="row" style="justify-content:center;margin-top:10px"><a class="btn wine sm" id="acAll" target="_blank" rel="noopener">${ic('wa')}${esc(t('acShareAll'))}</a><button class="btn ghost sm" id="acAdd" type="button">${ic('plus')}${esc(t('acAdd'))}</button></div>
    <p class="small muted center" style="margin:10px 0 0">${ic('lock')} ${esc(t('acLocal'))}</p></div>
  <div class="ac-list">${cards}</div>
  <div class="card"><div class="card-title"><span class="ic">${ic('coin')}</span><h3>${esc(t('acExtra'))}</h3><button class="btn sm" id="exAdd" type="button">${ic('plus')}${esc(t('acExtraAdd'))}</button></div>
    ${r.ex.length ? `<div class="list">${r.ex.slice().sort((p, q) => (p.day || 0) - (q.day || 0)).map(e => `<div class="li"><div class="grow"><b>${esc(e.what)}</b><span class="small muted">${e.day ? esc(fmtDate(new Date(c.y, c.m, e.day), { day: 'numeric', month: 'short' })) : ''}</span></div><b>${money(e.amt)}</b><button class="btn danger sm icon" data-ex-del="${e.id}" type="button" aria-label="${esc(t('delete'))}">${ic('trash')}</button></div>`).join('')}</div>` : `<p class="muted small" style="margin:0">${esc(t('acNoExtra'))}</p>`}</div>
  <div class="card"><div class="card-title"><span class="ic">${ic('down')}</span><h3>${esc(t('acBackup'))}</h3></div><p class="small muted" style="margin-top:0">${esc(t('acBackupS'))}</p><div class="row"><button class="btn ghost sm" id="acCopy" type="button">${ic('copy')}${esc(t('acCopy'))}</button><button class="btn ghost sm" id="acRest" type="button">${ic('refresh')}${esc(t('acRestore'))}</button></div></div>`;
  const all = [mlabel(c) + ' — ' + t('acTitle'), ...a.items.map(it => '• ' + acMsg(it, acCalc(it, r, c), c)), ...r.ex.map(e => '• ' + e.what + ': ' + money(e.amt)), t('acTotal') + ': ' + money(total)].join('\n');
  $('#acAll', el).href = waLink(all);
  const save = () => { store.set('acct', a); renderAcct(el) };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mv) { acM = shiftM(acM, +b.dataset.mv); renderAcct(el); return }
    if (b.dataset.acDay) { const it = a.items.find(x => x.id === b.dataset.it), d = +b.dataset.acDay; const mk = r.mk[it.id] = r.mk[it.id] || {};
      if (it.k === 'daily') { const v = mk[d] === undefined ? 1 : mk[d]; const nx = v === 1 ? 0 : v === 0 ? 2 : v === 2 ? 3 : 1; if (nx === 1) delete mk[d]; else mk[d] = nx }
      else { if (mk[d]) delete mk[d]; else mk[d] = 1 }
      save(); return }
    if (b.dataset.acPaid) { r.paid[b.dataset.acPaid] = !r.paid[b.dataset.acPaid]; save(); return }
    if (b.dataset.acEdit) { itemDialog(a, a.items.find(x => x.id === b.dataset.acEdit), save); return }
    if (b.id === 'acAdd') { itemDialog(a, null, save); return }
    if (b.id === 'exAdd') { extraDialog(r, c, save); return }
    if (b.dataset.exDel) { ask(t('acDelQ'), '', () => { r.ex = r.ex.filter(x => x.id !== b.dataset.exDel); save() }, t('delete')); return }
    if (b.id === 'acCopy') { KP.copyText(KP.b64e(a)); return }
    if (b.id === 'acRest') { const s = dlg.open(`<h3>${esc(t('acRestore'))}</h3><textarea id="rsIn" placeholder="${esc(t('acRestorePh'))}"></textarea><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="rsOk" type="button">${esc(t('acRestore'))}</button></div>`);
      $('#rsOk', s).onclick = () => { const v = KP.b64d($('#rsIn').value.trim()); if (!v || !Array.isArray(v.items)) { toast(t('acBadCode')); return } store.set('acct', { items: v.items, m: v.m || {} }); dlg.close(); toast(t('acRestored')); renderAcct(el) }; return }
  };
}
function itemDialog(a, it, after) {
  const isNew = !it; const x = it ? Object.assign({}, it) : { id: uid(), n: '', k: 'daily', p: '', q: 1, u: '', free: 0, cut: 0 };
  const s = dlg.open(`<h3>${esc(isNew ? t('acAdd') : t('acEdit'))}</h3>
    <label class="lab" for="iN">${esc(t('acName'))}</label><input id="iN" maxlength="30" value="${esc(x.n)}">
    <label class="lab" for="iK">${esc(t('acKind'))}</label><select id="iK"><option value="daily">${esc(t('acDaily'))}</option><option value="month">${esc(t('acMonth'))}</option><option value="staff">${esc(t('acStaff'))}</option></select>
    <label class="lab" for="iP" id="iPl"></label><input id="iP" type="number" inputmode="decimal" min="0" step="0.5" value="${esc(x.p)}">
    <div id="iD"><div class="cols even"><div><label class="lab" for="iQ">${esc(t('acQty'))}</label><input id="iQ" type="number" inputmode="decimal" min="0.5" step="0.5" value="${esc(x.q)}"></div><div><label class="lab" for="iU">${esc(t('acUnit'))}</label><input id="iU" maxlength="12" value="${esc(x.u)}"></div></div></div>
    <div id="iS"><div class="cols even"><div><label class="lab" for="iF">${esc(t('acFree'))}</label><input id="iF" type="number" inputmode="numeric" min="0" value="${esc(x.free || 0)}"></div><div><label class="lab" for="iC">${esc(t('acCut'))}</label><input id="iC" type="number" inputmode="numeric" min="0" value="${esc(x.cut || 0)}"></div></div></div>
    <div class="row between" style="margin-top:16px">${isNew ? '<span></span>' : `<button class="btn danger sm" id="iDel" type="button">${ic('trash')}${esc(t('delete'))}</button>`}<div class="row"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="iOk" type="button">${esc(t('save'))}</button></div></div>`);
  const kind = $('#iK', s); kind.value = x.k;
  const sync = () => { const k = kind.value; $('#iD', s).hidden = k !== 'daily'; $('#iS', s).hidden = k !== 'staff'; $('#iPl', s).textContent = t(k === 'daily' ? 'acPriceD' : k === 'staff' ? 'acPriceM' : 'acPrice') };
  kind.onchange = sync; sync();
  $('#iOk', s).onclick = () => {
    const n = $('#iN', s).value.trim(); if (!n) { toast(t('typeSomething')); return }
    Object.assign(x, { n, k: kind.value, p: Math.max(0, +$('#iP', s).value || 0), q: Math.max(0.5, +$('#iQ', s).value || 1), u: $('#iU', s).value.trim(), free: Math.max(0, +$('#iF', s).value || 0), cut: Math.max(0, +$('#iC', s).value || 0) });
    if (isNew) a.items.push(x); else { const i = a.items.findIndex(y => y.id === x.id); a.items[i] = x }
    dlg.close(); after();
  };
  const del = $('#iDel', s); if (del) del.onclick = () => { dlg.close(); ask(t('acDelQ'), t('acDelNote'), () => { a.items = a.items.filter(y => y.id !== x.id); Object.values(a.m).forEach(r => { if (r.mk) delete r.mk[x.id]; if (r.paid) delete r.paid[x.id] }); after() }, t('delete')) };
}
function extraDialog(r, c, after) {
  const n = today(); const dim = new Date(c.y, c.m + 1, 0).getDate(); const d0 = c.y === n.getFullYear() && c.m === n.getMonth() ? n.getDate() : 1;
  const s = dlg.open(`<h3>${esc(t('acExtraAdd'))}</h3><label class="lab" for="eW">${esc(t('acWhat'))}</label><input id="eW" maxlength="40"><div class="cols even"><div><label class="lab" for="eA">${esc(t('acAmt'))}</label><input id="eA" type="number" inputmode="decimal" min="0"></div><div><label class="lab" for="eD">${esc(t('acDate'))}</label><input id="eD" type="number" inputmode="numeric" min="1" max="${dim}" value="${d0}"></div></div><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="eOk" type="button">${esc(t('save'))}</button></div>`);
  $('#eOk', s).onclick = () => { const w = $('#eW', s).value.trim(), amt = +$('#eA', s).value || 0; if (!w || amt <= 0) { toast(t('typeSomething')); return } r.ex.push({ id: uid(), what: w, amt, day: Math.min(dim, Math.max(1, +$('#eD', s).value || 1)) }); dlg.close(); after() };
}

/* ================= KITTY MONEY (shared; only the owner changes it) ================= */
let fdM = nowM();
function renderFund(el) {
  const f = store.get('fund', null) || { amt: 0, m: {} }; f.m = f.m || {};
  const c = fdM, k = mkey(c), rec = f.m[k] || { paid: {}, taker: '' }, ed = KP.canEdit();
  const mem = KP.D.members(); const amt = rec.amt != null ? rec.amt : (f.amt || 0);
  const paidN = mem.filter(m => rec.paid && rec.paid[m.id]).length; const due = mem.filter(m => !(rec.paid && rec.paid[m.id]));
  const taken = Object.keys(f.m).filter(x => x.startsWith(c.y + '-') && f.m[x].taker).sort().map(x => { const m = mem.find(y => y.id === f.m[x].taker); return m ? { k: x, n: m.name } : null }).filter(Boolean);
  el.innerHTML = `${back()}${ptitle(t('fdTitle'), t('fdSub'))}
  <div class="card">${monthBar(c)}
    ${!mem.length ? empty('users', t('fdNoMembers')) : `
    <div class="row between" style="margin-bottom:10px"><div><span class="small muted">${esc(t('fdAmt'))}</span>${ed ? `<input id="fdAmt" type="number" inputmode="numeric" min="0" value="${amt || ''}" style="max-width:140px;display:block;margin-top:4px">` : `<b style="display:block;font-size:20px;color:var(--wine)">${money(amt)}</b>`}</div>
      <div style="text-align:right"><b style="font-size:18px;color:var(--wine)">${esc(t('fdCollected', (paidN * amt).toLocaleString('en-IN'), (mem.length * amt).toLocaleString('en-IN')))}</b><div class="fd-bar"><i style="width:${mem.length ? Math.round(paidN / mem.length * 100) : 0}%"></i></div></div></div>
    <label class="lab" for="fdTk">${esc(t('fdTaker'))}</label>
    ${ed ? `<select id="fdTk"><option value="">${esc(t('fdNone'))}</option>${mem.map(m => `<option value="${esc(m.id)}" ${rec.taker === m.id ? 'selected' : ''}>${esc(m.name)}</option>`).join('')}</select>` : `<p style="margin:0 0 6px"><b>${esc((mem.find(m => m.id === rec.taker) || {}).name || t('fdNone'))}</b></p>`}
    <div class="list" style="margin-top:12px">${mem.map(m => { const p = !!(rec.paid && rec.paid[m.id]); return `<div class="li"><div class="grow"><b>${esc(m.name)}</b></div>${ed ? `<button class="chip ${p ? 'on' : ''}" data-fd="${esc(m.id)}" type="button" aria-pressed="${p}">${p ? ic('check') + ' ' : ''}${esc(p ? t('fdPaid') : t('fdDue'))}</button>` : `<span class="badge ${p ? '' : 'rose'}">${esc(p ? t('fdPaid') : t('fdDue'))}</span>`}</div>` }).join('')}</div>
    ${due.length ? (ed && amt ? `<a class="btn wine sm" style="margin-top:12px" target="_blank" rel="noopener" href="${esc(waLink(t('fdRemindMsg', mlabel(c), amt, due.map(m => m.name).join(', '))))}">${ic('wa')}${esc(t('fdRemind'))}</a>` : '') : `<p class="center" style="margin:12px 0 0"><span class="badge gold">${esc(t('fdAllPaid'))}</span></p>`}
    ${ed ? '' : `<p class="small muted" style="margin:12px 0 0">${ic('lock')} ${esc(t('fdViewOnly'))}</p>`}`}
  </div>
  ${taken.length ? `<div class="card"><div class="card-title"><span class="ic">${ic('trophy')}</span><h3>${esc(t('fdTaken'))}</h3></div><div class="list">${taken.map(x => { const [y, m] = x.k.split('-').map(Number); return `<div class="li"><div class="grow"><span class="small muted">${esc(KP.monthLabel(y, m - 1))}</span><b>${esc(x.n)}</b></div></div>` }).join('')}</div></div>` : ''}`;
  const put = fn => { if (!ed) return; const cur = store.get('fund', null) || { amt: 0, m: {} }; cur.m = cur.m || {}; const r = cur.m[k] = cur.m[k] || { paid: {}, taker: '' }; r.paid = r.paid || {}; if (r.amt == null) r.amt = cur.amt || 0; fn(cur, r); store.set('fund', cur); renderFund(el) };
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.mv) { fdM = shiftM(fdM, +b.dataset.mv); renderFund(el); return }
    if (b.dataset.fd) put((cur, r) => { r.paid[b.dataset.fd] = !r.paid[b.dataset.fd]; if (!r.paid[b.dataset.fd]) delete r.paid[b.dataset.fd] });
  };
  const ai = $('#fdAmt', el); if (ai) ai.onchange = () => put((cur, r) => { const v = Math.max(0, Math.round(+ai.value || 0)); r.amt = v; cur.amt = v });
  const tk = $('#fdTk', el); if (tk) tk.onchange = () => put((cur, r) => { r.taker = tk.value });
}

/* ================= BILLS AND SCHEMES ================= */
function renderBills(el) {
  const l = L();
  el.innerHTML = `${back()}${ptitle(t('blTitle'), t('blSub'))}
  <div class="card rose" style="margin-bottom:14px"><p style="margin:0">${ic('lock')} <b>${esc(t('blWarn'))}</b></p></div>
  <div class="cols even">${M().BILLS.map(b => `<div class="card"><div class="card-title"><span class="ic">${ic(b.ic)}</span><h3>${esc(b[l])}</h3></div><p class="small" style="margin-top:0">${esc(b['d' + l])}</p>
    <div class="row">${(b.links || []).map(([u, n]) => `<a class="btn sm" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${ic('right')}${esc(n)}</a>`).join('')}${(b.call || []).map(n => `<a class="btn ghost sm" href="tel:${n}">${ic('phone')}${esc(t('blCall'))} ${n}</a>`).join('')}${b.sms ? `<a class="btn ghost sm" href="sms:${b.sms}">${ic('chat')}${esc(t('blSms'))} ${b.sms}</a>` : ''}</div></div>`).join('')}</div>`;
  el.onclick = null;
}

/* ================= FESTIVAL PREP ================= */
let fsSel = '';
const nextDate = id => { const now = iso(today()), y = today().getFullYear(); for (const Y of [y, y + 1]) { const c = store.get('pfest_' + Y, null); if (!c) continue; const hit = Object.keys(c).sort().find(k => k >= now && c[k].some(x => x.id === id)); if (hit) return hit } return '' };
function renderFest(el) {
  const l = L(), FG = M().FG;
  if (!fsSel) {
    const list = FG.map(f => ({ f, d: nextDate(f.id) })).sort((a, b) => (a.d || '9') < (b.d || '9') ? -1 : 1);
    el.innerHTML = `${back()}${ptitle(t('fsTitle'), t('fsSub'))}<div class="quick fs-q">${list.map(({ f, d }) => `<button class="tile" type="button" data-fs="${f.id}"><span class="ic">${ic('diya')}</span><b>${esc(f[l])}</b><span>${d ? esc(fmtDate(KP.parseISO(d), { day: 'numeric', month: 'short', year: 'numeric' })) + ' · ' + esc(t('inDays', KP.daysUntil(KP.parseISO(d)))) : ''}</span></button>`).join('')}</div><p class="small muted center" style="margin-top:12px">${esc(t('fsNote'))}</p>`;
    el.onclick = e => { const b = e.target.closest('[data-fs]'); if (b) { fsSel = b.dataset.fs; renderFest(el); window.scrollTo(0, 0) } };
    return;
  }
  const f = FG.find(x => x.id === fsSel); const ticks = store.get('fsTick', {}); const got = new Set(ticks[f.id] || []); const d = nextDate(f.id);
  const items = f.items[l]; const left = items.filter((x, i) => !got.has(i));
  el.innerHTML = `<button class="btn ghost sm" id="fsBack" type="button" style="margin-bottom:10px">${ic('left')}${esc(t('back'))}</button>${ptitle(f[l], d ? t('fsNext') + ': ' + fmtDate(KP.parseISO(d), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '')}
  <div class="cols even">
   <div class="card"><div class="card-title"><span class="ic">${ic('kalash')}</span><h3>${esc(t('fsItems'))}</h3></div><p class="small muted" style="margin-top:0">${esc(t('fsTick'))}</p>
     <div class="fs-items">${items.map((x, i) => `<button type="button" class="${got.has(i) ? 'on' : ''}" data-tk="${i}" aria-pressed="${got.has(i)}">${ic('check')}<span>${esc(x)}</span></button>`).join('')}</div>
     <div class="row" style="margin-top:12px">${left.length ? `<a class="btn wine sm" target="_blank" rel="noopener" href="${esc(waLink(t('fsListMsg', f[l], left.map(x => '• ' + x).join('\n'))))}">${ic('wa')}${esc(t('fsShare'))}</a>` : `<span class="badge gold">${esc(t('fsAllGot'))}</span>`}${got.size ? `<button class="btn ghost sm" id="fsClr" type="button">${esc(t('fsClear'))}</button>` : ''}</div></div>
   <div class="stack">
     <div class="card"><div class="card-title"><span class="ic">${ic('food')}</span><h3>${esc(t('fsDishes'))}</h3></div><div class="pfest" style="display:flex;flex-wrap:wrap;gap:6px">${f.dishes[l].map(x => `<span class="badge gold">${esc(x)}</span>`).join('')}</div></div>
     <div class="card rose"><div class="card-title"><span class="ic" style="background:#fff">${ic('cup')}</span><h3>${esc(t('fsRecipe'))}: ${esc(f.recipe[l][0])}</h3></div><p style="margin:0;line-height:1.6">${esc(f.recipe[l][1])}</p></div>
     ${f.tip ? `<div class="card"><div class="card-title"><span class="ic">${ic('bell')}</span><h3>${esc(t('fsTip'))}</h3></div><p style="margin:0">${esc(f.tip[l])}</p></div>` : ''}
   </div></div><p class="small muted center" style="margin-top:12px">${esc(t('fsNote'))}</p>`;
  el.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'fsBack') { fsSel = ''; renderFest(el); return }
    if (b.dataset.tk) { const i = +b.dataset.tk; got.has(i) ? got.delete(i) : got.add(i); ticks[f.id] = [...got]; store.set('fsTick', ticks); renderFest(el); return }
    if (b.id === 'fsClr') { delete ticks[f.id]; store.set('fsTick', ticks); renderFest(el) }
  };
}

/* ================= SAFETY ================= */
function renderSafe(el) {
  const l = L(), k = l === 'kn' ? 1 : 2;
  el.innerHTML = `${back()}${ptitle(t('sfTitle'), t('sfSub'))}
  <div class="card"><div class="card-title"><span class="ic">${ic('phone')}</span><h3>${esc(t('sfNums'))}</h3></div>
    <div class="sf-nums">${M().HELP.map(h => `<a href="tel:${h[0]}"><b>${h[0]}</b><span>${esc(h[k])}</span></a>`).join('')}</div></div>
  <div class="card rose"><p style="margin:0 0 10px"><b>${esc(t('sfReport'))}</b></p><div class="row"><a class="btn wine sm" href="tel:1930">${ic('phone')}1930</a><a class="btn sm" href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">${ic('right')}${esc(t('sfReportWeb'))}</a><a class="btn ghost sm" href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer">${ic('right')}${esc(t('sfChakshu'))}</a></div></div>
  <div class="ptitle" style="margin-top:18px"><h2>${esc(t('sfScams'))}</h2></div>
  <div class="list">${M().SCAMS.map((s, i) => { const [ti, how, doo] = s[l]; const vid = s.jb ? 'https://youtu.be/' + s.jb[l] : ''; return `<details class="card sf-sc" ${i === 0 ? 'open' : ''}><summary><span class="ic">${ic('bell')}</span><b>${esc(ti)}</b></summary>
    <p class="small muted" style="margin:10px 0 2px"><b>${esc(t('sfHow'))}</b></p><p style="margin:0">${esc(how)}</p>
    <p class="small" style="margin:10px 0 2px;color:#1E6B4E"><b>${esc(t('sfDo'))}</b></p><p style="margin:0">${esc(doo)}</p>
    <div class="row" style="margin-top:10px">${vid ? `<a class="btn sm" href="${esc(vid)}" target="_blank" rel="noopener">${ic('film')}${esc(t('sfWatch'))}</a><a class="btn ghost sm" href="${esc(M().JB.cases + '?ep=' + s.jb.n + '&lang=' + l)}" target="_blank" rel="noopener">${ic('games')}${esc(t('sfCase'))}</a>` : ''}
    <a class="btn ghost sm" target="_blank" rel="noopener" href="${esc(waLink(t('sfAlertPre') + ': ' + ti + '\n\n' + how + '\n\n✅ ' + doo + '\n\n' + t('sfReport') + (vid ? '\n\n▶️ ' + t('sfVidMsg') + ': ' + vid : '')))}">${ic('wa')}${esc(t('sfShare'))}</a></div></details>` }).join('')}</div>
  <div class="card jb-card" style="margin-top:14px"><div class="card-title"><span class="ic">${ic('bell')}</span><h3>${esc(t('sfJbTitle'))}</h3></div><p style="margin-top:0">${esc(t('sfJbSub'))}</p><div class="row"><a class="btn wine sm" href="${esc(M().JB.wa)}" target="_blank" rel="noopener">${ic('wa')}${esc(t('sfJbJoin'))}</a><a class="btn ghost sm" href="${esc(M().JB.cases + '?lang=' + l)}" target="_blank" rel="noopener">${ic('games')}${esc(t('sfJbAll'))}</a></div></div>`;
  el.onclick = null;
}

/* ================= CHILDREN'S STUDY ================= */
function renderStudy(el) {
  const l = L();
  el.innerHTML = `${back()}${ptitle(t('stTitle'), t('stSub'))}<div class="cols even">${M().STUDY.map(s => `<div class="card"><div class="card-title"><span class="ic">${ic('brain')}</span><h3>${esc(s[l])}</h3></div><p style="margin-top:0">${esc(s['d' + l])}</p><a class="btn sm" href="${esc(s.url)}" target="_blank" rel="noopener">${ic('right')}${esc(s.url.replace('https://', ''))}</a></div>`).join('')}</div>`;
  el.onclick = null;
}
})();
