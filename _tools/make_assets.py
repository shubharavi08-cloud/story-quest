"""Build JS asset block (shell images + wood texture) as data URIs. usage: make_assets.py cutdir photo out.js"""
import sys, base64, io
from PIL import Image
cut, photo, out = sys.argv[1:4]
def uri(im, fmt, **kw):
    b = io.BytesIO(); im.save(b, fmt, **kw); return f"data:image/{fmt.lower()};base64," + base64.b64encode(b.getvalue()).decode()
shells = []
for i in (1, 2, 3):
    pair = {}
    for side in ("up", "down"):
        im = Image.open(f"{cut}/{side}{i}.png"); im = im.resize((round(im.width * 120 / im.height), 120), Image.LANCZOS)
        pair[side] = uri(im, "WEBP", quality=82, method=6)
    shells.append(pair)
wood = Image.open(photo).crop((0, 1560, 1512, 2016)).resize((640, 193), Image.LANCZOS).convert("RGB")
js = "const SHELLS=" + str(shells).replace("'", '"') + ";\nconst WOOD=\"" + uri(wood, "JPEG", quality=72) + "\";\n"
open(out, "w").write(js); print(len(js) // 1024, "KB")
