# Vero — Marketing Surface

Marketing copy + SEO + AEO + LLMO assets for **Vero**, the verified proof-of-work identity platform.

> Product brief in one line: **"LinkedIn shows claims. Vero shows proof."**

For the product context (philosophy, brand, architecture, roadmap, security, every system in detail), see the root [`PRODUCT.md`](../../../PRODUCT.md) and [`SYSTEM.md`](../../../SYSTEM.md) (the old `/apps/vero/docs/context-pack/` no longer exists). This folder is the **outside** of the product.

## Folder map

```
vero/
├── pages/        # Page-by-page Markdown copy
│   ├── home.md
│   ├── features.md
│   ├── how-it-works.md
│   ├── pricing.md
│   ├── for-workers.md
│   ├── for-businesses.md
│   ├── trust.md
│   ├── alved.md
│   ├── security.md
│   ├── about.md
│   ├── contact.md
│   └── faq.md
├── copy/         # Reusable strings (headlines, CTAs, microcopy)
│   ├── hero.md
│   ├── ctas.md
│   ├── microcopy.md
│   └── proof-points.md
├── schema/       # JSON-LD blocks (Organization, SoftwareApplication, FAQ)
│   ├── organization.jsonld
│   ├── software.jsonld
│   └── faq.jsonld
├── seo/          # SEO plan, keyword research, sitemap entries
│   ├── keywords.md
│   ├── meta.md
│   ├── sitemap-entries.yaml
│   └── llms.txt.fragment
├── blog/         # Editorial calendar + drafts
│   ├── calendar.md
│   └── drafts/
└── assets/       # Image briefs (real binaries in /apps/marketing/public/og/)
    └── og-briefs.md
```

## Pages (priority order)

| Page          | Route                       | Purpose                                                  |
| ------------- | --------------------------- | -------------------------------------------------------- |
| Home          | `/vero`                     | One-screen "what is Vero, why does it matter, who is it for, what next" |
| Features      | `/vero/features`            | Six core capabilities + screenshots                       |
| How it works  | `/vero/how-it-works`        | The flow: list job → verify worker → escrow → proof mint  |
| For workers   | `/vero/for-workers`         | Persona page #1: youth, beginners, gig workers            |
| For businesses| `/vero/for-businesses`      | Persona page #2: cafés, households, SMBs, startups        |
| Trust         | `/vero/trust`               | How the trust graph works, why it matters                 |
| ALVED         | `/alved`                    | Cross-product — protocol explainer (lives in `shared/`)   |
| Security      | `/vero/security`            | Crypto, escrow, audits, compliance                        |
| Pricing       | `/vero/pricing`             | Worker = free. SMB = SaaS. Escrow = 5%. (Below Urban Co's 25%) |
| About         | `/vero/about`               | Why we exist + the team                                   |
| Contact       | `/vero/contact`             | Sales + general                                           |
| FAQ           | `/vero/faq`                 | Schema-wrapped FAQ                                        |

Each page in `pages/` has a fixed structure: frontmatter, H1, hero copy, sections, CTAs, FAQ, JSON-LD pointer.

## Voice + tone

- **Calm**. Never shouty. Never urgent. Trust takes time.
- **Premium**. Sentences breathe. White space matters.
- **Local**. Bengaluru-first. Whitefield. HSR. Koramangala. Sarjapur. Electronic City. Specific is trustworthy.
- **Plain**. No jargon. A 14-year-old should follow it.
- **Honest**. Pre-launch is pre-launch. Q3 2026 is Q3 2026.

If you cannot read the line out loud without sounding like a marketing brochure, rewrite it.

## SEO targets (top 5)

1. _"verified work identity India"_ — primary, home page
2. _"apprenticeship platform Bengaluru"_ — for-workers
3. _"trusted gig platform"_ — features
4. _"proof of work app"_ — alved
5. _"Bengaluru local jobs verified"_ — for-businesses

The full keyword list (`seo/keywords.md`) and programmatic SEO plan (`seo/programmatic.md`) were never written. The SEO page log lives in [`GROWTH.md`](../../../GROWTH.md).

## Compliance check

Every page touching identity, payments, employment, or money gets owner review before publish (no compliance matrix exists in this repo (the old `/docs/COMPLIANCE.md` was never carried over); legal and DPDP claims need owner and counsel review, see [`AGENTS.md`](../../../AGENTS.md) project rule 4 and [`DECISIONS.md`](../../../DECISIONS.md)). Vero is India-first, so DPDP Act 2023 is the primary gate.

## How to contribute

1. Open the page in `pages/`.
2. Edit the Markdown.
3. Open a PR. CI runs Lighthouse + schema validation + link-checker on the rendered page.
4. A human reviewer (Dev) signs off.

## Engineering handoff

When a copy file is approved, the engineering owner of `/apps/marketing` pulls it into `apps/marketing/src/app/vero/<route>/page.tsx`. The build process imports the Markdown directly — copy is never duplicated.

