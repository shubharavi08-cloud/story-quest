/* World of Wonders: one list of every game (picture, one-line hook, how to play, a little history, what it teaches).
   Home page:   <script src="game-info.js"></script>                        -> window.WOW_GAMES for the game gallery
   Game page:   <script src="game-info.js" data-game="lagori" defer></script> -> adds an "About this game" card above the footer
   Vedic Maths: data-game="vm" picks the trick from the URL hash (#t1 … #t6).
   To add a game: add one row below and a 16:9 picture in img/games/. */
(function(){
var G=[
 {id:'road-to-ayodhya',vid:'MzVcueVUos8',cat:'deepavali',tag:'Deepavali · Ayodhya',name:'Road to Ayodhya',href:'road-to-ayodhya.html',img:'img/games/road-to-ayodhya.webp',players:'1–4 players',gate:'road-to-ayodhya',
  hook:'Roll the dice and race Shri Ram home past snakes and ladders!',
  how:'Roll the dice and race Shri Ram home on the old board of ladders and snakes. Ladders are good deeds, snakes are bad habits. Play together on one screen or against Diya.',
  fact:'Snakes and Ladders began in India as <b>Moksha Patam</b>. Each ladder stood for a virtue and each snake for a vice. Travellers took it to England in the 1800s.',
  learn:['Counting','Good habits','Taking turns']},
 {id:'samudra-manthan',vid:'ofU33IYt4dE',cat:'deepavali',tag:'Deepavali · Rajasthan',name:'Samudra Manthan',href:'samudra-manthan.html',img:'img/games/samudra-manthan.webp',players:'1 or 2 players',gate:'samudra-manthan',
  hook:'Churn the ocean of milk and win its 14 treasures!',
  how:'Devas and Asuras pull the serpent Vasuki in turns. Keep the rhythm to churn the ocean, call Lord Shiva when the poison rises, and collect the treasures until Lord Dhanvantari appears with the pot of amrit.',
  fact:'The <b>Samudra Manthan</b> story is told in the Bhagavata and Vishnu Puranas. Lord Vishnu became Kurma, the turtle, to hold Mount Mandara on his back.',
  learn:['Rhythm','Teamwork','Patience']},
 {id:'lagori',vid:'FAU2IvP3Rhc',cat:'deepavali',tag:'Deepavali · Goa',name:'Lagori Strike',href:'lagori.html',img:'img/games/lagori.webp',players:'1 or 2 players',gate:'lagori',
  hook:"Knock down Naraka's tower of pride with one ball!",
  how:"Knock down Naraka's tower of seven stones, then rebuild it fast, biggest stone first, while dodging the ball. Every stone you rebuild turns into a virtue.",
  fact:'This street game has many names across India: <b>Lagori</b> in Karnataka, <b>Pitthu</b> in the North, <b>Sat Patthar</b> in the West. All you need is a ball and seven flat stones.',
  learn:['Aim','Quick thinking','Sorting by size']},
 {id:'archery',vid:'8jRw7hiDk3s',cat:'deepavali',tag:'Deepavali · Andhra & Tamil Nadu',name:"Satyabhama's Arrow",href:'archery.html',img:'img/games/archery.webp',players:'1 or 2 players',gate:'archery',
  hook:"Draw the queen's bow and break the demon's fort!",
  how:"Draw Queen Satyabhama's bow over Pragjyotishpur. Break the walls of mountain, fire and water, ride the wind, and face Narakasura himself. Three hits and the battle is won!",
  fact:'Ancient India had a whole science of archery called <b>Dhanurveda</b>. In the Deepavali story, Satyabhama fights beside Krishna to free 16,000 captives.',
  learn:['Aim','Wind and angles','Courage']},
 {id:'pallanguzhi',vid:'mkfrA4gqWFA',cat:'deepavali',tag:'Deepavali · Gujarat',name:"Lakshmi's Cowries",href:'pallanguzhi.html',img:'img/games/pallanguzhi.webp',players:'vs Diya or 2 players',gate:'pallanguzhi',
  hook:"Grandma's cowrie board game. Can you beat Diya?",
  how:"Play Pallanguzhi in Sethji's lamp-lit shop. Sow the cowries pit by pit, keep the chain going, and win Lakshmi's blessings from the empty pits.",
  fact:'<b>Pallanguzhi</b> is played on a 14-pit board with cowries or tamarind seeds. Karnataka calls it <b>Alaguli Mane</b>; grandmothers used it to teach counting.',
  learn:['Counting','Planning ahead','Strategy']},
 {id:'catch-drops',vid:'75fhNiD8xu0',cat:'deepavali',tag:'Deepavali · Bengal',name:'Catch Every Drop',href:'catch-drops.html',img:'img/games/catch-drops.webp',players:'1 or 2 players',gate:'catch-drops',
  hook:'Help Maa Kali catch every drop before a new demon pops up!',
  how:"Every drop of Raktabeej that touches the ground becomes a new demon! Move Maa Kali's bowl and catch them all. Golden drops, a wide-bowl power and three rounds.",
  fact:'This story comes from the <b>Devi Mahatmya</b>, a 1,500-year-old scripture recited during Navratri. It shows evil can be stopped before it spreads.',
  learn:['Reflexes','Focus','Hand–eye skill']},
 {id:'navakankari',vid:'GkeROReCAGo',cat:'deepavali',tag:'Deepavali · Karnataka',name:"Bali's Promise",href:'navakankari.html',img:'img/games/navakankari.webp',players:'vs Deepu or 2 players',gate:'navakankari',
  hook:'Three lamps in a line wins! The temple-floor strategy game.',
  how:"Play Navakankari in King Bali's lamp-lit courtyard. Place and move your lamps. Make three in a line to keep a Promise and take a lamp from your rival.",
  fact:'<b>Navakankari</b> boards are carved into the floors and steps of old South Indian temples. The same game is played around the world as Nine Men\'s Morris.',
  learn:['Strategy','Pattern spotting','Thinking ahead']},
 {id:'yamuna-thali',vid:'Y5Gs-EAySkY',cat:'deepavali',tag:'Deepavali · Mathura',name:"Yamuna's Thali",href:'yamuna-thali.html',img:'img/games/yamuna-thali.webp',players:'1 player or brother & sister',gate:'yamuna-thali',
  hook:'Match the puja cards before Yamraj reaches the door!',
  how:"Yamraj is riding to his sister's door! Flip the cards, match the puja items and fill Yamuna's welcome thali before he arrives.",
  fact:'<b>Bhai Dooj</b> is also called <b>Yama Dwitiya</b>. The story says Yamuna welcomed her brother Yama with tilak and food, and he blessed every brother and sister.',
  learn:['Memory','Puja items','Family values']},
 {id:'finale',cat:'deepavali',tag:'Deepavali · Grand finale',name:'Light Up Deepavali',href:'finale.html',img:'img/S21_diya_night_fly.jpg',players:'1 player',
  hook:'Fly across India with Diya and light all 24 diyas!',
  how:'Fly across India with Diya and play four mini-games (quiz, five days, across India and rangoli) to light all 24 diyas.',
  fact:'<b>Deepavali</b> means "a row of lamps" (deepa + avali). People in Ayodhya lit rows of lamps to welcome Shri Ram home.',
  learn:['Quiz','Indian festivals','Rangoli']},
 {id:'navadurga-match',vid:'IlBi-hGGF9E',cat:'dasara',tag:'Dasara · Start here',name:'Navadurga Match',href:'navadurga-match.html',img:'img/games/navadurga-match.webp',players:'1 player',gate:'navadurga-match',
  hook:'Slide the pieces back together and meet all nine forms of Maa Durga!',
  how:'A storm has broken the pictures of the nine Devis into pieces. Tap a piece next to the empty space to slide it in, or tap one in the same row or column to slide a whole line. Finish all nine pictures. Easy 3 × 3 or hard 4 × 4.',
  fact:'Sliding puzzles became a craze in the <b>1880s</b>, when the "15 puzzle" swept America and Europe. Exactly half of all mixed-up boards can never be solved, so ours are always mixed with real moves.',
  learn:['Planning ahead','Visual memory','The nine Devis']},
 {id:'climb-himalaya',vid:'T96jKddkIhw',cat:'dasara',tag:'Dasara · Day 1',name:'Climb the Himalaya',href:'climb-himalaya.html',img:'img/games/climb-himalaya.webp',players:'1 player',gate:'climb-himalaya',
  hook:'Bounce Diya up the snowy peaks to reach Maa Shailaputri!',
  how:'Diya bounces by herself. Hold your finger to her left or right to steer, or use the arrow keys. Ice ledges crack after one bounce and wooden ledges slide. Collect lotus flowers, pass three camps and reach the summit.',
  fact:'<b>Shailaputri</b> means "daughter of the mountain". The Himalaya, "home of snow" in Sanskrit, has the world\'s highest peaks, and it is still growing a few millimetres every year.',
  learn:['Hand–eye timing','Steady focus','Day 1 story']},
 {id:'japa-mala',vid:'w82yu_nCdC8',cat:'dasara',tag:'Dasara · Day 2',name:'Japa Mala Beads',href:'japa-mala.html',img:'img/games/japa-mala.webp',players:'1 player',gate:'japa-mala',
  hook:'Watch the beads of the mala glow, then repeat the pattern!',
  how:"Eight big beads of Maa Brahmacharini's mala glow one by one, each with its own musical note (Sa Re Ga Ma Pa Dha Ni Sa). Touch them in the same order. Every round adds one bead. Ten rounds complete the tapasya.",
  fact:'A <b>japa mala</b> has <b>108</b> beads plus a guru bead called the <b>meru</b>. When you reach the meru you turn the mala around instead of crossing it.',
  learn:['Memory','Listening','Patience']},
 {id:'ring-the-bell',vid:'lgTVdgoBnQ0',cat:'dasara',tag:'Dasara · Day 3',name:'Ring the Bell',href:'ring-the-bell.html',img:'img/games/ring-the-bell.webp',players:'1 player',gate:'ring-the-bell',
  hook:"Ring Maa Chandraghanta's moon bell and chase the shadows away!",
  how:'The temple bell swings by itself. Tap when it passes through the gold zone. Right in the middle is PERFECT and the sound wave clears every shadow. Keep the shadows away from the lamp for five levels.',
  fact:'<b>Chandraghanta</b> means "moon bell". Temple bells are cast from a mix of metals, so one ring keeps humming for several seconds. Ringing the bell before prayer fills the mind with that one sound and quiets other thoughts.',
  learn:['Timing','Calm focus','Day 3 story']},
 {id:'light-cosmos',vid:'H2eKJBSJWgs',cat:'dasara',tag:'Dasara · Day 4',name:'Light the Cosmos',href:'light-cosmos.html',img:'img/games/light-cosmos.webp',players:'1 player',gate:'light-cosmos',
  hook:"Join the stars and light the sky with Maa Kushmanda's smile!",
  how:'Tap the stars in order, 1, 2, 3… to draw a diya, a lotus, a kalash, a star and the sun. From the third shape the numbers hide, so remember them or follow the softly glowing next star.',
  fact:'<b>Kushmanda</b> comes from <i>ku</i> (a little), <i>ushma</i> (warmth) and <i>anda</i> (the cosmic egg): the old story says the universe began with her gentle smile. People have joined stars into pictures for thousands of years; in India the star groups along the moon\'s path are called <b>nakshatras</b>.',
  learn:['Counting in order','Memory','Day 4 story']},
 {id:'lotus-pond',vid:'24KpyntW_PI',cat:'dasara',tag:'Dasara · Day 5',name:'Lotus Pond',href:'lotus-pond.html',img:'img/games/lotus-pond.webp',players:'1 player',gate:'lotus-pond',
  hook:'Hop across the lily pads to Maa Skandamata\'s lotus throne!',
  how:'Each lily pad shows how many pads you hop, straight up, down, left or right. Pads you can reach glow. Plan your hops to reach the golden lotus throne in as few hops as you can.',
  fact:'<b>Skandamata</b> is the mother of Skanda, also called Kartikeya and Murugan. A lotus grows out of muddy water yet stays clean, which is why goddesses are shown seated on lotuses. The lotus is India\'s national flower.',
  learn:['Planning ahead','Counting jumps','Day 5 story']},
 {id:'lions-ride',vid:'JFBAewcgXAw',cat:'dasara',tag:'Dasara · Day 6',name:"The Lion's Ride",href:'lions-ride.html',img:'img/games/lions-ride.webp',players:'1 player',gate:'lions-ride',
  hook:'Draw a safe road for Maa Katyayani\'s lion to Mahishasura\'s fort!',
  how:'Put your finger on Maa and draw a road all the way to the fort. Let go and her lion rides it. Keep clear of thorns, rocks and the moving shadow guards, and pass through lotus flowers for extra stars.',
  fact:'<b>Katyayani</b> appeared in the ashram of the sage Katyayana and rode her lion to defeat Mahishasura. The city of <b>Mysuru</b> takes its name from this story (Mahishuru, the town of Mahisha), and its Dasara is famous all over the world.',
  learn:['Planning a route','Hand control','Day 6 story']},
 {id:'light-after-darkness',vid:'O5hzHeRdcuk',cat:'dasara',tag:'Dasara · Day 7',name:'Light after Darkness',href:'light-after-darkness.html',img:'img/games/light-after-darkness.webp',players:'1 player',gate:'light-after-darkness',
  hook:'Carry a tiny lamp through a dark maze to Maa Kalaratri!',
  how:'Move with the arrow buttons, the arrow keys or by swiping. Your lamp lights only the paths near you and slowly dims: collect ghee pots to make it bright again. Follow Maa\'s glow to the exit and keep away from the shadows.',
  fact:'<b>Kalaratri</b> is the fiercest form of Durga, yet she is also called <b>Shubhankari</b>, "the one who brings good". In a traditional diya the wick soaks up ghee or oil, and the flame burns the fuel, not the wick, which is why a lamp needs refilling.',
  learn:['Finding a way','Staying calm','Day 7 story']},
 {id:'t1',cat:'vedicmaths',tag:'Vedic Maths · Trick 1',name:'Add from the Left',href:'vedic-maths/#t1',img:'img/games/vm-t1.webp',players:'Class 6–10',
  hook:'Count the mangoes before the cart leaves!',
  how:'Baskets of mangoes arrive at the orchard. Add the biggest digits first, then the rest, and count them before the cart leaves.',
  fact:'We read and say numbers from the left, so Vedic Maths adds from the left too. You get the answer faster and almost never lose a carry.',
  learn:['Mental addition','Place value']},
 {id:'t2',cat:'vedicmaths',tag:'Vedic Maths · Trick 2',name:'Round Up, Take Back',href:'vedic-maths/#t2',img:'img/games/vm-t2.webp',players:'Class 6–10',
  hook:"Add Meera's shopping cart in your head!",
  how:'Prices end in 9 and 8. Round them up, add, then take back what you borrowed.',
  fact:'Shops price things at ₹199 because it looks much cheaper than ₹200. This trick turns that shop trick into easy maths.',
  learn:['Rounding','Money sense']},
 {id:'t3',cat:'vedicmaths',tag:'Vedic Maths · Trick 3',name:'The Dot Method',href:'vedic-maths/#t3',img:'img/games/vm-t3.webp',players:'Class 6–10',
  hook:"Count Chintu's banana pile with dots!",
  how:'Add a long list of numbers. Each time you pass 10, drop a dot and keep only what is left.',
  fact:'Old Indian accountants added long columns in their <i>bahi-khata</i> ledgers with tricks like this, all in their heads.',
  learn:['Adding long lists','Tens']},
 {id:'t4',cat:'vedicmaths',tag:'Vedic Maths · Trick 4',name:'All from 9, Last from 10',href:'vedic-maths/#t4',img:'img/games/vm-t4.webp',players:'Class 6–10',
  hook:"Give change at Ganak's mango cart in 2 seconds!",
  how:'Customers pay with big notes. Give the right change in seconds using the sutra.',
  fact:'This is the <b>Nikhilam</b> sutra, one of 16 sutras collected by Swami Bharati Krishna Tirtha. His book <i>Vedic Mathematics</i> came out in 1965.',
  learn:['Subtraction','Giving change']},
 {id:'t5',cat:'vedicmaths',tag:'Vedic Maths · Trick 5',name:'Take Too Much, Give Back',href:'vedic-maths/#t5',img:'img/games/vm-t5.webp',players:'Class 6–10',
  hook:"Spend Meera's piggy bank without a calculator!",
  how:'Subtract prices like ₹298: take away a round number, then give back the extra.',
  fact:'Your brain works faster with round numbers. Mental-maths champions use tricks like this to subtract in a flash.',
  learn:['Subtraction','Rounding']},
 {id:'t6',cat:'vedicmaths',tag:'Vedic Maths · Trick 6',name:'The Digit-Sum Detective',href:'vedic-maths/#t6',img:'img/games/vm-t6.webp',players:'Class 6–10',
  hook:'Catch cheeky Chintu’s wrong answers!',
  how:'Chintu says he solved the sums on his slate. Use digit sums to catch his mistakes without redoing them.',
  fact:'Checking answers by adding digits is called <b>casting out nines</b>. Indian mathematicians and traders used it for centuries before calculators.',
  learn:['Checking answers','Number patterns']},
 {id:'jb-spot-the-scam',vid:'YqsMnITlLFs',cat:'scamalert',tag:'Scam Alert · Jagruth Bharath',name:'Spot the Scam',href:'jagruth-bharath/spot-the-scam.html',img:'jagruth-bharath/img/mauna.webp',players:'1 player or family',gate:'jb-spot-the-scam',
  hook:'12 messages. Scam or safe? Can you beat Mauna the owl?',
  how:'Twelve real-style messages. Scam or safe? Test yourself, then test your family.',
  fact:'Lost money to a scam? Call <b>1930</b>, India\'s cybercrime helpline, at once, or report at cybercrime.gov.in. The first hours matter most.',
  learn:['Online safety','Reading carefully']},
 {id:'jb-mr-promise-calling',vid:'hclZZ3RF1Yk',cat:'scamalert',tag:'Scam Alert · Jagruth Bharath',name:'Mr. Promise is calling',href:'jagruth-bharath/mr-promise-calling.html',img:'jagruth-bharath/img/mr-promise.webp',players:'1 player',gate:'jb-mr-promise-calling',
  hook:'A scammer is chatting with you. Can you escape?',
  how:'Chat with a scammer and try to escape. Three real Indian scam cases.',
  fact:'There is no such thing as a <b>"digital arrest"</b>. Police and courts never arrest anyone or ask for money over a video call.',
  learn:['Saying no','Staying calm']},
 {id:'jb-family-safety-check',vid:'RbHkRgO1ZLQ',cat:'scamalert',tag:'Scam Alert · Jagruth Bharath',name:'Family Safety Check',href:'jagruth-bharath/family-safety-check.html',img:'jagruth-bharath/img/helpline.webp',players:'Whole family',gate:'jb-family-safety-check',
  hook:'10 quick questions: how scam-safe is your family?',
  how:'Ten quick questions: how scam-safe is your family? Get a free to-do list and a share card.',
  fact:'Banks never ask for your OTP, PIN or CVV, not even "to stop a fraud". Anyone who asks is a scammer.',
  learn:['Family safety','Good habits']}
];
window.WOW_GAMES=G;
/*JB_CASES*/window.WOW_JB_CASES=[{"id": "arrest", "t": "The Video Call Arrest", "yt": "hclZZ3RF1Yk"}, {"id": "refund", "t": "The ₹441 Refund", "yt": "YVut1eqftR8"}, {"id": "trading", "t": "The VIP Profit Group", "yt": "hIt4hLpDCB4"}, {"id": "family", "t": "Is Your Family Scam-Safe?", "yt": "RbHkRgO1ZLQ"}, {"id": "spot", "t": "Spot the Scam", "yt": "YqsMnITlLFs"}];/*/JB_CASES*/

var ME=document.currentScript, which=ME&&ME.dataset.game;
if(!which)return;
var root=(ME.getAttribute('src')||'').replace(/game-info\.js.*$/,'');   /* '' or '../' */
function pick(){var id=which;if(id==='vm'){var h=(location.hash||'').slice(1);id=/^t[1-6]$/.test(h)?h:null}return id?G.filter(function(g){return g.id===id})[0]:null}
/* games that belong to a story open through that story's Watch & play section (watch first, then play) */
var SEC={'road-to-ayodhya':'index.html#dv1','samudra-manthan':'index.html#dv2','lagori':'index.html#dv3','archery':'index.html#dv4','pallanguzhi':'index.html#dv5',
  'catch-drops':'index.html#dv6','navakankari':'index.html#dv7','yamuna-thali':'index.html#dv8',
  'navadurga-match':'index.html#ds-intro','climb-himalaya':'index.html#ds-d1','japa-mala':'index.html#ds-d2','ring-the-bell':'index.html#ds-d3'};
function link(o){return SEC[o.id]||o.href}
/* the NEXT story in the same series comes first, then one more from the series and one from another series */
function others(g){var same=G.filter(function(x){return x.cat===g.cat}),i=same.indexOf(g),after=same.slice(i+1).concat(same.slice(0,i)),
  rest=G.filter(function(x){return x.cat!==g.cat});
  return after.slice(0,2).concat(rest[Math.floor(Math.random()*rest.length)])}
var css=document.createElement('style');
css.textContent='#wowAbout{max-width:960px;margin:34px auto 0;padding:0 16px;font-family:Mukta,"Segoe UI",system-ui,sans-serif;color:#fdf3dc}'+
 '#wowAbout .ab{background:linear-gradient(160deg,#2a1f5c,#1c1442);border:1px solid rgba(253,243,220,.16);border-radius:22px;padding:20px 22px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px}'+
 '#wowAbout h2{font:800 28px/1.1 "Baloo 2",system-ui,sans-serif;margin:0 0 6px;color:#fdf3dc}'+
 '#wowAbout h3{font:800 18px/1.2 "Baloo 2",system-ui,sans-serif;margin:0 0 4px;color:#ffd35a}'+
 '#wowAbout p{margin:0;color:#e9e2ff;font-size:16px;line-height:1.5}#wowAbout b{color:#ffd35a}'+
 '#wowAbout .ey{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#f6a723;font-weight:700}'+
 '#wowAbout .fact{background:#ffd35a14;border-left:3px solid #ffd35a;border-radius:12px;padding:10px 13px}'+
 '#wowAbout .tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}#wowAbout .tags span{font-size:13px;font-weight:700;border-radius:999px;padding:3px 11px;background:#46b88222;color:#9be3bf}'+
 '#wowAbout .more{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}'+
 '#wowAbout .more a{display:block;border-radius:14px;overflow:hidden;background:#120c30;text-decoration:none;color:#fdf3dc;border:1px solid rgba(253,243,220,.12)}'+
 '#wowAbout .more img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}#wowAbout .more span{display:block;padding:6px 10px;font-weight:700;font-size:14px}'+
 '@media(max-width:700px){#wowAbout .ab{grid-template-columns:1fr}#wowAbout .more{grid-template-columns:1fr 1fr}#wowAbout .more a:nth-child(3){display:none}}';
document.head.appendChild(css);
function render(){
  var old=document.getElementById('wowAbout');if(old)old.remove();
  var g=pick();if(!g)return;
  var box=document.createElement('section');box.id='wowAbout';box.setAttribute('aria-label','About this game');
  box.innerHTML='<div class="ab"><div><span class="ey">About this game · '+g.tag+'</span><h2>'+g.name+'</h2><h3>🎮 How to play</h3><p>'+g.how+'</p>'+
   '<div class="tags">'+g.learn.map(function(l,i){return '<span>'+(i?'':'🧠 You learn: ')+l+'</span>'}).join('')+'</div></div>'+
   '<div class="fact"><h3>📜 Did you know?</h3><p>'+g.fact+'</p></div>'+
   '<div class="more"><span class="ey" style="grid-column:1/-1">🎬 Watch &amp; play next</span>'+others(g).map(function(o){return '<a href="'+root+link(o)+'"><img src="'+(/^https?:/.test(o.img)?'':root)+o.img+'" alt="" loading="lazy"><span>'+o.name+'</span></a>'}).join('')+'</div></div>';
  var f=document.querySelector('footer');if(f)f.parentNode.insertBefore(box,f);else document.body.appendChild(box);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
if(which==='vm')addEventListener('hashchange',render);
})();
