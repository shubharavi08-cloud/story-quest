/*META
{"key":"mountain-path","title":{"en":"Mountain Path","kn":"ಮಲೆಯ ದಾರಿ","ta":"மலைப் பாதை","te":"కొండ దారి"},
 "desc":"Mountain Path: a free Ayyappa season puzzle by World of Wonders Studio. Turn the path stones to join the river Pamba to the temple, and walk the swami up to Sabarimala. English, Kannada, Tamil and Telugu.",
 "og":"Turn the stones, join the forest path from the Pamba to the temple. Swamiye Sharanam!",
 "genre":["Puzzle","Educational"],"bg":"img/ayyappa/river_trail.jpg"}
META*/
const T=DK.t;
const L={
 title:{en:'Mountain Path',kn:'ಮಲೆಯ ದಾರಿ',ta:'மலைப் பாதை',te:'కొండ దారి'},
 storyT:{en:'The forest path to Sabarimala',kn:'ಶಬರಿಮಲೆಗೆ ಕಾಡಿನ ದಾರಿ',ta:'சபரிமலைக்குக் காட்டுப் பாதை',te:'శబరిమలకు అడవి దారి'},
 story:{en:['Sabarimala stands on a hill in the deep forests of the Western Ghats. Pilgrims walk the last stretch on foot, from the river <b>Pamba</b> up to the temple.','The stones of the path have been turned around. Set them right so the swami can walk up!'],
  kn:['ಶಬರಿಮಲೆ ಪಶ್ಚಿಮ ಘಟ್ಟದ ದಟ್ಟ ಕಾಡಿನ ಬೆಟ್ಟದ ಮೇಲಿದೆ. ಭಕ್ತರು <b>ಪಂಪಾ</b> ನದಿಯಿಂದ ದೇವಸ್ಥಾನದವರೆಗೆ ಕೊನೆಯ ದಾರಿಯನ್ನು ಕಾಲ್ನಡಿಗೆಯಲ್ಲೇ ಹತ್ತುತ್ತಾರೆ.','ದಾರಿಯ ಕಲ್ಲುಗಳು ತಿರುಗಿಹೋಗಿವೆ. ಸ್ವಾಮಿ ಮೇಲೆ ನಡೆಯುವಂತೆ ಅವನ್ನು ಸರಿಯಾಗಿ ಜೋಡಿಸಿ!'],
  ta:['சபரிமலை மேற்குத் தொடர்ச்சி மலையின் அடர்ந்த காட்டில் ஒரு குன்றின் மேல் உள்ளது. பக்தர்கள் <b>பம்பை</b> நதியிலிருந்து கோயில் வரை கடைசிப் பகுதியை நடந்தே ஏறுகிறார்கள்.','பாதைக் கற்கள் திரும்பிவிட்டன. சாமி மேலே நடக்கும்படி அவற்றைச் சரியாக அமையுங்கள்!'],
  te:['శబరిమల పడమటి కనుమల దట్టమైన అడవిలో ఒక కొండ మీద ఉంది. భక్తులు <b>పంబ</b> నది నుండి ఆలయం వరకు చివరి దారిని కాలినడకనే ఎక్కుతారు.','దారి రాళ్ళు తిరిగిపోయాయి. స్వామి పైకి నడిచేలా వాటిని సరిగ్గా అమర్చండి!']},
 how:{en:['Tap a path stone to turn it.','Join the path from the river (bottom left) to the temple (top right). Joined stones glow gold.','Three hills, each bigger. Fewer turns earn more stars.'],
  kn:['ದಾರಿಯ ಕಲ್ಲನ್ನು ಮುಟ್ಟಿ ತಿರುಗಿಸಿ.','ನದಿಯಿಂದ (ಕೆಳಗೆ ಎಡ) ದೇವಸ್ಥಾನದವರೆಗೆ (ಮೇಲೆ ಬಲ) ದಾರಿ ಜೋಡಿಸಿ. ಜೋಡಿಸಿದ ಕಲ್ಲುಗಳು ಚಿನ್ನದಂತೆ ಹೊಳೆಯುತ್ತವೆ.','ಮೂರು ಬೆಟ್ಟ, ಒಂದಕ್ಕಿಂತ ಒಂದು ದೊಡ್ಡದು. ಕಡಿಮೆ ತಿರುವುಗಳಿಗೆ ಹೆಚ್ಚು ನಕ್ಷತ್ರ.'],
  ta:['பாதைக் கல்லைத் தட்டித் திருப்புங்கள்.','நதியிலிருந்து (கீழே இடது) கோயில் வரை (மேலே வலது) பாதையை இணையுங்கள். இணைந்த கற்கள் பொன்னாக ஒளிரும்.','மூன்று குன்றுகள், ஒவ்வொன்றும் பெரியது. குறைந்த திருப்பங்களுக்கு அதிக நட்சத்திரங்கள்.'],
  te:['దారి రాయిని తాకి తిప్పండి.','నది (కింద ఎడమ) నుండి ఆలయం (పైన కుడి) వరకు దారి కలపండి. కలిసిన రాళ్ళు బంగారంలా మెరుస్తాయి.','మూడు కొండలు, ఒకదానికంటే ఒకటి పెద్దది. తక్కువ తిప్పులకు ఎక్కువ నక్షత్రాలు.']},
 hill:{en:'Hill',kn:'ಬೆಟ್ಟ',ta:'குன்று',te:'కొండ'},turns:{en:'Turns',kn:'ತಿರುವು',ta:'திருப்பம்',te:'తిప్పులు'},
 joined:{en:'The path is joined! Swamiye Sharanam',kn:'ದಾರಿ ಜೋಡಣೆಯಾಯಿತು! ಸ್ವಾಮಿಯೇ ಶರಣಂ',ta:'பாதை இணைந்தது! சுவாமியே சரணம்',te:'దారి కలిసింది! స్వామియే శరణం'},
 endT:{en:'The swami reached the temple!',kn:'ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ ತಲುಪಿದ!',ta:'சாமி கோயிலை அடைந்தார்!',te:'స్వామి ఆలయం చేరాడు!'},
 endP:{en:'The traditional forest path from Erumeli runs for over 40 km, across streams and hills. Many pilgrims walk the shorter path from Pamba, about 5 km uphill.',kn:'ಎರುಮೇಲಿಯಿಂದ ಹೋಗುವ ಸಾಂಪ್ರದಾಯಿಕ ಕಾಡಿನ ದಾರಿ 40 ಕಿ.ಮೀಗೂ ಹೆಚ್ಚು ಉದ್ದ, ಹಳ್ಳ-ಬೆಟ್ಟಗಳನ್ನು ದಾಟುತ್ತದೆ. ಅನೇಕರು ಪಂಪಾದಿಂದ ಸುಮಾರು 5 ಕಿ.ಮೀ ಏರುದಾರಿ ನಡೆಯುತ್ತಾರೆ.',ta:'எருமேலியிலிருந்து செல்லும் பாரம்பரியக் காட்டுப் பாதை 40 கி.மீக்கும் மேல், ஓடைகளையும் குன்றுகளையும் கடக்கிறது. பலர் பம்பையிலிருந்து சுமார் 5 கி.மீ ஏற்றப் பாதையில் நடக்கிறார்கள்.',te:'ఎరుమేలి నుండి సంప్రదాయ అడవి దారి 40 కి.మీ కంటే ఎక్కువ, వాగులు, కొండలు దాటుతుంది. చాలామంది పంబ నుండి సుమారు 5 కి.మీ ఎగువ దారిలో నడుస్తారు.'},
 shareText:{en:'I joined the forest path to Sabarimala! Try it, Swamiye Sharanam:',kn:'ನಾನು ಶಬರಿಮಲೆಯ ಕಾಡಿನ ದಾರಿ ಜೋಡಿಸಿದೆ! ನೀವೂ ಆಡಿ, ಸ್ವಾಮಿಯೇ ಶರಣಂ:',ta:'நான் சபரிமலைக் காட்டுப் பாதையை இணைத்தேன்! நீங்களும் விளையாடுங்கள், சுவாமியே சரணம்:',te:'నేను శబరిమల అడవి దారిని కలిపాను! మీరూ ఆడండి, స్వామియే శరణం:'}
};
const W=480,H=760,N=1,E=2,S_=4,Wd=8,DIRS=[[0,-1,N,S_],[1,0,E,Wd],[0,1,S_,N],[-1,0,Wd,E]];
const LEVELS=[[4,5],[5,6],[6,7]];
const rot=m=>((m<<1)|(m>>3))&15;
let BG0,BG1;
function makeLevel(S,lv){const [c,r]=LEVELS[lv];S.lv=lv;S.c=c;S.r=r;S.ts=Math.min(96,Math.floor(400/c));S.ox=(W-S.ts*c)/2;S.oy=150+(520-S.ts*r)/2;
 /* a winding path by random depth-first search from bottom-left to top-right */
 const start=[0,r-1],end=[c-1,0];let path=null;
 for(let tries=0;tries<200&&!path;tries++){const seen=new Set(),st=[[start]];const k=p=>p[0]+','+p[1];
  const dfs=(p,acc)=>{if(p[0]===end[0]&&p[1]===end[1])return acc;seen.add(k(p));const ds=DIRS.slice().sort(()=>Math.random()-.5);
   for(const d of ds){const q=[p[0]+d[0],p[1]+d[1]];if(q[0]<0||q[1]<0||q[0]>=c||q[1]>=r||seen.has(k(q)))continue;const res=dfs(q,acc.concat([q]));if(res)return res}return null};
  const res=dfs(start,[start]);if(res&&res.length>=c+r-1&&res.length<=c*r*.75)path=res}
 const g=[];for(let y=0;y<r;y++){g.push([]);for(let x=0;x<c;x++)g[y].push({m:Math.random()<.5?(N|S_):(N|E),on:false,path:false,spin:0})}
 path.forEach((p,i)=>{let m=0;const prev=i?path[i-1]:[p[0],p[1]+1],next=i<path.length-1?path[i+1]:[p[0],p[1]-1];
  for(const q of [prev,next])for(const d of DIRS)if(p[0]+d[0]===q[0]&&p[1]+d[1]===q[1])m|=d[2];g[p[1]][p[0]].m=m;g[p[1]][p[0]].sol=m;g[p[1]][p[0]].path=true});
 g.forEach(row=>row.forEach(t=>{const n=1+Math.floor(Math.random()*3);for(let i=0;i<n;i++)t.m=rot(t.m)}));
 S.g=g;S.walk=null;S.solved=false;flow(S)}
function flow(S){S.g.forEach(row=>row.forEach(t=>t.on=false));let x=0,y=S.r-1,from=S_,steps=[];const seen=new Set();
 while(x>=0&&y>=0&&x<S.c&&y<S.r){const t=S.g[y][x];if(!(t.m&from)||seen.has(x+','+y))break;seen.add(x+','+y);t.on=true;steps.push([x,y]);const out=t.m&~from;let moved=false;
  for(const d of DIRS)if(out&d[2]){if(x===S.c-1&&y===0&&d[2]===N){S.route=steps;return true}x+=d[0];y+=d[1];from=d[3];moved=true;break}if(!moved)break}
 S.route=steps;return false}
function tile(cx,t,x,y,s,tm){cx.save();cx.translate(x+s/2,y+s/2);cx.rotate(-t.spin*Math.PI/2);
 const g=cx.createLinearGradient(-s/2,-s/2,s/2,s/2);g.addColorStop(0,'#5a7a3a');g.addColorStop(1,'#2e4a22');cx.fillStyle=g;cx.beginPath();cx.roundRect(-s/2+2,-s/2+2,s-4,s-4,12);cx.fill();
 cx.fillStyle='rgba(255,255,255,.05)';for(let i=0;i<5;i++){cx.beginPath();cx.arc(((i*37)%s)-s/2,((i*53)%s)-s/2,3,0,6.283);cx.fill()}
 const w=s*.34;cx.lineCap='round';
 const arms=[[0,-1,N],[1,0,E],[0,1,S_],[-1,0,Wd]].filter(a=>t.m&a[2]);
 const drawArms=(col,lw)=>{cx.strokeStyle=col;cx.lineWidth=lw;cx.beginPath();if(arms.length===2&&(arms[0][0]!==-arms[1][0]||arms[0][1]!==-arms[1][1])){const a=arms[0],b=arms[1];cx.moveTo(a[0]*s/2,a[1]*s/2);cx.quadraticCurveTo(0,0,b[0]*s/2,b[1]*s/2)}else arms.forEach(a=>{cx.moveTo(0,0);cx.lineTo(a[0]*s/2,a[1]*s/2)});cx.stroke()};
 drawArms('#3a2a18',w+6);drawArms(t.on?'#ffd35a':'#c9a476',w);if(t.on){cx.save();cx.globalCompositeOperation='lighter';drawArms('rgba(255,220,120,.35)',w+12);cx.restore()}
 cx.fillStyle='rgba(90,60,30,.35)';for(let i=0;i<4;i++){cx.beginPath();cx.arc(Math.sin(i*2.1)*w*.3,Math.cos(i*1.7)*w*.3,2.5,0,6.283);cx.fill()}
 cx.restore()}
function demo(x,w,h,t){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#2a2048');g.addColorStop(1,'#123020');x.fillStyle=g;x.fillRect(0,0,w,h);
 const s=80,ox=w/2-s*1.5,oy=h/2-s/2,spin=Math.min(1,(t%3)/.4),done=(t%3)>.4;
 tile(x,{m:N|S_,on:false,spin:0},ox,oy,s);tile(x,{m:done?(E|Wd):(N|S_),on:done,spin:done?0:-spin*.0},ox+s,oy,s);tile(x,{m:E|Wd,on:done,spin:0},ox+s*2,oy,s);
 if(done){tile(x,{m:E|Wd,on:true,spin:0},ox,oy,s)}AY.finger(x,ox+s*1.5+16,oy+s*.8,(t%3)<.3)}
const api=AG.game({key:'mountain-path',art:'img/ayyappa/river_trail.jpg',L,W,H,demo,demoH:240,video:{en:'1Zo3yL76uYg',kn:'1Zo3yL76uYg',ta:'1Zo3yL76uYg',te:'1Zo3yL76uYg'},music:{sa:146.83,scale:[0,2,4,7,9,12,14,16],tempo:.55},
 init(S,a){BG0=BG0||AG.silhouette(21,'#5a4a7a',300,90,'hill');BG1=BG1||AG.silhouette(23,'#2a2240',360,110,'trees');S.turns=0;S.total=0;makeLevel(S,0);hud(S)},
 down(p,S,a){if(S.solved)return;const x=Math.floor((p.x-S.ox)/S.ts),y=Math.floor((p.y-S.oy)/S.ts);if(x<0||y<0||x>=S.c||y>=S.r)return;
  const t=S.g[y][x];t.m=rot(t.m);t.spin=1;S.turns++;S.total++;DK.tone(300+Math.random()*60,.08,'triangle',.05);
  const ok=flow(S);hud(S);if(ok){S.solved=true;S.walk={i:0,u:0};a.tip('🛕 '+T(L.joined),'good');DK.chime(4);a.burst(S.ox+S.ts*(S.c-.5),S.oy,'#ffd35a',30)}},
 update(dt,S,a){S.g.forEach(row=>row.forEach(t=>{t.spin=Math.max(0,t.spin-dt*7)}));
  if(S.walk){S.walk.u+=dt*3.2;if(S.walk.u>=1){S.walk.u=0;S.walk.i++;if(S.walk.i>=S.route.length){S.walk=null;
    if(S.lv<2){setTimeout(()=>{S.turns=0;makeLevel(S,S.lv+1);hud(S);DK.beat(T(L.hill)+' '+(S.lv+1)+' / 3','ayy-steps',T(L.title))},500)}
    else{DK.win();const best=S.total<=40?3:S.total<=70?2:1;a.finish(best,[`🔄 ${S.total} ${T(L.turns)}`])}}}}},
 draw(cx,t,S,a){AG.sky(cx,W,H,t,{sy:120,sx:W*.25,sr:140,stops:[[0,'#16123a'],[.5,'#3a2a5a'],[1,'#1a2a20']]});if(BG0){AG.tile(cx,BG0,0);AG.tile(cx,BG1,60)}
  AG.panel(cx,S.ox-14,S.oy-14,S.ts*S.c+28,S.ts*S.r+28,22,{fill:'rgba(10,20,10,.55)'});
  for(let y=0;y<S.r;y++)for(let x=0;x<S.c;x++)tile(cx,S.g[y][x],S.ox+x*S.ts,S.oy+y*S.ts,S.ts,t);
  /* river at the start, temple at the end */
  const rx=S.ox+S.ts/2,ry=S.oy+S.ts*S.r+22;const rg=cx.createLinearGradient(0,ry-8,0,ry+30);rg.addColorStop(0,'#5ab8d8');rg.addColorStop(1,'#1a5a7a');cx.fillStyle=rg;cx.beginPath();cx.roundRect(S.ox-14,ry-6,S.ts*1.6,30,12);cx.fill();
  cx.strokeStyle='rgba(255,255,255,.5)';cx.lineWidth=2;for(let i=0;i<3;i++){cx.beginPath();cx.moveTo(S.ox+i*30+((t*30)%30),ry+6+i*6);cx.lineTo(S.ox+i*30+18+((t*30)%30),ry+6+i*6);cx.stroke()}
  AG.text(cx,'🌊 Pamba',rx+10,ry+56,16,'#bfe8ff');
  const tx=S.ox+S.ts*(S.c-.5),ty=S.oy-30;cx.save();cx.translate(tx,ty);cx.fillStyle='#ffd35a';cx.beginPath();cx.moveTo(-30,0);cx.lineTo(-18,-22);cx.lineTo(18,-22);cx.lineTo(30,0);cx.fill();cx.fillStyle='#b8742a';cx.fillRect(-22,0,44,8);cx.fillStyle='#ffe9a0';cx.beginPath();cx.moveTo(0,-38);cx.lineTo(-6,-22);cx.lineTo(6,-22);cx.fill();cx.restore();
  AY.deepam(cx,tx-40,ty+8,7,t,true);AY.deepam(cx,tx+40,ty+8,7,t+1,true);
  /* the swami walking the joined path */
  if(S.walk||S.solved){const r=S.route,i=Math.min(S.walk?S.walk.i:r.length-1,r.length-1),j=Math.min(i+1,r.length-1),u=S.walk?AG.ease(S.walk.u):0;
   const px=S.ox+(r[i][0]+(r[j][0]-r[i][0])*u+.5)*S.ts,py=S.oy+(r[i][1]+(r[j][1]-r[i][1])*u+.5)*S.ts+S.ts*.3;AY.pilgrim(cx,px,py,S.ts*.85,{t:t*1.5,glow:true})}
  else AY.pilgrim(cx,S.ox+S.ts/2,S.oy+S.ts*(S.r-.2),S.ts*.8,{t:0,still:true});
  AG.text(cx,`${T(L.hill)} ${S.lv+1} / 3`,W/2,60,28,'#ffe08a')}});
function hud(S){api.hud([['⛰ '+T(L.hill),(S.lv+1)+'/3'],['🔄 '+T(L.turns),S.total]])}
