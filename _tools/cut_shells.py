"""Cut cowrie shells out of a photo with GrabCut, stand them upright, save transparent PNGs.
usage: python3 cut_shells.py photo.jpg outdir
"""
import sys, cv2, numpy as np
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
img = cv2.imread(src)
# (name, x0, y0, x1, y1) — boxes around each shell in the 1512x2016 photo
BOXES = [
    ("down1", 300, 325, 745, 615), ("up1", 845, 190, 1345, 570),
    ("down2", 315, 775, 675, 1035), ("up2", 890, 700, 1345, 1045),
    ("down3", 320, 1155, 670, 1415), ("up3", 930, 1250, 1295, 1505),
]
H = 220  # output height in px
sheet = []
for name, x0, y0, x1, y1 in BOXES:
    pad = 30
    X0, Y0, X1, Y1 = max(0, x0 - pad), max(0, y0 - pad), min(img.shape[1], x1 + pad), min(img.shape[0], y1 + pad)
    crop = img[Y0:Y1, X0:X1].copy()
    mask = np.zeros(crop.shape[:2], np.uint8)
    bg, fg = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(crop, mask, (pad, pad, x1 - x0, y1 - y0), bg, fg, 8, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    # keep the largest blob, fill holes (the mouth slit must stay part of the shell)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    big = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
    m = np.where(lab == big, 255, 0).astype(np.uint8)
    # drop dark shadow pixels (wood/shadow), keep shell body
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    m[gray < 75] = 0
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    m = np.where(lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
    cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    hull = max(cnts, key=cv2.contourArea)
    m = np.zeros_like(m); cv2.drawContours(m, [hull], -1, 255, -1)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    m = cv2.GaussianBlur(m, (5, 5), 0)
    # stand upright: rotate so the long axis is vertical
    (cx, cy), (w, h), ang = cv2.minAreaRect(hull)
    if w > h: ang += 90
    rgba = cv2.cvtColor(crop, cv2.COLOR_BGR2BGRA); rgba[:, :, 3] = m
    D = int(np.hypot(*crop.shape[:2])) + 10
    canvas = np.zeros((D, D, 4), np.uint8)
    oy, ox = (D - crop.shape[0]) // 2, (D - crop.shape[1]) // 2
    canvas[oy:oy + crop.shape[0], ox:ox + crop.shape[1]] = rgba
    M = cv2.getRotationMatrix2D((ox + cx, oy + cy), ang, 1.0)
    M[0, 2] += D / 2 - (ox + cx); M[1, 2] += D / 2 - (oy + cy)
    rot = cv2.warpAffine(canvas, M, (D, D), flags=cv2.INTER_CUBIC, borderValue=(0, 0, 0, 0))
    ys, xs = np.where(rot[:, :, 3] > 20)
    rot = rot[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray(cv2.cvtColor(rot, cv2.COLOR_BGRA2RGBA))
    im = im.resize((round(im.width * H / im.height), H), Image.LANCZOS)
    im.save(f"{out}/{name}.png", optimize=True)
    sheet.append(im)
    print(name, im.size)

# contact sheet on dark and light backgrounds for checking edges
W = sum(i.width for i in sheet) + 20 * (len(sheet) + 1)
cs = Image.new("RGBA", (W, H * 2 + 60), (90, 42, 18, 255))
light = Image.new("RGBA", (W, H + 30), (255, 250, 240, 255)); cs.paste(light, (0, H + 30))
x = 20
for i in sheet:
    cs.alpha_composite(i, (x, 15)); cs.alpha_composite(i, (x, H + 45)); x += i.width + 20
cs.save(f"{out}/_sheet.png")
