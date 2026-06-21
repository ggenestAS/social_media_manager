# Albert Prep — Marketing campaigns

Structure and automation for Meta Ads (Facebook / Instagram) campaigns
promoting [Albert Prep](https://prep.albertschool.com) — mental math fluency
training for Albert School students.

The app itself is developed elsewhere. Product context for writing accurate
copy lives in [`context/app-product.md`](context/app-product.md).

## Layout

```
campaigns/
└── <date>-<channel>/
    ├── brief.md                      strategy, audiences, copy variants
    ├── meta-upload.md                upload checklist + Meta specs
    ├── meta-ads-for-prep-service/    design export (HTML prototypes, DS, assets)
    │   └── project/                  reel HTML sources for capture
    ├── static/                       static ad PNGs (1:1, 4:5, 9:16)
    ├── reels/
    │   ├── covers/                   static reel cover images
    │   └── scripts/                  capture automation
    └── output/                       generated MP4s (gitignored)
```

## Active campaign

**[2026-06-18-meta](campaigns/2026-06-18-meta/)** — Première & Terminale
entry angles for Spé Maths prep.

| Doc | Purpose |
|---|---|
| [`brief.md`](campaigns/2026-06-18-meta/brief.md) | Audiences, angles, ad copy |
| [`meta-upload.md`](campaigns/2026-06-18-meta/meta-upload.md) | Asset inventory + Meta upload guide |
| [`meta-ads-for-prep-service/`](campaigns/2026-06-18-meta/meta-ads-for-prep-service/) | Design export — reel HTML sources |

## Setup (one time)

```bash
npm install
npx playwright install chromium
# ffmpeg required — WSL: sudo apt install ffmpeg
```

## Generate reel MP4s

Reel HTML lives in
`campaigns/2026-06-18-meta/meta-ads-for-prep-service/project/`
(`Albert Prep - Reels Variantes (standalone).html`). Then:

```bash
npm run capture:reels
```

Outputs land in `campaigns/2026-06-18-meta/output/`:

- `reel-<slug>.mp4` per 9:16 screen (e.g. `reel-variante-correction-9-16.mp4`)
- `preview-<slug>.png` — frame grabs to verify each reel fills the frame

## New campaign checklist

1. Copy `campaigns/2026-06-18-meta/` as a template → `campaigns/<date>-<channel>/`
2. Write `brief.md` (audiences, angles, copy)
3. Drop static PNGs in `static/`, reel covers in `reels/covers/`
4. Add design export under `meta-ads-for-prep-service/project/`
5. Update `package.json` `capture:reels` path if the campaign id changed
6. Run `npm run capture:reels`, then follow `meta-upload.md` for Meta Ads Manager
