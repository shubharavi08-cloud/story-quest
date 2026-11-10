/* Road to Ayodhya: mini-games shown on Challenge squares. One per level theme.
   Each game gets a small api {card, close, t, tx, SFX, peek} and returns a Promise of {ok, move?, pts?}.
   ok = the player succeeded · move = steps to move (default 3 when ok) · pts = points (default 25 when ok).
   To add a game: add a function to GAMES and list its key in the level's `games` array (data/levels.js). */
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const T=(en,hi,kn)=>({en,hi,kn});
/* three-scene sets for the "put the story in order" game (correct order as written) */
const ORDER_SETS=[
 [T('A golden deer appears','सोने का हिरण दिखता है','ಚಿನ್ನದ ಜಿಂಕೆ ಕಾಣಿಸುತ್ತದೆ'),T('Ram goes after the deer','राम हिरण के पीछे जाते हैं','ರಾಮ ಜಿಂಕೆಯ ಹಿಂದೆ ಹೋಗುತ್ತಾನೆ'),T('Ravana carries Sita away','रावण सीता को ले जाता है','ರಾವಣ ಸೀತೆಯನ್ನು ಕೊಂಡೊಯ್ಯುತ್ತಾನೆ')],
 [T('Ram leaves for the forest','राम वन को जाते हैं','ರಾಮ ಕಾಡಿಗೆ ಹೊರಡುತ್ತಾನೆ'),T('The bridge to Lanka is built','लंका तक पुल बनता है','ಲಂಕೆಗೆ ಸೇತುವೆ ಕಟ್ಟುತ್ತಾರೆ'),T('Ram returns to Ayodhya','राम अयोध्या लौटते हैं','ರಾಮ ಅಯೋಧ್ಯೆಗೆ ಮರಳುತ್ತಾನೆ')],
 [T('Ram lifts the great bow','राम महान धनुष उठाते हैं','ರಾಮ ಮಹಾಧನುಸ್ಸನ್ನು ಎತ್ತುತ್ತಾನೆ'),T('Hanuman leaps across the sea','हनुमान समुद्र लाँघते हैं','ಹನುಮಂತ ಸಮುದ್ರ ಹಾರುತ್ತಾನೆ'),T('Lamps are lit in Ayodhya','अयोध्या में दीये जलते हैं','ಅಯೋಧ್ಯೆಯಲ್ಲಿ ದೀಪ ಬೆಳಗುತ್ತವೆ')]];

function open(api,key,body){const m=api.t('mg'),g=m[key];return api.card(`<span class="tag">🎯 ${m.tag}</span><h3>${g.t}</h3><p>${g.d}</p>${body}<p id="mgfb" class="mgfb"></p>`,'mg')}
function finish(api,c,ok,res,msg){const m=api.t('mg');c.querySelector('#mgfb').textContent=msg||(ok?m.win:m.lose);ok?api.SFX.right():api.SFX.wrong();
 c.querySelectorAll('button:not(#ok)').forEach(b=>b.disabled=true);
 return new Promise(r=>{c.insertAdjacentHTML('beforeend',`<button class="go" id="ok">${api.t('ok')}</button>`);const b=c.querySelector('#ok');b.focus();b.onclick=()=>{api.close();r(Object.assign({ok},res||{}))}})}

const GAMES={
 /* Mithila: timing meter */
 bow(api){const m=api.t('mg'),c=open(api,'bow',`<div class="mg-meter"><i class="zone"></i><i class="mark"></i></div><button class="go alt" id="act">🏹 ${m.bow.btn}</button>`);
  return new Promise(res=>{let x=0,run=true;const mark=c.querySelector('.mark'),t0=performance.now();
   (function st(now){if(!run||!mark.isConnected)return;x=(Math.sin((now-t0)/420)+1)/2;mark.style.left=(x*100)+'%';requestAnimationFrame(st)})(t0);
   c.querySelector('#act').onclick=()=>{run=false;finish(api,c,x>.36&&x<.64).then(res)}})},

 /* Chitrakoot: find three pairs in six turns */
 memory(api){const m=api.t('mg'),icons=shuffle(['🦚','🦚','🌺','🌺','🍯','🍯']);let left=6,first=null,found=0,lock=false;
  const c=open(api,'memory',`<div class="mg-grid">${icons.map((_,i)=>`<button class="mg-cell" data-i="${i}">🍃</button>`).join('')}</div><p class="small" id="mgl">${m.memory.left(left)}</p>`);
  return new Promise(res=>{c.querySelectorAll('.mg-cell').forEach(b=>b.onclick=async()=>{if(lock||b.dataset.open)return;api.SFX.click();b.textContent=icons[+b.dataset.i];b.dataset.open=1;
    if(!first){first=b;return}lock=true;left--;c.querySelector('#mgl').textContent=m.memory.left(left);
    if(icons[+first.dataset.i]===icons[+b.dataset.i]){found++;first.classList.add('ok');b.classList.add('ok');first=null;lock=false;if(found===3)return finish(api,c,true).then(res)}
    else{await wait(700);[first,b].forEach(x=>{x.textContent='🍃';delete x.dataset.open});first=null;lock=false}
    if(left<=0&&found<3)finish(api,c,false).then(res)})})},

 /* Dandakaranya: choose a route */
 paths(api){const m=api.t('mg'),c=open(api,'paths',`<div class="opts"><button class="opt" id="pa">🌿 <b>${m.paths.safe}</b><br>${m.paths.safeD}</button><button class="opt" id="pb">⛰️ <b>${m.paths.brave}</b><br>${m.paths.braveD}</button></div>`);
  return new Promise(res=>{c.querySelector('#pa').onclick=()=>finish(api,c,true,{move:2,pts:10},'🌿 '+m.paths.safeD).then(res);
   c.querySelector('#pb').onclick=()=>{const v=1+(Math.random()*6|0),ok=v>=4;api.SFX.dice();finish(api,c,ok,{move:ok?6:-2,pts:ok?25:0},'🎲 '+m.paths.res(v,ok)).then(res)}})},

 /* Panchavati: follow the golden deer as the bushes swap places */
 deer(api){const m=api.t('mg'),c=open(api,'deer',`<div class="mg-row" id="row">${[0,1,2].map(i=>`<button class="mg-bush" data-i="${i}" style="left:${i*34}%" disabled>🌳</button>`).join('')}</div><p class="small" id="mgl">${m.deer.watch}</p>`);
  return new Promise(async res=>{const bs=[...c.querySelectorAll('.mg-bush')],slot=[0,1,2],deer=Math.random()*3|0;
   bs[deer].textContent='🦌';await wait(1000);if(!c.isConnected)return;bs[deer].textContent='🌳';await wait(350);
   for(let k=0;k<5;k++){const a=Math.random()*3|0,b=(a+1+(Math.random()*2|0))%3;[slot[a],slot[b]]=[slot[b],slot[a]];bs.forEach((x,i)=>x.style.left=(slot[i]*34)+'%');api.SFX.hop(k);await wait(520);if(!c.isConnected)return}
   c.querySelector('#mgl').textContent=m.deer.pick;bs.forEach((b,i)=>{b.disabled=false;b.onclick=()=>{bs[deer].textContent='🦌';finish(api,c,i===deer).then(res)}})})},

 /* Panchavati / Return: put three scenes in order */
 order(api){const set=ORDER_SETS[Math.random()*ORDER_SETS.length|0],idx=shuffle([0,1,2]);let next=0;
  const c=open(api,'order',`<div class="opts">${idx.map(i=>`<button class="opt" data-i="${i}"><b class="n"></b> ${api.tx(set[i])}</button>`).join('')}</div>`);
  return new Promise(res=>{c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(b.dataset.done)return;const i=+b.dataset.i;
    if(i!==next){b.classList.add('wrong');return finish(api,c,false).then(res)}api.SFX.click();b.dataset.done=1;b.classList.add('right');b.querySelector('.n').textContent=(next+1)+'.';next++;if(next===3)finish(api,c,true).then(res)})})},

 /* Kishkindha: repeat the order in which the friends light up (a win helps every player) */
 team(api){const fr=['🐒','🐻','🐿️','🦅'],seq=Array.from({length:4},()=>Math.random()*4|0);let pos=0,listen=false;
  const c=open(api,'team',`<div class="mg-grid four">${fr.map((f,i)=>`<button class="mg-cell" data-i="${i}" disabled>${f}</button>`).join('')}</div>`);
  return new Promise(async res=>{const bs=[...c.querySelectorAll('.mg-cell')];await wait(600);
   for(const s of seq){if(!c.isConnected)return;bs[s].classList.add('lit');api.SFX.hop(s*3);await wait(520);bs[s].classList.remove('lit');await wait(180)}
   listen=true;bs.forEach((b,i)=>{b.disabled=false;b.onclick=()=>{if(!listen)return;b.classList.add('lit');setTimeout(()=>b.classList.remove('lit'),200);
     if(i!==seq[pos]){listen=false;return finish(api,c,false).then(res)}api.SFX.hop(i*3);pos++;if(pos===seq.length){listen=false;finish(api,c,true).then(res)}}})})},

 /* Rameswaram: tap the stones 1 to 6 before the time bar runs out */
 bridge(api){const order=shuffle([1,2,3,4,5,6]);let next=1,done=false;
  const c=open(api,'bridge',`<div class="mg-time"><i></i></div><div class="mg-grid">${order.map(n=>`<button class="mg-cell stone" data-n="${n}">${n}</button>`).join('')}</div>`);
  return new Promise(res=>{const bar=c.querySelector('.mg-time i'),t0=performance.now(),D=10000;
   (function st(now){if(done||!bar.isConnected)return;const s=Math.min(1,(now-t0)/D);bar.style.width=(100-s*100)+'%';if(s>=1){done=true;return finish(api,c,false).then(res)}requestAnimationFrame(st)})(t0);
   c.querySelectorAll('.stone').forEach(b=>b.onclick=()=>{if(done)return;if(+b.dataset.n!==next){b.classList.add('bad');setTimeout(()=>b.classList.remove('bad'),250);api.SFX.wrong();return}
    api.SFX.hop(next);b.classList.add('ok');b.disabled=true;next++;if(next>6){done=true;finish(api,c,true).then(res)}})})},

 /* Lanka: two dice are rolled, the player picks one */
 dice2(api){const m=api.t('mg'),a=1+(Math.random()*6|0);let b=1+(Math.random()*6|0);if(b===a)b=a%6+1;api.SFX.dice();
  const c=open(api,'dice2',`<div class="opts">${[a,b].map(v=>{const n=api.peek(v);return `<button class="opt" data-v="${v}">🎲 <b>${m.dice2.opt(v,n.sq)}</b> ${n.mark}</button>`}).join('')}</div>`);
  return new Promise(res=>{c.querySelectorAll('.opt').forEach(x=>x.onclick=()=>{x.classList.add('right');finish(api,c,true,{move:+x.dataset.v,pts:10},'🎲 '+x.dataset.v).then(res)})})}
};
export const GAME_KEYS=Object.keys(GAMES);
export function runGame(kind,api){return (GAMES[kind]||GAMES.order)(api)}
