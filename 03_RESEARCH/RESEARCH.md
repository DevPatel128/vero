# Research

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-23
> Sources: Documents/1-2, 7-9, 14; website/site legal/status pages

## Purpose

Evidence base for product decisions. This file is updated when the product, market, technology, users, regulations, or assumptions change.

## Research question

- Product: VERO
- Question: is the founding thesis (proof-of-work identity solves a real, valuable problem for Indian workers and hiring businesses) supported by verifiable evidence, and where is it not?
- Decision this research supports: whether to proceed to and past Phase 1 (Bengaluru pilot) as scoped in `02_PRODUCT/PRODUCT.md`
- Date: 2026-09-23
- Research owner: Dev Patel

## Evidence ledger

Claim label key: `FACT` (verifiable, sourced), `EVIDENCE` (supports a claim, not conclusive alone), `INFERENCE` (reasoned from other facts), `ASSUMPTION` (unverified premise treated as true for planning), `HYPOTHESIS` (untested prediction), `PROJECTION` (a target, not a measurement), `UNKNOWN`.

| ID | Claim | Source | Source type | Date | Evidence | Confidence | Contradictions |
|---|---|---|---|---|---|---|---|
| R-001 | India's gig/freelance economy is estimated at $400B+ by 2030 | `Documents/14` | Model inference | 2026-05 | No citation given in source | Low — UNVERIFIED | None found, but also not corroborated |
| R-002 | 90M+ workers expected in India's broader gig/services sector | `Documents/14` | Model inference | 2026-05 | No citation given in source | Low — UNVERIFIED | None found |
| R-003 | 50M+ SMBs in India hire informally | `Documents/14` | Model inference | 2026-05 | No citation given in source | Low — UNVERIFIED | None found |
| R-004 | Bengaluru population 13M+, 1M+ young high-agency workers in ICP | `Documents/14` | Model inference | 2026-05 | No citation given in source | Low — UNVERIFIED | None found |
| R-005 | Fiverr commission ~20% | `Documents/7`, `Documents/8`, `Documents/14` | Model inference | 2026-05 | Stated consistently across three documents; not independently re-verified against Fiverr's current public fee schedule in this research pass | Medium (consistent internally; not independently checked) | None internal |
| R-006 | Upwork commission ~20%+ | `Documents/7`, `Documents/8`, `Documents/14` | Model inference | 2026-05 | Same as R-005 | Medium | None internal |
| R-007 | Urban Company commission up to 25% | `Documents/7`, `Documents/8` | Model inference | 2026-05 | Same as R-005 | Medium | None internal |
| R-008 | India's DPDP Act 2023 requires consent, purpose limitation, data minimization, breach notification, grievance redress | `Documents/15`, old `CLAUDE.md` §17/§26 | Model inference (describing a real statute) | 2026-05 | The Act itself is a real, public law; this repo's description of it has not been checked line-by-line against the Act's text in this research pass | Medium — needs legal review before any compliance claim is published (see `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 4) | Grievance/rights-response timelines conflict between documents — see item 4 |
| R-009 | AI is making fake work credentials cheaper to produce | `Documents/1`, `Documents/2` | Inference | 2026-05 | Reasoned from observable capability of current generative AI tools; no controlled study cited | Medium — plausible, not measured | None found |
| R-010 | Project-based/freelance work is a growing share of how people build careers | `Documents/1`, `Documents/14` | Model inference | 2026-05 | No citation given | Low — UNVERIFIED, commonly asserted claim in the freelance-economy discourse generally | None found |
| R-011 | Phase 1 target: 3,000 workers, 600 businesses, 1,000+ signed records by month 6 | `Documents/13`, `Documents/14` | Internal projection | 2026-05 | Planning target, not a measurement | N/A — `PROJECTION` | Conflicts with `Documents/6`'s 200+ records / 50+ businesses target for the same phase — see contradiction item 2 |
| R-012 | SOM: 30,000+ workers, 5,000+ businesses, ₹50-100 Cr annual escrow volume in 24 months | `Documents/14` | Internal projection | 2026-05 | Planning target | N/A — `PROJECTION` | None internal, but downstream of unverified R-001 to R-004 |
| R-013 | Waitlist and marketing site are live in production | `website/site` (this repo, Vercel deployment) | Primary (direct observation) | 2026-09 | Confirmed via Vercel connector and live HTTP checks during this PR's audit | High — `FACT` | None |
| R-014 | The product application (auth, bookings, escrow, dispute flows) is not deployed | This repo (`09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/`) | Primary (direct observation) | 2026-09 | Confirmed: no git history before this PR, not referenced by any deployment config, explicitly archived in this PR | High — `FACT` | None |

## Required research areas

Status as of 2026-09-23:

- User problem and behaviour — **not started.** No user interviews or usability testing recorded in this repo.
- Existing alternatives and competitors — **partial.** Qualitative comparison exists (`Documents/7`); commission figures unverified (R-005 to R-007).
- Market and demand — **not started** beyond unsourced TAM/SAM/SOM figures (R-001 to R-004, R-012).
- Pricing and willingness to pay — **not started.** `Documents/8` states indicative price ranges explicitly pending validation with early business users.
- Distribution — **partial.** Channel strategy is specified (`Documents/9`); no data on channel performance since nothing has launched.
- Technical feasibility — **substantially addressed** for the marketing site (built, deployed); **not addressed** for the core product (auth, escrow, disputes, trust engine) beyond an archived, unreviewed prototype.
- Security/privacy implications — **partial.** DPDP intent documented (`Documents/15`); needs legal review (R-008) and reconciliation of the SLA contradiction (item 4).
- Legal/regulatory implications — **not started** beyond DPDP intent. Razorpay Payment Aggregator licensing referenced but not verified in this pass.
- Operational complexity — **partial.** Dispute-mediation and verification-review operations are specified (`Documents/5`, `Documents/6`) but unstaffed (`Documents/14` hiring priorities).
- Unit economics and cost — **not started.** No cost-per-acquisition, CAC/LTV, or operating-cost model found in the repo.
- Accessibility — see `04_DESIGN/ACCESSIBILITY.md` for what is verified on the live site; product-level accessibility for the unbuilt core product is undefined.
- Risks and failure modes — **partial.** `Documents/12` defines explicit failure conditions (dispute rate, retention thresholds); no probability or mitigation analysis beyond the product design itself.

## Research rules

1. Start with the decision, not with random browsing.
2. Prefer primary and authoritative sources.
3. Use multiple independent sources for consequential claims.
4. Record URLs and access/publication dates.
5. Resolve contradictions explicitly.
6. Never convert absence of evidence into evidence of absence.
7. Mark uncertain information as uncertain.
8. Research freshness-sensitive claims again before major decisions.
9. Research lower-cost alternatives when cost materially affects the decision.

## Research output

### What we know

The marketing site and waitlist are real, live, and technically sound apart from the operational gaps fixed elsewhere in this PR (see `05_ENGINEERING/CI-CD/`, `06_OPERATIONS/`). The product mechanism (dual-signature records, escrow, tiered dispute resolution) is coherently specified. The core application is not built in production.

### What we believe

That verified proof-of-work records solve a real hiring-trust problem in India, and that Bengaluru is a reasonable first market. Both are argued persuasively in the source documents but not independently evidenced in this repo.

### What we do not know

Market size (R-001 to R-004), competitor economics (R-005 to R-007) beyond the documents' own internally consistent claims, actual willingness to pay at the stated price points, and whether real users behave as the product's core mechanic assumes (that a peer-signed record is trusted more than existing signals).

### What changed

This is the first time these claims have been collected into one evidence ledger. Previously they were scattered across `Documents/1-15`, the archived `CLAUDE.md`, and duplicated context-pack files with no cross-referencing.

### Risks

- Building past Phase 1 on unverified market-size assumptions (R-001 to R-004) before validating demand.
- Publishing compliance claims (R-008) without legal review — DPDP is a real statute with real penalties for misrepresentation.
- The core dual-signature mechanism being untested against real adversarial gaming attempts before scale.

### Opportunities

- The marketing site and waitlist already exist and can be used to gather real signal (signup rate by role, stated use case) before building the full application — a cheaper validation step than has been used so far.
- `Documents/12`'s Sean Ellis "very disappointed" test gives a concrete, low-cost way to measure product-market fit once the first cohort of workers has completed real jobs.

### Recommendation

Proceed with Phase 1 as scoped, on the condition that: (a) market-size and competitor-commission figures (R-001 to R-007) are either sourced or explicitly labeled as internal estimates in any external-facing material (investor deck, press), and (b) the DPDP compliance claims (R-008) and the grievance/rights-response SLA contradiction get legal review before the live site's claims are treated as final.

## Viability decision

`PROCEED WITH CONDITIONS`

Reason: the product thesis and mechanism are coherent and the marketing infrastructure to start validating demand already exists. The conditions above are about not overstating unverified numbers externally, not about the underlying plan.
Evidence: this ledger; full detail in `Documents/1-15` and this PR's audit of `website/site`.
Open questions: all items in "What we do not know," and the six contradictions in `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md`.
Human approval: (pending)
