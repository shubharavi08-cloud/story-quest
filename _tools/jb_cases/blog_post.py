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


def block(c, s, l, first):
    h = H[l]; col = c["color"]
    steps = "".join(f'<li style="margin:4px 0">{E(x)}</li>' for x in c["steps"][l])
    rules = "".join(f'<li style="margin:4px 0">✅ {E(x)}</li>' for x in c["rules"][l])
    vid = (f'<div style="max-width:340px;margin:12px auto"><iframe width="100%" height="600" style="border:0;border-radius:16px;aspect-ratio:9/16;height:auto" '
           f'src="https://www.youtube.com/embed/{s[l]}" title="{E(c["t"][l])}" allowfullscreen></iframe></div>') if first else \
          f'<p>▶️ <a href="https://youtube.com/shorts/{s[l]}">{h["watch"]}</a></p>'
    link = f'{WOW}?ep={c["n"]}&amp;lang={l}'
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


for c in con:
    s = src[c["n"]]
    body = (f'<div style="font-size:17px;line-height:1.6">'
            + block(c, s, "kn", True) + block(c, s, "en", False) + block(c, s, "hi", False)
            + f'<p style="text-align:center">📲 {H["kn"]["share"]} · <a href="https://whatsapp.com/channel/0029VbE8UbfIXnlyGVUePh2j">WhatsApp</a> · '
              f'<a href="https://www.youtube.com/channel/UCQHpj5OWL4VXSR9UmMofMQw">YouTube</a> · <a href="{WOW}">Mauna\'s Case Book</a></p></div>')
    title = f'{c["t"]["kn"]} | {c["t"]["en"]} | ಮೌನ ಕೇಸ್ {c["n"]}'
    json.dump({"n": c["n"], "title": title, "labels": ["Mauna Shorts", "ಕನ್ನಡ", "English", "हिन्दी"], "html": body,
               "sched": s.get("sched")}, open(os.path.join(out, f'ep{c["n"]:02d}.json'), "w", encoding="utf-8"), ensure_ascii=False)
print("posts:", len(con))
