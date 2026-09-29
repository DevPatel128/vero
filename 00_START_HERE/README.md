# Start here

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Source: adapted from Wolf v3's `00_START_HERE/README.md`; supersedes the v2 (`The Framework.`) version of this file

VROE Labs builds proof-based products. **Vero** is verified proof-of-work identity and hiring infrastructure. It launches in Bengaluru. Its public site is `website/site` (Next.js on Vercel). This folder tree is the single documentation system for the repo, on the **Wolf v3** layout: 11 numbered areas, `00_START_HERE` through `10_ARCHIVE`. Every concept has one canonical home. Other documents link to it; they do not copy it.

> I know what I need, so I know exactly where it lives.

## If you only have 5 minutes

Read, in order: `README.md` (this file) → `V3_FRAMEWORK.md` → `DOCUMENTATION_SYSTEM.md`.

## Where to go

| Need to understand | Go here |
|---|---|
| What is this product? | `02_PRODUCT/PRODUCT.md` |
| Why does it exist? | `02_PRODUCT/THESIS.md` |
| How should it feel? | `04_DESIGN/EXPERIENCE.md` |
| Rules every decision follows | `01_PRINCIPLES/PRINCIPLES.md` |
| What did we research? | `03_RESEARCH/RESEARCH.md` (sources: `SOURCES.md`) |
| Visual system, tone, accessibility | `04_DESIGN/` |
| How do we build it? | `05_ENGINEERING/ENGINEERING.md` |
| How is it secured? | `05_ENGINEERING/SECURITY.md`, `THREAT-MODEL.md` |
| How do we deploy and roll back? | `05_ENGINEERING/DEPLOYMENT.md`, `06_OPERATIONS/ROLLBACKS.md` |
| Something broke | `06_OPERATIONS/` (start with `INCIDENTS.md`) |
| Pricing, market, growth, metrics | `07_BUSINESS/` |
| What do we tell investors? | `07_BUSINESS/INVESTOR.md` |
| Why did we decide X? | `08_DECISIONS/DECISIONS.md` |
| What actually happened, and who approved it? | `09_AUDIT/README.md` |
| Rejected or superseded material | `10_ARCHIVE/` (never current truth) |

## Read first, by task

| Task | Read, in order |
|---|---|
| Change site code | `01_PRINCIPLES` → `05_ENGINEERING/ENGINEERING.md` → `06_OPERATIONS/ROLLBACKS.md` |
| Change site copy | `04_DESIGN/CONTENT.md` → `website/CLAUDE.md` |
| Change design | `04_DESIGN/DESIGN-SYSTEM.md` → `04_DESIGN/ACCESSIBILITY.md` |
| Change product scope | `02_PRODUCT/PRODUCT.md` → `08_DECISIONS/DECISIONS.md` |
| Make a business or investor claim | `03_RESEARCH/RESEARCH.md` first. No source, no claim. |
| Anything involving AI agents | `00_START_HERE/AI_OPERATING_RULES.md` |
| Reconstruct what an agent did and why | `09_AUDIT/` |

## Lifecycle

`OBSERVE → RESEARCH → FRAME → DECIDE → AUTHORIZE → BUILD → TEST → RELEASE → MEASURE → LEARN → UPDATE` (Wolf's core loop, `V3_FRAMEWORK.md`). The product-specific view — `IDEA → INTERVIEW → RESEARCH → VIABILITY → THESIS → PRODUCT → EXPERIENCE/DESIGN → ARCHITECTURE → ENGINEERING → SECURITY → TEST → APPROVAL → DEPLOY → OBSERVE → LEARN → UPDATE` — is in `SUMMARY.md`. The governance rules are in `PRODUCT_CREATION_SYSTEM.md`.

## Authority

AI investigates, drafts, reviews and implements. Humans decide product, legal, financial, privacy, security exceptions and production releases. Merging to `main` deploys to production, so a merge is a production decision.

Every meaningful change answers: why, impact and results, how, cost, and whether the cost is justified. Choose the lowest-cost option that meets the requirements. Every consequential AI action is attributable and auditable — see `09_AUDIT/`.

## Document status

Every major document carries `Status / Owner / Version / Last updated`. Statuses: `Draft → Review → Approved → Superseded → Archived`. **Only the owner marks a document `Approved`.** Do not treat a `Draft` as an approved decision.

## Filename index

Framework documents refer to each other by bare filename. Resolve them here.

| Filename | Location |
|---|---|
| `PRINCIPLES.md` | `01_PRINCIPLES/` |
| `PRODUCT.md` `THESIS.md` `INTERVIEW.md` `DISCOVERY.md` `PRODUCT_OPERATING_MODEL.md` `ROADMAP.md` | `02_PRODUCT/` |
| `RESEARCH.md` `SOURCES.md` `RESEARCH_AGENT.md` `RESEARCH_OPERATING_SYSTEM.md` | `03_RESEARCH/` |
| `EXPERIENCE.md` `DESIGN-SYSTEM.md` `ACCESSIBILITY.md` `CONTENT.md` `DESIGN_QUALITY_SYSTEM.md` | `04_DESIGN/` |
| `ENGINEERING.md` and its splits (`ARCHITECTURE`, `SECURITY`, `THREAT-MODEL`, `IDENTITY`, `NETWORKING`, `DATA`, `COST`, `QUALITY`, `PERFORMANCE`, `SRE`, `CI-CD`, `DELIVERY`, `DEPLOYMENT`, `AI`) | `05_ENGINEERING/` (flat, no subfolders — see its `README.md`) |
| `AI_OPERATING_RULES.md` `DOCUMENT_AGENT.md` `REVIEW_AGENT.md` `UPDATE_AGENT.md` `PRODUCT_CREATION_SYSTEM.md` `V3_FRAMEWORK.md` `ORCHESTRATOR.md` `AI_AUDIT_ENGINE.md` `ORGANIZATION.md` | `00_START_HERE/` |
| `INVESTOR.md` and the rest of `07_BUSINESS/` | `07_BUSINESS/` |
| `DECISIONS.md` `DECISION-RULES.md` `DECISION_AUDIT.md` | `08_DECISIONS/` |
| `09_AUDIT/*` | `09_AUDIT/` |
| `SUMMARY.md` | repo root |
| `DOCUMENTATION_SYSTEM.md` | `00_START_HERE/` |

## Code map

| Path | What | Note |
|---|---|---|
| `website/site/` | Live marketing site (Next.js 16, Tailwind 3). Deploys to Vercel. | **Do not move or rename.** The Vercel project builds this path. |
| `website/CLAUDE.md`, `website/shared/`, `website/products/vero/` | Copy contracts for site content | Keep in place. |
| `10_ARCHIVE/SUPERSEDED-DOCUMENTS/vero-app-application/` | Product-app prototype | Archived. Not deployed. |

## Repository rules

- The repo may become public. Never commit secrets, real credentials or personal data. Examples use placeholders.
- Never fabricate. Unknown is a valid answer — state "Not defined in the source" rather than invent one (Wolf's own rule, `Wolf-DOCUMENTS-GUIDE.md` §8). Label facts, inferences, assumptions, hypotheses and projections.
- Before creating a document, check whether a canonical one exists. Update it instead.
