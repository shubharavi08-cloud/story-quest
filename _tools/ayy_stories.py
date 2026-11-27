#!/usr/bin/env python3
"""Builds ayyappa-stories.html: the stories, rituals, pooja and pilgrimage guide, one chapter per theme.
Each chapter ends with the songs and games of the Padi Yatra steps that point to it (from _tools/ayy_steps.json).
Run after _tools/ayy_registry.py."""
import os,json,html
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STEPS=json.load(open(os.path.join(ROOT,'_tools','ayy_steps.json')))
CH=[
('birth','Who is Ayyappa? Harihara Sudhan','img/ayyappa_hero.jpg',[
 'Swami Ayyappa is worshipped as <b>Harihara Sudhan</b>, the son of Hari (Vishnu) and Hara (Shiva). He is also called <b>Dharma Sastha</b>, the teacher of what is right, and <b>Manikanta</b>, "the one with a bell at his neck".',
 'The story goes that the demoness <b>Mahishi</b> won a boon that no one could defeat her except a child born of Vishnu and Shiva. When the churning of the ocean was done, Vishnu had taken the form of the enchantress <b>Mohini</b>. From Mohini and Shiva a divine child was born, to end Mahishi\'s cruelty.',
 'That is why Sabarimala is a place where Vaishnava and Shaiva traditions meet, and why pilgrims of every background come together there as equals.']),
('pandalam','Found by the Pamba: the prince of Pandalam','img/ayyappa/river_trail.jpg',[
 'King <b>Rajasekhara</b> of Pandalam had no children. One day, while hunting near the river <b>Pamba</b>, he heard a baby crying and found a glowing boy with a golden bell tied at his neck. A sage told him to take the child home and raise him; he named him <b>Manikanta</b>.',
 'The queen later had a son of her own. Manikanta grew up wise and kind and learnt archery and the scriptures. The king wished to crown him, which made a jealous minister plot against the boy.',
 'Every year before Makaravilakku, Ayyappa\'s sacred ornaments, the <b>Thiruvabharanam</b>, are carried on foot in a procession from the Pandalam palace to Sabarimala to adorn Swami.']),
('manikanta','The tigress milk and the ride home','img/ayyappa/forest_walk.jpg',[
 'The minister persuaded the queen to pretend to be ill, and a physician declared that only <b>tigress milk</b> could cure her. No soldier would go into the forest, so the boy Manikanta went alone.',
 'In the forest he faced and defeated Mahishi. Then he came home <b>riding a tiger</b>, with a herd of tigers behind him. The people of Pandalam understood he was no ordinary child, and the plotters asked forgiveness.',
 'The song <i>Huli Yeri Banda Manikanta</i> ("Manikanta came riding the tiger") remembers this moment.']),
('malikappuram','Mahishi, Malikappurathamma and the Kanni swamis','img/ayyappa/lamps_river.jpg',[
 'When Mahishi was defeated, a beautiful maiden rose from her body, freed from the curse she had lived under. She wished to marry Ayyappa. He told her he had vowed to stay a brahmachari, but promised to marry her in the year when no <b>Kanni swami</b> (first-time pilgrim) comes to Sabarimala.',
 'She waits at her own shrine near the temple, worshipped as <b>Malikappurathamma</b>. Pilgrims offer turmeric, kumkum and coconuts there. Every year new Kanni swamis arrive, and so the promise waits.',
 'First-timers leave arrows at <b>Saramkuthi</b> as a sign that new devotees have come.']),
('vavar','Vavar: the friend at Erumeli','img/ayyappa/forest_crowd.jpg',[
 'Tradition remembers <b>Vavar</b> as a warrior who first fought Ayyappa and then became his closest friend and helper. A shrine to Vavar stands at <b>Erumeli</b>, and another, Vavar Nada, at the Sannidhanam itself.',
 'Pilgrims visit both. It is a living example of friendship and respect across faiths, at the very start and end of the journey.']),
('mandala','The 41-day vrata and the mala','img/ayyappa/kid_prayer.jpg',[
 'The pilgrimage begins at home, weeks earlier. On the day a devotee wears the <b>mala</b> (a chain of tulasi or rudraksha beads, often with Ayyappa\'s locket), they become a <b>swami</b>, and everyone calls them so.',
 'For about <b>41 days</b>, the <b>Mandala vrata</b>, a swami keeps a simple life: early baths and prayers morning and evening, simple vegetarian food, no alcohol or tobacco, kind words, celibacy, and usually black, blue or saffron clothes. Many walk barefoot.',
 'For 2026-27 the season opens on 16 November evening; the Mandala begins on <b>17 November 2026</b> and ends with <b>Mandala Pooja on 27 December 2026</b>. The temple opens again on 30 December for <b>Makaravilakku on 14 January 2027</b> (dates as announced; check the Travancore Devaswom Board before you travel).']),
('irumudi','Kettunira: tying the Irumudi','img/ayyappa/irumudi_kit.jpg',[
 'Before leaving home, the swami ties the <b>Irumudi</b>, "two bundles", in a small ceremony called <b>Kettunira</b> or Irumudi Kettu, led by the guru swami.',
 'The <b>front pouch</b> holds the offerings for Swami: above all a coconut filled with <b>ghee</b>, with rice, camphor, turmeric, betel leaves and areca nut, coins, jaggery and beaten rice. The <b>back pouch</b> holds what the swami needs for the journey.',
 'Carried on the head, the Irumudi is never set on the ground carelessly. Only a swami with the Irumudi may climb the 18 holy steps. At the temple the ghee is poured over Swami in the <b>Neyyabhishekam</b>.']),
('route','The journey: from Erumeli up Neelimala','img/ayyappa/hill_climb.jpg',[
 'Many pilgrims begin at <b>Erumeli</b>, where they paint their faces, dance the joyful <b>Petta Thullal</b> and visit Vavar\'s shrine. The old forest route, the <b>Peruvazhi</b>, is a walk of over 40 km through the forest and passes <b>Kalaketti</b>, the <b>Azhutha</b> river (where each pilgrim picks up a pebble), <b>Kallidumkunnu</b> (where the pebble is dropped), the steep <b>Karimala</b> and down to the <b>Pamba</b>.',
 'From Pamba the climb is about 5 km. The steepest stretch is <b>Neelimala</b>. Then comes <b>Sabari Peedam</b> and <b>Saramkuthi</b>, and the temple at the <b>Sannidhanam</b>.',
 'All along the way, swamis call out <b>"Swamiye Sharanam Ayyappa!"</b> to keep each other going.']),
('pamba','The holy river Pamba','img/ayyappa/river_bath.jpg',[
 'The <b>Pamba</b> is called the <b>Dakshina Ganga</b>, the Ganga of the south. Pilgrims bathe in it before the climb, leaving tiredness and wrong deeds behind.',
 'On festival nights, small lamps are set afloat on the river, the <b>Pamba Vilakku</b>, and pilgrim groups share a feast, the <b>Pamba Sadya</b>.',
 'The river and the forest are part of the <b>Periyar Tiger Reserve</b>. Please carry no plastic and leave nothing behind but flowers.']),
('sabari','Sabari\'s hill','img/ayyappa/stream.jpg',[
 'Sabarimala, "the hill of Sabari", is named after the forest devotee <b>Sabari</b>. In the Ramayana she waited all her life for Lord Rama and offered him berries she had tasted first, so that only the sweet ones reached him.',
 'At <b>Sabari Peedam</b> on the way up, pilgrims remember her patient devotion. The temple stands about 914 m above sea level among the hills of the Western Ghats.']),
('padi','Pathinettam Padi: the 18 holy steps','img/ayyappa/steps_v.jpg',[
 'The temple is reached by the <b>18 golden steps</b>, the Pathinettam Padi. Only swamis who have kept the vrata and carry the Irumudi may climb them. A coconut is broken before climbing.',
 'Many explain the 18 steps as what a person must rise above: the five senses, eight feelings such as desire, anger and pride, the three qualities (sattva, rajas, tamas), and knowledge and ignorance. Others link them to the 18 hills around the temple.',
 'Going down, swamis walk backwards, facing Swami, as a mark of respect.']),
('temple','At the Sannidhanam: Tat Tvam Asi','img/ayyappa/temple_steps.jpg',[
 'At the top, above the shrine, are written the words <b>Tat Tvam Asi</b>: "That thou art". The Swami the pilgrim has walked so far to see is also within the pilgrim, and within every swami beside them.',
 'Ayyappa sits in a yogic pose with a band around his knees, in deep meditation. Prasadam is the sweet <b>Aravana</b> payasam and <b>Appam</b>. Pilgrims also visit the shrines of Malikappurathamma and Vavar.',
 'The temple opens for the Mandala season, for Makaravilakku, and for the first days of each Malayalam month.']),
('rituals','A day at the temple: Neyyabhishekam to Harivarasanam','img/ayyappa_lamps.jpg',[
 'The day begins before dawn. The ghee from the pilgrims\' coconuts is poured over Swami in the <b>Neyyabhishekam</b>, and the ghee comes back to them as prasadam.',
 'At dusk the lamp is waved before Swami, the <b>Deeparadhana</b>, with bells and the cry of "Sharanam!". At <b>Mandala Pooja</b> Swami wears the golden attire, the <b>Thanka Anki</b>; at <b>Makaravilakku</b> he wears the Thiruvabharanam from Pandalam, and a light appears on the hill of Ponnambalamedu.',
 'At night the temple closes with the lullaby <b>Harivarasanam</b>, sung to put Swami to sleep, as the lamps are put out one by one.']),
('sharanam','Sharanam vili: the call of the pilgrims','img/ayyappa/forest_crowd.jpg',[
 'The heartbeat of the pilgrimage is the <b>Sharanam vili</b>: one swami calls "Swamiye!" and all answer "Sharanam Ayyappa!". There are many such calls, one for each name and place on the way.',
 'Kerala temple music works the same way, with the <b>chenda</b> drum, the <b>ilathalam</b> cymbals, the conch and bells keeping one rhythm together.']),
('values','The values of the vrata','img/ayyappa/kid_prayer.jpg',[
 'The vrata is not only about rules. It teaches patience in long queues, sharing food (<b>annadanam</b>), care for elders and children, controlling anger, keeping the forest clean, and respect for all faiths.',
 'Everyone is called <b>Swami</b>, whatever their job or wealth. As the pilgrims say, the journey to Sabarimala is a journey into oneself.']),
('names','The 108 names','img/ayyappa/kid_prayer.jpg',[
 'A <b>japa mala</b> has 108 beads. The <b>Ashtottara Shatanamavali</b> is a prayer of 108 names of Ayyappa, each chanted as "Om … Namah", one bead at a time.',
 'Our 108 Names Mala uses the traditional Mahashastre list, which begins "Om Mahashastre Namah" (the printed text repeats one name, number 60 at 84, and we keep it so the count stays 108).']),
('home','The way home','img/ayyappa/night_river.jpg',[
 'After the darshan, swamis return home carrying prasadam for their families. The vrata ends only at home: the mala is removed at the household prayer place, often with the help of the guru swami, and life returns to normal, a little changed.']),
]
order=[c[0] for c in CH]
by={}
for i,s in enumerate(STEPS):by.setdefault(s['story'],[]).append((i,s))
def esc(x):return html.escape(x,quote=True)
nav=''.join(f'<a href="#{c[0]}">{esc(c[1].split(":")[0])}</a>' for c in CH)
body=''
for cid,title,img,paras in CH:
  links=''
  for i,s in by.get(cid,[]):
    song=f'<a class="chip" href="https://youtu.be/{s["yt"]}" target="_blank" rel="noopener">▶ {esc(s["song"])}</a>' if s.get('yt') else f'<span class="chip off">♪ {esc(s["song"])} · coming soon</span>'
    links+=f'<div class="step"><b>Step {i+1}</b>{song}<a class="chip play" href="{s["key"]}.html">🎮 {esc(s["game"]["en"])}</a></div>'
  body+=f'''
 <article id="{cid}" class="ch"><img src="{img}" alt="" loading="lazy"><div><h2>{title}</h2>{''.join('<p>'+p+'</p>' for p in paras)}{('<div class="steps">'+links+'</div>') if links else ''}</div></article>'''
page=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Swami Ayyappa: stories, rituals and the Sabarimala pilgrimage | World of Wonders Studio</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="The story of Swami Ayyappa for families: Harihara Sudhan, Manikanta of Pandalam, the tigress milk, Malikappuram and Vavar, the 41-day vrata, the Irumudi, the route from Erumeli, the Pamba, the 18 holy steps, Neyyabhishekam, Harivarasanam and the 2026-27 season dates. With the songs and games of each step.">
<meta property="og:title" content="Swami Ayyappa: stories, rituals and the pilgrimage">
<meta property="og:image" content="https://worldofwondersstudio.com/img/ayyappa_hero.jpg">
<link rel="canonical" href="https://worldofwondersstudio.com/ayyappa-stories.html">
<link rel="icon" href="img/wow_logo.png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Mukta:wght@400;600;700&display=swap">
<script type="application/ld+json">{json.dumps({"@context":"https://schema.org","@type":"Article","headline":"Swami Ayyappa: stories, rituals and the Sabarimala pilgrimage","inLanguage":"en","datePublished":"2026-11-16","author":{"@type":"Organization","name":"World of Wonders Studio"},"publisher":{"@id":"https://worldofwondersstudio.com/#org"},"image":"https://worldofwondersstudio.com/img/ayyappa_hero.jpg"})}</script>
<style>
:root{{--night:#1c1442;--ink:#fdf3dc;--muted:#c7bce6;--line:rgba(253,243,220,.14);--marigold:#f6a723;--flame:#ffd35a;--display:"Baloo 2",system-ui,sans-serif;--body:"Mukta",system-ui,sans-serif}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--night);color:var(--ink);font:18px/1.6 var(--body);padding:0 16px 60px}}a{{color:var(--flame)}}
.wrap{{max-width:900px;margin:0 auto;display:flex;flex-direction:column;gap:26px;padding-top:18px}}
h1,h2{{font-family:var(--display);line-height:1.15;margin:0 0 8px}}h1{{font-size:clamp(30px,6vw,48px)}}h1 span{{color:var(--flame)}}h2{{font-size:clamp(22px,4vw,30px);color:var(--flame)}}
.lede{{color:var(--muted);font-size:19px}}
nav.toc{{position:sticky;top:0;z-index:5;display:flex;gap:8px;overflow-x:auto;padding:10px 0;background:linear-gradient(var(--night) 80%,transparent);scrollbar-width:none}}nav.toc a{{flex:none;text-decoration:none;font-size:14px;font-weight:700;border:1px solid var(--line);border-radius:99px;padding:5px 12px;color:var(--ink);background:rgba(255,255,255,.05)}}
.ch{{display:grid;grid-template-columns:220px 1fr;gap:20px;align-items:start;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:22px;padding:18px;scroll-margin-top:60px}}
.ch img{{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:16px;border:1px solid var(--line)}}
@media(max-width:700px){{.ch{{grid-template-columns:1fr}}.ch img{{aspect-ratio:16/9}}}}
.ch p{{margin:0 0 12px}}.steps{{display:grid;gap:8px;margin-top:12px}}.step{{display:flex;flex-wrap:wrap;gap:8px;align-items:center}}.step b{{font-family:var(--display);color:var(--marigold);min-width:62px}}
.chip{{text-decoration:none;font-weight:700;font-size:15px;border-radius:99px;padding:5px 12px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--ink)}}.chip.play{{background:var(--marigold);color:#2b1700;border:0}}.chip.off{{color:var(--muted)}}
.note{{color:var(--muted);font-size:15px}}footer{{color:var(--muted);font-size:14px;text-align:center}}
</style>
<link rel="stylesheet" href="/cursor-wow.css?v=6"></head>
<body>
<div class="wrap">
 <a href="ayyappa.html#steps" class="muted">← 18 steps · 18 songs · 18 games</a>
 <header><span style="color:var(--flame);font-weight:700;letter-spacing:.12em;font-size:13px">SABARIMALA SEASON · FOR FAMILIES</span>
  <h1>Swami Ayyappa: <span>stories, rituals and the pilgrimage</span></h1>
  <p class="lede">Who Ayyappa is, the stories children love, the 41-day vrata and the Irumudi, the forest path, the 18 holy steps and the temple day. Each chapter links to its songs and games on our Padi Yatra. Swamiye Sharanam Ayyappa 🙏</p></header>
 <nav class="toc" aria-label="Chapters">{nav}</nav>
 {body}
 <p class="note">Stories are told here as devotees tell them; families and regions tell some parts differently. Season dates are as announced for 2026-27; please check the Travancore Devaswom Board for the latest before you travel.</p>
 <div><a class="chip play" href="ayyappa.html#steps">🪜 Climb the 18 steps</a> <a class="chip" href="ayyappa.html#songs">▶ All Ayyappa songs</a> <a class="chip" href="https://www.youtube.com/@WorldofWondersstudio?sub_confirmation=1" target="_blank" rel="noopener">Subscribe on YouTube</a></div>
 <footer>© 2026 World of Wonders Studio · by OurSchoolHouse · <a href="index.html">Home</a> · <a href="privacy.html">Privacy</a></footer>
</div>
</body>
</html>
'''
open(os.path.join(ROOT,'ayyappa-stories.html'),'w').write(page)
missing=[s['story'] for s in STEPS if s['story'] not in order]
print('ayyappa-stories.html written,',len(CH),'chapters; missing anchors:',missing)
