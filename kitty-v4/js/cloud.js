/* Kitty Party Circle — shared online storage, joining, admin lock and photos.
   Shared data lives in a free Supabase project. Only the admin's account can change it
   (checked on the server); everyone else can see it and chat. */
(() => {
const KP = window.KP;
const { $, $$, esc, ic, store, t, toast, dlg, ask, uid } = KP;
const SB_URL = 'https://ugqorbrtltzhqkesidls.supabase.co';
const SB_KEY = 'sb_publishable__a6A1fXedPo8eK-c3kqchw__YPbbCp7'; // public key, safe in the browser (server rules do the locking)
const SHARED = ['cal2', 'members', 'albums', 'att', 'ann', 'potluck', 'log', 'invs_pub', 'photos'];
const PRIV = ['invs'];
const isSyncKey = k => SHARED.includes(k) || PRIV.includes(k);

/* remember what kind of email link opened the app, before the login library clears it */
const linkType = (location.hash.match(/[#&]type=(\w+)/) || [])[1] || '';
const linkErr = /error_code=/.test(location.hash);

const raw = { get: store.get.bind(store), set: store.set.bind(store), del: store.del.bind(store) };
const C = KP.cloud = { sb: null, user: null, admin: !!raw.get('isAdmin', false), msgs: [], started: false };
KP.isAdmin = () => !!C.admin;
KP.canEdit = () => !C.sb || !!C.admin;
const markBody = () => document.body.classList.toggle('viewer', !KP.canEdit());

/* ---------- invitations that everyone may see (secrets removed) ---------- */
function pubInv(d) {
  const s = JSON.parse(JSON.stringify(d || {})); delete s.privateNote; s.secrets = s.secrets || {};
  if (s.secrets.place) { s.address = ''; s.venueName = '' }
  if (s.secrets.act) s.activities = s.activities ? '•' : '';
  if (s.secrets.menu) s.menu = s.menu ? '•' : '';
  if (s.secrets.games) s.games = (s.games || []).length ? ['•'] : [];
  return s;
}
const pubInvs = L => (L || []).map(r => ({ id: r.id, updated: r.updated, data: pubInv(r.data) }));
KP.pubInv = pubInv;

/* ---------- storage wrapper: shared keys go online ---------- */
const dirty = new Set(raw.get('_dirty', [])); const ver = {};
const saveDirty = () => raw.set('_dirty', [...dirty]);
store.set = (k, v) => {
  if (C.sb && isSyncKey(k)) {
    if (!C.admin) return false;
    if (!raw.set(k, v)) return false;
    dirty.add(k); ver[k] = (ver[k] || 0) + 1;
    if (k === 'invs') { raw.set('invs_pub', pubInvs(v)); dirty.add('invs_pub'); ver.invs_pub = (ver.invs_pub || 0) + 1 }
    saveDirty(); schedulePush(); return true;
  }
  return raw.set(k, v);
};
let pushT = null, pushing = false, warned = false;
const schedulePush = (ms = 600) => { clearTimeout(pushT); pushT = setTimeout(push, ms) };
async function push() {
  if (!C.sb || !C.admin || !C.user || pushing || !dirty.size) return;
  pushing = true;
  const keys = [...dirty], v0 = {}; keys.forEach(k => v0[k] = ver[k] || 0);
  const now = new Date().toISOString();
  const rows = keys.map(k => ({ key: k, value: raw.get(k, k === 'cal2' ? null : []), updated_at: now })).filter(r => r.value !== null);
  let err = null;
  try {
    const pub = rows.filter(r => SHARED.includes(r.key)), prv = rows.filter(r => PRIV.includes(r.key));
    if (pub.length) ({ error: err } = await C.sb.from('kv').upsert(pub));
    if (!err && prv.length) ({ error: err } = await C.sb.from('kv_private').upsert(prv));
  } catch (e) { err = e }
  pushing = false;
  if (!err) { keys.forEach(k => { if ((ver[k] || 0) === v0[k]) dirty.delete(k) }); saveDirty(); warned = false; if (dirty.size) schedulePush(); return }
  if (err && (err.code === '42501' || /row-level security/i.test(err.message || ''))) { await checkAdmin(); if (!C.admin) { toast(t('notOwner')); return } }
  if (!warned) { toast(t('syncLater')); warned = true }
  schedulePush(20000);
}
addEventListener('online', () => { schedulePush(300); pull() });

/* ---------- bring shared data to this phone ---------- */
let refreshT = null;
KP.refresh = () => {
  clearTimeout(refreshT);
  refreshT = setTimeout(() => {
    const h = location.hash.slice(1) || 'home'; const top = h.split('-')[0];
    const busy = $('#dlg').classList.contains('on') || document.querySelector('.lightbox') || (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && document.activeElement.closest('#main'));
    if (busy) { KP.refresh(); return }
    if (['home', 'act', 'food', 'people'].includes(top) || (top === 'invite' && !KP.canEdit())) KP.route && KP.route(true);
    KP.drawBell && KP.drawBell();
  }, 400);
};
function applyRow(k, value) {
  if (dirty.has(k)) return false;
  const cur = localStorage.getItem('kp_' + k), nv = JSON.stringify(value);
  if (cur === nv) return false;
  if (cur != null && !raw.get('_firstSync', false)) raw.set('bak_' + k, JSON.parse(cur));
  raw.set(k, value); return true;
}
async function pull() {
  if (!C.sb || !C.user) return false;
  try {
    const { data, error } = await C.sb.from('kv').select('key,value'); if (error) throw error;
    let changed = false; const seen = new Set();
    data.forEach(r => { seen.add(r.key); if (SHARED.includes(r.key) && applyRow(r.key, r.value)) changed = true });
    if (C.admin) {
      const p = await C.sb.from('kv_private').select('key,value');
      if (!p.error) p.data.forEach(r => { seen.add(r.key); if (PRIV.includes(r.key) && applyRow(r.key, r.value)) changed = true });
    }
    if (!raw.get('_firstSync', false)) {
      if (C.admin) {
        /* the admin's own phone: share what was saved here before (only what is not online yet) */
        let moved = 0;
        [...SHARED, ...PRIV].forEach(k => {
          if (seen.has(k)) return;
          if (localStorage.getItem('kp_' + k) == null && localStorage.getItem('kp_bak_' + k) != null) raw.set(k, raw.get('bak_' + k));
          if (localStorage.getItem('kp_' + k) != null) { dirty.add(k); moved++; if (k === 'invs') dirty.add('invs_pub') }
        });
        if (dirty.has('invs')) raw.set('invs_pub', pubInvs(raw.get('invs', [])));
        saveDirty(); if (moved) { schedulePush(100); toast(t('moved')) }
        raw.set('_firstSync', true); migratePhotos();
      } else {
        /* a lady's phone: keep anything saved here before as a backup, show the shared data */
        SHARED.forEach(k => { if (!seen.has(k) && localStorage.getItem('kp_' + k) != null) { raw.set('bak_' + k, raw.get(k)); raw.del(k); changed = true } });
        raw.set('_firstSync', true);
      }
    }
    if (changed) KP.refresh();
    return true;
  } catch (e) { return false }
}
KP.pull = pull;
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { pull(); KP.chatPull && KP.chatPull(); seen() } });

/* ---------- who am I ---------- */
async function checkAdmin() {
  if (!C.sb || !C.user || C.user.is_anonymous) { C.admin = false }
  else { try { const { data, error } = await C.sb.rpc('is_admin'); if (!error) C.admin = data === true } catch (e) {} }
  raw.set('isAdmin', C.admin); markBody(); return C.admin;
}
function seen() { if (C.sb && C.user) C.sb.from('people').update({ last_seen: new Date().toISOString() }).eq('uid', C.user.id).then(() => {}, () => {}) }
const device = () => { const u = navigator.userAgent || ''; return (/iPhone|iPad/.test(u) ? 'iPhone' : /Android/.test(u) ? 'Android' : /Mac/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows' : 'Other') + (KP.isStandalone() ? ' · app' : ' · browser') };
async function ensurePerson() {
  const name = raw.get('myName', '') || (C.admin ? 'Shubha' : t('owner'));
  const phone = raw.get('myPhone', '') || '0000000000';
  try { await C.sb.from('people').upsert({ uid: C.user.id, name: name.slice(0, 50), phone, device: device(), last_seen: new Date().toISOString() }, { onConflict: 'uid' }) } catch (e) {}
}
async function afterLogin() {
  await checkAdmin();
  if (C.admin) ensurePerson(); else seen();
  await pull();
  subscribe();
  KP.chatStart && KP.chatStart();
  KP.refresh();
  if (C.admin && ['magiclink', 'recovery', 'invite', 'signup'].includes(linkType)) setPwDialog();
  if (C.admin) schedulePush(200);
}
KP.setMyName = async name => { raw.set('myName', name); if (C.sb && C.user) { try { await C.sb.from('people').update({ name: name.slice(0, 50) }).eq('uid', C.user.id) } catch (e) {} } };

/* ---------- live updates ---------- */
let kvChan = null;
function subscribe() {
  if (kvChan || !C.sb) return;
  kvChan = C.sb.channel('kv-live').on('postgres_changes', { event: '*', schema: 'public', table: 'kv' }, p => {
    const r = p.new && p.new.key ? p.new : null; if (r && SHARED.includes(r.key) && applyRow(r.key, r.value)) KP.refresh();
  }).subscribe();
}

/* ---------- joining (first open) ---------- */
function joinScreen(offline) {
  let w = $('#join'); if (!w) { w = document.createElement('div'); w.id = 'join'; document.body.appendChild(w) }
  w.innerHTML = `<div class="join-card"><img src="logo.png" alt="" class="join-logo"><h1>${esc(t('joinTitle'))}</h1><p class="muted">${esc(t('joinSub'))}</p>
    <label class="lab" for="jName">${esc(t('joinName'))}</label><input id="jName" maxlength="40" autocomplete="name" value="${esc(raw.get('myName', ''))}">
    <label class="lab" for="jPhone">${esc(t('joinPhone'))}</label><input id="jPhone" inputmode="numeric" autocomplete="tel" maxlength="18" placeholder="98xxxxxxxx" value="${esc(raw.get('myPhone', ''))}">
    <p class="small" id="jErr" style="color:var(--danger)" ${offline ? '' : 'hidden'}>${offline ? esc(t('joinOffline')) : ''}</p>
    <button class="btn big" id="jGo" type="button" style="width:100%;margin-top:14px">${ic('check')}${esc(t('joinBtn'))}</button>
    <button class="btn ghost sm" id="jLater" type="button" style="margin-top:10px" ${offline ? '' : 'hidden'}>${esc(t('joinLater'))}</button>
    <p class="small muted" style="margin-top:14px">${ic('lock', '')} ${esc(t('joinPrivacy'))}</p>
    <button class="btn ghost sm langBtn" id="jLang" type="button">${KP.L === 'kn' ? 'English' : 'ಕನ್ನಡ'}</button></div>`;
  w.hidden = false; document.body.classList.add('joining');
  const err = m => { const e = $('#jErr'); e.textContent = m; e.hidden = false };
  $('#jLang').onclick = () => { KP.toggleLang(); joinScreen(offline) };
  $('#jLater').onclick = () => { w.hidden = true; document.body.classList.remove('joining') };
  $('#jGo').onclick = async () => {
    const name = $('#jName').value.trim().replace(/\s+/g, ' ');
    let ph = $('#jPhone').value.replace(/\D/g, ''); if (ph.length === 12 && ph.startsWith('91')) ph = ph.slice(2); if (ph.length === 11 && ph[0] === '0') ph = ph.slice(1);
    if (!name) { err(t('joinNeedName')); $('#jName').focus(); return }
    if (!/^[6-9]\d{9}$/.test(ph)) { err(t('joinBadPhone')); $('#jPhone').focus(); return }
    const b = $('#jGo'); b.disabled = true; b.textContent = t('wait');
    try {
      let user = C.user;
      if (!user) { const { data, error } = await C.sb.auth.signInAnonymously(); if (error) throw error; user = data.user }
      C.user = user;
      const { error: e2 } = await C.sb.from('people').upsert({ uid: user.id, name, phone: ph, device: device() }, { onConflict: 'uid' });
      if (e2) throw e2;
      raw.set('myName', name); raw.set('myPhone', ph);
      w.hidden = true; document.body.classList.remove('joining');
      await afterLogin();
    } catch (e) { err(t('joinFail')); $('#jLater').hidden = false; b.disabled = false; b.innerHTML = ic('check') + esc(t('joinBtn')) }
  };
}
KP.joinScreen = joinScreen;

/* ---------- admin login ---------- */
KP.hostLogin = () => {
  if (!C.sb) return;
  if (C.admin) { ask(t('logoutQ'), t('logoutB'), logoutAdmin, t('logout')); return }
  const s = dlg.open(`<h3>${ic('key', '')} ${esc(t('hostLogin'))}</h3><p class="small muted">${esc(t('hostLoginSub'))}</p>
    <label class="lab" for="hEmail">${esc(t('email'))}</label><input id="hEmail" type="email" autocomplete="username" value="${esc(raw.get('adminEmail', ''))}">
    <label class="lab" for="hPw">${esc(t('password'))}</label><input id="hPw" type="password" autocomplete="current-password">
    <p class="small" id="hErr" style="color:var(--danger)" hidden></p>
    <div class="row" style="justify-content:space-between;margin-top:14px"><button class="btn ghost sm" id="hForgot" type="button">${esc(t('forgotPw'))}</button><div class="row"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="hGo" type="button">${esc(t('loginBtn'))}</button></div></div>`);
  const err = m => { const e = $('#hErr', s); e.textContent = m; e.hidden = false };
  $('#hGo', s).onclick = async () => {
    const email = $('#hEmail', s).value.trim(), password = $('#hPw', s).value;
    if (!email || !password) { err(t('loginFail')); return }
    const b = $('#hGo', s); b.disabled = true; b.textContent = t('wait');
    try {
      const { data, error } = await C.sb.auth.signInWithPassword({ email, password }); if (error) throw error;
      C.user = data.user; raw.set('adminEmail', email);
      if (!(await checkAdmin())) { await C.sb.auth.signOut({ scope: 'local' }); C.user = null; err(t('notOwner')); b.disabled = false; b.textContent = t('loginBtn'); return }
      dlg.close(); raw.set('_firstSync', false); await afterLogin(); KP.drawAll(); toast(t('youOwner'));
    } catch (e) { err(t('loginFail')); b.disabled = false; b.textContent = t('loginBtn') }
  };
  $('#hForgot', s).onclick = async () => {
    const email = $('#hEmail', s).value.trim(); if (!email) { err(t('needEmail')); return }
    try { const { error } = await C.sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: KP.APP_URL } }); if (error) throw error; raw.set('adminEmail', email); dlg.close(); toast(t('pwMailSent')); KP.dlg.open(`<h3>${esc(t('hostLogin'))}</h3><p>${esc(t('pwMailSent'))}</p><div class="row" style="justify-content:flex-end"><button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`) } catch (e) { err(t('pwMailFail')) }
  };
};
function setPwDialog() {
  const s = dlg.open(`<h3>${ic('key', '')} ${esc(t('setPw'))}</h3><p class="small muted">${esc(t('setPwSub'))}</p><label class="lab" for="nPw">${esc(t('password'))}</label><input id="nPw" type="password" autocomplete="new-password"><p class="small" id="nErr" style="color:var(--danger)" hidden></p><div class="row" style="justify-content:flex-end;margin-top:14px"><button class="btn ghost" data-close type="button">${esc(t('cancel'))}</button><button class="btn wine" id="nGo" type="button">${esc(t('save'))}</button></div>`);
  $('#nGo', s).onclick = async () => {
    const pw = $('#nPw', s).value; const e = $('#nErr', s);
    if (pw.length < 8) { e.textContent = t('pwShort'); e.hidden = false; return }
    try { const { error } = await C.sb.auth.updateUser({ password: pw }); if (error) throw error; dlg.close(); KP.dlg.open(`<h3>${esc(t('setPw'))}</h3><p>${esc(t('pwSaved'))}</p><div class="row" style="justify-content:flex-end"><button class="btn wine" data-close type="button">${esc(t('close'))}</button></div>`) } catch (x) { e.textContent = t('pwFail'); e.hidden = false }
  };
}
async function logoutAdmin() {
  try { await C.sb.auth.signOut({ scope: 'local' }) } catch (e) {}
  C.user = null; C.admin = false; raw.set('isAdmin', false); markBody();
  const name = raw.get('myName', ''), ph = raw.get('myPhone', '');
  if (name && /^\d{10}$/.test(ph)) { try { const { data } = await C.sb.auth.signInAnonymously(); C.user = data.user; await C.sb.from('people').upsert({ uid: C.user.id, name, phone: ph, device: device() }, { onConflict: 'uid' }); await afterLogin() } catch (e) {} }
  if (!C.user) joinScreen(false);
  KP.drawAll();
}

/* ---------- photos ---------- */
const pubUrl = path => SB_URL + '/storage/v1/object/public/photos/' + path.split('/').map(encodeURIComponent).join('/');
KP.photos = {
  cloud: () => !!C.sb,
  async all() {
    if (!C.sb) { const ps = await KP.idb.all(); return ps.map(p => Object.assign(p, { src: URL.createObjectURL(p.blob) })) }
    return (raw.get('photos', []) || []).map(p => Object.assign({}, p, { src: pubUrl(p.path) }));
  },
  async add(album, blob, at) {
    if (!C.sb) return KP.idb.put({ id: uid(), album, blob, caption: '', at });
    const id = uid(), path = album + '/' + id + '.jpg';
    const { error } = await C.sb.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg', upsert: false, cacheControl: '31536000' });
    if (error) throw error;
    const L = raw.get('photos', []) || []; L.push({ id, album, path, caption: '', at }); store.set('photos', L);
  },
  async del(ids) {
    ids = [].concat(ids); if (!ids.length) return;
    if (!C.sb) { for (const id of ids) await KP.idb.del(id); return }
    const L = raw.get('photos', []) || []; const paths = L.filter(p => ids.includes(p.id)).map(p => p.path);
    if (paths.length) { try { await C.sb.storage.from('photos').remove(paths) } catch (e) {} }
    store.set('photos', L.filter(p => !ids.includes(p.id)));
  },
  async caption(p, text) {
    if (!C.sb) { p.caption = text; const q = Object.assign({}, p); delete q.src; return KP.idb.put(q) }
    const L = raw.get('photos', []) || []; const x = L.find(y => y.id === p.id); if (x) { x.caption = text; store.set('photos', L) }
  },
  async blob(p) { if (p.blob) return p.blob; const r = await fetch(p.src); return r.blob() }
};
async function migratePhotos() {
  if (!C.admin || raw.get('_photosMoved', false)) return;
  let ps = []; try { ps = await KP.idb.all() } catch (e) { raw.set('_photosMoved', true); return }
  if (!ps.length) { raw.set('_photosMoved', true); return }
  let ok = 0;
  for (const p of ps) { try { await KP.photos.add(p.album, p.blob, p.at); const L = raw.get('photos', []); const last = L[L.length - 1]; if (last && p.caption) { last.caption = p.caption; store.set('photos', L) } ok++; toast(t('movingPhotos', ok, ps.length)) } catch (e) {} }
  if (ok === ps.length) raw.set('_photosMoved', true);
  KP.refresh();
}

/* ---------- start ---------- */
KP.cloudStart = async () => {
  if (C.started) return; C.started = true;
  const sharedInvite = new URLSearchParams(location.search).get('inv');
  if (!KP.APP_URL || !window.supabase || !window.supabase.createClient) { C.sb = null; markBody(); return }
  try {
    C.sb = window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit', storageKey: 'kp_auth' } });
  } catch (e) { C.sb = null; markBody(); return }
  markBody();
  let session = null;
  try { ({ data: { session } } = await C.sb.auth.getSession()) } catch (e) {}
  if (/access_token=|error_code=/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search + '#home') } catch (e) {} }
  C.user = session ? session.user : null;
  C.sb.auth.onAuthStateChange((ev, s) => { if (s && s.user) C.user = s.user; if (ev === 'PASSWORD_RECOVERY') setPwDialog() });
  if (C.user) { await afterLogin(); return }
  if (sharedInvite) return;
  if (linkErr) toast(t('pwMailFail'));
  joinScreen(!navigator.onLine);
};
markBody();
})();
