/* Road to Ayodhya: the nine levels. A level is pure data, so a new pack = new entries here.
   place/line = name and one-line story · tints = 4 square colours · rim = frame colour · icon = level emoji
   bot = how often Diya answers questions right · items = treasure pictures for this level
   scenes = short story scenes shown on Story squares · L = ladders [from,to] · S = snakes [head,tail]
   sp = special squares {square: type}: s star · t treasure · q question · m mystery · b bonus roll · c challenge · y story · k checkpoint · o obstacle
   Boards come from tools/gen_levels.py (no ladder or snake crosses another; difficulty rises level by level). */
const T=(en,hi,kn)=>({en,hi,kn});
export const LEVELS=[
 {place:T('Ayodhya','अयोध्या','ಅಯೋಧ್ಯೆ'),line:T('Prince Ram is born to King Dasharatha. The journey begins.','राजा दशरथ के घर राजकुमार राम का जन्म हुआ। यात्रा शुरू होती है।','ದಶರಥ ರಾಜನ ಮನೆಯಲ್ಲಿ ರಾಜಕುಮಾರ ರಾಮನ ಜನನ. ಪಯಣ ಆರಂಭ.'),
  tints:['#fbe3b2','#f9d2a0','#f6e7c9','#f3d9b7'],rim:'#7a3b22',icon:'👑',bot:.55,items:['👑','🏹','🐚'],
  scenes:[T('Four princes grow up together in Ayodhya: Ram, Lakshman, Bharat and Shatrughna.','अयोध्या में चार राजकुमार साथ-साथ बड़े होते हैं: राम, लक्ष्मण, भरत और शत्रुघ्न।','ಅಯೋಧ್ಯೆಯಲ್ಲಿ ನಾಲ್ವರು ರಾಜಕುಮಾರರು ಜೊತೆಯಾಗಿ ಬೆಳೆಯುತ್ತಾರೆ: ರಾಮ, ಲಕ್ಷ್ಮಣ, ಭರತ, ಶತ್ರುಘ್ನ.'),
   T('Sage Vishwamitra asks the king to send Ram and Lakshman to guard his ashram.','ऋषि विश्वामित्र राजा से राम और लक्ष्मण को आश्रम की रक्षा के लिए माँगते हैं।','ವಿಶ್ವಾಮಿತ್ರ ಮಹರ್ಷಿ ಆಶ್ರಮದ ರಕ್ಷಣೆಗೆ ರಾಮ ಲಕ್ಷ್ಮಣರನ್ನು ಕಳುಹಿಸುವಂತೆ ರಾಜನನ್ನು ಕೇಳುತ್ತಾರೆ.')]},
 {place:T('Mithila','मिथिला','ಮಿಥಿಲೆ'),line:T("Ram lifts Shiva's great bow at Sita's swayamvara.",'सीता के स्वयंवर में राम शिव का धनुष उठाते हैं।','ಸೀತೆಯ ಸ್ವಯಂವರದಲ್ಲಿ ರಾಮ ಶಿವಧನುಸ್ಸನ್ನು ಎತ್ತುತ್ತಾನೆ.'),
  tints:['#fbd6dc','#f6c3cc','#fde6ea','#f8d0d7'],rim:'#8a2340',icon:'💐',bot:.6,items:['💐'],
  scenes:[T('King Janaka promised: whoever strings the great bow will marry Sita.','राजा जनक का प्रण था: जो महान धनुष पर प्रत्यंचा चढ़ाएगा, वही सीता से विवाह करेगा।','ಜನಕ ರಾಜನ ಪಣ: ಮಹಾಧನುಸ್ಸಿಗೆ ಹೆದೆ ಏರಿಸಿದವನಿಗೇ ಸೀತೆ.')]},
 {place:T('Chitrakoot','चित्रकूट','ಚಿತ್ರಕೂಟ'),line:T("Ram keeps his father's word and goes to the forest.",'पिता का वचन निभाने राम वन जाते हैं।','ತಂದೆಯ ಮಾತು ಉಳಿಸಲು ರಾಮ ಕಾಡಿಗೆ ಹೋಗುತ್ತಾನೆ.'),
  tints:['#d9ecd0','#c6e2b9','#e6f2de','#cfe6c4'],rim:'#2f5a2a',icon:'🌳',bot:.64,items:['🌺','🍯'],
  scenes:[T("Bharat comes to the forest and takes Ram's sandals back to place on the throne.",'भरत वन में आते हैं और राम की पादुकाएँ सिंहासन पर रखने के लिए ले जाते हैं।','ಭರತ ಕಾಡಿಗೆ ಬಂದು ರಾಮನ ಪಾದುಕೆಗಳನ್ನು ಸಿಂಹಾಸನದ ಮೇಲಿಡಲು ಕೊಂಡೊಯ್ಯುತ್ತಾನೆ.')]},
 {place:T('Dandakaranya','दंडकारण्य','ದಂಡಕಾರಣ್ಯ'),line:T('Deep in the Dandaka forest, Ram protects the sages.','घने दंडक वन में राम ऋषियों की रक्षा करते हैं।','ದಟ್ಟ ದಂಡಕಾರಣ್ಯದಲ್ಲಿ ರಾಮ ಋಷಿಗಳನ್ನು ಕಾಪಾಡುತ್ತಾನೆ.'),
  tints:['#cfe3c6','#bcd6b0','#dcebd3','#c5dcba'],rim:'#24452a',icon:'🌲',bot:.68,items:['🌿'],scenes:[]},
 {place:T('Panchavati','पंचवटी','ಪಂಚವಟಿ'),line:T('A golden deer appears near the hut. Careful!','कुटिया के पास सोने का हिरण दिखता है। सावधान!','ಕುಟೀರದ ಬಳಿ ಚಿನ್ನದ ಜಿಂಕೆ ಕಾಣಿಸುತ್ತದೆ. ಎಚ್ಚರ!'),
  tints:['#fbeab0','#f6dc8e','#fdf1c8','#f8e3a2'],rim:'#7a5a10',icon:'🦌',bot:.72,items:['🦌'],
  scenes:[T('The brave bird Jatayu tries to stop Ravana and tells Ram which way he went.','वीर पक्षी जटायु रावण को रोकने की कोशिश करता है और राम को उसकी दिशा बताता है।','ಧೀರ ಪಕ್ಷಿ ಜಟಾಯು ರಾವಣನನ್ನು ತಡೆಯಲು ಯತ್ನಿಸಿ, ಅವನು ಹೋದ ದಿಕ್ಕನ್ನು ರಾಮನಿಗೆ ತಿಳಿಸುತ್ತಾನೆ.')]},
 {place:T('Kishkindha','किष्किंधा','ಕಿಷ್ಕಿಂಧೆ'),line:T('Ram meets Hanuman and Sugriva. Friends help each other.','राम की भेंट हनुमान और सुग्रीव से होती है। मित्र एक-दूसरे की मदद करते हैं।','ರಾಮನಿಗೆ ಹನುಮಂತ ಮತ್ತು ಸುಗ್ರೀವರ ಭೇಟಿ. ಗೆಳೆಯರು ಒಬ್ಬರಿಗೊಬ್ಬರು ನೆರವಾಗುತ್ತಾರೆ.'),
  tints:['#f3dcc4','#ebc9a8','#f7e7d6','#efd3b7'],rim:'#6b3a1c',icon:'🐒',bot:.76,items:['🍌'],scenes:[]},
 {place:T('Rameswaram','रामेश्वरम','ರಾಮೇಶ್ವರ'),line:T('The vanara army builds a bridge across the sea.','वानर सेना समुद्र पर पुल बनाती है।','ವಾನರ ಸೇನೆ ಸಮುದ್ರಕ್ಕೆ ಸೇತುವೆ ಕಟ್ಟುತ್ತದೆ.'),
  tints:['#d2ecf4','#bde2ee','#e3f3f8','#c8e7f1'],rim:'#1f4f6b',icon:'🌊',bot:.8,items:['🪨'],scenes:[]},
 {place:T('Lanka','लंका','ಲಂಕೆ'),line:T('Good wins over pride. Sita is free.','अहंकार पर अच्छाई की जीत। सीता मुक्त हुईं।','ಅಹಂಕಾರದ ಮೇಲೆ ಒಳ್ಳೆಯತನದ ಗೆಲುವು. ಸೀತೆ ಬಿಡುಗಡೆಯಾದಳು.'),
  tints:['#f7d3c0','#f0bfa6','#fbe2d4','#f3c9b3'],rim:'#7a1f14',icon:'🏰',bot:.84,items:['💍'],scenes:[]},
 {place:T('Return to Ayodhya','अयोध्या वापसी','ಅಯೋಧ್ಯೆಗೆ ಮರಳಿ'),goal:T('Ayodhya','अयोध्या','ಅಯೋಧ್ಯೆ'),line:T('Ram flies home. Light the lamps of Ayodhya!','राम घर लौटते हैं। अयोध्या के दीये जलाओ!','ರಾಮ ಮನೆಗೆ ಹಿಂದಿರುಗುತ್ತಾನೆ. ಅಯೋಧ್ಯೆಯ ದೀಪ ಹಚ್ಚಿ!'),
  tints:['#ffe7a6','#ffd98a','#fff0c4','#ffe09a'],rim:'#8a4b1c',icon:'🪔',bot:.86,items:['🪔','🌼'],
  scenes:[T('After fourteen years, the Pushpak Vimana carries Ram, Sita and Lakshman home.','चौदह वर्ष बाद पुष्पक विमान राम, सीता और लक्ष्मण को घर ले आता है।','ಹದಿನಾಲ್ಕು ವರ್ಷಗಳ ಬಳಿಕ ಪುಷ್ಪಕ ವಿಮಾನ ರಾಮ, ಸೀತೆ, ಲಕ್ಷ್ಮಣರನ್ನು ಮನೆಗೆ ಕರೆತರುತ್ತದೆ.')]}];
const BOARDS=[{"L":[[5,26],[14,49],[51,71],[53,89],[66,96]],"S":[[77,57],[62,39],[45,18],[31,11]],"sp":{"6":"s","10":"y","13":"t","44":"t","59":"b","74":"s","83":"y","86":"t","90":"s","95":"s"},"twist":0.15,"avg":25.6},{"L":[[10,30],[25,45],[43,79],[67,93],[69,91]],"S":[[85,55],[77,57],[53,27],[50,13],[41,17]],"sp":{"6":"b","22":"y","24":"q","26":"q","35":"q","44":"c","47":"s","61":"s","75":"q","82":"s","95":"c"},"twist":0.19,"avg":28.0},{"L":[[3,21],[6,34],[24,56],[59,78],[61,82]],"S":[[94,71],[76,39],[73,50],[67,30],[28,10]],"sp":{"17":"c","23":"s","32":"m","41":"m","43":"c","46":"y","68":"m","70":"m","72":"t","79":"s","87":"t"},"twist":0.23,"avg":27.4},{"L":[[9,30],[20,60],[50,68],[76,94],[79,97]],"S":[[92,70],[88,55],[64,35],[47,28],[44,15],[24,3]],"sp":{"11":"c","19":"s","23":"o","25":"o","37":"q","41":"k","43":"s","72":"c","81":"q","90":"o","96":"q"},"twist":0.27,"avg":29.2},{"L":[[3,36],[21,41],[26,54],[68,94],[71,91]],"S":[[83,66],[81,63],[61,43],[56,23],[51,11],[48,9]],"sp":{"8":"q","19":"q","25":"c","42":"c","45":"m","59":"s","62":"m","64":"m","74":"y","84":"m","92":"c","97":"s"},"twist":0.31,"avg":35.6},{"L":[[10,30],[13,47],[55,84],[73,91]],"S":[[96,67],[81,61],[78,45],[59,25],[52,32],[23,2]],"sp":{"15":"c","19":"c","21":"q","28":"k","31":"b","35":"b","39":"s","51":"c","68":"q","71":"s","86":"q"},"twist":0.35,"avg":38.3},{"L":[[5,24],[34,66],[38,59],[57,77]],"S":[[92,71],[87,53],[83,61],[69,50],[41,21],[36,14],[28,10]],"sp":{"12":"t","17":"t","35":"c","42":"s","48":"t","55":"t","64":"q","73":"k","75":"c","78":"q","82":"s"},"twist":0.39,"avg":40.4},{"L":[[24,44],[65,95],[69,90],[77,97]],"S":[[93,67],[80,58],[60,18],[51,30],[47,26],[28,10],[21,2]],"sp":{"4":"q","29":"o","35":"c","41":"k","49":"k","55":"q","61":"m","66":"q","76":"o","82":"k","89":"m","96":"c"},"twist":0.43,"avg":39.3},{"L":[[18,37],[41,78],[64,95],[70,92]],"S":[[97,80],[87,52],[75,46],[58,21],[48,25],[32,8],[30,10],[27,6]],"sp":{"4":"q","24":"s","36":"k","38":"q","40":"m","49":"q","57":"c","61":"k","63":"c","71":"b","73":"m","81":"t","83":"s","88":"t","91":"y","94":"c"},"twist":0.47,"avg":44.7}];
LEVELS.forEach((l,i)=>Object.assign(l,BOARDS[i]));
/* mini-games played on Challenge squares (see minigames.js), used in turn */
const GAMES=[[],['bow'],['memory'],['paths'],['deer','order'],['team'],['bridge'],['dice2'],['bow','memory','order','team','deer','bridge']];
LEVELS.forEach((l,i)=>l.games=GAMES[i]);
/* Rameswaram: 3 stones (stone squares or a won bridge challenge) build the bridge = a new ladder from 56 to 85 */
LEVELS[6].bridge=[56,85];LEVELS[6].need=3;
