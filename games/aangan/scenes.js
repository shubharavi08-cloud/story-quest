// Aangan story scenes. Each line: [background, speaker, face, text]
// speakers: n = narrator, ajji, meera, arjun, both (Meera + Arjun together)
window.SCENES={
en:{
 names:{ajji:'Ajji',meera:'Meera',arjun:'Arjun',both:'Meera & Arjun',skip:'Skip',tap:'Tap'},
 intro:[
  ['village','n','','Summer holidays. After many years, Meera and Arjun come back to Ajji\'s village.'],
  ['village','arjun','wow','Akka, look! Cows, coconut trees… and no traffic at all!'],
  ['village','meera','smile','Ajji\'s house is at the end of this lane. Come on, race you!'],
  ['house_old','arjun','wow','Is this… Ajji\'s house? Half the roof is broken!'],
  ['house_old','meera','wow','Look — Ajji is waiting for us at the gate!'],
  ['house_old_z','ajji','laugh','Meera! Arjun! You came at last… come here, let me look at you.'],
  ['house_old_z','ajji','smile','Once this was the grandest thotti mane in the village — teak pillars, a tulsi in the courtyard, a festival every month.'],
  ['house_old_z','ajji','smile','After your Ajja left us, I could not look after it alone. The rains took the tiles, the kitchen went cold, the terrace went quiet.'],
  ['court0','meera','smile','Don\'t worry, Ajji. We will fix it — every room, just the way you want.'],
  ['court0','arjun','wow','Promise! Pinky promise!'],
  ['court0','ajji','laugh','Then let us start with the aangan. Every game we play together brings warmth back to this house.']],
 room0:[
  ['court4','arjun','wow','The jhoola swings again! Ajji, come and sit with me!'],
  ['court4','ajji','laugh','Rosewood pillars, gold Mysore paintings… your Ajja would be so proud. The aangan is smiling.'],
  ['court4','meera','smile','Next, the kitchen. I want to learn your dosa secret, Ajji!']],
 room1:[
  ['kitchen4','meera','wow','Shining brass, carved cabinets, the stove lit… it smells like a festival!'],
  ['kitchen4','arjun','smile','Can we eat now? Please, please?'],
  ['kitchen4','ajji','laugh','First the terrace, greedy boy! Then mango pickle for everyone.']],
 room2:[
  ['terrace4','arjun','wow','I can see the whole village from up here! And all the kites!'],
  ['terrace4','meera','smile','Ajji, the whole house is waking up.'],
  ['terrace4','ajji','smile','Come down to the gate with me. I want to see our house from outside — together.']],
 final:[
  ['house_new','meera','wow','Ajji… look at our house!'],
  ['house_new','arjun','wow','It looks like a palace!'],
  ['house_new','ajji','laugh','A true Mysore thotti mane again. You kept your promise, my darlings.'],
  ['house_new','ajji','smile','But a house is never finished — the garden, the old well, the pooja room… will you come every holiday?'],
  ['house_new','both','wow','Every holiday, Ajji!']]
},
hi:{
 names:{ajji:'अज्जी',meera:'मीरा',arjun:'अर्जुन',both:'मीरा और अर्जुन',skip:'छोड़ें',tap:'टैप'},
 intro:[
  ['village','n','','गर्मी की छुट्टियाँ। कई सालों बाद मीरा और अर्जुन अज्जी के गाँव लौटे हैं।'],
  ['village','arjun','wow','दीदी, देखो! गायें, नारियल के पेड़… और कोई ट्रैफ़िक नहीं!'],
  ['village','meera','smile','अज्जी का घर इसी गली के आख़िर में है। चलो, दौड़ लगाते हैं!'],
  ['house_old','arjun','wow','क्या यही… अज्जी का घर है? आधी छत तो टूटी है!'],
  ['house_old','meera','wow','देखो — अज्जी गेट पर हमारा इंतज़ार कर रही हैं!'],
  ['house_old_z','ajji','laugh','मीरा! अर्जुन! आख़िर तुम आ गए… आओ, ज़रा तुम्हें देखूँ।'],
  ['house_old_z','ajji','smile','कभी यह गाँव का सबसे शानदार तोट्टी मने था — सागौन के खंभे, आँगन में तुलसी, हर महीने कोई त्योहार।'],
  ['house_old_z','ajji','smile','तुम्हारे अज्जा के जाने के बाद मैं अकेले इसे सँभाल नहीं पाई। बारिश खपरैल ले गई, रसोई ठंडी पड़ गई, छत सूनी हो गई।'],
  ['court0','meera','smile','चिंता मत करो अज्जी। हम इसे ठीक करेंगे — हर कमरा, बिल्कुल वैसा जैसा आप चाहें।'],
  ['court0','arjun','wow','पक्का वादा! पिंकी प्रॉमिस!'],
  ['court0','ajji','laugh','तो चलो, आँगन से शुरू करते हैं। हम साथ जो भी खेल खेलेंगे, वह इस घर में फिर से गर्माहट लाएगा।']],
 room0:[
  ['court4','arjun','wow','झूला फिर से झूल रहा है! अज्जी, आओ मेरे साथ बैठो!'],
  ['court4','ajji','laugh','शीशम के खंभे, सुनहरी मैसूर चित्रकारी… तुम्हारे अज्जा को कितना गर्व होता। आँगन मुस्कुरा रहा है।'],
  ['court4','meera','smile','अब रसोई की बारी। अज्जी, मुझे आपके डोसे का राज़ सीखना है!']],
 room1:[
  ['kitchen4','meera','wow','चमकते पीतल के बर्तन, नक्काशीदार अलमारियाँ, जलता चूल्हा… त्योहार जैसी ख़ुशबू आ रही है!'],
  ['kitchen4','arjun','smile','अब खाना खा सकते हैं? प्लीज़, प्लीज़?'],
  ['kitchen4','ajji','laugh','पहले छत, पेटू कहीं के! फिर सबके लिए आम का अचार।']],
 room2:[
  ['terrace4','arjun','wow','यहाँ से पूरा गाँव दिखता है! और कितनी सारी पतंगें!'],
  ['terrace4','meera','smile','अज्जी, पूरा घर फिर से जाग रहा है।'],
  ['terrace4','ajji','smile','मेरे साथ गेट तक चलो। मैं अपना घर बाहर से देखना चाहती हूँ — तुम दोनों के साथ।']],
 final:[
  ['house_new','meera','wow','अज्जी… हमारा घर तो देखो!'],
  ['house_new','arjun','wow','यह तो महल जैसा लग रहा है!'],
  ['house_new','ajji','laugh','फिर से एक सच्चा मैसूरी तोट्टी मने। तुमने अपना वादा निभाया, मेरे प्यारे बच्चो।'],
  ['house_new','ajji','smile','पर घर कभी पूरा नहीं होता — बगीचा, पुराना कुआँ, पूजा घर… हर छुट्टी में आओगे न?'],
  ['house_new','both','wow','हर छुट्टी में, अज्जी!']]
},
kn:{
 names:{ajji:'ಅಜ್ಜಿ',meera:'ಮೀರಾ',arjun:'ಅರ್ಜುನ್',both:'ಮೀರಾ ಮತ್ತು ಅರ್ಜುನ್',skip:'ಬಿಡಿ',tap:'ಒತ್ತಿ'},
 intro:[
  ['village','n','','ಬೇಸಿಗೆ ರಜೆ. ಎಷ್ಟೋ ವರ್ಷಗಳ ನಂತರ ಮೀರಾ ಮತ್ತು ಅರ್ಜುನ್ ಅಜ್ಜಿಯ ಊರಿಗೆ ಬಂದಿದ್ದಾರೆ.'],
  ['village','arjun','wow','ಅಕ್ಕಾ, ನೋಡು! ಹಸುಗಳು, ತೆಂಗಿನ ಮರಗಳು… ಟ್ರಾಫಿಕ್ಕೇ ಇಲ್ಲ!'],
  ['village','meera','smile','ಅಜ್ಜಿ ಮನೆ ಈ ಬೀದಿಯ ಕೊನೆಯಲ್ಲಿದೆ. ಬಾ, ಓಟ ಸ್ಪರ್ಧೆ!'],
  ['house_old','arjun','wow','ಇದೇನಾ… ಅಜ್ಜಿ ಮನೆ? ಅರ್ಧ ಹಂಚು ಒಡೆದು ಹೋಗಿದೆ!'],
  ['house_old','meera','wow','ನೋಡು — ಅಜ್ಜಿ ಬಾಗಿಲ ಬಳಿ ನಮಗಾಗಿ ಕಾಯುತ್ತಿದ್ದಾರೆ!'],
  ['house_old_z','ajji','laugh','ಮೀರಾ! ಅರ್ಜುನ್! ಕೊನೆಗೂ ಬಂದ್ರಾ… ಬನ್ನಿ, ನಿಮ್ಮನ್ನು ಒಮ್ಮೆ ನೋಡ್ತೀನಿ.'],
  ['house_old_z','ajji','smile','ಒಮ್ಮೆ ಇದು ಊರಿನಲ್ಲೇ ಅತ್ಯಂತ ಭವ್ಯ ತೊಟ್ಟಿ ಮನೆ — ತೇಗದ ಕಂಬಗಳು, ಅಂಗಳದಲ್ಲಿ ತುಳಸಿ, ತಿಂಗಳಿಗೊಂದು ಹಬ್ಬ.'],
  ['house_old_z','ajji','smile','ನಿಮ್ಮ ಅಜ್ಜ ಹೋದ ಮೇಲೆ ನಾನೊಬ್ಬಳೇ ಇದನ್ನು ನೋಡಿಕೊಳ್ಳಲಾಗಲಿಲ್ಲ. ಮಳೆ ಹಂಚು ಕಿತ್ತುಕೊಂಡಿತು, ಅಡುಗೆಮನೆ ತಣ್ಣಗಾಯಿತು, ತಾರಸಿ ಮೌನವಾಯಿತು.'],
  ['court0','meera','smile','ಚಿಂತೆ ಮಾಡಬೇಡಿ ಅಜ್ಜಿ. ನಾವು ಇದನ್ನು ಸರಿಮಾಡ್ತೀವಿ — ಪ್ರತಿ ಕೋಣೆ, ನೀವು ಬಯಸಿದ ಹಾಗೆಯೇ.'],
  ['court0','arjun','wow','ಪ್ರಾಮಿಸ್! ಪಿಂಕಿ ಪ್ರಾಮಿಸ್!'],
  ['court0','ajji','laugh','ಹಾಗಾದರೆ ಅಂಗಳದಿಂದ ಶುರು ಮಾಡೋಣ. ನಾವು ಒಟ್ಟಿಗೆ ಆಡುವ ಪ್ರತಿ ಆಟವೂ ಈ ಮನೆಗೆ ಮತ್ತೆ ಬೆಚ್ಚಗಿನ ಜೀವ ತರುತ್ತದೆ.']],
 room0:[
  ['court4','arjun','wow','ಉಯ್ಯಾಲೆ ಮತ್ತೆ ತೂಗುತ್ತಿದೆ! ಅಜ್ಜಿ, ಬನ್ನಿ ನನ್ನ ಜೊತೆ ಕೂತ್ಕೊಳ್ಳಿ!'],
  ['court4','ajji','laugh','ಬೀಟೆ ಮರದ ಕಂಬಗಳು, ಚಿನ್ನದ ಮೈಸೂರು ಚಿತ್ರಗಳು… ನಿಮ್ಮ ಅಜ್ಜನಿಗೆ ಎಷ್ಟು ಹೆಮ್ಮೆಯಾಗುತ್ತಿತ್ತು. ಅಂಗಳ ನಗುತ್ತಿದೆ.'],
  ['court4','meera','smile','ಈಗ ಅಡುಗೆಮನೆ. ಅಜ್ಜಿ, ನಿಮ್ಮ ದೋಸೆಯ ಗುಟ್ಟು ನನಗೆ ಕಲಿಸಿ!']],
 room1:[
  ['kitchen4','meera','wow','ಹೊಳೆಯುವ ಹಿತ್ತಾಳೆ, ಕೆತ್ತನೆಯ ಕಪಾಟುಗಳು, ಉರಿಯುವ ಒಲೆ… ಹಬ್ಬದ ಪರಿಮಳ!'],
  ['kitchen4','arjun','smile','ಈಗ ಊಟ ಮಾಡಬಹುದಾ? ಪ್ಲೀಸ್, ಪ್ಲೀಸ್?'],
  ['kitchen4','ajji','laugh','ಮೊದಲು ತಾರಸಿ, ಹೊಟ್ಟೆಬಾಕ! ಆಮೇಲೆ ಎಲ್ಲರಿಗೂ ಮಾವಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ.']],
 room2:[
  ['terrace4','arjun','wow','ಇಲ್ಲಿಂದ ಇಡೀ ಊರು ಕಾಣುತ್ತೆ! ಎಷ್ಟೊಂದು ಗಾಳಿಪಟಗಳು!'],
  ['terrace4','meera','smile','ಅಜ್ಜಿ, ಇಡೀ ಮನೆ ಮತ್ತೆ ಎಚ್ಚರಗೊಳ್ಳುತ್ತಿದೆ.'],
  ['terrace4','ajji','smile','ನನ್ನ ಜೊತೆ ಬಾಗಿಲವರೆಗೆ ಬನ್ನಿ. ನಮ್ಮ ಮನೆಯನ್ನು ಹೊರಗಿನಿಂದ ನೋಡಬೇಕು — ನಿಮ್ಮಿಬ್ಬರ ಜೊತೆ.']],
 final:[
  ['house_new','meera','wow','ಅಜ್ಜಿ… ನಮ್ಮ ಮನೆ ನೋಡಿ!'],
  ['house_new','arjun','wow','ಅರಮನೆ ಥರ ಕಾಣುತ್ತೆ!'],
  ['house_new','ajji','laugh','ಮತ್ತೆ ನಿಜವಾದ ಮೈಸೂರು ತೊಟ್ಟಿ ಮನೆ. ನೀವು ಮಾತು ಉಳಿಸಿಕೊಂಡಿರಿ, ನನ್ನ ಮುದ್ದು ಮಕ್ಕಳೇ.'],
  ['house_new','ajji','smile','ಆದರೆ ಮನೆ ಕೆಲಸ ಎಂದೂ ಮುಗಿಯಲ್ಲ — ತೋಟ, ಹಳೇ ಬಾವಿ, ದೇವರ ಮನೆ… ಪ್ರತಿ ರಜೆಗೂ ಬರ್ತೀರಾ ತಾನೆ?'],
  ['house_new','both','wow','ಪ್ರತಿ ರಜೆಗೂ, ಅಜ್ಜಿ!']]
}};
