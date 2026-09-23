# Thesis

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-23
> Sources: Documents/1, 2, 7, 9, 14; 09_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §4; 03_RESEARCH/RESEARCH.md

## Core belief

LinkedIn shows claims. VERO shows proof. Verified execution is rare; talent is common. Work should become identity — a portable, signed history that belongs to the person who did the work, not to whichever platform hosted it.

## Problem

Nobody can currently answer, reliably, "did this person actually do what they say they did?" Five structural failures, detailed in `Documents/2. The Problem VERO Solves.md`:

1. Resumes are unverifiable self-report.
2. Gig platforms (Fiverr, Upwork) optimize for lowest bid and fastest reply, not best work.
3. Portfolios can be faked in an afternoon, and AI makes this faster every year.
4. Star ratings measure client satisfaction with price/speed, not work quality.
5. Reputation is platform-owned — it does not travel with the worker who earned it.

## Insight

Existing platforms treat reputation as something the platform owns and grants, not something the worker earns and keeps. That single design choice is why every incumbent's trust signal is weak: it is built to serve platform lock-in, not to be a reliable, transferable signal of capability. A record co-signed by the two people who were actually there (worker and client) is structurally harder to fake than any self-reported or platform-generated score.

## Why now

Three converging trends (`Documents/1`, `Documents/14`):

1. AI is making fake credentials — portfolios, case studies, write-ups — cheap to produce and hard to distinguish from real ones. This raises the value of verified, human-attested work records rather than eliminating the need for them (a claim, not independently benchmarked here — see `RESEARCH.md`).
2. Project-based and freelance work is growing as a share of how people build careers, increasing the need for portable proof that survives moving between platforms and employers.
3. India's workforce is described as being at a structural inflection point: a large young population, dense urban startup ecosystems, and a growing services economy without reliable hiring-trust infrastructure (`Documents/1`, `Documents/14`). This is stated in the source material without a cited demographic source; treat as ASSUMPTION pending `RESEARCH.md` verification.

## Product answer

Every job goes through: verify identity once → agree written scope (and fund escrow for paid work) → do the work → both sides sign → a permanent, linked record is created. See `02_PRODUCT/PRODUCT.md` and `Documents/4` for the full mechanism. The dual signature is the load-bearing element: neither side can create or deny a record alone.

## Differentiation

Against the closest comparables (`Documents/7. How VERO Beats the Competition.md`):

- **Fiverr/Upwork** — bidding marketplaces; VERO has no bidding, and workers own their reputation rather than losing it if they leave.
- **LinkedIn** — entirely self-reported; VERO's records are co-signed by the client who was actually there.
- **Urban Company** — verified but platform-owned worker profiles, narrow category scope, and a stated ~25% commission; VERO gives workers ownership of the record and charges a stated 5% escrow fee.
- **Word of mouth** — the dominant real mechanism today, but limited to people already in someone's network; VERO digitizes and extends it to strangers.

(Competitor commission percentages are as stated in the source documents, without an independently verified citation — see `RESEARCH.md`.)

## Long-term direction

If the thesis holds, VERO's record becomes the default credential a serious employer or client checks first — ahead of a resume, LinkedIn profile, or portfolio — because those can be fabricated and the VERO record, by construction, cannot be created unilaterally. Long-term direction per `Documents/13`: category depth in Bengaluru, then careful multi-city expansion, then blockchain-anchored portability so the credential survives even if VERO itself does not.

## Defensibility

- A longitudinal database of dual-signed work records cannot be replicated quickly by a new entrant — each record requires two real, verified participants and real completed work (`Documents/7`, `Documents/14`).
- The trust graph compounds: each new signed job increases the value of the network for every existing participant, which is a network effect distinct from a social-media growth loop (`Documents/9`).
- Local density (Bengaluru-first, zone-by-zone) is intended to build real trust networks before a competitor can establish presence at scale (`Documents/9`).

These are the mechanisms claimed to produce defensibility; none has yet been tested against a real competitive response, since the product has not shipped.

## Evidence

See `03_RESEARCH/RESEARCH.md` for the full evidence ledger. In summary: the problem description (resumes, gig-platform incentives, AI-generated fakes) is argued from first principles rather than cited studies. Market-size and competitor-commission figures in `Documents/7`, `Documents/8`, and `Documents/14` are stated without a traceable source and are marked UNVERIFIED in the research ledger.

## Falsifiers

What would prove this thesis wrong:

- Workers do not value owning a portable record enough to complete the verification and dual-signature flow (measurable via activation and first-job-completion rate — `07_BUSINESS/METRICS.md`).
- Businesses do not trust a peer-signed record more than existing signals (resume, informal reference) enough to change hiring behavior.
- The dual-signature mechanism proves easy to game at scale (collusive signing, fake job pairs) once real adversarial pressure is applied — something the anti-gaming design in `Documents/5` has not yet been tested against.
- Escrow/subscription pricing at the stated 5% is not low enough to win share from incumbents, or is too low to sustain the operations (verification, dispute mediation) the trust model depends on.

## Decision

`ACTIVE`

Reason: this is the founder's stated current direction, worked through in detail across `Documents/1-15` and reflected in the live `website/site` product framing. It has not been tested against real users or a shipped product, so "ACTIVE" here means "the working thesis the product is being built against," not "validated."
