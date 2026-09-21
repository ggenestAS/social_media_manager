# Assets — Albert Prep (exam agent)

| Path | What |
|---|---|
| `wordmark.svg` | Dot-grid wordmark |
| `profile-kit/source.html` | Renderable social profile kit (design: *Social Profile Kit*, 2026-09-21): 5 profile pictures, FB covers EN/FR, 5 highlight covers |
| `profile-kit/export/*.png` | Upload-ready renders (committed on purpose — they are the deliverable) |
| `profile-kit/bios.md` | Names, bios, links per platform, character-counted |

Re-render after any edit:

```bash
npm run html:to-image -- brands/albert-prep-agent/assets/profile-kit/source.html --all --out brands/albert-prep-agent/assets/profile-kit/export
```

## What goes where

| Platform | File | Notes |
|---|---|---|
| IG · FB · TikTok profile picture | `pfp-d-mascot-selected.png` (1080×1080) | Selected in the design. The platforms apply the circle crop; the file is square, ink to the edges. Alternates: `pfp-a-dots`, `pfp-b-monogram`, `pfp-c-inverted` (dark-mode feeds), `pfp-e-mascot-happy` (launch / milestone days). |
| Facebook page cover | `fb-cover-en.png` / `fb-cover-fr.png` (1640×624) | Mobile shows the centre 1640×498: all text sits inside that band. The dashed guide from the design is not in the export; the brand browser overlays it on the preview. |
| Instagram highlight covers | `highlight-*.png` (1080×1080) | How it works · Daily · In the press · Students · Early access. Shown in a circle. TikTok has no banner, so these carry the profile. |
| Bios, names, links | `bios.md` | FB intro FR is over the 101 limit as designed; a trimmed variant is provided. |

Design delta: the selected mascot (D) is drawn on the design canvas with an
accent ring outside the circle (`outline-offset: 24px`). A profile picture
cannot carry anything outside its own square, so the export omits the ring —
the platform draws its own story ring.

## Switch-over checklist (accounts converted from the mental-math brand)

1. Profile picture → `pfp-d-mascot-selected.png` on all three.
2. Facebook cover → `fb-cover-fr.png` (FR audience) and Intro / About / button
   from `bios.md`; category Education.
3. Instagram name field, bio, link, category from `bios.md`; create the five
   highlights with the covers above (they need at least one story each).
4. TikTok name, bio; enable the link (Business account or 1k followers).
5. Archive or leave the mental-math posts (owner call — see LOG 2026-09-21);
   pin the first exam-agent post once it is live.
6. Confirm the landing URL before typing it anywhere (LOG blocker 2).
