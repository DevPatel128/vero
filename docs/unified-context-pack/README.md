# VROE Labs Unified Context Pack

This is the umbrella context pack for Vero, RIE, Trove, the shared website system, and the cross-product governance layer.

## What this pack is
A single source of truth for product strategy, pricing, revenue, architecture, brand, theme lock, compliance, deployment, AI-agent behavior, and edit history.
It also includes a visual HTML preview so the whole pack can be explained and navigated locally in a browser.

## Who this serves
- Founders, who need product and launch decisions without re-litigating the basics
- Investors, who need the business, moat, pricing, and revenue story clearly
- Developers, who need implementation constraints and system behavior
- AI agents, who need context, load order, and edit rules

## Operating model
- Markdown is the source of truth.
- HTML is the reading/export layer for investors and non-technical users.
- Product folders stay independently readable.
- Logs are append-only in practice and required for AI-driven edits.
- The pack is enterprise-grade, but every section must still map back to the current products.

## Top-level structure
- `00-vroe-labs-overview.md` — umbrella thesis, products, and scope
- `01-planning-persona.md` — the expert role used to plan the pack
- `02-enterprise-fit.md` — where the pack matches current products and where it needs guardrails
- `03-theme-lock.md` — shared visual and voice system rules
- `04-pricing-governance.md` — pricing principles, floors, ceilings, and exception policy
- `05-country-pricing.md` — local pricing logic by country and region
- `06-revenue-models.md` — subscription, escrow, enterprise, add-ons, and future monetization
- `07-change-policy.md` — when and how the pack must be updated
- `08-ai-agent-rules.md` — contract for any agent editing the repo
- `09-future-scopes.md` — research reserve, roadmap direction, and alignment for investors, users, companies, and AI agents
- `products/` — product-specific folders
- `shared/` — company-wide systems and shared rules
- `website/` — marketing, launch, investor, and public-facing content structure
- `logs/` — global and product-level edit logs
- `exports/` — HTML rendering/export conventions
- `prompts/` — reusable prompts for building and auditing the pack

## Load recipes
- Investor review: `00`, `02`, `04`, `05`, `06`, `shared/README.md`, `website/README.md`
- Product planning: `00`, `01`, `03`, `04`, `05`, `06`, `07`, `08`
- Future-scope planning: `09`, `website/07-future-scopes.md`
- Pricing work: `04`, `05`, `06`, `products/<product>/pricing/`
- Theme work: `03`, `products/<product>/brand/`, `products/<product>/ui-ux/`
- AI changes: `08`, `logs/README.md`, relevant product log folder

## Maintenance rule
If an AI changes any repository file, the pack should be updated according to this context pack in the same change set whenever feasible. If not feasible, the edit must be logged immediately and queued for follow-up.

