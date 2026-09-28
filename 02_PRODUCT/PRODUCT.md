# Product

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-23
> Sources: Documents/1-9, Documents/13, 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §§2-3, 14, website/site (career-path and pricing pages)

## Identity

- **Product name:** VERO
- **One-line description:** A verified proof-of-work identity and hiring platform. Workers build a portable, signed record of real work completed. Businesses hire from that record instead of a resume.
- **Product promise:** LinkedIn shows claims. VERO shows proof.
- **Target user:** Three groups. Workers/professionals (18-28, high-agency: students, freelancers, tradespeople, creatives) who need to prove capability they cannot currently show. Businesses (SMBs, cafés, studios, startups, agencies) who need to hire without guessing. Solo clients who need one trustworthy person for one job. Full detail: `Documents/3. Who VERO Is Built For.md`.
- **Core problem:** There is no reliable way to answer "did this person actually do what they say they did?" Resumes are unverifiable, gig-platform ratings measure satisfaction not quality, portfolios can be faked in minutes with AI, and reputation built on one platform does not transfer to the next. See `THESIS.md`.

## Product thesis

See `THESIS.md` for the full argument. In short: AI is making fake credentials cheap at the same time project-based work is growing, so verified, human-attested work records are becoming scarce and valuable. VERO is the infrastructure that produces them.

## User outcome

- Workers: their real work becomes provable, portable, and permanently theirs — not owned by whichever platform they happen to be using.
- Businesses: hiring becomes evidence-based instead of guesswork, at a fraction of what Fiverr, Upwork, or Urban Company charge.
- Both: disputes are handled through a defined, logged process instead of being left to platform discretion.

## Core jobs

1. A worker proves they completed a specific piece of real work, confirmed by the person who hired them.
2. A business finds and hires someone whose past work is already verified, instead of screening from unverifiable claims.
3. Both sides complete a paid transaction with money held safely until the work is confirmed done.

## Product principles

Reference `01_PRINCIPLES/PRINCIPLES.md` for the full constitution. Product-specific pillars (from `Documents/1` and the archived `CLAUDE.md` §4):

- Proof over claims — the sentence that shapes every decision.
- Trust before scale, proof before promotion, clarity before complexity.
- No bidding, ever — VERO does not want a race to the bottom on price.
- Workers never pay to build their record.
- A record belongs to the worker, not to VERO, and is exportable.
- Every record requires two signatures. Neither side can create history alone.

## Core capabilities

| Capability | User value | Evidence | Priority |
|---|---|---|---|
| Identity verification (phone/email; optional government ID for a higher trust tier) | Anonymous accounts cannot create verified records — the foundation everything else depends on | `Documents/4` Step 1, `Documents/6` | P0 (Phase 1) |
| Job posting and single-screen application (no bidding) | Businesses describe real work; workers apply without a price war | `Documents/4` Step 2, `Documents/6` | P0 (Phase 1) |
| Escrow-protected payment (Razorpay) | Neither side risks money before work is confirmed | `Documents/4` Step 2, `Documents/10` | P0 (Phase 1) |
| Dual-signature work record | The core trust mechanism: a record only exists if both sides confirm it | `Documents/4` Step 4, `Documents/5` | P0 (Phase 1) |
| Public, portable work-record profile | Workers own and can export their history | `Documents/4` Step 5, `Documents/1` | P0 (Phase 1) |
| Three-tier dispute system (direct → mediated → reviewed) | Fair to both sides; every step logged | `Documents/4`, `Documents/5` | P0 (Phase 1) |
| ALVED trust signals (completion rate, punctuality, repeat-client rate, dispute history, endorsements) | Trust standing is multi-signal and explainable, not a single gameable number | `Documents/5`, old `CLAUDE.md` §11 | P0 (Phase 1) |
| Native mobile app | Workers apply and message on the go | `Documents/13` Phase 2 | P2 |
| AI-assisted job matching | Reduces search friction once there is enough data | `Documents/10` | P2+ |
| Blockchain-anchored credentials | Full portability beyond VERO itself | `Documents/13` Phase 5 | P5 |

## Change / feature decision

For every meaningful new capability or change, use the framework in `01_PRINCIPLES/PRINCIPLES.md` and record it in `08_DECISIONS/`: why, impact/results, how, cost, and whether the cost is justified.

## Non-goals

From `Documents/6` and `Documents/13`:

- Not a bidding marketplace, ever.
- Not a social feed or follow system.
- No subscription or fee charged to workers, ever.
- No anonymous accounts.
- No AI-generated profiles, reviews, or endorsements.
- No blockchain credentials, enterprise API, or public leaderboards in Phase 1.
- No speculative token or crypto-first branding, ever (`Documents/13`).

## Success

See `07_BUSINESS/METRICS.md` for the full metric set. North star: percentage of active workers with 3+ signed work records in their first 90 days (targets: 15% by month 3, 25% by month 6, 40% by month 12 — `Documents/12`).

## Constraints

- **Technical:** live site (`website/site`) runs on Next.js 16 / Vercel / Upstash Redis; the product application described in `Documents/10` (Supabase, Razorpay, Argon2id/JOSE) is prototyped but archived and not deployed (`10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/`), so every capability above the waitlist is currently unbuilt in production.
- **Financial:** workers free forever; monetization is business subscription plus 5% escrow fee (`07_BUSINESS/BUSINESS-MODEL.md`). No committed funding round documented (see `07_BUSINESS/INVESTOR.md`, funding ask marked `UNKNOWN`).
- **Legal:** India DPDP Act 2023, Razorpay Payment Aggregator licensing for escrow. See `07_BUSINESS/LEGAL-COMPLIANCE.md`.
- **Operational:** dispute mediation and identity verification require a human operations function; not yet staffed (see `07_BUSINESS/INVESTOR.md` hiring priorities).
- **Time:** no committed launch date. `website/site` shows conflicting dates in different places (flagged in `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md`).

## Assumptions

Labelled by evidence class (`03_RESEARCH/RESEARCH.md` has the full ledger):

- ASSUMPTION: Bengaluru's density and startup ecosystem make it the right first market (`Documents/9`). Not independently verified in this repo.
- ASSUMPTION: a 5% escrow fee plus business subscription is low enough to win share from Fiverr (20%), Upwork (20%+), and Urban Company (25%) (`Documents/7`, `Documents/8`). Those competitor commission figures are stated without a cited source.
- ASSUMPTION: dual-signature records are meaningfully harder to fake than the alternatives (`Documents/5`). Reasoned from the mechanism, not tested against real fraud attempts.
- PROJECTION: all Phase 1-6 growth numbers in `Documents/12`, `Documents/13`, `Documents/14` are targets, not measurements — nothing has shipped yet.

## Product lifecycle

Two conflicting phase numberings exist in the source material; not resolved here (see `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 1). Using `Documents/13`'s numbering, which is the more detailed and recent source:

- **Phase 0 — Pre-launch (current).** Marketing site live, waitlist collecting signups, strategic foundation documented, application in development.
- **Phase 1 — Bengaluru pilot (months 1-6 post-launch).** Five zones (Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City), six launch categories, real escrow-protected jobs.
- **Phase 2 — Category and local depth (months 6-12).** New categories, native mobile app, ambassador program expansion.
- **Phase 3 — City expansion (months 12-24).** Delhi NCR, Mumbai, Pune, Hyderabad, Chennai, one city at a time.
- **Phase 4 — Trust and reputation maturity (months 18-30).** Recruiter/HR product layer, education-institution partnerships.
- **Phase 5 — Blockchain extension (months 24-36).** Anchored credentials, optional smart-contract escrow, stablecoin payments.
- **Phase 6/7 — Wider and ecosystem expansion (year 3+).** International markets, mentor/employer/education partner network.

Full detail and phase-advancement rules: `Documents/13. VERO Roadmap — Where We Are Going.md`.

## Approval

Status: Draft
Approved by:
Date:
