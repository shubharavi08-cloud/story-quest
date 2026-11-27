/* Kitty Party Circle — content (Kannada + English) */
(() => { const KP = window.KP = window.KP || {};
/* Content carried over from version 1 (games, menus, themes, housie calls) */
const KN_NAMES={Shobha:'ಶೋಭಾ',Gowri:'ಗೌರಿ',Chaitra:'ಚೈತ್ರಾ',Vanitha:'ವನಿತಾ',Gayatri:'ಗಾಯತ್ರಿ','Shashi Kala':'ಶಶಿಕಲಾ',Yamuna:'ಯಮುನಾ',Suguna:'ಸುಗುಣಾ',Shubha:'ಶುಭಾ'};
const CAL0=[[2026,9,'Shobha'],[2026,10,'Gowri'],[2026,11,'Chaitra'],[2027,0,'Vanitha'],[2027,1,'Gayatri'],[2027,2,'Shashi Kala'],[2027,3,'Yamuna'],[2027,4,'Suguna'],[2027,5,'Shubha']];
const MINUTE_GAMES=[
{id:'housie',t:'none',en:['Housie Housie','This app','The main game. The host calls, everyone marks. Prizes for Early five, three lines, four corners and Full house.'],kn:['ಹೌಸಿ ಹೌಸಿ','ಈ ಆಪ್','ಮುಖ್ಯ ಆಟ. ಪಾರ್ಟಿ ಕೊಡುವವರು ಸಂಖ್ಯೆ ಕೂಗುತ್ತಾರೆ, ಎಲ್ಲರೂ ಗುರುತಿಸುತ್ತಾರೆ. ಮೊದಲ ಐದು, ಮೂರು ಸಾಲು, ನಾಲ್ಕು ಮೂಲೆ, ಫುಲ್ ಹೌಸ್‌ಗೆ ಬಹುಮಾನ.']},
{id:'bindi',t:'props',en:['Bindi on the mirror','Bindis, a mirror, a scarf','Blindfolded, stick a bindi in the middle of your forehead on your mirror reflection. Closest to the centre wins.'],kn:['ಕನ್ನಡಿಯಲ್ಲಿ ಬಿಂದಿ','ಬಿಂದಿ, ಕನ್ನಡಿ, ಕಣ್ಣಿಗೆ ಕಟ್ಟಲು ದುಪಟ್ಟಾ','ಕಣ್ಣು ಕಟ್ಟಿಕೊಂಡು, ಕನ್ನಡಿಯಲ್ಲಿ ಕಾಣುವ ನಿಮ್ಮ ಹಣೆಯ ನಡುವೆ ಬಿಂದಿ ಅಂಟಿಸಿ. ಸರಿಯಾಗಿ ನಡುವೆ ಇಟ್ಟವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'pleat',t:'props',en:['Saree pleat race','A saree or dupatta','Make as many neat pleats as you can in one minute. Most even pleats wins.'],kn:['ಸೀರೆ ನೆರಿಗೆ ಸ್ಪರ್ಧೆ','ಒಂದು ಸೀರೆ ಅಥವಾ ದುಪಟ್ಟಾ','ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಎಷ್ಟು ಅಚ್ಚುಕಟ್ಟಾದ ನೆರಿಗೆ ಮಾಡಬಲ್ಲಿರಿ? ಸಮನಾದ ನೆರಿಗೆ ಹೆಚ್ಚು ಮಾಡಿದವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'rajma',t:'props',en:['Bean transfer','Rajma or peanuts, 2 bowls, a spoon','Move beans one by one with a spoon held in your mouth. Most beans in a minute wins.'],kn:['ಕಾಳು ಸಾಗಿಸಿ','ರಾಜ್ಮಾ ಅಥವಾ ಕಡಲೆಬೀಜ, ಎರಡು ಬಟ್ಟಲು, ಒಂದು ಚಮಚ','ಬಾಯಲ್ಲಿ ಚಮಚ ಹಿಡಿದು ಒಂದೊಂದೇ ಕಾಳನ್ನು ಇನ್ನೊಂದು ಬಟ್ಟಲಿಗೆ ಹಾಕಿ. ಹೆಚ್ಚು ಕಾಳು ಸಾಗಿಸಿದವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'cups',t:'props',en:['Cup tower','20–30 paper cups','Build the tallest cup tower in a minute. It must stand for 3 seconds.'],kn:['ಲೋಟದ ಗೋಪುರ','20–30 ಕಾಗದದ ಲೋಟ','ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಎತ್ತರದ ಲೋಟದ ಗೋಪುರ ಕಟ್ಟಿ. ಅದು ಮೂರು ಸೆಕೆಂಡು ನಿಲ್ಲಬೇಕು.']},
{id:'hum',t:'none',en:['Hum the song','Nothing','One lady hums a film song, the others guess. Most correct guesses in a minute wins.'],kn:['ಹಾಡು ಗುನುಗಿ','ಏನೂ ಬೇಡ','ಒಬ್ಬರು ಸಿನಿಮಾ ಹಾಡನ್ನು ಗುನುಗುತ್ತಾರೆ, ಉಳಿದವರು ಊಹಿಸುತ್ತಾರೆ. ಹೆಚ್ಚು ಸರಿ ಉತ್ತರ ಕೊಟ್ಟವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'name10',t:'none',en:['Name 10','Nothing','The host gives a topic — sweets, rivers, heroines, vegetables. Name as many as you can in a minute without repeating.'],kn:['ಹತ್ತು ಹೆಸರು ಹೇಳಿ','ಏನೂ ಬೇಡ','ಪಾರ್ಟಿ ಕೊಡುವವರು ಒಂದು ವಿಷಯ ಕೊಡುತ್ತಾರೆ — ಸಿಹಿ ತಿಂಡಿ, ನದಿಗಳು, ನಾಯಕಿಯರು, ತರಕಾರಿ. ಒಂದು ನಿಮಿಷದಲ್ಲಿ, ಮತ್ತೆ ಹೇಳದೆ, ಎಷ್ಟು ಸಾಧ್ಯವೋ ಅಷ್ಟು ಹೆಸರು ಹೇಳಿ.']},
{id:'balloon',t:'props',en:['Balloon between knees','Balloons, 2 chairs','Walk to the chair and back with a balloon between your knees. Drop it and you start again.'],kn:['ಮೊಣಕಾಲಿನ ನಡುವೆ ಬಲೂನ್','ಬಲೂನ್, ಎರಡು ಕುರ್ಚಿ','ಮೊಣಕಾಲಿನ ನಡುವೆ ಬಲೂನ್ ಇಟ್ಟು ಕುರ್ಚಿವರೆಗೆ ಹೋಗಿ ಬನ್ನಿ. ಬಿದ್ದರೆ ಮತ್ತೆ ಮೊದಲಿನಿಂದ.']},
{id:'bangle',t:'props',en:['Bangle toss','Bangles, a bottle','Throw bangles over a standing bottle from a distance. Most rings in a minute wins.'],kn:['ಬಳೆ ಎಸೆತ','ಬಳೆಗಳು, ಒಂದು ಬಾಟಲಿ','ದೂರದಿಂದ ನಿಂತಿರುವ ಬಾಟಲಿಗೆ ಬಳೆ ಎಸೆಯಿರಿ. ಹೆಚ್ಚು ಬಳೆ ಸಿಕ್ಕಿಸಿದವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'draw',t:'props',en:['Draw blindfolded','Paper, pen, a scarf','Draw the host\'s face (or a peacock) with eyes closed. Everyone votes for the funniest.'],kn:['ಕಣ್ಣು ಮುಚ್ಚಿ ಚಿತ್ರ','ಕಾಗದ, ಪೆನ್, ದುಪಟ್ಟಾ','ಕಣ್ಣು ಮುಚ್ಚಿ ಪಾರ್ಟಿ ಕೊಡುವವರ ಮುಖ (ಅಥವಾ ನವಿಲು) ಬಿಡಿಸಿ. ಹೆಚ್ಚು ನಗಿಸಿದ ಚಿತ್ರಕ್ಕೆ ಎಲ್ಲರ ಮತ.']},
{id:'lemon',t:'props',en:['Lemon and spoon','Spoons, lemons','Walk a set path with a lemon on a spoon held in your mouth. Fastest without dropping wins.'],kn:['ನಿಂಬೆ-ಚಮಚ ಓಟ','ಚಮಚ, ನಿಂಬೆಹಣ್ಣು','ಬಾಯಲ್ಲಿ ಚಮಚ, ಅದರ ಮೇಲೆ ನಿಂಬೆಹಣ್ಣು ಇಟ್ಟು ನಡೆಯಿರಿ. ಬೀಳಿಸದೆ ಬೇಗ ಮುಗಿಸಿದವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'who',t:'none',en:['Who said it?','Paper slips','Everyone writes a funny thing her husband or child says. The host reads, others guess who wrote it.'],kn:['ಯಾರು ಹೇಳಿದ್ದು?','ಚೀಟಿಗಳು','ಮನೆಯಲ್ಲಿ ಗಂಡ ಅಥವಾ ಮಕ್ಕಳು ಹೇಳುವ ತಮಾಷೆಯ ಮಾತನ್ನು ಎಲ್ಲರೂ ಬರೆಯಿರಿ. ಪಾರ್ಟಿ ಕೊಡುವವರು ಓದುತ್ತಾರೆ, ಉಳಿದವರು ಯಾರದು ಎಂದು ಊಹಿಸುತ್ತಾರೆ.']},
{id:'quiz',t:'none',en:['Kitchen quiz','Nothing','Quick questions: a spice in garam masala, a sweet made with jaggery, a dal without tadka. Most right answers in a minute wins.'],kn:['ಅಡುಗೆಮನೆ ರಸಪ್ರಶ್ನೆ','ಏನೂ ಬೇಡ','ಬೇಗ ಬೇಗ ಪ್ರಶ್ನೆಗಳು: ಗರಂ ಮಸಾಲೆಯಲ್ಲಿರುವ ಒಂದು ಮಸಾಲೆ, ಬೆಲ್ಲದ ಒಂದು ಸಿಹಿ, ಒಗ್ಗರಣೆ ಇಲ್ಲದ ಒಂದು ಸಾರು. ಹೆಚ್ಚು ಸರಿ ಉತ್ತರಕ್ಕೆ ಬಹುಮಾನ.']},
{id:'paper',t:'props',en:['Paper dance','Newspaper, music','Pairs dance on a sheet of newspaper. Each round it is folded in half. The last pair standing wins.'],kn:['ಪತ್ರಿಕೆ ಮೇಲೆ ಕುಣಿತ','ದಿನಪತ್ರಿಕೆ, ಹಾಡು','ಜೋಡಿಗಳು ಪತ್ರಿಕೆಯ ಮೇಲೆ ಕುಣಿಯುತ್ತಾರೆ. ಪ್ರತಿ ಸುತ್ತಿನಲ್ಲಿ ಪತ್ರಿಕೆಯನ್ನು ಅರ್ಧ ಮಡಚಲಾಗುತ್ತದೆ. ಕೊನೆಯವರೆಗೆ ನಿಂತ ಜೋಡಿ ಗೆಲ್ಲುತ್ತದೆ.']},
{id:'biscuit',t:'props',en:['Biscuit face','Marie biscuits','Put a biscuit on your forehead and move it to your mouth using only your face. No hands!'],kn:['ಹಣೆಯಿಂದ ಬಾಯಿಗೆ ಬಿಸ್ಕತ್','ಮಾರಿ ಬಿಸ್ಕತ್','ಹಣೆಯ ಮೇಲೆ ಬಿಸ್ಕತ್ ಇಟ್ಟು, ಕೈ ಮುಟ್ಟದೆ ಮುಖ ಆಡಿಸಿ ಅದನ್ನು ಬಾಯಿಗೆ ತನ್ನಿ.']},
{id:'beads',t:'none',en:['Count the beads','A jar of beads or beans','Everyone guesses how many beads are in the jar. The closest guess wins.'],kn:['ಮಣಿ ಎಣಿಸಿ','ಮಣಿ ಅಥವಾ ಕಾಳು ತುಂಬಿದ ಡಬ್ಬಿ','ಡಬ್ಬಿಯಲ್ಲಿ ಎಷ್ಟು ಮಣಿ ಇದೆ ಎಂದು ಎಲ್ಲರೂ ಊಹಿಸಿ. ಹತ್ತಿರದ ಉತ್ತರ ಹೇಳಿದವರು ಗೆಲ್ಲುತ್ತಾರೆ.']},
{id:'charades',t:'none',en:['Dumb charades','Nothing','Act out a film name without speaking. Your team has one minute to guess.'],kn:['ಮೂಕಾಭಿನಯ','ಏನೂ ಬೇಡ','ಮಾತಾಡದೆ ಸಿನಿಮಾ ಹೆಸರನ್ನು ಅಭಿನಯಿಸಿ. ನಿಮ್ಮ ತಂಡ ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಊಹಿಸಬೇಕು.']},
{id:'rangoli',t:'props',en:['One-minute rangoli','Rangoli powder or flowers, a plate','Make a small rangoli on a plate in one minute. Everyone votes for the best.'],kn:['ಒಂದು ನಿಮಿಷದ ರಂಗೋಲಿ','ರಂಗೋಲಿ ಪುಡಿ ಅಥವಾ ಹೂವು, ಒಂದು ತಟ್ಟೆ','ತಟ್ಟೆಯಲ್ಲಿ ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಪುಟ್ಟ ರಂಗೋಲಿ ಹಾಕಿ. ಎಲ್ಲರ ಮತದಿಂದ ಗೆಲುವು.']}];
const MENU=[
{en:'Welcome drinks',kn:'ಸ್ವಾಗತ ಪಾನೀಯ',i:{en:['Masala buttermilk','Panakam','Rose milk','Kokum sherbet','Lemon mint cooler','Filter coffee','Masala chai','Raw mango panna'],kn:['ಮಸಾಲೆ ಮಜ್ಜಿಗೆ','ಪಾನಕ','ರೋಸ್ ಮಿಲ್ಕ್','ಪುನರ್ಪುಳಿ ಶರಬತ್ತು','ನಿಂಬೆ-ಪುದೀನ ಶರಬತ್ತು','ಫಿಲ್ಟರ್ ಕಾಫಿ','ಮಸಾಲೆ ಚಹಾ','ಮಾವಿನಕಾಯಿ ಪಾನಕ']}},
{en:'Starters',kn:'ಆರಂಭದ ತಿಂಡಿ',i:{en:['Paneer tikka (tawa)','Corn cheese balls','Hara bhara kebab','Mini idli fry','Baby corn pepper fry','Veg cutlet','Onion pakoda','Paneer 65'],kn:['ಪನೀರ್ ಟಿಕ್ಕಾ (ತವಾ)','ಜೋಳ-ಚೀಸ್ ಉಂಡೆ','ಹರಾ ಭರಾ ಕಬಾಬ್','ಮಿನಿ ಇಡ್ಲಿ ಫ್ರೈ','ಬೇಬಿ ಕಾರ್ನ್ ಪೆಪ್ಪರ್ ಫ್ರೈ','ತರಕಾರಿ ಕಟ್ಲೆಟ್','ಈರುಳ್ಳಿ ಪಕೋಡ','ಪನೀರ್ 65']}},
{en:'Chaat',kn:'ಚಾಟ್',i:{en:['Pani puri','Sev puri','Dahi puri','Bhel puri','Masala corn cups','Sprouts chaat','Aloo tikki chaat','Ragda pattice'],kn:['ಪಾನಿ ಪುರಿ','ಸೇವ್ ಪುರಿ','ದಹಿ ಪುರಿ','ಭೇಲ್ ಪುರಿ','ಮಸಾಲೆ ಜೋಳ','ಮೊಳಕೆ ಕಾಳು ಚಾಟ್','ಆಲೂ ಟಿಕ್ಕಿ ಚಾಟ್','ರಗಡಾ ಪ್ಯಾಟಿಸ್']}},
{en:'Mains',kn:'ಮುಖ್ಯ ಊಟ',i:{en:['Paneer butter masala + phulka','Chole + puri','Veg pulao + raita','Bisi bele bath','Vangi bath','Pav bhaji','Dal tadka + jeera rice','Veg biryani'],kn:['ಪನೀರ್ ಬಟರ್ ಮಸಾಲಾ + ಚಪಾತಿ','ಚನಾ ಮಸಾಲೆ + ಪೂರಿ','ತರಕಾರಿ ಪುಲಾವ್ + ರಾಯತ','ಬಿಸಿಬೇಳೆ ಬಾತ್','ವಾಂಗಿ ಬಾತ್','ಪಾವ್ ಭಾಜಿ','ದಾಲ್ + ಜೀರಿಗೆ ಅನ್ನ','ತರಕಾರಿ ಬಿರಿಯಾನಿ']}},
{en:'Easy, no-cook',kn:'ಅಡುಗೆ ಬೇಡದ್ದು',i:{en:['Fruit chaat','Cucumber sandwiches','Curd rice cups','Khakhra platter','Nachos with salsa','Dates and dry fruit plate','Kosambari','Cheese chilli toast'],kn:['ಹಣ್ಣಿನ ಚಾಟ್','ಸೌತೆಕಾಯಿ ಸ್ಯಾಂಡ್‌ವಿಚ್','ಮೊಸರನ್ನದ ಬಟ್ಟಲು','ಖಾಕ್ರಾ ತಟ್ಟೆ','ನಾಚೋಸ್ ಮತ್ತು ಸಾಲ್ಸಾ','ಖರ್ಜೂರ-ಒಣಹಣ್ಣು ತಟ್ಟೆ','ಕೋಸಂಬರಿ','ಚೀಸ್ ಚಿಲ್ಲಿ ಟೋಸ್ಟ್']}},
{en:'Sweets',kn:'ಸಿಹಿ',i:{en:['Gulab jamun','Rasmalai','Kesari bath','Shrikhand','Payasam','Carrot halwa','Mysore pak (bought)','Ice cream with hot jamun'],kn:['ಜಾಮೂನು','ರಸಮಲಾಯಿ','ಕೇಸರಿ ಬಾತ್','ಶ್ರೀಖಂಡ','ಪಾಯಸ','ಕ್ಯಾರೆಟ್ ಹಲ್ವ','ಮೈಸೂರು ಪಾಕ್ (ಅಂಗಡಿಯದು)','ಬಿಸಿ ಜಾಮೂನು ಜೊತೆ ಐಸ್‌ಕ್ರೀಮ್']}}];
const PRESETS=[
{en:['South Indian brunch','Drink: Filter coffee\nStarter: Mini idli fry\nMain: Bisi bele bath + curd rice\nSide: Kosambari, papad\nSweet: Kesari bath'],kn:['ದಕ್ಷಿಣದ ತಿಂಡಿ ಕೂಟ','ಪಾನೀಯ: ಫಿಲ್ಟರ್ ಕಾಫಿ\nತಿಂಡಿ: ಮಿನಿ ಇಡ್ಲಿ ಫ್ರೈ\nಊಟ: ಬಿಸಿಬೇಳೆ ಬಾತ್ + ಮೊಸರನ್ನ\nಜೊತೆಗೆ: ಕೋಸಂಬರಿ, ಹಪ್ಪಳ\nಸಿಹಿ: ಕೇಸರಿ ಬಾತ್']},
{en:['Chaat party','Drink: Masala buttermilk\nChaat counter: Pani puri, sev puri, dahi puri\nMain: Pav bhaji\nSweet: Kulfi'],kn:['ಚಾಟ್ ಪಾರ್ಟಿ','ಪಾನೀಯ: ಮಸಾಲೆ ಮಜ್ಜಿಗೆ\nಚಾಟ್: ಪಾನಿ ಪುರಿ, ಸೇವ್ ಪುರಿ, ದಹಿ ಪುರಿ\nಊಟ: ಪಾವ್ ಭಾಜಿ\nಸಿಹಿ: ಕುಲ್ಫಿ']},
{en:['Rainy-day tea party','Drink: Masala chai\nSnacks: Onion pakoda, corn cheese balls, veg cutlet\nLight bite: Cheese chilli toast\nSweet: Gulab jamun'],kn:['ಮಳೆಗಾಲದ ಚಹಾ ಕೂಟ','ಪಾನೀಯ: ಮಸಾಲೆ ಚಹಾ\nತಿಂಡಿ: ಈರುಳ್ಳಿ ಪಕೋಡ, ಜೋಳ-ಚೀಸ್ ಉಂಡೆ, ತರಕಾರಿ ಕಟ್ಲೆಟ್\nಹಗುರ: ಚೀಸ್ ಚಿಲ್ಲಿ ಟೋಸ್ಟ್\nಸಿಹಿ: ಜಾಮೂನು']},
{en:['North Indian meal','Drink: Lemon mint cooler\nStarter: Hara bhara kebab\nMain: Paneer butter masala, dal, jeera rice, phulka\nSweet: Rasmalai'],kn:['ಉತ್ತರದ ಊಟ','ಪಾನೀಯ: ನಿಂಬೆ-ಪುದೀನ ಶರಬತ್ತು\nತಿಂಡಿ: ಹರಾ ಭರಾ ಕಬಾಬ್\nಊಟ: ಪನೀರ್ ಬಟರ್ ಮಸಾಲಾ, ದಾಲ್, ಜೀರಿಗೆ ಅನ್ನ, ಚಪಾತಿ\nಸಿಹಿ: ರಸಮಲಾಯಿ']},
{en:['Light and healthy','Drink: Kokum sherbet\nStarter: Sprouts chaat\nMain: Millet pulao + cucumber raita\nSide: Kosambari\nSweet: Dates and dry fruit plate'],kn:['ಹಗುರ, ಆರೋಗ್ಯಕರ ಊಟ','ಪಾನೀಯ: ಪುನರ್ಪುಳಿ ಶರಬತ್ತು\nತಿಂಡಿ: ಮೊಳಕೆ ಕಾಳು ಚಾಟ್\nಊಟ: ಸಿರಿಧಾನ್ಯ ಪುಲಾವ್ + ಸೌತೆಕಾಯಿ ರಾಯತ\nಜೊತೆಗೆ: ಕೋಸಂಬರಿ\nಸಿಹಿ: ಖರ್ಜೂರ-ಒಣಹಣ್ಣು ತಟ್ಟೆ']},
{en:['No-stress host','Drink: Rose milk\nNo-cook: Khakhra, fruit chaat, cucumber sandwiches\nMain: Curd rice cups\nSweet: Ice cream'],kn:['ಕಡಿಮೆ ಕೆಲಸದ ಊಟ','ಪಾನೀಯ: ರೋಸ್ ಮಿಲ್ಕ್\nಅಡುಗೆ ಬೇಡದ್ದು: ಖಾಕ್ರಾ, ಹಣ್ಣಿನ ಚಾಟ್, ಸೌತೆಕಾಯಿ ಸ್ಯಾಂಡ್‌ವಿಚ್\nಊಟ: ಮೊಸರನ್ನದ ಬಟ್ಟಲು\nಸಿಹಿ: ಐಸ್‌ಕ್ರೀಮ್']}];
const THEMES_OLD=[
{en:['Colour of the month','Everyone wears one colour the host picks. The best-dressed gets a small prize.'],kn:['ತಿಂಗಳ ಬಣ್ಣ','ಪಾರ್ಟಿ ಕೊಡುವವರು ಆರಿಸಿದ ಒಂದೇ ಬಣ್ಣದ ಉಡುಗೆಯಲ್ಲಿ ಎಲ್ಲರೂ ಬನ್ನಿ. ಚೆನ್ನಾಗಿ ಸಿಂಗರಿಸಿಕೊಂಡವರಿಗೆ ಪುಟ್ಟ ಬಹುಮಾನ.']},
{en:['Old film heroine day','Dress like your favourite heroine from the 70s–90s and say one of her famous lines.'],kn:['ಹಳೆಯ ಸಿನಿಮಾ ನಾಯಕಿ','70–90ರ ದಶಕದ ನಿಮ್ಮ ಮೆಚ್ಚಿನ ನಾಯಕಿಯಂತೆ ಸಿಂಗರಿಸಿಕೊಂಡು ಬಂದು ಅವರ ಒಂದು ಪ್ರಸಿದ್ಧ ಮಾತು ಹೇಳಿ.']},
{en:['Cooking contest','Each lady brings one dish in a covered box. Everyone tastes and votes.'],kn:['ಅಡುಗೆ ಸ್ಪರ್ಧೆ','ಪ್ರತಿಯೊಬ್ಬರೂ ಒಂದು ತಿನಿಸನ್ನು ಮುಚ್ಚಿದ ಡಬ್ಬಿಯಲ್ಲಿ ತರುತ್ತಾರೆ. ಎಲ್ಲರೂ ರುಚಿ ನೋಡಿ ಮತ ಹಾಕುತ್ತಾರೆ.']},
{en:['Saree swap','Bring a saree or dupatta you no longer wear. Draw lots and take one home.'],kn:['ಸೀರೆ ಬದಲಾವಣೆ','ನೀವು ಈಗ ಉಡದ ಸೀರೆ ಅಥವಾ ದುಪಟ್ಟಾ ತನ್ನಿ. ಚೀಟಿ ಎತ್ತಿ ಒಂದನ್ನು ಮನೆಗೆ ಕೊಂಡೊಯ್ಯಿರಿ.']},
{en:['Plant and seed swap','Bring a cutting, a sapling or seeds from your balcony garden to swap.'],kn:['ಗಿಡ-ಬೀಜ ಬದಲಾವಣೆ','ನಿಮ್ಮ ಮನೆಯ ಕೈತೋಟದ ಸಸಿ, ಕೊಂಬೆ ಅಥವಾ ಬೀಜ ತಂದು ಬದಲಾಯಿಸಿಕೊಳ್ಳಿ.']},
{en:['Family recipe cards','Each lady brings one family recipe on a card. The host makes a little booklet later.'],kn:['ಮನೆಯ ಅಡುಗೆ ಚೀಟಿ','ಪ್ರತಿಯೊಬ್ಬರೂ ಮನೆಯ ಒಂದು ವಿಶೇಷ ಅಡುಗೆಯ ವಿಧಾನ ಬರೆದು ತನ್ನಿ. ನಂತರ ಪಾರ್ಟಿ ಕೊಡುವವರು ಪುಟ್ಟ ಪುಸ್ತಕ ಮಾಡುತ್ತಾರೆ.']},
{en:['Five-minute talent','One lady each month shows a skill — a song, mehendi, a quick craft, a yoga stretch.'],kn:['ಐದು ನಿಮಿಷದ ಪ್ರತಿಭೆ','ಪ್ರತಿ ತಿಂಗಳು ಒಬ್ಬರು ತಮ್ಮ ಕಲೆ ತೋರಿಸಲಿ — ಹಾಡು, ಮೆಹೆಂದಿ, ಕರಕುಶಲ, ಯೋಗ.']},
{en:['Secret sister','Draw names; bring a small gift (under ₹200) for your secret sister next month.'],kn:['ಗುಟ್ಟಿನ ಸಖಿ','ಚೀಟಿಯಲ್ಲಿ ಹೆಸರು ಎತ್ತಿ; ಮುಂದಿನ ತಿಂಗಳು ನಿಮ್ಮ ಗುಟ್ಟಿನ ಸಖಿಗೆ ₹200 ಒಳಗಿನ ಪುಟ್ಟ ಉಡುಗೊರೆ ತನ್ನಿ.']},
{en:['Morning wellness kitty','Meet at 7 am in a park: 20 minutes of yoga, then breakfast together.'],kn:['ಬೆಳಗಿನ ಆರೋಗ್ಯ ಕಿಟ್ಟಿ','ಬೆಳಿಗ್ಗೆ 7ಕ್ಕೆ ಉದ್ಯಾನದಲ್ಲಿ ಸೇರಿ: 20 ನಿಮಿಷ ಯೋಗ, ನಂತರ ಒಟ್ಟಿಗೆ ತಿಂಡಿ.']},
{en:['Antakshari','Two teams, songs on the phone. The losing team serves the dessert.'],kn:['ಅಂತ್ಯಾಕ್ಷರಿ','ಎರಡು ತಂಡ, ಫೋನಿನಲ್ಲಿ ಹಾಡು. ಸೋತ ತಂಡ ಸಿಹಿ ಬಡಿಸುತ್ತದೆ.']},
{en:['Old photos','Everyone brings a wedding or school photo. Guess who is who.'],kn:['ಹಳೆಯ ಫೋಟೋ','ಎಲ್ಲರೂ ಮದುವೆಯ ಅಥವಾ ಶಾಲೆಯ ಫೋಟೋ ತನ್ನಿ. ಯಾರು ಯಾರು ಎಂದು ಊಹಿಸಿ.']},
{en:['Give-back kitty','Everyone puts ₹100 in a jar for a cause the group picks — a school, a cow shelter, a neighbour.'],kn:['ಸಹಾಯದ ಕಿಟ್ಟಿ','ಎಲ್ಲರೂ ₹100 ಡಬ್ಬಿಗೆ ಹಾಕಿ, ಬಳಗ ಆರಿಸಿದ ಒಳ್ಳೆಯ ಕೆಲಸಕ್ಕೆ ಕೊಡಿ — ಶಾಲೆ, ಗೋಶಾಲೆ, ನೆರೆಹೊರೆಯವರು.']},
{en:['Mystery venue','The host keeps the place secret — a café, a terrace, a farmhouse — and shares the location on the day.'],kn:['ಗುಟ್ಟಿನ ಜಾಗ','ಪಾರ್ಟಿ ಎಲ್ಲಿ ಎಂದು ಪಾರ್ಟಿ ಕೊಡುವವರು ಗುಟ್ಟಾಗಿಡುತ್ತಾರೆ — ಕೆಫೆ, ತಾರಸಿ, ತೋಟದ ಮನೆ — ಅದೇ ದಿನ ಸ್ಥಳ ಕಳುಹಿಸುತ್ತಾರೆ.']},
{en:['Festival special','Match the month: Deepavali lamps, Sankranti ellu-bella, Ugadi bevu-bella, Holi colours.'],kn:['ಹಬ್ಬದ ವಿಶೇಷ','ತಿಂಗಳಿಗೆ ತಕ್ಕಂತೆ: ದೀಪಾವಳಿ ದೀಪ, ಸಂಕ್ರಾಂತಿ ಎಳ್ಳು-ಬೆಲ್ಲ, ಯುಗಾದಿ ಬೇವು-ಬೆಲ್ಲ, ಹೋಳಿ ಬಣ್ಣ.']}];
const CALLS_EN={1:"Kelly's eye",2:'One little duck',3:'Cup of tea',4:'Knock at the door',5:'Man alive',6:'Half a dozen',7:'Lucky seven',8:'One fat lady',9:"Doctor's time",10:"Uncle's den",11:'Legs eleven',12:'One dozen',13:'Unlucky for some',16:'Sweet sixteen',18:'Voting age',21:'Key of the door',22:'Two little ducks',25:'Silver jubilee',26:'Republic Day',45:'Halfway there',50:'Half a century',66:'Clickety click',75:'Diamond jubilee',77:'Two little crutches',88:'Two fat ladies',89:'Nearly there',90:'Top of the house'};
const CALLS_KN={7:'ಅದೃಷ್ಟದ ಏಳು',11:'ಎರಡು ಕೋಲು',15:'ಸ್ವಾತಂತ್ರ್ಯ ದಿನ',22:'ಎರಡು ಬಾತುಕೋಳಿ',25:'ಬೆಳ್ಳಿ ಹಬ್ಬ',26:'ಗಣರಾಜ್ಯೋತ್ಸವ',33:'ಎಲ್ಲಾ ಮೂರು',44:'ಎಲ್ಲಾ ನಾಲ್ಕು',50:'ಅರ್ಧ ಶತಕ',55:'ಎಲ್ಲಾ ಐದು',66:'ಎಲ್ಲಾ ಆರು',75:'ವಜ್ರ ಮಹೋತ್ಸವ',77:'ಎಲ್ಲಾ ಏಳು',88:'ಎಲ್ಲಾ ಎಂಟು',90:'ಕೊನೆಯ ಸಂಖ್ಯೆ'};
const KU=['ಸೊನ್ನೆ','ಒಂದು','ಎರಡು','ಮೂರು','ನಾಲ್ಕು','ಐದು','ಆರು','ಏಳು','ಎಂಟು','ಒಂಬತ್ತು'];
const KTEEN=['ಹತ್ತು','ಹನ್ನೊಂದು','ಹನ್ನೆರಡು','ಹದಿಮೂರು','ಹದಿನಾಲ್ಕು','ಹದಿನೈದು','ಹದಿನಾರು','ಹದಿನೇಳು','ಹದಿನೆಂಟು','ಹತ್ತೊಂಬತ್ತು'];
const KT=['','','ಇಪ್ಪತ್ತು','ಮೂವತ್ತು','ನಲವತ್ತು','ಐವತ್ತು','ಅರವತ್ತು','ಎಪ್ಪತ್ತು','ಎಂಬತ್ತು','ತೊಂಬತ್ತು'];
const KSTEM=['','','ಇಪ್ಪತ್','ಮೂವತ್','ನಲವತ್','ಐವತ್','ಅರವತ್','ಎಪ್ಪತ್','ಎಂಬತ್'];
const KSUF=['','ತೊಂದು','ತೆರಡು','ಮೂರು','ನಾಲ್ಕು','ತೈದು','ತಾರು','ತೇಳು','ತೆಂಟು','ತೊಂಬತ್ತು'];
const knNum=n=>n<10?KU[n]:n<20?KTEEN[n-10]:n%10===0?KT[n/10]:KSTEM[Math.floor(n/10)]+KSUF[n%10];
/* ---------- Festivals 2027 (dates checked Nov 2026: drikpanchang / officeholidays) ---------- */
const FESTIVALS=[
{d:'2027-01-01',id:'newyear',en:'New Year',kn:'ಹೊಸ ವರ್ಷ',
 idea:{en:'Start the year with a "resolution jar": everyone writes one wish, read them out at the June kitty.',kn:'"ಆಸೆಗಳ ಡಬ್ಬಿ": ಎಲ್ಲರೂ ಒಂದು ಆಸೆ ಬರೆದು ಹಾಕಿ, ಜೂನ್ ಕಿಟ್ಟಿಯಲ್ಲಿ ಓದೋಣ.'},
 wish:{en:'Happy New Year to our lovely kitty circle! May 2027 bring health, laughter and many happy parties together.',kn:'ನಮ್ಮ ಗೆಳತಿಯರ ಬಳಗಕ್ಕೆ ಹೊಸ ವರ್ಷದ ಶುಭಾಶಯಗಳು! 2027 ಆರೋಗ್ಯ, ನಗು ಮತ್ತು ಸಂತೋಷದ ಪಾರ್ಟಿಗಳನ್ನು ತರಲಿ.'}},
{d:'2027-01-15',id:'sankranti',en:'Makara Sankranti',kn:'ಮಕರ ಸಂಕ್ರಾಂತಿ',
 idea:{en:'Ellu-bella exchange, sugarcane and a kite-colour dress code. Play "guess the harvest" with grains in jars.',kn:'ಎಳ್ಳು-ಬೆಲ್ಲ ಬೀರುವುದು, ಕಬ್ಬು, ಗಾಳಿಪಟದ ಬಣ್ಣದ ಉಡುಗೆ. ಡಬ್ಬಿಯಲ್ಲಿನ ಧಾನ್ಯ ಗುರುತಿಸುವ ಆಟ.'},
 wish:{en:'Wishing you a sweet Sankranti! Ellu-bella tindu olle maathadi.',kn:'ಸಂಕ್ರಾಂತಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು! ಎಳ್ಳು-ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆ ಮಾತಾಡಿ.'}},
{d:'2027-03-08',id:'womensday',en:"Women's Day",kn:'ಮಹಿಳಾ ದಿನ',
 idea:{en:'Honour one member each for her strength — a small certificate and flowers. Share one life lesson each.',kn:'ಪ್ರತಿಯೊಬ್ಬರ ಶಕ್ತಿಗೆ ಗೌರವ — ಪುಟ್ಟ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಹೂವು. ಎಲ್ಲರೂ ಒಂದು ಜೀವನ ಪಾಠ ಹಂಚಿಕೊಳ್ಳಿ.'},
 wish:{en:"Happy Women's Day to the strongest, kindest women I know — our kitty circle!",kn:'ನನಗೆ ಗೊತ್ತಿರುವ ಅತ್ಯಂತ ಗಟ್ಟಿ, ಅತ್ಯಂತ ಒಳ್ಳೆಯ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ — ನಮ್ಮ ಬಳಗಕ್ಕೆ — ಮಹಿಳಾ ದಿನದ ಶುಭಾಶಯಗಳು!'}},
{d:'2027-04-07',id:'ugadi',en:'Ugadi',kn:'ಯುಗಾದಿ',
 idea:{en:'Bevu-bella welcome, obbattu on the menu, mango-leaf toran. Ask each lady for one sweet and one bitter memory of the year.',kn:'ಬೇವು-ಬೆಲ್ಲದ ಸ್ವಾಗತ, ಊಟದಲ್ಲಿ ಒಬ್ಬಟ್ಟು, ಮಾವಿನ ತೋರಣ. ಈ ವರ್ಷದ ಒಂದು ಸಿಹಿ, ಒಂದು ಕಹಿ ನೆನಪು ಹಂಚಿಕೊಳ್ಳಿ.'},
 wish:{en:'Happy Ugadi! May the new year bring you more sweet than bitter.',kn:'ಯುಗಾದಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು! ಹೊಸ ವರ್ಷದಲ್ಲಿ ಬೇವಿಗಿಂತ ಬೆಲ್ಲ ಹೆಚ್ಚಿರಲಿ.'}},
{d:'2027-10-10',id:'dasara',en:'Dasara (Vijayadashami)',kn:'ದಸರಾ (ವಿಜಯದಶಮಿ)',
 idea:{en:'Gombe (doll) display theme — each lady brings one doll and tells its story. Silk-saree dress code.',kn:'ಗೊಂಬೆ ಹಬ್ಬದ ವಿಷಯ — ಪ್ರತಿಯೊಬ್ಬರೂ ಒಂದು ಗೊಂಬೆ ತಂದು ಅದರ ಕಥೆ ಹೇಳಿ. ರೇಷ್ಮೆ ಸೀರೆ ಉಡುಗೆ.'},
 wish:{en:'Happy Dasara! May Chamundeshwari bless you and your family with victory and joy.',kn:'ನಾಡಹಬ್ಬ ದಸರಾ ಶುಭಾಶಯಗಳು! ಚಾಮುಂಡೇಶ್ವರಿ ನಿಮಗೂ ನಿಮ್ಮ ಮನೆಯವರಿಗೂ ಜಯ, ಸಂತೋಷ ಕೊಡಲಿ.'}},
{d:'2027-10-29',id:'deepavali',en:'Deepavali',kn:'ದೀಪಾವಳಿ',
 idea:{en:'Diya-painting contest, rangoli at the door, sweets swap — everyone brings one homemade sweet.',kn:'ಹಣತೆ ಬಣ್ಣ ಹಚ್ಚುವ ಸ್ಪರ್ಧೆ, ಬಾಗಿಲಲ್ಲಿ ರಂಗೋಲಿ, ಸಿಹಿ ಬದಲಾವಣೆ — ಎಲ್ಲರೂ ಮನೆಯಲ್ಲಿ ಮಾಡಿದ ಒಂದು ಸಿಹಿ ತನ್ನಿ.'},
 wish:{en:'Happy Deepavali! May the light of the lamps fill your home with happiness.',kn:'ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು! ದೀಪದ ಬೆಳಕು ನಿಮ್ಮ ಮನೆ ತುಂಬಾ ಸಂತೋಷ ತುಂಬಲಿ.'}}];

/* ---------- Games library ---------- */
const GAME_LIST=[
{id:'housie',icon:'ticket',en:['Tambola / Housie','Own card for every lady, caller board, voice, claim check'],kn:['ಹೌಸಿ (ತಂಬೋಲಾ)','ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಟಿಕೆಟ್, ಸಂಖ್ಯೆ ಬೋರ್ಡ್, ಧ್ವನಿ, ಗೆಲುವು ಪರಿಶೀಲನೆ']},
{id:'draw',icon:'gift',en:['Lucky Draw','Pick a name for the kitty money or a prize'],kn:['ಲಕ್ಕಿ ಡ್ರಾ (ಚೀಟಿ ಎತ್ತುವುದು)','ಕಿಟ್ಟಿ ಹಣ ಅಥವಾ ಬಹುಮಾನಕ್ಕೆ ಹೆಸರು ಎತ್ತಿ']},
{id:'wheel',icon:'wheel',en:['Spin the Wheel','Spin for a dare, a prize or a name'],kn:['ಚಕ್ರ ತಿರುಗಿಸಿ','ಸವಾಲು, ಬಹುಮಾನ ಅಥವಾ ಹೆಸರಿಗಾಗಿ ತಿರುಗಿಸಿ']},
{id:'gk',icon:'brain',en:['General Knowledge Quiz','Karnataka, India and everyday questions'],kn:['ಸಾಮಾನ್ಯ ಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ','ಕರ್ನಾಟಕ, ಭಾರತ, ದಿನನಿತ್ಯದ ಪ್ರಶ್ನೆಗಳು']},
{id:'film',icon:'film',en:['Film Quiz','Kannada and Hindi cinema'],kn:['ಸಿನಿಮಾ ರಸಪ್ರಶ್ನೆ','ಕನ್ನಡ ಮತ್ತು ಹಿಂದಿ ಸಿನಿಮಾ']},
{id:'song',icon:'music',en:['Guess the Song','Hum a song on the card topic — others guess'],kn:['ಹಾಡು ಗುರುತಿಸಿ','ಚೀಟಿಯ ವಿಷಯದ ಹಾಡು ಗುನುಗಿ — ಉಳಿದವರು ಊಹಿಸಿ']},
{id:'antakshari',icon:'music',en:['Antakshari','Two teams, a letter, a song — with timer'],kn:['ಅಂತ್ಯಾಕ್ಷರಿ','ಎರಡು ತಂಡ, ಒಂದು ಅಕ್ಷರ, ಒಂದು ಹಾಡು — ಸಮಯದ ಜೊತೆ']},
{id:'memory',icon:'cards',en:['Memory Game','Match the pairs in the fewest moves'],kn:['ನೆನಪಿನ ಆಟ','ಕಡಿಮೆ ಪ್ರಯತ್ನದಲ್ಲಿ ಜೋಡಿ ಹುಡುಕಿ']},
{id:'words',icon:'abc',en:['Word Game','Unjumble the word before time runs out'],kn:['ಪದ ಜೋಡಿಸಿ','ಸಮಯ ಮುಗಿಯುವ ಮೊದಲು ಅಕ್ಷರ ಜೋಡಿಸಿ ಪದ ಮಾಡಿ']},
{id:'pic',icon:'pic',en:['Picture Quiz','Guess the festival or dish from the pictures'],kn:['ಚಿತ್ರ ರಸಪ್ರಶ್ನೆ','ಚಿತ್ರ ನೋಡಿ ಹಬ್ಬ ಅಥವಾ ತಿನಿಸು ಗುರುತಿಸಿ']},
{id:'rapid',icon:'bolt',en:['Rapid Fire','60 seconds, as many answers as you can'],kn:['ರ್‍ಯಾಪಿಡ್ ಫೈರ್ (ಚುರುಕು ಪ್ರಶ್ನೆ)','60 ಸೆಕೆಂಡಿನಲ್ಲಿ ಎಷ್ಟು ಸಾಧ್ಯವೋ ಅಷ್ಟು ಉತ್ತರ']},
{id:'team',icon:'team',en:['Team Games & One-minute Games','18 party games with timer and team scores'],kn:['ತಂಡದ ಆಟಗಳು ಮತ್ತು ಒಂದು ನಿಮಿಷದ ಆಟಗಳು','ಸಮಯ ಮತ್ತು ಅಂಕಗಳ ಜೊತೆ 18 ಆಟಗಳು']}];

/* ---------- Quiz questions: o = options, a = index of right option ---------- */
const QO=(en,kn)=>({en,kn});
const GK_Q=[
{q:QO('What is the capital of Karnataka?','ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?'),o:[QO('Mysuru','ಮೈಸೂರು'),QO('Bengaluru','ಬೆಂಗಳೂರು'),QO('Hubballi','ಹುಬ್ಬಳ್ಳಿ'),QO('Mangaluru','ಮಂಗಳೂರು')],a:1},
{q:QO('What is the national bird of India?','ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಿ ಯಾವುದು?'),o:[QO('Parrot','ಗಿಳಿ'),QO('Swan','ಹಂಸ'),QO('Peacock','ನವಿಲು'),QO('Eagle','ಹದ್ದು')],a:2},
{q:QO('Jog Falls is on which river?','ಜೋಗ ಜಲಪಾತ ಯಾವ ನದಿಯಲ್ಲಿದೆ?'),o:[QO('Kaveri','ಕಾವೇರಿ'),QO('Tungabhadra','ತುಂಗಭದ್ರಾ'),QO('Sharavathi','ಶರಾವತಿ'),QO('Krishna','ಕೃಷ್ಣಾ')],a:2},
{q:QO('Who was the first Kannada writer to win the Jnanpith Award?','ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಪಡೆದ ಮೊದಲ ಕನ್ನಡ ಸಾಹಿತಿ ಯಾರು?'),o:[QO('Kuvempu','ಕುವೆಂಪು'),QO('D. R. Bendre','ದ. ರಾ. ಬೇಂದ್ರೆ'),QO('Shivaram Karanth','ಶಿವರಾಮ ಕಾರಂತ'),QO('Masti','ಮಾಸ್ತಿ')],a:0},
{q:QO('Hampi was the capital of which empire?','ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?'),o:[QO('Mauryan','ಮೌರ್ಯ'),QO('Vijayanagara','ವಿಜಯನಗರ'),QO('Hoysala','ಹೊಯ್ಸಳ'),QO('Chola','ಚೋಳ')],a:1},
{q:QO('Which spice is called the "queen of spices"?','"ಮಸಾಲೆಗಳ ರಾಣಿ" ಎಂದು ಯಾವುದನ್ನು ಕರೆಯುತ್ತಾರೆ?'),o:[QO('Clove','ಲವಂಗ'),QO('Pepper','ಮೆಣಸು'),QO('Cardamom','ಏಲಕ್ಕಿ'),QO('Cinnamon','ಚಕ್ಕೆ')],a:2},
{q:QO('Gol Gumbaz is in which city?','ಗೋಲ ಗುಮ್ಮಟ ಯಾವ ಊರಿನಲ್ಲಿದೆ?'),o:[QO('Vijayapura','ವಿಜಯಪುರ'),QO('Belagavi','ಬೆಳಗಾವಿ'),QO('Kalaburagi','ಕಲಬುರಗಿ'),QO('Hassan','ಹಾಸನ')],a:0},
{q:QO('Who is called the "Missile Man of India"?','"ಭಾರತದ ಕ್ಷಿಪಣಿ ಮನುಷ್ಯ" ಎಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?'),o:[QO('C. V. Raman','ಸಿ. ವಿ. ರಾಮನ್'),QO('A. P. J. Abdul Kalam','ಎ. ಪಿ. ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ'),QO('Vikram Sarabhai','ವಿಕ್ರಮ್ ಸಾರಾಭಾಯ್'),QO('M. Visvesvaraya','ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ')],a:1},
{q:QO('Which queen of Kittur fought the British in 1824?','1824ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಹೋರಾಡಿದ ಕಿತ್ತೂರಿನ ರಾಣಿ ಯಾರು?'),o:[QO('Rani Abbakka','ರಾಣಿ ಅಬ್ಬಕ್ಕ'),QO('Onake Obavva','ಒನಕೆ ಓಬವ್ವ'),QO('Kittur Rani Chennamma','ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ'),QO('Belawadi Mallamma','ಬೆಳವಡಿ ಮಲ್ಲಮ್ಮ')],a:2},
{q:QO('Which planet is called the Red Planet?','ಕೆಂಪು ಗ್ರಹ ಎಂದು ಯಾವುದನ್ನು ಕರೆಯುತ್ತಾರೆ?'),o:[QO('Venus','ಶುಕ್ರ'),QO('Jupiter','ಗುರು'),QO('Mars','ಮಂಗಳ'),QO('Saturn','ಶನಿ')],a:2},
{q:QO('How many days are there in a leap year?','ಅಧಿಕ ವರ್ಷದಲ್ಲಿ ಎಷ್ಟು ದಿನಗಳಿವೆ?'),o:[QO('364','364'),QO('365','365'),QO('366','366'),QO('367','367')],a:2},
{q:QO('Our body makes which vitamin from sunlight?','ಸೂರ್ಯನ ಬೆಳಕಿನಿಂದ ದೇಹ ಯಾವ ವಿಟಮಿನ್ ತಯಾರಿಸುತ್ತದೆ?'),o:[QO('Vitamin A','ವಿಟಮಿನ್ ಎ'),QO('Vitamin C','ವಿಟಮಿನ್ ಸಿ'),QO('Vitamin D','ವಿಟಮಿನ್ ಡಿ'),QO('Vitamin K','ವಿಟಮಿನ್ ಕೆ')],a:2},
{q:QO('What is the state animal of Karnataka?','ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪ್ರಾಣಿ ಯಾವುದು?'),o:[QO('Tiger','ಹುಲಿ'),QO('Elephant','ಆನೆ'),QO('Deer','ಜಿಂಕೆ'),QO('Lion','ಸಿಂಹ')],a:1},
{q:QO('Who wrote India\'s national anthem "Jana Gana Mana"?','"ಜನ ಗಣ ಮನ" ರಾಷ್ಟ್ರಗೀತೆಯನ್ನು ಬರೆದವರು ಯಾರು?'),o:[QO('Rabindranath Tagore','ರವೀಂದ್ರನಾಥ ಟಾಗೋರ್'),QO('Bankim Chandra','ಬಂಕಿಮ ಚಂದ್ರ'),QO('Sarojini Naidu','ಸರೋಜಿನಿ ನಾಯ್ಡು'),QO('Subramania Bharati','ಸುಬ್ರಹ್ಮಣ್ಯ ಭಾರತಿ')],a:0},
{q:QO('KRS dam near Mysuru is built across which river?','ಮೈಸೂರು ಬಳಿಯ ಕೆ.ಆರ್.ಎಸ್. ಅಣೆಕಟ್ಟು ಯಾವ ನದಿಗೆ ಕಟ್ಟಲಾಗಿದೆ?'),o:[QO('Kaveri','ಕಾವೇರಿ'),QO('Hemavathi','ಹೇಮಾವತಿ'),QO('Kabini','ಕಬಿನಿ'),QO('Netravati','ನೇತ್ರಾವತಿ')],a:0},
{q:QO('Which is the largest planet in our solar system?','ಸೌರಮಂಡಲದ ಅತಿ ದೊಡ್ಡ ಗ್ರಹ ಯಾವುದು?'),o:[QO('Earth','ಭೂಮಿ'),QO('Saturn','ಶನಿ'),QO('Jupiter','ಗುರು'),QO('Neptune','ವರುಣ')],a:2}];
const FILM_Q=[
{q:QO('What was Dr. Rajkumar\'s original name?','ಡಾ. ರಾಜ್‌ಕುಮಾರ್ ಅವರ ಮೂಲ ಹೆಸರು ಏನು?'),o:[QO('Muthuraj','ಮುತ್ತುರಾಜ್'),QO('Nagaraj','ನಾಗರಾಜ್'),QO('Shivaraj','ಶಿವರಾಜ್'),QO('Puttaraj','ಪುಟ್ಟರಾಜ್')],a:0},
{q:QO('Who starred in "Bangarada Manushya" (1972)?','"ಬಂಗಾರದ ಮನುಷ್ಯ" (1972) ಚಿತ್ರದ ನಾಯಕ ಯಾರು?'),o:[QO('Vishnuvardhan','ವಿಷ್ಣುವರ್ಧನ್'),QO('Dr. Rajkumar','ಡಾ. ರಾಜ್‌ಕುಮಾರ್'),QO('Ambareesh','ಅಂಬರೀಶ್'),QO('Anant Nag','ಅನಂತ್ ನಾಗ್')],a:1},
{q:QO('Who was the hero of "Mungaru Male" (2006)?','"ಮುಂಗಾರು ಮಳೆ" (2006) ಚಿತ್ರದ ನಾಯಕ ಯಾರು?'),o:[QO('Darshan','ದರ್ಶನ್'),QO('Sudeep','ಸುದೀಪ್'),QO('Ganesh','ಗಣೇಶ್'),QO('Yash','ಯಶ್')],a:2},
{q:QO('Who played Rocky in "K.G.F"?','"ಕೆ.ಜಿ.ಎಫ್." ಚಿತ್ರದಲ್ಲಿ ರಾಕಿ ಪಾತ್ರ ಮಾಡಿದವರು ಯಾರು?'),o:[QO('Yash','ಯಶ್'),QO('Rakshit Shetty','ರಕ್ಷಿತ್ ಶೆಟ್ಟಿ'),QO('Dhruva Sarja','ಧ್ರುವ ಸರ್ಜಾ'),QO('Upendra','ಉಪೇಂದ್ರ')],a:0},
{q:QO('Who directed and starred in "Kantara" (2022)?','"ಕಾಂತಾರ" (2022) ಚಿತ್ರವನ್ನು ನಿರ್ದೇಶಿಸಿ ನಟಿಸಿದವರು ಯಾರು?'),o:[QO('Raj B. Shetty','ರಾಜ್ ಬಿ. ಶೆಟ್ಟಿ'),QO('Rishab Shetty','ರಿಷಬ್ ಶೆಟ್ಟಿ'),QO('Rakshit Shetty','ರಕ್ಷಿತ್ ಶೆಟ್ಟಿ'),QO('Prashanth Neel','ಪ್ರಶಾಂತ್ ನೀಲ್')],a:1},
{q:QO('Puneeth Rajkumar was lovingly called…','ಪುನೀತ್ ರಾಜ್‌ಕುಮಾರ್ ಅವರನ್ನು ಪ್ರೀತಿಯಿಂದ ಏನೆಂದು ಕರೆಯುತ್ತಿದ್ದರು?'),o:[QO('Annavru','ಅಣ್ಣಾವ್ರು'),QO('Appu','ಅಪ್ಪು'),QO('Saahasa Simha','ಸಾಹಸ ಸಿಂಹ'),QO('Rebel Star','ರೆಬೆಲ್ ಸ್ಟಾರ್')],a:1},
{q:QO('Which was the first Kannada talkie film (1934)?','ಮೊದಲ ಕನ್ನಡ ವಾಕ್ಚಿತ್ರ (1934) ಯಾವುದು?'),o:[QO('Sati Sulochana','ಸತಿ ಸುಲೋಚನ'),QO('Bedara Kannappa','ಬೇಡರ ಕಣ್ಣಪ್ಪ'),QO('Bhakta Prahlada','ಭಕ್ತ ಪ್ರಹ್ಲಾದ'),QO('Mayabazar','ಮಾಯಾಬಜಾರ್')],a:0},
{q:QO('Who directed the Kannada film "Om" (1995)?','"ಓಂ" (1995) ಕನ್ನಡ ಚಿತ್ರದ ನಿರ್ದೇಶಕ ಯಾರು?'),o:[QO('Puttanna Kanagal','ಪುಟ್ಟಣ್ಣ ಕಣಗಾಲ್'),QO('Upendra','ಉಪೇಂದ್ರ'),QO('Yogaraj Bhat','ಯೋಗರಾಜ್ ಭಟ್'),QO('S. Narayan','ಎಸ್. ನಾರಾಯಣ್')],a:1},
{q:QO('Who played Gabbar Singh in "Sholay"?','"ಶೋಲೆ" ಚಿತ್ರದಲ್ಲಿ ಗಬ್ಬರ್ ಸಿಂಗ್ ಪಾತ್ರ ಮಾಡಿದವರು ಯಾರು?'),o:[QO('Amjad Khan','ಅಮ್ಜದ್ ಖಾನ್'),QO('Pran','ಪ್ರಾಣ್'),QO('Amrish Puri','ಅಮರೀಶ್ ಪುರಿ'),QO('Prem Chopra','ಪ್ರೇಮ್ ಚೋಪ್ರಾ')],a:0},
{q:QO('Who played Raj in "Dilwale Dulhania Le Jayenge"?','"ದಿಲ್‌ವಾಲೆ ದುಲ್ಹನಿಯಾ ಲೇ ಜಾಯೇಂಗೆ" ಚಿತ್ರದ ರಾಜ್ ಯಾರು?'),o:[QO('Aamir Khan','ಆಮಿರ್ ಖಾನ್'),QO('Salman Khan','ಸಲ್ಮಾನ್ ಖಾನ್'),QO('Shah Rukh Khan','ಶಾರುಖ್ ಖಾನ್'),QO('Saif Ali Khan','ಸೈಫ್ ಅಲಿ ಖಾನ್')],a:2},
{q:QO('Who played Anarkali in "Mughal-e-Azam"?','"ಮುಘಲ್-ಎ-ಆಜಮ್" ಚಿತ್ರದಲ್ಲಿ ಅನಾರ್ಕಲಿ ಯಾರು?'),o:[QO('Meena Kumari','ಮೀನಾ ಕುಮಾರಿ'),QO('Madhubala','ಮಧುಬಾಲಾ'),QO('Nargis','ನರ್ಗಿಸ್'),QO('Waheeda Rehman','ವಹೀದಾ ರೆಹಮಾನ್')],a:1},
{q:QO('Which sport is at the heart of the film "Lagaan"?','"ಲಗಾನ್" ಚಿತ್ರ ಯಾವ ಆಟದ ಸುತ್ತ ನಡೆಯುತ್ತದೆ?'),o:[QO('Hockey','ಹಾಕಿ'),QO('Cricket','ಕ್ರಿಕೆಟ್'),QO('Kabaddi','ಕಬಡ್ಡಿ'),QO('Football','ಫುಟ್‌ಬಾಲ್')],a:1},
{q:QO('Which singer is called the "Nightingale of India"?','"ಭಾರತದ ಕೋಗಿಲೆ" ಎಂದು ಯಾವ ಗಾಯಕಿಯನ್ನು ಕರೆಯುತ್ತಾರೆ?'),o:[QO('Asha Bhosle','ಆಶಾ ಭೋಸ್ಲೆ'),QO('Lata Mangeshkar','ಲತಾ ಮಂಗೇಶ್ಕರ್'),QO('S. Janaki','ಎಸ್. ಜಾನಕಿ'),QO('K. S. Chithra','ಕೆ. ಎಸ್. ಚಿತ್ರಾ')],a:1},
{q:QO('The village in "Sholay" is called…','"ಶೋಲೆ" ಚಿತ್ರದ ಹಳ್ಳಿಯ ಹೆಸರು ಏನು?'),o:[QO('Rampur','ರಾಮಪುರ'),QO('Ramgarh','ರಾಮಗಢ'),QO('Sitapur','ಸೀತಾಪುರ'),QO('Chandannagar','ಚಂದನ್‌ನಗರ')],a:1},
{q:QO('Which song from "RRR" won the Oscar?','"ಆರ್‌ಆರ್‌ಆರ್" ಚಿತ್ರದ ಯಾವ ಹಾಡಿಗೆ ಆಸ್ಕರ್ ಬಂತು?'),o:[QO('Naatu Naatu','ನಾಟು ನಾಟು'),QO('Jai Ho','ಜೈ ಹೋ'),QO('Dosti','ದೋಸ್ತಿ'),QO('Komuram Bheemudo','ಕೊಮುರಂ ಭೀಮುಡೋ')],a:0},
{q:QO('In "Amar Akbar Anthony", who played Anthony?','"ಅಮರ್ ಅಕ್ಬರ್ ಆಂಥೋನಿ" ಚಿತ್ರದಲ್ಲಿ ಆಂಥೋನಿ ಯಾರು?'),o:[QO('Vinod Khanna','ವಿನೋದ್ ಖನ್ನಾ'),QO('Rishi Kapoor','ರಿಷಿ ಕಪೂರ್'),QO('Amitabh Bachchan','ಅಮಿತಾಭ್ ಬಚ್ಚನ್'),QO('Dharmendra','ಧರ್ಮೇಂದ್ರ')],a:2}];
/* picture quiz: e = picture clue */
const PIC_Q=[
{e:'🪁☀️🌾🎋',o:[QO('Sankranti','ಸಂಕ್ರಾಂತಿ'),QO('Ugadi','ಯುಗಾದಿ'),QO('Holi','ಹೋಳಿ'),QO('Onam','ಓಣಂ')],a:0},
{e:'🪔🎆✨🍬',o:[QO('Dasara','ದಸರಾ'),QO('Deepavali','ದೀಪಾವಳಿ'),QO('Christmas','ಕ್ರಿಸ್‌ಮಸ್'),QO('Ugadi','ಯುಗಾದಿ')],a:1},
{e:'🐘👑🏰🎉',o:[QO('Mysuru Dasara','ಮೈಸೂರು ದಸರಾ'),QO('Hampi Utsava','ಹಂಪಿ ಉತ್ಸವ'),QO('Karaga','ಕರಗ'),QO('Kambala','ಕಂಬಳ')],a:0},
{e:'🐍🥛🌼🙏',o:[QO('Nagara Panchami','ನಾಗರ ಪಂಚಮಿ'),QO('Shivaratri','ಶಿವರಾತ್ರಿ'),QO('Gowri Habba','ಗೌರಿ ಹಬ್ಬ'),QO('Ugadi','ಯುಗಾದಿ')],a:0},
{e:'🐘🌺🍡🙏',o:[QO('Ganesha Chaturthi','ಗಣೇಶ ಚತುರ್ಥಿ'),QO('Rama Navami','ರಾಮ ನವಮಿ'),QO('Janmashtami','ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ'),QO('Deepavali','ದೀಪಾವಳಿ')],a:0},
{e:'🎨💦😄🌈',o:[QO('Holi','ಹೋಳಿ'),QO('Sankranti','ಸಂಕ್ರಾಂತಿ'),QO('Dasara','ದಸರಾ'),QO('Onam','ಓಣಂ')],a:0},
{e:'🧵👫🎁',o:[QO('Raksha Bandhan','ರಕ್ಷಾ ಬಂಧನ'),QO('Bhai Dooj','ಭಾಯಿ ದೂಜ್'),QO('Karwa Chauth','ಕರ್ವಾ ಚೌತ್'),QO('Ugadi','ಯುಗಾದಿ')],a:0},
{e:'🍋🍚🌶️🥜',o:[QO('Chitranna (lemon rice)','ಚಿತ್ರಾನ್ನ'),QO('Pulao','ಪುಲಾವ್'),QO('Bisi bele bath','ಬಿಸಿಬೇಳೆ ಬಾತ್'),QO('Curd rice','ಮೊಸರನ್ನ')],a:0},
{e:'🥛🍚🥒🌿',o:[QO('Curd rice','ಮೊಸರನ್ನ'),QO('Payasa','ಪಾಯಸ'),QO('Kheer','ಖೀರ್'),QO('Kesari bath','ಕೇಸರಿ ಬಾತ್')],a:0},
{e:'🥞🥔🌶️🥥',o:[QO('Masala dosa','ಮಸಾಲೆ ದೋಸೆ'),QO('Idli','ಇಡ್ಲಿ'),QO('Vada','ವಡೆ'),QO('Poori','ಪೂರಿ')],a:0},
{e:'☕🥛🔥',o:[QO('Filter coffee','ಫಿಲ್ಟರ್ ಕಾಫಿ'),QO('Lassi','ಲಸ್ಸಿ'),QO('Buttermilk','ಮಜ್ಜಿಗೆ'),QO('Rose milk','ರೋಸ್ ಮಿಲ್ಕ್')],a:0},
{e:'🫓🍯🥥 (ಹೂರಣ)',o:[QO('Obbattu / Holige','ಒಬ್ಬಟ್ಟು / ಹೋಳಿಗೆ'),QO('Chapati','ಚಪಾತಿ'),QO('Dosa','ದೋಸೆ'),QO('Akki roti','ಅಕ್ಕಿ ರೊಟ್ಟಿ')],a:0},
{e:'🌿🍯😋😖',o:[QO('Bevu-bella (Ugadi)','ಬೇವು-ಬೆಲ್ಲ (ಯುಗಾದಿ)'),QO('Ellu-bella','ಎಳ್ಳು-ಬೆಲ್ಲ'),QO('Panaka','ಪಾನಕ'),QO('Kosambari','ಕೋಸಂಬರಿ')],a:0},
{e:'🌧️❤️🎬',o:[QO('Mungaru Male','ಮುಂಗಾರು ಮಳೆ'),QO('K.G.F','ಕೆ.ಜಿ.ಎಫ್.'),QO('Om','ಓಂ'),QO('Kantara','ಕಾಂತಾರ')],a:0}];
/* rapid fire: quick one-word questions */
const RAPID_Q=[
QO('Colour of turmeric?','ಅರಿಶಿನದ ಬಣ್ಣ?'),QO('Name a sweet made with jaggery.','ಬೆಲ್ಲದ ಒಂದು ಸಿಹಿ ಹೇಳಿ.'),QO('Name a river in Karnataka.','ಕರ್ನಾಟಕದ ಒಂದು ನದಿ.'),QO('How many legs does a spider have?','ಜೇಡಕ್ಕೆ ಎಷ್ಟು ಕಾಲು?'),
QO('Name a Kannada film actress.','ಒಬ್ಬ ಕನ್ನಡ ನಟಿಯ ಹೆಸರು.'),QO('Name a flower used in hair.','ಮುಡಿಯುವ ಒಂದು ಹೂವು.'),QO('Name a type of saree.','ಒಂದು ಸೀರೆಯ ಬಗೆ.'),QO('What is 7 × 8?','7 × 8 ಎಷ್ಟು?'),
QO('Name a festival in winter.','ಚಳಿಗಾಲದ ಒಂದು ಹಬ್ಬ.'),QO('Name a green vegetable.','ಒಂದು ಹಸಿರು ತರಕಾರಿ.'),QO('Name a hill station in Karnataka.','ಕರ್ನಾಟಕದ ಒಂದು ಗಿರಿಧಾಮ.'),QO('Name a breakfast dish.','ಒಂದು ತಿಂಡಿಯ ಹೆಸರು.'),
QO('How many days in a week?','ವಾರದಲ್ಲಿ ಎಷ್ಟು ದಿನ?'),QO('Name a musical instrument.','ಒಂದು ವಾದ್ಯದ ಹೆಸರು.'),QO('Name a fruit that is yellow.','ಹಳದಿ ಬಣ್ಣದ ಒಂದು ಹಣ್ಣು.'),QO('Name a Kannada month.','ಒಂದು ಕನ್ನಡ ತಿಂಗಳು.'),
QO('Name something you find in a kitchen.','ಅಡುಗೆಮನೆಯಲ್ಲಿರುವ ಒಂದು ವಸ್ತು.'),QO('Name a famous temple in Karnataka.','ಕರ್ನಾಟಕದ ಒಂದು ಪ್ರಸಿದ್ಧ ದೇವಸ್ಥಾನ.'),QO('What is the opposite of hot?','ಬಿಸಿಯ ವಿರುದ್ಧ ಪದ?'),QO('Name a bird.','ಒಂದು ಪಕ್ಷಿಯ ಹೆಸರು.'),
QO('Name a gold ornament.','ಒಂದು ಚಿನ್ನದ ಆಭರಣ.'),QO('Name a spice.','ಒಂದು ಮಸಾಲೆ ಪದಾರ್ಥ.'),QO('What is 100 − 37?','100 − 37 ಎಷ್ಟು?'),QO('Name a game played with cards or a board.','ಒಂದು ಮನೆ ಆಟ (ಕಾರ್ಡ್ ಅಥವಾ ಬೋರ್ಡ್).'),
QO('Name a colour of the rainbow.','ಕಾಮನಬಿಲ್ಲಿನ ಒಂದು ಬಣ್ಣ.'),QO('Name a sweet shop sweet.','ಅಂಗಡಿಯಲ್ಲಿ ಸಿಗುವ ಒಂದು ಸಿಹಿ.'),QO('Name a city in India.','ಭಾರತದ ಒಂದು ನಗರ.'),QO('Name a summer fruit.','ಬೇಸಿಗೆಯ ಒಂದು ಹಣ್ಣು.')];
/* guess the song: topics (no song titles) */
const SONG_PROMPTS=[QO('A song about rain','ಮಳೆಯ ಬಗ್ಗೆ ಹಾಡು'),QO('A song with the moon in it','ಚಂದ್ರ ಬರುವ ಹಾಡು'),QO('A song about mother','ತಾಯಿಯ ಬಗ್ಗೆ ಹಾಡು'),QO('A wedding song','ಮದುವೆಯ ಹಾಡು'),
QO('A Dr. Rajkumar song','ಡಾ. ರಾಜ್‌ಕುಮಾರ್ ಹಾಡು'),QO('An S. Janaki song','ಎಸ್. ಜಾನಕಿ ಹಾಡು'),QO('An old Hindi film song','ಹಳೆಯ ಹಿಂದಿ ಸಿನಿಮಾ ಹಾಡು'),QO('A folk song (janapada)','ಜಾನಪದ ಗೀತೆ'),QO('A devotional song','ಭಕ್ತಿ ಗೀತೆ'),
QO('A song with a flower in it','ಹೂವಿನ ಹೆಸರು ಇರುವ ಹಾಡು'),QO('A song with a colour in it','ಬಣ್ಣದ ಹೆಸರು ಇರುವ ಹಾಡು'),QO('A song about friendship','ಸ್ನೇಹದ ಹಾಡು'),QO('A song about a journey or train','ಪ್ರಯಾಣ ಅಥವಾ ರೈಲಿನ ಹಾಡು'),
QO('A dance number','ಕುಣಿಯುವ ಹಾಡು'),QO('A sad song','ದುಃಖದ ಹಾಡು'),QO('A song from the 1990s','1990ರ ದಶಕದ ಹಾಡು'),QO('A children\'s rhyme','ಮಕ್ಕಳ ಪದ್ಯ'),QO('A Puneeth Rajkumar song','ಪುನೀತ್ ರಾಜ್‌ಕುಮಾರ್ ಹಾಡು'),QO('A song with "love" in it','"ಪ್ರೀತಿ" ಪದ ಇರುವ ಹಾಡು'),QO('A festival song','ಹಬ್ಬದ ಹಾಡು')];
const ANTA_KN=['ಅ','ಆ','ಇ','ಉ','ಎ','ಒ','ಕ','ಗ','ಚ','ಜ','ತ','ದ','ನ','ಪ','ಬ','ಮ','ಯ','ರ','ಲ','ವ','ಸ','ಹ'];
const ANTA_EN='ABCDEGHIJKLMNOPRSTUVY'.split('');
const WORDS=[
{w:'SAMOSA',h:QO('A fried tea-time snack with potato inside','ಆಲೂಗಡ್ಡೆ ತುಂಬಿದ ಕರಿದ ತಿಂಡಿ')},{w:'JAMUN',h:QO('A sweet ball soaked in syrup','ಪಾಕದಲ್ಲಿ ನೆನೆಸಿದ ಸಿಹಿ ಉಂಡೆ')},{w:'RANGOLI',h:QO('Coloured design at the door','ಬಾಗಿಲಿನ ಬಣ್ಣದ ಚಿತ್ತಾರ')},
{w:'SAREE',h:QO('Six yards of grace','ಆರು ಗಜದ ಉಡುಪು')},{w:'BANGLE',h:QO('Worn on the wrist','ಕೈಗೆ ತೊಡುವುದು')},{w:'JASMINE',h:QO('White flower for the hair','ಮುಡಿಯುವ ಬಿಳಿ ಹೂವು (ಮಲ್ಲಿಗೆ)')},
{w:'MYSORE',h:QO('City of the Dasara procession','ದಸರಾ ಮೆರವಣಿಗೆಯ ಊರು')},{w:'COFFEE',h:QO('Morning filter drink','ಬೆಳಗಿನ ಫಿಲ್ಟರ್ ಪಾನೀಯ')},{w:'PAYASA',h:QO('Sweet milk dish for festivals','ಹಬ್ಬದ ಹಾಲಿನ ಸಿಹಿ')},
{w:'LADDU',h:QO('Round sweet','ದುಂಡನೆಯ ಸಿಹಿ ಉಂಡೆ')},{w:'MEHENDI',h:QO('Designs on the palm','ಅಂಗೈ ಮೇಲಿನ ಚಿತ್ತಾರ')},{w:'HOLIGE',h:QO('Sweet flatbread, also called obbattu','ಒಬ್ಬಟ್ಟು ಎಂದೂ ಕರೆಯುವ ಸಿಹಿ')},
{w:'KUMKUM',h:QO('Red mark on the forehead','ಹಣೆಯ ಕೆಂಪು ಬೊಟ್ಟು')},{w:'DIWALI',h:QO('Festival of lights','ಬೆಳಕಿನ ಹಬ್ಬ')},{w:'MANGO',h:QO('King of fruits','ಹಣ್ಣುಗಳ ರಾಜ')},
{w:'TEMPLE',h:QO('Place of worship','ಪೂಜೆಯ ಸ್ಥಳ (ದೇವಸ್ಥಾನ)')},{w:'GARLAND',h:QO('String of flowers','ಹೂವಿನ ಮಾಲೆ')},{w:'TURMERIC',h:QO('Yellow spice','ಹಳದಿ ಮಸಾಲೆ (ಅರಿಶಿನ)')}];
/* memory cards: simple line pictures */
const MEM_PICS={
lotus:'<path d="M32 10c6 7 7 16 0 27-7-11-6-20 0-27zM32 37c-5-9-14-14-24-14 2 10 11 16 24 14zM32 37c5-9 14-14 24-14-2 10-11 16-24 14z" fill="#B21F58"/>',
diya:'<path d="M10 34c4 10 40 10 44 0z" fill="#D6AD62"/><path d="M32 14c5 6 5 11 0 15-5-4-5-9 0-15z" fill="#F29F05"/>',
mango:'<path d="M20 44c-8-10-2-28 14-30 12-1 18 10 12 22-5 10-19 16-26 8z" fill="#F2B705"/><path d="M34 14c2-5 7-6 10-5-2 4-6 6-10 5z" fill="#087F73"/>',
bangle:'<circle cx="32" cy="32" r="18" fill="none" stroke="#650B32" stroke-width="7"/><circle cx="32" cy="32" r="18" fill="none" stroke="#D6AD62" stroke-width="2" stroke-dasharray="3 5"/>',
peacock:'<circle cx="32" cy="20" r="6" fill="#087F73"/><path d="M32 26c-3 8-3 16 0 26 3-10 3-18 0-26z" fill="#0B5EA8"/><circle cx="18" cy="40" r="6" fill="#087F73"/><circle cx="46" cy="40" r="6" fill="#087F73"/><circle cx="18" cy="40" r="2.5" fill="#D6AD62"/><circle cx="46" cy="40" r="2.5" fill="#D6AD62"/>',
kalash:'<path d="M22 22h20l-3 6c8 4 8 18-7 22-15-4-15-18-7-22z" fill="#D6AD62"/><path d="M24 22c2-8 14-8 16 0" fill="#087F73"/><circle cx="32" cy="14" r="5" fill="#A8823A"/>',
bell:'<path d="M20 40c0-14 4-22 12-22s12 8 12 22z" fill="#D6AD62"/><rect x="16" y="40" width="32" height="5" rx="2" fill="#A8823A"/><circle cx="32" cy="49" r="3" fill="#650B32"/>',
cup:'<path d="M14 26h30v6a15 15 0 0 1-30 0z" fill="#B21F58"/><path d="M44 29c8 0 8 10 0 10" fill="none" stroke="#B21F58" stroke-width="3"/><path d="M24 20c-2-4 2-6 0-10M32 20c-2-4 2-6 0-10" fill="none" stroke="#A8823A" stroke-width="2"/>'};

/* ---------- Ideas by category ---------- */
const IDEA_CATS=[
{id:'themes',icon:'idea',en:'Party themes',kn:'ಪಾರ್ಟಿ ವಿಷಯಗಳು'},
{id:'dress',icon:'dress',en:'Dress codes',kn:'ಉಡುಗೆಯ ವಿಷಯ'},
{id:'decor',icon:'spark',en:'Decoration',kn:'ಅಲಂಕಾರ'},
{id:'gifts',icon:'gift',en:'Return gifts',kn:'ತಾಂಬೂಲ / ಉಡುಗೊರೆ'},
{id:'games',icon:'games',en:'Party games',kn:'ಪಾರ್ಟಿ ಆಟಗಳು'},
{id:'food',icon:'food',en:'Food ideas',kn:'ಊಟದ ಯೋಚನೆಗಳು'},
{id:'tips',icon:'check',en:'Hosting tips',kn:'ಪಾರ್ಟಿ ಕೊಡುವವರಿಗೆ ಸಲಹೆ'},
{id:'season',icon:'cal',en:'Seasonal',kn:'ಹಬ್ಬ ಮತ್ತು ಋತು'}];
const IDEAS_MORE={
dress:[
{en:['Colour of the month','The host picks one colour; best-dressed gets a small prize.'],kn:['ತಿಂಗಳ ಬಣ್ಣ','ಪಾರ್ಟಿ ಕೊಡುವವರು ಒಂದು ಬಣ್ಣ ಆರಿಸುತ್ತಾರೆ; ಚೆನ್ನಾಗಿ ಸಿಂಗರಿಸಿದವರಿಗೆ ಬಹುಮಾನ.']},
{en:['Silk saree day','Bring out the Mysore silk or Kanjeevaram you rarely wear.'],kn:['ರೇಷ್ಮೆ ಸೀರೆ ದಿನ','ಅಪರೂಪಕ್ಕೆ ಉಡುವ ಮೈಸೂರು ಸಿಲ್ಕ್ ಅಥವಾ ಕಂಜೀವರಂ ಉಟ್ಟು ಬನ್ನಿ.']},
{en:['Ilkal and cotton day','Handloom sarees from Karnataka — Ilkal, Molakalmuru, Udupi cotton.'],kn:['ಇಳಕಲ್ ಮತ್ತು ಹತ್ತಿ ಸೀರೆ ದಿನ','ಕರ್ನಾಟಕದ ಕೈಮಗ್ಗದ ಸೀರೆ — ಇಳಕಲ್, ಮೊಳಕಾಲ್ಮುರು, ಉಡುಪಿ ಹತ್ತಿ.']},
{en:['Retro heroine','Dress like a heroine from the 70s–90s and say one famous line.'],kn:['ಹಳೆಯ ಸಿನಿಮಾ ನಾಯಕಿ','70–90ರ ದಶಕದ ನಾಯಕಿಯಂತೆ ಸಿಂಗರಿಸಿ ಒಂದು ಪ್ರಸಿದ್ಧ ಮಾತು ಹೇಳಿ.']},
{en:['Floral print','Anything with flowers on it, plus fresh flowers in the hair.'],kn:['ಹೂವಿನ ಚಿತ್ತಾರ','ಹೂವಿನ ವಿನ್ಯಾಸದ ಉಡುಗೆ, ಮುಡಿಯಲ್ಲಿ ತಾಜಾ ಹೂವು.']},
{en:['Black and gold','Elegant evening look — black outfit, gold jewellery.'],kn:['ಕಪ್ಪು ಮತ್ತು ಚಿನ್ನ','ಸಂಜೆಯ ಸೊಗಸು — ಕಪ್ಪು ಉಡುಗೆ, ಚಿನ್ನದ ಆಭರಣ.']}],
decor:[
{en:['Marigold and mango-leaf toran','Simple, fresh and festive at the main door.'],kn:['ಚೆಂಡು ಹೂ ಮತ್ತು ಮಾವಿನ ತೋರಣ','ಮುಖ್ಯ ಬಾಗಿಲಿಗೆ ಸರಳ, ತಾಜಾ, ಹಬ್ಬದ ಅಲಂಕಾರ.']},
{en:['Diya cluster','Group 7–9 diyas on a brass plate with flower petals.'],kn:['ಹಣತೆಗಳ ಗುಂಪು','ಹಿತ್ತಾಳೆ ತಟ್ಟೆಯಲ್ಲಿ 7–9 ಹಣತೆ ಮತ್ತು ಹೂವಿನ ಎಸಳು.']},
{en:['Photo corner','A dupatta backdrop with fairy lights and a few props for selfies.'],kn:['ಫೋಟೋ ಮೂಲೆ','ದುಪಟ್ಟಾ ಹಿನ್ನೆಲೆ, ಸಣ್ಣ ದೀಪಗಳು, ಸೆಲ್ಫಿಗೆ ಕೆಲವು ವಸ್ತುಗಳು.']},
{en:['Rangoli welcome','A rangoli with the group name at the entrance.'],kn:['ರಂಗೋಲಿ ಸ್ವಾಗತ','ಬಾಗಿಲಲ್ಲಿ ಬಳಗದ ಹೆಸರಿನ ರಂಗೋಲಿ.']},
{en:['Table runner','A silk saree folded down the middle of the food table.'],kn:['ಮೇಜಿನ ಹೊದಿಕೆ','ಊಟದ ಮೇಜಿನ ಮಧ್ಯೆ ಮಡಚಿದ ರೇಷ್ಮೆ ಸೀರೆ.']}],
gifts:[
{en:['Small plant in a pot','Money plant or tulsi — lasts long, everyone loves it.'],kn:['ಕುಂಡದಲ್ಲಿ ಪುಟ್ಟ ಗಿಡ','ಮನಿ ಪ್ಲಾಂಟ್ ಅಥವಾ ತುಳಸಿ — ಬಹಳ ದಿನ ಇರುತ್ತದೆ.']},
{en:['Bangles and kumkum set','Traditional and always useful.'],kn:['ಬಳೆ ಮತ್ತು ಕುಂಕುಮ','ಸಂಪ್ರದಾಯದ, ಯಾವಾಗಲೂ ಉಪಯೋಗಕ್ಕೆ ಬರುವ ಉಡುಗೊರೆ.']},
{en:['Homemade pickle or podi','A small jar of your famous recipe.'],kn:['ಮನೆಯ ಉಪ್ಪಿನಕಾಯಿ ಅಥವಾ ಪುಡಿ','ನಿಮ್ಮ ವಿಶೇಷ ಅಡುಗೆಯ ಪುಟ್ಟ ಡಬ್ಬಿ.']},
{en:['Cloth bag','A printed cotton bag — useful and eco-friendly.'],kn:['ಬಟ್ಟೆ ಚೀಲ','ಹತ್ತಿಯ ಚಿತ್ತಾರದ ಚೀಲ — ಉಪಯುಕ್ತ, ಪರಿಸರ ಸ್ನೇಹಿ.']},
{en:['Scented candle or agarbatti','A gentle fragrance for the home.'],kn:['ಸುವಾಸನೆಯ ಮೇಣದಬತ್ತಿ ಅಥವಾ ಅಗರಬತ್ತಿ','ಮನೆಗೆ ಹಿತವಾದ ಪರಿಮಳ.']}],
food:[
{en:['Live chaat counter','The host sets up bowls; everyone makes their own pani puri.'],kn:['ಚಾಟ್ ಮೇಜು','ಬಟ್ಟಲುಗಳನ್ನು ಇಟ್ಟರೆ ಎಲ್ಲರೂ ತಮ್ಮ ಪಾನಿ ಪುರಿ ತಾವೇ ಮಾಡಿಕೊಳ್ಳುತ್ತಾರೆ.']},
{en:['Millet menu','Ragi, jowar, navane — healthy and very Karnataka.'],kn:['ಸಿರಿಧಾನ್ಯದ ಊಟ','ರಾಗಿ, ಜೋಳ, ನವಣೆ — ಆರೋಗ್ಯಕರ, ನಮ್ಮ ಕರ್ನಾಟಕದ್ದು.']},
{en:['Potluck by colour','Everyone brings one dish of the month\'s colour.'],kn:['ಬಣ್ಣದ ಊಟ','ಎಲ್ಲರೂ ತಿಂಗಳ ಬಣ್ಣದ ಒಂದು ತಿನಿಸು ತನ್ನಿ.']},
{en:['Grandmother\'s recipe day','Each lady brings one dish from her ajji\'s kitchen.'],kn:['ಅಜ್ಜಿಯ ಅಡುಗೆ ದಿನ','ಪ್ರತಿಯೊಬ್ಬರೂ ಅಜ್ಜಿಯ ಅಡುಗೆಮನೆಯ ಒಂದು ತಿನಿಸು ತನ್ನಿ.']},
{en:['Dessert bar','Three small sweets instead of one big one.'],kn:['ಸಿಹಿ ಮೇಜು','ಒಂದು ದೊಡ್ಡ ಸಿಹಿಯ ಬದಲು ಮೂರು ಪುಟ್ಟ ಸಿಹಿಗಳು.']}],
tips:[
{en:['Send the invite a week ahead','And a reminder the day before.'],kn:['ಒಂದು ವಾರ ಮೊದಲೇ ಆಹ್ವಾನ ಕಳುಹಿಸಿ','ಹಿಂದಿನ ದಿನ ಒಂದು ನೆನಪಿನ ಸಂದೇಶ.']},
{en:['Plan games before food','Energy is higher before the meal.'],kn:['ಊಟಕ್ಕಿಂತ ಮೊದಲು ಆಟ','ಊಟದ ಮೊದಲು ಎಲ್ಲರ ಉತ್ಸಾಹ ಹೆಚ್ಚು.']},
{en:['Keep prizes ready in envelopes','Write the game name on each.'],kn:['ಬಹುಮಾನಗಳನ್ನು ಕವರ್‌ನಲ್ಲಿ ಸಿದ್ಧವಾಗಿಡಿ','ಪ್ರತಿಯೊಂದರ ಮೇಲೆ ಆಟದ ಹೆಸರು ಬರೆಯಿರಿ.']},
{en:['One helper for the kitchen','Ask a family member so you can enjoy too.'],kn:['ಅಡುಗೆಮನೆಗೆ ಒಬ್ಬ ಸಹಾಯಕರು','ನೀವೂ ಖುಷಿಯಾಗಿರಲು ಮನೆಯವರ ಸಹಾಯ ಪಡೆಯಿರಿ.']},
{en:['Collect kitty money first','Before games start, so nothing is forgotten.'],kn:['ಮೊದಲು ಕಿಟ್ಟಿ ಹಣ ಸಂಗ್ರಹಿಸಿ','ಆಟ ಶುರುವಾಗುವ ಮೊದಲೇ, ಮರೆಯದಂತೆ.']},
{en:['Keep a basket for phones during games','Everyone joins in fully.'],kn:['ಆಟದ ಸಮಯ ಫೋನ್‌ಗಳಿಗೆ ಒಂದು ಬುಟ್ಟಿ','ಎಲ್ಲರೂ ಮನಸಾರೆ ಭಾಗವಹಿಸುತ್ತಾರೆ (ಹೌಸಿ ಹೊರತು!).']}],
season:[
{en:['Monsoon chai party','Pakodas, masala chai and old rain songs.'],kn:['ಮಳೆಗಾಲದ ಚಹಾ ಕೂಟ','ಪಕೋಡ, ಮಸಾಲೆ ಚಹಾ, ಹಳೆಯ ಮಳೆ ಹಾಡುಗಳು.']},
{en:['Summer mango mela','Mango dishes only — aamras, mango lassi, chitranna with raw mango.'],kn:['ಬೇಸಿಗೆಯ ಮಾವಿನ ಮೇಳ','ಮಾವಿನ ತಿನಿಸುಗಳು ಮಾತ್ರ — ಮಾವಿನ ರಸಾಯನ, ಲಸ್ಸಿ, ಮಾವಿನಕಾಯಿ ಚಿತ್ರಾನ್ನ.']},
{en:['Winter bonfire evening','Groundnuts, sweet potato and antakshari around a small fire.'],kn:['ಚಳಿಗಾಲದ ಬೆಂಕಿ ಸಂಜೆ','ಕಡಲೆಕಾಯಿ, ಗೆಣಸು, ಸಣ್ಣ ಬೆಂಕಿಯ ಸುತ್ತ ಅಂತ್ಯಾಕ್ಷರಿ.']},
{en:['Navaratri gombe visit','Visit each other\'s doll displays together.'],kn:['ನವರಾತ್ರಿ ಗೊಂಬೆ ನೋಡಲು','ಒಬ್ಬರ ಮನೆಯ ಗೊಂಬೆ ಹಬ್ಬ ನೋಡಲು ಎಲ್ಲರೂ ಒಟ್ಟಿಗೆ ಹೋಗಿ.']},
{en:['Shravana haldi-kumkum','A traditional haldi-kumkum kitty in Shravana month.'],kn:['ಶ್ರಾವಣದ ಅರಿಶಿನ-ಕುಂಕುಮ','ಶ್ರಾವಣ ಮಾಸದಲ್ಲಿ ಅರಿಶಿನ-ಕುಂಕುಮದ ಕಿಟ್ಟಿ.']}]};
const WISHES={
bday:QO('Happy birthday, {n}! Wishing you good health, love and many more kitty parties together.','ಜನ್ಮದಿನದ ಶುಭಾಶಯಗಳು {n}! ಆರೋಗ್ಯ, ಸಂತೋಷ ಮತ್ತು ಇನ್ನೂ ಹಲವು ಕಿಟ್ಟಿ ಪಾರ್ಟಿಗಳು ನಿಮ್ಮದಾಗಲಿ.'),
anniv:QO('Happy wedding anniversary, {n}! Wishing you both a lifetime of love and laughter.','ಮದುವೆಯ ವಾರ್ಷಿಕೋತ್ಸವದ ಶುಭಾಶಯಗಳು {n}! ನಿಮ್ಮಿಬ್ಬರ ಬಾಳು ಪ್ರೀತಿ, ನಗುವಿನಿಂದ ತುಂಬಿರಲಿ.'),
kitty:QO('Happy kitty anniversary to all of us! Thank you for every laugh, every game and every plate of food together.','ನಮ್ಮ ಕಿಟ್ಟಿ ಬಳಗದ ವಾರ್ಷಿಕೋತ್ಸವದ ಶುಭಾಶಯಗಳು! ಒಟ್ಟಿಗೆ ನಕ್ಕ ಪ್ರತಿ ಕ್ಷಣಕ್ಕೂ, ಆಡಿದ ಪ್ರತಿ ಆಟಕ್ಕೂ ಧನ್ಯವಾದ.')};
const TEMPLATES=[
{id:'royal',en:'Royal Burgundy',kn:'ರಾಜ ಕೆಂಪು',sw:'linear-gradient(160deg,#650B32,#520B2B)'},
{id:'traditional',en:'Traditional',kn:'ಸಾಂಪ್ರದಾಯಿಕ',sw:'linear-gradient(160deg,#7A1B12,#5A120C)'},
{id:'floral',en:'Floral Garden',kn:'ಹೂದೋಟ',sw:'linear-gradient(170deg,#F7C9D6,#E89AB2)'},
{id:'pastel',en:'Pastel',kn:'ತಿಳಿ ಬಣ್ಣ',sw:'linear-gradient(170deg,#CDB8E6,#A9D5C9)'},
{id:'festive',en:'Festive',kn:'ಸಂಭ್ರಮ',sw:'linear-gradient(160deg,#5B0E5E,#2F0A3A)'},
{id:'minimal',en:'Modern Minimal',kn:'ಸರಳ',sw:'linear-gradient(160deg,#8C7680,#650B32)'},
{id:'wedding',en:'Wedding Style',kn:'ಮದುವೆಯ ಶೈಲಿ',sw:'linear-gradient(170deg,#E9CF9E,#A8823A)'},
{id:'festival',en:'Festival Special',kn:'ಹಬ್ಬದ ವಿಶೇಷ',sw:'linear-gradient(160deg,#0E5A52,#073B36)'}];
const ACCENTS=['#D6AD62','#F2C14E','#B21F58','#087F73','#8C6BB1','#E07A5F','#FFFFFF','#30242A'];
const MEMBER_CATS=[{id:'founder',en:'Founding member',kn:'ಸ್ಥಾಪಕ ಸದಸ್ಯೆ'},{id:'member',en:'Member',kn:'ಸದಸ್ಯೆ'},{id:'guest',en:'Guest',kn:'ಅತಿಥಿ'}];

KP.C={KN_NAMES,CAL0,MINUTE_GAMES,MENU,PRESETS,THEMES_OLD,CALLS_EN,CALLS_KN,knNum,FESTIVALS,GAME_LIST,GK_Q,FILM_Q,PIC_Q,RAPID_Q,SONG_PROMPTS,ANTA_KN,ANTA_EN,WORDS,MEM_PICS,IDEA_CATS,IDEAS_MORE,WISHES,TEMPLATES,ACCENTS,MEMBER_CATS};
})();
