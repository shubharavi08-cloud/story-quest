# Aangan — pre-launch audit (2026-11-12)

Status: NOT yet cleared for upload. Audience: all ages, a family game. Adults, especially women in their 40s and 50s, are a core audience, not a side one.

Done since the first audit: zoom re-enabled (viewport no longer blocks pinch-zoom); room tabs and Restore button raised to 44 px; all 11 px text raised to 12 px. Layout, tap-target and gameplay checks re-run and passing (50/50).

## Passing
- Gameplay state tests: 16/16. Subtask tests: 11/11. Mini-game and finale flow tests: 15/15. App/offline tests: 8/8.
- Layout: no horizontal overflow at 360x640, 390x844, 844x390, 640x360 and 768x1024. No page errors or console warnings on load.
- Load time about 0.8 s locally. Game page 204 KB; art and sound 4.1 MB; fonts 383 KB (bundled, no external requests).
- No analytics or tracking code. Progress saved only in the browser (localStorage).
- Metadata: lang="en", title and description present. Manifest, icons and service worker in place.

## Issues to fix before upload
1. DONE Tap targets raised to 44 px.
2. DONE Zoom re-enabled.
3. DONE Small text raised to 12 px.
3a. TODO Body text for older players: raise main reading text to 16 px and check contrast (WCAG AA).
3b. TODO Relaxed-pacing option: a no-timer mode for the kite-cutting and move-limited puzzles.
4. REVIEW Mid-game ads (now a mixed audience; keep ads non-intrusive and never block progress): CrazyGames shows a mid-game ad every third screen change, and a rewarded ad can add moves. Check this against CrazyGames' children's-content rules and India's DPDP Act (children under 18). Consider no ads in the first session and only rewarded ads the child chooses.
5. REVIEW Ad and SDK third parties: the SDK may set its own cookies or storage. Confirm the privacy page covers it.
6. REVIEW Old English stage titles ("Sweep the aangan & fix the jhoola") do not match the three-task wording. Align them.
7. REVIEW Kite cutting and "Lakshmi bomb" crackers are traditional festival images, mild and not violent, but worth a parent-friendly check.

## Age suitability
- Text is mild: no violence, fear or insults. Mild failure words ("Missed!", "Ayyo! Oops!") are gentle.
- Suitable for all ages. Scenes use Ajji and family, not strangers. Themes (family home, rangoli, dosa, carrom, festivals) appeal to adults and older players as much as to children.

## Engagement (for the right reasons)
Present: stars per level, a warmth currency, unlockable rooms, festival rotation, a daily blessing, room reveal, a final house reveal, and story scenes.
Recommended, all non-pressure: a visible house map that fills over time; family photos or recipes unlocked per room; a new festival every month; a "visit Ajji" daily greeting with no penalty for missing a day; sharing a finished house as a picture, with no pressure to invite others.
Avoid for children: countdown timers that punish, streak guilt, paid pressure, and ads that block progress.

## Playtest before launch
Recommended: a short playtest with women in their 40s and 50s in Bengaluru or Mysuru, checking text size, pacing and whether the nostalgia lands.
