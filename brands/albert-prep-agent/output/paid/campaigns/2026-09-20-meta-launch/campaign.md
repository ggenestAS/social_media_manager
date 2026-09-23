# Campaign plan — 2026-09-20 Meta launch (paid)

**Brand:** albert-prep-agent (Albert Prep, the exam agent)
**Period:** production Oct 2026 (week 1) · test flight Nov weeks 2–3 (mocks season opens) · read & decide week 4 · scale Dec → Jan
**Channels:** Instagram Feed / Reels / Stories · Facebook Feed / Reels · Advantage+ placements on · **excluded:** Audience Network, right column
**Markets:** FR (bac 2027) and UK (A-levels) — French written natively, not translated
**Goal:** early-access signups at a cost we can scale
**Experiment:** [`experiment.md`](experiment.md) — EXP-2026-09-20-meta-directions
**Source:** Claude Design *Meta Campaign Concept* (concept v1, 14 slides) + *Meta Ad Statics* + *Meta Reel 1–4* → [`design-export/`](design-export/)

> **2026-09-22 — launch state.** Landing URL fixed (`prep.albertschool.com`,
> exam pre-fill on `/start`), headlines fact-checked (4 boards rewritten, 3
> excluded), pixel events inventoried (browser Pixel via GTM, no CAPI), Meta
> account / Page / pixel identified. See §11 and [`../../../LOG.md`](../../../LOG.md).
> Still owner-gated: budget + cost ceiling, Instagram account link, FR
> statement adapts.

## 1. Objective (deck §01)

Meta objective **Leads**, optimised on the site `Lead` event (early-access
account created). No installs, no video views — the funnel ends on a built
plan: **Ad → landing → "Build my plan" → early access**.

| KPI | Definition |
|---|---|
| Primary | Cost per early-access signup |
| Secondary | Signup → plan built rate |
| Diagnostic | Thumb-stop rate, CTR, landing conversion |

## 2. Audience & timing (deck §02)

| | |
|---|---|
| Who | 16–18, final year, exam date already fixed. Bac général & technologique (FR), A-levels (UK). Instagram-first, Reels-heavy. |
| State of mind | Uses AI daily, revises rarely, worries constantly. Knows the exam room takes the chatbot away. Wants a plan, not another app. |
| When | Two pressure points a year: mocks (Nov–Jan) and the final run-in (Mar–May). Launch flight targets mocks: "Your exam is in 9 weeks." |
| Targeting | Age 16–18 · FR / UK · Broad + Advantage+ · Interests: Bac, A-level, revision |
| Carousel test (design note) | Full carousel → parents 25–54; cards 2–4 as a standalone student carousel → 16–18 |

## 3. The insight (deck §03)

**On exam day, you are the only model in the room.** Every tool they use
does the remembering for them. The exam room takes them all away. Albert is
the one AI that trains what survives the door — and every ad shows what that
feels like the morning of. This is already the landing page's core message,
so ad and site say the same thing.

## 4. Creative directions — concept vs what was produced

The deck (concept v1) proposed three directions. The statics/reels files that
followed produced a **press-led** set instead; the table records both
honestly so nobody assumes B and C exist.

| Deck direction | Lead format | Status in the produced design |
|---|---|---|
| A · Emotional — "Walk in ready." | Feed 4:5 | Evolved into the five **statement** ads (01–05): same black frame + cursor, sharper hooks |
| B · Product — "From chaos to structure." | Story/Reel 9:16, 8 s plan-build demo | **Not produced.** Replaced by four **press reels** (09–12) |
| C · Habit — "Fifteen minutes a day." | 5-card carousel | **Not produced.** Replaced by the 4-card **"They're right."** carousel (06) |
| — | Feed 4:5 | 12 **press splits** (07–08): headline on paper, Albert on ink |

The test in `experiment.md` therefore compares the *produced* mechanics:
**statement** vs **press** (split + reel + carousel), × 2 markets.

## 5. Assets

One bundle per Meta ad under [`creatives/`](creatives/): `source.html`
(artboards), `post.md` (Meta fields, destination, checklist), `export/`
(PNG/MP4, gitignored — regenerate with the commands below).

| # | Bundle | Mechanic | Boards | Lang | Meta primary text |
|---|---|---|---|---|---|
| 01 | `01-no-tabs` | statement, PAS blunt | 4:5 + 9:16 | EN | yes (design) |
| 02 | `02-mind-blank` | statement, PAS quiet | 4:5 + 9:16 | EN | yes (design) |
| 03 | `03-only-model` | statement, AIDA contrarian, **light** | 4:5 + 9:16 | EN | yes (design) |
| 04 | `04-abandoned-plans` | statement, AIDA peer | 4:5 + 9:16 | EN | yes (design) |
| 05 | `05-vs-chatgpt` | statement, AIDA punchy | 4:5 + 9:16 | EN | yes (design) |
| 06 | `06-carousel-wrong-ai` | carousel "They're right." | 4 × 4:5 | EN | caption (design) |
| 07 | `07-split-press-en` | press split, round 1 (Fortune ×2, Euronews, Inquirer) | 4 × 4:5 + 1 × 9:16 | EN | proposed |
| 08 | `08-split-press-r2` | press split, round 2 (Les Echos, Le Monde, WaPo ×3, HBR, Le Figaro) | 7 × 4:5 | FR/EN | proposed |
| 09 | `09-reel-fortune` | press reel, variants A/B | 2 × 9:16 · 13.0 s | EN | proposed |
| 10 | `10-reel-le-monde` | press reel, variants A/B | 2 × 9:16 · 13.2 s | FR | proposed |
| 11 | `11-reel-les-echos` | press reel, variants A/B (design default B) | 2 × 9:16 · 13.2 s | FR | proposed |
| 12 | `12-reel-washington-post` | press reel, variants A/B | 2 × 9:16 · 13.0 s | EN | proposed |

"proposed" = primary text written here from the artboard copy; the design
supplied none. Everything on the boards is verbatim from the design.

```bash
# statics — one PNG per artboard
for d in brands/albert-prep-agent/output/paid/campaigns/2026-09-20-meta-launch/creatives/0[1-8]-*/; do
  npm run html:to-image -- "$d/source.html" --all --out "$d/export"; done
# reels — MP4 with sound design + cover PNGs per variant (data-speed=1 and audio cues are read from the board)
for d in brands/albert-prep-agent/output/paid/campaigns/2026-09-20-meta-launch/creatives/{09,10,11,12}-*/; do
  npm run html:to-mp4 -- "$d/source.html" --out "$d/export"; done
```

## 6. Formats & placements (deck §05)

All 9:16 assets (reels, story adapts) respect the Reels/Stories/TikTok safe
zone — top 250 · bottom 480 · right 160 px — so nothing sits under the caption,
CTA bar or button column. Feed 4:5 and the carousel have no overlay. Verify
any frame with the safe-zones toggle in `npm run browse` (LOG 2026-09-21).


Every direction gets a 4:5 and a 9:16 so Advantage+ can serve everywhere;
carousel is feed-only. Reels: the MP4 also serves as Story (same file).

| Mechanic | Feed 4:5 | Story / Reel 9:16 | Carousel |
|---|---|---|---|
| Statement | lead (01–05) | adapt (01–05 story boards) | — |
| Press split | lead (07–08) | adapt (07 Fortune 9:16; add more on demand) | — |
| Press reel | cover PNG | lead (09–12) | — |
| Carousel | card 1 as static | cards as 4-frame story | lead (06) |

## 7. Copy bank (deck §06 — verbatim)

| Français | English |
|---|---|
| Arrive prêt. | Walk in ready. |
| Le jour J, tu es le seul modèle dans la salle. | On exam day, you are the only model in the room. |
| Ton bac est dans 9 semaines. Voici ton plan. | Your A-levels are in 9 weeks. Here's your plan. |
| Quinze minutes par jour valent mieux qu'un week-end de panique. | Fifteen minutes a day beats a panicked weekend. |
| ChatGPT répond. Albert te rend prêt. | ChatGPT answers. Albert gets you ready. |
| CTA · Obtenir l'accès anticipé — gratuit, sans carte | CTA · Get early access — free, no card |

Deck Direction A copy (usable as statement variants): FR headline « Le jour
J, tu es le seul modèle dans la salle. » · EN "Walk in ready." · primary text
"Tell Albert which exam you're sitting. It builds your plan and trains you
every day until the door." · CTA "Get early access — free".
Deck Direction B caption FR: « Du chaos à la structure. Ton plan, à rebours
depuis le jour J. »

## 8. Measurement (deck §08)

Pixel + Conversions API live and verified **before the first euro**.
Attribution 7-day click / 1-day view. Cost-per-signup targets are set from
the week-one baseline, then held for the scale phase.

| Event | Fires when |
|---|---|
| `PageView` | Landing and every SPA route change, `utm_content` = creative |
| `FunnelStarted` (custom) | First in-funnel choice (exam date) |
| `PlacementCompleted` (custom) | Three placement questions answered |
| `Lead` (**optimised**) | Email captured (magic link sent) or Google sign-in started, funnel step 7 |
| `CompleteRegistration` | **Never fires** — GTM listens for `account_created`, which the landing never pushes. Quality is read first-party from `prep.brief.status = claimed` (see `readout.md`) |

All browser-side through GTM `GTM-K7VPGZ55` on pixel `936385079418303`; no
Conversions API yet. **The pixel is shared with `www.albertschool.com` and
other school subdomains**: the ~30–60 `Lead`s/day seen before launch are the
school site's, not the prep landing's (one `Lead` from `prep.albertschool.com`
in 28 days). Cause found 2026-09-23: the prep GTM container loads on the
school site. GTM version 7 gates every pixel tag to the landing hostname
(awaiting owner publish); dedicated dataset next. Read only ad-attributed
numbers; see `readout.md` §2.

## 9. Timeline (deck §09)

| When | Phase | What |
|---|---|---|
| Week 1 · Oct | Production | Statics, reels, carousel FR + EN (this bundle). Pixel and CAPI set up. |
| Weeks 2–3 · Nov | Test flight | Six ad sets, equal budget, no edits. Mocks season opens. |
| Week 4 · Nov | Read and decide | Apply the decision rule. Cut losers, brief iterations of the winner. |
| Dec → Jan | Scale | Winner at 70 % of budget through mocks. Second flight briefed for March. |

## 10. Next steps (deck §10, updated for the import)

| # | Action | When |
|---|---|---|
| 01 | ~~Resolve the brand-name / handle collision~~ — done 2026-09-21: `albert-prep` on hold, its accounts converted to this brand | — |
| 02 | Approve the mechanics to test (statement vs press) or cut to one; set the two-week test budget and the cost-per-signup ceiling | This week |
| 03 | ~~Confirm the production landing URL + exam pre-fill parameter~~ done 2026-09-22 (`prep.albertschool.com/start?exam=`); Pixel live (browser); CAPI **not** set up — acceptable for flight 1, add before scale | — |
| 04 | ~~Verify the press headlines~~ done 2026-09-22 (see §11); masthead-logo sign-off still open (text mastheads ship); carousel card-1 clippings are typeset, not screenshots | — |
| 05 | ~~Export PNG/MP4~~ done 2026-09-22; upload via the Meta Marketing API per §11 | — |

## 11. Launch state — 2026-09-22

| | |
|---|---|
| Ad account | **Albert Prep** · `act_1334262842179873` · EUR · business *Albert School of Business & Data* (`2015033765322002`) · payment method on file |
| Page | **Albert Prep** · `1133253399880164` (lead-form ToS not accepted — irrelevant, we optimise on the website pixel) |
| Pixel | **Albert Prep Data** · `936385079418303` · browser events via GTM, see §8 |
| Instagram | **wired.** The IG-accounts endpoint is not enabled for this account, but every creative (June and September) carries an `effective_instagram_media_id`, i.e. Meta minted an Instagram post for it — an Instagram identity is attached. Whether it is `albert.prep` or a Page-backed account is only visible in Ads Manager (ad → Identity) |
| Landing | `https://prep.albertschool.com/start?…&exam=<label>` (carousel: root) |
| Legacy | Two **paused** Traffic campaigns from the mental-math brand (June 2026, ≈ €600 spent) remain in the account — leave paused |

**Built in the account (2026-09-22, all PAUSED / unattached).** Image
creatives were created straight from hosted PNGs (the account is not yet
enabled for the Ads API media-upload tool, so the reels — which need a
`video_id` — must be uploaded by hand in Ads Manager). Hosted copies of every
flight-1 asset sit in the private Neon storage bucket `meta-ads-2026-09`
(project `albert-prep`, branch `dev/claude-launch`); the signed links used
for the creatives expire **2026-09-29** — re-sign or re-upload after that.

| Creative id | Ad | Ad set |
|---|---|---|
| `1087696244228204` | statement-no-tabs | statement · UK |
| `1406252808356950` | statement-mind-blank | statement · UK |
| `1420410213365559` | statement-only-model | statement · UK |
| `1604864081077688` | statement-abandoned-plans | statement · UK |
| `1781372549729184` | statement-vs-chatgpt | statement · UK |
| `1570887808052062` | press-split-fortune (reason) | press-split · UK |
| `1445975470727971` | press-split-euronews | press-split · UK |
| `1463742872262874` | press-split-inquirer | press-split · UK |
| `1709530146776452` | press-split-fortune-screens | press-split · UK |
| `1402853647979891` | press-split-wapo-teens | press-split · UK |
| `1079841078013226` | press-split-wapo-blue-books | press-split · UK |
| `1809307859985599` | press-split-monde | press-split · FR |
| `1613742066768683` | press-split-figaro | press-split · FR |
| `1788857662130848` | carousel-wrong-ai (4 cards) | carousel · parents |
| — | reels 09 A/B · 10 A/B · 12 A/B | upload `export/reel-*.mp4` + `cover-*-9-16.png` by hand |

**Campaign structure (2026-09-22, revised the same evening). Campaign and both ad sets ACTIVE since 2026-09-22 evening; ads PAUSED until switched on.**

Campaign `52626090874065` — *Albert Prep — 2026-09 Meta launch ·
EXP-2026-09-20-meta-directions* · `OUTCOME_LEADS` · auction · ABO · no
special ad category.

First build was six ad sets at €20/day (one per mechanic × market, as the
experiment doc prescribed). **Archived within the hour**: €140/week per set
cannot reach the ~50 optimisation events a week Meta needs to leave the
learning phase unless cost per Lead is under €2.80, and the three same-market
sets would have bid against each other. Archived ids: `52626090958665`,
`52626090970665`, `52626091001665`, `52626091053665`, `52626091082265`,
`52626091125065` (their ads archived with them).

Replacement: **two ad sets, split by market only**, all mechanics as ads
inside. Each: optimisation `OFFSITE_CONVERSIONS` on pixel `936385079418303`
event `LEAD`, billing impressions, autobid, destination website, attribution
7-day click / 1-day view, DSA beneficiary + payor *Albert School of Business
& Data*, placements Facebook (feed, story, reels, video feeds, marketplace,
search, in-stream) + Instagram (feed, story, reels, explore, profile feed,
search); Audience Network, Messenger and right column excluded; Advantage+
audience **off** so the 16–18 cap is hard.

| Ad set id | Ad set | Daily budget | Ads |
|---|---|---|---|
| `52626097319265` | UK · 16–18 · all mechanics | €60 | 5 statements, 6 press splits, the carousel (now shown to students, not parents — pause it if unwanted), 4 reels (Fortune A/B, Washington Post A/B) |
| `52626097343065` | FR · 16–18 · all mechanics | €40 | monde, figaro, 2 reels (Le Monde A/B) |

Ads (PAUSED) — UK: `52626097432665` no-tabs · `52626097451065` mind-blank ·
`52626097460465` only-model · `52626097485865` abandoned-plans ·
`52626097489665` vs-chatgpt · `52626097504065` fortune · `52626097594865`
euronews · `52626097612265` inquirer · `52626097712665` fortune-screens ·
`52626097857465` wapo-teens · `52626098094065` wapo-blue-books ·
`52626098139065` carousel · `52626105100265` reel-fortune-A ·
`52626105108065` reel-fortune-B · `52626105182465` reel-wapo-A ·
`52626105186865` reel-wapo-B. FR: `52626098167465` monde · `52626098256865`
figaro · `52626105117465` reel-le-monde-A · `52626105127865` reel-le-monde-B.

Reels were uploaded by the owner into the ad account's media library
(Médiathèque → *Contenu multimédia du compte publicitaire*, account Albert
Prep); the API then read the video ids (`1066203996125686` fortune-A,
`1410273877897314` fortune-B, `1787057842626233` wapo-A, `2375564253247588`
wapo-B, `1112570561330882` monde-A, `1848474336323967` monde-B) and the
video creatives were built with the 9:16 cover PNGs as thumbnails:
`1401994255453366` / `1071514935854350` (Fortune A/B), `4201418893412183` /
`1563747911619719` (WaPo A/B), `948214701691566` / `1569079421717175` (Le
Monde A/B). Business-level media-library folders are **not** visible to the
API; upload in the ad-account view.

**Brand-rule flag on the B variants.** Le Monde B says on canvas « Il
t’entraîne jusqu’à la mention » and WaPo B says "The agent that gets you good
grades / Better grades on the day". `context/product.md` forbids grade
promises. The ad copy around them was kept neutral (« jusqu’au jour J »,
"Ready on the day"), but the video frames still carry the lines. Pause
`52626105127865` and `52626105186865` before activation unless the wording
is accepted.

**What this changes for the experiment.** Mechanic vs mechanic is no longer
an equal-budget test: Meta rotates ads inside each set and shifts spend to
early winners. Read mechanic performance as ad-level cost per Lead with
unequal spend, directional only. A controlled comparison is a later Meta
A/B test on one variable with a real budget.

**Activated 2026-09-22 evening, all 20 ads.** Instagram identity confirmed
`albert.prep`. Readout protocol, data sources and their limits:
[`readout.md`](readout.md). Open on day 1: custom conversions scoped to
`prep.albertschool.com` (owner, Events Manager), then re-point both ad sets.

**Headline fact-check (web, 2026-09-22).** Verbatim: Fortune *Students can't
reason* (01/07/09/carousel), Inquirer *cognitive surrender* (NYT wire), Le
Monde *crise inédite*, WaPo *deeper problem* (opinion column — caveat). Rewritten
to the published wording on the boards: Fortune *screens*, Euronews *PISA*, WaPo
*teens*, Le Figaro (date 25 mai; the *90 %* kicker was cut). **Excluded from
flight 1:** WaPo *learning* (not a headline), HBR (no such headline or quote),
Les Echos split + reel (publication date unconfirmed, probably 2025).

**Flight-1 ad sets (what actually ships).**

| Ad set | Market | Ads |
|---|---|---|
| statement · UK | GB 16–18 | 01–05, each 4:5 + 9:16 |
| press-split · UK | GB 16–18 | 07 fortune (4:5 + 9:16), euronews, inquirer, fortune-screens · 08 wapo-teens, wapo-blue-books |
| press-reel · UK | GB 16–18 | 09 Fortune A/B · 12 Washington Post A/B |
| press-split · FR | FR 16–18 | 08 monde, figaro |
| press-reel · FR | FR 16–18 | 10 Le Monde A/B |
| statement · FR | FR 16–18 | **empty until FR adapts exist** — run as 5 ad sets and note it |
| carousel · parents | FR+GB 25–54 | 06 |

## Upload checklist (Meta Marketing API via the Ads MCP, or Ads Manager)

1. Campaign: **Leads** objective, optimise for `Lead`; 6 ad sets per
   `experiment.md`, equal daily budget, same schedule, no mid-flight edits.
2. Audiences per §2 (16–18, FR or UK, broad + Advantage+, interests). The
   carousel's parent audience is a separate ad set outside the core test.
3. One ad per bundle: feed PNG + story PNG/MP4 as placement assets; primary
   text, headline and button from the bundle's `post.md`; **final URL
   verbatim** (query params carry attribution — do not strip them).
4. Reels: upload `reel-<slug>.mp4`; set `cover-<slug>.png` as thumbnail.
5. Verify `PageView` → `Lead` fire from a test click before enabling.

## KPIs (fill at readout)

| Ad set | Spend | Thumb-stop | CTR | Signups (`Lead`) | €/signup | Plan-built rate |
|---|---|---|---|---|---|---|
| statement · FR | | | | | | |
| statement · UK | | | | | | |
| press-split · FR | | | | | | |
| press-split · UK | | | | | | |
| press-reel · FR | | | | | | |
| press-reel · UK | | | | | | |
