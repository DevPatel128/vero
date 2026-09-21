# Start here

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-21

VROE Labs builds proof-based products. **Vero** is verified proof-of-work identity and hiring infrastructure. It launches in Bengaluru. Its public site is `website/site` (Next.js on Vercel). This folder tree is the single documentation system for the repo. Every concept has one canonical home. Other documents link to it; they do not copy it.

> I know what I need, so I know exactly where it lives.

## Where to go

| Need to understand | Go here |
|---|---|
| What is this product? | `02_PRODUCT/PRODUCT.md` |
| Why does it exist? | `02_PRODUCT/THESIS.md` |
| How should it feel? | `02_PRODUCT/EXPERIENCE.md` |
| Rules every decision follows | `01_PRINCIPLES/PRINCIPLES.md` |
| What did we research? | `03_RESEARCH/RESEARCH.md` (sources: `SOURCES.md`) |
| Visual system, tone, accessibility, responsive rules | `04_DESIGN/` |
| How do we build it? | `05_ENGINEERING/README.md` |
| How is it secured? | `05_ENGINEERING/SECURITY/` |
| How do we deploy and roll back? | `05_ENGINEERING/CI-CD/` and `06_OPERATIONS/ROLLBACKS.md` |
| Something broke | `06_OPERATIONS/` (start with `INCIDENTS.md`) |
| Pricing, market, growth, metrics | `07_BUSINESS/` |
| What do we tell investors? | `07_BUSINESS/INVESTOR.md` |
| Why did we decide X? | `08_DECISIONS/DECISIONS.md` |
| Rejected or superseded material | `09_ARCHIVE/` (never current truth) |

## Read first, by task

| Task | Read, in order |
|---|---|
| Change site code | `01_PRINCIPLES` → `05_ENGINEERING/README.md` → `06_OPERATIONS/ROLLBACKS.md` |
| Change site copy | `04_DESIGN/CONTENT.md` → `website/CLAUDE.md` |
| Change design | `04_DESIGN/DESIGN-SYSTEM.md` → `04_DESIGN/ACCESSIBILITY.md` |
| Change product scope | `02_PRODUCT/PRODUCT.md` → `08_DECISIONS/DECISIONS.md` |
| Make a business or investor claim | `03_RESEARCH/RESEARCH.md` first. No source, no claim. |
| Anything involving AI agents | `05_ENGINEERING/AI/AI_OPERATING_RULES.md` |

## Lifecycle

`IDEA → INTERVIEW → RESEARCH → VIABILITY → PRODUCT → THESIS → EXPERIENCE → INVESTOR → DESIGN → ENGINEERING → TEST → PREVIEW → HUMAN APPROVAL → PRODUCTION → OBSERVE → IMPROVE`. The full map is in `SUMMARY.md`. The governance rules are in `05_ENGINEERING/AI/PRODUCT_CREATION_SYSTEM.md`.

## Authority

AI investigates, drafts, reviews and implements. Humans decide product, legal, financial, privacy, security exceptions and production releases. Merging to `main` deploys to production, so a merge is a production decision.

Every meaningful change answers: why, impact and results, how, cost, and whether the cost is justified. Choose the lowest-cost option that meets the requirements.

## Document status

Every major document carries `Status / Owner / Version / Last updated`. Statuses: `Draft → Review → Approved → Superseded → Archived`. Documents created during the 2026-09 framework adoption are `Draft` or `Review`. **Only the owner marks a document `Approved`.** Do not treat a `Draft` as an approved decision.

## Filename index

Framework documents refer to each other by bare filename. Resolve them here.

| Filename | Location |
|---|---|
| `PRINCIPLES.md` | `01_PRINCIPLES/` |
| `PRODUCT.md` `THESIS.md` `EXPERIENCE.md` `INTERVIEW.md` | `02_PRODUCT/` |
| `RESEARCH.md` | `03_RESEARCH/` |
| `ENGINEERING.md` (split, sections keep their numbers) | `05_ENGINEERING/`, see its README |
| `AI_OPERATING_RULES.md` `DOCUMENT_AGENT.md` `RESEARCH_AGENT.md` `REVIEW_AGENT.md` `UPDATE_AGENT.md` `PRODUCT_CREATION_SYSTEM.md` | `05_ENGINEERING/AI/` |
| `INVESTOR.md` | `07_BUSINESS/` |
| `DECISIONS.md` | `08_DECISIONS/` |
| `SUMMARY.md` `Documentation_Organization_System.md` | `00_START_HERE/` |

## Code map

| Path | What | Note |
|---|---|---|
| `website/site/` | Live marketing site (Next.js 16, Tailwind 3). Deploys to Vercel. | **Do not move or rename.** The Vercel project builds this path. |
| `website/CLAUDE.md`, `website/shared/`, `website/products/vero/` | Copy contracts for site content | Keep in place. |
| `09_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/` | Product-app prototype | Archived. Not deployed. |

## Repository rules

- The repo may become public. Never commit secrets, real credentials or personal data. Examples use placeholders.
- Never fabricate. Unknown is a valid answer. Label facts, inferences, assumptions, hypotheses and projections.
- Before creating a document, check whether a canonical one exists. Update it instead.
