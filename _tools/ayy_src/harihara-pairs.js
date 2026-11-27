/*META
{"key":"harihara-pairs","title":{"en":"Harihara Pairs","kn":"ಹರಿಹರ ಜೋಡಿ","ta":"ஹரிஹர ஜோடி","te":"హరిహర జంటలు"},
 "desc":"Harihara Pairs: a free Ayyappa season memory game by World of Wonders Studio. Turn the cards and match the symbols of Hari (Vishnu), Hara (Shiva) and their son Ayyappa, and learn what each one means. English, Kannada, Tamil and Telugu.",
 "og":"Conch, trident, crescent moon, tiger… match the symbols of Hari, Hara and Ayyappa. Swamiye Sharanam!",
 "genre":["Puzzle","Educational"],"bg":"img/ayyappa/kid_prayer.jpg"}
META*/
const T=DK.t;
const SYM=[
 {i:'🐚',o:'hari',n:{en:'Conch (Shankha)',kn:'ಶಂಖ',ta:'சங்கு',te:'శంఖం'},f:{en:'Vishnu\'s conch, Panchajanya. Its sound is the sound of victory and the start of prayer.',kn:'ವಿಷ್ಣುವಿನ ಶಂಖ ಪಾಂಚಜನ್ಯ. ಅದರ ನಾದ ಜಯದ, ಪೂಜೆಯ ಆರಂಭದ ನಾದ.',ta:'விஷ்ணுவின் சங்கு பாஞ்சஜன்யம். அதன் ஒலி வெற்றியின், வழிபாட்டுத் தொடக்கத்தின் ஒலி.',te:'విష్ణువు శంఖం పాంచజన్యం. దాని నాదం విజయ నాదం, పూజ ఆరంభ నాదం.'}},
 {i:'🪷',o:'hari',n:{en:'Lotus',kn:'ಕಮಲ',ta:'தாமரை',te:'తామర'},f:{en:'The lotus grows in mud yet stays clean: a mind that stays pure in the world.',kn:'ಕೆಸರಿನಲ್ಲಿ ಬೆಳೆದರೂ ಕಮಲ ಶುದ್ಧ: ಲೋಕದಲ್ಲಿದ್ದರೂ ಶುದ್ಧವಾಗಿರುವ ಮನಸ್ಸು.',ta:'சேற்றில் வளர்ந்தாலும் தாமரை தூய்மையாக இருக்கிறது: உலகில் இருந்தும் தூய்மையான மனம்.',te:'బురదలో పెరిగినా తామర శుభ్రంగా ఉంటుంది: లోకంలో ఉన్నా స్వచ్ఛంగా ఉండే మనసు.'}},
 {i:'🦚',o:'hari',n:{en:'Peacock feather',kn:'ನವಿಲುಗರಿ',ta:'மயில் இறகு',te:'నెమలి ఈక'},f:{en:'Worn by Krishna, an avatar of Vishnu. Hari took the form of Mohini, Ayyappa\'s mother.',kn:'ವಿಷ್ಣುವಿನ ಅವತಾರ ಕೃಷ್ಣ ಧರಿಸುವ ಗರಿ. ಹರಿಯೇ ಮೋಹಿನಿಯ ರೂಪ ತಾಳಿ ಅಯ್ಯಪ್ಪನ ತಾಯಿಯಾದ.',ta:'விஷ்ணுவின் அவதாரமான கிருஷ்ணன் அணியும் இறகு. ஹரியே மோகினி வடிவெடுத்து ஐயப்பனின் தாயானார்.',te:'విష్ణు అవతారం కృష్ణుడు ధరించే ఈక. హరియే మోహినీ రూపం దాల్చి అయ్యప్ప తల్లి అయ్యాడు.'}},
 {i:'🔱',o:'hara',n:{en:'Trident (Trishula)',kn:'ತ್ರಿಶೂಲ',ta:'திரிசூலம்',te:'త్రిశూలం'},f:{en:'Shiva\'s trident. Its three points are often said to stand for creation, keeping and ending.',kn:'ಶಿವನ ತ್ರಿಶೂಲ. ಅದರ ಮೂರು ಮೊನೆಗಳು ಸೃಷ್ಟಿ, ಸ್ಥಿತಿ, ಲಯ ಎನ್ನುತ್ತಾರೆ.',ta:'சிவனின் திரிசூலம். அதன் மூன்று முனைகள் படைப்பு, காப்பு, அழிப்பு என்கிறார்கள்.',te:'శివుని త్రిశూలం. దాని మూడు మొనలు సృష్టి, స్థితి, లయ అని అంటారు.'}},
 {i:'🌙',o:'hara',n:{en:'Crescent moon',kn:'ಅರ್ಧಚಂದ್ರ',ta:'பிறைச் சந்திரன்',te:'నెలవంక'},f:{en:'Shiva wears the crescent moon in his hair: calm and coolness.',kn:'ಶಿವ ಜಟೆಯಲ್ಲಿ ಅರ್ಧಚಂದ್ರ ಧರಿಸುತ್ತಾನೆ: ಶಾಂತಿ, ತಂಪು.',ta:'சிவன் சடையில் பிறைச் சந்திரனை அணிகிறார்: அமைதியும் குளிர்ச்சியும்.',te:'శివుడు జటలో నెలవంక ధరిస్తాడు: శాంతి, చల్లదనం.'}},
 {i:'🐍',o:'hara',n:{en:'Snake (Vasuki)',kn:'ಸರ್ಪ (ವಾಸುಕಿ)',ta:'பாம்பு (வாசுகி)',te:'సర్పం (వాసుకి)'},f:{en:'Vasuki around Shiva\'s neck: fear itself, held calmly.',kn:'ಶಿವನ ಕೊರಳಿನ ವಾಸುಕಿ: ಭಯವನ್ನೇ ಶಾಂತವಾಗಿ ಧರಿಸಿದ ರೂಪ.',ta:'சிவனின் கழுத்தில் வாசுகி: அச்சத்தையே அமைதியாக அணிந்தது.',te:'శివుని మెడలో వాసుకి: భయాన్నే ప్రశాంతంగా ధరించడం.'}},
 {i:'🐅',o:'ayy',n:{en:'Tiger',kn:'ಹುಲಿ',ta:'புலி',te:'పులి'},f:{en:'Manikanta came home riding a tiger with the tigress milk for the queen.',kn:'ರಾಣಿಗಾಗಿ ಹುಲಿಯ ಹಾಲು ತಂದ ಮಣಿಕಂಠ ಹುಲಿಯ ಮೇಲೆ ಕುಳಿತು ಮನೆಗೆ ಬಂದ.',ta:'அரசிக்குப் புலிப்பால் கொண்டுவந்த மணிகண்டன் புலியின் மேல் வீடு திரும்பினான்.',te:'రాణి కోసం పులి పాలు తెచ్చిన మణికంఠుడు పులి మీద ఇంటికి వచ్చాడు.'}},
 {i:'🏹',o:'ayy',n:{en:'Bow and arrow',kn:'ಬಿಲ್ಲು ಬಾಣ',ta:'வில் அம்பு',te:'విల్లు బాణం'},f:{en:'Ayyappa is a great archer. Kanni swamis leave arrows at Saramkuthi.',kn:'ಅಯ್ಯಪ್ಪ ಮಹಾ ಬಿಲ್ಲುಗಾರ. ಕನ್ನಿ ಸ್ವಾಮಿಗಳು ಶರಂಕುತ್ತಿಯಲ್ಲಿ ಬಾಣ ಇಡುತ್ತಾರೆ.',ta:'ஐயப்பன் சிறந்த வில்லாளி. கன்னி சாமிகள் சரங்குத்தியில் அம்பு வைக்கிறார்கள்.',te:'అయ్యప్ప గొప్ప విలుకాడు. కన్నె స్వాములు శరంకుత్తిలో బాణాలు ఉంచుతారు.'}},
 {i:'🔔',o:'ayy',n:{en:'Temple bell',kn:'ದೇವಸ್ಥಾನದ ಗಂಟೆ',ta:'கோயில் மணி',te:'ఆలయ గంట'},f:{en:'Ringing the bell wakes the mind before prayer. "Mani" also means jewel: Manikanta wore a bell-jewel at his neck.',kn:'ಗಂಟೆಯ ನಾದ ಪೂಜೆಗೆ ಮೊದಲು ಮನಸ್ಸನ್ನು ಎಚ್ಚರಿಸುತ್ತದೆ. ಮಣಿಕಂಠನ ಕೊರಳಲ್ಲಿ ಮಣಿ ಇತ್ತು.',ta:'மணியோசை வழிபாட்டுக்கு முன் மனதை எழுப்புகிறது. மணிகண்டனின் கழுத்தில் மணி இருந்தது.',te:'గంట నాదం పూజకు ముందు మనసును మేల్కొల్పుతుంది. మణికంఠుని మెడలో మణి ఉండేది.'}},
 {i:'🪔',o:'ayy',n:{en:'Lamp',kn:'ದೀಪ',ta:'விளக்கு',te:'దీపం'},f:{en:'The lamp drives away darkness. At Makaravilakku, a light shines on the hill of Ponnambalamedu.',kn:'ದೀಪ ಕತ್ತಲನ್ನು ಓಡಿಸುತ್ತದೆ. ಮಕರವಿಳಕ್ಕು ದಿನ ಪೊನ್ನಂಬಲಮೇಡು ಬೆಟ್ಟದಲ್ಲಿ ಜ್ಯೋತಿ ಕಾಣುತ್ತದೆ.',ta:'விளக்கு இருளை விரட்டுகிறது. மகரவிளக்கு அன்று பொன்னம்பலமேடு மலையில் ஜோதி தெரிகிறது.',te:'దీపం చీకటిని తరిమేస్తుంది. మకరవిళక్కు రోజు పొన్నంబలమేడు కొండపై జ్యోతి కనిపిస్తుంది.'}}];
const ORIG={hari:{en:'Hari',kn:'ಹರಿ',ta:'ஹரி',te:'హరి'},hara:{en:'Hara',kn:'ಹರ',ta:'ஹரன்',te:'హరుడు'},ayy:{en:'Ayyappa',kn:'ಅಯ್ಯಪ್ಪ',ta:'ஐயப்பன்',te:'అయ్యప్ప'}};
const L={
 title:{en:'Harihara Pairs',kn:'ಹರಿಹರ ಜೋಡಿ',ta:'ஹரிஹர ஜோடி',te:'హరిహర జంటలు'},
 storyT:{en:'Harihara Sudhan: son of Hari and Hara',kn:'ಹರಿಹರ ಸುತ: ಹರಿ ಮತ್ತು ಹರನ ಮಗ',ta:'ஹரிஹர சுதன்: ஹரியும் ஹரனும் பெற்ற மகன்',te:'హరిహర సుతుడు: హరి హరుల కుమారుడు'},
 story:{en:['Ayyappa is called <b>Harihara Sudhan</b>, the son of Hari (Vishnu, as Mohini) and Hara (Shiva). He was born to defeat the demoness Mahishi.','Each card hides a symbol of Hari, Hara or Ayyappa. Find the pairs and learn what they mean!'],
  kn:['ಅಯ್ಯಪ್ಪನನ್ನು <b>ಹರಿಹರ ಸುತ</b> ಎನ್ನುತ್ತಾರೆ: ಮೋಹಿನಿ ರೂಪದ ಹರಿ (ವಿಷ್ಣು) ಮತ್ತು ಹರನ (ಶಿವ) ಮಗ. ಮಹಿಷಿಯನ್ನು ಸೋಲಿಸಲು ಹುಟ್ಟಿದವನು.','ಪ್ರತಿ ಕಾರ್ಡಿನ ಹಿಂದೆ ಹರಿ, ಹರ ಅಥವಾ ಅಯ್ಯಪ್ಪನ ಒಂದು ಚಿಹ್ನೆ ಇದೆ. ಜೋಡಿ ಹುಡುಕಿ, ಅರ್ಥ ಕಲಿಯಿರಿ!'],
  ta:['ஐயப்பனை <b>ஹரிஹர சுதன்</b> என்கிறார்கள்: மோகினி வடிவ ஹரியும் (விஷ்ணு) ஹரனும் (சிவன்) பெற்ற மகன். மகிஷியை வெல்லப் பிறந்தவன்.','ஒவ்வொரு அட்டையிலும் ஹரி, ஹரன் அல்லது ஐயப்பனின் ஒரு சின்னம் மறைந்துள்ளது. ஜோடிகளைக் கண்டுபிடித்து அர்த்தம் கற்றுக்கொள்ளுங்கள்!'],
  te:['అయ్యప్పను <b>హరిహర సుతుడు</b> అంటారు: మోహినీ రూపంలో హరి (విష్ణువు), హరుల (శివుడు) కుమారుడు. మహిషిని ఓడించడానికి పుట్టినవాడు.','ప్రతి కార్డు వెనుక హరి, హర లేదా అయ్యప్ప చిహ్నం ఒకటి దాగి ఉంది. జంటలను కనుగొని అర్థం నేర్చుకోండి!']},
 how:{en:['Tap two cards to turn them over.','The same symbol twice? They stay open and you learn its story.','Two boards: 6 pairs, then 10 pairs. Fewer turns earn more stars.'],
  kn:['ಎರಡು ಕಾರ್ಡ್ ಮುಟ್ಟಿ ತಿರುಗಿಸಿ.','ಒಂದೇ ಚಿಹ್ನೆ ಎರಡು ಬಾರಿ? ಅವು ತೆರೆದೇ ಇರುತ್ತವೆ, ಅದರ ಕಥೆ ತಿಳಿಯುತ್ತೀರಿ.','ಎರಡು ಆಟ: 6 ಜೋಡಿ, ಆಮೇಲೆ 10 ಜೋಡಿ. ಕಡಿಮೆ ಪ್ರಯತ್ನಕ್ಕೆ ಹೆಚ್ಚು ನಕ್ಷತ್ರ.'],
  ta:['இரண்டு அட்டைகளைத் தட்டித் திருப்புங்கள்.','ஒரே சின்னம் இரண்டு முறையா? அவை திறந்தே இருக்கும், அதன் கதையைத் தெரிந்துகொள்வீர்கள்.','இரண்டு பலகைகள்: 6 ஜோடி, பிறகு 10 ஜோடி. குறைந்த முயற்சிக்கு அதிக நட்சத்திரங்கள்.'],
  te:['రెండు కార్డులను తాకి తిప్పండి.','ఒకే చిహ్నం రెండుసార్లా? అవి తెరిచే ఉంటాయి, దాని కథ తెలుస్తుంది.','రెండు బోర్డులు: 6 జంటలు, తర్వాత 10 జంటలు. తక్కువ ప్రయత్నాలకు ఎక్కువ నక్షత్రాలు.']},
 turns:{en:'Turns',kn:'ಪ್ರಯತ್ನ',ta:'முயற்சி',te:'ప్రయత్నాలు'},pairs:{en:'Pairs',kn:'ಜೋಡಿ',ta:'ஜோடி',te:'జంటలు'},board:{en:'Board',kn:'ಆಟ',ta:'பலகை',te:'బోర్డు'},
 endT:{en:'All pairs found!',kn:'ಎಲ್ಲ ಜೋಡಿಗಳೂ ಸಿಕ್ಕವು!',ta:'எல்லா ஜோடிகளும் கிடைத்தன!',te:'అన్ని జంటలూ దొరికాయి!'},
 endP:{en:'Ayyappa brings together Vishnu and Shiva, and at Sabarimala people of every background stand together as equals. Every pilgrim is called Swami, and so is Ayyappa.',kn:'ಅಯ್ಯಪ್ಪ ವಿಷ್ಣು-ಶಿವರನ್ನು ಒಂದುಗೂಡಿಸುತ್ತಾನೆ. ಶಬರಿಮಲೆಯಲ್ಲಿ ಎಲ್ಲ ಹಿನ್ನೆಲೆಯ ಜನರೂ ಸಮಾನರು. ಪ್ರತಿ ಭಕ್ತನನ್ನೂ ಸ್ವಾಮಿ ಎನ್ನುತ್ತಾರೆ, ಅಯ್ಯಪ್ಪನನ್ನೂ ಸ್ವಾಮಿ ಎನ್ನುತ್ತಾರೆ.',ta:'ஐயப்பன் விஷ்ணுவையும் சிவனையும் இணைக்கிறார். சபரிமலையில் எல்லாப் பின்னணி மக்களும் சமமாக நிற்கிறார்கள். ஒவ்வொரு பக்தரும் சாமி, ஐயப்பனும் சாமி.',te:'అయ్యప్ప విష్ణు శివులను కలుపుతాడు. శబరిమలలో అన్ని నేపథ్యాల ప్రజలూ సమానులు. ప్రతి భక్తుడూ స్వామి, అయ్యప్పా స్వామి.'},
 shareText:{en:'I matched all the symbols of Hari, Hara and Ayyappa! Try it, Swamiye Sharanam:',kn:'ನಾನು ಹರಿ, ಹರ, ಅಯ್ಯಪ್ಪನ ಎಲ್ಲ ಚಿಹ್ನೆಗಳ ಜೋಡಿ ಹುಡುಕಿದೆ! ನೀವೂ ಆಡಿ, ಸ್ವಾಮಿಯೇ ಶರಣಂ:',ta:'நான் ஹரி, ஹரன், ஐயப்பனின் எல்லாச் சின்னங்களையும் பொருத்தினேன்! நீங்களும் விளையாடுங்கள், சுவாமியே சரணம்:',te:'నేను హరి, హర, అయ్యప్ప చిహ్నాలన్నీ జతచేశాను! మీరూ ఆడండి, స్వామియే శరణం:'}
};
const W=480,H=760,BOARDS=[[3,4,6],[4,5,10]];
const COL={hari:['#2a5aa8','#163266'],hara:['#5a5a6a','#2a2a36'],ayy:['#b8742a','#6a3a10']};
function deal(S,b){const [c,r,np]=BOARDS[b];S.b=b;S.c=c;S.r=r;const pick=SYM.map((s,i)=>i).sort(()=>Math.random()-.5).slice(0,np);let cards=[];pick.forEach(i=>{cards.push({s:i,flip:0,open:false,done:false});cards.push({s:i,flip:0,open:false,done:false})});
 cards.sort(()=>Math.random()-.5);S.cards=cards;S.sel=[];S.found=0;S.np=np;const cw=Math.min(100,(W-60)/c),chh=Math.min(126,(560)/r);S.cw=cw;S.ch=chh;S.ox=(W-c*cw)/2;S.oy=140+(560-r*chh)/2}
function card(cx,C,x,y,w,h,t){const f=C.flip,sx=Math.abs(Math.cos(f*Math.PI)),front=f>.5;cx.save();cx.translate(x+w/2,y+h/2);cx.scale(Math.max(.02,sx),1);
 const sh=cx.createRadialGradient(0,8,4,0,8,w*.7);sh.addColorStop(0,'rgba(0,0,0,.4)');sh.addColorStop(1,'rgba(0,0,0,0)');cx.fillStyle=sh;cx.fillRect(-w/2,-h/2+8,w,h);
 if(!front){const g=cx.createLinearGradient(-w/2,-h/2,w/2,h/2);g.addColorStop(0,'#6a1a2a');g.addColorStop(1,'#2a0a14');cx.fillStyle=g;cx.beginPath();cx.roundRect(-w/2+4,-h/2+4,w-8,h-8,12);cx.fill();
  cx.strokeStyle='#e8b84a';cx.lineWidth=2.5;cx.beginPath();cx.roundRect(-w/2+9,-h/2+9,w-18,h-18,9);cx.stroke();
  cx.strokeStyle='rgba(232,184,74,.7)';cx.lineWidth=1.5;for(let k=0;k<8;k++){cx.save();cx.rotate(k*Math.PI/4);cx.beginPath();cx.ellipse(0,-12,5,12,0,0,6.283);cx.stroke();cx.restore()}cx.fillStyle='#e8b84a';cx.beginPath();cx.arc(0,0,4,0,6.283);cx.fill()}
 else{const s=SYM[C.s],c=COL[s.o];const g=cx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#fff8e6');g.addColorStop(1,'#efd9a8');cx.fillStyle=g;cx.beginPath();cx.roundRect(-w/2+4,-h/2+4,w-8,h-8,12);cx.fill();
  cx.strokeStyle=C.done?'#e8a92e':c[0];cx.lineWidth=C.done?4:3;cx.stroke();cx.fillStyle=c[0];cx.beginPath();cx.roundRect(-w/2+4,h/2-26,w-8,22,[0,0,12,12]);cx.fill();
  cx.font=`${Math.round(w*.48)}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(s.i,0,-10);
  cx.font=`700 12px ${AG.FONT}`;cx.fillStyle='#fff';cx.fillText(T(ORIG[s.o]),0,h/2-15);
  if(C.done){cx.save();cx.globalCompositeOperation='lighter';cx.fillStyle=`rgba(255,220,130,${.12+.08*Math.sin(t*4)})`;cx.beginPath();cx.roundRect(-w/2+4,-h/2+4,w-8,h-8,12);cx.fill();cx.restore()}}
 cx.restore()}
function demo(x,w,h,t){x.fillStyle='#1c1442';x.fillRect(0,0,w,h);const c=t%4;const A={s:3,flip:c>.5?Math.min(1,(c-.5)*3):0,done:c>2},B={s:3,flip:c>1.2?Math.min(1,(c-1.2)*3):0,done:c>2},C={s:0,flip:0};
 card(x,A,w/2-160,40,100,126,t);card(x,C,w/2-50,40,100,126,t);card(x,B,w/2+60,40,100,126,t);AY.finger(x,c<1.2?w/2-110:w/2+110,180,(c%1.2)<.3)}
const api=AG.game({key:'harihara-pairs',art:'img/ayyappa/kid_prayer.jpg',L,W,H,demo,demoH:230,video:{en:'UOGXzfLW8vc',kn:'UOGXzfLW8vc',ta:'UOGXzfLW8vc',te:'UOGXzfLW8vc'},music:{sa:146.83,scale:[0,2,4,7,9,12,14,16],tempo:.5},
 init(S,a){S.turns=0;deal(S,0);hud(S)},
 down(p,S,a){if(S.lock)return;const i=S.cards.findIndex((C,k)=>{const x=S.ox+(k%S.c)*S.cw,y=S.oy+Math.floor(k/S.c)*S.ch;return p.x>x&&p.x<x+S.cw&&p.y>y&&p.y<y+S.ch});if(i<0)return;const C=S.cards[i];if(C.open||C.done)return;
  C.open=true;S.sel.push(i);DK.tone(500,.06,'triangle',.05);
  if(S.sel.length===2){S.turns++;const [p1,p2]=S.sel.map(k=>S.cards[k]);S.lock=true;
   if(p1.s===p2.s){setTimeout(()=>{p1.done=p2.done=true;S.found++;S.sel=[];S.lock=false;DK.chime(S.found);const sy=SYM[p1.s];a.tip(`${sy.i} <b>${T(sy.n)}</b> · ${T(ORIG[sy.o])}: ${T(sy.f)}`,'good');
     const k=S.cards.indexOf(p1);a.burst(S.ox+(k%S.c+.5)*S.cw,S.oy+(Math.floor(k/S.c)+.5)*S.ch,'#ffd35a',14,.6);hud(S);
     if(S.found===S.np){if(S.b===0)setTimeout(()=>{deal(S,1);hud(S);DK.beat(T(L.board)+' 2 / 2','ayy-lamps',T(L.title))},1600);else{DK.win();a.finish(S.turns<=26?3:S.turns<=36?2:1,[`🃏 ${S.turns} ${T(L.turns)}`])}}},380)}
   else setTimeout(()=>{p1.open=p2.open=false;S.sel=[];S.lock=false},900)}hud(S)},
 update(dt,S){S.cards.forEach(C=>{const want=C.open||C.done?1:0;C.flip+=(want-C.flip)*Math.min(1,dt*10)})},
 draw(cx,t,S,a){AG.sky(cx,W,H,t,{sy:70,sr:140,stops:[[0,'#2a0e22'],[.6,'#1e1032'],[1,'#120a22']]});
  /* temple wall pattern */
  cx.strokeStyle='rgba(232,184,74,.07)';cx.lineWidth=1;for(let y=120;y<H;y+=40)for(let x=0;x<W;x+=40){cx.beginPath();cx.arc(x+20,y+20,14,0,6.283);cx.stroke()}
  S.cards.forEach((C,k)=>card(cx,C,S.ox+(k%S.c)*S.cw,S.oy+Math.floor(k/S.c)*S.ch,S.cw,S.ch,t));
  AG.text(cx,`${T(L.board)} ${S.b+1} / 2`,W/2,62,28,'#ffe08a');AG.text(cx,`${T(L.pairs)} ${S.found}/${S.np}   ·   ${T(L.turns)} ${S.turns}`,W/2,98,17,'#f3e4c4',{w:700})}});
function hud(S){api.hud([['🃏 '+T(L.pairs),S.found+'/'+S.np],['🔄 '+T(L.turns),S.turns]])}
