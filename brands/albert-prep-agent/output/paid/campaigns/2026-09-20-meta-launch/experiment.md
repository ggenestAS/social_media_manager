# EXP-2026-09-20-meta-directions — which mechanic buys the signup?

**Hypothesis:** Among 16–18 exam candidates on Meta, the **press mechanic**
(a real "AI is hollowing out students" headline, agreed with, then turned
toward Albert) will deliver a cheaper early-access signup than the pure
**statement** (black frame, one sentence), because borrowed credibility +
agreement lowers the guard that a product claim raises — and the press-led
set is what the design team kept producing after concept v1.
**Variable under test:** the creative MECHANIC (statement · press-split ·
press-reel), one per ad set, × 2 markets (FR · UK). Everything else held
constant: objective (`Lead`), audience per market, budget per ad set,
schedule, destination (one landing, exam pre-filled by URL), trust line, CTA.
**Concept-deck lineage:** the deck's test was 3 directions × 2 markets = 6 ad
sets, 14 days, equal budget, no mid-flight edits. Same shape; the directions
are replaced by the mechanics that were actually produced (see
`campaign.md` §4).

**What "worked" looks like:** cost per attributed `Lead` **by ad**, inside
each market set, spend-weighted by mechanic (the sets are per market, not per
mechanic — see `campaign.md` §11). Quality check: first-party claimed /
drafts in `prep.brief` against the 5 % pre-launch baseline (`PlanBuilt` and
`CompleteRegistration` do not fire). Diagnostics: ThruPlays / impressions and
3-s plays for reels, link CTR, landing page views / clicks. No formal stats —
differences under 30 % are noise. Full protocol: `readout.md`.

**Decision rule (fixed before spend, from the deck):** scale the mechanic
with the lowest cost per signup, provided its plan-built rate holds above
the site average. Mechanics within 15 % of each other keep running as a
pair. Losers are cut, not reworked. Week-3 budget goes 70 / 30 to the top
two. Cost-per-signup ceiling: set from week-one baseline (owner to fill).

**Platform:** Meta (Instagram Feed / Reels / Stories, Facebook Feed / Reels;
Advantage+ on; Audience Network and right column excluded).
**Not through Postiz** — built in ad account `act_1334262842179873` (Albert
Prep) via the Meta Marketing API; see `campaign.md` §11 for live ids.

## Ad sets

| # | Ad set | Market | Creatives (bundles) | Formats |
|---|---|---|---|---|
| 1 | statement · FR | FR, 16–18 | FR statement adapts of 01–05 (**to produce** — the design's statements are EN; FR lines in the copy bank) | 4:5 + 9:16 |
| 2 | statement · UK | UK, 16–18 | 01 … 05 | 4:5 + 9:16 |
| 3 | press-split · FR | FR, 16–18 | 08: Le Monde, Les Echos, Le Figaro | 4:5 (+ 9:16 adapt) |
| 4 | press-split · UK | UK, 16–18 | 07: Fortune ×2, Euronews, Inquirer · 08: WaPo ×3, HBR | 4:5 + 9:16 |
| 5 | press-reel · FR | FR, 16–18 | 10 Le Monde (A/B), 11 Les Echos (A/B) | 9:16 |
| 6 | press-reel · UK | UK, 16–18 | 09 Fortune (A/B), 12 Washington Post (A/B) | 9:16 |
| + | carousel · parents (outside the core test) | FR+UK, 25–54 | 06 | carousel |

Within an ad set, Meta may rotate the creatives (dynamic); the unit of
decision is the ad set (mechanic × market), not the single ad. Reel variant
A/B is a within-set rotation, read as a secondary signal only.

## Honest gaps

- Ad set 1 has no FR statements yet: the design's five statements are
  English. Produce FR adapts from the copy bank before launch or run the test
  as 5 ad sets and note it.
- ~~Every press headline is a placeholder until verified~~ — fact-checked
  2026-09-22 (`campaign.md` §11): four boards rewritten to the published
  wording; WaPo *learning*, HBR and both Les Echos assets are out of flight 1.
  This shrinks press-split · FR to two boards (Le Monde, Le Figaro) and
  press-reel · FR to one reel (A/B) — the FR press cells are thin; read them as
  directional only.
- Masthead logos: text by default; real logos only with rights sign-off.
- ~~Landing URL and `exam=` pre-fill parameter unconfirmed~~ — fixed
  2026-09-22: `https://prep.albertschool.com/start?…&exam=<label>`.
