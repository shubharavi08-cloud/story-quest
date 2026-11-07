"""Facts for geo_build.py. Update dates/prices here, then re-run the builder."""

YT_QUAD = "https://www.youtube.com/channel/UCHbt889LZLim6aD4bz8XrLA"
YT_WOW = "https://www.youtube.com/@WorldofWondersstudio"
WA_QUAD = "https://whatsapp.com/channel/0029Vb9DNhtADTOEAMwyH723"
WA_WOW = "https://whatsapp.com/channel/0029VbDbyex4o7qNAsIg0H21"
OSH = {"@type": "EducationalOrganization", "name": "OurSchoolHouse", "url": "https://ourschoolhouse.in/"}

# ---------------------------------------------------------------- QUAD
Q = "https://quadacademy.org/"
QORG = {"@type": "EducationalOrganization", "@id": Q + "#org", "name": "QUAD Academy",
        "alternateName": ["QUAD by OurSchoolHouse", "QUAD Board Boost"], "url": Q,
        "description": "Live online board-exam preparation for Class 10 students (CBSE, ICSE and State Boards): "
                       "Maths and Science batches, weekly scored mock tests, parent reports on WhatsApp and free "
                       "revision videos on YouTube. A sister concern of OurSchoolHouse.",
        "telephone": "+91-80884-43156", "areaServed": "IN", "parentOrganization": OSH,
        "sameAs": [YT_QUAD, WA_QUAD],
        "founder": [{"@type": "Person", "name": "Shubha M", "jobTitle": "Co-founder and manager, QUAD Academy; educational consultant and content designer, OurSchoolHouse"},
                    {"@type": "Person", "name": "Mihir R Shreshti",
                     "jobTitle": "Creator and head of OurSchoolHouse; co-founder and Board-Exam Coach, QUAD Academy", "alumniOf": "IIT Madras"},
                    {"@type": "Person", "name": "Shwetha J", "jobTitle": "Co-founder and Board-Exam Coach (Maths)"}]}
MIHIR = {"@type": "Person", "name": "Mihir R Shreshti"}
SHWETHA = {"@type": "Person", "name": "Shwetha J"}


def q_course(name, code, days, early, regular, teacher=MIHIR):
    return {"@type": "Course", "name": f"QUAD {name} Board Boost · CBSE Class 10 ({code})",
            "description": f"Six-week live online CBSE Class 10 {name} revision batch: 18 live classes "
                           f"({days}, 6:30–7:30 pm IST), 6 weekly board-pattern mock tests, parent score "
                           "reports on WhatsApp, a doubt group, answer books and notes.",
            "provider": {"@id": Q + "#org"}, "educationalLevel": "Class 10", "inLanguage": "en-IN",
            "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online",
                                  "startDate": "2026-12-07", "endDate": "2027-01-16", "instructor": teacher},
            "offers": [{"@type": "Offer", "price": early, "priceCurrency": "INR", "category": "Early bird",
                        "validThrough": "2026-11-25", "url": Q + "board-boost/#reserve"},
                       {"@type": "Offer", "price": regular, "priceCurrency": "INR", "validFrom": "2026-11-26",
                        "url": Q + "board-boost/#reserve"}]}


def q_master(subject, date, teacher=MIHIR):
    return {"@type": "Event", "name": f"QUAD ₹49 Board Masterclass · Class 10 {subject}",
            "description": "Two-hour live online class: the 20 questions that come almost every year, solved live, "
                           "with a PDF to keep and a doubt session.",
            "startDate": f"{date}T10:30:00+05:30", "endDate": f"{date}T12:30:00+05:30",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {"@type": "VirtualLocation", "url": Q + "masterclass/"},
            "organizer": {"@id": Q + "#org"}, "performer": teacher,
            "offers": {"@type": "Offer", "price": 49, "priceCurrency": "INR", "url": Q + "masterclass/",
                       "availability": "https://schema.org/InStock", "validFrom": "2026-11-01T00:00:00+05:30"},
            "image": Q + "quad_logo.jpg"}


QUAD_LLMS = """# QUAD Academy

> Live online board-exam preparation for Class 10 students in India (CBSE, ICSE and State Boards). Small live batches for Maths and Science taught by a real teacher, a scored mock test every Sunday, weekly parent reports on WhatsApp, and free revision videos on YouTube. A sister concern of OurSchoolHouse (ourschoolhouse.in), India's homeschooling support portal.

## Board Boost · Batch 1 (CBSE Class 10, Board 2027)
- Dates: Mon 7 Dec 2026 to Sat 16 Jan 2027 (6 weeks), live online, 25–40 students per batch
- Maths Board Boost (Maths Standard 041): Mon, Wed, Fri, 6:30–7:30 pm IST, teacher Shwetha J
- Science Board Boost (086): Tue, Thu, Sat, 6:30–7:30 pm IST, teacher Mihir R Shreshti
- Each batch: 18 live classes, 6 weekly board-pattern mocks (Sunday, 90 min), 6 parent score reports on WhatsApp, 24×7 doubt group, answer books and notes, a free last-week doubt clinic
- Fees: one subject ₹1,499 (early bird to 25 Nov 2026; ₹1,999 after); both subjects ₹2,499 (₹2,999 after). Bring a friend: both get ₹500 off. Full refund if the child leaves after the first class.
- Every class is recorded; live classes and long-answer marking are done by a real teacher, not AI.

## Try first
- [₹49 Board Masterclass](https://quadacademy.org/masterclass/) (2 hours live; Maths: Shwetha J, Science: Mihir R Shreshti): the 20 questions that come almost every year, solved live, with a PDF to keep and a doubt session. Maths Sun 22 Nov 2026, Science Sun 29 Nov 2026, 10:30 am–12:30 pm IST. Book on WhatsApp; the ₹49 is adjusted if you join a batch.
- Free Sunday Board Booster: 45-minute class on the QUAD YouTube channel, Sundays 6:00–6:45 pm IST.
- Winter Break Intensive: Sat 26 Dec 2026 to Sun 3 Jan 2027, Maths 10–11 am, Science 11:15 am–12:15 pm, ₹499 per subject, ₹899 both, free for Batch 1 students.
- One-to-one tuition is available on request.

## Teachers
- Shwetha J: co-founder of QUAD Academy, MA, MEd, 15+ years teaching Class 8–10 Maths and Science across CBSE, ICSE, State Board and NIOS; founder of Learn with Shwetha (one-to-one board-exam tuition, Bangalore); teaches the Maths batch.
- Mihir R Shreshti: created, manages and runs OurSchoolHouse; co-founder of QUAD Academy; IIT Madras alumnus, homeschooled and cleared Class 10 and 12 through NIOS; teaches the Science batch.
- Shubha M: co-founder and manager of QUAD Academy; idea provider, educational consultant and content designer for OurSchoolHouse; 25+ years of teaching and content creation; plans courses, sets and marks mocks, writes parent reports, handles admissions.

## Free revision
- [QUAD Academy home](https://quadacademy.org/): free important-question videos for every Class 10 Maths and Science chapter, chapter notes and PDFs, board paper walkthroughs
- [QUAD Quest](https://quadacademy.org/quest.html): free chapter-by-chapter practice game with real board questions, points and streaks
- [QUAD Blog](https://quadacademy.org/blog/): free articles with real CBSE Class 10 board questions solved step by step, common mistakes and study plans

## Links
- [Board Boost page](https://quadacademy.org/board-boost/): batches, timetable, fees, FAQ
- [₹49 Masterclass page](https://quadacademy.org/masterclass/): dates, what you get, how to book
- [Reserve a seat on WhatsApp](https://wa.me/918088443156): +91 80884 43156
- [QUAD Academy on YouTube](https://www.youtube.com/channel/UCHbt889LZLim6aD4bz8XrLA): chapter-wise important questions and past-paper walkthroughs, Class 10 Maths and Science
- [QUAD WhatsApp channel](https://whatsapp.com/channel/0029Vb9DNhtADTOEAMwyH723)
- [OurSchoolHouse](https://ourschoolhouse.in/): sister concern for homeschooling and NIOS, Classes 1–12
"""

SITES = {}
SITES["quad"] = {
    "base": Q,
    "llms": QUAD_LLMS,
    "manifest": "blog/posts.json",
    "llms_posts_heading": "## Blog posts (newest first)",
    "pages": [
        {"path": "index.html", "priority": 1.0,
         "title": "QUAD Academy · Free CBSE Class 10 Maths & Science Revision Videos",
         "jsonld": [QORG, {"@type": "WebSite", "name": "QUAD Academy", "url": Q, "publisher": {"@id": Q + "#org"}}]},
        {"path": "quest.html", "priority": 0.8,
         "jsonld": [{"@type": "LearningResource", "name": "QUAD Quest", "url": Q + "quest.html",
                     "description": "Learn each CBSE Class 10 Maths and Science chapter in four stages (Learn, Grow, "
                                    "Prepare, Build) with real board questions, points, streaks and spaced revision.",
                     "learningResourceType": "Game", "educationalLevel": "Class 10", "isAccessibleForFree": True,
                     "inLanguage": "en-IN", "publisher": {"@id": Q + "#org"}}]},
        {"path": "board-boost/index.html", "priority": 0.9,
         "title": "QUAD Board Boost · CBSE Class 10 Maths & Science Live Batches 2027",
         "faq_from_details": True,
         "jsonld": [q_course("Maths", "Maths Standard 041", "Mon, Wed, Fri", 1499, 1999, SHWETHA),
                    q_course("Science", "Science 086", "Tue, Thu, Sat", 1499, 1999),
                    {"@type": "Course", "name": "QUAD Winter Break Intensive · Class 10 Maths & Science",
                     "description": "Nine days of daily practice on the most-asked board questions, ending with a "
                                    "full mock paper.", "provider": {"@id": Q + "#org"},
                     "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online",
                                           "startDate": "2026-12-26", "endDate": "2027-01-03"},
                     "offers": {"@type": "Offer", "price": 499, "priceCurrency": "INR", "url": Q + "board-boost/"}}],
         "replace": [('<meta property="og:url" content="https://quadacademy.org/">',
                      '<meta property="og:url" content="https://quadacademy.org/board-boost/">')]},
        {"path": "masterclass/index.html", "priority": 0.9, "faq_from_details": True,
         "jsonld": [q_master("Maths", "2026-11-22", SHWETHA), q_master("Science", "2026-11-29")]},
    ],
}

# ---------------------------------------------------------------- World of Wonders
W = "https://worldofwondersstudio.com/"
WORG = {"@type": "Organization", "@id": W + "#org", "name": "World of Wonders Studio",
        "alternateName": "Wow studio", "url": W, "logo": W + "img/wow_logo.png",
        "description": "Free animated stories, games, devotional songs and daily thoughts on Bharat's festivals, "
                       "epics, scriptures and Vedic Maths, in English, Hindi and Kannada, for children and families.",
        "sameAs": [YT_WOW, WA_WOW, "https://jagruthbharath.blogspot.com"],
        "parentOrganization": OSH}
LANGS = ["en", "hi", "kn"]

DEEPAVALI = [  # (file, title, episode)
    ("road-to-ayodhya.html", "Road to Ayodhya", 1), ("samudra-manthan.html", "Samudra Manthan", 2),
    ("lagori.html", "Lagori Strike", 3), ("archery.html", "Satyabhama's Arrow", 4),
    ("pallanguzhi.html", "Lakshmi's Cowries", 5), ("catch-drops.html", "Catch Every Drop", 6),
    ("navakankari.html", "Bali's Promise", 7), ("yamuna-thali.html", "Yamuna's Thali", 8)]

DASARA_GAMES = [  # (file, title, day label, Devi)
    ("navadurga-match.html", "Navadurga Match", "Start here", "the nine forms of Maa Durga"),
    ("climb-himalaya.html", "Climb the Himalaya", "Day 1", "Maa Shailaputri"),
    ("japa-mala.html", "Japa Mala Beads", "Day 2", "Maa Brahmacharini"),
    ("ring-the-bell.html", "Ring the Bell", "Day 3", "Maa Chandraghanta")]

FAQ = [
    ("What is World of Wonders Studio?",
     "World of Wonders Studio makes free animated stories, games, devotional songs and daily thoughts on Bharat's "
     "festivals, epics, scriptures and Vedic Maths, for children and families. Watch the story, play the game, learn "
     "together. It is a sister site of OurSchoolHouse and QUAD Academy."),
    ("Is it free?", "Yes. All the games, stories, songs and videos on this site and on our YouTube channel are free. "
                    "Printable workbooks and story books are coming soon."),
    ("Which languages are available?", "English, Hindi and Kannada. The Dasara and Navratri videos are also in Telugu."),
    ("What Deepavali games are there?",
     "Diya ki Bharat Yatra is an 8-episode cartoon series in which Diya, a little clay lamp, travels across India and "
     "finds each region's own Deepavali story. Every episode has a game: Road to Ayodhya, Samudra Manthan, Lagori "
     "Strike, Satyabhama's Arrow, Lakshmi's Cowries, Catch Every Drop, Bali's Promise and Yamuna's Thali, plus the "
     "Light Up Deepavali finale where you light 24 diyas. Each game opens after you watch its story video."),
    ("What Dasara games are there?",
     "A game for each day of Navratri, each with its own way of playing and a short story of that day's Devi: "
     "Navadurga Match (a sliding picture puzzle of the nine Devis), Climb the Himalaya (Day 1, Maa Shailaputri), "
     "Japa Mala Beads (Day 2, Maa Brahmacharini) and Ring the Bell (Day 3, Maa Chandraghanta). More days are coming. "
     "Each game opens after you watch its Navratri video."),
    ("What is Vedic Maths Gurukul Games?",
     "Free Vedic Maths practice games for Classes 6–10. Six tricks for fast mental maths, each a game adventure with "
     "Ganak, Meera, Acharya ji and Chintu that starts with a short lesson from Acharya ji. Progress is saved on your "
     "device."),
    ("What is Scam Alert (Jagruth Bharath)?",
     "Games and stories built from real Indian scam cases. Mauna the detective owl explains how Mr. Promise, a "
     "scammer jackal, tricks people. Play Spot the Scam, Mr. Promise is calling, and the Family Safety Check, in "
     "English, Hindi and Kannada. If you are a victim of cyber fraud in India, call the national helpline 1930."),
    ("What is A Thought a Day?", "One story, one shloka and one small step to apply it, every day, in English, Hindi "
                                 "and Kannada."),
    ("Where can I hear your songs?", "The Songs section on our home page has our bhajans and festival songs for "
                                     "Deepavali and Lakshmi Puja, Kannada Rajyotsava, Navratri and Dasara, and saints' "
                                     "and wisdom songs. They are also on our YouTube channel."),
    ("How do I get new episodes?", "Subscribe to World of Wonders Studio on YouTube, follow our WhatsApp channel, or "
                                   "join the family with the sign-up box at the bottom of any page."),
]


def faq_ld(items):
    return {"@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]}


def about_html():
    import html as h
    qa = "\n".join(f"<details><summary>{h.escape(q)}</summary><p>{h.escape(a)}</p></details>" for q, a in FAQ)
    games = "\n".join(f'<li><a href="{f}">{h.escape(t)}</a> · Episode {n} game</li>' for f, t, n in DEEPAVALI)
    games += "\n" + "\n".join(f'<li><a href="{f}">{h.escape(t)}</a> · Dasara {h.escape(d)} game</li>' for f, t, d, _ in DASARA_GAMES)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>About World of Wonders Studio · Free festival stories, games and songs</title>
<meta name="description" content="About World of Wonders Studio: free animated stories, games, bhajans and daily thoughts on Bharat's festivals, epics, scriptures and Vedic Maths, in English, Hindi and Kannada.">
<link rel="icon" href="img/wow_logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Mukta:wght@400;600;700&display=swap">
<link rel="stylesheet" href="family.css?v=20261105c">
<style>
:root{{--night:#1c1442;--night-2:#2a1f5c;--ink:#fdf3dc;--muted:#c7bce6;--line:rgba(253,243,220,.14);--marigold:#f6a723;--flame:#ffd35a;
  --display:"Baloo 2","Trebuchet MS",system-ui,sans-serif;--body:"Mukta","Segoe UI",system-ui,sans-serif;color-scheme:dark}}
*{{box-sizing:border-box}}
html,body{{background:var(--night)}}
body{{margin:0;color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.55}}
a{{color:var(--flame)}}
.wrap{{max-width:860px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px)) 60px}}
h1,h2{{font-family:var(--display);line-height:1.1}}
h1{{font-size:clamp(30px,6vw,48px);margin:22px 0 8px}} h1 span{{color:var(--flame)}}
h2{{font-size:26px;margin:32px 0 10px;color:var(--marigold)}}
.lede{{color:var(--muted);margin:0 0 10px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}}
.grid a{{display:block;background:var(--night-2);border:1px solid var(--line);border-radius:16px;padding:14px 16px;text-decoration:none;color:var(--ink)}}
.grid b{{font-family:var(--display);font-size:20px;display:block;color:var(--flame)}}
.grid span{{color:var(--muted);font-size:15px}}
ul{{padding-left:20px}} li{{margin:4px 0}}
details{{background:var(--night-2);border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin:10px 0}}
summary{{cursor:pointer;font-weight:700}} details p{{margin:8px 0 0;color:var(--muted)}}
</style>
</head>
<body>
<a class="wow-top" href="index.html" aria-label="World of Wonders home"><img src="img/wow_banner.jpg?v=2" alt="World of Wonders · Music · Stories · Creation · Inspiration"></a>
<div class="wrap">
<h1>About <span>World of Wonders</span></h1>
<p class="lede">Free animated stories, games, bhajans and daily thoughts on Bharat's festivals, epics, scriptures and Vedic Maths, for every age. In English, हिन्दी and ಕನ್ನಡ.</p>

<h2>What's here</h2>
<div class="grid">
<a href="index.html#deepavali"><b>Deepavali</b><span>Diya ki Bharat Yatra: 8 stories, 8 games and a grand finale.</span></a>
<a href="index.html#dasara"><b>Dasara · Navratri</b><span>Nine nights, nine forms of Maa Durga: 14 story and song videos in Hindi, Kannada and Telugu.</span></a>
<a href="vedic-maths/"><b>Vedic Maths Gurukul Games</b><span>6 tricks for fast mental maths, Classes 6–10.</span></a>
<a href="jagruth-bharath/"><b>Scam Alert</b><span>Real scam cases with Mauna the detective owl.</span></a>
<a href="thought.html"><b>A Thought a Day</b><span>One story, one shloka, one small step.</span></a>
<a href="index.html#songs"><b>Songs</b><span>Bhajans and festival songs: Deepavali, Rajyotsava, Navratri, saints' songs.</span></a>
</div>

<h2>Deepavali games</h2>
<ul>
{games}
<li><a href="finale.html">Light Up Deepavali</a> · grand finale</li>
</ul>

<h2>Scam Alert games</h2>
<ul>
<li><a href="jagruth-bharath/spot-the-scam.html">Spot the Scam</a> · 12 real-style messages: scam or safe?</li>
<li><a href="jagruth-bharath/mr-promise-calling.html">Mr. Promise is calling</a> · chat with a scammer and try to escape</li>
<li><a href="jagruth-bharath/family-safety-check.html">Family Safety Check</a> · ten questions, a to-do list and a share card</li>
</ul>

<h2>Questions</h2>
{qa}

<h2>Follow us</h2>
<p><a href="{YT_WOW}" target="_blank" rel="noopener">YouTube: World of Wonders Studio</a> · <a href="{WA_WOW}" target="_blank" rel="noopener">WhatsApp channel</a> · <a href="https://jagruthbharath.blogspot.com" target="_blank" rel="noopener">Jagruth Bharath blog</a></p>
</div>
<footer class="wow-foot"><div class="wf-in">
<a class="wf-brand" href="index.html"><img src="img/wow_logo.png" alt=""><span><b>World of Wonders Studio</b><small>Music · Stories · Creation · Inspiration</small></span></a>
<nav class="wf-links"><a href="index.html">Home</a> · <a href="index.html#deepavali">Deepavali</a> · <a href="vedic-maths/">Vedic Maths</a> · <a href="https://www.youtube.com/@WorldofWondersstudio" target="_blank" rel="noopener">YouTube</a></nav>
<div class="wf-sis">Sister sites: <a href="https://ourschoolhouse.in" target="_blank" rel="noopener">OurSchoolHouse</a> · <a href="https://quadacademy.org" target="_blank" rel="noopener">QUAD Academy</a></div>
<div class="wf-c">© 2026 World of Wonders Studio · Watch the story, play the game, learn together.</div>
</div></footer>
<script src="join.js?v=2" defer></script>
</body>
</html>
"""


def wow_llms():
    g = "\n".join(f"- [{t}]({W}{f}): Deepavali Episode {n} game, English/Hindi/Kannada" for f, t, n in DEEPAVALI)
    faq = "\n".join(f"- **{q}** {a}" for q, a in FAQ)
    dg = "\n".join(f"- [{t}]({W}{f}): Dasara {d} game about {v}, English/Hindi/Kannada" for f, t, d, v in DASARA_GAMES)
    return f"""# World of Wonders Studio

> Free animated stories, games, devotional songs and daily thoughts on Bharat's festivals, epics, scriptures and Vedic Maths, for children and families, in English, Hindi and Kannada. Watch the story, play the game, learn together. Sister site of OurSchoolHouse (ourschoolhouse.in) and QUAD Academy (quadacademy.org).

## Sections
- [Home]({W}): all sections, Deepavali and Dasara video hubs
- [Songs]({W}#songs): bhajans and festival songs for Deepavali, Rajyotsava, Navratri and Dasara, saints and wisdom songs
- [About and FAQ]({W}about.html): what is on the site, every game, common questions
- [Vedic Maths Gurukul Games]({W}vedic-maths/): free mental-maths practice games for Classes 6–10 with Ganak, Meera, Acharya ji and Chintu
- [Scam Alert · Jagruth Bharath]({W}jagruth-bharath/): real Indian scam cases explained by Mauna the detective owl; games in English, Hindi and Kannada
- [A Thought a Day]({W}thought.html): one story, one shloka, one small step, daily
- [Books]({W}books.html): Vedic Maths workbooks and story books (coming soon)

## Deepavali: Diya ki Bharat Yatra (8 episodes + finale)
{g}
- [Light Up Deepavali]({W}finale.html): finale, four mini-games, light 24 diyas

## Dasara · Navratri games (one per day, more coming)
{dg}

## Scam Alert games
- [Spot the Scam]({W}jagruth-bharath/spot-the-scam.html): 12 real-style messages, scam or safe?
- [Mr. Promise is calling]({W}jagruth-bharath/mr-promise-calling.html): chat with a scammer and try to escape
- [Family Safety Check]({W}jagruth-bharath/family-safety-check.html): ten questions, free to-do list

## FAQ
{faq}

## Follow
- [YouTube: World of Wonders Studio]({YT_WOW})
- [WhatsApp channel]({WA_WOW})
- [Jagruth Bharath blog](https://jagruthbharath.blogspot.com)
"""


def game(f, t, n):
    return {"path": f, "priority": 0.6,
            "description": f"{t}: a free Deepavali game from Diya ki Bharat Yatra, Episode {n}, by World of Wonders "
                           "Studio. Watch the story, then play. English, Hindi and Kannada.",
            "jsonld": [{"@type": "VideoGame", "name": t, "url": W + f, "genre": "Educational",
                        "gamePlatform": "Web browser", "inLanguage": LANGS, "isAccessibleForFree": True,
                        "audience": {"@type": "Audience", "audienceType": "Children and families"},
                        "isPartOf": {"@type": "CreativeWorkSeries", "name": "Diya ki Bharat Yatra"},
                        "publisher": {"@id": W + "#org"}}]}


def dgame(f, t, d, v):
    return {"path": f, "priority": 0.6,
            "description": f"{t}: a free Dasara game for Navratri ({d}) about {v}, by World of Wonders Studio. "
                           "Watch the story, then play. English, Hindi and Kannada.",
            "jsonld": [{"@type": "VideoGame", "name": t, "url": W + f, "genre": "Educational",
                        "gamePlatform": "Web browser", "inLanguage": LANGS, "isAccessibleForFree": True,
                        "audience": {"@type": "Audience", "audienceType": "Children and families"},
                        "isPartOf": {"@type": "CreativeWorkSeries", "name": "Dasara · Navratri games"},
                        "publisher": {"@id": W + "#org"}}]}


SITES["wow"] = {
    "base": W,
    "llms": wow_llms(),
    "extra_files": {"about.html": about_html()},
    "pages": [
        {"path": "index.html", "priority": 1.0,
         "jsonld": [WORG, {"@type": "WebSite", "name": "World of Wonders Studio", "url": W,
                           "inLanguage": LANGS, "publisher": {"@id": W + "#org"}}],
         "replace": [('<a href="books.html">Books</a> · <a href="',
                      '<a href="books.html">Books</a> · <a href="about.html">About</a>')]},
        {"path": "about.html", "priority": 0.9, "jsonld": [faq_ld(FAQ)]},
        {"path": "vedic-maths/index.html", "priority": 0.9,
         "jsonld": [{"@type": "LearningResource", "name": "Vedic Maths Gurukul Games", "url": W + "vedic-maths/",
                     "description": "Free Vedic Maths practice games for Class 6–10: six mental-maths tricks, each a "
                                    "game with a short lesson from Acharya ji.",
                     "learningResourceType": "Game", "educationalLevel": "Class 6–10", "teaches": "Vedic Maths",
                     "isAccessibleForFree": True, "inLanguage": "en", "publisher": {"@id": W + "#org"}}]},
        {"path": "jagruth-bharath/index.html", "priority": 0.9,
         "jsonld": [{"@type": "CollectionPage", "name": "Jagruth Bharath Scam Alert Games",
                     "url": W + "jagruth-bharath/", "inLanguage": LANGS,
                     "description": "Real Indian scam cases with Mauna the detective owl: watch the video, read "
                                    "the case file, play the game.", "publisher": {"@id": W + "#org"}}]},
        {"path": "jagruth-bharath/spot-the-scam.html", "jsonld": []},
        {"path": "jagruth-bharath/mr-promise-calling.html", "jsonld": []},
        {"path": "jagruth-bharath/family-safety-check.html", "jsonld": []},
        {"path": "thought.html", "priority": 0.8, "jsonld": []},
        {"path": "books.html", "priority": 0.5, "jsonld": []},
        *[game(f, t, n) for f, t, n in DEEPAVALI],
        *[dgame(*g) for g in DASARA_GAMES],
        {"path": "finale.html",
         "description": "Light Up Deepavali: fly across India with Diya and play four mini-games to light 24 diyas. "
                        "A free game by World of Wonders Studio.", "jsonld": []},
    ],
}
