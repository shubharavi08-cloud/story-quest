/* Question bank. Each entry: q = question, a = answers (the FIRST answer is the right one; the game shuffles them),
   d = difficulty 1 easy / 2 medium / 3 advanced, cat = topic.
   The menu's "Question level" picks what is asked: Easy = d 1 · Medium = d 1-2 · Advanced = everything.
   Add questions here with Q(...); no game code changes are needed. */
const RAMAYANA=[
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

/* difficulty of the twelve Ramayana questions above, in order */
[2,1,1,2,3,1,2,2,1,2,1,2].forEach((d,i)=>Object.assign(RAMAYANA[i],{d,cat:'ramayana'}));
const T=(en,hi,kn)=>({en,hi,kn});
const Q=(d,cat,q,...a)=>({d,cat,q,a});
const same=s=>T(s,s,s);
export const QUESTIONS=[...RAMAYANA,
 /* ---- maths ---- */
 Q(1,'maths',T('You are on square 37 and roll a 5. Where do you land?','आप खाना 37 पर हैं और पासे पर 5 आया। आप कहाँ पहुँचेंगे?','ನೀವು ಮನೆ 37ರಲ್ಲಿದ್ದೀರಿ, ದಾಳದಲ್ಲಿ 5 ಬಿತ್ತು. ಎಲ್ಲಿಗೆ ತಲುಪುತ್ತೀರಿ?'),same('42'),same('41'),same('43')),
 Q(1,'maths',T('Which number comes next: 5, 10, 15, …?','अगली संख्या कौन-सी है: 5, 10, 15, …?','ಮುಂದಿನ ಸಂಖ್ಯೆ ಯಾವುದು: 5, 10, 15, …?'),same('20'),same('25'),same('16')),
 Q(1,'maths',T('How many squares are on a 10 × 10 board?','10 × 10 के बोर्ड पर कितने खाने होते हैं?','10 × 10 ಹಲಗೆಯಲ್ಲಿ ಎಷ್ಟು ಮನೆಗಳಿವೆ?'),same('100'),same('20'),same('110')),
 Q(2,'maths',T('A ladder takes you from 12 to 30. How many squares did you climb?','सीढ़ी आपको 12 से 30 पर ले गई। आप कितने खाने चढ़े?','ಏಣಿ ನಿಮ್ಮನ್ನು 12ರಿಂದ 30ಕ್ಕೆ ಏರಿಸಿತು. ನೀವು ಎಷ್ಟು ಮನೆ ಏರಿದಿರಿ?'),same('18'),same('16'),same('20')),
 Q(2,'maths',T('A snake pulls you from 64 down to 40. How many squares did you lose?','साँप आपको 64 से 40 पर ले आया। आप कितने खाने पीछे गए?','ಹಾವು ನಿಮ್ಮನ್ನು 64ರಿಂದ 40ಕ್ಕೆ ಇಳಿಸಿತು. ನೀವು ಎಷ್ಟು ಮನೆ ಹಿಂದೆ ಬಂದಿರಿ?'),same('24'),same('14'),same('26')),
 Q(2,'maths',T('You need exactly 3 to reach 100. Which square are you on?','100 पर पहुँचने के लिए ठीक 3 चाहिए। आप किस खाने पर हैं?','100 ತಲುಪಲು ಸರಿಯಾಗಿ 3 ಬೇಕು. ನೀವು ಯಾವ ಮನೆಯಲ್ಲಿದ್ದೀರಿ?'),same('97'),same('93'),same('103')),
 Q(3,'maths',T('Which is the largest: 3 × 9, 5 × 5 or 4 × 7?','सबसे बड़ा कौन-सा है: 3 × 9, 5 × 5 या 4 × 7?','ಯಾವುದು ಅತಿ ದೊಡ್ಡದು: 3 × 9, 5 × 5 ಅಥವಾ 4 × 7?'),same('4 × 7'),same('3 × 9'),same('5 × 5')),
 Q(3,'maths',T('Ram was in the forest for 14 years. How many months is that?','राम 14 वर्ष वन में रहे। यह कितने महीने हुए?','ರಾಮ 14 ವರ್ಷ ಕಾಡಿನಲ್ಲಿದ್ದ. ಅದು ಎಷ್ಟು ತಿಂಗಳು?'),same('168'),same('140'),same('154')),
 /* ---- logic and observation ---- */
 Q(1,'logic',T('What comes next: 🌙 ⭐ 🌙 ⭐ 🌙 …?','आगे क्या आएगा: 🌙 ⭐ 🌙 ⭐ 🌙 …?','ಮುಂದೆ ಯಾವುದು ಬರುತ್ತದೆ: 🌙 ⭐ 🌙 ⭐ 🌙 …?'),same('⭐'),same('🌙'),same('☀️')),
 Q(2,'logic',T('Which one does not belong: bow, arrow, flute, quiver?','इनमें से कौन अलग है: धनुष, बाण, बाँसुरी, तरकश?','ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಬೇರೆ: ಬಿಲ್ಲು, ಬಾಣ, ಕೊಳಲು, ಬತ್ತಳಿಕೆ?'),T('Flute','बाँसुरी','ಕೊಳಲು'),T('Arrow','बाण','ಬಾಣ'),T('Quiver','तरकश','ಬತ್ತಳಿಕೆ')),
 Q(3,'logic',T('Hanuman is faster than Angad. Angad is faster than Nala. Who is the slowest?','हनुमान अंगद से तेज़ हैं। अंगद नल से तेज़ हैं। सबसे धीमा कौन है?','ಹನುಮಂತ ಅಂಗದನಿಗಿಂತ ವೇಗ. ಅಂಗದ ನಳನಿಗಿಂತ ವೇಗ. ಎಲ್ಲರಿಗಿಂತ ನಿಧಾನ ಯಾರು?'),T('Nala','नल','ನಳ'),T('Angad','अंगद','ಅಂಗದ'),T('Hanuman','हनुमान','ಹನುಮಂತ')),
 /* ---- geography and culture ---- */
 Q(1,'geography',T('In which present-day state is Ayodhya?','अयोध्या आज के किस राज्य में है?','ಅಯೋಧ್ಯೆ ಈಗಿನ ಯಾವ ರಾಜ್ಯದಲ್ಲಿದೆ?'),T('Uttar Pradesh','उत्तर प्रदेश','ಉತ್ತರ ಪ್ರದೇಶ'),T('Gujarat','गुजरात','ಗುಜರಾತ್'),T('Karnataka','कर्नाटक','ಕರ್ನಾಟಕ')),
 Q(1,'geography',T('Which country is Lanka today?','लंका आज का कौन-सा देश है?','ಲಂಕೆ ಈಗಿನ ಯಾವ ದೇಶ?'),T('Sri Lanka','श्रीलंका','ಶ್ರೀಲಂಕಾ'),T('Nepal','नेपाल','ನೇಪಾಳ'),T('Maldives','मालदीव','ಮಾಲ್ಡೀವ್ಸ್')),
 Q(2,'geography',T('In which present-day state is Rameswaram?','रामेश्वरम आज के किस राज्य में है?','ರಾಮೇಶ್ವರ ಈಗಿನ ಯಾವ ರಾಜ್ಯದಲ್ಲಿದೆ?'),T('Tamil Nadu','तमिलनाडु','ತಮಿಳುನಾಡು'),T('Kerala','केरल','ಕೇರಳ'),T('Odisha','ओडिशा','ಒಡಿಶಾ')),
 Q(3,'geography',T('Kishkindha is linked with which place in Karnataka?','किष्किंधा को कर्नाटक की किस जगह से जोड़ा जाता है?','ಕಿಷ್ಕಿಂಧೆಯನ್ನು ಕರ್ನಾಟಕದ ಯಾವ ಊರಿನೊಂದಿಗೆ ಗುರುತಿಸುತ್ತಾರೆ?'),T('Hampi','हम्पी','ಹಂಪಿ'),T('Mysuru','मैसूरु','ಮೈಸೂರು'),T('Udupi','उडुपी','ಉಡುಪಿ')),
 Q(1,'culture',T('In which country did snakes and ladders begin?','साँप-सीढ़ी का खेल किस देश में शुरू हुआ?','ಹಾವು-ಏಣಿ ಆಟ ಯಾವ ದೇಶದಲ್ಲಿ ಹುಟ್ಟಿತು?'),T('India','भारत','ಭಾರತ'),T('China','चीन','ಚೀನಾ'),T('Egypt','मिस्र','ಈಜಿಪ್ಟ್')),
 Q(3,'culture',T('What was snakes and ladders called in old India?','पुराने भारत में साँप-सीढ़ी को क्या कहते थे?','ಹಿಂದಿನ ಕಾಲದ ಭಾರತದಲ್ಲಿ ಹಾವು-ಏಣಿ ಆಟಕ್ಕೆ ಏನೆನ್ನುತ್ತಿದ್ದರು?'),T('Moksha Patam','मोक्ष पटम','ಮೋಕ್ಷಪಟ'),T('Chaturanga','चतुरंग','ಚತುರಂಗ'),T('Pachisi','पचीसी','ಪಗಡೆ')),
 /* ---- values ---- */
 Q(1,'values',T('The little squirrel carried sand for the bridge. What does it teach us?','नन्ही गिलहरी ने पुल के लिए रेत ढोई। इससे हमें क्या सीख मिलती है?','ಪುಟ್ಟ ಅಳಿಲು ಸೇತುವೆಗೆ ಮರಳು ಹೊತ್ತಿತು. ಇದರಿಂದ ನಾವು ಏನು ಕಲಿಯುತ್ತೇವೆ?'),T('Every small help counts','छोटी-सी मदद भी मायने रखती है','ಚಿಕ್ಕ ನೆರವಿಗೂ ಬೆಲೆ ಇದೆ'),T('Only the strong can help','सिर्फ़ ताक़तवर ही मदद कर सकते हैं','ಬಲಶಾಲಿಗಳು ಮಾತ್ರ ನೆರವಾಗಬಲ್ಲರು'),T('Squirrels love sand','गिलहरियों को रेत पसंद है','ಅಳಿಲಿಗೆ ಮರಳು ಇಷ್ಟ')),
 Q(1,'values',T('Shabari offered Ram berries with love. What matters most in a gift?','शबरी ने प्रेम से राम को बेर खिलाए। उपहार में सबसे ज़रूरी क्या है?','ಶಬರಿ ಪ್ರೀತಿಯಿಂದ ರಾಮನಿಗೆ ಹಣ್ಣು ಕೊಟ್ಟಳು. ಉಡುಗೊರೆಯಲ್ಲಿ ಮುಖ್ಯವಾದದ್ದು ಯಾವುದು?'),T('The love behind it','उसके पीछे का प्रेम','ಅದರ ಹಿಂದಿನ ಪ್ರೀತಿ'),T('Its price','उसकी क़ीमत','ಅದರ ಬೆಲೆ'),T('Its size','उसका आकार','ಅದರ ಗಾತ್ರ')),
 Q(2,'values',T('Bharat looked after Ayodhya but would not sit on the throne. What does this show?','भरत ने अयोध्या सँभाली पर सिंहासन पर नहीं बैठे। इससे क्या पता चलता है?','ಭರತ ಅಯೋಧ್ಯೆಯನ್ನು ನೋಡಿಕೊಂಡರೂ ಸಿಂಹಾಸನ ಏರಲಿಲ್ಲ. ಇದು ಏನನ್ನು ತೋರಿಸುತ್ತದೆ?'),T('Loyalty','निष्ठा','ನಿಷ್ಠೆ'),T('Laziness','आलस्य','ಸೋಮಾರಿತನ'),T('Fear','डर','ಭಯ')),
 Q(2,'values',T('Ram kept the promise his father had made. Which value is this?','राम ने पिता का दिया वचन निभाया। यह कौन-सा गुण है?','ರಾಮ ತಂದೆ ಕೊಟ್ಟ ಮಾತನ್ನು ಉಳಿಸಿದ. ಇದು ಯಾವ ಗುಣ?'),T('Keeping your word','वचन निभाना','ಮಾತು ಉಳಿಸಿಕೊಳ್ಳುವುದು'),T('Being clever','चतुर होना','ಜಾಣತನ'),T('Being rich','धनी होना','ಶ್ರೀಮಂತಿಕೆ')),
 /* ---- words ---- */
 Q(1,'words',T('What is an "ashram"?','"आश्रम" क्या होता है?','"ಆಶ್ರಮ" ಎಂದರೆ ಏನು?'),T('A place where sages live and teach','जहाँ ऋषि रहते और पढ़ाते हैं','ಋಷಿಗಳು ವಾಸಿಸಿ ವಿದ್ಯೆ ಕಲಿಸುವ ಜಾಗ'),T('A royal palace','राजमहल','ಅರಮನೆ'),T('A market','बाज़ार','ಸಂತೆ')),
 Q(2,'words',T('Who are the "vanaras"?','"वानर" कौन हैं?','"ವಾನರರು" ಯಾರು?'),T('The monkey people of the forest','वन में रहने वाले वानर','ಕಾಡಿನಲ್ಲಿ ವಾಸಿಸುವ ಕಪಿಗಳು'),T('Boat makers','नाव बनाने वाले','ದೋಣಿ ಕಟ್ಟುವವರು'),T('Big birds','बड़े पक्षी','ದೊಡ್ಡ ಹಕ್ಕಿಗಳು')),
 Q(3,'words',T('What does "swayamvara" mean?','"स्वयंवर" का अर्थ क्या है?','"ಸ್ವಯಂವರ" ಎಂದರೆ ಏನು?'),T('A bride chooses her own husband','कन्या स्वयं अपना वर चुनती है','ಕನ್ಯೆ ತನ್ನ ವರನನ್ನು ತಾನೇ ಆರಿಸುವುದು'),T('A long journey','लंबी यात्रा','ದೂರದ ಪಯಣ'),T('A harvest feast','फ़सल का उत्सव','ಸುಗ್ಗಿಯ ಹಬ್ಬ'))];
