# EXP-2026-07-16-meta-angles — which anxiety buys the plan?

**Hypothesis:** Among French highschool audiences on Meta, the **parents**
angle will deliver the cheapest *created account* — parents carry both the
anxiety and the wallet, and the fake-chat creative lets them "overhear" the
agent working — with **mention** second (stakes are concrete: Parcoursup).
**Variable under test:** the ad ANGLE (one per ad set). Everything else held
constant: creative format (fake-chat static), destination style (chat LPs),
budget per ad set, schedule.
**Deviation axis (vs sibling-brand precedent):** content angle + format — the
ad is a chat transcript, not a poster; the product demos itself in the ad the
same way the LP does.

**What "worked" looks like:** cost per created account by angle —
`select src, count(*) from funnel.lead group by 1` (src = `lp-<angle>-chat`)
against Meta spend per ad set. Secondary: CTR (hook quality) and LP→plan-start
rate (funnel.event `exam_answer` count per src). Judged after ~each ad set has
had comparable spend; no formal stats, order-of-magnitude differences only.

**Kill/scale rule:** after comparable spend per ad set, kill the bottom two
angles, put their budget on the top angle, and only then A/B the destination
STYLE for that winner (`lp-<angle>` editorial vs `lp-<angle>-chat`) — that's
EXP-2. One variable per experiment.

**Platform:** Meta (Facebook + Instagram feed 4:5, stories/reels 9:16).
**Not through Postiz** — upload via Meta Ads Manager (no ad account is
connected to this repo). This bundle produces the creatives, copy, and URLs.

## Ad sets / drafts (all renderable)

| # | Angle | Audience hint (Ads Manager) | Destination |
|---|---|---|---|
| 1 | `bac` | 15–19, interests: baccalauréat, révisions | `/lp-bac-chat` |
| 2 | `parents` | 38–55, parents of teens, interests: éducation, soutien scolaire | `/lp-parents-chat` |
| 3 | `mention` | 15–19, interests: Parcoursup, mention bac | `/lp-mention-chat` |
| 4 | `bac-blanc` | 15–19, interests: bac blanc, annales | `/lp-bac-blanc-chat` |

Each draft folder: `creatives/0N-<angle>/{source.html, post.md}` — source.html
holds two artboards (feed 4:5 + story 9:16); post.md holds the Meta fields
(primary text, headline, CTA, final URL with UTMs).

Render all:

```bash
for d in creatives/0*/; do
  npm run html:to-image -- "$d/source.html" --all --out "$d/export"
done
```

## Why chat LPs as the constant destination

The creative IS a chat — landing on the chat LP continues the same
conversation (same mascot, same composer, the exam question already asked).
Style-consistency between ad and LP is part of what's being sold; the
editorial-vs-chat LP question is deliberately deferred to EXP-2 on the
winning angle only.
