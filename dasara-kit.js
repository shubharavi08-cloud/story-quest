/* World of Wonders · Dasara games kit (shared by every Dasara game page).
   - Art: Maa's pictures come from the World of Wonders Navratri videos (YouTube thumbnails, best size first).
   - Music: loops audio/dasara/<key>.mp3 (a soft loop cut from our own Navratri bhajan by _tools/bgm/make_bgm.py) when that file exists,
     otherwise a gentle tanpura + flute bed made in the browser. Mute button is remembered.
   - Story: a story popup at the start, story moments during play, and an end card.
   - Language: EN / हिं / ಕ, same storage key as the other World of Wonders games (sq_lang). */
(function(){
var DK={};
var LANGS=['en','hi','kn'];
var lang='en';
try{lang=localStorage.getItem('sq_lang')||'en'}catch(e){}
(function(){var q=new URLSearchParams(location.search).get('lang');if(LANGS.indexOf(q)>=0){lang=q;try{localStorage.setItem('sq_lang',q)}catch(e){}}})();
if(LANGS.indexOf(lang)<0)lang='en';
DK.lang=function(){return lang};
DK.t=function(o){if(o==null)return '';if(typeof o==='string')return o;return o[lang]!=null?o[lang]:o.en};
var langCbs=[];
DK.onLang=function(cb){langCbs.push(cb)};
DK.setLang=function(l){if(LANGS.indexOf(l)<0)return;lang=l;try{localStorage.setItem('sq_lang',l)}catch(e){}document.documentElement.lang=l;
  document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===l)});langCbs.forEach(function(cb){try{cb(l)}catch(e){console.error(e)}})};

/* ---------- art: clean, word-free paintings taken from our own Navratri videos (img/dasara/, made by
   _tools/art/extract_paintings.py). Keyed by the day's YouTube id; any other id falls back to its thumbnail. ---------- */
DK.LOCAL={'IlBi-hGGF9E':'img/dasara/navadurga.jpg','T96jKddkIhw':'img/dasara/d1.jpg','w82yu_nCdC8':'img/dasara/d2.jpg','lgTVdgoBnQ0':'img/dasara/d3.jpg',
  'H2eKJBSJWgs':'img/dasara/d4.jpg','24KpyntW_PI':'img/dasara/d5.jpg','JFBAewcgXAw':'img/dasara/d6.jpg','O5hzHeRdcuk':'img/dasara/d7.jpg',
  'ENnj9owzuTo':'img/dasara/d8.jpg','RvEnFEjnCCg':'img/dasara/d9.jpg'};
var artCache={};
DK.art=function(id){
  if(artCache[id])return artCache[id];
  artCache[id]=new Promise(function(res){
    var local=DK.LOCAL[id];
    if(local){var li=new Image();li.onload=function(){res({img:li,crop:{sx:0,sy:0,sw:li.naturalWidth,sh:li.naturalHeight},src:li.src,id:id})};li.onerror=function(){res(null)};li.src=local;return}
    var sizes=['maxresdefault','sddefault','hqdefault'];
    (function tryAt(i){
      if(i>=sizes.length){res(null);return}
      var im=new Image();
      im.onload=function(){
        if(im.naturalWidth<200){tryAt(i+1);return}
        var w=im.naturalWidth,h=im.naturalHeight,crop={sx:0,sy:0,sw:w,sh:h};
        if(Math.abs(w/h-4/3)<.05){var ch=w*9/16;crop={sx:0,sy:(h-ch)/2,sw:w,sh:ch}} /* 4:3 thumbnail sizes carry black bars */
        res({img:im,crop:crop,src:im.src,id:id});
      };
      im.onerror=function(){tryAt(i+1)};
      im.src='https://i.ytimg.com/vi/'+id+'/'+sizes[i]+'.jpg';
    })(0);
  });
  return artCache[id];
};
/* where Maa sits in each thumbnail (fraction across, down): used when a picture is cropped to a circle or a tall box */
DK.FOCUS={'IlBi-hGGF9E':[.5,.5,1]};
DK.FOCUS_DEFAULT=[.5,.36,.74]; /* Maa sits in the middle of every painting, face in the upper third */
DK.focusCSS=function(id){var f=DK.FOCUS[id]||DK.FOCUS_DEFAULT;return Math.round(f[0]*100)+'% '+Math.round(f[1]*100)+'%'};
/* CSS for a round portrait of Maa from a 16:9 thumbnail: zoomed onto her (use on a square element) */
DK.portraitCSS=function(id,src){var f=DK.FOCUS[id]||DK.FOCUS_DEFAULT,z=f[2]||1,ar=.75,bw=1/(ar*z)*100,bh=100/z;
  var px=Math.max(0,Math.min(1,(f[0]-ar*z/2)/(1-ar*z))),py=Math.max(0,Math.min(1,(f[1]-z/2)/(1-z||1)));
  return {backgroundImage:'url("'+src+'")',backgroundSize:bw.toFixed(1)+'% '+bh.toFixed(1)+'%',backgroundPosition:(px*100).toFixed(1)+'% '+(py*100).toFixed(1)+'%'}};
/* draw a round/square portrait of Maa zoomed onto her */
DK.portrait=function(cx,a,x,y,w,h){if(!a)return;var c=a.crop,f=DK.FOCUS[a.id]||DK.FOCUS_DEFAULT,z=f[2]||1,sh=c.sh*z,sw=sh*w/h;
  var sx=c.sx+Math.max(0,Math.min(c.sw-sw,f[0]*c.sw-sw/2)),sy=c.sy+Math.max(0,Math.min(c.sh-sh,f[1]*c.sh-sh/2));cx.drawImage(a.img,sx,sy,sw,sh,x,y,w,h)};
/* draw a picture "cover"-fitted into a box (crop = 16:9 region of the source) */
DK.cover=function(cx,a,x,y,w,h,fx,fy){
  if(!a)return;var c=a.crop,s=Math.max(w/c.sw,h/c.sh),sw=w/s,sh=h/s;
  var F=DK.FOCUS[a.id]||DK.FOCUS_DEFAULT;if(fx==null)fx=F[0];if(fy==null)fy=F[1];var sx=c.sx+(c.sw-sw)*fx,sy=c.sy+(c.sh-sh)*fy;
  cx.drawImage(a.img,sx,sy,sw,sh,x,y,w,h);
};

/* ---------- sound ---------- */
var AC=null,master=null,sfxBus=null,musicBus=null,soundOn=true;
try{soundOn=localStorage.getItem('dk-sound')!=='0'}catch(e){}
function ac(){
  if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=soundOn?1:0;master.connect(AC.destination);
    sfxBus=AC.createGain();sfxBus.gain.value=.9;sfxBus.connect(master);musicBus=AC.createGain();musicBus.gain.value=.55;musicBus.connect(master)}catch(e){AC=null}}
  if(AC&&AC.state==='suspended')AC.resume();return AC;
}
DK.ac=ac;
DK.sound=function(){return soundOn};
DK.setSound=function(on){soundOn=!!on;try{localStorage.setItem('dk-sound',on?'1':'0')}catch(e){}
  if(master)master.gain.setTargetAtTime(on?1:0,AC.currentTime,.05);
  var b=document.getElementById('sound');if(b){b.setAttribute('aria-pressed',on);b.textContent=on?'🔊':'🔇'}};
DK.tone=function(f,d,type,v,slide,when){if(!soundOn||!ac())return;var n=AC.currentTime+(when||0),o=AC.createOscillator(),g=AC.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(f,n);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),n+(d||.2));
  g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(v==null?.15:v,n+.01);g.gain.exponentialRampToValueAtTime(.0001,n+(d||.2));o.connect(g);g.connect(sfxBus);o.start(n);o.stop(n+(d||.2)+.05)};
DK.noise=function(d,v,f,when){if(!soundOn||!ac())return;var n=AC.currentTime+(when||0),b=AC.createBuffer(1,Math.max(1,AC.sampleRate*d|0),AC.sampleRate),x=b.getChannelData(0);
  for(var i=0;i<x.length;i++)x[i]=(Math.random()*2-1)*Math.pow(1-i/x.length,2);
  var s=AC.createBufferSource(),bp=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;bp.type='bandpass';bp.frequency.value=f||900;g.gain.value=v==null?.2:v;s.connect(bp);bp.connect(g);g.connect(sfxBus);s.start(n)};
/* a temple bell: inharmonic partials with a long ring */
DK.bell=function(f,v,len){if(!soundOn||!ac())return;f=f||520;v=v==null?.18:v;len=len||2.4;var n=AC.currentTime;
  [[1,1],[2.01,.5],[2.76,.35],[5.4,.18],[8.93,.08]].forEach(function(p){var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f*p[0];
    g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(v*p[1],n+.005);g.gain.exponentialRampToValueAtTime(.0001,n+len/(p[0]*.35+.65));o.connect(g);g.connect(sfxBus);o.start(n);o.stop(n+len+.1)});
  DK.noise(.06,v*.6,3200)};
DK.chime=function(k){var sc=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.5];DK.tone(sc[(k||0)%sc.length],.5,'triangle',.08)};
DK.win=function(){[392,523.25,659.25,783.99,1046.5,1318.5].forEach(function(f,i){DK.tone(f,.5,'triangle',.12,0,i*.12)});setTimeout(function(){DK.bell(784,.12,3)},800)};
DK.oops=function(){DK.tone(240,.25,'sine',.08,.7)};
DK.vib=function(ms){try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};

/* ---------- music: our bhajan loop if present, else tanpura + bansuri bed ---------- */
var mp3=null,bedOn=false,bedTimer=null,musicKey=null,musicOpt={};
function startBed(){
  if(bedOn||!ac())return;bedOn=true;
  var sa=musicOpt.sa||146.83,scale=musicOpt.scale||[0,2,4,7,9,12,14,16],bpm=musicOpt.tempo||1;
  var drone=[];[[sa/2,.05],[sa,.035],[sa*1.5,.022]].forEach(function(p){var o=AC.createOscillator(),g=AC.createGain(),lp=AC.createBiquadFilter();
    o.type='sawtooth';o.frequency.value=p[0];lp.type='lowpass';lp.frequency.value=700;g.gain.value=p[1]*.35;o.connect(lp);lp.connect(g);g.connect(musicBus);o.start();drone.push(o)});
  startBed.drone=drone;
  var pat=[1.5,2,2,1],step=0,phraseIn=3;
  function pluck(f,when){var n=AC.currentTime+when,o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),lp=AC.createBiquadFilter();
    o.type='sawtooth';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*1.003;lp.type='lowpass';lp.frequency.setValueAtTime(2600,n);lp.frequency.exponentialRampToValueAtTime(500,n+2.5);
    g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(.05,n+.02);g.gain.exponentialRampToValueAtTime(.0001,n+3.2);o.connect(lp);o2.connect(lp);lp.connect(g);g.connect(musicBus);o.start(n);o2.start(n);o.stop(n+3.3);o2.stop(n+3.3)}
  function flute(f,when,d){var n=AC.currentTime+when,o=AC.createOscillator(),g=AC.createGain(),vib=AC.createOscillator(),vg=AC.createGain();
    o.type='sine';o.frequency.value=f;vib.frequency.value=5.2;vg.gain.value=f*.006;vib.connect(vg);vg.connect(o.frequency);
    g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(.045,n+.12);g.gain.setValueAtTime(.045,n+d*.7);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(musicBus);
    o.start(n);vib.start(n);o.stop(n+d+.05);vib.stop(n+d+.05);DK.noise&&0}
  function tick(){
    if(!bedOn)return;var dur=.9/bpm;
    pluck(sa*pat[step%4]/(step%4===3?2:1),0);step++;
    if(--phraseIn<=0){phraseIn=6+((Math.random()*5)|0);var t0=.1,last=(Math.random()*4)|0;
      for(var k=0;k<4+((Math.random()*3)|0);k++){last=Math.max(0,Math.min(scale.length-1,last+((Math.random()*3)|0)-1));var d=(k%3===2?1.1:.55)/bpm;flute(sa*2*Math.pow(2,scale[last]/12),t0,d+.2);t0+=d}}
    bedTimer=setTimeout(tick,dur*1000);
  }
  tick();
}
function stopBed(){bedOn=false;clearTimeout(bedTimer);(startBed.drone||[]).forEach(function(o){try{o.stop()}catch(e){}});startBed.drone=null}
DK.music=function(key,opt){musicKey=key;musicOpt=opt||{}};
DK.startMusic=function(){
  if(!ac())return;if(mp3||bedOn||DK._loading)return;
  if(!musicKey){startBed();return}
  DK._loading=true;var gaveUp=false,t=setTimeout(function(){gaveUp=true;DK._loading=false;if(!mp3)startBed()},6000);
  /* our own bhajan loop: decoded and looped sample-exactly (an <audio loop> leaves a gap on MP3) */
  fetch('audio/dasara/'+musicKey+'.mp3').then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()})
   .then(function(buf){return new Promise(function(res,rej){AC.decodeAudioData(buf,res,rej)})})
   .then(function(ab){clearTimeout(t);DK._loading=false;if(gaveUp&&bedOn)stopBed();if(mp3)return;
     var s=AC.createBufferSource(),g=AC.createGain();s.buffer=ab;s.loop=true;s.loopStart=.05;s.loopEnd=Math.max(1,ab.duration-.05);
     g.gain.setValueAtTime(0,AC.currentTime);g.gain.linearRampToValueAtTime(1.1,AC.currentTime+2);s.connect(g);g.connect(musicBus);s.start(0,.05);mp3={src:s,g:g}})
   .catch(function(){clearTimeout(t);DK._loading=false;if(!gaveUp)startBed()});
};
DK.musicState=function(){return mp3?'song':bedOn?'bed':'none'};
DK.duck=function(on){if(musicBus&&AC)musicBus.gain.setTargetAtTime(on?.2:.55,AC.currentTime,.2)};
document.addEventListener('visibilitychange',function(){if(!AC)return;if(document.hidden){if(AC.state==='running')AC.suspend()}else AC.resume()});

/* ---------- overlay cards ---------- */
var css=document.createElement('style');
css.textContent=
'.dk-ov{position:fixed;inset:0;background:#0d0826d9;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);display:grid;place-items:center;z-index:60;padding:14px}'+
'.dk-card{width:min(520px,100%);background:#f7e7c4;color:#3a1d0c;border-radius:22px;padding:18px;box-shadow:0 30px 80px #000a;border:5px solid #f6a723;animation:dkpop .35s cubic-bezier(.2,1.6,.4,1);max-height:94vh;overflow:auto}'+
'.dk-card .hero{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#2a1f5c center/cover no-repeat;margin-bottom:10px;box-shadow:inset 0 0 0 2px #e8d2a6}'+
'.dk-card .hero span{position:absolute;left:10px;bottom:8px;background:#1c1442d9;color:#ffd35a;font:800 13px Mukta,system-ui,sans-serif;padding:3px 10px;border-radius:999px;letter-spacing:.06em;text-transform:uppercase}'+
'.dk-card h3{font:800 27px/1.08 "Baloo 2","Baloo Tamma 2",system-ui,sans-serif;margin:4px 0 8px}'+
'.dk-card p{margin:0 0 10px;font-size:16.5px;line-height:1.5}'+
'.dk-card .how{display:grid;gap:7px;margin:8px 0 12px}.dk-card .how div{display:flex;gap:10px;align-items:center;background:#fffaf0;border:2px solid #e8d2a6;border-radius:14px;padding:7px 12px;font-weight:600}'+
'.dk-card .how b{font-size:24px;line-height:1;min-width:32px;text-align:center}'+
'.dk-card .opts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 10px}.dk-card .opt{border:3px solid #e8d2a6;background:#fffaf0;border-radius:14px;padding:9px;cursor:pointer;font:700 15px Mukta,system-ui,sans-serif;color:#3a1d0c}'+
'.dk-card .opt[aria-pressed="true"]{border-color:#b8643a;background:#ffe6b8}'+
'.dk-go{font:800 20px "Baloo 2","Baloo Tamma 2",system-ui,sans-serif;background:#3a1d0c;color:#f7e7c4;border:0;border-radius:14px;padding:12px 18px;cursor:pointer;width:100%;text-align:center;text-decoration:none;display:block;margin-top:8px}'+
'.dk-go.alt{background:#b8643a}.dk-go.ghost{background:transparent;color:#3a1d0c;border:2px solid #b8643a}'+
'.dk-stars{font-size:34px;letter-spacing:4px;text-align:center;margin:2px 0 6px}'+
'.dk-small{font-size:13px;color:#7a5a3a}'+
'.dk-beat{position:fixed;left:50%;top:max(14px,env(safe-area-inset-top,0px));transform:translate(-50%,-140%);z-index:55;width:min(560px,calc(100% - 24px));display:flex;gap:10px;align-items:center;background:#1c1442f2;color:#fdf3dc;border:2px solid #f6a723;border-radius:18px;padding:9px 14px 9px 9px;box-shadow:0 18px 40px -12px #000;transition:transform .45s cubic-bezier(.2,1.3,.4,1);font:600 15.5px/1.35 Mukta,"Noto Sans Kannada",system-ui,sans-serif;pointer-events:none}'+
'.dk-beat.on{transform:translate(-50%,0)}.dk-beat i{flex:0 0 52px;height:52px;border-radius:50%;background:#2a1f5c center/cover;box-shadow:0 0 0 2px #ffd35a}.dk-beat b{color:#ffd35a;display:block;font:800 12px Mukta,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase}'+
'@keyframes dkpop{from{transform:scale(.7);opacity:0}to{transform:none;opacity:1}}'+
'@media (prefers-reduced-motion:reduce){.dk-card{animation:none}.dk-beat{transition:none}}';
document.head.appendChild(css);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
DK.esc=esc;
var ovEl=null;
function ov(){if(!ovEl){ovEl=document.getElementById('overlay');if(!ovEl){ovEl=document.createElement('div');ovEl.id='overlay';document.body.appendChild(ovEl)}}return ovEl}
DK.close=function(){ov().innerHTML='';DK.duck(false)};
DK.isOpen=function(){return !!ov().firstChild};
function heroHTML(art,label){return '<div class="hero" data-art="'+(art||'')+'">'+(label?'<span>'+esc(label)+'</span>':'')+'</div>'}
function paintHeroes(){ov().querySelectorAll('.hero[data-art]').forEach(function(h){var id=h.dataset.art;if(!id)return;
  if(/\.(jpe?g|png|webp)$/.test(id)){h.style.backgroundImage='url("'+id+'")';return}
  DK.art(id).then(function(a){if(a){h.style.backgroundImage='url("'+a.src+'")';h.style.backgroundPosition='50% 28%'}})})}
/* card({art, label, title, paras:[], how:[[icon,text]], opts:{name, items:[[value,label]], value}, buttons:[{label, cls, href, on}]}) */
DK.card=function(c){
  var h='<div class="dk-ov" role="dialog" aria-modal="true"><div class="dk-card">'+heroHTML(c.art,c.label)+(c.stars!=null?'<div class="dk-stars">'+'⭐'.repeat(c.stars)+'☆'.repeat(3-c.stars)+'</div>':'')+
    '<h3>'+esc(c.title)+'</h3>'+(c.paras||[]).map(function(p){return '<p>'+p+'</p>'}).join('')+
    (c.how?'<div class="how">'+c.how.map(function(x){return '<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')+'</div>':'')+
    (c.opts?'<div class="opts">'+c.opts.items.map(function(o){return '<button type="button" class="opt" data-v="'+o[0]+'" aria-pressed="'+(o[0]===c.opts.value)+'">'+o[1]+'</button>'}).join('')+'</div>':'')+
    (c.buttons||[]).map(function(b,i){return b.href?'<a class="dk-go '+(b.cls||'')+'" href="'+b.href+'">'+esc(b.label)+'</a>':'<button type="button" class="dk-go '+(b.cls||'')+'" data-b="'+i+'">'+esc(b.label)+'</button>'}).join('')+
    (c.foot?'<p class="dk-small" style="margin-top:10px">'+c.foot+'</p>':'')+'</div></div>';
  ov().innerHTML=h;paintHeroes();DK.duck(true);
  var val=c.opts&&c.opts.value;
  ov().querySelectorAll('.opt').forEach(function(b){b.onclick=function(){val=b.dataset.v;ov().querySelectorAll('.opt').forEach(function(x){x.setAttribute('aria-pressed',x===b)});DK.tone(700,.08,'triangle',.05);c.opts.on&&c.opts.on(val)}});
  ov().querySelectorAll('button[data-b]').forEach(function(b){b.onclick=function(){ac();DK.startMusic();var x=c.buttons[+b.dataset.b];if(x.keep!==true)DK.close();x.on&&x.on(val)}});
  var first=ov().querySelector('.dk-go');if(first)setTimeout(function(){try{first.focus({preventScroll:true})}catch(e){}},60);
};
/* story moment toast during play */
var beatEl=null,beatT=null;
DK.beat=function(text,art,label){
  if(!beatEl){beatEl=document.createElement('div');beatEl.className='dk-beat';beatEl.setAttribute('role','status');beatEl.setAttribute('aria-live','polite');document.body.appendChild(beatEl)}
  beatEl.innerHTML='<i></i><span><b>'+esc(label||DK.t({en:'Story',hi:'कहानी',kn:'ಕಥೆ'}))+'</b>'+text+'</span>';
  if(art)DK.art(art).then(function(a){if(a)Object.assign(beatEl.querySelector('i').style,DK.portraitCSS(art,a.src))});
  beatEl.classList.remove('on');void beatEl.offsetWidth;beatEl.classList.add('on');DK.chime(4);
  clearTimeout(beatT);beatT=setTimeout(function(){beatEl.classList.remove('on')},Math.max(4200,text.length*55));
};
/* progress shared with the home page (storyquest) */
DK.done=function(key,stars){try{var pr=JSON.parse(localStorage.getItem('storyquest')||'{}');pr['ds-'+key]=Math.max(pr['ds-'+key]||0,stars||1);localStorage.setItem('storyquest',JSON.stringify(pr))}catch(e){}
  if(window.WOWHit)try{WOWHit('game-done-ds-'+key)}catch(e){}};

/* ---------- page chrome: language pills + sound button ---------- */
DK.ui={
  back:{en:'← Dasara',hi:'← दशहरा',kn:'← ದಸರಾ'},
  again:{en:'Play again',hi:'फिर से खेलें',kn:'ಮತ್ತೆ ಆಡಿ'},
  story:{en:'Watch the story again',hi:'कहानी फिर देखें',kn:'ಕಥೆಯನ್ನು ಮತ್ತೆ ನೋಡಿ'},
  allGames:{en:'All Dasara games',hi:'दशहरा के सभी खेल',kn:'ದಸರಾದ ಎಲ್ಲ ಆಟಗಳು'},
  start:{en:'Begin',hi:'शुरू करें',kn:'ಶುರು ಮಾಡಿ'},
  howT:{en:'How to play',hi:'कैसे खेलें',kn:'ಆಡುವುದು ಹೇಗೆ'}
};
DK.next=function(n){return n?{href:n.href,label:DK.t(n.label)}:null};
function wire(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===lang);b.onclick=function(){DK.setLang(b.dataset.lang)}});
  var s=document.getElementById('sound');if(s){s.setAttribute('aria-pressed',soundOn);s.textContent=soundOn?'🔊':'🔇';s.onclick=function(){ac();DK.setSound(!soundOn);if(soundOn)DK.startMusic()}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
/* the YouTube watch gate covers the page first: start nothing until it is gone */
DK.whenUngated=function(cb){function go(){(function chk(){if(document.getElementById('wowGate'))setTimeout(chk,400);else cb()})()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(go,0)});else setTimeout(go,0)};
window.DK=DK;
})();
