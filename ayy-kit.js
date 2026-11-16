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
 howT:{en:'How to play',kn:'ಆಡುವುದು ಹೇಗೆ',ta:'எப்படி விளையாடுவது',te:'ఎలా ఆడాలి'}
};
AY.t=function(o){return DK.t(o)};
/* language pills: EN ಕ த తె (Hindi pages of other games keep their own pills) */
AY.pills=function(el){el.innerHTML=[['en','EN'],['kn','ಕ'],['ta','த'],['te','తె']].map(function(p){return '<button class="pill" data-lang="'+p[0]+'" aria-pressed="false">'+p[1]+'</button>'}).join('');
 el.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===DK.lang());b.onclick=function(){DK.setLang(b.dataset.lang)}});
 if(['en','kn','ta','te'].indexOf(DK.lang())<0)DK.setLang('en')};

/* ---------- our swami: drawn standing at (x,y)=feet centre, height h. o:{t:walk time, step:0..1 bob, face:'up'|'side', glow} ---------- */
AY.pilgrim=function(cx,x,y,h,o){
 o=o||{};var t=o.t||0,sw=Math.sin(t*9)*(o.still?0:1),s=h/100;
 cx.save();cx.translate(x,y);cx.scale(s,s);
 if(o.alpha!=null)cx.globalAlpha=o.alpha;
 /* shadow */
 cx.fillStyle='rgba(0,0,0,.28)';cx.beginPath();cx.ellipse(0,0,20,5,0,0,6.283);cx.fill();
 var bob=Math.abs(sw)*2;cx.translate(0,-bob);
 if(o.glow){var g=cx.createRadialGradient(0,-55,4,0,-55,70);g.addColorStop(0,'rgba(255,214,110,.55)');g.addColorStop(1,'rgba(255,214,110,0)');cx.fillStyle=g;cx.beginPath();cx.arc(0,-55,70,0,6.283);cx.fill()}
 /* legs (seen from behind/side, walking) */
 cx.strokeStyle='#8a5a3c';cx.lineCap='round';cx.lineWidth=7;
 cx.beginPath();cx.moveTo(-5,-30);cx.lineTo(-5+sw*6,-2);cx.moveTo(5,-30);cx.lineTo(5-sw*6,-2);cx.stroke();
 /* black mundu (dhoti) */
 cx.fillStyle='#16141c';cx.beginPath();cx.moveTo(-15,-54);cx.lineTo(15,-54);cx.lineTo(13+sw*2,-20);cx.lineTo(-13+sw*2,-20);cx.closePath();cx.fill();
 cx.strokeStyle='#d9a53c';cx.lineWidth=2;cx.beginPath();cx.moveTo(-13+sw*2,-22);cx.lineTo(13+sw*2,-22);cx.stroke(); /* gold kasavu border */
 /* black shirt / shawl */
 cx.fillStyle='#22202b';cx.beginPath();cx.moveTo(-14,-80);cx.quadraticCurveTo(0,-86,14,-80);cx.lineTo(16,-52);cx.lineTo(-16,-52);cx.closePath();cx.fill();
 /* arms: one up holding the Irumudi, one swinging */
 cx.strokeStyle='#8a5a3c';cx.lineWidth=6;cx.beginPath();cx.moveTo(-13,-78);cx.lineTo(-17,-94);cx.lineTo(-10,-104);cx.stroke();
 cx.beginPath();cx.moveTo(13,-76);cx.lineTo(17-sw*4,-58);cx.stroke();
 /* rudraksha / tulasi mala */
 cx.strokeStyle='#e8c66a';cx.lineWidth=2;cx.setLineDash([2,2]);cx.beginPath();cx.arc(0,-82,9,0.2,Math.PI-0.2);cx.stroke();cx.setLineDash([]);
 /* head + hair */
 cx.fillStyle='#8a5a3c';cx.beginPath();cx.arc(0,-92,9,0,6.283);cx.fill();
 cx.fillStyle='#1b1410';cx.beginPath();cx.arc(0,-94,9,Math.PI*1.05,Math.PI*1.95);cx.fill();
 /* sandal + kumkum on forehead when facing side */
 if(o.face==='side'){cx.fillStyle='#f3e2b0';cx.fillRect(4,-96,4,2);cx.fillStyle='#d2283a';cx.fillRect(5,-94.5,2,2)}
 /* Irumudi: two-knot cloth bundle on the head (front + back pouch) */
 cx.save();cx.translate(0,-104);cx.rotate(sw*.04);
 var ir=o.irumudi||'#c61f2e';
 cx.fillStyle=ir;cx.beginPath();cx.ellipse(-11,-4,13,9,-.15,0,6.283);cx.fill();cx.beginPath();cx.ellipse(11,-4,13,9,.15,0,6.283);cx.fill();
 cx.fillStyle='#8f1420';cx.beginPath();cx.ellipse(0,-3,5,7,0,0,6.283);cx.fill(); /* centre knot */
 cx.strokeStyle='#f0c24a';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(-22,-1);cx.lineTo(22,-1);cx.stroke();
 cx.restore();
 cx.restore();
};

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
/* ---------- end card ---------- */
AY.end=function(c){
 var i=-1;AY.GAMES.forEach(function(g,k){if(g.key===c.key)i=k});var nx=AY.GAMES[(i+1)%AY.GAMES.length];
 DK.done(c.key,c.stars);
 var btn=[{label:AY.t(AY.ui.again),on:c.again}];
 if(nx&&nx.key!==c.key)btn.push({label:AY.t(AY.ui.next)+AY.t(nx.name),href:nx.href,cls:'alt'});
 btn.push({label:AY.t(AY.ui.songs),href:'ayyappa.html#songs',cls:'ghost'});
 btn.push({label:AY.t(AY.ui.share),cls:'ghost',keep:true,on:function(){AY.share(c.shareText)}});
 DK.card({art:c.art||'img/ayyappa_hero.jpg',label:AY.t(AY.ui.sharanam),stars:c.stars,title:c.title,paras:c.paras||[],buttons:btn,
  foot:'<a href="https://www.youtube.com/@WorldofWondersstudio?sub_confirmation=1" target="_blank" rel="noopener" style="color:#b8643a;font-weight:700">'+AY.t(AY.ui.sub)+'</a>'});
};
AY.share=function(text){var u=location.href.split('#')[0].split('?')[0],d={title:document.title,text:AY.t(text)||document.title,url:u};
 try{if(navigator.share){navigator.share(d).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(d.text+' '+u);DK.beat(AY.t(AY.ui.copied))}else{window.open('https://wa.me/?text='+encodeURIComponent(d.text+' '+u),'_blank')}}catch(e){}};
/* a sung-feeling chant cue: three notes Sa Re Ga, then the bell */
AY.chant=function(){[293.66,329.63,369.99].forEach(function(f,i){DK.tone(f,.32,'triangle',.07,0,i*.16)});setTimeout(function(){DK.bell(587,.1,2)},480)};
window.AY=AY;
})();
