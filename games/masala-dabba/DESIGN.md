# Masala Dabba — design note (draft, not approved for build)

Status: design only. No code yet. Build waits for Shubha's approval.
Studio: World of Wonders Studio, Bangalore. Written 2026-11-12.

## Concept

A masala dabba is the seven-compartment steel spice box found in almost every South Indian kitchen. In the game, Ajji's dabba has gone out of order after a long monsoon: spices are mixed up, lids are rusted, and the family's recipes can't be cooked until each compartment is set right. The player sorts, pours and rebuilds the spices so a dish can be cooked.

Target: ages 6 to 12, in Kannada, Hindi and English, playable in one hand on a phone. Same world as Aangan (Ajji, Meera and Arjun), so it can share characters and sounds.

## Core loop (about 60 to 90 seconds per round)

1. Look at the target: a dish card shows which spices go in and how many of each (for example, 2 jeera, 1 haldi, 1 rai).
2. Tap a compartment to lift its lid, then tap another compartment to pour. Pouring moves a whole stack of one spice, so a single move can fix several grains at once.
3. Each spice has a colour and a shape. Mixed compartments show two colours. Only one spice may sit in a compartment at a time.
4. Limited moves: a small counter, like Aangan's move limit, keeps the puzzle honest. Ajji can add 3 extra moves for a short festival-song clip (optional, never forced).
5. When the target matches, the dish is cooked and a short story beat plays from the family (reusing the Aangan scene format).

## Levels

- Pack 01 (about 24 levels): one spice pair per level, 3 compartments, no lids. Teaches pour and stack.
- Pack 02 (about 24 levels): add rusty lids (tap twice to open), 5 compartments.
- Pack 03 (about 24 levels): full 7-compartment dabba, two dishes per level, shared spices.
- Each pack is one dish family: idli-sambar, bisibele bath, puliogare, kesari bath, rasam, chutney.
- Level data goes in a JSON file like Aangan's levels pack, with a generator script, so new packs don't need code changes.
- Festival packs come monthly (Deepavali, Ugadi, Dasara), matching the Aangan calendar.

## Art direction

- Warm, clean Mysore-style kitchen: teak shelf, brass and steel tones, a little gold. Same palette family as Aangan's room art so the two games feel like one house.
- The dabba is drawn front-on with lids that clearly open and close, so the mechanic reads at a glance.
- Spices are drawn as simple, bold shapes (seeds, grains, chilli pieces) with high contrast against the steel, and the colours are checked for colour-blind players (shape plus colour, never colour alone).
- Characters: Ajji (laugh and smile faces as in Aangan), Meera and Arjun as helpers who appear between rounds.
- Text is short, in clean everyday Kannada first, then Hindi and English, with the same care for natural wording used in Aangan.

## Reuse of the Aangan sound engine

- Aangan's audio is a small Web Audio object (`A`): `ctx()`, `env()` for envelopes, `tone()` for synth blips, and `loadSfx()` for decoded sample clips (`assets/sfx_*.mp3`).
- The same object already sits in `games/dosa/sound.js` and is the same code as in Aangan's `index.html`, so the plan is to move it into one shared file and have all three games load it.
- For Masala Dabba we reuse: `tone()` for lid clicks and pour taps, the `chime` and `click` helpers for feedback, and the `cheer` and `oops` clips for win and fail. A new spice-pour sound (short shaker-tap) is the only new sample needed.
- Master volume and the on/off setting should be shared, so a player who mutes in one game is still muted in the next.

## Tech and structure (planned, not started)

- Single-file HTML5 canvas game, same structure as Aangan, so the existing QA tooling pattern can be reused.
- Files: `games/masala-dabba/index.html`, `levels.js` (generated), `scenes.js`, `assets/`.
- Playwright QA: a smoke test that loads each pack, plays one winning move sequence per level, and checks that the level data is solvable.

## Open questions for Shubha

1. Is seven-compartment dabba the right core, or should the first version be three compartments only?
2. Should levels reuse Aangan's Kannada story beats, or have their own family storyline?
3. Monthly festival packs: yes or no for the first release?
4. Ajji's optional extra-moves clip: keep, or drop for a kids' store version?
