# Tools

Reusable CLI utilities for Albert Prep content production.

## Prerequisites

```bash
npm install
npx playwright install chromium
# MP4 only:
sudo apt install ffmpeg   # WSL / Linux
```

## html-to-image

Export design-export artboards or standalone HTML posts to PNG.

```bash
# All labeled screens in a design-export file
npm run html:to-image -- brands/albert-prep/output/paid/campaigns/2026-06-18-meta/design-export/project/Meta\ Ads\ Spe\ Maths.dc.html --all

# One screen by label
npm run html:to-image -- path/to/file.html --screen "P1 Première 1:1"

# Standalone organic post (full viewport)
npm run html:to-image -- brands/albert-prep/output/organic/posts/2026-06-21-calcul-du-jour-047/source.html --width 1080 --height 1350
```

| Flag | Purpose |
|---|---|
| `--all` | Export every `[data-screen-label]` screen |
| `--screen <label>` | Export one labeled screen |
| `--out <dir>` | Output directory (default: `<html-dir>/output/`) |
| `--at <ms>` | Seek CSS animations before capture |
| `--width` / `--height` | Viewport for full-page capture (no `--screen`) |
| `--aspect` | Filter screens: `9:16`, `4:5`, `1:1` |

## html-to-mp4

Export animated reel screens to MP4 (frame-by-frame CSS timeline seek + ffmpeg).

```bash
# All 9:16 reel screens
npm run html:to-mp4 -- brands/albert-prep/output/paid/campaigns/2026-06-18-meta/design-export/project/Meta\ Ads\ Reels\ Animees.dc.html --all

# One reel
npm run html:to-mp4 -- path/to/reels.html --screen "Reel Première 9:16" --out ./output
```

Outputs per screen:

- `reel-<slug>.mp4`
- `reel-<slug>.mp4` — encoded video (cover frame prepended ~1 s for grid thumbnails)
- `cover-<slug>.png` — 9:16 miniature (question hold)
- `cover-<slug>-1x1.png` — center square crop for IG grid QA
- `preview-<slug>.png` — same frame as cover

### Sound

Two audio paths, both automatic from attributes on the screen element:

- **Sample cues** — `data-audio-cues='[{"at":3.8,"sample":"slam","gain":1}, …]'`
  (animation seconds) plus optional `data-audio-bed="pink:0.035"`. Each cue
  drops `brands/<brand>/assets/audio/<sample>.wav` (or .ogg/.mp3) at
  `coverHold + at / speed`, over a generated band-passed noise bed, then
  `loudnorm` to −14 LUFS and a −1.4 dBTP limiter, AAC 192 kbps 48 kHz stereo.
  The brand folder is found by walking up from the HTML file; `--samples <dir>`
  overrides it. Used by `albert-prep-agent`'s press reels (cues emitted by its
  `reel-timeline.js`; sources and licences in that brand's
  `assets/audio/SOURCES.md`).
- **Legacy countdown** — `data-timer-sec` (ticks + reveal chime) and
  `--audio ticks|cues` with `{at, freq, dur}` sine beeps, used by `albert-prep`.

`--no-sfx` skips all of it. ffmpeg must have `libx264`, `aac`, `amix`,
`adelay`, `loudnorm` and `anoisesrc` (any distro or static build does;
Playwright's bundled ffmpeg does not).

Per-screen timing hints are read from the screen element when the matching flag
is omitted: `data-loop-ms`, `data-cta-ms`, `data-cover-ms`, `data-timer-sec`
(SFX), and `data-speed` (authored-pace reels such as `press-reel` set
`data-speed="1"` so the default 1.5× time-stretch is not applied).

Campaign-specific batch capture still available via `npm run capture:reels` (uses these libraries internally).

## Shared library

[`lib/html-render.mjs`](lib/html-render.mjs) — Playwright page setup, screen isolation, animation seeking, ffmpeg encode. Import from campaign scripts when you need custom batch logic.
