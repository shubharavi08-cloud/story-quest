/* World of Wonders · Ayyappa season games kit (on top of dasara-kit.js).
   - Languages: EN / ಕನ್ನಡ / தமிழ் / తెలుగు (same sq_lang key as every WoW game).
   - AY.pilgrim(): our Ayyappa swami (black dhoti, mala, Irumudi on the head), drawn on canvas, no borrowed art.
   - AY.end(): the end card (stars, next game, songs, subscribe, share).
   - AY.GAMES: the season's games in play order, used for "Next game" and the Ayyappa page. */
(function(){
var AY={};
DK.LOCAL['ayy-hero']='img/ayyappa_hero.jpg';DK.LOCAL['ayy-steps']='img/ayyappa_steps.jpg';DK.LOCAL['ayy-lamps']='img/ayyappa_lamps.jpg';DK.FOCUS['ayy-hero']=[.5,.35,1.6];DK.FOCUS['ayy-steps']=[.5,.4,1.2];DK.FOCUS['ayy-lamps']=[.5,.5,1.2];
AY.GAMES=[
 {key:'sabari-yatra',href:'sabari-yatra.html',name:{en:'Sabarimala Yatra',kn:'ಶಬರಿಮಲೆ ಯಾತ್ರೆ',ta:'சபரிமலை யாத்திரை',te:'శబరిమల యాత్ర'}},
 {key:'irumudi',href:'irumudi.html',name:{en:'Pack the Irumudi',kn:'ಇರುಮುಡಿ ಕಟ್ಟು',ta:'இருமுடி கட்டு',te:'ఇరుముడి కట్టు'}},
 {key:'sharanam-steps',href:'sharanam-steps.html',name:{en:'Sharanam Steps',kn:'ಶರಣಂ ಮೆಟ್ಟಿಲು',ta:'சரணம் படிகள்',te:'శరణం మెట్లు'}},
 {key:'mandala-deepam',href:'mandala-deepam.html',name:{en:'Mandala Deepam',kn:'ಮಂಡಲ ದೀಪ',ta:'மண்டல தீபம்',te:'మండల దీపం'}}
];
AY.ui={
 back:{en:'← Ayyappa',kn:'← ಅಯ್ಯಪ್ಪ',ta:'← ஐயப்பன்',te:'← అయ్యప్ప'},
 again:{en:'Play again',kn:'ಮತ್ತೆ ಆಡಿ',ta:'மீண்டும் விளையாடு',te:'మళ్ళీ ఆడండి'},
 next:{en:'Next game: ',kn:'ಮುಂದಿನ ಆಟ: ',ta:'அடுத்த விளையாட்டு: ',te:'తర్వాతి ఆట: '},
 songs:{en:'Listen to the Ayyappa songs',kn:'ಅಯ್ಯಪ್ಪ ಹಾಡುಗಳನ್ನು ಕೇಳಿ',ta:'ஐயப்பன் பாடல்களைக் கேளுங்கள்',te:'అయ్యప్ప పాటలు వినండి'},
 sub:{en:'▶ Subscribe for new songs',kn:'▶ ಹೊಸ ಹಾಡುಗಳಿಗೆ ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿ',ta:'▶ புதிய பாடல்களுக்கு சப்ஸ்கிரைப் செய்யுங்கள்',te:'▶ కొత్త పాటల కోసం సబ్‌స్క్రైబ్ చేయండి'},
 share:{en:'↗ Send to a fellow Swami',kn:'↗ ಮತ್ತೊಬ್ಬ ಸ್ವಾಮಿಗೆ ಕಳುಹಿಸಿ',ta:'↗ இன்னொரு சாமிக்கு அனுப்புங்கள்',te:'↗ మరో స్వామికి పంపండి'},
 copied:{en:'Link copied',kn:'ಲಿಂಕ್ ನಕಲಾಯಿತು',ta:'இணைப்பு நகலெடுக்கப்பட்டது',te:'లింక్ కాపీ అయింది'},
 sharanam:{en:'Swamiye Sharanam Ayyappa',kn:'ಸ್ವಾಮಿಯೇ ಶರಣಂ ಅಯ್ಯಪ್ಪ',ta:'சுவாமியே சரணம் ஐயப்பா',te:'స్వామియే శరణం అయ్యప్ప'},
 story:{en:'Story',kn:'ಕಥೆ',ta:'கதை',te:'కథ'},
 howT:{en:'How to play',kn:'ಆಡುವುದು ಹೇಗೆ',ta:'எப்படி விளையாடுவது',te:'ఎలా ఆడాలి'},
 padi:{en:'🪜 Your next step: the 18 steps, 18 songs',kn:'🪜 ಮುಂದಿನ ಮೆಟ್ಟಿಲು: 18 ಮೆಟ್ಟಿಲು, 18 ಹಾಡು',ta:'🪜 அடுத்த படி: 18 படிகள், 18 பாடல்கள்',te:'🪜 తర్వాతి మెట్టు: 18 మెట్లు, 18 పాటలు'},
 nowPlaying:{en:'Our Ayyappa song',kn:'ನಮ್ಮ ಅಯ್ಯಪ್ಪ ಹಾಡು',ta:'நம் ஐயப்பன் பாடல்',te:'మా అయ్యప్ప పాట'},
 songNote:{en:'Our Ayyappa song plays in a small window while you play. Close it any time.',kn:'ನೀವು ಆಡುವಾಗ ನಮ್ಮ ಅಯ್ಯಪ್ಪ ಹಾಡು ಪುಟ್ಟ ಕಿಟಕಿಯಲ್ಲಿ ಬರುತ್ತದೆ. ಯಾವಾಗ ಬೇಕಾದರೂ ಮುಚ್ಚಬಹುದು.',ta:'நீங்கள் விளையாடும்போது நம் ஐயப்பன் பாடல் சிறிய சாளரத்தில் ஒலிக்கும். எப்போது வேண்டுமானாலும் மூடலாம்.',te:'మీరు ఆడుతున్నప్పుడు మా అయ్యప్ప పాట చిన్న కిటికీలో వస్తుంది. ఎప్పుడైనా మూసేయవచ్చు.'}
};
AY.t=function(o){return DK.t(o)};
/* language pills: EN ಕ த తె (Hindi pages of other games keep their own pills) */
AY.pills=function(el){el.innerHTML=[['en','EN'],['kn','ಕ'],['ta','த'],['te','తె']].map(function(p){return '<button class="pill" data-lang="'+p[0]+'" aria-pressed="false">'+p[1]+'</button>'}).join('');
 el.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===DK.lang());b.onclick=function(){DK.setLang(b.dataset.lang)}});
 if(['en','kn','ta','te'].indexOf(DK.lang())<0)DK.setLang('en')};

/* ---------- our swami: drawn standing at (x,y)=feet centre, height h. o:{t:walk time, step:0..1 bob, face:'up'|'side', glow} ---------- */
AY.pilgrim=function(cx,x,y,h,o){
 /* v2: a painted swami seen from behind as he walks or climbs towards Swami. o.t walk clock, o.still, o.glow, o.climb (0..1 lift of the step), o.alpha, o.irumudi colour */
 o=o||{};var t=o.t||0,sw=o.still?0:Math.sin(t*9),s=h/100,cl=o.climb||0;
 cx.save();cx.translate(x,y);cx.scale(s,s);if(o.alpha!=null)cx.globalAlpha=o.alpha;
 var sk1='#a8704a',sk2='#6f4127',lift=Math.sin(cl*Math.PI);
 /* soft contact shadow */
 var sg=cx.createRadialGradient(0,0,2,0,0,24);sg.addColorStop(0,'rgba(0,0,0,.42)');sg.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=sg;cx.beginPath();cx.ellipse(0,0,24,6,0,0,6.283);cx.fill();
 var bob=Math.abs(sw)*1.6+lift*3;cx.translate(0,-bob);
 if(o.glow){var g=cx.createRadialGradient(0,-60,6,0,-60,80);g.addColorStop(0,'rgba(255,222,130,.6)');g.addColorStop(1,'rgba(255,214,110,0)');cx.fillStyle=g;cx.beginPath();cx.arc(0,-60,80,0,6.283);cx.fill()}
 function skin(x0,y0,x1,y1){var gr=cx.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,sk2);gr.addColorStop(.45,sk1);gr.addColorStop(1,sk2);return gr}
 /* legs: calf + foot; one leg lifts for a climb or swings for a walk */
 function leg(side,ph){var lx=side*5.5,up=Math.max(0,ph)*7,fw=ph*3;cx.save();cx.translate(lx,0);
  cx.fillStyle=skin(-4,0,4,0);cx.beginPath();cx.moveTo(-3.6,-30);cx.quadraticCurveTo(-5.4,-18-up,-2.6,-4-up);cx.lineTo(2.6,-4-up);cx.quadraticCurveTo(5,-18-up,3.6,-30);cx.closePath();cx.fill();
  cx.fillStyle=sk2;cx.beginPath();cx.ellipse(fw*.3,-2.4-up,4.4,2.6,0,0,6.283);cx.fill();cx.restore()}
 var p1=o.still?lift:sw,p2=o.still?0:-sw;leg(-1,p1);leg(1,p2);
 /* black mundu with folds and a gold kasavu border */
 cx.save();cx.rotate(sw*.015);var md=cx.createLinearGradient(-16,0,16,0);md.addColorStop(0,'#0c0b10');md.addColorStop(.35,'#2a2732');md.addColorStop(.6,'#1a1820');md.addColorStop(1,'#08070b');
 cx.fillStyle=md;cx.beginPath();cx.moveTo(-14,-58);cx.lineTo(14,-58);cx.quadraticCurveTo(17,-40,16+sw*1.5,-24);cx.quadraticCurveTo(0,-20.5,-16+sw*1.5,-24);cx.quadraticCurveTo(-17,-40,-14,-58);cx.fill();
 cx.strokeStyle='rgba(255,255,255,.07)';cx.lineWidth=1.2;for(var i=-2;i<=2;i++){cx.beginPath();cx.moveTo(i*4.5,-56);cx.quadraticCurveTo(i*5.2+sw,-40,i*5.6+sw*1.5,-24);cx.stroke()}
 var gb=cx.createLinearGradient(0,-28,0,-23);gb.addColorStop(0,'#ffe08a');gb.addColorStop(1,'#b8861a');cx.strokeStyle=gb;cx.lineWidth=2.6;cx.beginPath();cx.moveTo(-15.6+sw*1.5,-26.2);cx.quadraticCurveTo(0,-22.7,15.6+sw*1.5,-26.2);cx.stroke();
 cx.fillStyle='#d9a53c';cx.fillRect(-14,-59,28,2.2);cx.restore();
 /* bare back */
 cx.fillStyle=skin(-15,0,15,0);cx.beginPath();cx.moveTo(-13,-57);cx.quadraticCurveTo(-16,-72,-15,-82);cx.quadraticCurveTo(0,-88,15,-82);cx.quadraticCurveTo(16,-72,13,-57);cx.closePath();cx.fill();
 cx.strokeStyle='rgba(60,30,15,.35)';cx.lineWidth=1.2;cx.beginPath();cx.moveTo(0,-82);cx.quadraticCurveTo(.6,-70,0,-58);cx.stroke();
 /* black angavastram over the left shoulder, across the back */
 cx.fillStyle='#15131b';cx.beginPath();cx.moveTo(-15,-84);cx.lineTo(-8,-86);cx.quadraticCurveTo(6,-70,14,-60);cx.lineTo(9,-57);cx.quadraticCurveTo(-2,-68,-15,-78);cx.closePath();cx.fill();
 cx.strokeStyle='#d9a53c';cx.lineWidth=1.2;cx.beginPath();cx.moveTo(-8,-86);cx.quadraticCurveTo(6,-70,14,-60);cx.stroke();
 /* arms: both up to steady the Irumudi, swinging a little */
 cx.lineCap='round';cx.lineJoin='round';cx.strokeStyle=sk1;cx.lineWidth=5.6;
 cx.beginPath();cx.moveTo(-13,-80);cx.quadraticCurveTo(-21,-92+sw,-15,-104);cx.stroke();
 cx.beginPath();cx.moveTo(13,-80);cx.quadraticCurveTo(21,-92-sw,15,-104);cx.stroke();
 cx.strokeStyle='rgba(255,220,160,.35)';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(-14,-82);cx.quadraticCurveTo(-21,-92+sw,-16,-102);cx.stroke();
 /* neck, head, hair (from behind), ears */
 cx.fillStyle=sk2;cx.fillRect(-3.4,-90,6.8,7);
 var hd=cx.createRadialGradient(-2,-99,1,0,-96,10);hd.addColorStop(0,'#2e231c');hd.addColorStop(1,'#0f0b08');cx.fillStyle=hd;cx.beginPath();cx.ellipse(0,-96.5,8.4,9.4,0,0,6.283);cx.fill();
 cx.fillStyle=sk2;cx.beginPath();cx.ellipse(-8.4,-96,1.8,3,0,0,6.283);cx.fill();cx.beginPath();cx.ellipse(8.4,-96,1.8,3,0,0,6.283);cx.fill();
 /* Irumudi on the head: two cloth lobes, gold border, knot */
 cx.save();cx.translate(0,-107);cx.rotate(sw*.04);var ir=o.irumudi||'#b3122a';
 function lobe(dx,c1,c2,r){var lg=cx.createRadialGradient(dx-4,-7,1,dx,-2,15);lg.addColorStop(0,c1);lg.addColorStop(1,c2);cx.fillStyle=lg;cx.beginPath();cx.ellipse(dx,-3,13.5,9.5,r,0,6.283);cx.fill()}
 lobe(-11,'#e8475a',ir,-.15);lobe(11,'#3a3644','#121016',.15);
 cx.strokeStyle='#f0c24a';cx.lineWidth=1.6;cx.beginPath();cx.ellipse(-11,-3,10,6.5,-.15,0.2,2.9);cx.stroke();cx.beginPath();cx.ellipse(11,-3,10,6.5,.15,0.2,2.9);cx.stroke();
 var kn=cx.createLinearGradient(-4,0,4,0);kn.addColorStop(0,'#7a5a20');kn.addColorStop(.5,'#e8c66a');kn.addColorStop(1,'#7a5a20');cx.fillStyle=kn;cx.beginPath();cx.ellipse(0,-3,4.6,8,0,0,6.283);cx.fill();
 cx.restore();cx.restore()};

/* a small oil lamp (deepam) at x,y, size r, flickering by t */
AY.deepam=function(cx,x,y,r,t,lit){
 cx.save();cx.translate(x,y);
 if(lit!==false){var f=1+Math.sin(t*23+x)*.08;var g=cx.createRadialGradient(0,-r*1.1,1,0,-r*1.1,r*2.6);g.addColorStop(0,'rgba(255,210,90,.65)');g.addColorStop(1,'rgba(255,170,40,0)');cx.fillStyle=g;cx.beginPath();cx.arc(0,-r*1.1,r*2.6,0,6.283);cx.fill();
  cx.fillStyle='#ffcf4a';cx.beginPath();cx.moveTo(0,-r*2.1*f);cx.quadraticCurveTo(r*.55,-r*1.1,0,-r*.55);cx.quadraticCurveTo(-r*.55,-r*1.1,0,-r*2.1*f);cx.fill();
  cx.fillStyle='#fff6c9';cx.beginPath();cx.ellipse(0,-r*.95,r*.18,r*.38,0,0,6.283);cx.fill()}
 var b=cx.createLinearGradient(0,-r*.6,0,r*.4);b.addColorStop(0,'#e3a03a');b.addColorStop(1,'#8a4f10');
 cx.fillStyle=b;cx.beginPath();cx.moveTo(-r,-r*.5);cx.quadraticCurveTo(0,r*.75,r,-r*.5);cx.quadraticCurveTo(r*.3,-r*.62,0,-r*.62);cx.quadraticCurveTo(-r*.3,-r*.62,-r,-r*.5);cx.fill();
 cx.restore();
};
/* a temple bell */
AY.bellIcon=function(cx,x,y,r,t){cx.save();cx.translate(x,y);cx.rotate(Math.sin(t*6)*.18);
 var g=cx.createLinearGradient(-r,0,r,0);g.addColorStop(0,'#b57a1c');g.addColorStop(.5,'#ffe08a');g.addColorStop(1,'#b57a1c');
 cx.fillStyle=g;cx.beginPath();cx.moveTo(-r*.25,-r);cx.lineTo(r*.25,-r);cx.quadraticCurveTo(r*.7,-r*.6,r*.75,r*.45);cx.lineTo(r*.95,r*.7);cx.lineTo(-r*.95,r*.7);cx.lineTo(-r*.75,r*.45);cx.quadraticCurveTo(-r*.7,-r*.6,-r*.25,-r);cx.fill();
 cx.fillStyle='#8a5612';cx.beginPath();cx.arc(0,r*.85,r*.2,0,6.283);cx.fill();cx.fillRect(-r*.08,-r*1.25,r*.16,r*.3);cx.restore()};

/* Sannidhanam at night: the temple on the hill, the 18 golden steps (first `steps` lit), lamps on both sides. Steps run y0=.9H to y1=.33H. */
AY.sanni=function(cx,W,H,t,steps){var G={steps:steps};function rnd(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
 /* our own night scene: Sannidhanam on the hill, the 18 golden steps, lamps on both sides */
 var sk=cx.createLinearGradient(0,0,0,H);sk.addColorStop(0,'#0b0a26');sk.addColorStop(.55,'#2a1748');sk.addColorStop(1,'#120a22');cx.fillStyle=sk;cx.fillRect(0,0,W,H);
 for(var i=0;i<60;i++){cx.fillStyle=`rgba(255,255,255,${.3+.5*rnd(i+1)*Math.abs(Math.sin(t+i))})`;cx.fillRect(rnd(i)*W,rnd(i+50)*H*.4,1.6,1.6)}
 cx.fillStyle='#120f22';cx.beginPath();cx.moveTo(0,H*.42);cx.quadraticCurveTo(W*.2,H*.26,W*.42,H*.33);cx.quadraticCurveTo(W*.7,H*.22,W,H*.36);cx.lineTo(W,H);cx.lineTo(0,H);cx.fill();
 /* temple glow */
 var tg=cx.createRadialGradient(W/2,H*.22,10,W/2,H*.22,230);tg.addColorStop(0,'rgba(255,200,90,.55)');tg.addColorStop(1,'rgba(255,200,90,0)');cx.fillStyle=tg;cx.fillRect(0,0,W,H*.6);
 /* sannidhanam: platform, walls, two-tier Kerala roof, golden kalasham */
 var tx=W/2,ty=H*.31;cx.fillStyle='#3a2416';cx.fillRect(tx-120,ty-6,240,16);
 cx.fillStyle='#e9c46a';cx.fillRect(tx-70,ty-70,140,64);cx.fillStyle='#ffdf8a';for(var i=0;i<5;i++){cx.fillRect(tx-62+i*30,ty-62,14,50)}
 cx.fillStyle='#ffd35a';cx.fillRect(tx-14,ty-46,28,40);cx.fillStyle='#fff3c4';cx.beginPath();cx.arc(tx,ty-30,8+Math.sin(t*5)*1,0,6.283);cx.fill();
 var roof=(y,w,h,c)=>{cx.fillStyle=c;cx.beginPath();cx.moveTo(tx-w,y);cx.lineTo(tx-w*.55,y-h);cx.lineTo(tx+w*.55,y-h);cx.lineTo(tx+w,y);cx.closePath();cx.fill()};
 roof(ty-66,105,34,'#b8742a');roof(ty-98,72,30,'#d08a2e');cx.fillStyle='#ffd35a';cx.beginPath();cx.moveTo(tx,ty-150);cx.lineTo(tx-9,ty-126);cx.lineTo(tx+9,ty-126);cx.fill();cx.fillRect(tx-2,ty-128,4,6);
 /* golden flagstaff (dhwajasthambham) */
 cx.fillStyle='#e6b94a';cx.fillRect(tx+120,ty-150,6,160);for(var k=0;k<8;k++)cx.fillRect(tx+117,ty-140+k*18,12,3);cx.beginPath();cx.moveTo(tx+123,ty-162);cx.lineTo(tx+115,ty-150);cx.lineTo(tx+131,ty-150);cx.fill();
 /* 18 steps */
 var y0=H*.9,y1=H*.33,n=18;
 for(var i=0;i<n;i++){var f=i/n,f2=(i+1)/n,ya=y0+(y1-y0)*f,yb=y0+(y1-y0)*f2,wa=170-f*95,wb=170-f2*95,lit=i<G.steps;
  cx.fillStyle=lit?'#f2b437':'#7a5a2a';cx.beginPath();cx.moveTo(W/2-wa,ya);cx.lineTo(W/2+wa,ya);cx.lineTo(W/2+wb,yb+ (ya-yb)*.45);cx.lineTo(W/2-wb,yb+(ya-yb)*.45);cx.fill();
  cx.fillStyle=lit?'#ffe08a':'#a07a3a';cx.beginPath();cx.moveTo(W/2-wb,yb+(ya-yb)*.45);cx.lineTo(W/2+wb,yb+(ya-yb)*.45);cx.lineTo(W/2+wb,yb);cx.lineTo(W/2-wb,yb);cx.fill();
  if(lit){cx.save();cx.shadowColor='#ffd35a';cx.shadowBlur=14;cx.fillStyle='rgba(255,230,140,.35)';cx.fillRect(W/2-wb,yb,wb*2,3);cx.restore()}
  if(i%3===0){AY.deepam(cx,W/2-wa-14,ya-2,7-f*3,t+i,true);AY.deepam(cx,W/2+wa+14,ya-2,7-f*3,t+i+9,true)}}
};

/* ---------- the song plays in a small window while you play (never blocks the game) ----------
   AY.mini({kn:'id',ta:'id',en:'id'}, {muted:true}) : starts at the player's tap (so the browser allows sound).
   While the song plays, the game's own background music stays off; close the window and it comes back. */
AY.mini=function(ids,o){o=o||{};var id=ids[DK.lang()]||ids.en||ids[Object.keys(ids)[0]];if(!id)return;
 var ex=document.getElementById('ayMini');if(ex){if(ex.dataset.id===id)return;ex.remove()}
 if(!document.getElementById('ayMiniCss')){var st=document.createElement('style');st.id='ayMiniCss';st.textContent=
  '#ayMini{position:fixed;right:10px;bottom:10px;z-index:45;width:min(220px,46vw);background:#120c30;border:2px solid #f6a723;border-radius:14px;overflow:hidden;box-shadow:0 14px 34px -10px #000;font:700 12px Mukta,system-ui,sans-serif;color:#fdf3dc}'+
  '#ayMini .bar{display:flex;align-items:center;gap:6px;padding:3px 6px;background:#2a1f5c}#ayMini .bar span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '#ayMini button{all:unset;cursor:pointer;padding:2px 6px;border-radius:8px;background:#ffffff14}#ayMini .v{aspect-ratio:16/9}#ayMini iframe{width:100%;height:100%;border:0;display:block}'+
  '#ayMini.min .v{display:none}#ayMini.dock{position:relative;right:auto;bottom:auto;margin:12px auto 0;width:min(320px,80vw)}';document.head.appendChild(st)}
 var d=document.createElement('div');d.id='ayMini';d.dataset.id=id;
 d.innerHTML='<div class="bar"><span>♪ '+DK.esc(AY.t(AY.ui.nowPlaying))+'</span><button data-a="min" aria-label="Minimise">▾</button><button data-a="x" aria-label="Close the song">✕</button></div><div class="v"><iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&playsinline=1&rel=0&modestbranding=1'+(o.muted?'&mute=1':'')+'&loop=1&playlist='+id+'" title="Ayyappa song" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
 /* phones: a small card under the game (never over it); bigger screens: a small corner window */
 var small=innerWidth<760,wrap=document.querySelector('main.wrap');if(small&&wrap){d.classList.add('dock');wrap.parentNode.insertBefore(d,wrap.nextSibling)}else document.body.appendChild(d);try{if(window.WOWHit)WOWHit('mini-video-'+id)}catch(e){}
 d.querySelector('[data-a=min]').onclick=function(){d.classList.toggle('min');this.textContent=d.classList.contains('min')?'▴':'▾'};
 d.querySelector('[data-a=x]').onclick=function(){d.remove();AY.musicOn()}};
var realStart=DK.startMusic;DK.startMusic=function(){if(!document.getElementById('ayMini')&&AY._music)realStart()};
AY.musicOn=function(){AY._music=true;realStart()};
/* ---------- how-to-play card: painting, a small moving demo, numbered steps, one big Play button ---------- */
AY.how=function(c){
 DK.card({art:c.art,label:c.label,title:c.title,paras:c.paras||[],how:c.steps.map(function(s,i){return [['1️⃣','2️⃣','3️⃣','4️⃣'][i],s]}),opts:c.opts,
  buttons:[{label:c.go,on:function(v){if(c.video)AY.mini(c.video,{muted:c.muted});c.on&&c.on(v)}}],foot:c.video?AY.t(AY.ui.songNote):''});
 if(!c.demo)return;var card=document.querySelector('.dk-card'),how=card&&card.querySelector('.how');if(!how)return;
 var w=document.createElement('div');w.style.cssText='position:relative;border-radius:14px;overflow:hidden;margin:6px 0 10px;background:#1c1442;border:2px solid #e8d2a6';
 var lab=document.createElement('b');lab.textContent=AY.t(AY.ui.howT);lab.style.cssText='position:absolute;left:8px;top:6px;z-index:2;background:#1c1442d9;color:#ffd35a;padding:2px 10px;border-radius:99px;font:800 12px Mukta,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase';
 var cv=document.createElement('canvas');cv.width=640;cv.height=c.demoH||300;cv.style.cssText='display:block;width:100%';w.appendChild(lab);w.appendChild(cv);how.parentNode.insertBefore(w,how);
 var x=cv.getContext('2d'),t0=performance.now();(function f(){if(!document.body.contains(cv))return;c.demo(x,cv.width,cv.height,(performance.now()-t0)/1000);requestAnimationFrame(f)})()};
/* a pointing finger for the demos */
AY.finger=function(cx,x,y,press){cx.save();cx.translate(x,y);cx.scale(press?.88:1,press?.88:1);cx.font='46px system-ui,"Apple Color Emoji","Segoe UI Emoji"';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('👆',0,0);
 if(press){cx.strokeStyle='rgba(255,211,90,.9)';cx.lineWidth=4;cx.beginPath();cx.arc(0,-30,22,0,6.283);cx.stroke()}cx.restore()};
/* a painting drawn to cover a box (cached images) */
var IMG={};AY.img=function(src){if(!IMG[src]){var i=new Image();i.src=src;IMG[src]=i}return IMG[src]};
AY.cover=function(cx,src,x,y,w,h,fy){var im=AY.img(src);if(!im.complete||!im.naturalWidth)return false;var s=Math.max(w/im.naturalWidth,h/im.naturalHeight),sw=w/s,sh=h/s;
 cx.drawImage(im,(im.naturalWidth-sw)/2,(im.naturalHeight-sh)*(fy==null?.5:fy),sw,sh,x,y,w,h);return true};

/* ---------- the real Pathinettam Padi painting (img/ayyappa/steps_v.jpg): the 18 golden steps, the first `steps` glowing.
   Returns pos(i) -> {x,y,w} for step i (0 = bottom step, 18 = top platform) so the swami can stand on it. ---------- */
AY.STEPS_IMG='img/ayyappa/steps_v.jpg';
AY.STEPN=[1165,1120,1074,1033,995,961,930,902,876,853,832,813,796,780,767,754,743,732,722.5];
/* where a swami's feet rest on step k (1..18), from stepsBg's pos() */
AY.foot=function(pos,k){if(k<=0){var a=pos(0);return{x:a.x,y:a.y+6,w:a.w}}var a=pos(k),b=k<18?pos(k+1):{y:a.y-(pos(17).y-a.y)*.8};return{x:a.x,y:a.y-(a.y-b.y)*.35,w:a.w}};
/* a swami part-way between steps (f = 3.4 means 40% of the way from step 3 to 4), with a little lift for the climb */
AY.footAt=function(pos,f){f=Math.max(0,Math.min(18,f));var k=Math.floor(f),u=f-k,a=AY.foot(pos,k),b=AY.foot(pos,Math.min(18,k+1)),e=u*u*(3-2*u);return{x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e-Math.sin(u*Math.PI)*a.w*.06,w:a.w+(b.w-a.w)*e,climb:u}};
AY.stepsBg=function(cx,W,H,steps,t,fy){var im=AY.img(AY.STEPS_IMG);fy=fy==null?.5:fy;
 var iw=900,ih=1587,s=Math.max(W/iw,H/ih),dw=iw*s,dh=ih*s,ox=(W-dw)/2,oy=(H-dh)*fy;
 if(im.complete&&im.naturalWidth)cx.drawImage(im,ox,oy,dw,dh);else{cx.fillStyle='#2a1748';cx.fillRect(0,0,W,H)}
 /* step geometry measured on the painting: nosing line of each step (0 = foot of step 1), stair centre and half-width */
 function pos(i){var f=AY.STEPN[Math.max(0,Math.min(18,i))],k=(1165-f)/(1165-722.5);return{x:ox+dw*(475/900),y:oy+dh*(f/1587),w:dw*((175+(80-175)*k)/900)}}
 for(var i=0;i<Math.min(18,steps);i++){var a=pos(i),b=pos(i+1);cx.save();cx.globalCompositeOperation='lighter';
  var g=cx.createLinearGradient(0,b.y,0,a.y);g.addColorStop(0,'rgba(255,200,80,.0)');g.addColorStop(1,'rgba(255,214,110,'+(.32+.12*Math.sin(t*4+i))+')');
  cx.fillStyle=g;cx.beginPath();cx.moveTo(a.x-a.w,a.y);cx.lineTo(a.x+a.w,a.y);cx.lineTo(b.x+b.w,b.y);cx.lineTo(b.x-b.w,b.y);cx.fill();cx.restore()}
 if(steps<18){var n=pos(steps),m=pos(steps+1);cx.strokeStyle='rgba(255,240,180,'+(.55+.4*Math.sin(t*6))+')';cx.lineWidth=3;cx.beginPath();cx.moveTo(n.x-n.w,n.y);cx.lineTo(n.x+n.w,n.y);cx.stroke()}
 return pos};
/* ---------- end card ---------- */
AY.end=function(c){
 var i=-1;AY.GAMES.forEach(function(g,k){if(g.key===c.key)i=k});var nx=AY.GAMES[(i+1)%AY.GAMES.length];
 DK.done(c.key,c.stars);AY.askJoin();
 var btn=[{label:AY.t(AY.ui.again),on:c.again}];
 if(nx&&nx.key!==c.key)btn.push({label:AY.t(AY.ui.next)+AY.t(nx.name),href:nx.href,cls:'alt'});
 btn.push({label:AY.t(AY.ui.padi),href:'ayyappa.html#steps',cls:'ghost'});
 btn.push({label:AY.t(AY.ui.songs),href:'ayyappa.html#songs',cls:'ghost'});
 btn.push({label:AY.t(AY.ui.share),cls:'ghost',keep:true,on:function(){AY.share(c.shareText)}});
 DK.card({art:c.art||'img/ayyappa_hero.jpg',label:AY.t(AY.ui.sharanam),stars:c.stars,title:c.title,paras:c.paras||[],buttons:btn,
  foot:'<a href="https://www.youtube.com/@WorldofWondersstudio?sub_confirmation=1" target="_blank" rel="noopener" style="color:#b8643a;font-weight:700">'+AY.t(AY.ui.sub)+'</a>'});
};
AY.askJoin=function(){setTimeout(function(){try{window.WOWRegAsk&&WOWRegAsk()}catch(e){}},4000)};
AY.share=function(text){var u=location.href.split('#')[0].split('?')[0],d={title:document.title,text:AY.t(text)||document.title,url:u};
 try{if(navigator.share){navigator.share(d).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(d.text+' '+u);DK.beat(AY.t(AY.ui.copied))}else{window.open('https://wa.me/?text='+encodeURIComponent(d.text+' '+u),'_blank')}}catch(e){}};
/* a sung-feeling chant cue: three notes Sa Re Ga, then the bell */
AY.chant=function(){[293.66,329.63,369.99].forEach(function(f,i){DK.tone(f,.32,'triangle',.07,0,i*.16)});setTimeout(function(){DK.bell(587,.1,2)},480)};
window.AY=AY;
})();
