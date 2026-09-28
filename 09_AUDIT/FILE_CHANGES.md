# File Changes

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: `git log --oneline --reverse main..HEAD` on `chore/framework-alignment`, against base `main` commit `551e2cb`

Git is the authoritative record (`06_OPERATIONS/BACKUPS.md`); this is a narrative index over it, in order:

| Commit | Summary |
|---|---|
| `4503618` | Stop tracking local worktrees and build artifacts (`.gitignore`, drop tracked `.next/dev/types/*`) |
| `43d3062` | Import `The Framework.`, `Context/`, `Documents/` and the old `CLAUDE.md` verbatim (gives them git history) |
| `de8c5a3` | Move superseded documents and code into `09_ARCHIVE` (later renumbered `10_ARCHIVE`) |
| `02cbebb` | Adopt the v2 numbered documentation system (`00`–`09`) |
| `17b65c8` | Remove dead code from `website/site`, single-source security headers, fix lint baseline |
| `25d79b7` | Add CI (typecheck/lint/test/build gate), Dependabot config, CODEOWNERS |
| `6d62d74` | Add `/api/health`, stop hiding waitlist store failures |
| `c6e7624` | Security fix: stop returning the waitlist token on a duplicate join |
| `c00ec9d` | Security fix: rate limit the two public POST endpoints |
| `7bdc5c6` | Security fix: reject cross-site POSTs (Origin check) |
| `dd7e1b8` | Security fix: make waitlist signup and referral counting atomic |
| `d7971d3` | Security fix: throttle the investor auto-reply per email, not just per IP |
| `07aae59` | Security fix: move the waitlist email handoff out of the URL |
| `7a6e2cb` | Security fix: add a report-only CSP |
| `f9d165b` | Fix live dead links, LCP-blocking hero animation, crawl directives |
| `27384ef` | Add unit and API tests for allowed/denied paths; fix a swallowed assertion in the existing spec |
| `431fd79` | Apply the pending Dependabot dependency bumps |
| `deca210` | Record the infrastructure, cleanup and open-conflict decisions |
| `e89d96d` | Fill product, research, design, business and operations docs from source material |
| `62a05cf` | Import the Wolf v3 framework verbatim |
| `7a68534` | Restructure repo docs onto the Wolf v3 layout (flatten `05_ENGINEERING`, renumber `09_ARCHIVE`→`10_ARCHIVE`, relocate several files) |
| `7175aa4` | Add Wolf's framework-level orientation docs; update `PRINCIPLES.md` to Wolf's 24-item list |
| `0c31dbb` | Fill the product/research/design files Wolf's layout adds |
| `d73e821` | Fill the flat-layout engineering files Wolf's split adds |
| `c9445e2` | Fill the operations/business files Wolf's layout adds |
| `7a27c6d` | Add `DECISION-RULES`, `DECISION_AUDIT`, and the Wolf adoption decision record |

No commit here touches `website/site/` after `431fd79` (dependency bumps) — everything from `deca210` onward is documentation only, consistent with `08_DECISIONS/ENGINEERING/2026-09-adopt-wolf-framework.md`'s claim of zero product impact.
