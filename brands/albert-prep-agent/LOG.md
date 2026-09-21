# albert-prep-agent — decision log

Same rules as the sibling brands' logs: one entry per belief-changing event,
newest first, observed → decided → what would change our mind → links. Never
restate what an `experiment.md` or `campaign.md` already says.

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
