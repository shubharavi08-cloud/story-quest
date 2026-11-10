/* Road to Ayodhya: the story scenes, two per level, in journey order.
   Each scene: icon · title · glimpse (one line, shown when a token PASSES the story square)
   · full (the scene shown when a token LANDS on it; also kept in the Storybook).
   All scenes retell the traditional Ramayana in our own words. Add or edit scenes here; no game code changes needed. */
const T=(en,hi,kn)=>({en,hi,kn});
const S=(icon,title,glimpse,full)=>({icon,title,glimpse,full});
export const STORIES=[
 /* 1 Ayodhya */
 [S('👑',T('The four princes','चार राजकुमार','ನಾಲ್ವರು ರಾಜಕುಮಾರರು'),
   T('Four princes are born in Ayodhya.','अयोध्या में चार राजकुमारों का जन्म होता है।','ಅಯೋಧ್ಯೆಯಲ್ಲಿ ನಾಲ್ವರು ರಾಜಕುಮಾರರು ಹುಟ್ಟುತ್ತಾರೆ.'),
   T("King Dasharatha's prayers are answered. Ram, Lakshman, Bharat and Shatrughna are born, and the whole city celebrates.",'राजा दशरथ की प्रार्थना पूरी होती है। राम, लक्ष्मण, भरत और शत्रुघ्न का जन्म होता है और पूरा नगर उत्सव मनाता है।','ದಶರಥ ರಾಜನ ಪ್ರಾರ್ಥನೆ ಫಲಿಸುತ್ತದೆ. ರಾಮ, ಲಕ್ಷ್ಮಣ, ಭರತ, ಶತ್ರುಘ್ನ ಹುಟ್ಟುತ್ತಾರೆ; ಇಡೀ ನಗರ ಸಂಭ್ರಮಿಸುತ್ತದೆ.')),
  S('🧘',T("Vishwamitra's request",'विश्वामित्र की माँग','ವಿಶ್ವಾಮಿತ್ರರ ಕೋರಿಕೆ'),
   T('Sage Vishwamitra arrives at the palace.','ऋषि विश्वामित्र राजमहल में आते हैं।','ವಿಶ್ವಾಮಿತ್ರ ಮಹರ್ಷಿ ಅರಮನೆಗೆ ಬರುತ್ತಾರೆ.'),
   T('Sage Vishwamitra asks the king to send Ram and Lakshman to guard his ashram. The young princes set out on their first journey.','ऋषि विश्वामित्र राजा से राम और लक्ष्मण को आश्रम की रक्षा के लिए माँगते हैं। दोनों राजकुमार अपनी पहली यात्रा पर निकलते हैं।','ಆಶ್ರಮದ ರಕ್ಷಣೆಗೆ ರಾಮ ಲಕ್ಷ್ಮಣರನ್ನು ಕಳುಹಿಸುವಂತೆ ವಿಶ್ವಾಮಿತ್ರರು ರಾಜನನ್ನು ಕೇಳುತ್ತಾರೆ. ಇಬ್ಬರು ರಾಜಕುಮಾರರು ತಮ್ಮ ಮೊದಲ ಪಯಣಕ್ಕೆ ಹೊರಡುತ್ತಾರೆ.'))],
 /* 2 Mithila */
 [S('🏹',T('The great bow','महान धनुष','ಮಹಾಧನುಸ್ಸು'),
   T("King Janaka keeps Shiva's mighty bow.",'राजा जनक के पास शिव का महान धनुष है।','ಜನಕ ರಾಜನ ಬಳಿ ಶಿವನ ಮಹಾಧನುಸ್ಸು ಇದೆ.'),
   T("King Janaka has promised: whoever strings Shiva's great bow will marry Sita. Many kings try. None can even lift it.",'राजा जनक का प्रण है: जो शिव के धनुष पर प्रत्यंचा चढ़ाएगा, वही सीता से विवाह करेगा। कई राजा कोशिश करते हैं, पर कोई उसे उठा भी नहीं पाता।','ಜನಕ ರಾಜನ ಪಣ: ಶಿವಧನುಸ್ಸಿಗೆ ಹೆದೆ ಏರಿಸಿದವನಿಗೇ ಸೀತೆ. ಎಷ್ಟೋ ರಾಜರು ಪ್ರಯತ್ನಿಸುತ್ತಾರೆ; ಯಾರಿಗೂ ಅದನ್ನು ಎತ್ತಲೂ ಆಗುವುದಿಲ್ಲ.')),
  S('💐',T('Ram and Sita','राम और सीता','ರಾಮ ಮತ್ತು ಸೀತೆ'),
   T('Ram lifts the bow with ease.','राम सहज ही धनुष उठा लेते हैं।','ರಾಮ ಧನುಸ್ಸನ್ನು ಸುಲಭವಾಗಿ ಎತ್ತುತ್ತಾನೆ.'),
   T("Ram lifts the bow and bends it to string it. It breaks with a sound like thunder. Sita places the garland around Ram's neck.",'राम धनुष उठाकर प्रत्यंचा चढ़ाने के लिए उसे झुकाते हैं। धनुष बादल की गरज जैसी आवाज़ के साथ टूट जाता है। सीता राम के गले में वरमाला डालती हैं।','ರಾಮ ಧನುಸ್ಸನ್ನು ಎತ್ತಿ ಹೆದೆ ಏರಿಸಲು ಬಗ್ಗಿಸುತ್ತಾನೆ. ಗುಡುಗಿನಂತಹ ಸದ್ದಿನೊಂದಿಗೆ ಅದು ಮುರಿಯುತ್ತದೆ. ಸೀತೆ ರಾಮನ ಕೊರಳಿಗೆ ವರಮಾಲೆ ಹಾಕುತ್ತಾಳೆ.'))],
 /* 3 Chitrakoot */
 [S('🤝',T('The promise','वचन','ಕೊಟ್ಟ ಮಾತು'),
   T('Ram leaves for the forest to keep a promise.','वचन निभाने के लिए राम वन को जाते हैं।','ಕೊಟ್ಟ ಮಾತು ಉಳಿಸಲು ರಾಮ ಕಾಡಿಗೆ ಹೊರಡುತ್ತಾನೆ.'),
   T("To keep his father's word to Queen Kaikeyi, Ram gives up the throne for fourteen years. Sita and Lakshman choose to go with him.",'रानी कैकेयी को दिया पिता का वचन निभाने के लिए राम चौदह वर्ष के लिए राजगद्दी छोड़ देते हैं। सीता और लक्ष्मण उनके साथ जाने का निश्चय करते हैं।','ಕೈಕೇಯಿಗೆ ತಂದೆ ಕೊಟ್ಟ ಮಾತು ಉಳಿಸಲು ರಾಮ ಹದಿನಾಲ್ಕು ವರ್ಷ ಸಿಂಹಾಸನ ಬಿಟ್ಟುಕೊಡುತ್ತಾನೆ. ಸೀತೆ ಮತ್ತು ಲಕ್ಷ್ಮಣ ಅವನ ಜೊತೆ ಹೋಗಲು ನಿರ್ಧರಿಸುತ್ತಾರೆ.')),
  S('👣',T("Bharat's love",'भरत का प्रेम','ಭರತನ ಪ್ರೀತಿ'),
   T('Bharat comes looking for his brother.','भरत अपने भाई को ढूँढ़ते हुए आते हैं।','ಭರತ ಅಣ್ಣನನ್ನು ಹುಡುಕಿಕೊಂಡು ಬರುತ್ತಾನೆ.'),
   T("Bharat begs Ram to return. Ram will not break the promise, so Bharat carries Ram's sandals home and places them on the throne.",'भरत राम से लौट चलने की विनती करते हैं। राम वचन नहीं तोड़ते, इसलिए भरत उनकी पादुकाएँ ले जाकर सिंहासन पर रख देते हैं।','ಹಿಂದಿರುಗುವಂತೆ ಭರತ ರಾಮನನ್ನು ಬೇಡಿಕೊಳ್ಳುತ್ತಾನೆ. ರಾಮ ಮಾತು ಮುರಿಯುವುದಿಲ್ಲ; ಹಾಗಾಗಿ ಭರತ ರಾಮನ ಪಾದುಕೆಗಳನ್ನು ಕೊಂಡೊಯ್ದು ಸಿಂಹಾಸನದ ಮೇಲಿಡುತ್ತಾನೆ.'))],
 /* 4 Dandakaranya */
 [S('🌲',T('The sages of the forest','वन के ऋषि','ಕಾಡಿನ ಋಷಿಗಳು'),
   T('Sages welcome Ram to the Dandaka forest.','दंडक वन में ऋषि राम का स्वागत करते हैं।','ದಂಡಕಾರಣ್ಯದಲ್ಲಿ ಋಷಿಗಳು ರಾಮನನ್ನು ಸ್ವಾಗತಿಸುತ್ತಾರೆ.'),
   T('The sages of Dandaka live in fear of rakshasas. Ram promises to protect them so they can pray and teach in peace.','दंडक वन के ऋषि राक्षसों के डर में जीते हैं। राम उनकी रक्षा का वचन देते हैं, ताकि वे शांति से तप और शिक्षा दे सकें।','ದಂಡಕಾರಣ್ಯದ ಋಷಿಗಳು ರಾಕ್ಷಸರ ಭಯದಲ್ಲಿ ಬದುಕುತ್ತಿದ್ದಾರೆ. ಅವರು ನೆಮ್ಮದಿಯಿಂದ ತಪಸ್ಸು ಮಾಡಲು, ವಿದ್ಯೆ ಕಲಿಸಲು ತಾನು ಕಾವಲಿರುವೆನೆಂದು ರಾಮ ಮಾತು ಕೊಡುತ್ತಾನೆ.')),
  S('🎁',T("Sage Agastya's gift",'ऋषि अगस्त्य का उपहार','ಅಗಸ್ತ್ಯರ ಉಡುಗೊರೆ'),
   T('Ram visits Sage Agastya.','राम ऋषि अगस्त्य से मिलने जाते हैं।','ರಾಮ ಅಗಸ್ತ್ಯ ಮಹರ್ಷಿಯನ್ನು ಭೇಟಿಯಾಗುತ್ತಾನೆ.'),
   T('Sage Agastya blesses Ram and gives him a divine bow and arrows. He advises Ram to live at Panchavati, beside the river Godavari.','ऋषि अगस्त्य राम को आशीर्वाद देते हैं और दिव्य धनुष-बाण भेंट करते हैं। वे राम को गोदावरी के किनारे पंचवटी में रहने की सलाह देते हैं।','ಅಗಸ್ತ್ಯರು ರಾಮನನ್ನು ಹರಸಿ ದಿವ್ಯ ಬಿಲ್ಲು ಬಾಣಗಳನ್ನು ಕೊಡುತ್ತಾರೆ. ಗೋದಾವರಿ ನದಿಯ ದಡದ ಪಂಚವಟಿಯಲ್ಲಿ ನೆಲೆಸುವಂತೆ ಸಲಹೆ ನೀಡುತ್ತಾರೆ.'))],
 /* 5 Panchavati */
 [S('🦌',T('The golden deer','सोने का हिरण','ಚಿನ್ನದ ಜಿಂಕೆ'),
   T('A deer of shining gold appears.','चमचमाता सोने का हिरण दिखाई देता है।','ಹೊಳೆಯುವ ಚಿನ್ನದ ಜಿಂಕೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ.'),
   T('Sita sees a golden deer and wishes for it. Ram goes after it. The deer is the rakshasa Maricha in disguise, sent to lead Ram away.','सीता सोने का हिरण देखकर उसे पाना चाहती हैं। राम उसके पीछे जाते हैं। वह हिरण असल में राक्षस मारीच है, जिसे राम को दूर ले जाने के लिए भेजा गया है।','ಸೀತೆ ಚಿನ್ನದ ಜಿಂಕೆಯನ್ನು ಕಂಡು ಅದು ಬೇಕೆನ್ನುತ್ತಾಳೆ. ರಾಮ ಅದರ ಹಿಂದೆ ಹೋಗುತ್ತಾನೆ. ಆ ಜಿಂಕೆ ವೇಷ ಮರೆಸಿದ ರಾಕ್ಷಸ ಮಾರೀಚ; ರಾಮನನ್ನು ದೂರ ಕರೆದೊಯ್ಯಲೆಂದೇ ಬಂದವನು.')),
  S('🦅',T('Brave Jatayu','वीर जटायु','ಧೀರ ಜಟಾಯು'),
   T("The old eagle Jatayu sees Ravana's chariot.",'बूढ़ा गिद्धराज जटायु रावण का रथ देखता है।','ಮುದಿ ಹದ್ದು ಜಟಾಯು ರಾವಣನ ರಥವನ್ನು ನೋಡುತ್ತಾನೆ.'),
   T('Ravana carries Sita away in his chariot. The old eagle Jatayu fights him bravely and, with his last strength, tells Ram which way they went.','रावण सीता को अपने रथ में ले जाता है। बूढ़ा जटायु वीरता से उससे लड़ता है और अपनी आख़िरी साँसों में राम को बताता है कि वे किस दिशा में गए।','ರಾವಣ ಸೀತೆಯನ್ನು ರಥದಲ್ಲಿ ಕೊಂಡೊಯ್ಯುತ್ತಾನೆ. ಮುದಿ ಜಟಾಯು ಧೈರ್ಯದಿಂದ ಹೋರಾಡಿ, ಕೊನೆಯುಸಿರಿನಲ್ಲಿ ಅವರು ಹೋದ ದಿಕ್ಕನ್ನು ರಾಮನಿಗೆ ತಿಳಿಸುತ್ತಾನೆ.'))],
 /* 6 Kishkindha */
 [S('🐒',T('Meeting Hanuman','हनुमान से भेंट','ಹನುಮಂತನ ಭೇಟಿ'),
   T('Hanuman greets two strangers.','हनुमान दो अजनबियों का स्वागत करते हैं।','ಹನುಮಂತ ಇಬ್ಬರು ಅಪರಿಚಿತರನ್ನು ಮಾತನಾಡಿಸುತ್ತಾನೆ.'),
   T('Hanuman meets Ram and Lakshman and takes them to Sugriva. Ram and Sugriva become friends and promise to help each other.','हनुमान राम और लक्ष्मण से मिलते हैं और उन्हें सुग्रीव के पास ले जाते हैं। राम और सुग्रीव मित्र बनते हैं और एक-दूसरे की मदद का वचन देते हैं।','ಹನುಮಂತ ರಾಮ ಲಕ್ಷ್ಮಣರನ್ನು ಭೇಟಿಯಾಗಿ ಸುಗ್ರೀವನ ಬಳಿಗೆ ಕರೆದೊಯ್ಯುತ್ತಾನೆ. ರಾಮ ಮತ್ತು ಸುಗ್ರೀವ ಗೆಳೆಯರಾಗಿ, ಒಬ್ಬರಿಗೊಬ್ಬರು ನೆರವಾಗುವ ಮಾತು ಕೊಡುತ್ತಾರೆ.')),
  S('💍',T('The search begins','खोज शुरू होती है','ಹುಡುಕಾಟ ಆರಂಭ'),
   T('The vanaras set out in all four directions.','वानर चारों दिशाओं में निकल पड़ते हैं।','ವಾನರರು ನಾಲ್ಕೂ ದಿಕ್ಕಿಗೆ ಹೊರಡುತ್ತಾರೆ.'),
   T('Sugriva sends his vanaras to search for Sita. Ram gives Hanuman his ring, so that Sita will know the messenger is true.','सुग्रीव सीता की खोज में अपने वानरों को भेजते हैं। राम हनुमान को अपनी अँगूठी देते हैं, ताकि सीता पहचान सकें कि दूत सच्चा है।','ಸೀತೆಯನ್ನು ಹುಡುಕಲು ಸುಗ್ರೀವ ವಾನರರನ್ನು ಕಳುಹಿಸುತ್ತಾನೆ. ಬಂದವನು ನಿಜವಾದ ದೂತ ಎಂದು ಸೀತೆಗೆ ತಿಳಿಯಲೆಂದು ರಾಮ ತನ್ನ ಉಂಗುರವನ್ನು ಹನುಮಂತನಿಗೆ ಕೊಡುತ್ತಾನೆ.'))],
 /* 7 Rameswaram */
 [S('🌊',T("Hanuman's leap",'हनुमान की छलाँग','ಹನುಮಂತನ ನೆಗೆತ'),
   T('Hanuman leaps across the sea.','हनुमान समुद्र लाँघ जाते हैं।','ಹನುಮಂತ ಸಮುದ್ರವನ್ನು ಹಾರುತ್ತಾನೆ.'),
   T("Hanuman leaps over the ocean to Lanka, finds Sita in the Ashoka grove and gives her Ram's ring. She sends back her jewel.",'हनुमान समुद्र लाँघकर लंका पहुँचते हैं, अशोक वाटिका में सीता को ढूँढ़ लेते हैं और उन्हें राम की अँगूठी देते हैं। सीता अपनी चूड़ामणि भेजती हैं।','ಹನುಮಂತ ಸಮುದ್ರ ಹಾರಿ ಲಂಕೆ ತಲುಪಿ, ಅಶೋಕವನದಲ್ಲಿ ಸೀತೆಯನ್ನು ಕಂಡು ರಾಮನ ಉಂಗುರ ಕೊಡುತ್ತಾನೆ. ಸೀತೆ ತನ್ನ ಚೂಡಾಮಣಿಯನ್ನು ಕಳುಹಿಸುತ್ತಾಳೆ.')),
  S('🌉',T('The bridge','सेतु','ಸೇತುವೆ'),
   T('Stones are carried to the shore.','पत्थर किनारे तक ढोए जा रहे हैं।','ಕಲ್ಲುಗಳನ್ನು ದಡಕ್ಕೆ ಹೊತ್ತು ತರುತ್ತಿದ್ದಾರೆ.'),
   T('Led by Nala, the vanaras build a bridge across the sea. Even a little squirrel helps by carrying grains of sand.','नल की अगुवाई में वानर समुद्र पर पुल बनाते हैं। एक नन्ही गिलहरी भी रेत के कण ढोकर मदद करती है।','ನಳನ ಮುಂದಾಳತ್ವದಲ್ಲಿ ವಾನರರು ಸಮುದ್ರಕ್ಕೆ ಸೇತುವೆ ಕಟ್ಟುತ್ತಾರೆ. ಪುಟ್ಟ ಅಳಿಲು ಕೂಡ ಮರಳಿನ ಕಣ ಹೊತ್ತು ನೆರವಾಗುತ್ತದೆ.'))],
 /* 8 Lanka */
 [S('⚖️',T("Vibhishana's choice",'विभीषण का निर्णय','ವಿಭೀಷಣನ ನಿರ್ಧಾರ'),
   T("Ravana's brother speaks the truth.",'रावण का भाई सच बोलता है।','ರಾವಣನ ತಮ್ಮ ಸತ್ಯ ನುಡಿಯುತ್ತಾನೆ.'),
   T('Vibhishana tells Ravana to return Sita. Ravana refuses, so Vibhishana leaves Lanka and joins Ram.','विभीषण रावण से सीता को लौटाने को कहते हैं। रावण नहीं मानता, तो विभीषण लंका छोड़कर राम के पास चले जाते हैं।','ಸೀತೆಯನ್ನು ಹಿಂದಿರುಗಿಸುವಂತೆ ವಿಭೀಷಣ ರಾವಣನಿಗೆ ಹೇಳುತ್ತಾನೆ. ರಾವಣ ಒಪ್ಪುವುದಿಲ್ಲ; ವಿಭೀಷಣ ಲಂಕೆ ಬಿಟ್ಟು ರಾಮನ ಬಳಿಗೆ ಬರುತ್ತಾನೆ.')),
  S('🏰',T('The victory','विजय','ವಿಜಯ'),
   T('The great battle ends.','महायुद्ध समाप्त होता है।','ಮಹಾಯುದ್ಧ ಮುಗಿಯುತ್ತದೆ.'),
   T('After a long battle Ram defeats Ravana. Sita is free, and Vibhishana is crowned king of Lanka.','लंबे युद्ध के बाद राम रावण को हरा देते हैं। सीता मुक्त होती हैं और विभीषण लंका के राजा बनते हैं।','ದೀರ್ಘ ಯುದ್ಧದ ಬಳಿಕ ರಾಮ ರಾವಣನನ್ನು ಸೋಲಿಸುತ್ತಾನೆ. ಸೀತೆ ಬಿಡುಗಡೆಯಾಗುತ್ತಾಳೆ; ವಿಭೀಷಣ ಲಂಕೆಯ ರಾಜನಾಗುತ್ತಾನೆ.'))],
 /* 9 Return to Ayodhya */
 [S('✨',T('The Pushpak Vimana','पुष्पक विमान','ಪುಷ್ಪಕ ವಿಮಾನ'),
   T('A flying chariot rises over Lanka.','लंका के ऊपर एक उड़ता विमान उठता है।','ಲಂಕೆಯ ಮೇಲೆ ಹಾರುವ ವಿಮಾನ ಏರುತ್ತದೆ.'),
   T('The fourteen years are over. Ram, Sita and Lakshman fly home in the Pushpak Vimana, looking down at the places of their journey.','चौदह वर्ष पूरे हुए। राम, सीता और लक्ष्मण पुष्पक विमान में घर लौटते हैं और नीचे अपनी यात्रा के स्थान देखते जाते हैं।','ಹದಿನಾಲ್ಕು ವರ್ಷ ಮುಗಿದಿವೆ. ರಾಮ, ಸೀತೆ, ಲಕ್ಷ್ಮಣರು ಪುಷ್ಪಕ ವಿಮಾನದಲ್ಲಿ ಮನೆಗೆ ಹೊರಡುತ್ತಾರೆ; ತಮ್ಮ ಪಯಣದ ಊರುಗಳನ್ನು ಮೇಲಿನಿಂದ ನೋಡುತ್ತಾ ಸಾಗುತ್ತಾರೆ.')),
  S('🪔',T('Lamps of Ayodhya','अयोध्या के दीये','ಅಯೋಧ್ಯೆಯ ದೀಪಗಳು'),
   T('Ayodhya glows with rows of lamps.','अयोध्या दीयों की कतारों से जगमगा उठती है।','ಅಯೋಧ್ಯೆ ದೀಪಗಳ ಸಾಲಿನಿಂದ ಬೆಳಗುತ್ತದೆ.'),
   T('The people of Ayodhya light rows of lamps to welcome Ram home, and Ram is crowned king. We remember that night as Deepavali.','अयोध्या के लोग दीयों की कतारें जलाकर राम का स्वागत करते हैं और राम का राज्याभिषेक होता है। उसी रात को हम दीपावली के रूप में याद करते हैं।','ಅಯೋಧ್ಯೆಯ ಜನ ದೀಪಗಳ ಸಾಲು ಹಚ್ಚಿ ರಾಮನನ್ನು ಸ್ವಾಗತಿಸುತ್ತಾರೆ; ರಾಮನಿಗೆ ಪಟ್ಟಾಭಿಷೇಕವಾಗುತ್ತದೆ. ಆ ರಾತ್ರಿಯನ್ನೇ ನಾವು ದೀಪಾವಳಿ ಎಂದು ನೆನೆಯುತ್ತೇವೆ.'))]];

/* Put each level's two scenes on the board: story squares ('y') near squares 30 and 68, on the first square
   that is free (not a snake, ladder or other special square). Earlier story squares are replaced. */
export function attachStories(LEVELS){LEVELS.forEach((lv,i)=>{
  Object.keys(lv.sp).forEach(k=>{if(lv.sp[k]==='y')delete lv.sp[k]});
  const busy=new Set([1,100,...lv.L.flat(),...lv.S.flat(),...(lv.bridge||[]),...Object.keys(lv.sp).map(Number)]);
  lv.stories=STORIES[i].map((s,k)=>{let n=k?68:30;while(busy.has(n)||busy.has(n-1)&&lv.sp[n-1]==='y')n++;busy.add(n);lv.sp[n]='y';return Object.assign({n,id:(i+1)+'-'+(k+1)},s)})})}
