# Campaign plan — 2026-07-16 Meta angles (paid)

**Period:** July 2026 · early access, pre-rentrée
**Channels:** Facebook + Instagram (Meta Ads) — feed 4:5 + stories/reels 9:16
**Goal:** cheapest *created account* per angle at prepai.albertschool.com
**Experiment:** [`experiment.md`](experiment.md) — 4 ad sets, one variable (angle)

## Assets

| Ad set | Creative | Destination |
|---|---|---|
| bac | `creatives/01-bac/` | `/lp-bac-chat` |
| parents | `creatives/02-parents/` | `/lp-parents-chat` |
| mention | `creatives/03-mention/` | `/lp-mention-chat` |
| bac-blanc | `creatives/04-bac-blanc/` | `/lp-bac-blanc-chat` |

Each folder: `source.html` (feed 4:5 + story 9:16 artboards), `post.md`
(Meta primary text / headline / CTA / final URL with UTMs), `export/`
(rendered PNGs, gitignored — regenerate with
`npm run html:to-image -- <source.html> --all --out <dir>/export`).

## Upload checklist (Meta Ads Manager — manual, no ad account in this repo)

1. Campaign: conversions objective; 4 ad sets, equal budget, same schedule.
2. Audiences per `experiment.md` §table (age bands + interests; FR only).
3. One ad per ad set: feed PNG + story PNG as placements, primary text +
   headline + « S'inscrire » from the ad set's `post.md`, final URL verbatim
   (the LP records `src` — do not strip query params).
4. Pixel/events: none needed for the readout — conversion is read from the
   product DB (`funnel.lead.src`), spend from Ads Manager.

## KPIs (fill at readout)

| Ad set | Spend | Clicks | Accounts (funnel.lead.src) | €/account |
|---|---|---|---|---|
| bac | | | | |
| parents | | | | |
| mention | | | | |
| bac-blanc | | | | |
