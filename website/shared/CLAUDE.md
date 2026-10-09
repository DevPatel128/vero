# CLAUDE.md — `/website/shared` agent contract

> **Read the root [`AGENTS.md`](../../AGENTS.md) first. It wins over this file where they differ.** Product facts, design tokens, tone and banned words live in [`PRODUCT.md`](../../PRODUCT.md). Paths below such as `/apps/...`, `/docs/...`, `/packages/...`, `website/_framework/` and the product context packs come from an earlier monorepo and do not exist in this repo. The live site is `website/site/`; page copy is written there.

Inherits from `/website/CLAUDE.md`. Adds umbrella + legal + protocol behavior.

## Source of truth

For umbrella pages: read `/README.md` + `/docs/ARCHITECTURE.md` + `/docs/SECURITY.md`.

For ALVED: read `/packages/types/src/alved.ts` (the actual spec) before writing any copy about it.

For legal: read **the corresponding section** of `/docs/COMPLIANCE.md` plus the relevant law text. **Never write legal copy without citing the law.**

## Hard rules

1. **Legal pages are not creative work.** Use the templates in `/website/_framework/templates/legal/` and adapt. Cite specific sections of the relevant law in code comments inside the Markdown.
2. **Grievance officer page is required by India IT Rules 2021.** Name, address, contact email, response SLA (15 days) must be present.
3. **Privacy notice must be region-aware.** Use children pages (e.g., `privacy-in.md`, `privacy-eu.md`) for region-specific obligations.
4. **ALVED is an open protocol.** Talk about it in third person: "ALVED is a spec for verifiable activity records. VROE Labs maintains the reference implementation."
5. **Never speak for an unannounced product.** If a fourth or fifth surface is on the roadmap but not announced, don't write it into the umbrella.
6. **Hiring claims must match reality.** If we don't have an office, don't promise one. If we don't have a benefits package, don't list it.
7. **Numbers must be real.** No "join 10,000 users" before launch. No fake metric.

## Self-checks

- Privacy page renders correctly for each region (the EU edition, the India edition, the US edition).
- Terms covers all three products and the open protocol cleanly.
- Grievance officer details are present and current.
- The ALVED page has a link to the actual spec at `/packages/types/src/alved.ts` (or its published mirror).
- The careers page lists only real, open roles, with apply-to addresses.
- The press page lists boilerplate + a real media contact email.

