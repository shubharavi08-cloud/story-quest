#!/usr/bin/env python3
"""Pull the clean framed paintings (no captions, no titles) out of our Navratri videos.

  python3 extract_paintings.py <video.mp4> <out_dir> [prefix]

The Navratri videos show one sharp painting in a gold frame over a blurred backdrop, with captions BELOW it.
For every second of video we find the sharp rectangle (high local detail) in the top part of the frame,
keep the largest view of each distinct painting, trim the gold border, and save it as <prefix>_NN.jpg
(full resolution, no words). Needs ffmpeg, numpy, Pillow."""
import os, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageFilter

video, out = sys.argv[1], sys.argv[2]
prefix = sys.argv[3] if len(sys.argv) > 3 else os.path.splitext(os.path.basename(video))[0]
os.makedirs(out, exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-i", video, "-vf", "fps=2", os.path.join(tmp, "f%04d.png")], check=True)


def bbox(im):
    """bounding box of the sharp painting in the top 78% of the frame (captions sit lower)"""
    W, H = im.size
    g = np.asarray(im.convert("L").resize((W // 4, H // 4)), np.float32)
    gx, gy = np.abs(np.diff(g, axis=1))[:-1, :], np.abs(np.diff(g, axis=0))[:, :-1]
    e = gx + gy
    e[int(e.shape[0] * .78):, :] = 0
    m = e > 18
    cols, rows = m.mean(0), m.mean(1)
    cs, rs = np.where(cols > .08)[0], np.where(rows > .08)[0]
    if len(cs) < 20 or len(rs) < 20:
        return None
    # largest contiguous run of busy columns / rows
    def run(a):
        best, s, prev = (0, 0), a[0], a[0]
        for v in list(a[1:]) + [10 ** 9]:
            if v != prev + 1:
                if prev - s > best[1] - best[0]:
                    best = (s, prev)
                s = v
            prev = v
        return best
    c0, c1 = run(cs)
    r0, r1 = run(rs)
    return (c0 * 4, r0 * 4, c1 * 4 + 4, r1 * 4 + 4)


def sig(im):
    return np.asarray(im.convert("L").resize((24, 24)), np.float32).ravel()


kept = []  # (signature, area, image)
for f in sorted(os.listdir(tmp)):
    if int(f[1:5]) <= 10:  # first 5 s = title card with words
        continue
    im = Image.open(os.path.join(tmp, f)).convert("RGB")
    b = bbox(im)
    if not b:
        continue
    w, h = b[2] - b[0], b[3] - b[1]
    if w < 300 or h < 300:
        continue
    pad = int(min(w, h) * .03) + 6  # trim the gold frame
    crop = im.crop((b[0] + pad, b[1] + pad, b[2] - pad, b[3] - pad))
    s = sig(crop)
    for i, (s2, a2, _) in enumerate(kept):
        if np.abs(s - s2).mean() < 22:
            if crop.size[0] * crop.size[1] > a2:
                kept[i] = (s, crop.size[0] * crop.size[1], crop)
            break
    else:
        kept.append((s, crop.size[0] * crop.size[1], crop))

for i, (_, _, c) in enumerate(kept, 1):
    c.save(os.path.join(out, f"{prefix}_{i:02d}.jpg"), quality=92)
print(prefix, len(kept), "paintings")
