/*META
{"key":"tiger-ride","title":{"en":"Tiger Ride","kn":"ಹುಲಿ ಸವಾರಿ","ta":"புலிச் சவாரி","te":"పులి స్వారీ"},
 "desc":"Tiger Ride: a free Ayyappa season game by World of Wonders Studio. Young Manikanta rides home through the forest on a tiger with the tigress milk. Tap to jump over thorns, rocks and logs, collect the milk pots and reach Pandalam. English, Kannada, Tamil and Telugu.",
 "og":"Ride the tiger with Manikanta, jump the thorns and bring the milk home to Pandalam. Swamiye Sharanam!",
 "genre":["Action","Educational"],"bg":"img/ayyappa/forest_crowd.jpg"}
META*/
const T=DK.t;
const L={
 title:{en:'Tiger Ride',kn:'ಹುಲಿ ಸವಾರಿ',ta:'புலிச் சவாரி',te:'పులి స్వారీ'},
 storyT:{en:'Manikanta brings the tigress milk',kn:'ಮಣಿಕಂಠ ಹುಲಿಯ ಹಾಲು ತರುತ್ತಾನೆ',ta:'மணிகண்டன் புலிப்பால் கொண்டு வருகிறான்',te:'మణికంఠుడు పులి పాలు తెస్తాడు'},
 story:{en:['The queen of Pandalam was told that only <b>tigress milk</b> could cure her. Young <b>Manikanta</b> went alone into the forest.','He came home <b>riding a tiger</b>, with the whole herd behind him! Help him ride back to Pandalam.'],
  kn:['ಪಂದಳದ ರಾಣಿಗೆ <b>ಹುಲಿಯ ಹಾಲು</b> ಮಾತ್ರ ಔಷಧಿ ಎಂದು ಹೇಳಲಾಯಿತು. ಪುಟ್ಟ <b>ಮಣಿಕಂಠ</b> ಒಬ್ಬನೇ ಕಾಡಿಗೆ ಹೋದ.','ಅವನು <b>ಹುಲಿಯ ಮೇಲೆ ಕುಳಿತು</b> ಮನೆಗೆ ಬಂದ, ಹಿಂದೆ ಹುಲಿಗಳ ಹಿಂಡೇ ಇತ್ತು! ಪಂದಳಕ್ಕೆ ಹಿಂತಿರುಗಲು ಅವನಿಗೆ ಸಹಾಯ ಮಾಡಿ.'],
  ta:['பந்தள அரசிக்கு <b>புலிப்பால்</b> மட்டுமே மருந்து என்று சொல்லப்பட்டது. சிறுவன் <b>மணிகண்டன்</b> தனியாகக் காட்டுக்குச் சென்றான்.','அவன் <b>புலியின் மேல் ஏறி</b> வீடு திரும்பினான், பின்னால் புலிக் கூட்டமே வந்தது! பந்தளத்துக்குத் திரும்ப அவனுக்கு உதவுங்கள்.'],
  te:['పందళ రాణికి <b>పులి పాలు</b> మాత్రమే మందు అని చెప్పారు. చిన్న <b>మణికంఠుడు</b> ఒంటరిగా అడవికి వెళ్ళాడు.','అతను <b>పులి మీద ఎక్కి</b> ఇంటికి వచ్చాడు, వెనుక పులుల గుంపే వచ్చింది! పందళానికి తిరిగి వెళ్ళడానికి అతనికి సహాయం చేయండి.']},
 how:{en:['Tap anywhere to jump. Tap again in the air for a second jump.','Jump over thorn bushes, rocks and logs.','Collect the milk pots 🥛 and reach the palace of Pandalam!'],
  kn:['ಎಲ್ಲಿಯಾದರೂ ಮುಟ್ಟಿ ಜಿಗಿಯಿರಿ. ಗಾಳಿಯಲ್ಲಿ ಇನ್ನೊಮ್ಮೆ ಮುಟ್ಟಿದರೆ ಎರಡನೇ ಜಿಗಿತ.','ಮುಳ್ಳುಪೊದೆ, ಕಲ್ಲು, ಮರದ ದಿಮ್ಮಿಗಳ ಮೇಲೆ ಜಿಗಿಯಿರಿ.','ಹಾಲಿನ ಗಡಿಗೆ 🥛 ಸಂಗ್ರಹಿಸಿ, ಪಂದಳದ ಅರಮನೆ ತಲುಪಿ!'],
  ta:['எங்கேனும் தட்டினால் தாவும். காற்றில் மீண்டும் தட்டினால் இரண்டாவது தாவல்.','முள்புதர், பாறை, மரக்கட்டைகளைத் தாண்டுங்கள்.','பால் குடங்களை 🥛 சேகரித்து பந்தள அரண்மனையை அடையுங்கள்!'],
  te:['ఎక్కడైనా తాకితే దూకుతుంది. గాలిలో మళ్ళీ తాకితే రెండో దూకు.','ముళ్ళ పొదలు, రాళ్ళు, దుంగల మీదుగా దూకండి.','పాల కుండలు 🥛 సేకరించి, పందళ రాజభవనం చేరండి!']},
 go:{en:'Ride! 🐅',kn:'ಸವಾರಿ! 🐅',ta:'சவாரி! 🐅',te:'స్వారీ! 🐅'},
 milk:{en:'Milk',kn:'ಹಾಲು',ta:'பால்',te:'పాలు'},
 dist:{en:'To Pandalam',kn:'ಪಂದಳಕ್ಕೆ',ta:'பந்தளத்துக்கு',te:'పందళానికి'},
 rest:{en:'Manikanta rests a moment… and rides again!',kn:'ಮಣಿಕಂಠ ಸ್ವಲ್ಪ ವಿಶ್ರಮಿಸಿ… ಮತ್ತೆ ಹೊರಟ!',ta:'மணிகண்டன் சற்று ஓய்வெடுத்து… மீண்டும் புறப்பட்டான்!',te:'మణికంఠుడు కాసేపు విశ్రమించి… మళ్ళీ బయలుదేరాడు!'},
 near:{en:'The palace is near!',kn:'ಅರಮನೆ ಹತ್ತಿರ ಬಂತು!',ta:'அரண்மனை அருகில்!',te:'రాజభవనం దగ్గరైంది!'},
 bell:{en:'Golden bell! +5',kn:'ಚಿನ್ನದ ಗಂಟೆ! +5',ta:'தங்க மணி! +5',te:'బంగారు గంట! +5'},
 endT:{en:'Manikanta is home!',kn:'ಮಣಿಕಂಠ ಮನೆಗೆ ಬಂದ!',ta:'மணிகண்டன் வீடு திரும்பினான்!',te:'మణికంఠుడు ఇంటికి వచ్చాడు!'},
 endP:{en:'The people of Pandalam saw the boy on the tiger and knew he was no ordinary child. He was Ayyappa, the son of Hari and Hara.',kn:'ಹುಲಿಯ ಮೇಲೆ ಬಂದ ಹುಡುಗನನ್ನು ನೋಡಿ ಪಂದಳದ ಜನರು ಇವನು ಸಾಮಾನ್ಯ ಮಗುವಲ್ಲ ಎಂದು ಅರಿತರು. ಅವನೇ ಹರಿಹರರ ಮಗ ಅಯ್ಯಪ್ಪ.',ta:'புலியின் மேல் வந்த சிறுவனைக் கண்டு பந்தள மக்கள் இவன் சாதாரணக் குழந்தை அல்ல என்று உணர்ந்தனர். அவனே ஹரிஹரனின் மகன் ஐயப்பன்.',te:'పులి మీద వచ్చిన బాలుడిని చూసి పందళ ప్రజలు ఇతను సాధారణ బిడ్డ కాదని గ్రహించారు. అతనే హరిహరుల కుమారుడు అయ్యప్ప.'},
 got:{en:'milk pots',kn:'ಹಾಲಿನ ಗಡಿಗೆಗಳು',ta:'பால் குடங்கள்',te:'పాల కుండలు'},
 shareText:{en:'I rode the tiger home with Manikanta! Try it, Swamiye Sharanam:',kn:'ನಾನು ಮಣಿಕಂಠನ ಜೊತೆ ಹುಲಿ ಸವಾರಿ ಮಾಡಿದೆ! ನೀವೂ ಆಡಿ, ಸ್ವಾಮಿಯೇ ಶರಣಂ:',ta:'நான் மணிகண்டனுடன் புலிச் சவாரி செய்தேன்! நீங்களும் விளையாடுங்கள், சுவாமியே சரணம்:',te:'నేను మణికంఠుడితో పులి స్వారీ చేశాను! మీరూ ఆడండి, స్వామియే శరణం:'}
};
const W=480,H=760,GY=612,GOAL=1500,TX=120;
/* ---------- drawing: tiger and rider (our own art) ---------- */
function tiger(cx,x,y,s,ph,o){o=o||{};cx.save();cx.translate(x,y);cx.scale(s,s);
 const sg=cx.createRadialGradient(0,4,4,0,4,90);sg.addColorStop(0,'rgba(0,0,0,.45)');sg.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=sg;cx.beginPath();cx.ellipse(0,4,90,12,0,0,6.283);cx.fill();
 const air=o.air||0;cx.translate(0,-Math.abs(Math.sin(ph))*6*(1-air));
 function leg(px,py,a,len,back){cx.save();cx.translate(px,py);cx.rotate(a);const g=cx.createLinearGradient(-8,0,8,0);g.addColorStop(0,back?'#b4501a':'#d9661c');g.addColorStop(1,back?'#8a3a10':'#b24d14');cx.fillStyle=g;cx.beginPath();cx.moveTo(-9,0);cx.quadraticCurveTo(-11,len*.5,-6,len);cx.lineTo(7,len);cx.quadraticCurveTo(10,len*.5,9,0);cx.fill();
  cx.fillStyle=back?'#e6d4b8':'#fbecd4';cx.beginPath();cx.ellipse(1,len,10,5.5,0,0,6.283);cx.fill();cx.strokeStyle='#2a1408';cx.lineWidth=3;cx.beginPath();cx.moveTo(-6,len*.35);cx.lineTo(6,len*.42);cx.stroke();cx.restore()}
 const sw=air?.6:Math.sin(ph),sw2=air?-.5:Math.sin(ph+Math.PI);
 leg(-48,-40,sw2*.55,42,true);leg(42,-40,sw*.55,42,true);
 /* tail */
 cx.strokeStyle='#d9661c';cx.lineWidth=9;cx.lineCap='round';cx.beginPath();cx.moveTo(-66,-58);cx.bezierCurveTo(-96,-70,-104,-40+Math.sin(ph*.5)*12,-120,-58+Math.sin(ph*.5)*10);cx.stroke();
 cx.strokeStyle='#2a1408';cx.lineWidth=9;cx.setLineDash([5,8]);cx.beginPath();cx.moveTo(-70,-60);cx.bezierCurveTo(-96,-70,-104,-40+Math.sin(ph*.5)*12,-120,-58+Math.sin(ph*.5)*10);cx.stroke();cx.setLineDash([]);
 /* body */
 const bg=cx.createLinearGradient(0,-92,0,-26);bg.addColorStop(0,'#ffb347');bg.addColorStop(.55,'#ea7a22');bg.addColorStop(1,'#c4561a');cx.fillStyle=bg;
 cx.beginPath();cx.moveTo(-70,-58);cx.bezierCurveTo(-70,-90,30,-96,66,-74);cx.bezierCurveTo(78,-60,70,-34,52,-30);cx.bezierCurveTo(20,-24,-30,-24,-56,-30);cx.bezierCurveTo(-72,-36,-74,-48,-70,-58);cx.fill();
 cx.save();cx.clip();cx.fillStyle='#fdf0dc';cx.beginPath();cx.ellipse(0,-22,70,14,0,0,6.283);cx.fill();
 cx.strokeStyle='#22100a';cx.lineCap='round';[-54,-38,-22,-6,10,26,40].forEach((sx,i)=>{cx.lineWidth=5+(i%2)*2;cx.beginPath();cx.moveTo(sx,-96);cx.quadraticCurveTo(sx+8,-74,sx-2,-54+(i%3)*4);cx.stroke()});
 cx.fillStyle='rgba(255,255,255,.18)';cx.beginPath();cx.ellipse(-6,-82,52,7,-.05,0,6.283);cx.fill();cx.restore();
 leg(-40,-38,sw*.6,46,false);leg(50,-40,sw2*.6,46,false);
 /* head */
 cx.save();cx.translate(80,-74);cx.rotate(Math.sin(ph)*.04);
 cx.fillStyle='#ea7a22';cx.beginPath();cx.moveTo(-12,-24);cx.lineTo(-4,-36);cx.lineTo(4,-22);cx.fill();cx.beginPath();cx.moveTo(8,-24);cx.lineTo(18,-34);cx.lineTo(20,-18);cx.fill();
 cx.fillStyle='#f6b2a8';cx.beginPath();cx.moveTo(-8,-25);cx.lineTo(-4,-31);cx.lineTo(0,-24);cx.fill();
 const hg=cx.createRadialGradient(-4,-10,4,4,-4,30);hg.addColorStop(0,'#ffb347');hg.addColorStop(1,'#d9661c');cx.fillStyle=hg;cx.beginPath();cx.ellipse(4,-6,28,24,0,0,6.283);cx.fill();
 cx.fillStyle='#fdf0dc';cx.beginPath();cx.ellipse(16,6,20,12,0,0,6.283);cx.fill();cx.beginPath();cx.ellipse(-8,4,10,8,0,0,6.283);cx.fill();
 cx.strokeStyle='#22100a';cx.lineWidth=3;[[-6,-26,-2,-14],[2,-28,4,-16],[10,-26,8,-15]].forEach(a=>{cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(a[2],a[3]);cx.stroke()});
 cx.beginPath();cx.moveTo(-20,-4);cx.lineTo(-10,-2);cx.moveTo(-20,4);cx.lineTo(-10,3);cx.stroke();
 cx.fillStyle='#ffd23a';cx.beginPath();cx.ellipse(12,-10,5,4,0,0,6.283);cx.fill();cx.fillStyle='#111';cx.beginPath();cx.ellipse(13,-10,1.8,3.2,0,0,6.283);cx.fill();
 cx.fillStyle='#e98a8a';cx.beginPath();cx.moveTo(26,-2);cx.lineTo(34,-4);cx.lineTo(30,4);cx.fill();cx.strokeStyle='#5a2a14';cx.lineWidth=2;cx.beginPath();cx.moveTo(30,4);cx.quadraticCurveTo(26,12,18,12);cx.stroke();
 cx.restore();
 /* Manikanta on the tiger: yellow silk, red sash, small golden crown, bow on the back */
 cx.save();cx.translate(-4,-92);cx.rotate(-.06+Math.sin(ph)*.03);
 cx.strokeStyle='#8a5a10';cx.lineWidth=3;cx.beginPath();cx.arc(-14,-30,30,-1.9,1.1);cx.stroke();cx.strokeStyle='rgba(255,240,200,.7)';cx.lineWidth=1;cx.beginPath();cx.moveTo(-28,-57);cx.lineTo(-2,0);cx.stroke();
 cx.fillStyle='#8a5a3c';cx.beginPath();cx.moveTo(-2,-2);cx.quadraticCurveTo(10,10,6,26);cx.lineTo(14,26);cx.quadraticCurveTo(18,8,8,-4);cx.fill();
 const yg=cx.createLinearGradient(-14,-40,14,0);yg.addColorStop(0,'#ffe066');yg.addColorStop(1,'#e0a10a');cx.fillStyle=yg;cx.beginPath();cx.moveTo(-14,4);cx.quadraticCurveTo(-16,-24,-8,-40);cx.lineTo(8,-40);cx.quadraticCurveTo(16,-24,14,4);cx.closePath();cx.fill();
 cx.fillStyle='#c8162c';cx.beginPath();cx.moveTo(-12,-34);cx.lineTo(-6,-38);cx.lineTo(12,-4);cx.lineTo(6,0);cx.fill();
 cx.strokeStyle='#8a5a3c';cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.moveTo(6,-34);cx.quadraticCurveTo(22,-26,30,-16);cx.stroke();
 cx.strokeStyle='#f0d070';cx.lineWidth=2;cx.setLineDash([2,2]);cx.beginPath();cx.arc(0,-38,7,.3,2.8);cx.stroke();cx.setLineDash([]);
 cx.fillStyle='#8a5a3c';cx.beginPath();cx.arc(0,-50,10,0,6.283);cx.fill();cx.fillStyle='#1b1410';cx.beginPath();cx.arc(-2,-52,10,Math.PI*.9,Math.PI*1.9);cx.fill();
 cx.fillStyle='#fff3c4';cx.beginPath();cx.arc(5,-51,1.6,0,6.283);cx.fill();cx.fillStyle='#d2283a';cx.fillRect(4,-58,2,3);
 const cg=cx.createLinearGradient(0,-74,0,-58);cg.addColorStop(0,'#fff2a8');cg.addColorStop(1,'#c8901a');cx.fillStyle=cg;cx.beginPath();cx.moveTo(-9,-58);cx.lineTo(-7,-68);cx.lineTo(-3,-63);cx.lineTo(0,-74);cx.lineTo(3,-63);cx.lineTo(7,-68);cx.lineTo(9,-58);cx.closePath();cx.fill();cx.fillStyle='#d2283a';cx.beginPath();cx.arc(0,-62,1.8,0,6.283);cx.fill();
 cx.restore();cx.restore()}
function pot(cx,x,y,s,t){cx.save();cx.translate(x,y+Math.sin(t*4+x*.02)*4);cx.scale(s,s);const gl=cx.createRadialGradient(0,0,4,0,0,34);gl.addColorStop(0,'rgba(255,240,190,.5)');gl.addColorStop(1,'rgba(255,240,190,0)');cx.fillStyle=gl;cx.beginPath();cx.arc(0,0,34,0,6.283);cx.fill();
 const g=cx.createLinearGradient(-16,0,16,0);g.addColorStop(0,'#8a5212');g.addColorStop(.4,'#ffd27a');g.addColorStop(1,'#7a440e');cx.fillStyle=g;cx.beginPath();cx.moveTo(-8,-12);cx.quadraticCurveTo(-20,-4,-17,8);cx.quadraticCurveTo(0,22,17,8);cx.quadraticCurveTo(20,-4,8,-12);cx.closePath();cx.fill();
 cx.fillStyle='#c98a2a';cx.fillRect(-9,-16,18,5);cx.fillStyle='#fffaf0';cx.beginPath();cx.ellipse(0,-17,10,4,0,0,6.283);cx.fill();cx.beginPath();cx.arc(-4,-19,3,0,6.283);cx.arc(3,-20,3.5,0,6.283);cx.fill();cx.restore()}
function obstacle(cx,o,t){cx.save();cx.translate(o.x,o.gy||GY);if(o.s)cx.scale(o.s,o.s);
 cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.ellipse(0,2,o.w*.6,7,0,0,6.283);cx.fill();
 if(o.k==='bush'){[[-16,-20,22],[12,-22,24],[0,-36,22]].forEach(b=>{const g=cx.createRadialGradient(b[0]-6,b[1]-6,2,b[0],b[1],b[2]);g.addColorStop(0,'#5a9a3a');g.addColorStop(1,'#1e4a1a');cx.fillStyle=g;cx.beginPath();cx.arc(b[0],b[1],b[2],0,6.283);cx.fill()});
  cx.strokeStyle='#e8dcb0';cx.lineWidth=2;for(let i=0;i<14;i++){const a=i/14*6.283;cx.beginPath();cx.moveTo(Math.cos(a)*22,-26+Math.sin(a)*20);cx.lineTo(Math.cos(a)*32,-26+Math.sin(a)*28);cx.stroke()}
  cx.fillStyle='#d2283a';[[-10,-30],[14,-18],[4,-48],[-22,-14]].forEach(p=>{cx.beginPath();cx.arc(p[0],p[1],3,0,6.283);cx.fill()})}
 else if(o.k==='rock'){const g=cx.createRadialGradient(-10,-34,4,0,-20,40);g.addColorStop(0,'#b8b0a4');g.addColorStop(1,'#4a4440');cx.fillStyle=g;cx.beginPath();cx.moveTo(-30,0);cx.quadraticCurveTo(-34,-34,-6,-44);cx.quadraticCurveTo(24,-46,30,-16);cx.quadraticCurveTo(32,0,30,0);cx.closePath();cx.fill();cx.fillStyle='rgba(90,140,60,.6)';cx.beginPath();cx.ellipse(-8,-40,14,5,-.2,0,6.283);cx.fill()}
 else{const g=cx.createLinearGradient(0,-34,0,0);g.addColorStop(0,'#9a6a3a');g.addColorStop(1,'#4a2c14');cx.fillStyle=g;cx.beginPath();cx.roundRect(-o.w/2,-30,o.w,30,12);cx.fill();cx.fillStyle='#c8945a';cx.beginPath();cx.ellipse(o.w/2-4,-15,9,15,0,0,6.283);cx.fill();cx.strokeStyle='#8a5a2a';cx.lineWidth=2;cx.beginPath();cx.ellipse(o.w/2-4,-15,5,9,0,0,6.283);cx.stroke();
  cx.strokeStyle='rgba(30,15,5,.4)';cx.beginPath();cx.moveTo(-o.w/2+10,-20);cx.lineTo(o.w/2-16,-22);cx.moveTo(-o.w/2+16,-10);cx.lineTo(o.w/2-20,-8);cx.stroke()}
 cx.restore()}
function palace(cx,x,t){cx.save();cx.translate(x,GY);const g=cx.createLinearGradient(0,-260,0,0);g.addColorStop(0,'#f4d9a0');g.addColorStop(1,'#c9a066');cx.fillStyle=g;cx.fillRect(-10,-150,300,150);
 cx.fillStyle='#7a3a1a';const roof=(y,w,h,dx)=>{cx.beginPath();cx.moveTo(dx-w,y);cx.lineTo(dx-w*.6,y-h);cx.lineTo(dx+w*.6,y-h);cx.lineTo(dx+w,y);cx.fill()};roof(-150,190,50,140);cx.fillStyle='#9a4a1e';roof(-196,120,40,140);
 cx.fillStyle='#ffd35a';cx.beginPath();cx.moveTo(140,-262);cx.lineTo(132,-236);cx.lineTo(148,-236);cx.fill();
 cx.fillStyle='#3a1a0a';cx.beginPath();cx.moveTo(40,0);cx.lineTo(40,-90);cx.quadraticCurveTo(70,-122,100,-90);cx.lineTo(100,0);cx.fill();
 for(let i=0;i<5;i++){cx.fillStyle='#fff3c4';cx.fillRect(130+i*30,-120,14,40)}
 for(let i=0;i<6;i++)AY.deepam(cx,-4+i*58,-4,8,t+i,true);cx.restore()}
/* far forest layers, drawn once into canvases and scrolled */
/* parallax silhouettes (Alto-style): every layer tiles seamlessly over 960 px */
function layer(seed,col,base,amp,kind){const c=document.createElement('canvas');c.width=960;c.height=H;const x=c.getContext('2d');let r=seed;const rn=()=>{r=(r*16807)%2147483647;return r/2147483647};
 const ph=[rn()*6,rn()*6,rn()*6],P=960;x.fillStyle=col;x.beginPath();x.moveTo(0,H);
 for(let i=0;i<=P;i+=4){let y=base;if(kind==='hill')y-=amp*(.55*Math.sin(i/P*6.283*2+ph[0])+.3*Math.sin(i/P*6.283*5+ph[1])+.15*Math.sin(i/P*6.283*11+ph[2]));
  else{y-=amp*(.5+.5*Math.sin(i/P*6.283*3+ph[0]))*.4;y-=Math.abs(Math.sin(i/P*6.283*24+ph[1]))*amp*.35+Math.abs(Math.sin(i/P*6.283*57+ph[2]))*amp*.15}
  x.lineTo(i,y)}x.lineTo(P,H);x.fill();
 if(kind==='trees'){/* a few tall palms above the canopy */for(let k=0;k<6;k++){const tx=(k+.3+rn()*.4)*P/6,th=amp*1.4+rn()*amp;x.fillRect(tx,base-th,5,th);x.fillStyle=col;for(let j=0;j<11;j++){const an=-Math.PI*.95+j/10*Math.PI*.9,dx=Math.cos(an),L=44+rn()*14;x.beginPath();x.moveTo(tx+2,base-th);x.quadraticCurveTo(tx+2+dx*L*.5,base-th-14-Math.abs(dx)*-6,tx+2+dx*L,base-th+10+Math.abs(dx)*16);x.quadraticCurveTo(tx+2+dx*L*.5,base-th-6,tx+2,base-th+4);x.fill()}}}
 return c}
let L0,L1,L2;
function demo(x,w,h,t){AG.bg(x,'img/ayyappa/forest_walk.jpg',w,h,.35);x.fillStyle='#2a1a0e';x.fillRect(0,h*.82,w,h);
 const c=t%2.4,jump=c>.6&&c<1.5,u=(c-.6)/.9,y=h*.82-(jump?Math.sin(u*Math.PI)*110:0),bx=w*.95-((t*240)%(w*1.1));
 obstacle(x,{x:bx,k:'bush',w:60,gy:h*.82,s:.8},t);
 tiger(x,w*.28,y,.75,t*14,{air:jump?1:0});AY.finger(x,w*.62,h*.45,c>.55&&c<.75)}
const api=AG.game({key:'tiger-ride',art:'img/ayyappa/forest_walk.jpg',L,W,H,demo,video:{en:'hfIpmrnAiIk',kn:'hfIpmrnAiIk',ta:'hfIpmrnAiIk',te:'hfIpmrnAiIk'},music:{sa:155.56,scale:[0,2,3,7,9,12,14,15],tempo:.9},
 init(S,a){L0=L0||layer(3,'#7a5a7e',380,90,'hill');L1=L1||layer(7,'#4a3452',470,130,'trees');L2=L2||layer(31,'#22182a',560,160,'trees');
  Object.assign(S,{d:0,v:250,y:GY,vy:0,jumps:0,objs:[],pots:[],milk:0,hearts:3,inv:0,ph:0,next:300,nextPot:200,check:0,rests:0,home:false,homeX:0,shake:0});hudUp(S)},
 start(S,a){a.tip('👆 '+T(L.how)[0])},
 down(p,S,a){if(S.home)return;if(S.jumps<2){S.vy=S.jumps?-680:-800;S.jumps++;DK.tone(S.jumps>1?660:520,.12,'triangle',.06);a.burst(TX,S.y,'#d8c090',6,.5)}},
 update(dt,S,a){if(S.home){S.homeX-=S.v*dt*.6;S.ph+=dt*12;if(S.homeX<TX+150&&!S.done){S.done=true;DK.win();a.burst(TX+40,GY-120,'#ffd35a',40);const st=S.rests===0&&S.milk>=18?3:S.rests<=1&&S.milk>=10?2:1;a.finish(st,[`🥛 ${S.milk} ${T(L.got)}`]);}return}
  S.v=Math.min(430,250+S.d*.14);const dx=S.v*dt;S.d+=dx/10;S.ph+=dt*(10+S.v/40);S.inv=Math.max(0,S.inv-dt);S.shake=Math.max(0,S.shake-dt*3);
  S.vy+=2100*dt;S.y+=S.vy*dt;if(S.y>=GY){S.y=GY;S.vy=0;S.jumps=0}
  S.objs.forEach(o=>o.x-=dx);S.pots.forEach(o=>o.x-=dx);S.objs=S.objs.filter(o=>o.x>-80);S.pots=S.pots.filter(o=>o.x>-40&&!o.got);
  S.next-=dx;if(S.next<=0&&S.d<GOAL-60){const k=['bush','rock','log'][Math.floor(Math.random()*3)],w=k==='log'?110:k==='rock'?62:66;S.objs.push({x:W+60,k,w,h:k==='log'?30:k==='rock'?44:52});
   const gap=AG.rnd(300,520)*(1+S.v/900);S.next=gap;
   /* milk pots: an arc above the obstacle, rewarding the jump */
   for(let i=0;i<3;i++)S.pots.push({x:W+60+(i-1)*48,y:GY-120-Math.sin((i/2)*Math.PI)*60,gold:Math.random()<.06&&i===1})}
  S.nextPot-=dx;if(S.nextPot<=0&&!S.objs.some(o=>o.x>W-40)){S.nextPot=AG.rnd(260,420);const n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)S.pots.push({x:W+200+i*44,y:GY-36})}
  /* catch pots */
  const ty=S.y-100;S.pots.forEach(p=>{if(!p.got&&Math.abs(p.x-(TX+20))<60&&Math.abs(p.y-ty)<70){p.got=true;if(p.gold){S.milk+=5;a.float(T(L.bell),p.x,p.y-20,'#ffd35a');DK.bell(880,.1,2)}else{S.milk++;DK.chime(S.milk)}a.burst(p.x,p.y,p.gold?'#ffd35a':'#fffaf0',8,.6)}});
  /* hit obstacles */
  if(!S.inv)S.objs.forEach(o=>{if(!o.hit&&Math.abs(o.x-TX)<o.w/2+40&&S.y>GY-o.h+4){o.hit=true;S.hearts--;S.inv=1.4;S.shake=1;a.bad();S.vy=-420;S.jumps=1;
   if(S.hearts<=0){S.rests++;S.hearts=3;S.objs=[];S.pots=[];S.next=500;a.tip(T(L.rest),'bad')}}});
  if(S.d>=GOAL&&!S.home){S.home=true;S.homeX=W+40;a.tip('🏰 '+T(L.near),'good');S.objs=[];}
  if(!S.nearShown&&S.d>GOAL-200){S.nearShown=true;a.tip('🏰 '+T(L.near),'good')}
  hudUp(S)},
 draw(cx,t,S,a){const sh=S.shake?Math.sin(t*80)*6*S.shake:0;cx.save();cx.translate(sh,0);
  const sky=cx.createLinearGradient(0,0,0,GY);sky.addColorStop(0,'#2b1d4a');sky.addColorStop(.45,'#a8506a');sky.addColorStop(.8,'#f29a5a');sky.addColorStop(1,'#ffd08a');cx.fillStyle=sky;cx.fillRect(0,0,W,GY);
  const sun=cx.createRadialGradient(W*.7,300,10,W*.7,300,180);sun.addColorStop(0,'rgba(255,240,200,.95)');sun.addColorStop(.15,'rgba(255,220,150,.6)');sun.addColorStop(1,'rgba(255,200,120,0)');cx.fillStyle=sun;cx.fillRect(0,0,W,GY);
  for(let i=0;i<30;i++){const sx=(i*97)%W,sy=(i*53)%220;cx.fillStyle=`rgba(255,255,255,${.25+.25*Math.sin(t*2+i)})`;cx.fillRect(sx,sy,1.5,1.5)}
  const sc=S.d*10;const tile=(img,f,y0)=>{const o=(sc*f)%960;cx.drawImage(img,-o,y0||0);cx.drawImage(img,960-o,y0||0)};
  if(L0){tile(L0,.08);{const hz=cx.createLinearGradient(0,240,0,GY);hz.addColorStop(0,'rgba(255,190,140,0)');hz.addColorStop(1,'rgba(255,190,140,.28)');cx.fillStyle=hz;cx.fillRect(0,240,W,GY-240)}tile(L1,.25);{const hz=cx.createLinearGradient(0,360,0,GY);hz.addColorStop(0,'rgba(255,170,120,0)');hz.addColorStop(1,'rgba(255,170,120,.16)');cx.fillStyle=hz;cx.fillRect(0,360,W,GY-360)}tile(L2,.55)}
  /* light rays */
  cx.save();cx.globalCompositeOperation='lighter';for(let i=0;i<4;i++){cx.fillStyle=`rgba(255,220,150,${.04+.02*Math.sin(t+i)})`;cx.beginPath();cx.moveTo(W*.7-20+i*14,300);cx.lineTo(W*.7+20+i*14,300);cx.lineTo(-60+i*150,GY);cx.lineTo(-140+i*150,GY);cx.fill()}cx.restore();
  /* path */
  const pg=cx.createLinearGradient(0,GY,0,H);pg.addColorStop(0,'#b07a4a');pg.addColorStop(.12,'#6a4428');pg.addColorStop(1,'#24140c');cx.fillStyle=pg;cx.fillRect(0,GY-4,W,H-GY+4);
  const off=(S.d*10)%60;cx.fillStyle='rgba(255,230,180,.12)';for(let x=-off;x<W;x+=60){cx.beginPath();cx.ellipse(x,GY+18,14,3,0,0,6.283);cx.fill();cx.beginPath();cx.ellipse(x+30,GY+52,20,4,0,0,6.283);cx.fill()}
  cx.fillStyle='#2f5a22';for(let x=-((S.d*10)%24);x<W;x+=24){cx.beginPath();cx.moveTo(x,GY);cx.lineTo(x+4,GY-12-((x*7)%9));cx.lineTo(x+8,GY);cx.fill()}
  if(S.home)palace(cx,S.homeX,t);
  S.objs.forEach(o=>obstacle(cx,o,t));S.pots.forEach(p=>{if(p.gold)AY.bellIcon(cx,p.x,p.y,16,t);else pot(cx,p.x,p.y,1,t)});
  /* tiger herd far behind */
  for(let i=0;i<2;i++){cx.save();cx.globalAlpha=.55;tiger(cx,-20-i*70+Math.sin(t*2+i)*8,GY-2,.42,S.ph+i*1.7,{});cx.restore()}
  if(!(S.inv&&Math.floor(t*12)%2))tiger(cx,TX,S.y,1.12,S.ph,{air:S.y<GY-2?1:0});
  /* speed lines */
  cx.strokeStyle='rgba(255,240,210,.18)';cx.lineWidth=2;for(let i=0;i<5;i++){const yy=GY-200+i*40,xx=W-((t*700+i*137)%(W+200));cx.beginPath();cx.moveTo(xx,yy);cx.lineTo(xx+60,yy);cx.stroke()}
  cx.restore();
  /* progress to Pandalam */
  const pr=Math.min(1,S.d/GOAL);AG.panel(cx,20,18,W-40,40,20);cx.fillStyle='rgba(255,255,255,.12)';cx.beginPath();cx.roundRect(70,33,W-150,10,5);cx.fill();const pgb=cx.createLinearGradient(70,0,W-80,0);pgb.addColorStop(0,'#f6a723');pgb.addColorStop(1,'#ffe08a');cx.fillStyle=pgb;cx.beginPath();cx.roundRect(70,33,(W-150)*pr,10,5);cx.fill();
  AG.text(cx,'🐅',52,47,22,'#fff',{lw:0});AG.text(cx,'🏰',W-58,47,22,'#fff',{lw:0});
  AG.text(cx,'❤'.repeat(S.hearts)+'♡'.repeat(3-S.hearts),W/2,92,24,'#ff6b6b');
 }});
function hudUp(S){api.hud([['🥛 '+T(L.milk),S.milk],['🏰 '+T(L.dist),Math.max(0,Math.ceil(GOAL-S.d))+' m']])}
