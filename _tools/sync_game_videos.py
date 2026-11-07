"""Copy each game's unlock video (gate.js data-yt on the game page) into game-info.js as vid:'<YouTube id>'.
Run from the repo root after adding or changing a game:  python3 _tools/sync_game_videos.py"""
import re, json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
gi = root / 'game-info.js'; s = gi.read_text()
changed = 0
for m in list(re.finditer(r"\{id:'([^']+)'[^\n]*?href:'([^']+)'", s)):
    gid, href = m.group(1), m.group(2).split('#')[0]
    page = root / href
    if not page.is_file(): continue
    g = re.search(r'gate\.js[^>]*data-yt=\'([^\']+)\'', page.read_text())
    if not g: continue
    yt = json.loads(g.group(1)); vid = yt.get('en') or next(iter(yt.values()))
    row_start = s.index("{id:'%s'" % gid); row_end = s.index('\n', row_start)
    row = s[row_start:row_end]
    new = re.sub(r",vid:'[^']*'", '', row).replace(f"id:'{gid}',", f"id:'{gid}',vid:'{vid}',", 1)
    if new != row: s = s[:row_start] + new + s[row_end:]; changed += 1
gi.write_text(s); print('rows updated:', changed)
