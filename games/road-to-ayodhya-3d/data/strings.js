/* Road to Ayodhya: all on-screen text (EN / HI / KN). Add a language by adding one more block. */
export const L={
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

/* added for the adventure build (special squares, menu, score) */
Object.assign(L.en,{menu:'Menu',howTitle:'How to play',score:'Score',close:'Close',language:'Language',music:'Music',sound:'Sounds',fast:'Fast moves',qLevel:'Question level',
 diff:['Easy','Medium','Advanced'],playersBtn:'Players',journey:'Journey map',restart:'Restart level',on:'On',off:'Off',letsGo:'Start',newHere:'On this board',
 rules:'Roll the dice and race to square 100. Ladders lift you up, snakes pull you down. Special squares give stars, treasures, questions and surprises.',
 sqName:{s:'Star',t:'Treasure',q:'Question',m:'Mystery',b:'Bonus roll',c:'Challenge',y:'Story',k:'Checkpoint',o:'Obstacle'},
 sqDesc:{s:'+10 points',t:'Collect it: +20 points',q:'Answer right: +15 points and 2 steps forward',m:'A surprise, good or bad',b:'Roll again',c:'A mini-game. Win: +25 points and 3 steps',y:'A short scene from the story',k:'A snake cannot pull you below this square',o:'Answer right or miss a turn'},
 bonusRoll:'🎲 Bonus! Roll again.',cpSet:'🚩 Checkpoint reached',cpSave:'🚩 The checkpoint held you!',skip:n=>`${n} misses this turn`,
 qRight:'Right! +15 points and 2 steps forward.',oRight:'Right! The path is clear.',oWrong:a=>`The answer is: ${a}. You miss one turn.`,
 mPts:'A gift! +20 points',mFwd:'A kind wind carries you 3 steps forward',mBack:'A thorny path. 2 steps back',mRoll:'Good luck! Roll again',
 storyTag:'Story',treasure:'Treasure',ladderUp:'Ladder!',snakeDown:'Snake!',ahead:'In the lead',sqWord:'Square',
 starsRule:'★ win · ★ score 60 or more · ★ get bitten once or less',loseText:'Try again. Stars, treasures and right answers give you points.',
 tipStart:'Tap Roll (or press Space) to start. Ladders lift you up, snakes pull you down!'});
Object.assign(L.hi,{menu:'मेन्यू',howTitle:'कैसे खेलें',score:'अंक',close:'बंद करें',language:'भाषा',music:'संगीत',sound:'ध्वनि',fast:'तेज़ चाल',qLevel:'सवालों का स्तर',
 diff:['आसान','मध्यम','कठिन'],playersBtn:'खिलाड़ी',journey:'यात्रा का नक्शा',restart:'स्तर फिर शुरू करें',on:'चालू',off:'बंद',letsGo:'शुरू करें',newHere:'इस बोर्ड पर',
 rules:'पासा फेंको और खाना 100 तक दौड़ो। सीढ़ी ऊपर ले जाती है, साँप नीचे गिराता है। ख़ास खानों पर तारे, ख़ज़ाने, सवाल और अचरज मिलते हैं।',
 sqName:{s:'तारा',t:'ख़ज़ाना',q:'सवाल',m:'रहस्य',b:'एक और बारी',c:'चुनौती',y:'कहानी',k:'पड़ाव',o:'रुकावट'},
 sqDesc:{s:'+10 अंक',t:'उठा लो: +20 अंक',q:'सही उत्तर: +15 अंक और 2 कदम आगे',m:'एक अचरज, अच्छा या बुरा',b:'फिर से पासा फेंको',c:'छोटा खेल, बड़ा इनाम',y:'कहानी का एक छोटा दृश्य',k:'साँप आपको इस खाने से नीचे नहीं ले जा सकता',o:'सही उत्तर दो, नहीं तो एक बारी छूटेगी'},
 bonusRoll:'🎲 बोनस! फिर से फेंको।',cpSet:'🚩 पड़ाव पर पहुँचे',cpSave:'🚩 पड़ाव ने बचा लिया!',skip:n=>`${n} की यह बारी छूटी`,
 qRight:'सही! +15 अंक और 2 कदम आगे।',oRight:'सही! रास्ता साफ़ है।',oWrong:a=>`सही उत्तर: ${a}। एक बारी छूटेगी।`,
 mPts:'उपहार! +20 अंक',mFwd:'हवा का झोंका आपको 3 कदम आगे ले गया',mBack:'काँटों भरा रास्ता। 2 कदम पीछे',mRoll:'भाग्य साथ है! फिर फेंको',
 storyTag:'कहानी',treasure:'ख़ज़ाना',ladderUp:'सीढ़ी!',snakeDown:'साँप!',ahead:'सबसे आगे',sqWord:'खाना',
 starsRule:'★ जीत · ★ 60 या ज़्यादा अंक · ★ साँप से एक बार से ज़्यादा न कटो',loseText:'फिर कोशिश करो। तारे, ख़ज़ाने और सही उत्तर अंक दिलाते हैं।'});
Object.assign(L.kn,{menu:'ಮೆನು',howTitle:'ಆಡುವ ಬಗೆ',score:'ಅಂಕ',close:'ಮುಚ್ಚಿ',language:'ಭಾಷೆ',music:'ಸಂಗೀತ',sound:'ಶಬ್ದ',fast:'ವೇಗದ ನಡೆ',qLevel:'ಪ್ರಶ್ನೆಗಳ ಮಟ್ಟ',
 diff:['ಸುಲಭ','ಮಧ್ಯಮ','ಕಠಿಣ'],playersBtn:'ಆಟಗಾರರು',journey:'ಪಯಣದ ನಕ್ಷೆ',restart:'ಹಂತ ಮತ್ತೆ ಆರಂಭಿಸಿ',on:'ಇದೆ',off:'ಇಲ್ಲ',letsGo:'ಆರಂಭಿಸಿ',newHere:'ಈ ಹಲಗೆಯಲ್ಲಿ',
 rules:'ದಾಳ ಎಸೆದು ಮನೆ 100ಕ್ಕೆ ಓಡಿ. ಏಣಿ ಮೇಲೆ ಏರಿಸುತ್ತದೆ, ಹಾವು ಕೆಳಗೆ ಇಳಿಸುತ್ತದೆ. ವಿಶೇಷ ಮನೆಗಳಲ್ಲಿ ನಕ್ಷತ್ರ, ನಿಧಿ, ಪ್ರಶ್ನೆ ಮತ್ತು ಅಚ್ಚರಿಗಳು ಸಿಗುತ್ತವೆ.',
 sqName:{s:'ನಕ್ಷತ್ರ',t:'ನಿಧಿ',q:'ಪ್ರಶ್ನೆ',m:'ರಹಸ್ಯ',b:'ಇನ್ನೊಂದು ಸರದಿ',c:'ಸವಾಲು',y:'ಕಥೆ',k:'ತಂಗುದಾಣ',o:'ಅಡ್ಡಿ'},
 sqDesc:{s:'+10 ಅಂಕ',t:'ಎತ್ತಿಕೊಳ್ಳಿ: +20 ಅಂಕ',q:'ಸರಿ ಉತ್ತರ: +15 ಅಂಕ, 2 ಹೆಜ್ಜೆ ಮುಂದೆ',m:'ಒಂದು ಅಚ್ಚರಿ, ಒಳ್ಳೆಯದೋ ಕೆಟ್ಟದ್ದೋ',b:'ಮತ್ತೆ ದಾಳ ಎಸೆಯಿರಿ',c:'ಪುಟ್ಟ ಆಟ, ದೊಡ್ಡ ಬಹುಮಾನ',y:'ಕಥೆಯ ಒಂದು ಪುಟ್ಟ ದೃಶ್ಯ',k:'ಹಾವು ನಿಮ್ಮನ್ನು ಈ ಮನೆಗಿಂತ ಕೆಳಗೆ ಇಳಿಸಲಾರದು',o:'ಸರಿ ಉತ್ತರ ಕೊಡಿ, ಇಲ್ಲದಿದ್ದರೆ ಒಂದು ಸರದಿ ಹೋಗುತ್ತದೆ'},
 bonusRoll:'🎲 ಬೋನಸ್! ಮತ್ತೆ ಎಸೆಯಿರಿ.',cpSet:'🚩 ತಂಗುದಾಣ ತಲುಪಿದಿರಿ',cpSave:'🚩 ತಂಗುದಾಣ ನಿಮ್ಮನ್ನು ಕಾಪಾಡಿತು!',skip:n=>`${n} ಅವರ ಈ ಸರದಿ ಹೋಯಿತು`,
 qRight:'ಸರಿ! +15 ಅಂಕ, 2 ಹೆಜ್ಜೆ ಮುಂದೆ.',oRight:'ಸರಿ! ದಾರಿ ತೆರವಾಯಿತು.',oWrong:a=>`ಸರಿ ಉತ್ತರ: ${a}. ಒಂದು ಸರದಿ ಹೋಗುತ್ತದೆ.`,
 mPts:'ಉಡುಗೊರೆ! +20 ಅಂಕ',mFwd:'ತಂಗಾಳಿ ನಿಮ್ಮನ್ನು 3 ಹೆಜ್ಜೆ ಮುಂದೆ ಒಯ್ದಿತು',mBack:'ಮುಳ್ಳಿನ ದಾರಿ. 2 ಹೆಜ್ಜೆ ಹಿಂದೆ',mRoll:'ಅದೃಷ್ಟ! ಮತ್ತೆ ಎಸೆಯಿರಿ',
 storyTag:'ಕಥೆ',treasure:'ನಿಧಿ',ladderUp:'ಏಣಿ!',snakeDown:'ಹಾವು!',ahead:'ಮುಂದಿದ್ದಾರೆ',sqWord:'ಮನೆ',
 starsRule:'★ ಗೆಲುವು · ★ 60 ಅಥವಾ ಹೆಚ್ಚು ಅಂಕ · ★ ಹಾವು ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬಾರಿ ಕಚ್ಚದಿರಲಿ',loseText:'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. ನಕ್ಷತ್ರ, ನಿಧಿ ಮತ್ತು ಸರಿ ಉತ್ತರಗಳಿಂದ ಅಂಕ ಸಿಗುತ್ತವೆ.'});

/* mini-games (Challenge squares) and the final certificate */
L.en.mg={tag:'Challenge',win:'Well done! +25 points and 3 steps forward.',lose:'Not this time. Keep going!',
 bow:{t:"Lift Shiva's bow",d:'Tap LIFT when the marker is inside the green band.',btn:'Lift!'},
 memory:{t:'Forest memory',d:'Find the 3 pairs. You have 6 turns.',left:n=>`Turns left: ${n}`},
 paths:{t:'Two paths in the forest',d:'Which way will you go?',safe:'Safe path',safeD:'2 steps forward',brave:'Brave path',braveD:'Roll: 4, 5 or 6 → 6 steps forward. 1, 2 or 3 → 2 steps back.',res:(v,ok)=>`You rolled ${v}. `+(ok?'6 steps forward!':'2 steps back.')},
 deer:{t:'Where is the golden deer?',d:'Watch the bushes, then tap the one hiding the deer.',watch:'Watch…',pick:'Tap a bush'},
 order:{t:'Put the story in order',d:'Tap the three scenes from first to last.'},
 team:{t:'Pass the message',d:'Watch the friends light up, then tap them in the same order.',teamWin:'Teamwork! Everyone moves 1 step forward.'},
 bridge:{t:'Build the bridge',d:'Tap the stones in order, 1 to 6, before time runs out.',built:'🌉 The bridge is built! A new shortcut is open.',count:(n,m)=>`Stones for the bridge: ${n}/${m}`},
 dice2:{t:'Choose your move',d:'Two dice are rolled. Pick the one you want.',opt:(v,n)=>`${v} → square ${n}`}};
L.en.cert=(n,s)=>`🏆 Journey complete! ${n} finished all nine levels with ${s} of 27 stars.`;
L.hi.mg={tag:'चुनौती',win:'शाबाश! +25 अंक और 3 कदम आगे।',lose:'इस बार नहीं। आगे बढ़ते रहो!',
 bow:{t:'शिव धनुष उठाओ',d:'जब निशान हरी पट्टी में हो, तब "उठाओ" दबाओ।',btn:'उठाओ!'},
 memory:{t:'वन की याददाश्त',d:'3 जोड़े खोजो। आपके पास 6 बारियाँ हैं।',left:n=>`बची बारियाँ: ${n}`},
 paths:{t:'वन में दो रास्ते',d:'आप किस रास्ते जाएँगे?',safe:'सुरक्षित रास्ता',safeD:'2 कदम आगे',brave:'साहसी रास्ता',braveD:'पासा फेंको: 4, 5 या 6 आए तो 6 कदम आगे। 1, 2 या 3 आए तो 2 कदम पीछे।',res:(v,ok)=>`पासे पर ${v} आया। `+(ok?'6 कदम आगे!':'2 कदम पीछे।')},
 deer:{t:'सोने का हिरण कहाँ है?',d:'झाड़ियों को ध्यान से देखो, फिर उस झाड़ी को छुओ जिसमें हिरण छिपा है।',watch:'ध्यान से देखो…',pick:'एक झाड़ी छुओ'},
 order:{t:'कहानी को क्रम में लगाओ',d:'तीनों दृश्यों को पहले से आख़िरी के क्रम में छुओ।'},
 team:{t:'संदेश आगे पहुँचाओ',d:'देखो कौन-कौन से साथी चमकते हैं, फिर उसी क्रम में उन्हें छुओ।',teamWin:'मिलकर किया! सब 1 कदम आगे बढ़े।'},
 bridge:{t:'पुल बनाओ',d:'समय ख़त्म होने से पहले पत्थरों को 1 से 6 के क्रम में छुओ।',built:'🌉 पुल बन गया! एक नया छोटा रास्ता खुल गया।',count:(n,m)=>`पुल के पत्थर: ${n}/${m}`},
 dice2:{t:'अपनी चाल चुनो',d:'दो पासे फेंके गए हैं। जो चाहिए वह चुनो।',opt:(v,n)=>`${v} → खाना ${n}`}};
L.hi.cert=(n,s)=>`🏆 यात्रा पूरी! ${n} ने नौ के नौ स्तर ${s}/27 तारों के साथ पूरे किए।`;
L.kn.mg={tag:'ಸವಾಲು',win:'ಭೇಷ್! +25 ಅಂಕ, 3 ಹೆಜ್ಜೆ ಮುಂದೆ.',lose:'ಈ ಸಲ ಆಗಲಿಲ್ಲ. ಮುಂದೆ ಸಾಗಿ!',
 bow:{t:'ಶಿವಧನುಸ್ಸು ಎತ್ತಿ',d:'ಗುರುತು ಹಸಿರು ಪಟ್ಟಿಯೊಳಗೆ ಬಂದಾಗ "ಎತ್ತಿ" ಒತ್ತಿ.',btn:'ಎತ್ತಿ!'},
 memory:{t:'ಕಾಡಿನ ನೆನಪಿನ ಆಟ',d:'3 ಜೋಡಿಗಳನ್ನು ಹುಡುಕಿ. ನಿಮಗೆ 6 ಅವಕಾಶಗಳಿವೆ.',left:n=>`ಉಳಿದ ಅವಕಾಶ: ${n}`},
 paths:{t:'ಕಾಡಿನಲ್ಲಿ ಎರಡು ದಾರಿ',d:'ನೀವು ಯಾವ ದಾರಿಯಲ್ಲಿ ಹೋಗುತ್ತೀರಿ?',safe:'ಸುರಕ್ಷಿತ ದಾರಿ',safeD:'2 ಹೆಜ್ಜೆ ಮುಂದೆ',brave:'ಧೈರ್ಯದ ದಾರಿ',braveD:'ದಾಳ ಎಸೆಯಿರಿ: 4, 5 ಅಥವಾ 6 ಬಿದ್ದರೆ 6 ಹೆಜ್ಜೆ ಮುಂದೆ. 1, 2 ಅಥವಾ 3 ಬಿದ್ದರೆ 2 ಹೆಜ್ಜೆ ಹಿಂದೆ.',res:(v,ok)=>`ದಾಳದಲ್ಲಿ ${v} ಬಿತ್ತು. `+(ok?'6 ಹೆಜ್ಜೆ ಮುಂದೆ!':'2 ಹೆಜ್ಜೆ ಹಿಂದೆ.')},
 deer:{t:'ಚಿನ್ನದ ಜಿಂಕೆ ಎಲ್ಲಿದೆ?',d:'ಪೊದೆಗಳನ್ನು ಗಮನಿಸಿ ನೋಡಿ, ಆಮೇಲೆ ಜಿಂಕೆ ಅಡಗಿರುವ ಪೊದೆಯನ್ನು ಮುಟ್ಟಿ.',watch:'ಗಮನಿಸಿ ನೋಡಿ…',pick:'ಒಂದು ಪೊದೆ ಮುಟ್ಟಿ'},
 order:{t:'ಕಥೆಯನ್ನು ಕ್ರಮವಾಗಿ ಜೋಡಿಸಿ',d:'ಮೂರು ದೃಶ್ಯಗಳನ್ನು ಮೊದಲಿನಿಂದ ಕೊನೆಯವರೆಗೆ ಕ್ರಮವಾಗಿ ಮುಟ್ಟಿ.'},
 team:{t:'ಸಂದೇಶ ಮುಂದೆ ಸಾಗಿಸಿ',d:'ಯಾವ ಗೆಳೆಯರು ಬೆಳಗುತ್ತಾರೆ ನೋಡಿ, ಆಮೇಲೆ ಅದೇ ಕ್ರಮದಲ್ಲಿ ಅವರನ್ನು ಮುಟ್ಟಿ.',teamWin:'ಒಗ್ಗಟ್ಟಿನ ಗೆಲುವು! ಎಲ್ಲರೂ 1 ಹೆಜ್ಜೆ ಮುಂದೆ.'},
 bridge:{t:'ಸೇತುವೆ ಕಟ್ಟಿ',d:'ಸಮಯ ಮುಗಿಯುವ ಮೊದಲು ಕಲ್ಲುಗಳನ್ನು 1ರಿಂದ 6ರವರೆಗೆ ಕ್ರಮವಾಗಿ ಮುಟ್ಟಿ.',built:'🌉 ಸೇತುವೆ ಸಿದ್ಧವಾಯಿತು! ಹೊಸ ಹತ್ತಿರದ ದಾರಿ ತೆರೆಯಿತು.',count:(n,m)=>`ಸೇತುವೆಯ ಕಲ್ಲುಗಳು: ${n}/${m}`},
 dice2:{t:'ನಿಮ್ಮ ನಡೆ ಆರಿಸಿ',d:'ಎರಡು ದಾಳ ಬಿದ್ದಿವೆ. ಬೇಕಾದದ್ದನ್ನು ಆರಿಸಿ.',opt:(v,n)=>`${v} → ಮನೆ ${n}`}};
L.kn.cert=(n,s)=>`🏆 ಪಯಣ ಪೂರ್ಣ! ${n} ಒಂಬತ್ತೂ ಹಂತಗಳನ್ನು 27ರಲ್ಲಿ ${s} ನಕ್ಷತ್ರಗಳೊಂದಿಗೆ ಮುಗಿಸಿದರು.`;

/* achievements and play modes */
Object.assign(L.en,{achTitle:'Badges',achNew:'🏅 New badge:',free:'Free play (all levels open)',learn:'Learning mode (more questions)',learnQ:'Right! +10 points.',
 ach:{first:['First Roll','Roll the dice once'],ladder:['Ladder Climber','Climb 5 ladders'],brave:['Brave Explorer','Win 3 challenges'],know:['Knowledge Champion','Answer 10 questions right'],hunter:['Treasure Hunter','Collect every treasure on one board'],master:['Journey Master','Finish all nine levels']}});
Object.assign(L.hi,{achTitle:'बिल्ले',achNew:'🏅 नया बिल्ला:',free:'खुला खेल (सभी स्तर खुले)',learn:'सीखने का तरीका (ज़्यादा सवाल)',learnQ:'सही! +10 अंक।',
 ach:{first:['पहला पासा','एक बार पासा फेंको'],ladder:['सीढ़ी वीर','5 सीढ़ियाँ चढ़ो'],brave:['साहसी यात्री','3 चुनौतियाँ जीतो'],know:['ज्ञान विजेता','10 सवालों के सही उत्तर दो'],hunter:['ख़ज़ाना खोजी','एक बोर्ड के सारे ख़ज़ाने जमा करो'],master:['यात्रा विजेता','नौ के नौ स्तर पूरे करो']}});
Object.assign(L.kn,{achTitle:'ಪದಕಗಳು',achNew:'🏅 ಹೊಸ ಪದಕ:',free:'ಮುಕ್ತ ಆಟ (ಎಲ್ಲ ಹಂತ ತೆರೆದಿವೆ)',learn:'ಕಲಿಕೆಯ ಆಟ (ಹೆಚ್ಚು ಪ್ರಶ್ನೆ)',learnQ:'ಸರಿ! +10 ಅಂಕ.',
 ach:{first:['ಮೊದಲ ದಾಳ','ಒಮ್ಮೆ ದಾಳ ಎಸೆಯಿರಿ'],ladder:['ಏಣಿ ವೀರ','5 ಏಣಿ ಏರಿ'],brave:['ಧೀರ ಪಯಣಿಗ','3 ಸವಾಲು ಗೆಲ್ಲಿ'],know:['ಜ್ಞಾನ ವಿಜೇತ','10 ಪ್ರಶ್ನೆಗಳಿಗೆ ಸರಿ ಉತ್ತರ ಕೊಡಿ'],hunter:['ನಿಧಿ ಶೋಧಕ','ಒಂದು ಹಲಗೆಯ ಎಲ್ಲ ನಿಧಿ ಸಂಗ್ರಹಿಸಿ'],master:['ಪಯಣ ವಿಜೇತ','ಒಂಬತ್ತೂ ಹಂತ ಮುಗಿಸಿ']}});

/* story events: glimpses, full scenes, Storybook */
Object.assign(L.en,{book:'Storybook',bookHint:'Pass or land on a 📜 square to discover a story.',readAgain:'Read again',skipBtn:'Skip',voice:'Read stories aloud',scroll:'Story scroll +10',storyQ:'Right! +10 points.',found:(a,b)=>`Stories found: ${a} / ${b}`});
Object.assign(L.hi,{book:'कहानी की किताब',bookHint:'📜 वाले खाने से गुज़रो या उस पर रुको, कहानी खुल जाएगी।',readAgain:'फिर सुनो',skipBtn:'छोड़ो',voice:'कहानियाँ पढ़कर सुनाओ',scroll:'कहानी का पन्ना +10',storyQ:'सही! +10 अंक।',found:(a,b)=>`मिली कहानियाँ: ${a} / ${b}`});
Object.assign(L.kn,{book:'ಕಥೆ ಪುಸ್ತಕ',bookHint:'📜 ಮನೆಯನ್ನು ದಾಟಿದರೆ ಅಥವಾ ಅಲ್ಲಿ ನಿಂತರೆ ಕಥೆ ತೆರೆಯುತ್ತದೆ.',readAgain:'ಮತ್ತೆ ಕೇಳಿ',skipBtn:'ಬಿಟ್ಟುಬಿಡಿ',voice:'ಕಥೆಗಳನ್ನು ಓದಿ ಹೇಳಿ',scroll:'ಕಥೆಯ ಪುಟ +10',storyQ:'ಸರಿ! +10 ಅಂಕ.',found:(a,b)=>`ಸಿಕ್ಕ ಕಥೆಗಳು: ${a} / ${b}`});
L.en.sqDesc.y='Pass it for a glimpse; land on it for the full scene and +10';L.hi.sqDesc.y='गुज़रने पर झलक; रुकने पर पूरी कहानी और +10';L.kn.sqDesc.y='ದಾಟಿದರೆ ಒಂದು ನೋಟ; ನಿಂತರೆ ಪೂರ್ತಿ ಕಥೆ, +10';

export const VIRTUES=[{en:"Kevat's kindness",hi:'केवट की सेवा',kn:'ಕೇವಟನ ಸೇವೆ'},{en:"Bharat's loyalty",hi:'भरत की निष्ठा',kn:'ಭರತನ ನಿಷ್ಠೆ'},{en:"Shabari's devotion",hi:'शबरी की भक्ति',kn:'ಶಬರಿಯ ಭಕ್ತಿ'},
 {en:"Jatayu's courage",hi:'जटायु का साहस',kn:'ಜಟಾಯುವಿನ ಧೈರ್ಯ'},{en:"Hanuman's great leap",hi:'हनुमान की छलाँग',kn:'ಹನುಮಂತನ ನೆಗೆತ'},{en:"Vibhishana's truth",hi:'विभीषण का सत्य',kn:'ವಿಭೀಷಣನ ಸತ್ಯ'},
 {en:"The squirrel's help",hi:'गिलहरी की मदद',kn:'ಅಳಿಲು ಸೇವೆ'},{en:"Lakshman's service",hi:'लक्ष्मण की सेवा',kn:'ಲಕ್ಷ್ಮಣನ ಸೇವೆ'},{en:"Sita's courage",hi:'सीता का धैर्य',kn:'ಸೀತೆಯ ಧೈರ್ಯ'}];
export const TROUBLES=[{en:'Whispers that cause trouble',hi:'कान भरने वाली बातें',kn:'ಕಿವಿ ಊದುವ ಮಾತು'},{en:'Chasing what glitters',hi:'चमक के पीछे भागना',kn:'ಹೊಳಪಿನ ಹಿಂದೆ ಓಟ'},{en:'Anger',hi:'क्रोध',kn:'ಕೋಪ'},
 {en:'Laziness',hi:'आलस्य',kn:'ಸೋಮಾರಿತನ'},{en:'Not listening',hi:'किसी की न सुनना',kn:'ಯಾರ ಮಾತೂ ಕೇಳದಿರುವುದು'},{en:'Pride',hi:'अहंकार',kn:'ಅಹಂಕಾರ'},
 {en:'Breaking a promise',hi:'वचन तोड़ना',kn:'ಮಾತು ತಪ್ಪುವುದು'},{en:'Jealousy',hi:'ईर्ष्या',kn:'ಹೊಟ್ಟೆಕಿಚ್ಚು'},{en:'Greed',hi:'लालच',kn:'ದುರಾಸೆ'}];
