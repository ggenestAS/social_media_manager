# albert-prep-agent — decision log

Same rules as the sibling brands' logs: one entry per belief-changing event,
newest first, observed → decided → what would change our mind → links. Never
restate what an `experiment.md` or `campaign.md` already says.

---

## 2026-09-22 · DECISION — launch prep: landing URL fixed, headlines fact-checked, Meta account inventoried

**Observed.**
- Owner: the production landing is **`prep.albertschool.com`** (Vercel project
  `albert-prep`; `albert-prep.vercel.app` is the same deployment, not the public
  name). The root page ignores `?exam=`; **`/start?exam=<label>`** pre-fills the
  exam and opens on the date step (verified headless, EN and FR labels).
- Meta: ad account **Albert Prep** `act_1334262842179873` (EUR, payment method,
  business *Albert School of Business & Data*), Page **Albert Prep**
  `1133253399880164`, pixel **Albert Prep Data** `936385079418303`. The pixel
  fires browser-side through GTM `GTM-K7VPGZ55`: `PageView`, custom
  `FunnelStarted` / `PlacementCompleted`, **`Lead`** (email captured or Google
  sign-in started at funnel step 7), `CompleteRegistration` (account + first
  brief). No Conversions API. The deck's `InitiateCheckout` / `PlanBuilt` were
  never built. Organic `Lead` runs ~30–60/day. Two paused Traffic campaigns from
  the mental-math brand (June 2026, ≈ €600) sit in the same account. The
  Instagram account linked to the ad account could not be read from here.
- Press headlines (web fact-check of the 11 distinct clippings): 4 verbatim
  (Fortune *reason*, Inquirer — a NYT wire story, Le Monde, WaPo *deeper
  problem* — an opinion column later flagged as AI-written), 4 paraphrased,
  2 not headlines at all (WaPo *learning*, HBR), Les Echos date unconfirmed
  (probably 2025). Details per bundle in each `post.md`.

**Decided.**
- Every paid destination becomes
  `https://prep.albertschool.com/start?utm_…&exam=…` (carousel → root, no
  exam); organic link-in-bio → root. Applied across the brand folder, including
  the on-canvas URL on carousel card 4.
- Boards rewritten to the published wording (Fortune *screens*, Euronews, WaPo
  *teens*, Le Figaro — date 25 mai; the unattributable *90 %* kicker cut).
  **Excluded from flight 1:** WaPo *learning*, HBR, both Les Echos assets.
  The FR press cells are therefore thin (two splits, one reel); read them as
  directional.
- Optimise on pixel `Lead` as GTM defines it; read `CompleteRegistration` as
  the quality event in place of `PlanBuilt`. CAPI before scale, not before
  flight 1.
- Tooling: the export CLIs accept `CHROMIUM_PATH`; in the cloud sandbox reels
  render with `ffmpeg-static` + `ffprobe-static` (libx264, aac, loudnorm).

**Would change our mind.** If ad-driven `Lead` is dominated by Google sign-in
starts that never reach `CompleteRegistration`, switch the optimisation event.

**Same day, later.** Owner set €20/day per ad set; campaign `52626090874065`
with six ad sets built PAUSED — then **restructured** on the owner's
question about learning-phase volume: six €20 sets cannot each reach ~50
Leads/week, so they were archived and replaced by two market sets (UK €60,
FR €40) holding every mechanic as ads. The mechanic test is now directional
(ad-level cost per Lead, unequal spend). Ids in `campaign.md` §11. The six reels
were uploaded by the owner into the ad account's media library and attached
as video ads through the API (20 ads in total, all paused).

**Still owner-gated.** Cost-per-`Lead` ceiling; FR statement adapts; Les
Echos publication date; the activation itself. (Instagram: every creative got
an `effective_instagram_media_id`, so an IG identity is attached — confirm
it is `albert.prep` in Ads Manager, no linking step needed.)

---

## 2026-09-21 · DECISION — reels get sound design (samples synced to the animation), no music

**Observed.** Reels and TikTok autoplay with sound on; a silent typographic ad
reads as broken there, while Facebook and much of Instagram feed autoplay
muted. Music for ads is a licensing trap: in-app libraries are organic-only,
Meta's Sound Collection does not cover TikTok. No stock-audio connector exists
in the MCP registry; Mixkit and Kenney serve files directly over HTTPS.

**Decided.** Sound design, not music: one short sample per beat of the
choreography (paper wipe, typing per word, panel slam, reply pop, accent
chime, CTA pop) over a generated room-tone bed, mixed to −14 LUFS with a true-
peak limiter. Cues are emitted by `reel-timeline.js` from the same timeline as
the motion, so sync is exact and free for every new reel. Samples: Mixkit
(free commercial licence) and Kenney (CC0) — sources and processing in
[`assets/audio/SOURCES.md`](assets/audio/SOURCES.md). Verified on the Le
Monde reel: every cue lands within one 50 ms window of its target. No
voice-over in this flight; a VO version would be a separate ad set.

**Would change our mind.** If thumb-stop or 3-second views on the reel ad sets
trail the statics badly, test a music-bed variant under a proper commercial
licence (Artlist/Epidemic) before blaming the mechanic.

---

## 2026-09-21 · DECISION — "Albert Prep" is this brand; mental-math on hold, its accounts converted

**Decided (owner).** `brands/albert-prep` (mental math, "Le Cahier") is on
hold. Its social accounts — Instagram `albert.prep`, Facebook page `Albert
Prep`, TikTok `albertprep` — are converted to this identity. `channels.json`
here now declares them; the old brand's `channels.json` withdraws them so the
resolver cannot post mental-math content to the converted accounts. Folder
slug stays `albert-prep-agent` (paths, PR, docs already reference it).
`scripts/stage-day.mjs` now defaults to this brand.

**Consequences.** Blocker 1 (naming/handles) and 5 (accounts) from the
2026-09-20 entry are closed. The accounts still carry the mental-math profile
photo, cover and bio, and a feed of 40+ mental-math posts. The new profile
kit landed the same day from Claude Design (*Social Profile Kit*):
[`assets/profile-kit/`](assets/profile-kit/) — mascot profile picture (D),
FB covers EN/FR, five highlight covers, bios per platform with character
counts (FB intro FR is over the limit as designed; trimmed variant provided).
The switch-over itself is manual — checklist in
[`assets/README.md`](assets/README.md).
Followers were acquired on mental-math content: expect a drop and a noisy
first read on organic reach; do not treat early organic numbers as a signal.

**Would change our mind.** If the mental-math brand is revived, it needs new
accounts — these are not coming back.

---

## 2026-09-21 · DECISION — 9:16 safe zone applied to every vertical asset

**Observed.** Reels, Stories and TikTok overlay their UI on the video: ~250 px
on top (account, sound), ~480 px at the bottom (caption, CTA bar, progress),
~160 px on the right (TikTok's button column). The imported reels put the
wordmark, trust line and CTA 230 px from the bottom and the masthead 211 px
from the top; the 9:16 statics sat at 120 / 300 px. All of it would be under
the caption layer. Feed 4:5 and carousel placements have no overlay.

**Decided.** One safe zone (top 250 · bottom 480 · right 160 · left 96)
encoded in the design system and applied to all 9:16 boards: the four reels
(panel now rises to y = 800, type scaled 0.82–0.86), the press-split 9:16 and
the five statement 9:16 adapts. The design source fixed the reels and the one
split 9:16; **the statement 9:16 boards are fixed in the repo only** — the
design's `Ad 1–5 · 9:16` still use the old geometry. The brand browser has a
safe-zones toggle on every 9:16 preview (same red bands as the design's
Tweaks toggle) — check any frame against it before export.
Two gaps in the design's own revision, compensated in the port: during the
headline scene the paper is full-height and the headline built inside the
caption band (bottom padding now animates 560 → 80 with the panel rise), and
the ×1.05 camera zoom pushed the masthead/date a few pixels into the top and
right bands (paper margins 290 / 185, panel right 170).

**Would change our mind.** Measured overlay sizes differ per app version and
device; if a QA screenshot on a real phone shows text under the caption, widen
the zone in `design-system.md` and regenerate — never per asset.

---

## 2026-09-20 · LAUNCH — brand imported from Claude Design; first Meta campaign + first organic bundles staged

**Observed.** The Claude Design project (*Meta Campaign Concept*, *Meta Ad
Statics*, *Meta Reel 1–4*) rebrands the exam agent as **"Albert Prep"** with a
new dark typographic identity, bilingual FR/EN copy, and a press-led creative
mechanic (real headlines about AI hollowing out students → Albert's reply).
Two facts in the repo contradict the design: `brands/albert-prep` (mental
math) already uses that name **and owns the social handles the mockups show**;
`brands/prep-ai` is the same product under the previous identity.

**Decided.**
- New brand folder `albert-prep-agent` rather than editing `prep-ai` — the
  identity, language mix and mechanic are all different; nothing from
  `prep-ai`'s monochrome-chat system carries over. `prep-ai` is left intact
  for the naming/merge decision.
- First campaign staged as
  [`output/paid/campaigns/2026-09-20-meta-launch/`](output/paid/campaigns/2026-09-20-meta-launch/)
  with all 30 static artboards and 4 reels (×2 copy variants) from the design
  ported to the repo's self-contained HTML, one bundle per Meta ad.
  Test design in its `experiment.md`: 3 directions × 2 markets, cost per
  early-access signup, decision rule fixed before spend.
- Organic menu defined **from the produced paid creatives** (statement,
  press-split, carousel, press-reel) and four first bundles staged under
  `output/organic/posts/` (Sep 22–25, status `draft`). Rationale: the
  design's carousel caption is written for organic ("Link in bio"), so the
  press mechanic is intended to run on both.
- The concept deck's Directions B ("Chaos → structure" product-demo reel)
  and C ("Fifteen minutes a day" carousel) were **not produced** in the
  design; the produced set is press-led. Recorded as-is in `campaign.md`
  rather than invented.

**Would change our mind.** If the naming decision is "the exam agent *is*
Albert Prep", fold this folder's inputs over `albert-prep` and retire the
mental-math brand — or vice-versa; either way one of the two must move.

**Blocked on (in order).**
1. Naming: brand name + handles vs `brands/albert-prep` (owner decision).
2. Production landing URL (design copy says `albert-prep.vercel.app`, deck
   says `prep.albert.com`) and the exam pre-fill query parameter.
3. Press headlines: exact wording + article links verified for all 12
   splits / 4 reels / 1 carousel; masthead-logo usage sign-off.
4. Meta ad account + page; Pixel + Conversions API live before the first euro.
5. Social accounts created and connected to the shared Postiz workspace.
