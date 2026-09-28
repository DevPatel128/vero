# Business Model

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Documents/8, 14; 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §25; website/site pricing page

## Core principle

Workers never pay to build their own record. Monetization comes from the side that benefits most from verified trust: businesses that hire (`Documents/8`).

## Revenue streams

| Stream | Who pays | Amount | Status |
|---|---|---|---|
| Worker access | Workers | Free, always | Product principle, non-negotiable (`02_PRODUCT/PRODUCT.md` non-goals) |
| Business subscription | Businesses | See "Pricing conflict" below | Not yet charged in production — no billing is live |
| Escrow fee | Both sides, split evenly | 5% of paid job value (2.5% worker / 2.5% business) | Specified, not yet implemented in production |
| Enterprise tier (Phase 3+) | Large enterprises | Custom | Not scoped beyond a one-line mention |

## Pricing conflict — not resolved here

Two different pricing structures exist in the source material, and a third in the live site, none reconciled:

- `Documents/8. How VERO Makes Money.md`: three tiers — Starter (₹499-999/month), Growth (₹2,499-4,999/month), Studio (custom) — explicitly marked as indicative, pending validation with early business users.
- Archived root `CLAUDE.md` §25: "Businesses — SaaS" as a single line item plus a 5% escrow fee, no tier breakdown.
- `website/site`'s live `/pricing` page: a single Business plan at a flat monthly price plus a custom Studio tier — no Starter/Growth split.

See `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 3. Treat the live site as what a prospective customer sees today; treat `Documents/8`'s three-tier structure as a proposal pending a decision, not current pricing.

## Escrow fee mechanics

Per `Documents/8`: business funds the agreed amount into escrow (via Razorpay in the specification) before work starts. On dual signature, the worker receives the agreed amount minus 2.5%; VERO retains 2.5% from each side, totaling 5%. This is markedly lower than the commissions VERO's source documents attribute to Fiverr (~20%), Upwork (~20%+), and Urban Company (~25%) — see `03_RESEARCH/RESEARCH.md` R-005 to R-007 for the unverified status of those competitor figures.

## Launch pricing strategy

`Documents/8`: early Phase 1 businesses get free or heavily discounted access, to build enough two-sided density for the marketplace to function before charging full price. This is a deliberate subsidy, not evidence that the eventual price point is validated.

## Future revenue (Phase 3+, not committed)

From `Documents/8`: advanced business analytics, paid verified-credential exports for workers (a departure from "workers never pay" that would need explicit reconciliation with the core principle if pursued), an enterprise API tier, and premium hiring tools.

## Cost side

Not documented in this repo. No unit-economics model (CAC, LTV, gross margin, operating cost per verified worker or dispute) exists. `03_RESEARCH/RESEARCH.md` marks "unit economics and cost" as not started.

## Governance

Per `01_PRINCIPLES/PRINCIPLES.md` rule 21 (lowest justified cost) and the framework's change-decision discipline: any pricing change should record why, impact, cost, and lower-cost alternatives in `08_DECISIONS/BUSINESS/`.
