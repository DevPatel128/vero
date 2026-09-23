# Investor Narrative

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-23
> Sources: Documents/14; 03_RESEARCH/RESEARCH.md (claim audit); website/site (traction facts)

## Rule

This is an evidence-based narrative, not a place to manufacture a compelling story. Every `PROJECTION` and `UNVERIFIED` label below is load-bearing — do not remove one without adding a source to `03_RESEARCH/SOURCES.md`.

## One sentence

VERO is building the verified proof-of-work identity layer for India's workforce: workers earn permanent, signed records for real work completed, and businesses hire by proof instead of self-reported claims.

## Problem

India has a large working-age population (`Documents/14` states 600M+; `UNVERIFIED`, no source given — see `03_RESEARCH/RESEARCH.md` R-001 to R-004). Resumes are unverifiable, gig platforms optimize for lowest price rather than best work, and reputation does not transfer between platforms. Full argument: `02_PRODUCT/THESIS.md`. No independent user research or market study has been conducted to date; this is the founder's reasoned account, not yet field-validated.

## Insight

Every existing hiring-trust product (resume, gig-platform rating, portfolio) is self-reported or platform-controlled. A record that requires confirmation from the person who was actually on the other side of the work is structurally harder to fabricate. This is the mechanism the product bets on; it has not yet been tested against real adversarial gaming.

## Product

What exists today: a live marketing site and waitlist (`website/site`, deployed on Vercel). What is specified but not built: the core application (identity verification, job posting, escrow, dual-signature records, dispute resolution) — prototyped once, archived, and unreviewed (`09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/`). No user has completed a real transaction on VERO as of this writing.

## Why now

Three claimed trends: AI lowering the cost of fake credentials, growth in project-based work, and an India workforce inflection point (`Documents/1`, `Documents/14`). None of the three is independently benchmarked in this repo — see `03_RESEARCH/RESEARCH.md` R-009, R-010.

## Market

See `07_BUSINESS/MARKET.md` for full detail. TAM/SAM/SOM figures in `Documents/14` (`$400B+` gig economy by 2030, `90M+` workers, `50M+` SMBs, Bengaluru SAM of `1M+` target workers and `50,000+` SMBs) carry no cited source in the originating document and are labeled `UNVERIFIED` in `03_RESEARCH/RESEARCH.md` (R-001 to R-004). Do not present these as sourced figures without independent verification.

## Business model

See `07_BUSINESS/BUSINESS-MODEL.md`. Workers free forever. Businesses pay a subscription (indicative tiers in `Documents/8`, not yet validated with real customers) plus a 5% escrow fee on paid work, split 2.5%/2.5%. Compared against stated (unverified) competitor commissions of ~20-25% for Fiverr, Upwork, and Urban Company.

## Traction

None verified. The waitlist exists and is live, but no signup-count, conversion, or engagement metric has been captured as authoritative in this repo as of 2026-09-23. The production waitlist store was found broken during this PR's audit (Upstash Redis unreachable) and is a pending human fix — see `06_OPERATIONS/INCIDENTS.md` and the reliability fixes in this PR's commit history. Any traction number used externally must be pulled live from `/api/waitlist/stats` at time of use, after confirming `/api/health` reports the store reachable, not from this document.

## Growth

See `07_BUSINESS/GTM.md`. Planned channels: campus ambassador program, startup/creative community activation in Bengaluru, and worker word-of-mouth via shareable record milestones (`Documents/9`). None has been executed; all figures under "what success looks like" in `Documents/9` are `PROJECTION`, not traction.

## Competition

Fiverr/Upwork (bidding marketplaces), LinkedIn (self-reported claims), Urban Company (platform-owned worker profiles, narrower category scope), and informal word-of-mouth. Full comparison: `Documents/7. How VERO Beats the Competition.md`. VERO has no direct competitor building the same dual-signature, portable-record mechanism, as far as documented in this repo — this has not been independently verified through a competitive landscape search.

## Moat

Claimed, not yet demonstrated: a longitudinal database of dual-signed records that cannot be replicated quickly; a compounding trust graph where each signed job increases network value; local density in Bengaluru built before a competitor can establish presence. See `02_PRODUCT/THESIS.md` "Defensibility."

## Roadmap

See `02_PRODUCT/PRODUCT.md` "Product lifecycle" for the seven-phase plan (`Documents/13`). Only Phase 0 (pre-launch marketing site) is complete.

## Risks

- The core trust mechanism is untested against real gaming attempts.
- Market-size claims are unsourced (`03_RESEARCH/RESEARCH.md`).
- No committed funding, and the funding ask below is unfilled.
- DPDP compliance claims need legal review before being made publicly (see `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 4).
- The core product is unbuilt in production; only the marketing/waitlist layer is live.

## Capital

`UNKNOWN`. `Documents/14` explicitly marks the funding ask as "[TO BE FILLED with specific round size, use of funds, equity structure]." Indicative (not committed) use-of-funds split from the same source: engineering 40%, operations 20%, growth 20%, compliance/legal 10%, reserves 10%.

## Founder advantage

Dev Patel, founder of VROE Labs, building three proof-based products (VERO, RIE, Trove) sharing a trust-infrastructure philosophy. Beyond this, no independently verifiable founder-market-fit evidence (prior domain experience, network, or track record) is documented in this repo; `Documents/14` marks the team/advisor section as "[TO BE FILLED based on actual team composition]."

## Change / investment decision

For a material investment, product, infrastructure, or growth change, use the framework in `01_PRINCIPLES/PRINCIPLES.md`: why, impact, how, cost, and whether the cost is justified against the lowest-cost approach that satisfies the requirement.

## Claim audit

| Claim | Source | Status |
|---|---|---|
| $400B+ gig economy by 2030 | `Documents/14` | UNVERIFIED — no citation |
| 90M+ gig/services workers | `Documents/14` | UNVERIFIED — no citation |
| 50M+ informal-hiring SMBs | `Documents/14` | UNVERIFIED — no citation |
| Fiverr/Upwork ~20%, Urban Company ~25% commission | `Documents/7`, `Documents/8`, `Documents/14` | UNVERIFIED — internally consistent, not independently re-checked |
| Phase 1 targets (3,000 workers / 600 businesses / 1,000 records) | `Documents/13`, `Documents/14` | PROJECTION, and conflicts with `Documents/6`'s smaller figure for the same phase — see `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 2 |
| Funding ask | `Documents/14` | UNKNOWN — explicitly unfilled in source |
| Any traction number (signups, jobs completed) | — | None currently verified; must be pulled live, not asserted from this document |

## Investor quality gate

This document, as of 2026-09-23, would **fail** the reject criteria below if any of its `UNVERIFIED`/`UNKNOWN`/`PROJECTION` labels were silently dropped before external use:
- fabricated metrics
- unsupported market claims
- fake customer quotes
- guaranteed outcomes
- unexplained projections
- claims contradicted by `RESEARCH.md`

No customer quotes exist in this repo. No guaranteed outcomes are stated here. Every projection above is explicitly labeled.
