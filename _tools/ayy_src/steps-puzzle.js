/*META
{"key":"steps-puzzle","title":{"en":"Steps Puzzle","kn":"ಮೆಟ್ಟಿಲು ಒಗಟು","ta":"படிப் புதிர்","te":"మెట్ల పజిల్"},
 "desc":"Steps Puzzle: a free Ayyappa season sliding puzzle by World of Wonders Studio. Slide the tiles to rebuild paintings of the 18 holy steps and Sabarimala. English, Kannada, Tamil and Telugu.",
 "og":"Slide the tiles and rebuild the 18 holy steps of Sabarimala. Swamiye Sharanam!",
 "genre":["Puzzle","Educational"],"bg":"img/ayyappa/temple_steps.jpg"}
META*/
const T=DK.t;
const L={
 title:{en:'Steps Puzzle',kn:'ಮೆಟ್ಟಿಲು ಒಗಟು',ta:'படிப் புதிர்',te:'మెట్ల పజిల్'},
 storyT:{en:'Pathinettam Padi: the 18 holy steps',kn:'ಪದಿನೆಟ್ಟಾಂ ಪಡಿ: ಹದಿನೆಂಟು ಪವಿತ್ರ ಮೆಟ್ಟಿಲು',ta:'பதினெட்டாம் படி: புனிதப் பதினெட்டுப் படிகள்',te:'పదినెట్టాం పడి: పద్దెనిమిది పవిత్ర మెట్లు'},
 story:{en:['The 18 golden steps lead to Swami\'s shrine. Only a swami who has kept the 41-day vow and carries the Irumudi may climb them.','Many say the 18 steps stand for the senses, the feelings and the qualities a person must rise above. The pictures got jumbled: slide them back!'],
  kn:['ಹದಿನೆಂಟು ಚಿನ್ನದ ಮೆಟ್ಟಿಲು ಸ್ವಾಮಿಯ ಸನ್ನಿಧಿಗೆ ಕರೆದೊಯ್ಯುತ್ತವೆ. 41 ದಿನದ ವ್ರತ ಮಾಡಿ ಇರುಮುಡಿ ಹೊತ್ತ ಸ್ವಾಮಿ ಮಾತ್ರ ಅವನ್ನು ಹತ್ತಬಹುದು.','ಹದಿನೆಂಟು ಮೆಟ್ಟಿಲು ಮನುಷ್ಯ ಗೆಲ್ಲಬೇಕಾದ ಇಂದ್ರಿಯ, ಭಾವನೆ, ಗುಣಗಳನ್ನು ಸೂಚಿಸುತ್ತವೆ ಎನ್ನುತ್ತಾರೆ. ಚಿತ್ರಗಳು ಕಲಸಿಹೋಗಿವೆ: ಸರಿಸಿ ಜೋಡಿಸಿ!'],
  ta:['பதினெட்டுப் பொன் படிகள் சுவாமியின் சன்னதிக்கு அழைத்துச் செல்கின்றன. 41 நாள் விரதம் இருந்து இருமுடி சுமந்த சாமி மட்டுமே அவற்றில் ஏறலாம்.','பதினெட்டுப் படிகள் மனிதன் வெல்ல வேண்டிய புலன்கள், உணர்வுகள், குணங்களைக் குறிக்கின்றன என்கிறார்கள். படங்கள் கலைந்துவிட்டன: நகர்த்திச் சேருங்கள்!'],
  te:['పద్దెనిమిది బంగారు మెట్లు స్వామి సన్నిధికి దారి తీస్తాయి. 41 రోజుల దీక్ష చేసి ఇరుముడి మోసిన స్వామి మాత్రమే వాటిని ఎక్కగలడు.','పద్దెనిమిది మెట్లు మనిషి జయించాల్సిన ఇంద్రియాలు, భావాలు, గుణాలను సూచిస్తాయని అంటారు. చిత్రాలు చెదిరిపోయాయి: జరిపి సరిచేయండి!']},
 how:{en:['Tap a tile next to the empty space to slide it.','Put the picture back together. Peek at the small picture any time.','Three pictures: 3×3, 3×3 and 4×4. Fewer moves earn more stars.'],
  kn:['ಖಾಲಿ ಜಾಗದ ಪಕ್ಕದ ತುಂಡನ್ನು ಮುಟ್ಟಿ ಸರಿಸಿ.','ಚಿತ್ರವನ್ನು ಮತ್ತೆ ಜೋಡಿಸಿ. ಸಣ್ಣ ಚಿತ್ರವನ್ನು ಯಾವಾಗ ಬೇಕಾದರೂ ನೋಡಿ.','ಮೂರು ಚಿತ್ರ: 3×3, 3×3, 4×4. ಕಡಿಮೆ ಚಲನೆಗೆ ಹೆಚ್ಚು ನಕ್ಷತ್ರ.'],
  ta:['வெற்று இடத்துக்கு அருகில் உள்ள துண்டைத் தட்டி நகர்த்துங்கள்.','படத்தை மீண்டும் சேருங்கள். சிறிய படத்தை எப்போது வேண்டுமானாலும் பாருங்கள்.','மூன்று படங்கள்: 3×3, 3×3, 4×4. குறைந்த நகர்வுகளுக்கு அதிக நட்சத்திரங்கள்.'],
  te:['ఖాళీ స్థలం పక్కన ఉన్న ముక్కను తాకి జరపండి.','చిత్రాన్ని మళ్ళీ అమర్చండి. చిన్న చిత్రాన్ని ఎప్పుడైనా చూడండి.','మూడు చిత్రాలు: 3×3, 3×3, 4×4. తక్కువ కదలికలకు ఎక్కువ నక్షత్రాలు.']},
 moves:{en:'Moves',kn:'ಚಲನೆ',ta:'நகர்வு',te:'కదలికలు'},pic:{en:'Picture',kn:'ಚಿತ್ರ',ta:'படம்',te:'చిత్రం'},
 done:{en:'Picture complete! Swamiye Sharanam',kn:'ಚಿತ್ರ ಪೂರ್ಣ! ಸ್ವಾಮಿಯೇ ಶರಣಂ',ta:'படம் முழுமை! சுவாமியே சரணம்',te:'చిత్రం పూర్తి! స్వామియే శరణం'},
 endT:{en:'All three pictures complete!',kn:'ಮೂರೂ ಚಿತ್ರ ಪೂರ್ಣ!',ta:'மூன்று படங்களும் முழுமை!',te:'మూడు చిత్రాలూ పూర్తి!'},
 endP:{en:'Before climbing, a swami breaks a coconut at the foot of the steps. On the way down, swamis walk backwards, facing Swami, as a mark of respect.',kn:'ಹತ್ತುವ ಮೊದಲು ಸ್ವಾಮಿ ಮೆಟ್ಟಿಲ ಬುಡದಲ್ಲಿ ತೆಂಗಿನಕಾಯಿ ಒಡೆಯುತ್ತಾನೆ. ಇಳಿಯುವಾಗ ಗೌರವದಿಂದ ಸ್ವಾಮಿಯ ಕಡೆ ಮುಖ ಮಾಡಿ ಹಿಮ್ಮುಖವಾಗಿ ಇಳಿಯುತ್ತಾರೆ.',ta:'ஏறும் முன் சாமி படியின் அடியில் தேங்காய் உடைக்கிறார். இறங்கும்போது மரியாதையுடன் சுவாமியை நோக்கியபடி பின்னோக்கி இறங்குகிறார்கள்.',te:'ఎక్కే ముందు స్వామి మెట్ల కింద కొబ్బరికాయ కొడతాడు. దిగేటప్పుడు గౌరవంతో స్వామి వైపు చూస్తూ వెనక్కి దిగుతారు.'},
 shareText:{en:'I rebuilt the 18 holy steps! Try the puzzle, Swamiye Sharanam:',kn:'ನಾನು ಹದಿನೆಂಟು ಮೆಟ್ಟಿಲ ಚಿತ್ರ ಜೋಡಿಸಿದೆ! ನೀವೂ ಆಡಿ, ಸ್ವಾಮಿಯೇ ಶರಣಂ:',ta:'நான் பதினெட்டுப் படிப் படத்தைச் சேர்த்தேன்! நீங்களும் விளையாடுங்கள், சுவாமியே சரணம்:',te:'నేను పద్దెనిమిది మెట్ల చిత్రాన్ని అమర్చాను! మీరూ ఆడండి, స్వామియే శరణం:'}
};
const W=480,H=760,PICS=[['img/ayyappa/steps_v.jpg',3,[.18,.38,.64,.4]],['img/ayyappa_hero.jpg',3,[.2,0,.6,1]],['img/ayyappa_lamps.jpg',4,[.2,0,.6,1]]];
const BX=40,BY=150,BS=400;
function setPic(S,i){const [src,n,crop]=PICS[i];S.pi=i;S.n=n;S.src=src;S.crop=crop;S.tiles=[];for(let k=0;k<n*n;k++)S.tiles.push(k);S.blank=n*n-1;S.anim=null;S.solved=false;
 /* shuffle with legal moves so it is always solvable */let b=S.blank,last=-1;for(let m=0;m<(n===3?80:160);m++){const nb=nbrs(b,n).filter(x=>x!==last);const pick=nb[Math.floor(Math.random()*nb.length)];[S.tiles[b],S.tiles[pick]]=[S.tiles[pick],S.tiles[b]];last=b;b=pick}
 S.bpos=b;if(isDone(S))setPic(S,i)}
function nbrs(b,n){const x=b%n,y=Math.floor(b/n),r=[];if(x>0)r.push(b-1);if(x<n-1)r.push(b+1);if(y>0)r.push(b-n);if(y<n-1)r.push(b+n);return r}
function isDone(S){return S.tiles.every((v,i)=>v===i)}
function drawTile(cx,S,v,x,y,s){const im=AG.img(S.src);if(!im.complete||!im.naturalWidth)return;const [cx0,cy0,cw,ch]=S.crop,iw=im.naturalWidth*cw,ih=im.naturalHeight*ch,side=Math.min(iw,ih),ox=im.naturalWidth*cx0+(iw-side)/2,oy=im.naturalHeight*cy0+(ih-side)/2,ts=side/S.n;
 const sx=ox+(v%S.n)*ts,sy=oy+Math.floor(v/S.n)*ts;cx.save();cx.beginPath();cx.roundRect(x+2,y+2,s-4,s-4,10);cx.clip();cx.drawImage(im,sx,sy,ts,ts,x,y,s,s);
 const g=cx.createLinearGradient(x,y,x+s,y+s);g.addColorStop(0,'rgba(255,255,255,.18)');g.addColorStop(.4,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.25)');cx.fillStyle=g;cx.fillRect(x,y,s,s);cx.restore();
 cx.strokeStyle='rgba(255,224,138,.55)';cx.lineWidth=2;cx.beginPath();cx.roundRect(x+2,y+2,s-4,s-4,10);cx.stroke()}
function demo(x,w,h,t){const S={n:3,src:'img/ayyappa/steps_v.jpg',crop:[.18,.38,.64,.4]};x.fillStyle='#1c1442';x.fillRect(0,0,w,h);const s=70,ox=w/2-s*1.5,oy=h/2-s*1.5+10,u=AG.ease((t%2.5)/.6);
 for(let k=0;k<8;k++){let gx=k%3,gy=Math.floor(k/3);let xx=ox+gx*s,yy=oy+gy*s;if(k===7){xx=ox+(1+u)*s}drawTile(x,S,k===7?7:k,xx,yy,s)}AY.finger(x,ox+(1.5+u)*s+10,oy+2.6*s,(t%2.5)<.3)}
const api=AG.game({key:'steps-puzzle',art:'img/ayyappa/temple_steps.jpg',L,W,H,demo,demoH:280,video:{en:'_Ig9Mpqf9hc',kn:'_Ig9Mpqf9hc',ta:'_Ig9Mpqf9hc',te:'_Ig9Mpqf9hc'},music:{sa:146.83,scale:[0,2,4,7,9,12,14,16],tempo:.5},
 init(S,a){S.moves=0;S.total=0;S.peek=false;setPic(S,0);PICS.forEach(p=>AG.img(p[0]));hud(S)},
 down(p,S,a){if(S.solved||S.anim)return;if(p.y>BY+BS+20&&p.y<BY+BS+130&&p.x>W-150){S.peek=true;return}
  const s=BS/S.n,gx=Math.floor((p.x-BX)/s),gy=Math.floor((p.y-BY)/s);if(gx<0||gy<0||gx>=S.n||gy>=S.n)return;const i=gy*S.n+gx;
  if(!nbrs(S.bpos,S.n).includes(i)){DK.tone(200,.08,'sine',.04);return}
  S.anim={from:i,to:S.bpos,u:0,v:S.tiles[i]};S.tiles[S.bpos]=S.tiles[i];S.tiles[i]=S.n*S.n-1;S.bpos=i;S.moves++;S.total++;DK.tone(420+Math.random()*80,.06,'triangle',.05);hud(S)},
 up(p,S){S.peek=false},
 update(dt,S,a){if(S.anim){S.anim.u+=dt*9;if(S.anim.u>=1){S.anim=null;if(isDone(S)){S.solved=true;DK.chime(5);a.tip('🖼 '+T(L.done),'good');a.burst(W/2,BY+BS/2,'#ffd35a',40);
   setTimeout(()=>{if(S.pi<2){setPic(S,S.pi+1);S.moves=0;hud(S)}else{DK.win();const st=S.total<=160?3:S.total<=280?2:1;a.finish(st,[`🧩 ${S.total} ${T(L.moves)}`])}},1800)}}}},
 draw(cx,t,S,a){AG.sky(cx,W,H,t,{sy:90,sr:160,stops:[[0,'#1a1440'],[.6,'#2e1e4e'],[1,'#120a22']]});
  AG.panel(cx,BX-12,BY-12,BS+24,BS+24,22,{fill:'rgba(10,6,20,.7)'});const s=BS/S.n;
  if(S.solved){const im=AG.img(S.src);S.tiles.forEach((v,i)=>drawTile(cx,S,v,BX+(i%S.n)*s,BY+Math.floor(i/S.n)*s,s));cx.save();cx.globalCompositeOperation='lighter';cx.fillStyle=`rgba(255,220,130,${.2+.15*Math.sin(t*4)})`;cx.fillRect(BX,BY,BS,BS);cx.restore()}
  else S.tiles.forEach((v,i)=>{if(v===S.n*S.n-1)return;let x=BX+(i%S.n)*s,y=BY+Math.floor(i/S.n)*s;
   if(S.anim&&i===S.anim.to){const fx=BX+(S.anim.from%S.n)*s,fy=BY+Math.floor(S.anim.from/S.n)*s,u=AG.ease(S.anim.u);x=fx+(x-fx)*u;y=fy+(y-fy)*u}drawTile(cx,S,v,x,y,s)});
  /* the small picture to peek at */
  const pw=120,px=W-pw-24,py=BY+BS+30;AG.panel(cx,px-6,py-6,pw+12,pw+12,14);const tmp={n:1,src:S.src,crop:S.crop};drawTile(cx,tmp,0,px,py,pw);
  if(S.peek){AG.panel(cx,BX-12,BY-12,BS+24,BS+24,22,{fill:'rgba(10,6,20,.9)'});drawTile(cx,{n:1,src:S.src,crop:S.crop},0,BX,BY,BS)}
  AG.text(cx,`${T(L.pic)} ${S.pi+1} / 3`,W/2,90,30,'#ffe08a');AG.text(cx,`🧩 ${S.moves}`,120,BY+BS+90,30,'#fff');AG.text(cx,'👁',px+pw/2,py+pw+30,20,'#ffe08a',{lw:0})}});
function hud(S){api.hud([['🖼 '+T(L.pic),(S.pi+1)+'/3'],['🧩 '+T(L.moves),S.total]])}
