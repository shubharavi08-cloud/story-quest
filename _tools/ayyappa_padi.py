"""Ayyappa page: replace the old 'Climb the 18 sacred steps' box with the 18 steps · 18 songs · 18 games journey.
Usage: python3 _tools/ayyappa_padi.py   (from the repo root; refuses to run twice)
To add a song or game later, edit the PADI rows in ayyappa.html (yt = YouTube id, href = game page, key = game key)."""
p = 'ayyappa.html'
s = open(p, encoding='utf-8').read()
assert 'const PADI=' not in s, 'already applied'

i = s.index(' <section id="steps"')
j = s.index(' <section style="display:flex;flex-direction:column;gap:12px"><h2>Light a deepam for Swami</h2>')
new = ''' <section id="steps" style="display:flex;flex-direction:column;gap:12px"><h2>Pathinettam Padi Yatra: 18 steps, 18 songs, 18 games</h2>
  <ol class="howto"><li><b>Tap a step</b> on the picture (start at the bottom, step 1).</li><li><b>Listen to its song</b> and <b>play its game</b>. The song plays in a small window while you play.</li><li>When you finish, that step <b>lights up</b>. Climb all 18 through the season: new songs and games join every week.</li></ol>
  <div class="climb">
   <div class="padi" id="padi" role="list" aria-label="The 18 steps"></div>
   <div class="panel"><div class="leave" id="leave" aria-live="polite"></div>
    <div class="row" id="stepBtns"></div>
    <div class="bar" aria-label="Progress"><i id="prog"></i></div><p class="muted" id="progT" style="margin:0"></p></div></div></section>

'''
s = s[:i] + new + s[j:]

css = '''.howto{margin:0;padding-left:22px;color:var(--muted);display:grid;gap:4px}.howto b{color:var(--ink)}
.padi{position:relative;width:min(420px,100%);aspect-ratio:900/1587;margin:0 auto;border-radius:18px;overflow:hidden;background:#120c30 url(img/ayyappa/steps_v.jpg) center/100% 100% no-repeat;border:1px solid var(--line)}
.padi button{all:unset;position:absolute;left:50%;transform:translateX(-50%);cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;font:800 12px var(--display);color:#2b1700;box-sizing:border-box}
.padi button.done{background:rgba(255,214,110,.55);box-shadow:0 0 14px rgba(255,211,90,.9)}
.padi button.has{outline:2px solid rgba(255,240,190,.75)}.padi button.soon{outline:1px dashed rgba(255,240,190,.35)}
.padi button.sel{background:rgba(255,255,255,.5);animation:pulse 1.1s infinite}
.padi button span{background:#1c1442d9;color:#ffd35a;border-radius:99px;padding:0 6px;line-height:16px}
'''
k = s.index('/* 18 steps */')          # the CSS comment comes first
s = s[:k] + css + s[k:]

a = s.index("/* 18 steps */\nconst STEPS=")
b = s.index("/* diya */", a)            # the script's diya block, after the steps script
js = r'''/* the 18-step yatra: one song and one game for each step (songs and games join through the season) */
const PADI=[
 {song:'Harihara Suthane',lang:'ಕನ್ನಡ',yt:'UOGXzfLW8vc',game:'Mandala Deepam',href:'mandala-deepam.html',key:'mandala-deepam'},
 {song:'Huli Yeri Banda Manikanta',lang:'ಕನ್ನಡ',yt:'hfIpmrnAiIk',game:'Tiger Ride'},
 {song:'Pathinettam Padi',lang:'ಕನ್ನಡ',yt:'_Ig9Mpqf9hc',game:'Sharanam Steps',href:'sharanam-steps.html',key:'sharanam-steps'},
 {song:'Karunamaya Ayyappa',lang:'ಕನ್ನಡ',yt:'KplILYGBovg',game:'Pack the Irumudi',href:'irumudi.html',key:'irumudi'},
 {song:'Malai Azhaikuthada Ayyappa',lang:'தமிழ்',yt:'1Zo3yL76uYg',game:'Sabarimala Yatra',href:'sabari-yatra.html',key:'sabari-yatra'},
 {song:'Ennai Thaangum Manikanta',lang:'தமிழ்',yt:'rn5pubakWH8',game:'Carry the Irumudi'},
 {song:'Malaippaathai Azhaikkudhe',lang:'தமிழ்',game:'Mountain Path'},
 {song:'Pambai Nadhiye Vazhikaattu',lang:'தமிழ்',game:'Pamba Lamps'},
 {song:'Pathinettam Padiye Un Vaasal',lang:'தமிழ்',game:'Steps Puzzle'},
 {song:'Thirumbum Paathaiyilum Neeye',lang:'தமிழ்',game:'The Way Home'},
 {song:'Harihara Atmaja Saranam',lang:'తెలుగు',game:'Harihara Pairs'},
 {song:'Deeparadhana Velalo',lang:'తెలుగు',game:'Deeparadhana'},
 {song:'Dharmadeepamai',lang:'తెలుగు',game:'Lamp of Dharma'},
 {song:'Sabarigiri Pilichindira',lang:'తెలుగు',game:'Sabarigiri Climb'},
 {song:'Saranam Ayyappa',lang:'മലയാളം',game:'Saranam Echo'},
 {song:'Mamateya Manikanta',lang:'ಕನ್ನಡ',game:'Pandalam Palace'},
 {song:'Sabarigiri Kareyutide',lang:'ಕನ್ನಡ',game:'Sabarimala Jigsaw'},
 {song:'Swamiye Sharanam',lang:'ಕನ್ನಡ',game:'108 Names Mala'}];
const padi=document.getElementById('padi'),leave=document.getElementById('leave'),prog=document.getElementById('prog');let sel=-1,ac;
function prDone(){let pr={},heard={};try{pr=JSON.parse(localStorage.getItem('storyquest')||'{}');heard=JSON.parse(localStorage.getItem('ayy-heard')||'{}')}catch(e){}return PADI.map((p,i)=>!!(p.key?pr['ds-'+p.key]:heard[i]))}
function chime(i){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=392*Math.pow(2,i/18);g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.16,ac.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.9);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+1)}catch(e){}}
/* step positions measured on the painting (fractions of its height and width) */
function drawPadi(){const d=prDone(),yb=68.1,yt=42.8,hb=18.1,ht=9;
 padi.innerHTML=PADI.map((p,i)=>{const f=i/18,f2=(i+1)/18,y1=yb+(yt-yb)*f,y2=yb+(yt-yb)*f2,w=(hb+(ht-hb)*f)*2;const cls=[d[i]?'done':'',p.yt||p.href?'has':'soon',i===sel?'sel':''].join(' ');
  return `<button class="${cls}" role="listitem" data-i="${i}" style="top:${y2}%;height:${y1-y2}%;width:${w}%;margin-left:-.7%" aria-label="Step ${i+1}: ${p.song}"><span>${i+1}</span></button>`}).join('');
 const n=d.filter(Boolean).length;prog.style.width=(n/18*100)+'%';document.getElementById('progT').textContent=n+' of 18 steps lit';
 if(sel<0)leave.innerHTML='<b>Step 1 is waiting</b><span class="muted">Tap the bottom step on the picture to see its song and its game.</span>'}
function pick(i){sel=i;chime(i);const p=PADI[i],d=prDone();
 leave.innerHTML=`<b>Step ${i+1}${d[i]?' ✓':''}</b><span class="muted">Song: <b style="color:var(--ink)">${p.song}</b> (${p.lang})${p.yt?'':' · coming soon'}<br>Game: <b style="color:var(--ink)">${p.game}</b>${p.href?'':' · coming soon'}</span>`;
 document.getElementById('stepBtns').innerHTML=(p.yt?`<a class="btn ghost" href="https://youtu.be/${p.yt}" target="_blank" rel="noopener" id="lis">▶ Listen</a>`:'')+(p.href?`<a class="btn" href="${p.href}">🎮 Play ${p.game}</a>`:'');
 const l=document.getElementById('lis');if(l&&!p.key)l.onclick=()=>{try{const h=JSON.parse(localStorage.getItem('ayy-heard')||'{}');h[i]=1;localStorage.setItem('ayy-heard',JSON.stringify(h))}catch(e){}setTimeout(drawPadi,300)};
 drawPadi()}
padi.addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(+b.dataset.i)});
drawPadi();{const d=prDone(),k=d.findIndex(x=>!x);if(k>=0&&d.some(Boolean))pick(k)}
'''
s = s[:a] + js + s[b:]
s = s.replace("document.getElementById('stepSong').onclick=e=>{e.preventDefault();const b=grid.querySelectorAll('.song')[2].querySelector('.watch');if(b)b.click();grid.scrollIntoView({behavior:'smooth'})};\n", "")
s = s.replace("Watch one of our songs once to unlock a game, then play it as often as you like.",
              "Press play and our Ayyappa song plays in a small window while you play. Every game starts with a short how-to-play.")
s = s.replace('<a class="btn ghost" href="#games">🎮 Play the games</a>',
              '<a class="btn ghost" href="#games">🎮 Play the games</a><a class="btn ghost" href="#steps">🪜 18 steps · 18 songs</a>')
open(p, 'w', encoding='utf-8').write(s)
print('ok')
