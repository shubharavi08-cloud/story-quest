#!/usr/bin/env python3
"""Sharp, word-free Devi paintings for the site from our Navratri YouTube thumbnails.
Each thumbnail has the title text on the left and a framed painting on the right; this finds that painting
(the sharp, detailed area), trims its gold frame, and places it on a soft blurred copy of itself as a 4:3 picture.
  python3 panel_from_thumb.py <thumb.jpg> <out.jpg> [W=960] [H=720]"""
import sys
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
src, out = sys.argv[1], sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 960; H = int(sys.argv[4]) if len(sys.argv) > 4 else 720
im = Image.open(src).convert("RGB"); w, h = im.size
a = np.asarray(im).astype(int); R, G, B = a[..., 0], a[..., 1], a[..., 2]
gold = (R > 170) & (G > 120) & (B < 140) & (R - B > 70)          # the painting's gold frame
frac = gold[int(h * .1):int(h * .9), :].mean(axis=0)
cols = [x for x in range(int(w * .35), w) if frac[x] > .6]
x0, x1 = cols[0], cols[-1]
rf = gold[:, x0 + 20:x1 - 20].mean(axis=1); rows = [y for y in range(h) if rf[y] > .6]
y0, y1 = (rows[0], rows[-1]) if rows else (0, h - 1)
pad = max(8, int((x1 - x0) * .02))              # trim the gold frame
panel = im.crop((x0 + pad, y0 + pad, x1 - pad, y1 - pad))
pw, ph = panel.size
bg = panel.resize((W, int(ph * W / pw))).crop((0, 0, W, H)) if ph * W / pw >= H else panel.resize((int(pw * H / ph), H))
bg = bg.resize((W, H)).filter(ImageFilter.GaussianBlur(28)); bg = ImageEnhance.Brightness(bg).enhance(.55)
s = H / ph; fg = panel.resize((max(1, int(pw * s)), H), Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.2, 60, 2))
bg.paste(fg, ((W - fg.size[0]) // 2, 0))
bg.save(out, quality=90, optimize=True, progressive=True)
print(out, "panel", (x0, y0, x1, y1), "->", fg.size)
