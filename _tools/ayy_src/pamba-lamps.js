/*META
{"key":"pamba-lamps","title":{"en":"Pamba Lamps","kn":"ಪಂಪಾ ದೀಪ","ta":"பம்பை விளக்கு","te":"పంబ దీపాలు"},
 "desc":"Pamba Lamps: a free Ayyappa season game by World of Wonders Studio. Guide a floating lamp down the holy river Pamba at night, past rocks and logs, gathering flower petals to the ghat. English, Kannada, Tamil and Telugu.",
 "og":"Float a lamp down the holy river Pamba. Swamiye Sharanam!",
 "genre":["Casual","Educational"],"bg":"img/ayyappa/night_river.jpg"}
META*/
const T=DK.t;
const L={
 title:{en:'Pamba Lamps',kn:'ಪಂಪಾ ದೀಪ',ta:'பம்பை விளக்கு',te:'పంబ దీపాలు'},
 storyT:{en:'Pamba Vilakku: lamps on the holy river',kn:'ಪಂಪಾ ವಿಳಕ್ಕು: ಪವಿತ್ರ ನದಿಯಲ್ಲಿ ದೀಪಗಳು',ta:'பம்பை விளக்கு: புனித நதியில் விளக்குகள்',te:'పంబ విళక్కు: పవిత్ర నదిలో దీపాలు'},
 story:{en:['The river <b>Pamba</b> is called the Dakshina Ganga, the Ganga of the south. Pilgrims bathe in it before they climb.','On festival nights, small lamps are floated on the river and it glows like a river of stars. Guide your lamp safely to the ghat!'],
  kn:['<b>ಪಂಪಾ</b> ನದಿಯನ್ನು ದಕ್ಷಿಣ ಗಂಗೆ ಎನ್ನುತ್ತಾರೆ. ಭಕ್ತರು ಬೆಟ್ಟ ಹತ್ತುವ ಮೊದಲು ಇದರಲ್ಲಿ ಸ್ನಾನ ಮಾಡುತ್ತಾರೆ.','ಹಬ್ಬದ ರಾತ್ರಿಗಳಲ್ಲಿ ನದಿಯಲ್ಲಿ ಪುಟ್ಟ ದೀಪಗಳನ್ನು ತೇಲಿಬಿಡುತ್ತಾರೆ, ನದಿ ನಕ್ಷತ್ರಗಳ ಹೊಳೆಯಂತೆ ಕಾಣುತ್ತದೆ. ನಿಮ್ಮ ದೀಪವನ್ನು ಘಾಟಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ತಲುಪಿಸಿ!'],
  ta:['<b>பம்பை</b> நதியைத் தட்சிண கங்கை என்கிறார்கள். பக்தர்கள் மலையேறும் முன் இதில் நீராடுகிறார்கள்.','விழா இரவுகளில் நதியில் சிறு விளக்குகள் மிதக்கவிடப்படுகின்றன, நதி நட்சத்திர ஆறு போல் ஒளிர்கிறது. உங்கள் விளக்கைப் படித்துறைக்குப் பத்திரமாகக் கொண்டு செல்லுங்கள்!'],
  te:['<b>పంబ</b> నదిని దక్షిణ గంగ అంటారు. భక్తులు కొండ ఎక్కే ముందు ఇందులో స్నానం చేస్తారు.','పండుగ రాత్రుల్లో నదిలో చిన్న దీపాలు తేలవదులుతారు, నది నక్షత్రాల ప్రవాహంలా మెరుస్తుంది. మీ దీపాన్ని ఘాట్‌కు సురక్షితంగా చేర్చండి!']},
 how:{en:['Slide your finger left and right: the lamp follows.','Keep away from rocks, logs and the banks. Each knock dims the flame.','Gather lotus petals 🌸 and reach the ghat with the flame still burning!'],
  kn:['ಬೆರಳನ್ನು ಎಡ-ಬಲ ಸರಿಸಿ: ದೀಪ ಹಿಂಬಾಲಿಸುತ್ತದೆ.','ಕಲ್ಲು, ಮರದ ದಿಮ್ಮಿ, ದಡಗಳಿಂದ ದೂರವಿರಿ. ಪ್ರತಿ ಡಿಕ್ಕಿಗೆ ಜ್ಯೋತಿ ಮಂಕಾಗುತ್ತದೆ.','ಕಮಲದ ದಳಗಳನ್ನು 🌸 ಸಂಗ್ರಹಿಸಿ, ಜ್ಯೋತಿ ಉರಿಯುತ್ತಿರುವಾಗಲೇ ಘಾಟ್ ತಲುಪಿ!'],
  ta:['விரலை இடம் வலம் நகர்த்துங்கள்: விளக்கு பின்தொடரும்.','பாறைகள், கட்டைகள், கரைகளிலிருந்து விலகி இருங்கள். ஒவ்வொரு மோதலுக்கும் சுடர் மங்கும்.','தாமரை இதழ்களை 🌸 சேகரித்து, சுடர் எரியும்போதே படித்துறையை அடையுங்கள்!'],
  te:['వేలిని ఎడమ కుడికి జరపండి: దీపం అనుసరిస్తుంది.','రాళ్ళు, దుంగలు, ఒడ్డులకు దూరంగా ఉండండి. ప్రతి ఢీకొట్టుకి జ్యోతి మసకబారుతుంది.','తామర రేకులు 🌸 సేకరించి, జ్యోతి వెలుగుతుండగానే ఘాట్ చేరండి!']},
 go:{en:'Float the lamp 🪔',kn:'ದೀಪ ತೇಲಿಬಿಡಿ 🪔',ta:'விளக்கை மிதக்கவிடு 🪔',te:'దీపం తేలవదులు 🪔'},
 petals:{en:'Petals',kn:'ದಳಗಳು',ta:'இதழ்கள்',te:'రేకులు'},ghat:{en:'To the ghat',kn:'ಘಾಟಿಗೆ',ta:'படித்துறைக்கு',te:'ఘాట్‌కు'},
 dim:{en:'The flame flickers! Steer gently.',kn:'ಜ್ಯೋತಿ ನಡುಗುತ್ತಿದೆ! ನಿಧಾನವಾಗಿ ಸರಿಸಿ.',ta:'சுடர் நடுங்குகிறது! மெதுவாக நகர்த்துங்கள்.',te:'జ్యోతి వణుకుతోంది! నెమ్మదిగా నడపండి.'},
 relit:{en:'A swami on the bank lights your lamp again 🙏',kn:'ದಡದಲ್ಲಿದ್ದ ಸ್ವಾಮಿ ನಿಮ್ಮ ದೀಪವನ್ನು ಮತ್ತೆ ಹಚ್ಚಿದರು 🙏',ta:'கரையில் இருந்த சாமி உங்கள் விளக்கை மீண்டும் ஏற்றினார் 🙏',te:'ఒడ్డున ఉన్న స్వామి మీ దీపాన్ని మళ్ళీ వెలిగించాడు 🙏'},
 endT:{en:'Your lamp reached the ghat!',kn:'ನಿಮ್ಮ ದೀಪ ಘಾಟ್ ತಲುಪಿತು!',ta:'உங்கள் விளக்கு படித்துறையை அடைந்தது!',te:'మీ దీపం ఘాట్ చేరింది!'},
 endP:{en:'Pilgrims bathe in the Pamba to wash away tiredness and wrong deeds before the climb. Please keep the river clean: nothing but flowers goes into it.',kn:'ಏರುವ ಮೊದಲು ಆಯಾಸ, ತಪ್ಪುಗಳನ್ನು ತೊಳೆಯಲು ಭಕ್ತರು ಪಂಪಾದಲ್ಲಿ ಸ್ನಾನ ಮಾಡುತ್ತಾರೆ. ನದಿಯನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ: ಹೂವು ಬಿಟ್ಟು ಬೇರೇನೂ ಹಾಕಬೇಡಿ.',ta:'ஏற்றத்துக்கு முன் களைப்பையும் தவறுகளையும் கழுவ பக்தர்கள் பம்பையில் நீராடுகிறார்கள். நதியைச் சுத்தமாக வையுங்கள்: பூக்களைத் தவிர வேறெதையும் போடாதீர்கள்.',te:'ఎక్కే ముందు అలసటను, తప్పులను కడుక్కోవడానికి భక్తులు పంబలో స్నానం చేస్తారు. నదిని శుభ్రంగా ఉంచండి: పూలు తప్ప ఏదీ వేయకండి.'},
 shareText:{en:'I floated my lamp down the holy Pamba! Try it, Swamiye Sharanam:',kn:'ನಾನು ಪವಿತ್ರ ಪಂಪಾದಲ್ಲಿ ದೀಪ ತೇಲಿಬಿಟ್ಟೆ! ನೀವೂ ಆಡಿ, ಸ್ವಾಮಿಯೇ ಶರಣಂ:',ta:'நான் புனித பம்பையில் விளக்கு மிதக்கவிட்டேன்! நீங்களும் விளையாடுங்கள், சுவாமியே சரணம்:',te:'నేను పవిత్ర పంబలో దీపం తేలవదిలాను! మీరూ ఆడండి, స్వామియే శరణం:'}
};
const W=480,H=760,GOAL=2400,LY=560;
function bankX(y,s){/* the river's left edge at screen y, scroll s */const v=y-s;return 70+Math.sin(v*.004)*50+Math.sin(v*.011)*18}
function riverW(y,s){const v=y-s;return 300+Math.sin(v*.003+1)*40}
function lamp(cx,x,y,f,t,s){cx.save();cx.translate(x,y);cx.scale(s||1,s||1);
 const rg=cx.createRadialGradient(0,0,4,0,0,70*f+10);rg.addColorStop(0,`rgba(255,200,90,${.45*f})`);rg.addColorStop(1,'rgba(255,200,90,0)');cx.fillStyle=rg;cx.beginPath();cx.arc(0,0,80,0,6.283);cx.fill();
 cx.strokeStyle='rgba(255,230,170,.35)';cx.lineWidth=2;for(let i=0;i<2;i++){const r=26+((t*20+i*14)%28);cx.globalAlpha=1-((t*20+i*14)%28)/28;cx.beginPath();cx.ellipse(0,8,r,r*.35,0,0,6.283);cx.stroke()}cx.globalAlpha=1;
 /* banana-leaf float with a clay lamp */
 cx.fillStyle='#3a8a3a';cx.beginPath();cx.ellipse(0,8,28,12,0,0,6.283);cx.fill();cx.fillStyle='#5aaa4a';cx.beginPath();cx.ellipse(-4,6,22,8,0,0,6.283);cx.fill();
 ['#ff9f1c','#e63946','#ffd35a'].forEach((c,i)=>{cx.fillStyle=c;cx.beginPath();cx.arc(-18+i*18,10,4,0,6.283);cx.fill()});
 AY.deepam(cx,0,4,12*Math.max(.35,f),t,f>0);cx.restore()}
function rock(cx,o){cx.save();cx.translate(o.x,o.y);if(o.k==='log'){cx.rotate(o.a);const g=cx.createLinearGradient(0,-10,0,10);g.addColorStop(0,'#7a5434');g.addColorStop(1,'#3a2414');cx.fillStyle=g;cx.beginPath();cx.roundRect(-o.r,-10,o.r*2,20,9);cx.fill();cx.fillStyle='#b88a5a';cx.beginPath();cx.ellipse(o.r-4,0,5,9,0,0,6.283);cx.fill()}
 else{const g=cx.createRadialGradient(-o.r*.3,-o.r*.4,2,0,0,o.r);g.addColorStop(0,'#8a8a96');g.addColorStop(1,'#2a2a34');cx.fillStyle=g;cx.beginPath();cx.ellipse(0,0,o.r,o.r*.75,0,0,6.283);cx.fill()}
 cx.strokeStyle='rgba(220,240,255,.35)';cx.lineWidth=2;cx.beginPath();cx.ellipse(0,o.r*.3,o.r+6,o.r*.4,0,0,Math.PI);cx.stroke();cx.restore()}
function demo(x,w,h,t){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0d2440');g.addColorStop(1,'#123a5a');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#1a3a1a';x.fillRect(0,0,w*.12,h);x.fillRect(w*.88,0,w*.12,h);
 const lx=w/2+Math.sin(t*1.4)*w*.25;rock(x,{x:w*.35,y:(t*80)%(h+60)-30,r:22});lamp(x,lx,h*.7,1,t,.9);AY.finger(x,lx+20,h*.92,true)}
const api=AG.game({key:'pamba-lamps',art:'img/ayyappa/night_river.jpg',L,W,H,demo,demoH:260,video:{en:'1Zo3yL76uYg',kn:'1Zo3yL76uYg',ta:'1Zo3yL76uYg',te:'1Zo3yL76uYg'},music:{sa:138.59,scale:[0,2,4,7,9,12,14,16],tempo:.5},bokeh:false,
 init(S,a){Object.assign(S,{s:0,x:W/2,tx:W/2,f:1,hits:0,relit:0,petals:0,objs:[],pet:[],next:200,nextP:120,inv:0,drag:false,shore:[]});
  for(let i=0;i<40;i++)S.shore.push({y:i*60,side:i%2,k:Math.random()});hud(S)},
 down(p,S){S.drag=true;S.tx=p.x},move(p,S){if(S.drag)S.tx=p.x},up(p,S){S.drag=false},
 key_(e,S){if(e.key==='ArrowLeft')S.tx=S.x-60;if(e.key==='ArrowRight')S.tx=S.x+60},
 update(dt,S,a){const sp=110+Math.min(80,S.s*.03);S.s+=sp*dt;S.inv=Math.max(0,S.inv-dt);
  S.x+=(S.tx-S.x)*Math.min(1,dt*5);const bx=bankX(LY,S.s),rw=riverW(LY,S.s);
  if(S.x<bx+24||S.x>bx+rw-24){S.x=AG.clamp(S.x,bx+24,bx+rw-24);if(!S.inv)knock(S,a)}
  S.objs.forEach(o=>o.y+=sp*dt);S.pet.forEach(o=>o.y+=sp*dt);
  S.next-=sp*dt;if(S.next<=0&&S.s<GOAL-300){const y=-40,b=bankX(y,S.s),w=riverW(y,S.s),k=Math.random()<.3?'log':'rock';S.objs.push({x:b+30+Math.random()*(w-60),y,k,r:k==='log'?AG.rnd(40,60):AG.rnd(16,28),a:AG.rnd(-.5,.5)});S.next=AG.rnd(120,200)-Math.min(60,S.s*.02)}
  S.nextP-=sp*dt;if(S.nextP<=0){const y=-30,b=bankX(y,S.s),w=riverW(y,S.s);S.pet.push({x:b+40+Math.random()*(w-80),y});S.nextP=AG.rnd(70,130)}
  S.objs=S.objs.filter(o=>o.y<H+80);S.pet=S.pet.filter(o=>o.y<H+40&&!o.got);
  if(!S.inv)S.objs.forEach(o=>{if(Math.abs(o.y-LY)<o.r*.6+14&&Math.abs(o.x-S.x)<(o.k==='log'?o.r:o.r)+18)knock(S,a)});
  S.pet.forEach(o=>{if(Math.hypot(o.x-S.x,o.y-LY)<34){o.got=true;S.petals++;DK.chime(S.petals);a.burst(o.x,o.y,'#ff8fb1',8,.5)}});
  if(S.s>=GOAL){DK.win();a.burst(S.x,LY,'#ffd35a',50);const st=S.hits===0?3:S.relit===0?2:1;a.finish(st,[`🌸 ${S.petals} ${T(L.petals)}`])}
  hud(S)},
 draw(cx,t,S,a){const s=S.s;
  /* banks */
  cx.fillStyle='#0e1a12';cx.fillRect(0,0,W,H);
  const rg=cx.createLinearGradient(0,0,W,0);rg.addColorStop(0,'#0b2a44');rg.addColorStop(.5,'#13466a');rg.addColorStop(1,'#0b2a44');
  cx.fillStyle=rg;cx.beginPath();for(let y=0;y<=H;y+=10)cx.lineTo(bankX(y,s),y);for(let y=H;y>=0;y-=10)cx.lineTo(bankX(y,s)+riverW(y,s),y);cx.fill();
  /* moon reflection and ripples */
  cx.save();cx.globalCompositeOperation='lighter';const mx=W*.62;for(let y=0;y<H;y+=6){const w=6+Math.sin(y*.08+t*2)*4;cx.fillStyle=`rgba(200,220,255,${.05+.05*Math.sin(y*.05-t)})`;cx.fillRect(mx-w+Math.sin(y*.1+t)*6,y,w*2,3)}cx.restore();
  cx.strokeStyle='rgba(180,220,255,.12)';cx.lineWidth=2;for(let i=0;i<26;i++){const y=((i*37+s)%(H+40))-20,b=bankX(y,s),x=b+((i*71)%Math.max(1,riverW(y,s)-40))+20;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x+22,y);cx.stroke()}
  /* bank greenery and lamps along the shore */
  for(let i=0;i<14;i++){const y=((i*70+s*1)%(H+140))-70,lb=bankX(y,s),rb=lb+riverW(y,s);
   const g1=cx.createRadialGradient(lb-30,y,4,lb-30,y,60);g1.addColorStop(0,'#2e5a2a');g1.addColorStop(1,'rgba(14,26,18,0)');cx.fillStyle=g1;cx.beginPath();cx.arc(lb-24,y,60,0,6.283);cx.fill();
   const g2=cx.createRadialGradient(rb+30,y+30,4,rb+30,y+30,60);g2.addColorStop(0,'#2e5a2a');g2.addColorStop(1,'rgba(14,26,18,0)');cx.fillStyle=g2;cx.beginPath();cx.arc(rb+24,y+30,60,0,6.283);cx.fill();
   if(i%2===0){AY.deepam(cx,lb-10,y,7,t+i,true);AY.deepam(cx,rb+10,y+35,7,t+i+3,true)}}
  /* other lamps floating far ahead */
  for(let i=0;i<5;i++){const y=((i*150+s*.4)%(H+100))-60;if(y<LY-80)lamp(cx,bankX(y,s)+riverW(y,s)*(.25+.12*i),y,1,t+i,.45)}
  /* the ghat at the end */
  const gy=LY-(GOAL-s)-40;if(gy>0){for(let k=0;gy-k*16>-16;k++){cx.fillStyle=k%2?'#a8845a':'#d2b080';cx.fillRect(0,gy-(k+1)*16,W,16);cx.fillStyle='rgba(0,0,0,.18)';cx.fillRect(0,gy-(k+1)*16+13,W,3)}for(let k=0;k<8;k++)AY.deepam(cx,30+k*60,gy-20,9,t+k,true);for(let k=0;k<3;k++)AY.pilgrim(cx,120+k*120,gy-34,60,{t:0,still:true,alpha:.85})}
  S.objs.forEach(o=>rock(cx,o));S.pet.forEach(o=>{cx.save();cx.translate(o.x,o.y);cx.rotate(t+o.x);for(let k=0;k<5;k++){cx.rotate(1.2566);cx.fillStyle='#ff8fb1';cx.beginPath();cx.ellipse(0,-7,4,8,0,0,6.283);cx.fill()}cx.fillStyle='#ffd35a';cx.beginPath();cx.arc(0,0,3,0,6.283);cx.fill();cx.restore()});
  if(!(S.inv&&Math.floor(t*12)%2))lamp(cx,S.x,LY,S.f,t,1);
  /* progress */
  AG.panel(cx,20,18,W-40,40,20);cx.fillStyle='rgba(255,255,255,.12)';cx.beginPath();cx.roundRect(70,33,W-150,10,5);cx.fill();cx.fillStyle='#ffd35a';cx.beginPath();cx.roundRect(70,33,(W-150)*Math.min(1,s/GOAL),10,5);cx.fill();AG.text(cx,'🪔',50,47,20,'#fff',{lw:0});AG.text(cx,'🛕',W-55,48,20,'#fff',{lw:0})}});
function knock(S,a){S.inv=1.2;S.hits++;S.f=Math.max(0,S.f-.34);a.bad();if(S.f<=.01){S.relit++;S.f=1;a.tip(T(L.relit),'good')}else a.tip(T(L.dim),'bad')}
function hud(S){api.hud([['🌸 '+T(L.petals),S.petals],['🛕 '+T(L.ghat),Math.max(0,Math.round(100-S.s/GOAL*100))+'%']])}
