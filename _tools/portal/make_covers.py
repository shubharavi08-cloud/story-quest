#!/usr/bin/env python3
"""Cover pictures for game portals, every size they ask for.
  python3 _tools/portal/make_covers.py <game> <art image> "<Title>"
Writes dist/portal/covers/<game>/cover_<W>x<H>.jpg for 1920x1080, 800x1200, 800x800 (CrazyGames),
512x512, 512x384, 200x120 (GameDistribution), 630x500 (itch.io)."""
import os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
game, art, title = sys.argv[1], sys.argv[2], sys.argv[3]
FONT = "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"
SIZES = [(1920, 1080), (800, 1200), (800, 800), (512, 512), (512, 384), (200, 120), (630, 500)]
src = Image.open(os.path.join(ROOT, art)).convert("RGB")
logo = Image.open(os.path.join(ROOT, "img/wow_logo.png")).convert("RGBA")
out = os.path.join(ROOT, "dist", "portal", "covers", game)
os.makedirs(out, exist_ok=True)


def cover(W, H):
    s = max(W / src.width, H / src.height)
    im = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, max(0, int((im.height - H) * .35))
    im = im.crop((x, y, x + W, y + H))
    im = ImageEnhance.Sharpness(im).enhance(1.2 if s > 1.2 else 1.05)
    if min(W, H) < 160:  # tiny thumbnail: picture only
        return im
    g = Image.new("L", (1, H))
    for j in range(H):
        g.putpixel((0, j), int(230 * max(0, (j / H - .55) / .45) ** 1.3))
    shade = Image.new("RGB", (W, H), (20, 12, 50))
    im = Image.composite(shade, im, g.resize((W, H)))
    d = ImageDraw.Draw(im)
    size = int(min(W * .1, H * .13))
    words, lines = title.split(), []
    font = ImageFont.truetype(FONT, size)
    cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) > W * .88 and cur:
            lines.append(cur); cur = w
        else:
            cur = t
    lines.append(cur)
    y0 = H - int(H * .06) - len(lines) * int(size * 1.08)
    for i, ln in enumerate(lines):
        tw = d.textlength(ln, font=font)
        pos = ((W - tw) / 2, y0 + i * int(size * 1.08))
        d.text(pos, ln, font=font, fill=(255, 211, 90), stroke_width=max(2, size // 14), stroke_fill=(28, 20, 66))
    L = int(min(W, H) * .16)
    lg = logo.resize((L, round(L * logo.height / logo.width)), Image.LANCZOS)
    im.paste(lg, (int(min(W, H) * .04), int(min(W, H) * .04)), lg)
    return im


for W, H in SIZES:
    cover(W, H).save(os.path.join(out, f"cover_{W}x{H}.jpg"), quality=90)
print(out)
