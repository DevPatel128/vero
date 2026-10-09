# CLAUDE.md — router

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28

This file is a thin router, not the documentation. Start at [`00_START_HERE/README.md`](00_START_HERE/README.md) for the full navigation; this file exists only so an AI session that auto-loads root `CLAUDE.md` gets pointed there immediately.

## Go here by task

| Task | Canonical doc |
|---|---|
| Understand the product | `02_PRODUCT/PRODUCT.md` |
| Change site code | `05_ENGINEERING/ENGINEERING.md`, then `website/CLAUDE.md` |
| Change site copy | `04_DESIGN/CONTENT.md`, then `website/CLAUDE.md` |
| Something in production broke | `06_OPERATIONS/INCIDENTS.md` |
| Make a business/investor claim | `03_RESEARCH/RESEARCH.md` first — no source, no claim |
| Anything involving AI agents | `00_START_HERE/AI_OPERATING_RULES.md` |
| Record or look up a decision | `08_DECISIONS/DECISIONS.md` |
| Reconstruct what happened and who approved it | `09_AUDIT/README.md` |

## Hard rules

- Never fabricate. Unknown is a valid answer — write "Not defined in the source" rather than invent one.
- Never commit secrets, real credentials, or personal data.
- Humans decide product, legal, financial, privacy, security-exception and production questions. Merging to `main` deploys to production, so a merge is a production decision an AI does not make.
- Before creating a document, check whether a canonical one already exists under `00_START_HERE/README.md`'s index. Update it instead of duplicating it.

## Code root

`website/site/` is the only deployed code (Next.js 16 on Cloudflare Workers). Do not move or rename it — the Cloudflare build uses that exact root directory. See `00_START_HERE/README.md`'s "Code map" for the rest.

Read and follow `AGENTS.md` (WOLF rules).
