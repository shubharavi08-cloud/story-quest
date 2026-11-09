/* Road to Ayodhya · Moksha Patam 3D — World of Wonders Studio
   9 levels along Ram's journey. Levels are pure data (LEVELS below): a new pack = new entries. */
import * as THREE from './three.module.min.js';

/* ======================= text ======================= */
const L={
en:{eyebrow:'Moksha Patam · Snakes & Ladders',title:'Road to Ayodhya',roll:'Roll',rolling:'Rolling…',move:'Move',reroll:'Re-roll 🪔',lamps:'Your lamps',level:'Level',
 yourTurn:n=>n===null?'Your turn. Tap Roll!':`${n}'s turn. Tap Roll!`,botTurn:n=>`${n} is thinking…`,
 choose:(n,bad)=>bad?`Uh-oh, ${n} has a snake! Spend a lamp to re-roll?`:`You will land on ${n}. Move, or spend a lamp to re-roll?`,
 six:'A six! Roll again.',bounce:'Too far! Bounced back.',
 storyTag:'Story lamp',right:'Right! You earned a lamp 🪔. Use it to re-roll a throw that lands on a snake.',wrong:a=>`Not quite. The answer is: ${a}`,ok:'Continue',
 winTitle:(n,p)=>`${n} reached ${p}!`,loseTitle:n=>`${n} got there first`,loseText:'Try again. Answer the lamp questions to earn re-rolls!',
 stepText:'One step further on Ram\'s journey home.',finalText:'The whole city lights rows of lamps to welcome Shri Ram home. A row of lamps: Deepa + Aavali = Deepavali!',
 next:'Next level',again:'Play again',retry:'Try again',map:'All levels',mapTitle:'Ram\'s journey',locked:'Win the level before to open it',
 setupTitle:'Who is playing?',setupText:'Take turns on this screen with family, or race against Diya.',players:'Players',human:'Person',bot:'Diya (computer)',start:'Start',
 name:i=>['Player 1','Player 2','Player 3','Player 4'][i],youWord:'You',
 rules:'Race to square 100. Ladders lift you, snakes pull you down. Answer a lamp question right to earn a re-roll.',
 tipStart:'Tap Roll (or press Space) to start. Ladders lift you up, snakes pull you down!',levelGo:(i,p)=>`Level ${i} · ${p}`,starsRule:'★ win · ★ light 2 lamps · ★ get bitten once or less'},
hi:{eyebrow:'मोक्ष पटम · साँप-सीढ़ी',title:'अयोध्या की राह',roll:'पासा फेंको',rolling:'घूम रहा है…',move:'चलो',reroll:'फिर फेंको 🪔',lamps:'आपके दीये',level:'स्तर',
 yourTurn:n=>n===null?'आपकी बारी। पासा फेंको!':`${n} की बारी। पासा फेंको!`,botTurn:n=>`${n} सोच रही है…`,
 choose:(n,bad)=>bad?`अरे, ${n} पर साँप है! दीया देकर फिर फेंकें?`:`आप ${n} पर पहुँचेंगे। चलें या दीया देकर फिर फेंकें?`,
 six:'छक्का! फिर से फेंको।',bounce:'ज़्यादा हो गया! पीछे लौटे।',
 storyTag:'कहानी का दीया',right:'सही! आपको एक दीया 🪔 मिला। साँप पर गिरने वाला पासा आए तो इससे फिर फेंक सकते हैं।',wrong:a=>`थोड़ा चूक गए। सही उत्तर: ${a}`,ok:'आगे चलें',
 winTitle:(n,p)=>`${n} ${p} पहुँचे!`,loseTitle:n=>`${n} पहले पहुँच गई`,loseText:'फिर कोशिश करो। दीये वाले सवालों के सही उत्तर देकर दोबारा फेंकने का मौका पाओ!',
 stepText:'राम की घर-यात्रा में एक कदम और।',finalText:'पूरा नगर दीयों की कतारें जलाकर श्री राम का स्वागत करता है। दीयों की कतार: दीप + आवली = दीपावली!',
 next:'अगला स्तर',again:'फिर से खेलें',retry:'फिर कोशिश करो',map:'सभी स्तर',mapTitle:'राम की यात्रा',locked:'पिछला स्तर जीतकर खोलें',
 setupTitle:'कौन खेल रहा है?',setupText:'इसी स्क्रीन पर परिवार के साथ बारी-बारी खेलें, या दिया से मुकाबला करें।',players:'खिलाड़ी',human:'व्यक्ति',bot:'दिया (कंप्यूटर)',start:'शुरू करें',
 name:i=>['खिलाड़ी 1','खिलाड़ी 2','खिलाड़ी 3','खिलाड़ी 4'][i],youWord:'आप',
 rules:'खाना 100 तक दौड़ो। सीढ़ी ऊपर ले जाती है, साँप नीचे गिराता है। दीये वाले सवाल का सही उत्तर दो तो दोबारा फेंकने का मौका मिलेगा।',
 tipStart:'शुरू करने के लिए पासा फेंको (या Space दबाओ)। सीढ़ी ऊपर, साँप नीचे!',levelGo:(i,p)=>`स्तर ${i} · ${p}`,starsRule:'★ जीत · ★ 2 दीये जलाओ · ★ साँप से एक बार से ज़्यादा न कटो'},
kn:{eyebrow:'ಮೋಕ್ಷಪಟ · ಹಾವು-ಏಣಿ',title:'ಅಯೋಧ್ಯೆಯ ದಾರಿ',roll:'ದಾಳ ಎಸೆಯಿರಿ',rolling:'ಉರುಳುತ್ತಿದೆ…',move:'ಮುಂದೆ ಸಾಗಿ',reroll:'ಮತ್ತೆ ಎಸೆಯಿರಿ 🪔',lamps:'ನಿಮ್ಮ ದೀಪಗಳು',level:'ಹಂತ',
 yourTurn:n=>n===null?'ನಿಮ್ಮ ಸರದಿ. ದಾಳ ಎಸೆಯಿರಿ!':`${n} ಅವರ ಸರದಿ. ದಾಳ ಎಸೆಯಿರಿ!`,botTurn:n=>`${n} ಯೋಚಿಸುತ್ತಿದ್ದಾಳೆ…`,
 choose:(n,bad)=>bad?`ಅಯ್ಯೋ, ${n} ಮನೆಯಲ್ಲಿ ಹಾವಿದೆ! ದೀಪ ಬಳಸಿ ಮತ್ತೆ ಎಸೆಯುತ್ತೀರಾ?`:`ನೀವು ${n} ಮನೆಗೆ ಬರುತ್ತೀರಿ. ಮುಂದೆ ಸಾಗುತ್ತೀರಾ, ಇಲ್ಲವೇ ದೀಪ ಬಳಸಿ ಮತ್ತೆ ಎಸೆಯುತ್ತೀರಾ?`,
 six:'ಆರು! ಮತ್ತೆ ಎಸೆಯಿರಿ.',bounce:'ಜಾಸ್ತಿ ಆಯಿತು! ಹಿಂದೆ ಬಂದಿರಿ.',
 storyTag:'ಕಥೆಯ ದೀಪ',right:'ಸರಿ! ನಿಮಗೆ ಒಂದು ದೀಪ 🪔 ಸಿಕ್ಕಿತು. ಹಾವಿನ ಮನೆಗೆ ಬೀಳುವ ದಾಳ ಬಿದ್ದರೆ ಇದರಿಂದ ಮತ್ತೆ ಎಸೆಯಬಹುದು.',wrong:a=>`ಸ್ವಲ್ಪದರಲ್ಲಿ ತಪ್ಪಿತು. ಸರಿಯಾದ ಉತ್ತರ: ${a}`,ok:'ಮುಂದುವರಿಸಿ',
 winTitle:(n,p)=>`${n} ${p} ತಲುಪಿದರು!`,loseTitle:n=>`${n} ಮೊದಲು ತಲುಪಿದಳು`,loseText:'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ದೀಪದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಿ ಉತ್ತರ ಕೊಟ್ಟು ಮತ್ತೆ ಎಸೆಯುವ ಅವಕಾಶ ಪಡೆಯಿರಿ!',
 stepText:'ರಾಮನ ಮನೆಯ ಪಯಣದಲ್ಲಿ ಇನ್ನೊಂದು ಹೆಜ್ಜೆ.',finalText:'ಇಡೀ ನಗರ ದೀಪಗಳ ಸಾಲು ಹಚ್ಚಿ ಶ್ರೀರಾಮನನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ. ದೀಪಗಳ ಸಾಲು: ದೀಪ + ಆವಳಿ = ದೀಪಾವಳಿ!',
 next:'ಮುಂದಿನ ಹಂತ',again:'ಮತ್ತೆ ಆಡಿ',retry:'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',map:'ಎಲ್ಲ ಹಂತಗಳು',mapTitle:'ರಾಮನ ಪಯಣ',locked:'ಹಿಂದಿನ ಹಂತ ಗೆದ್ದು ತೆರೆಯಿರಿ',
 setupTitle:'ಯಾರು ಆಡುತ್ತಿದ್ದಾರೆ?',setupText:'ಇದೇ ಪರದೆಯಲ್ಲಿ ಮನೆಯವರ ಜೊತೆ ಸರದಿಯಂತೆ ಆಡಿ, ಇಲ್ಲವೇ ದಿಯಾ ಜೊತೆ ಸ್ಪರ್ಧಿಸಿ.',players:'ಆಟಗಾರರು',human:'ವ್ಯಕ್ತಿ',bot:'ದಿಯಾ (ಕಂಪ್ಯೂಟರ್)',start:'ಆರಂಭಿಸಿ',
 name:i=>['ಆಟಗಾರ 1','ಆಟಗಾರ 2','ಆಟಗಾರ 3','ಆಟಗಾರ 4'][i],youWord:'ನೀವು',
 rules:'ಮನೆ 100ಕ್ಕೆ ಓಡಿ. ಏಣಿ ಮೇಲೆ ಏರಿಸುತ್ತದೆ, ಹಾವು ಕೆಳಗೆ ಇಳಿಸುತ್ತದೆ. ದೀಪದ ಪ್ರಶ್ನೆಗೆ ಸರಿ ಉತ್ತರ ಕೊಟ್ಟರೆ ಮತ್ತೆ ಎಸೆಯುವ ಅವಕಾಶ.',
 tipStart:'ಆರಂಭಿಸಲು ದಾಳ ಎಸೆಯಿರಿ (ಅಥವಾ Space ಒತ್ತಿ). ಏಣಿ ಮೇಲೆ, ಹಾವು ಕೆಳಗೆ!',levelGo:(i,p)=>`ಹಂತ ${i} · ${p}`,starsRule:'★ ಗೆಲುವು · ★ 2 ದೀಪ ಹಚ್ಚಿ · ★ ಹಾವು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬಾರಿ ಕಚ್ಚದಿರಲಿ'}
};
const VIRTUES=[{en:"Kevat's kindness",hi:'केवट की सेवा',kn:'ಕೇವಟನ ಸೇವೆ'},{en:"Bharat's loyalty",hi:'भरत की निष्ठा',kn:'ಭರತನ ನಿಷ್ಠೆ'},{en:"Shabari's devotion",hi:'शबरी की भक्ति',kn:'ಶಬರಿಯ ಭಕ್ತಿ'},
 {en:"Jatayu's courage",hi:'जटायु का साहस',kn:'ಜಟಾಯುವಿನ ಧೈರ್ಯ'},{en:"Hanuman's great leap",hi:'हनुमान की छलाँग',kn:'ಹನುಮಂತನ ನೆಗೆತ'},{en:"Vibhishana's truth",hi:'विभीषण का सत्य',kn:'ವಿಭೀಷಣನ ಸತ್ಯ'},
 {en:"The squirrel's help",hi:'गिलहरी की मदद',kn:'ಅಳಿಲು ಸೇವೆ'},{en:"Lakshman's service",hi:'लक्ष्मण की सेवा',kn:'ಲಕ್ಷ್ಮಣನ ಸೇವೆ'},{en:"Sita's courage",hi:'सीता का धैर्य',kn:'ಸೀತೆಯ ಧೈರ್ಯ'}];
const TROUBLES=[{en:'Whispers that cause trouble',hi:'कान भरने वाली बातें',kn:'ಕಿವಿ ಊದುವ ಮಾತು'},{en:'Chasing what glitters',hi:'चमक के पीछे भागना',kn:'ಹೊಳಪಿನ ಹಿಂದೆ ಓಟ'},{en:'Anger',hi:'क्रोध',kn:'ಕೋಪ'},
 {en:'Laziness',hi:'आलस्य',kn:'ಸೋಮಾರಿತನ'},{en:'Not listening',hi:'किसी की न सुनना',kn:'ಯಾರ ಮಾತೂ ಕೇಳದಿರುವುದು'},{en:'Pride',hi:'अहंकार',kn:'ಅಹಂಕಾರ'},
 {en:'Breaking a promise',hi:'वचन तोड़ना',kn:'ಮಾತು ತಪ್ಪುವುದು'},{en:'Jealousy',hi:'ईर्ष्या',kn:'ಹೊಟ್ಟೆಕಿಚ್ಚು'},{en:'Greed',hi:'लालच',kn:'ದುರಾಸೆ'}];
const QUIZ=[
 {q:{en:'Why was the night Ram came home so dark?',hi:'राम के लौटने वाली रात इतनी अँधेरी क्यों थी?',kn:'ರಾಮ ಹಿಂದಿರುಗಿದ ರಾತ್ರಿ ಏಕೆ ಅಷ್ಟು ಕತ್ತಲಾಗಿತ್ತು?'},a:[{en:'It was Amavasya, the night with no moon',hi:'अमावस्या थी, बिना चाँद की रात',kn:'ಅಮಾವಾಸ್ಯೆ, ಚಂದ್ರನಿಲ್ಲದ ರಾತ್ರಿ'},{en:'There was a big storm',hi:'बड़ा तूफ़ान आया था',kn:'ದೊಡ್ಡ ಬಿರುಗಾಳಿ ಬಂದಿತ್ತು'},{en:'The sun forgot to set',hi:'सूरज डूबना भूल गया',kn:'ಸೂರ್ಯ ಮುಳುಗಲು ಮರೆತ'}]},
 {q:{en:'What does "Deepavali" mean?',hi:'"दीपावली" का अर्थ क्या है?',kn:'"ದೀಪಾವಳಿ" ಎಂದರೆ ಏನು?'},a:[{en:'A row of lamps (Deepa + Aavali)',hi:'दीयों की कतार (दीप + आवली)',kn:'ದೀಪಗಳ ಸಾಲು (ದೀಪ + ಆವಳಿ)'},{en:'A big sweet',hi:'एक बड़ी मिठाई',kn:'ಒಂದು ದೊಡ್ಡ ಸಿಹಿ'},{en:'A kind of firework',hi:'एक तरह का पटाखा',kn:'ಒಂದು ಬಗೆಯ ಪಟಾಕಿ'}]},
 {q:{en:'How many years were Ram, Sita and Lakshman in the forest?',hi:'राम, सीता और लक्ष्मण कितने वर्ष वन में रहे?',kn:'ರಾಮ, ಸೀತೆ, ಲಕ್ಷ್ಮಣ ಎಷ್ಟು ವರ್ಷ ಕಾಡಿನಲ್ಲಿದ್ದರು?'},a:[{en:'14 years',hi:'14 वर्ष',kn:'14 ವರ್ಷ'},{en:'7 years',hi:'7 वर्ष',kn:'7 ವರ್ಷ'},{en:'40 years',hi:'40 वर्ष',kn:'40 ವರ್ಷ'}]},
 {q:{en:'On which river does Ayodhya stand?',hi:'अयोध्या किस नदी के किनारे है?',kn:'ಅಯೋಧ್ಯೆ ಯಾವ ನದಿಯ ದಡದಲ್ಲಿದೆ?'},a:[{en:'The Sarayu',hi:'सरयू',kn:'ಸರಯೂ'},{en:'The Kaveri',hi:'कावेरी',kn:'ಕಾವೇರಿ'},{en:'The Narmada',hi:'नर्मदा',kn:'ನರ್ಮದಾ'}]},
 {q:{en:'Who first owned the Pushpak Vimana?',hi:'पुष्पक विमान पहले किसका था?',kn:'ಪುಷ್ಪಕ ವಿಮಾನ ಮೊದಲು ಯಾರದಾಗಿತ್ತು?'},a:[{en:'Kubera',hi:'कुबेर',kn:'ಕುಬೇರ'},{en:'Hanuman',hi:'हनुमान',kn:'ಹನುಮಂತ'},{en:'King Janaka',hi:'राजा जनक',kn:'ಜನಕ ರಾಜ'}]},
 {q:{en:'Who first told the Ramayana?',hi:'रामायण सबसे पहले किसने सुनाई?',kn:'ರಾಮಾಯಣವನ್ನು ಮೊದಲು ಹೇಳಿದವರು ಯಾರು?'},a:[{en:'Sage Valmiki',hi:'महर्षि वाल्मीकि',kn:'ವಾಲ್ಮೀಕಿ ಮಹರ್ಷಿ'},{en:'Sage Vyasa',hi:'महर्षि व्यास',kn:'ವ್ಯಾಸ ಮಹರ್ಷಿ'},{en:'King Dasharatha',hi:'राजा दशरथ',kn:'ದಶರಥ ರಾಜ'}]},
 {q:{en:'Who built the bridge to Lanka?',hi:'लंका तक पुल किसने बनाया?',kn:'ಲಂಕೆಗೆ ಸೇತುವೆ ಕಟ್ಟಿದವರು ಯಾರು?'},a:[{en:'Nala and Neela',hi:'नल और नील',kn:'ನಳ ಮತ್ತು ನೀಲ'},{en:'Sugriva',hi:'सुग्रीव',kn:'ಸುಗ್ರೀವ'},{en:'Jatayu',hi:'जटायु',kn:'ಜಟಾಯು'}]},
 {q:{en:"Who is Hanuman's mother?",hi:'हनुमान की माता कौन हैं?',kn:'ಹನುಮಂತನ ತಾಯಿ ಯಾರು?'},a:[{en:'Anjana',hi:'अंजना',kn:'ಅಂಜನಾ'},{en:'Kaushalya',hi:'कौशल्या',kn:'ಕೌಸಲ್ಯೆ'},{en:'Mandodari',hi:'मंदोदरी',kn:'ಮಂಡೋದರಿ'}]},
 {q:{en:"Who is Sita's father?",hi:'सीता के पिता कौन थे?',kn:'ಸೀತೆಯ ತಂದೆ ಯಾರು?'},a:[{en:'King Janaka',hi:'राजा जनक',kn:'ಜನಕ ರಾಜ'},{en:'King Dasharatha',hi:'राजा दशरथ',kn:'ದಶರಥ ರಾಜ'},{en:'Sugriva',hi:'सुग्रीव',kn:'ಸುಗ್ರೀವ'}]},
 {q:{en:'What did Hanuman give Sita in Lanka to show Ram sent him?',hi:'लंका में हनुमान ने राम की पहचान के लिए सीता को क्या दिया?',kn:'ಲಂಕೆಯಲ್ಲಿ ರಾಮನ ಗುರುತಾಗಿ ಹನುಮಂತ ಸೀತೆಗೆ ಏನು ಕೊಟ್ಟನು?'},a:[{en:"Ram's ring",hi:'राम की अँगूठी',kn:'ರಾಮನ ಉಂಗುರ'},{en:'A flower',hi:'एक फूल',kn:'ಒಂದು ಹೂವು'},{en:'A letter',hi:'एक पत्र',kn:'ಒಂದು ಪತ್ರ'}]},
 {q:{en:"Whose great bow did Ram lift in Mithila?",hi:'मिथिला में राम ने किसका धनुष उठाया?',kn:'ಮಿಥಿಲೆಯಲ್ಲಿ ರಾಮ ಯಾರ ಧನುಸ್ಸನ್ನು ಎತ್ತಿದನು?'},a:[{en:"Lord Shiva's",hi:'भगवान शिव का',kn:'ಶಿವನದು'},{en:"Ravana's",hi:'रावण का',kn:'ರಾವಣನದು'},{en:"Indra's",hi:'इंद्र का',kn:'ಇಂದ್ರನದು'}]},
 {q:{en:'Who was the teacher of Ram and Lakshman?',hi:'राम और लक्ष्मण के गुरु कौन थे?',kn:'ರಾಮ ಲಕ್ಷ್ಮಣರ ಗುರು ಯಾರು?'},a:[{en:'Sage Vishwamitra',hi:'ऋषि विश्वामित्र',kn:'ವಿಶ್ವಾಮಿತ್ರ ಮಹರ್ಷಿ'},{en:'Kumbhakarna',hi:'कुंभकर्ण',kn:'ಕುಂಭಕರ್ಣ'},{en:'Kevat',hi:'केवट',kn:'ಕೇವಟ'}]}];

/* Levels: board layout + place + theme. Tints: 4 square colours, rim colour, sky tint. */
const LEVELS=[
 {place:{en:'Ayodhya',hi:'अयोध्या',kn:'ಅಯೋಧ್ಯೆ'},line:{en:'Prince Ram is born to King Dasharatha.',hi:'राजा दशरथ के घर राजकुमार राम का जन्म हुआ।',kn:'ದಶರಥ ರಾಜನ ಮನೆಯಲ್ಲಿ ರಾಜಕುಮಾರ ರಾಮನ ಜನನ.'},
  tints:['#fbe3b2','#f9d2a0','#f6e7c9','#f3d9b7'],rim:'#7a3b22',icon:'👶',bot:.55},
 {place:{en:"Vishwamitra's ashram",hi:'विश्वामित्र का आश्रम',kn:'ವಿಶ್ವಾಮಿತ್ರರ ಆಶ್ರಮ'},line:{en:'Ram and Lakshman learn from Sage Vishwamitra.',hi:'राम और लक्ष्मण ऋषि विश्वामित्र से शिक्षा पाते हैं।',kn:'ರಾಮ ಲಕ್ಷ್ಮಣರು ವಿಶ್ವಾಮಿತ್ರ ಮಹರ್ಷಿಯಿಂದ ವಿದ್ಯೆ ಕಲಿಯುತ್ತಾರೆ.'},
  tints:['#e6efc8','#d6e6b0','#eef3d8','#dfe9bf'],rim:'#4d5a24',icon:'🏹',bot:.6},
 {place:{en:'Mithila',hi:'मिथिला',kn:'ಮಿಥಿಲೆ'},line:{en:"Ram lifts Shiva's great bow and marries Sita.",hi:'राम शिव का धनुष उठाते हैं और सीता से विवाह होता है।',kn:'ರಾಮ ಶಿವಧನುಸ್ಸನ್ನು ಎತ್ತಿ ಸೀತೆಯನ್ನು ವರಿಸುತ್ತಾನೆ.'},
  tints:['#fbd6dc','#f6c3cc','#fde6ea','#f8d0d7'],rim:'#8a2340',icon:'💐',bot:.62},
 {place:{en:'Chitrakoot',hi:'चित्रकूट',kn:'ಚಿತ್ರಕೂಟ'},line:{en:"Ram keeps his father's word and goes to the forest.",hi:'पिता का वचन निभाने राम वन जाते हैं।',kn:'ತಂದೆಯ ಮಾತು ಉಳಿಸಲು ರಾಮ ಕಾಡಿಗೆ ಹೋಗುತ್ತಾನೆ.'},
  tints:['#d9ecd0','#c6e2b9','#e6f2de','#cfe6c4'],rim:'#2f5a2a',icon:'🌳',bot:.66},
 {place:{en:'Panchavati',hi:'पंचवटी',kn:'ಪಂಚವಟಿ'},line:{en:'A golden deer appears near the hut. Careful!',hi:'कुटिया के पास सोने का हिरण दिखता है। सावधान!',kn:'ಕುಟೀರದ ಬಳಿ ಚಿನ್ನದ ಜಿಂಕೆ ಕಾಣಿಸುತ್ತದೆ. ಎಚ್ಚರ!'},
  tints:['#fbeab0','#f6dc8e','#fdf1c8','#f8e3a2'],rim:'#7a5a10',icon:'🦌',bot:.7},
 {place:{en:'Kishkindha',hi:'किष्किंधा',kn:'ಕಿಷ್ಕಿಂಧೆ'},line:{en:'Ram meets Hanuman and Sugriva.',hi:'राम की भेंट हनुमान और सुग्रीव से होती है।',kn:'ರಾಮನಿಗೆ ಹನುಮಂತ ಮತ್ತು ಸುಗ್ರೀವರ ಭೇಟಿ.'},
  tints:['#f3dcc4','#ebc9a8','#f7e7d6','#efd3b7'],rim:'#6b3a1c',icon:'🐒',bot:.74},
 {place:{en:'Rameswaram',hi:'रामेश्वरम',kn:'ರಾಮೇಶ್ವರ'},line:{en:'The vanara army builds a bridge across the sea.',hi:'वानर सेना समुद्र पर पुल बनाती है।',kn:'ವಾನರ ಸೇನೆ ಸಮುದ್ರಕ್ಕೆ ಸೇತುವೆ ಕಟ್ಟುತ್ತದೆ.'},
  tints:['#d2ecf4','#bde2ee','#e3f3f8','#c8e7f1'],rim:'#1f4f6b',icon:'🌊',bot:.78},
 {place:{en:'Lanka',hi:'लंका',kn:'ಲಂಕೆ'},line:{en:'Good wins over pride. Sita is free.',hi:'अहंकार पर अच्छाई की जीत। सीता मुक्त हुईं।',kn:'ಅಹಂಕಾರದ ಮೇಲೆ ಒಳ್ಳೆಯತನದ ಗೆಲುವು. ಸೀತೆ ಬಿಡುಗಡೆಯಾದಳು.'},
  tints:['#f7d3c0','#f0bfa6','#fbe2d4','#f3c9b3'],rim:'#7a1f14',icon:'🏰',bot:.82},
 {place:{en:'Return to Ayodhya',hi:'अयोध्या वापसी',kn:'ಅಯೋಧ್ಯೆಗೆ ಮರಳಿ'},goal:{en:'Ayodhya',hi:'अयोध्या',kn:'ಅಯೋಧ್ಯೆ'},line:{en:'Ram flies home. Light the lamps of Ayodhya!',hi:'राम घर लौटते हैं। अयोध्या के दीये जलाओ!',kn:'ರಾಮ ಮನೆಗೆ ಹಿಂದಿರುಗುತ್ತಾನೆ. ಅಯೋಧ್ಯೆಯ ದೀಪ ಹಚ್ಚಿ!'},
  tints:['#ffe7a6','#ffd98a','#fff0c4','#ffe09a'],rim:'#8a4b1c',icon:'🪔',bot:.86}];
const BOARDS=[{"L":[[2,19],[4,33],[6,28],[9,34],[23,47],[37,66],[62,87]],"S":[[65,52],[41,32],[40,30],[16,5]],"lamps":[18,54,61,91],"twist":0.3,"avg":24.8},{"L":[[4,31],[15,40],[19,43],[48,71],[51,73],[58,86],[68,83]],"S":[[81,66],[74,57],[60,39],[33,17],[24,13]],"lamps":[21,37,46,87],"twist":0.36,"avg":26.1},{"L":[[3,19],[25,49],[35,58],[42,66],[71,94],[72,95]],"S":[[83,62],[82,70],[75,56],[53,38],[30,17]],"lamps":[12,21,36,48,59],"twist":0.42,"avg":26.5},{"L":[[3,26],[21,38],[48,73],[63,79],[65,90],[66,89]],"S":[[92,80],[76,53],[70,55],[64,50],[51,37],[29,11]],"lamps":[13,25,45,52,85],"twist":0.48,"avg":30.0},{"L":[[6,21],[27,37],[50,71],[53,70],[72,95],[78,94]],"S":[[93,73],[89,65],[67,55],[64,36],[60,48],[54,41],[29,16]],"lamps":[7,12,46,68,77],"twist":0.54,"avg":30.3},{"L":[[38,56],[40,59],[71,83],[73,88],[76,98]],"S":[[94,74],[89,70],[85,68],[79,63],[77,61],[50,27],[44,25]],"lamps":[17,21,33,52,95],"twist":0.6,"avg":32.7},{"L":[[18,32],[38,57],[40,59],[42,53],[67,84]],"S":[[74,50],[51,22],[49,25],[46,15],[44,12],[29,6],[26,4],[23,7]],"lamps":[13,39,48,68,80,95],"twist":0.66,"avg":35.7},{"L":[[25,44],[41,62],[49,66],[68,89],[71,91]],"S":[[94,78],[83,45],[75,53],[60,42],[46,26],[39,20],[33,15],[29,13]],"lamps":[8,16,28,58,79,87],"twist":0.72,"avg":38.5},{"L":[[2,21],[40,52],[71,93],[75,86]],"S":[[94,57],[88,69],[77,60],[73,53],[46,26],[42,24],[41,7],[23,6]],"lamps":[11,35,44,56,70,95],"twist":0.78,"avg":46.4}];
LEVELS.forEach((l,i)=>Object.assign(l,BOARDS[i]));

const COLORS=['#e0405a','#3a6fd8','#46b882','#9b59d0'];
let lang='en';try{lang=localStorage.getItem('sq_lang')||'en'}catch(e){}
{const q=new URLSearchParams(location.search).get('lang');if(['en','hi','kn'].includes(q))lang=q}
if(!L[lang])lang='en';
const t=k=>L[lang][k], tx=o=>o[lang]||o.en, $=s=>document.querySelector(s), sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ======================= save ======================= */
let SAVE={unlocked:1,stars:[]};
try{const s=JSON.parse(localStorage.getItem('rta3d')||'null');if(s&&s.unlocked)SAVE=s}catch(e){}
function persist(){try{localStorage.setItem('rta3d',JSON.stringify(SAVE))}catch(e){}}

/* ======================= audio ======================= */
let AC=null,sfxOn=true,musicOn=true,musicNode=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d=.12,type='triangle',v=.18,when=0,slide=0,dest){if(!sfxOn&&!dest)return;const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain();o.type=type;const t0=a.currentTime+when;
 o.frequency.setValueAtTime(f,t0);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,f+slide),t0+d);g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d);
 o.connect(g).connect(dest||a.destination);o.start(t0);o.stop(t0+d+.05)}
function noise(d=.25,v=.12,when=0,hp=800,lp=12000){if(!sfxOn)return;const a=ac();if(!a)return;const b=a.createBuffer(1,Math.max(1,a.sampleRate*d|0),a.sampleRate),ch=b.getChannelData(0);for(let i=0;i<ch.length;i++)ch[i]=(Math.random()*2-1)*(1-i/ch.length);
 const s=a.createBufferSource(),f=a.createBiquadFilter(),f2=a.createBiquadFilter(),g=a.createGain();f.type='highpass';f.frequency.value=hp;f2.type='lowpass';f2.frequency.value=lp;s.buffer=b;g.gain.value=v;s.connect(f).connect(f2).connect(g).connect(a.destination);s.start(a.currentTime+when)}
const SFX={
 dice(){for(let i=0;i<9;i++)noise(.045,.16,i*.075+Math.random()*.02,1500,6000);tone(180,.08,'square',.05,.7)},
 hop(i=0){tone(330+i*12,.09,'sine',.14);noise(.03,.06,0,2000,5000)},
 land(){tone(196,.18,'sine',.16);noise(.12,.05,0,200,1200)},
 ladder(){[523,587,659,784,880,1047,1175].forEach((f,i)=>tone(f,.18,'triangle',.12,i*.08))},
 snake(){tone(820,1.0,'sawtooth',.05,0,-640);noise(1.0,.07,0,2500)},
 hiss(){noise(.5,.06,0,3500)},
 right(){[784,988,1175,1568].forEach((f,i)=>tone(f,.22,'sine',.15,i*.09))},
 wrong(){tone(220,.25,'square',.07);tone(180,.3,'square',.06,.12)},
 bell(){tone(1568,.9,'sine',.1);tone(2093,.7,'sine',.05,.02);tone(3136,.4,'sine',.03,.04)},
 conch(){tone(233,1.6,'sawtooth',.045,0,8);tone(466,1.6,'sine',.06,0,6);tone(349,1.2,'sine',.03,.3)},
 win(){[523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,.3,'triangle',.15,i*.12));for(let i=0;i<10;i++)noise(.35,.09,.9+i*.2,300)},
 lose(){[392,349,311,262].forEach((f,i)=>tone(f,.35,'triangle',.12,i*.18))},
 click(){tone(900,.04,'sine',.06)}};
/* Music: soft tanpura drone (Pa–Sa–Sa–Sa) with a slow bansuri-like phrase. Loops while musicOn. */
function startMusic(){const a=ac();if(!a||musicNode)return;const out=a.createGain();out.gain.value=musicOn?.5:0;out.connect(a.destination);musicNode=out;
 const sa=146.83, pa=sa*1.5;let n=0;
 const pluck=(f,v)=>{const t0=a.currentTime;[1,2,3,4].forEach((h,i)=>{const o=a.createOscillator(),g=a.createGain();o.type=i?'sine':'triangle';o.frequency.value=f*h;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v/(h*1.4),t0+.03);g.gain.exponentialRampToValueAtTime(.0001,t0+2.6);o.connect(g).connect(out);o.start(t0);o.stop(t0+2.7)})};
 const mel=[0,2,4,7,9,7,4,2,0,null,4,7,9,12,9,7,null,null];const scale=r=>sa*2*Math.pow(2,r/12);let m=0;
 setInterval(()=>{if(!musicOn)return;const seq=[pa/2,sa,sa,sa/2];pluck(seq[n%4],.05);n++;
  if(n%2===0){const r=mel[m++%mel.length];if(r!==null){const t0=a.currentTime,o=a.createOscillator(),g=a.createGain(),v=a.createOscillator(),vg=a.createGain();o.type='sine';o.frequency.value=scale(r);v.frequency.value=5;vg.gain.value=3;v.connect(vg).connect(o.frequency);
   g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.025,t0+.12);g.gain.exponentialRampToValueAtTime(.0001,t0+1.1);o.connect(g).connect(out);o.start(t0);v.start(t0);o.stop(t0+1.2);v.stop(t0+1.2)}}},700)}
function setMusic(on){musicOn=on;if(musicNode)musicNode.gain.value=on?.5:0;$('#music').setAttribute('aria-pressed',on);$('#music').style.opacity=on?1:.6}

/* ======================= 3D scene ======================= */
const canvas=$('#scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(2,devicePixelRatio||1));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(36,1,.1,200);
scene.add(new THREE.HemisphereLight(0xfff1d6,0x2a1f5c,.85));
const sun=new THREE.DirectionalLight(0xffe2b0,1.6);sun.position.set(-6,14,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:40});sun.shadow.bias=-.0005;scene.add(sun);
const rimLight=new THREE.PointLight(0xffb84a,0,8);scene.add(rimLight);

const world=new THREE.Group();scene.add(world);
const sq=n=>{n=Math.max(1,Math.min(100,n));const r=Math.floor((n-1)/10),c0=(n-1)%10,c=r%2===0?c0:9-c0;return new THREE.Vector3(c-4.5,0,4.5-r)};

/* static helpers */
const woodMat=new THREE.MeshStandardMaterial({color:0x8a4b1c,roughness:.7});
const goldMat=new THREE.MeshStandardMaterial({color:0xe6a85a,roughness:.45,metalness:.2});
let boardGroup=null, hoverables=[], lampObjs={};

function boardTexture(lv){
 const N=1024,cv=document.createElement('canvas');cv.width=cv.height=N;const c=cv.getContext('2d'),cs=N/10;
 for(let n=1;n<=100;n++){const r=Math.floor((n-1)/10),c0=(n-1)%10,col=r%2===0?c0:9-c0,x=col*cs,y=N-(r+1)*cs;
  c.fillStyle=n===100?'#ffd35a':n===1?'#fff3d0':lv.tints[(n+r)%4];c.fillRect(x,y,cs,cs);
  c.strokeStyle='#00000022';c.lineWidth=2;c.strokeRect(x+1,y+1,cs-2,cs-2);
  c.fillStyle='#ffffff55';c.fillRect(x+3,y+3,cs-6,4);
  c.fillStyle='#5a2b10';c.font=`800 ${cs*.26}px "Baloo 2",sans-serif`;c.textAlign='left';c.textBaseline='top';c.fillText(n,x+7,y+4);
  if(lv.lamps.includes(n)){const g=c.createRadialGradient(x+cs/2,y+cs*.58,2,x+cs/2,y+cs*.58,cs*.48);g.addColorStop(0,'#ffd35a99');g.addColorStop(1,'#ffd35a00');c.fillStyle=g;c.fillRect(x,y,cs,cs)}}
 // start & goal labels
 const lab=(n,txt,col)=>{const p=sq(n);const x=(p.x+5)*cs,y=(p.z+5)*cs;c.fillStyle=col;c.font=`800 ${cs*.15}px "Baloo 2",sans-serif`;c.textAlign='center';c.textBaseline='bottom';c.fillText(txt,x,y+cs*.46)};
 lab(1,'START','#3a6fd8');lab(100,tx(lv.goal||lv.place).toUpperCase().slice(0,16),'#7a1f14');
 c.font=`${cs*.36}px serif`;c.textAlign='center';c.textBaseline='middle';const g=sq(100);c.fillText(lv.icon,(g.x+5)*cs,(g.z+5)*cs-cs*.02);
 const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();return tex}

function tubeAlong(points,radius,mat,radial=8){const curve=new THREE.CatmullRomCurve3(points);const m=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(8,points.length*6),radius,radial,false),mat);m.castShadow=true;return m}

function makeLadder(a,b,idx){
 const A=sq(a),B=sq(b),g=new THREE.Group(),dir=B.clone().sub(A),len=dir.length(),side=new THREE.Vector3(-dir.z,0,dir.x).normalize().multiplyScalar(.17);
 const H=.22+len*.035,pt=(s,k)=>A.clone().lerp(B,s).add(side.clone().multiplyScalar(k)).setY(.08+Math.sin(s*Math.PI)*H);
 const railPts=k=>Array.from({length:12},(_,i)=>pt(i/11,k));
 g.add(tubeAlong(railPts(1),.045,woodMat),tubeAlong(railPts(-1),.045,woodMat));
 const steps=Math.max(3,Math.round(len/.42));
 for(let i=1;i<steps;i++){const s=i/steps,p1=pt(s,1),p2=pt(s,-1);const r=new THREE.Mesh(new THREE.CylinderGeometry(.028,.028,p1.distanceTo(p2),6),goldMat);
  r.position.copy(p1).add(p2).multiplyScalar(.5);r.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),p2.clone().sub(p1).normalize());r.castShadow=true;g.add(r)}
 g.userData={kind:'ladder',from:a,to:b,title:VIRTUES[idx%VIRTUES.length],path:railPts(0)};g.traverse(o=>{o.userData.owner=g});return g}

const SNAKE_COLS=[[0x2e8b57,0xa7e36b],[0xc0392b,0xf5b041],[0x6c3fb5,0xd7b8ff],[0x1f6fb2,0x86d0ff],[0xb0306a,0xffb3d1],[0x3b7d2a,0xe9f07a],[0x8a4b1c,0xffd08a],[0x0f7c7c,0x9ef0e6],[0x5b2c83,0xffd35a]];
function snakePoints(a,b,i,twist){const A=sq(a),B=sq(b),d=B.clone().sub(A),len=d.length(),n=new THREE.Vector3(-d.z,0,d.x).normalize();
 const waves=Math.max(1.5,len/1.45)*(1+twist*.6),amp=.36+twist*.5,sgn=i%2?1:-1,pts=[];
 for(let k=0;k<=40;k++){const s=k/40,w=Math.sin(s*Math.PI*waves)*amp*sgn*Math.pow(Math.sin(s*Math.PI),.55);pts.push(A.clone().lerp(B,s).add(n.clone().multiplyScalar(w)).setY(.14+Math.sin(s*Math.PI*waves*2)*.03))}
 return pts}
function makeSnake(a,b,i,twist){
 const pts=snakePoints(a,b,i,twist),curve=new THREE.CatmullRomCurve3(pts),TS=160,RS=10,R=.15;
 const geo=new THREE.TubeGeometry(curve,TS,R,RS,false),pos=geo.attributes.position,cols=[],[c1,c2]=SNAKE_COLS[i%SNAKE_COLS.length],C1=new THREE.Color(c1),C2=new THREE.Color(c2),tmp=new THREE.Vector3();
 for(let s=0;s<=TS;s++){const u=s/TS,ctr=curve.getPointAt(u),taper=s<4?.85+s*.04:1-.78*Math.pow(u,1.15);
  for(let r=0;r<=RS;r++){const k=s*(RS+1)+r;tmp.fromBufferAttribute(pos,k).sub(ctr).multiplyScalar(taper);
   tmp.y*=.8;pos.setXYZ(k,ctr.x+tmp.x,Math.max(.02,ctr.y+tmp.y),ctr.z+tmp.z);const band=(s%12<5),belly=r>RS*.35&&r<RS*.65;const C=(band||belly)?C2:C1;cols.push(C.r,C.g,C.b)}}
 geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.computeVertexNormals();
 const mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.38,metalness:.08});const body=new THREE.Mesh(geo,mat);body.castShadow=true;
 const g=new THREE.Group();g.add(body);
 // head
 const head=new THREE.Group(),hm=new THREE.MeshStandardMaterial({color:c1,roughness:.35});
 const skull=new THREE.Mesh(new THREE.SphereGeometry(.2,20,14),hm);skull.scale.set(1.35,.72,1);skull.castShadow=true;head.add(skull);
 const eyeW=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.2}),eyeB=new THREE.MeshStandardMaterial({color:0x111111,roughness:.1});
 [-1,1].forEach(s=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),eyeW);e.position.set(.08,.1,s*.1);head.add(e);const p=new THREE.Mesh(new THREE.SphereGeometry(.032,8,6),eyeB);p.position.set(.12,.12,s*.11);head.add(p)});
 const tongue=new THREE.Mesh(new THREE.BoxGeometry(.2,.012,.03),new THREE.MeshStandardMaterial({color:0xe0405a}));tongue.position.set(.33,-.02,0);head.add(tongue);
 const p0=curve.getPointAt(0),p1=curve.getPointAt(.03);const dir=p0.clone().sub(p1).normalize();head.position.copy(p0).add(dir.clone().multiplyScalar(.06)).setY(.17);
 head.rotation.y=Math.atan2(-dir.z,dir.x);g.add(head);
 g.userData={kind:'snake',from:a,to:b,title:TROUBLES[i%TROUBLES.length],path:curve.getSpacedPoints(60),head,tongue,mat};g.traverse(o=>{o.userData.owner=g});return g}

function makeLamp(n){const g=new THREE.Group(),p=sq(n);g.position.set(p.x+.18,0,p.z+.12);
 const bowl=new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0,0),new THREE.Vector2(.14,.02),new THREE.Vector2(.19,.09),new THREE.Vector2(.17,.1),new THREE.Vector2(.0,.07)],18),new THREE.MeshStandardMaterial({color:0xb8643a,roughness:.8}));
 bowl.castShadow=true;g.add(bowl);
 const flame=new THREE.Mesh(new THREE.ConeGeometry(.05,.16,10),new THREE.MeshBasicMaterial({color:0xffb02e}));flame.position.set(.08,.17,0);g.add(flame);
 const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex(),color:0xffc04a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.35}));glow.scale.set(.5,.5,1);glow.position.copy(flame.position);g.add(glow);
 g.userData={flame,glow,lit:false,n};flame.visible=true;flame.scale.setScalar(.45);return g}
let _glow=null;function glowTex(){if(_glow)return _glow;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'#fff');g.addColorStop(.3,'#ffffff88');g.addColorStop(1,'#fff0');x.fillStyle=g;x.fillRect(0,0,64,64);_glow=new THREE.CanvasTexture(c);return _glow}

function buildBoard(lv,li){
 if(boardGroup){world.remove(boardGroup);boardGroup.traverse(o=>{o.geometry?.dispose();[].concat(o.material||[]).forEach(m=>{if(m.map&&m.map!==_glow&&m.map.dispose)m.map.dispose();if(m.dispose)m.dispose()})})}
 boardGroup=new THREE.Group();hoverables=[];lampObjs={};
 const rim=new THREE.Color(lv.rim);
 const base=new THREE.Mesh(new THREE.BoxGeometry(11,.5,11),new THREE.MeshStandardMaterial({color:rim,roughness:.6}));base.position.y=-.33;base.receiveShadow=true;base.castShadow=true;boardGroup.add(base);
 const trim=new THREE.Mesh(new THREE.BoxGeometry(10.5,.12,10.5),new THREE.MeshStandardMaterial({color:0xf6a723,roughness:.4,metalness:.3}));trim.position.y=-.1;boardGroup.add(trim);
 const topMats=[0,0,0,0,0,0].map(()=>new THREE.MeshStandardMaterial({color:0xc9a46a,roughness:.8}));topMats[2]=new THREE.MeshStandardMaterial({map:boardTexture(lv),roughness:.85});
 const top=new THREE.Mesh(new THREE.BoxGeometry(10,.14,10),topMats);top.position.y=-.07;top.receiveShadow=true;boardGroup.add(top);
 // corner finials
 [[-5.25,-5.25],[5.25,-5.25],[-5.25,5.25],[5.25,5.25]].forEach(([x,z])=>{const f=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),goldMat);f.position.set(x,0,z);f.castShadow=true;boardGroup.add(f)});
 lv.L.forEach(([a,b],i)=>{const m=makeLadder(a,b,i+li);boardGroup.add(m);hoverables.push(m)});
 lv.S.forEach(([a,b],i)=>{const m=makeSnake(a,b,i+li,lv.twist);boardGroup.add(m);hoverables.push(m)});
 lv.lamps.forEach(n=>{const l=makeLamp(n);boardGroup.add(l);lampObjs[n]=l});
 // goal gate
 const gp=sq(100),gate=new THREE.Group();const pil=new THREE.MeshStandardMaterial({color:0xb8643a,roughness:.6});
 [-1,1].forEach(s=>{const p=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.55,10),pil);p.position.set(s*.32,.27,-.3);p.castShadow=true;gate.add(p)});
 const arch=new THREE.Mesh(new THREE.TorusGeometry(.32,.05,8,24,Math.PI),new THREE.MeshStandardMaterial({color:0xe0405a,roughness:.4}));arch.position.set(0,.55,-.3);arch.castShadow=true;gate.add(arch);
 const flag=new THREE.Mesh(new THREE.ConeGeometry(.08,.2,4),new THREE.MeshStandardMaterial({color:0xf6a723}));flag.position.set(0,.95,-.3);flag.rotation.z=-Math.PI/2;gate.add(flag);
 gate.position.copy(gp);boardGroup.add(gate);boardGroup.userData.flag=flag;
 world.add(boardGroup)}

/* pawns */
function makePawn(color,bot){const g=new THREE.Group();
 const prof=[[0,0],[.22,0],[.24,.04],[.2,.08],[.13,.14],[.1,.3],[.13,.36],[.09,.4],[0,.42]].map(([x,y])=>new THREE.Vector2(x,y));
 const m=new THREE.MeshStandardMaterial({color,roughness:.28,metalness:.15});const b=new THREE.Mesh(new THREE.LatheGeometry(prof,24),m);b.castShadow=true;g.add(b);
 const h=new THREE.Mesh(new THREE.SphereGeometry(.12,20,16),m);h.position.y=.5;h.castShadow=true;g.add(h);
 if(bot){const tex=new THREE.TextureLoader().load('img/diya_wave.png',tx=>{tx.colorSpace=THREE.SRGBColorSpace});const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));s.scale.set(.55,.55,1);s.position.y=.95;g.add(s)}
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,8,32),new THREE.MeshBasicMaterial({color,transparent:true,opacity:0}));ring.rotation.x=Math.PI/2;ring.position.y=.02;g.add(ring);
 g.userData={ring};return g}

/* dice: separate small renderer */
const dcv=$('#dice'),drend=new THREE.WebGLRenderer({canvas:dcv,antialias:true,alpha:true});drend.setPixelRatio(Math.min(2,devicePixelRatio||1));
const dscene=new THREE.Scene(),dcam=new THREE.PerspectiveCamera(32,1,.1,20);dcam.position.set(0,3.1,2.4);dcam.lookAt(0,0,0);
dscene.add(new THREE.HemisphereLight(0xffffff,0x553366,1.1));const dl=new THREE.DirectionalLight(0xffffff,1.4);dl.position.set(-2,4,3);dscene.add(dl);
function faceTex(v){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#fffaf0';x.fillRect(0,0,128,128);x.strokeStyle='#e9d6b0';x.lineWidth=10;x.strokeRect(5,5,118,118);
 const P={1:[[64,64]],2:[[34,34],[94,94]],3:[[30,30],[64,64],[98,98]],4:[[34,34],[94,34],[34,94],[94,94]],5:[[32,32],[96,32],[64,64],[32,96],[96,96]],6:[[34,30],[34,64],[34,98],[94,30],[94,64],[94,98]]}[v];
 x.fillStyle=v===1?'#e0405a':'#3a1d0c';P.forEach(([a,b])=>{x.beginPath();x.arc(a,b,v===1?17:12,0,7);x.fill()});const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const FACE_VAL=[3,4,1,6,2,5]; // +x,-x,+y,-y,+z,-z
const NORMALS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(a=>new THREE.Vector3(...a));
const die=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),FACE_VAL.map(v=>new THREE.MeshStandardMaterial({map:faceTex(v),roughness:.35})));dscene.add(die);
die.quaternion.setFromUnitVectors(NORMALS[2],new THREE.Vector3(0,1,0));
function sizeDice(){const r=dcv.getBoundingClientRect();drend.setSize(r.width,r.height,false);dcam.aspect=1;dcam.updateProjectionMatrix()}
let diceAnim=null;
function rollDie(v){return new Promise(res=>{const k=FACE_VAL.indexOf(v),q=new THREE.Quaternion().setFromUnitVectors(NORMALS[k],new THREE.Vector3(0,1,0));
 q.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),(Math.random()-.5)*.8));
 const axis=new THREE.Vector3(Math.random()-.5,Math.random()*.4,Math.random()-.5).normalize(),start=performance.now(),D=950;
 diceAnim=now=>{const s=Math.min(1,(now-start)/D),e=1-Math.pow(1-s,3);const spin=new THREE.Quaternion().setFromAxisAngle(axis,(1-e)*Math.PI*7);
  die.quaternion.copy(q).premultiply(spin);die.position.y=Math.abs(Math.sin(s*Math.PI*3))*(1-s)*.9;if(s>=1){diceAnim=null;die.position.y=0;res()}}})}

/* ======================= layout & camera fit ======================= */
let area={x:0,y:0,w:1,h:1},W=1,H=1,portrait=false;
function layout(){W=innerWidth;H=innerHeight;portrait=W/H<1;renderer.setSize(W,H,false);
 const rail=document.querySelector('.rail').getBoundingClientRect(),top=50;
 if(portrait){area={x:0,y:92,w:W,h:Math.max(200,rail.top-96)}}else{area={x:0,y:top,w:Math.max(200,rail.left-6),h:H-top}}
 camera.aspect=area.w/area.h;fitCamera();sizeDice();fxSize()}
const camDir=new THREE.Vector3(0,Math.sin(THREE.MathUtils.degToRad(57)),Math.cos(THREE.MathUtils.degToRad(57)));
let camDist=20,camTarget=new THREE.Vector3(0,0,.25);
function fitCamera(){const corners=[[-5.6,-5.6],[5.6,-5.6],[-5.6,5.6],[5.6,5.6]].map(([x,z])=>new THREE.Vector3(x,.3,z));corners.push(new THREE.Vector3(sq(100).x,1.1,sq(100).z));
 let lo=6,hi=60;for(let i=0;i<24;i++){const d=(lo+hi)/2;camera.position.copy(camTarget).addScaledVector(camDir,d);camera.lookAt(camTarget);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  const ok=corners.every(c=>{const p=c.clone().project(camera);return Math.abs(p.x)<.97&&Math.abs(p.y)<.96});if(ok)hi=d;else lo=d}
 camDist=hi}
const ptr={x:0,y:0};let shake=0;
function placeCamera(ts){const az=ptr.x*.05+Math.sin(ts/5200)*.012,el=ptr.y*.03;
 const dir=camDir.clone().applyAxisAngle(new THREE.Vector3(0,1,0),az);dir.y+=el;dir.normalize();
 camera.position.copy(camTarget).addScaledVector(dir,camDist);if(shake>0){camera.position.x+=(Math.random()-.5)*shake;camera.position.y+=(Math.random()-.5)*shake;shake*=.9;if(shake<.002)shake=0}
 camera.lookAt(camTarget)}

/* screen-space effects (2D overlay) */
const fx=$('#fx'),fc=fx.getContext('2d');let fdpr=1;const parts=[];
function fxSize(){fdpr=Math.min(2,devicePixelRatio||1);fx.width=W*fdpr;fx.height=H*fdpr;fc.setTransform(fdpr,0,0,fdpr,0,0)}
function toScreen(v){const p=v.clone().project(camera);return[area.x+(p.x+1)/2*area.w,area.y+(1-p.y)/2*area.h]}
function burst(x,y,kind='spark',n=30){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=kind==='fire'?2+Math.random()*5:kind==='smoke'?.5+Math.random()*1.5:1+Math.random()*4;
 parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-(kind==='petal'?1:kind==='smoke'?.8:2),life:1,kind,
  col:kind==='petal'?['#f6a723','#e0405a','#ffd35a','#ff8fb1'][i%4]:kind==='fire'?['#ffd35a','#ff7b54','#7fd3ff','#b98cff','#9cff8a'][Math.random()*5|0]:kind==='smoke'?'#5b2c4a':kind==='green'?'#9cff8a':'#ffd35a',
  r:kind==='petal'?5+Math.random()*4:kind==='smoke'?6+Math.random()*8:2+Math.random()*2.5,rot:Math.random()*6})}}
function burstAt(v,kind,n){const[x,y]=toScreen(v);burst(x,y,kind,n)}
function fxDraw(){fc.clearRect(0,0,W,H);for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx;p.y+=p.vy;p.vy+=p.kind==='petal'?.04:p.kind==='smoke'?-.02:.08;p.vx*=.98;
  p.life-=p.kind==='petal'?.008:p.kind==='smoke'?.02:.018;p.rot+=.1;if(p.life<=0){parts.splice(i,1);continue}fc.globalAlpha=Math.max(0,p.life)*(p.kind==='smoke'?.5:1);
  if(p.kind==='petal'){fc.save();fc.translate(p.x,p.y);fc.rotate(p.rot);fc.fillStyle=p.col;fc.beginPath();fc.ellipse(0,0,p.r,p.r*.55,0,0,7);fc.fill();fc.restore()}
  else{fc.fillStyle=p.col;fc.beginPath();fc.arc(p.x,p.y,p.r*(p.kind==='smoke'?(2-p.life):1),0,7);fc.fill()}}fc.globalAlpha=1}

/* ======================= game state ======================= */
let G=null,LV=0,players=[],playerCfg=[{name:null,bot:false},{name:'Diya',bot:true}];
const pawnMeshes=[];
function pawnSpot(i){const p=G.players[i],base=sq(p.pos||1),same=G.players.filter(q=>(q.pos||1)===(p.pos||1)),k=same.indexOf(p),n=same.length;
 if(n>1){const a=k/n*Math.PI*2;base.x+=Math.cos(a)*.2;base.z+=Math.sin(a)*.2}if(!p.pos){base.x+=-.62+i*.0;base.z+=.85-i*.0;base.x+= (i%2)*.32-.1; base.z+=Math.floor(i/2)*.32}return base}
function displayName(p){return p.name===null?t('youWord'):p.name}

function startLevel(li){
 LV=li;const lv=LEVELS[li];buildBoard(lv,li);
 pawnMeshes.forEach(m=>world.remove(m));pawnMeshes.length=0;
 G={players:playerCfg.map((c,i)=>({name:c.name,bot:c.bot,color:COLORS[i],pos:0,lamps:0,lit:0,bites:0})),turn:0,busy:false,winner:null,lit:{},usedQ:[]};
 G.players.forEach((p,i)=>{const m=makePawn(p.color,p.bot);pawnMeshes.push(m);world.add(m);m.position.copy(pawnSpot(i))});
 renderUI();toast(t('levelGo')(li+1,tx(lv.place))+' — '+tx(lv.line),'',3200);
 SFX.conch();WOW.start();setHint(true);maybeBot()}

/* ======================= UI ======================= */
function renderUI(){
 $('#t-eyebrow').textContent=t('eyebrow');$('#t-title').textContent=t('title');$('#t-lamps').textContent=t('lamps');$('#roll').textContent=t('roll');
 $('#move').textContent=t('move');$('#reroll').textContent=t('reroll');document.documentElement.lang=lang;document.title=t('title')+' · Moksha Patam 3D';
 document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===lang));
 $('#lvchip').textContent=`${t('level')} ${LV+1}/${LEVELS.length} · ${tx(LEVELS[LV].place)} ▾`;
 if(!G)return;
 $('#players').innerHTML=G.players.map((p,i)=>`<div class="pl ${i===G.turn&&!G.winner?'turn':''}"><i style="background:${p.color}"></i><b>${esc(displayName(p))}</b>${p.lamps?`<em>🪔${p.lamps}</em>`:''}<span>${p.pos||0}/100</span></div>`).join('');
 const me=G.players.find(p=>!p.bot)||G.players[0];
 $('#tok').innerHTML=[0,1,2].map(i=>`<span class="${i<me.lamps?'on':''}">🪔</span>`).join('');
 $('#prog').innerHTML=LEVELS.map((_,i)=>`<span class="${i===LV?'cur':(SAVE.stars[i]?'done':'')}" title="${tx(LEVELS[i].place)}"></span>`).join('')}
function setHint(first){if(!G||G.winner)return;const p=G.players[G.turn];
 $('#hint').textContent=first&&!p.bot&&!SAVE.played?t('tipStart'):p.bot?t('botTurn')(displayName(p)):t('yourTurn')(G.players.filter(q=>!q.bot).length>1?displayName(p):(p.name===null?null:p.name));
 $('#roll').disabled=G.busy||p.bot;$('#roll').classList.toggle('pulse',!G.busy&&!p.bot);renderUI()}
let toastT=null;function toast(msg,cls='',ms=1900){const d=$('#toast div');d.className='';d.textContent=msg;void d.offsetWidth;d.className='on '+cls;clearTimeout(toastT);toastT=setTimeout(()=>d.className=cls,ms)}
function overlay(html,cls=''){$('#overlay').innerHTML=`<div class="ov"><div class="card ${cls}">${html}</div></div>`;return $('#overlay .card')}
function closeOv(){$('#overlay').innerHTML=''}

/* ======================= moves ======================= */
function animate(fn,ms){return new Promise(res=>{const t0=performance.now();(function st(now){const s=Math.min(1,(now-t0)/ms);fn(s);if(s<1)requestAnimationFrame(st);else res()})(performance.now())})}
async function hopTo(i,target){const p=G.players[i],m=pawnMeshes[i];let step=0;const dir=target>p.pos?1:-1;
 while(p.pos!==target){const from=m.position.clone();p.pos+=dir;const to=sq(p.pos);
  await animate(s=>{m.position.lerpVectors(from,to,s);m.position.y=Math.sin(s*Math.PI)*.45;m.scale.set(1,1+Math.sin(s*Math.PI)*.12,1)},150);SFX.hop(step++)}
 const end=pawnSpot(i);await animate(s=>{m.position.lerp(end,s)},100);burstAt(m.position,'spark',8);SFX.land()}
async function followPath(i,path,ms,lift){const m=pawnMeshes[i];const curve=new THREE.CatmullRomCurve3(path.map(v=>v.clone()));
 await animate(s=>{const e=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;const v=curve.getPointAt(e);m.position.set(v.x,v.y+lift,v.z);if(Math.random()<.4)burstAt(m.position,lift>.2?'green':'smoke',1)},ms)}
function pickQ(){let pool=QUIZ.map((_,i)=>i).filter(i=>!G.usedQ.includes(i));if(!pool.length){G.usedQ=[];pool=QUIZ.map((_,i)=>i)}const q=pool[Math.random()*pool.length|0];G.usedQ.push(q);return QUIZ[q]}
function quiz(p){const Q=pickQ(),order=[0,1,2].sort(()=>Math.random()-.5);WOW.stop();
 return new Promise(res=>{const c=overlay(`<span class="tag">🪔 ${t('storyTag')}</span><h3>${tx(Q.q)}</h3><div class="opts">${order.map(i=>`<button class="opt" data-i="${i}">${tx(Q.a[i])}</button>`).join('')}</div><p id="fb"></p>`);
  const choose=i=>{c.querySelectorAll('.opt').forEach(b=>{b.disabled=true;if(+b.dataset.i===0)b.classList.add('right');else if(+b.dataset.i===i)b.classList.add('wrong')});
   const ok=i===0;c.querySelector('#fb').textContent=ok?t('right'):t('wrong')(tx(Q.a[0]));ok?SFX.right():SFX.wrong();
   if(ok){const r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+40,'spark',40)}
   c.insertAdjacentHTML('beforeend',`<button class="go" id="ok">${t('ok')}</button>`);const b=c.querySelector('#ok');b.focus();b.onclick=()=>{closeOv();WOW.start();res(ok)};if(p.bot)setTimeout(()=>b.isConnected&&b.click(),1500)};
  c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
  if(p.bot)setTimeout(()=>choose(Math.random()<LEVELS[LV].bot?0:order.find(i=>i!==0)),1300)})}

async function resolveSquare(i){const p=G.players[i],lv=LEVELS[LV];
 const lad=hoverables.find(h=>h.userData.kind==='ladder'&&h.userData.from===p.pos),snk=hoverables.find(h=>h.userData.kind==='snake'&&h.userData.from===p.pos);
 if(lad){toast(`🪜 ${tx(lad.userData.title)}  ${lad.userData.from} → ${lad.userData.to}`,'ladder');SFX.ladder();glowObj(lad,0x46b882);
  await followPath(i,lad.userData.path,1000,.1);p.pos=lad.userData.to;pawnMeshes[i].position.copy(pawnSpot(i));burstAt(pawnMeshes[i].position,'spark',30);return resolveSquare(i)}
 if(snk){toast(`🐍 ${tx(snk.userData.title)}  ${snk.userData.from} → ${snk.userData.to}`,'snake');SFX.snake();shake=.25;p.bites++;snk.userData.bite=performance.now();glowObj(snk,0xe0405a);
  await followPath(i,snk.userData.path,1300,.06);p.pos=snk.userData.to;pawnMeshes[i].position.copy(pawnSpot(i));burstAt(pawnMeshes[i].position,'smoke',14);return}
 if(lv.lamps.includes(p.pos)&&!G.lit[p.pos]){const ok=await quiz(p);if(ok){G.lit[p.pos]=1;p.lit++;p.lamps=Math.min(3,p.lamps+1);lightLamp(p.pos);SFX.bell();renderUI()}}}
function glowObj(g,col){g.traverse(o=>{if(o.material&&o.material.emissive){o.material.emissive.setHex(col);o.material.emissiveIntensity=.6}});setTimeout(()=>g.traverse(o=>{if(o.material&&o.material.emissive)o.material.emissiveIntensity=0}),1300)}
function lightLamp(n){const l=lampObjs[n];if(!l)return;l.userData.lit=true;l.userData.flame.scale.setScalar(1);l.userData.glow.material.opacity=.9;l.userData.glow.scale.set(1.1,1.1,1);burstAt(l.position.clone().setY(.3),'spark',35);
 rimLight.position.copy(l.position).setY(.6);rimLight.intensity=3;}

function landing(p,v){let tg=(p.pos||0)+v;if(tg>100)tg=200-tg;return tg}
const isSnakeAt=n=>LEVELS[LV].S.some(s=>s[0]===n);
let choiceResolve=null;
function askChoice(p,v){const tg=landing(p,v);$('#hint').textContent=t('choose')(tg,isSnakeAt(tg));$('#choice').classList.add('on');$('#roll').style.display='none';
 return new Promise(res=>{choiceResolve=r=>{$('#choice').classList.remove('on');$('#roll').style.display='';choiceResolve=null;res(r)}})}
$('#move').onclick=()=>{SFX.click();choiceResolve&&choiceResolve(false)};$('#reroll').onclick=()=>{SFX.click();choiceResolve&&choiceResolve(true)};

async function takeTurn(){
 if(!G||G.busy||G.winner)return;G.busy=true;$('#roll').disabled=true;$('#roll').classList.remove('pulse');$('#roll').textContent=t('rolling');SAVE.played=1;
 const i=G.turn,p=G.players[i];let v=1+Math.floor(Math.random()*6);SFX.dice();await rollDie(v);
 while(p.lamps>0){const tg=landing(p,v);let re;
  if(p.bot)re=isSnakeAt(tg);else re=await askChoice(p,v);
  if(!re)break;p.lamps--;renderUI();toast('🪔 '+t('reroll').replace(' 🪔',''),'',1100);v=1+Math.floor(Math.random()*6);SFX.dice();await rollDie(v)}
 $('#roll').textContent=t('roll');
 if(p.pos===0){p.pos=1;await hopTo(i,1);if(v>1)await hopTo(i,v)}
 else if(p.pos+v>100){const back=200-(p.pos+v);await hopTo(i,100);toast(t('bounce'));SFX.wrong();await hopTo(i,back)}
 else await hopTo(i,p.pos+v);
 await resolveSquare(i);renderUI();
 if(p.pos===100){G.winner=p;G.busy=false;return endLevel(p)}
 if(v===6)toast(t('six'));else G.turn=(G.turn+1)%G.players.length;
 G.busy=false;setHint();maybeBot()}
async function maybeBot(){if(!G||G.winner)return;const p=G.players[G.turn];if(p.bot){await sleep(800);if(!$('#overlay').innerHTML)takeTurn();else{const w=setInterval(()=>{if(!$('#overlay').innerHTML){clearInterval(w);takeTurn()}},300)}}}

/* ======================= level end ======================= */
function stars(p){return 1+(p.lit>=2?1:0)+(p.bites<=1?1:0)}
function starHtml(n){return `<div class="stars">${[0,1,2].map(i=>`<i class="${i<n?'on':''}">★</i>`).join('')}</div>`}
function endLevel(p){WOW.stop();renderUI();$('#hint').textContent='';const lv=LEVELS[LV],last=LV===LEVELS.length-1;
 if(!p.bot){const s=stars(p);SAVE.stars[LV]=Math.max(SAVE.stars[LV]||0,s);SAVE.unlocked=Math.max(SAVE.unlocked,Math.min(LEVELS.length,LV+2));persist();SFX.win();
  for(let k=0;k<(last?12:6);k++)setTimeout(()=>burst(W*(.15+Math.random()*.6),H*(.15+Math.random()*.35),'fire',60),k*260);setTimeout(()=>burst(W/2,H*.2,'petal',last?140:70),300);
  const flag=boardGroup.userData.flag;animate(s=>{flag.rotation.y=s*Math.PI*6},1600);
  setTimeout(()=>{const c=overlay(`${last?'<img class="hero" src="img/return.jpg" alt="">':''}<span class="tag">${lv.icon} ${t('level')} ${LV+1} · ${tx(lv.place)}</span><h3>${t('winTitle')(esc(displayName(p)),tx(lv.goal||lv.place))}</h3>${starHtml(s)}
   <p>${last?t('finalText'):t('stepText')}</p><p class="small">${t('starsRule')}</p><div class="stack ${last?"":"row"}">${last?'':`<button class="go" id="nx">${t('next')}</button>`}<button class="go alt" id="ag">${t('again')}</button><button class="go ghost" id="mp">${t('map')}</button></div>`);
   c.querySelector('#nx')?.addEventListener('click',()=>{closeOv();startLevel(LV+1)});c.querySelector('#ag').onclick=()=>{closeOv();startLevel(LV)};c.querySelector('#mp').onclick=showMap},900)}
 else{SFX.lose();setTimeout(()=>{const c=overlay(`<span class="tag">${lv.icon} ${t('level')} ${LV+1} · ${tx(lv.place)}</span><h3>${t('loseTitle')(esc(displayName(p)))}</h3><p>${t('loseText')}</p><div class="stack"><button class="go" id="ag">${t('retry')}</button><button class="go ghost" id="mp">${t('map')}</button></div>`);
   c.querySelector('#ag').onclick=()=>{closeOv();startLevel(LV)};c.querySelector('#mp').onclick=showMap},700)}}

function showMap(){SFX.click();const c=overlay(`<span class="tag">🗺️ ${t('map')}</span><h3>${t('mapTitle')}</h3><div class="map">${LEVELS.map((l,i)=>{const open=i<SAVE.unlocked,s=SAVE.stars[i]||0;
 return `<button data-l="${i}" class="${i===LV?'cur':''}" ${open?'':'disabled title="'+t('locked')+'"'}><b>${open?l.icon:'🔒'}</b>${i+1}. ${tx(l.place)}<small>${'★'.repeat(s)}${'☆'.repeat(3-s)}</small></button>`}).join('')}</div>
 <p class="small">${t('rules')}</p><button class="go ghost" id="cl">✕</button>`);
 c.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{closeOv();startLevel(+b.dataset.l)});c.querySelector('#cl').onclick=closeOv}

function showSetup(){SFX.click();let cnt=playerCfg.length;const prev=[...playerCfg.map(c=>({...c}))];while(prev.length<4)prev.push({name:t('name')(prev.length),bot:false});
 const c=overlay(`<span class="tag">👥</span><h3>${t('setupTitle')}</h3><p>${t('setupText')}</p><div class="small">${t('players')}</div><div class="count">${[1,2,3,4].map(n=>`<button data-n="${n}" aria-pressed="${n===cnt}">${n}</button>`).join('')}</div>
  <div class="setup" id="rows"></div><button class="go" id="st">${t('start')}</button>`);
 const rows=()=>{c.querySelector('#rows').innerHTML=prev.slice(0,cnt).map((r,i)=>`<div class="row"><span class="dot" style="background:${COLORS[i]}"></span><input type="text" id="pn${i}" maxlength="14" value="${esc(r.name===null?t('youWord'):r.name)}"><select id="pb${i}"><option value="h" ${r.bot?'':'selected'}>${t('human')}</option><option value="b" ${r.bot?'selected':''}>${t('bot')}</option></select></div>`).join('')};
 const collect=()=>{for(let i=0;i<cnt;i++){const n=c.querySelector('#pn'+i),b=c.querySelector('#pb'+i);if(n){const v=n.value.trim();prev[i].name=(i===0&&(v===''||v===t('youWord')))?null:(v||t('name')(i));prev[i].bot=b.value==='b'}}};
 rows();c.querySelectorAll('.count button').forEach(b=>b.onclick=()=>{collect();cnt=+b.dataset.n;c.querySelectorAll('.count button').forEach(x=>x.setAttribute('aria-pressed',x===b));rows()});
 c.querySelector('#st').onclick=()=>{collect();let list=prev.slice(0,cnt);if(cnt===1)list.push({name:'Diya',bot:true});if(list.every(x=>x.bot))list[0].bot=false;playerCfg=list;closeOv();startLevel(LV)}}

/* ======================= portal hooks ======================= */
const WOW={start(){try{window.WOWPortal&&WOWPortal.start&&WOWPortal.start()}catch(e){}},stop(){try{window.WOWPortal&&WOWPortal.stop&&WOWPortal.stop()}catch(e){}}};

/* ======================= input ======================= */
const firstGesture=()=>{ac();startMusic()};
$('#roll').onclick=()=>{firstGesture();takeTurn()};dcv.onclick=()=>{if(!$('#roll').disabled&&$('#roll').style.display!=='none'){firstGesture();takeTurn()}};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT')return;if(e.key===' '||e.key==='Enter'){if($('#overlay').innerHTML)return;e.preventDefault();firstGesture();
 if(choiceResolve){choiceResolve(false);return}if(!$('#roll').disabled)takeTurn()}
 if((e.key==='r'||e.key==='R')&&choiceResolve)choiceResolve(true)});
addEventListener('pointerdown',firstGesture,{once:true});
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;try{localStorage.setItem('sq_lang',lang)}catch(e){}SFX.click();buildBoard(LEVELS[LV],LV);G&&G.lit&&Object.keys(G.lit).forEach(n=>lightLamp(+n));renderUI();setHint()});
$('#sound').onclick=()=>{sfxOn=!sfxOn;$('#sound').textContent=sfxOn?'🔊':'🔇';$('#sound').setAttribute('aria-pressed',sfxOn)};
$('#music').onclick=()=>{firstGesture();setMusic(!musicOn)};
$('#who').onclick=showSetup;$('#mapbtn').onclick=showMap;$('#lvchip').onclick=showMap;
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();const tip=$('#tip');
canvas.addEventListener('pointermove',e=>{ptr.x=(e.clientX/W-.5)*2;ptr.y=(e.clientY/H-.5)*2;
 mv.set((e.clientX-area.x)/area.w*2-1,-(e.clientY-area.y)/area.h*2+1);ray.setFromCamera(mv,camera);const hit=ray.intersectObjects(hoverables,true)[0];
 if(hit&&e.pointerType==='mouse'){const o=hit.object.userData.owner.userData;tip.textContent=`${o.kind==='snake'?'🐍':'🪜'} ${tx(o.title)} · ${o.from} → ${o.to}`;tip.style.display='block';tip.style.left=Math.min(W-tip.offsetWidth-8,e.clientX+14)+'px';tip.style.top=(e.clientY+14)+'px';canvas.style.cursor='help'}
 else{tip.style.display='none';canvas.style.cursor=''}});
canvas.addEventListener('pointerleave',()=>{tip.style.display='none';ptr.x=ptr.y=0});
document.addEventListener('visibilitychange',()=>{if(AC){document.hidden?AC.suspend():AC.resume()}});

/* ======================= loop ======================= */
function frame(ts){requestAnimationFrame(frame);placeCamera(ts);if(diceAnim)diceAnim(ts);
 if(G){G.players.forEach((p,i)=>{const r=pawnMeshes[i]?.userData.ring;if(r){const on=i===G.turn&&!G.winner&&!G.busy;r.material.opacity=on?.55+.45*Math.sin(ts/220):0;r.scale.setScalar(1+.12*Math.sin(ts/220))}})}
 hoverables.forEach((h,k)=>{const u=h.userData;if(u.kind==='snake'){const b=u.bite&&ts-u.bite<900?(ts-u.bite)/900:1;u.head.position.y=.17+Math.sin(ts/400+k)*.02+(b<1?Math.sin(b*Math.PI)*.25:0);u.tongue.scale.x=.5+.5*Math.abs(Math.sin(ts/170+k*1.7));u.head.rotation.z=b<1?Math.sin(b*Math.PI)*.5:0}});
 Object.values(lampObjs).forEach((l,k)=>{const f=l.userData.flame,s=l.userData.lit?1:.45;f.scale.set(s*(1+.12*Math.sin(ts/90+k)),s*(1+.18*Math.sin(ts/70+k*2)),s)});
 if(rimLight.intensity>0)rimLight.intensity*=.985;
 renderer.setViewport(0,0,W,H);renderer.setScissorTest(false);renderer.clear();
 renderer.setViewport(area.x,H-area.y-area.h,area.w,area.h);renderer.setScissor(area.x,H-area.y-area.h,area.w,area.h);renderer.setScissorTest(true);renderer.render(scene,camera);renderer.setScissorTest(false);
 drend.render(dscene,dcam);fxDraw()}

/* ======================= boot ======================= */
addEventListener('resize',layout);
const startAt=Math.min(SAVE.unlocked-1,LEVELS.length-1);
LV=startAt;renderUI();layout();startLevel(startAt);requestAnimationFrame(frame);
document.fonts?.ready?.then(()=>{if(G){buildBoard(LEVELS[LV],LV);Object.keys(G.lit).forEach(n=>lightLamp(+n))}});
window.__rta={get G(){return G},startLevel,takeTurn,LEVELS};
