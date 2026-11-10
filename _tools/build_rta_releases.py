"""Build the Road to Ayodhya release packages: one folder + zip per platform from the single game source.

usage:  python3 _tools/build_rta_releases.py <out-dir> [--qa-report qa_report.md] [--media media-dir]

Creates <out-dir>/{crazygames,poki,gamedistribution,standalone}/ and a .zip of each.
Every package = the same game files with ONE platform adapter switched on (window.WOW_PORTAL),
the QA test hook removed, plus metadata.json, DESCRIPTION.md, RELEASE_NOTES.md and the QA report.
Run from the repo root (the folder that contains games/road-to-ayodhya-3d)."""
import sys, os, re, json, shutil, zipfile, datetime

VERSION = "2.0.0"
SRC = "games/road-to-ayodhya-3d"
FILES = ["index.html", "game.js", "minigames.js", "platform.js", "three.module.min.js"]
DIRS = ["data", "fonts", "img"]
TARGETS = {
    "crazygames":       dict(portal="crazygames",       sdk="CrazyGames HTML5 SDK v3 (loaded from sdk.crazygames.com)"),
    "poki":             dict(portal="poki",             sdk="Poki SDK v2 (loaded from game-cdn.poki.com)"),
    "gamedistribution": dict(portal="gamedistribution", sdk="GameDistribution HTML5 SDK (needs the game ID from the GD dashboard in WOW_GD_ID)"),
    "standalone":       dict(portal="standalone",       sdk="none: no SDK, no ads, no outside requests (worldofwondersstudio.com, OSH)"),
}
TITLE = "Road to Ayodhya: Snakes & Ladders Adventure"
DESCRIPTION = """Road to Ayodhya is a nine-level snakes and ladders adventure that follows the journey of the Ramayana, from Ayodhya to Mithila, the forests of Chitrakoot and Dandakaranya, Panchavati, Kishkindha, Rameswaram, Lanka and home again.

Every board is different. Ladders lift you, snakes pull you down, and special squares bring stars, treasures, questions, mysteries, checkpoints and a new mini-game on each level: lift Shiva's bow, find the golden deer, pass a message with Hanuman's friends, build the bridge to Lanka and more.

Play against Diya (the computer) or pass the device between up to four players. Progress, stars and badges are saved in the browser. Languages: English, Hindi, Kannada."""
INSTRUCTIONS = """Goal: be the first to reach square 100.

Mouse / touch: tap ROLL (or the dice tray) to roll. Tap the answers and buttons on the cards that open.
Keyboard: Space or Enter = roll · M = menu · Esc = close a card.

Ladders take you up, snakes take you down. A six gives another roll. You need the exact number to land on 100.
Special squares: Star +10 · Treasure +20 · Question (right answer: +15 and 2 steps) · Mystery (a surprise) · Bonus (roll again) · Challenge (mini-game: +25 and 3 steps) · Story (a short scene) · Checkpoint (a snake cannot pull you below it) · Obstacle (answer right or miss a turn).
Stars for each level: win · score 60 or more · get bitten once or less. Winning a level opens the next one."""
NOTES = f"""Version {VERSION} ({datetime.date.today()})
- Full rebuild as a nine-level adventure: flat, readable board with numbers always visible above snakes and ladders.
- Special squares, story cards, 36-question bank (3 difficulty levels), 8 mini-games, badges, journey map.
- Auto-save and restore of the game in progress; settings for music, sounds, fast moves, language, question level.
- One platform adapter per build (CrazyGames / Poki / GameDistribution / standalone); fonts and libraries bundled."""
ASSETS = """Asset register
- Game code, board art (drawn in code), snakes, ladders, tokens, dice, sound effects and music (all synthesised in code with Web Audio): original work, World of Wonders Studio.
- img/diya_wave.png, img/return.jpg, img/wow_logo.png: World of Wonders Studio's own artwork (Diya character, Return to Ayodhya scene, studio logo).
- three.module.min.js: three.js r160, MIT licence.
- Fonts: Baloo 2, Baloo Tamma 2 (Ek Type) and Mukta (Ek Type): SIL Open Font Licence 1.1.
- Emoji pictures on squares and cards are drawn by the player's own device font (no emoji font is shipped).
- Story: retold from the traditional Ramayana in our own words; no modern adaptation, script or recording is copied."""

def build(out, qa_report=None, media=None):
    made = []
    for name, cfg in TARGETS.items():
        d = os.path.join(out, name)
        shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
        for f in FILES: shutil.copy(os.path.join(SRC, f), os.path.join(d, f))
        for sub in DIRS: shutil.copytree(os.path.join(SRC, sub), os.path.join(d, sub))
        # one adapter switched on
        p = os.path.join(d, "index.html"); h = open(p, encoding="utf-8").read()
        h, n = re.subn(r"window\.WOW_PORTAL='[^']*'", "window.WOW_PORTAL='%s'" % cfg["portal"], h); assert n == 1
        h = re.sub(r"\?v=\d+\w*", "?v=" + VERSION, h)
        if name != "standalone": h = h.replace('<meta name="robots" content="noindex">\n', '')
        open(p, "w", encoding="utf-8").write(h)
        # no test hooks in a release
        p = os.path.join(d, "game.js"); g = open(p, encoding="utf-8").read()
        g, n1 = re.subn(r"const QA=new URLSearchParams\(location\.search\)\.has\('qa'\);", "const QA=false;", g)
        g, n2 = re.subn(r"\nif\(QA\)window\.__rta=\{.*?\};\n", "\n", g, flags=re.S)
        assert n1 == 1 and n2 == 1, (n1, n2)
        open(p, "w", encoding="utf-8").write(g)
        meta = dict(title=TITLE, version=VERSION, platform=name, sdk=cfg["sdk"], build_date=str(datetime.date.today()),
                    category="Board / Casual", orientation="portrait and landscape (responsive)", controls=["mouse", "touch", "keyboard"],
                    languages=["en", "hi", "kn"], players="1 to 4 on one device", age_guidance="all ages; no chat, no accounts, no personal data collected",
                    developer="World of Wonders Studio", entry="index.html")
        json.dump(meta, open(os.path.join(d, "metadata.json"), "w"), indent=1)
        open(os.path.join(d, "DESCRIPTION.md"), "w").write(f"# {TITLE}\n\n## Description\n{DESCRIPTION}\n\n## Instructions\n{INSTRUCTIONS}\n\n## {ASSETS}\n")
        open(os.path.join(d, "RELEASE_NOTES.md"), "w").write(NOTES + "\n")
        if qa_report and os.path.exists(qa_report): shutil.copy(qa_report, os.path.join(d, "QA_REPORT.md"))
        if media and os.path.isdir(media): shutil.copytree(media, os.path.join(d, "_store_media"))
        # zip: game files at the top level (portals want index.html in the root); store media and reports stay outside the upload zip
        z = os.path.join(out, f"road-to-ayodhya-{name}-{VERSION}.zip")
        with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
            for root, _, fs in os.walk(d):
                if "_store_media" in root: continue
                for f in fs:
                    if f.endswith(".md") or f == "metadata.json": continue
                    full = os.path.join(root, f); zf.write(full, os.path.relpath(full, d))
        size = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(d) if "_store_media" not in r for f in fs)
        made.append((name, round(size / 1048576, 2), round(os.path.getsize(z) / 1048576, 2)))
    return made

if __name__ == "__main__":
    a = sys.argv[1:]
    qa = a[a.index("--qa-report") + 1] if "--qa-report" in a else None
    media = a[a.index("--media") + 1] if "--media" in a else None
    for name, mb, zmb in build(a[0], qa, media): print(f"{name}: {mb} MB unpacked, zip {zmb} MB")
