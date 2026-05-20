# RIE — Marketing Surface

Marketing copy + SEO + AEO + LLMO assets for **RIE**, the proof-of-discipline platform across Fitness, Content, and Gaming.

> Product brief in one line: **"RIE turns your discipline into a record only you can write — and anyone can verify."**

Product context (philosophy, brand, architecture, roadmap, security): [`/apps/rie/docs/context-pack/`](../../apps/rie/docs/context-pack/).

## Folder map

```
rie/
├── pages/
│   ├── home.md
│   ├── features.md
│   ├── how-it-works.md
│   ├── pricing.md
│   ├── for-athletes.md
│   ├── for-creators.md
│   ├── for-gamers.md
│   ├── trust.md
│   ├── streaks.md
│   ├── leaderboards.md
│   ├── security.md
│   ├── about.md
│   ├── contact.md
│   └── faq.md
├── copy/
├── schema/
├── seo/
├── blog/
└── assets/
```

## Pages (priority order)

| Page             | Route                  | Purpose                                                              |
| ---------------- | ---------------------- | -------------------------------------------------------------------- |
| Home             | `/rie`                 | What RIE is, who it is for, what records look like                   |
| Features         | `/rie/features`        | Device pairing, session ingest, streaks, leaderboards, ALVED export  |
| How it works     | `/rie/how-it-works`    | Connect → train → mint proof → share                                 |
| For athletes     | `/rie/for-athletes`    | Persona #1: lifters, runners, hybrid athletes                        |
| For creators     | `/rie/for-creators`    | Persona #2: writers, streamers, makers — "ship rate" as proof        |
| For gamers       | `/rie/for-gamers`      | Persona #3: rank, hours, KDA — verified                              |
| Streaks          | `/rie/streaks`         | Why streaks matter, how RIE protects them from gaming                 |
| Leaderboards     | `/rie/leaderboards`    | Honest leaderboards by category + region                              |
| Trust            | `/rie/trust`           | How proof-of-discipline can't be faked                                |
| Security         | `/rie/security`        | Crypto + device pairing + privacy                                    |
| Pricing          | `/rie/pricing`         | Free core. Pro for power features (advanced charts, API).            |
| About            | `/rie/about`           |                                                                      |
| Contact          | `/rie/contact`         |                                                                      |
| FAQ              | `/rie/faq`             | Schema-wrapped                                                       |

## Voice + tone

- **Aspirational but honest.** RIE is for people who already train, write, or play — not for people looking for a hype cycle.
- **Quiet confidence.** No emoji-driven hype. "100 days" beats "🔥 streak alert! 🔥".
- **Specific.** "Marathon pace 5:23/km verified by Garmin webhook" beats "track your runs".
- **Discipline narrative.** Discipline is the unfair advantage. Proof is the receipt.

## SEO targets (top 5)

1. _"proof of discipline app"_
2. _"verified workout tracker"_
3. _"writing streak tracker"_
4. _"gaming proof of skill"_
5. _"cryptographic streak verification"_

Full list in [`seo/keywords.md`](seo/keywords.md).

## Compliance notes

- **International audience first, India next.** GDPR + CCPA are primary. DPDP applies for Indian users.
- **No medical claims.** RIE is not a health product. Fitness is logged, not prescribed.
- **No gambling.** Leaderboards are achievement displays, not stakes.
- **Wearable data is sensitive.** Heart rate, GPS routes, sleep — encrypted at rest, never sold.

## How to contribute

Same as Vero — edit Markdown, open PR, run checks, ship.

## Engineering handoff

Engineer pulls into `apps/marketing/src/app/rie/<route>/page.tsx`.
