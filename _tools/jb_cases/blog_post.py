#!/usr/bin/env python3
"""Make Jagruth Bharath blog post HTML (Blogger) for each Mauna episode.

Each post: Kannada first (the blog's main language), then English, then Hindi.
Embeds the Kannada Short, lists the trick and rules, and links to the
interactive case on worldofwondersstudio.com (/jagruth-bharath/cases/?ep=N).
Inline styles only (Blogger strips <style>/<script> from posts).

Usage: python3 blog_post.py <src.json> <content.json> <outdir>
Writes <outdir>/ep<NN>.json  {"title": ..., "labels": [...], "html": ...}
"""
import html, json, os, sys

src_p, con_p, out = sys.argv[1:4]
src = {e["n"]: e for e in json.load(open(src_p, encoding="utf-8"))["eps"]}
con = json.load(open(con_p, encoding="utf-8"))["eps"]
os.makedirs(out, exist_ok=True)
WOW = "https://worldofwondersstudio.com/jagruth-bharath/cases/"
E = html.escape
H = {"kn": {"case": "ಕೇಸ್", "says": "ಮಿಸ್ಟರ್ ಪ್ರಾಮಿಸ್ ಹೇಳುತ್ತಾನೆ", "trick": "ಮೌನಾ ಬಯಲು ಮಾಡಿದ ತಂತ್ರ", "rules": "ನೆನಪಿಡಿ",
          "play": "🕵️ ಈ ಕೇಸ್ ಬಗೆಹರಿಸಿ: 3 ಪ್ರಶ್ನೆ ಆಟ, ಕೇಸ್ ಸಾಲ್ವ್ಡ್ ಮುದ್ರೆ ಪಡೆಯಿರಿ!", "help": "ಹಣ ಹೋಯಿತೇ? ಈಗಲೇ ಕರೆ ಮಾಡಿ",
          "watch": "ವಿಡಿಯೋ ನೋಡಿ", "share": "ಈ ಪೋಸ್ಟ್ ಅನ್ನು ನಿಮ್ಮ ಕುಟುಂಬದ WhatsApp ಗ್ರೂಪ್‌ಗೆ ಕಳಿಸಿ."},
     "en": {"case": "Case", "says": "Mr. Promise says", "trick": "The trick Mauna exposes", "rules": "Remember",
            "play": "🕵️ Solve this case: 3-question game, earn your CASE SOLVED stamp!", "help": "Lost money? Call now",
            "watch": "Watch in English", "share": "Share this post in your family WhatsApp group."},
     "hi": {"case": "केस", "says": "मिस्टर प्रॉमिस कहते हैं", "trick": "मौना ने जो चाल पकड़ी", "rules": "याद रखिए",
            "play": "🕵️ यह केस सॉल्व कीजिए: 3 सवालों का खेल, केस सॉल्व्ड ठप्पा पाइए!", "help": "पैसे गए? अभी कॉल कीजिए",
            "watch": "हिंदी में देखिए", "share": "यह पोस्ट अपने परिवार के WhatsApp ग्रुप में भेजिए।"}}
HELPTXT = {"1930": "1930 · cybercrime.gov.in", "1915": "1915 · National Consumer Helpline", "": "1930 · cybercrime.gov.in"}


WA = "https://whatsapp.com/channel/0029VbE8UbfIXnlyGVUePh2j"


def utm(c, s):
    d = (s.get("sched") or "")[:10].replace("-", "") or "evergreen"
    return f'utm_source=blogspot&amp;utm_medium=post&amp;utm_campaign=jb-{d}-{c["slug"]}'


def wa_block():
    return (f'<div style="border:3px solid #1f9d55;border-radius:22px;padding:14px 18px;margin:18px 0;background:#e8f7ee;text-align:center">'
            f'<h3 style="margin:0 0 6px">Join our WhatsApp Channel for daily updates</h3>'
            f'<p style="margin:0 0 10px">ದಿನಕ್ಕೊಂದು ಹೊಸ ಮೌನ ಕೇಸ್ · A new scam alert every day · रोज़ एक नया स्कैम अलर्ट: <a href="{WA}">{WA[8:]}</a></p>'
            f'<a href="{WA}" style="display:inline-block;background:#1f9d55;color:#fff;border-radius:99px;padding:10px 20px;font-weight:800;text-decoration:none">Join the Jagruth Bharath WhatsApp Channel</a></div>')


def block(c, s, l, first):
    h = H[l]; col = c["color"]; long_ = c.get("_weekly")
    steps = "".join(f'<li style="margin:4px 0">{E(x)}</li>' for x in c["steps"][l])
    rules = "".join(f'<li style="margin:4px 0">✅ {E(x)}</li>' for x in c["rules"][l])
    ar, mw, ht = ("16/9", "100%", "360") if long_ else ("9/16", "340px", "600")
    vid = (f'<div style="max-width:{mw};margin:12px auto"><iframe width="100%" height="{ht}" style="border:0;border-radius:16px;aspect-ratio:{ar};height:auto" '
           f'src="https://www.youtube-nocookie.com/embed/{s[l]}?rel=0" title="{E(c["t"][l])}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>') if first else \
          (f'<p>▶️ <a href="https://www.youtube.com/watch?v={s[l]}">{h["watch"]}</a></p>' if long_ else f'<p>▶️ <a href="https://youtube.com/shorts/{s[l]}">{h["watch"]}</a></p>')
    link = f'{WOW}?{"weekly" if long_ else "ep"}={c["n"]}&amp;lang={l}&amp;{utm(c, s)}'
    return f'''
<div style="border:3px solid #2b2140;border-radius:22px;padding:16px 18px;margin:18px 0;background:#fffaf0">
<p style="margin:0"><span style="background:{col};color:#fff;border-radius:99px;padding:3px 12px;font-weight:700">{c["icon"]} {h["case"]} {c["n"]:02d}</span></p>
<h2 style="margin:10px 0 6px">{E(c["t"][l])}</h2>
<p style="background:#fff3c4;border:2px solid #2b2140;border-radius:16px;padding:10px 14px;font-size:1.08em"><b>{h["says"]}:</b> {E(c["bait"][l])}</p>
{vid}
<h3 style="margin:12px 0 4px">🦉 {h["trick"]}</h3><ol style="margin:0;padding-left:22px">{steps}</ol>
<h3 style="margin:12px 0 4px">{h["rules"]}</h3><ul style="list-style:none;margin:0;padding:0">{rules}</ul>
<p style="font-weight:700;margin:12px 0">💡 {E(c["lesson"][l])}</p>
<p style="text-align:center;margin:16px 0"><a href="{link}" style="display:inline-block;background:#ffb703;color:#2b2140;border:3px solid #2b2140;border-radius:99px;padding:12px 22px;font-weight:800;text-decoration:none">{h["play"]}</a></p>
<p style="background:#ffe3ea;border-radius:14px;padding:10px 14px;margin:0"><b>{h["help"]}: {HELPTXT[c.get("help","1930")]}</b></p>
</div>'''


def write(c, s, name, title, labels):
    body = (f'<div style="font-size:17px;line-height:1.6">'
            + block(c, s, "kn", True) + wa_block() + block(c, s, "en", False) + block(c, s, "hi", False)
            + f'<p style="text-align:center">📲 {H["kn"]["share"]} · <a href="{WA}">WhatsApp</a> · '
              f'<a href="https://www.youtube.com/channel/UCQHpj5OWL4VXSR9UmMofMQw">YouTube</a> · <a href="{WOW}?{utm(c, s)}">Mauna\'s Case Book</a></p></div>')
    json.dump({"n": c["n"], "title": title, "labels": labels, "html": body,
               "sched": s.get("sched")}, open(os.path.join(out, name), "w", encoding="utf-8"), ensure_ascii=False)


for c in con:
    s = src[c["n"]]
    write(c, s, f'ep{c["n"]:02d}.json', f'{c["t"]["kn"]} | {c["t"]["en"]} | ಮೌನ ಕೇಸ್ {c["n"]}',
          ["Mauna Shorts", "ಕನ್ನಡ", "English", "हिन्दी"])
wsrc = {e["n"]: e for e in json.load(open(src_p, encoding="utf-8")).get("weekly", [])}
wcon = json.load(open(con_p, encoding="utf-8")).get("weekly", [])
for c in wcon:
    c = dict(c, _weekly=True); s = wsrc[c["n"]]
    write(c, s, f'wk{c["n"]:02d}.json', f'{c["t"]["kn"]} | {s["title_en"]}', ["Mauna Crime Report", "ಕನ್ನಡ", "English", "हिन्दी"])
print("posts:", len(con), "weekly:", len(wcon))
