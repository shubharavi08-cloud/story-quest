#!/usr/bin/env python3
"""World of Wonders blog builder. Standard library only; safe to re-run.

    python3 _tools/blog/build_blog.py            (from the story-quest folder)
    It also adds the blog URLs to sitemap.xml and refreshes the '## Blog posts' list in llms.txt.
    Do NOT run _tools/geo/geo_build.py wow for a blog post: it rewrites about.html from an older template and
    rebuilds sitemap.xml without the hand-added game pages (both seen 7 Nov 2026).

Daily post = one Markdown file in _blog/posts/ named YYYY-MM-DD-slug.md:
    ---
    title: ...          (required)
    slug: ...           (required, lowercase-with-dashes -> /blog/<slug>/)
    date: 2026-11-07    (required; future-dated posts are skipped until that day)
    description: ...    (required, ~150 characters)
    series: A Thought a Day | Deepavali | Dasara | Vedic Maths | Songs | Scam Alert   (optional label)
    tags: a, b, c       (optional)
    video: YOUTUBE_ID   (optional, English video embedded under the title)
    videos: hi=ID, kn=ID  (optional, other-language buttons)
    page: thought.html  (optional, 'Watch and play' button to the site page)
    draft: yes          (optional; skipped)
    ---
Body: same small Markdown subset as the QUAD blog (## / ###, paragraphs, - and 1. lists, > quotes, **bold**,
*italic*, [text](url), raw HTML lines).
Writes blog/index.html, blog/<slug>/index.html, blog/feed.xml, blog/posts.json (read by geo_build.py wow).
"""
import datetime as dt, html, json, pathlib, re, sys

BASE = "https://worldofwondersstudio.com/"
MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
LANGN = {"en": "English", "hi": "हिंदी", "kn": "ಕನ್ನಡ", "te": "తెలుగు"}


def nice_date(d):
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


# ------------------------------------------------------------------ markdown (small, predictable subset)
def inline(s):
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)

    def link(m):
        text, url = m.group(1), m.group(2)
        ext = url.startswith("http") and "worldofwondersstudio.com" not in url
        return f'<a href="{html.escape(url, quote=True)}"' + (' target="_blank" rel="noopener"' if ext else "") + f">{text}</a>"
    return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, s)


def md(text):
    out, para, lst, quote = [], [], None, []

    def flush():
        nonlocal para, lst, quote
        if para:
            out.append("<p>" + inline(" ".join(para)) + "</p>")
            para = []
        if lst:
            tag, items = lst
            out.append(f"<{tag}>" + "".join(f"<li>{inline(i)}</li>" for i in items) + f"</{tag}>")
            lst = None
        if quote:
            out.append("<blockquote><p>" + "<br>".join(inline(q) for q in quote) + "</p></blockquote>")
            quote = []

    for raw in text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            flush(); continue
        m = re.match(r"^(#{2,3})\s+(.*)", line)
        if m:
            flush(); n = len(m.group(1)); out.append(f"<h{n}>{inline(m.group(2))}</h{n}>"); continue
        if line.startswith(">"):
            if para or lst: flush()
            quote.append(line[1:].strip()); continue
        m = re.match(r"^\s*(?:([-*])|(\d+)\.)\s+(.*)", line)
        if m:
            tag = "ul" if m.group(1) else "ol"
            if para or quote or (lst and lst[0] != tag): flush()
            if not lst: lst = (tag, [])
            lst[1].append(m.group(3)); continue
        if line.lstrip().startswith("<"):
            flush(); out.append(line.strip()); continue
        if lst and raw.startswith("  "):
            lst[1][-1] += " " + line.strip(); continue
        if lst or quote: flush()
        para.append(line.strip())
    flush()
    return "\n".join(out)


def read_post(f):
    s = f.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", s, flags=re.S)
    if not m:
        sys.exit(f"{f.name}: missing front matter")
    meta = {}
    for ln in m.group(1).splitlines():
        if ":" in ln:
            k, v = ln.split(":", 1)
            v = v.strip()
            if len(v) >= 2 and v[0] == v[-1] == '"':
                v = v[1:-1]
            meta[k.strip()] = v
    for k in ("title", "slug", "date", "description"):
        if not meta.get(k):
            sys.exit(f"{f.name}: front matter needs '{k}'")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", meta["slug"]):
        sys.exit(f"{f.name}: slug must be lowercase-with-dashes")
    meta["date"] = dt.date.fromisoformat(meta["date"])
    meta["tags"] = [t.strip() for t in meta.get("tags", "").split(",") if t.strip()]
    body = m.group(2).strip()
    meta["html"] = md(body)
    words = len(re.sub(r"<[^>]+>", " ", meta["html"]).split())
    meta["words"], meta["mins"] = words, max(1, round(words / 200))
    meta["url"] = f"{BASE}blog/{meta['slug']}/"
    meta["thumb"] = f"https://i.ytimg.com/vi/{meta['video']}/hqdefault.jpg" if meta.get("video") else BASE + "img/wow_logo.png"
    return meta



CSS = """:root{--night:#1c1442;--night-2:#2a1f5c;--ink:#fdf3dc;--muted:#c7bce6;--line:rgba(253,243,220,.14);--marigold:#f6a723;--flame:#ffd35a;
  --display:"Baloo 2","Trebuchet MS",system-ui,sans-serif;--body:"Mukta","Segoe UI",system-ui,sans-serif;color-scheme:dark}
*{box-sizing:border-box}
html,body{background:var(--night)}
body{margin:0;color:var(--ink);font-family:var(--body);font-size:18px;line-height:1.6}
a{color:var(--flame)}
.wrap{max-width:780px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px)) 60px}
h1,h2,h3{font-family:var(--display);line-height:1.15}
h1{font-size:clamp(28px,5.5vw,44px);margin:20px 0 8px}
h2{font-size:26px;margin:30px 0 8px;color:var(--marigold)} h3{font-size:21px;margin:22px 0 6px;color:var(--flame)}
.crumb{color:var(--muted);font-size:15px;margin-top:16px} .crumb a{color:var(--muted)}
.meta{color:var(--muted);font-size:15px;margin:0 0 14px}
.chip{display:inline-block;background:var(--night-2);border:1px solid var(--line);border-radius:999px;padding:2px 12px;font-size:14px;color:var(--flame);margin-right:6px}
blockquote{margin:16px 0;padding:12px 18px;background:var(--night-2);border-left:4px solid var(--marigold);border-radius:12px}
blockquote p{margin:0}
.vid{position:relative;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#000;border:1px solid var(--line);margin:10px 0}
.vid iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.btns{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 18px}
.btn{display:inline-block;background:var(--marigold);color:#1c1442;font-weight:700;text-decoration:none;border-radius:999px;padding:8px 16px}
.btn.o{background:transparent;color:var(--flame);border:1px solid var(--flame)}
.cards{display:grid;gap:14px;margin-top:16px}
.card{display:grid;grid-template-columns:160px 1fr;gap:14px;background:var(--night-2);border:1px solid var(--line);border-radius:16px;padding:12px;text-decoration:none;color:var(--ink)}
.card img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px}
.card b{font-family:var(--display);font-size:20px;color:var(--flame);display:block;line-height:1.2}
.card span{color:var(--muted);font-size:15px}
@media (max-width:560px){.card{grid-template-columns:1fr}}
.foot{margin-top:40px;color:var(--muted);font-size:15px;border-top:1px solid var(--line);padding-top:16px}
"""


def shell(title, desc, canon, body, ld):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc, quote=True)}">
<meta property="og:title" content="{html.escape(title, quote=True)}">
<meta property="og:description" content="{html.escape(desc, quote=True)}">
<meta property="og:url" content="{canon}">
<link rel="icon" href="/img/wow_logo.png">
<link rel="alternate" type="application/rss+xml" title="World of Wonders Blog" href="/blog/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Mukta:wght@400;600;700&display=swap">
<link rel="stylesheet" href="/family.css?v=20261105c">
<style>{CSS}</style>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
<a class="wow-top" href="/" aria-label="World of Wonders home"><img src="/img/wow_banner.jpg?v=2" alt="World of Wonders · Music · Stories · Creation · Inspiration"></a>
<div class="wrap">
{body}
<div class="foot">World of Wonders Studio · part of the <a href="https://ourschoolhouse.in/" target="_blank" rel="noopener">OurSchoolHouse</a> family ·
<a href="/">Home</a> · <a href="/blog/">Blog</a> · <a href="/thought.html">A Thought a Day</a> · <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a> ·
<a href="https://www.youtube.com/@WorldofWondersstudio" target="_blank" rel="noopener">YouTube</a> · <a href="https://whatsapp.com/channel/0029VbDbyex4o7qNAsIg0H21" target="_blank" rel="noopener">WhatsApp channel</a></div>
</div>
</body>
</html>
"""


ORG = {"@id": BASE + "#org"}


def post_page(p, others):
    vid = ""
    if p.get("video"):
        vid = (f'<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/{p["video"]}?rel=0" '
               f'title="{html.escape(p["title"], quote=True)}" loading="lazy" allow="encrypted-media; picture-in-picture" '
               f'allowfullscreen></iframe></div>')
    btns = []
    for kv in [x.strip() for x in p.get("videos", "").split(",") if "=" in x]:
        k, v = [s.strip() for s in kv.split("=", 1)]
        btns.append(f'<a class="btn o" href="https://www.youtube.com/watch?v={v}" target="_blank" rel="noopener">▶ {LANGN.get(k, k)}</a>')
    if p.get("page"):
        btns.insert(0, f'<a class="btn" href="/{p["page"]}">Watch &amp; take your step</a>')
    more = "".join(f'<li><a href="/blog/{o["slug"]}/">{html.escape(o["title"])}</a></li>' for o in others[:4])
    chips = (f'<span class="chip">{html.escape(p["series"])}</span>' if p.get("series") else "")
    body = (f'<div class="crumb"><a href="/">World of Wonders</a> › <a href="/blog/">Blog</a></div>'
            f'<h1>{html.escape(p["title"])}</h1><p class="meta">{chips}{nice_date(p["date"])} · {p["mins"]} min read</p>'
            f'{vid}' + (f'<div class="btns">{"".join(btns)}</div>' if btns else "") + p["html"] +
            (f'<h2>More from the blog</h2><ul>{more}</ul>' if more else ""))
    ld = {"@context": "https://schema.org", "@type": "BlogPosting", "headline": p["title"], "description": p["description"],
          "datePublished": p["date"].isoformat(), "url": p["url"], "image": p["thumb"], "inLanguage": "en-IN",
          "author": ORG, "publisher": ORG, "mainEntityOfPage": p["url"]}
    if p.get("video"):
        ld["video"] = {"@type": "VideoObject", "name": p["title"], "description": p["description"],
                       "thumbnailUrl": p["thumb"], "uploadDate": p["date"].isoformat(),
                       "embedUrl": f"https://www.youtube.com/embed/{p['video']}"}
    return shell(p["title"] + " · World of Wonders Blog", p["description"], p["url"], body, ld)


def main():
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parents[2]).resolve()
    today = dt.date.today()
    posts = []
    for f in sorted((root / "_blog" / "posts").glob("*.md")):
        p = read_post(f)
        if p.get("draft", "").lower() in ("yes", "true") or p["date"] > today:
            continue
        posts.append(p)
    posts.sort(key=lambda p: (p["date"], p["slug"]), reverse=True)
    out = root / "blog"
    out.mkdir(exist_ok=True)
    for p in posts:
        d = out / p["slug"]; d.mkdir(exist_ok=True)
        (d / "index.html").write_text(post_page(p, [o for o in posts if o is not p]), encoding="utf-8")
    cards = "".join(f'<a class="card" href="/blog/{p["slug"]}/"><img src="{p["thumb"]}" alt="" loading="lazy">'
                    f'<div><b>{html.escape(p["title"])}</b><span>{nice_date(p["date"])} · {html.escape(p["description"])}</span></div></a>'
                    for p in posts)
    idx = (f'<h1>World of Wonders <span style="color:var(--flame)">Blog</span></h1>'
           f'<p class="meta">The stories behind our videos and games: festivals, the Gita, saints, songs and Vedic Maths, '
           f'with one small thing to try at home. Fresh posts regularly.</p><div class="cards">{cards}</div>')
    ld = {"@context": "https://schema.org", "@type": "Blog", "name": "World of Wonders Blog", "url": BASE + "blog/",
          "publisher": ORG, "inLanguage": "en-IN",
          "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": p["url"], "datePublished": p["date"].isoformat()} for p in posts]}
    (out / "index.html").write_text(shell("World of Wonders Blog · Stories, Gita, festivals and Vedic Maths for families",
                                          "Stories behind World of Wonders videos and games: Bharat's festivals, the Bhagavad Gita, saints, songs and Vedic Maths, for children and families.",
                                          BASE + "blog/", idx, ld), encoding="utf-8")
    items = "".join(f"<item><title>{html.escape(p['title'])}</title><link>{p['url']}</link><guid>{p['url']}</guid>"
                    f"<pubDate>{p['date'].strftime('%a, %d %b %Y')} 06:00:00 +0530</pubDate><description>{html.escape(p['description'])}</description></item>"
                    for p in posts)
    (out / "feed.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>World of Wonders Blog</title>'
                                  f'<link>{BASE}blog/</link><description>Stories, Gita, festivals and Vedic Maths for families</description>{items}</channel></rss>\n', encoding="utf-8")
    manifest = {"posts": [{"title": p["title"], "url": p["url"], "date": p["date"].isoformat(), "description": p["description"]} for p in posts],
                "pages": [{"path": "blog/index.html", "priority": 0.7}] + [{"path": f"blog/{p['slug']}/index.html", "priority": 0.6} for p in posts]}
    (out / "posts.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    # sitemap: add any missing blog URL, keep every existing row
    sm = root / "sitemap.xml"
    if sm.exists():
        x = sm.read_text(encoding="utf-8")
        rows = [(BASE + "blog/", today.isoformat(), 0.7)] + [(p["url"], p["date"].isoformat(), 0.6) for p in posts]
        new = "".join(f"  <url><loc>{u}</loc><lastmod>{d}</lastmod><priority>{pr}</priority></url>\n"
                      for u, d, pr in rows if f"<loc>{u}</loc>" not in x)
        if new:
            sm.write_text(x.replace("</urlset>", new + "</urlset>"), encoding="utf-8")
    # llms.txt: replace the blog list block at the end
    lf = root / "llms.txt"
    if lf.exists():
        t = lf.read_text(encoding="utf-8").split("\n## Blog posts (newest first)")[0].rstrip("\n")
        t += "\n\n## Blog posts (newest first)\n" + "".join(
            f"- [{p['title']}]({p['url']}) ({p['date'].isoformat()}): {p['description']}\n" for p in posts)
        lf.write_text(t, encoding="utf-8")
    print(f"built {len(posts)} post(s), blog index, feed, posts.json")


if __name__ == "__main__":
    main()
