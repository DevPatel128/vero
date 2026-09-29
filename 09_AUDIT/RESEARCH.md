# Research Audit

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: `03_RESEARCH/RESEARCH.md`, this session's audit passes

Two research passes ran during this branch, before any restructuring began:

1. **Docs inventory audit** — grepped every doc source (root `CLAUDE.md`, `Context/`, `Documents/`, HEAD `docs/**`, `The Framework.`) for git history, contradictions and blank templates. Found ~10 competing front doors, 4 directories with no git history, and 5 material contradictions (later expanded to 6 in `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md`).
2. **Site vs. `ENGINEERING.md` audit** — checked `website/site` against the (then newly-imported) engineering standard: live waitlist down (`ENOTFOUND` on the Upstash host), no CI, no working lint, no rate limiting, no CSRF-equivalent check, no CSP, a token-leak vulnerability, dead links, SEO/a11y gaps, ~120 days of stale Dependabot PRs.

Both are cited as the evidence base for every commit and decision in this branch's history (`09_AUDIT/FILE_CHANGES.md`, `08_DECISIONS/`). `03_RESEARCH/RESEARCH.md`'s 14-row evidence ledger is the artifact this research produced; `SOURCES.md` indexes what was read.

No new research pass ran for the Wolf v3 restructure specifically — it reused the same source material (`Documents/1-15`, the archived `CLAUDE.md`, this session's own audit findings) rather than re-researching Vero from scratch, since Wolf changes the documentation *container*, not the underlying facts about the product.
