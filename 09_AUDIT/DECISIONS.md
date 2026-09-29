# Decision History

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: `08_DECISIONS/` (the decisions themselves) + `09_AUDIT/APPROVALS.md` (what authorized acting on them)

This file is the audit-side view of `08_DECISIONS/DECISIONS.md`'s index: for each decision, what evidence it linked, whether it has been approved, and what implementation actions followed.

| Decision | Evidence | Approval status | Implementation |
|---|---|---|---|
| Adopt The Framework (v2) and the numbered documentation system | Docs-inventory and site audits (this PR) | Proposed | Commits `43d3062`, `de8c5a3`, `02cbebb` |
| Stay on Vercel and Upstash; defer Cloudflare and Supabase | Zero migration cost, $0 new spend vs. alternatives | Proposed | No infrastructure change made; status quo confirmed in writing |
| Remove Sentry and PostHog from `website/site` | Both present as dependencies, never mounted into `layout.tsx`; matches `/legal/cookies`' no-third-party-analytics claim | Proposed | Commit `17b65c8` |
| `@rie/crypto` vs. direct libraries | Scoped to the archived, undeployed `application/` only | Proposed | No action needed — archived, not live |
| Open contradictions found while adopting the framework | Docs-inventory audit, diffed source files directly | Proposed (each item individually) | Recorded, not resolved — each needs a human/legal call |
| Adopt the Wolf v3 framework, replacing v2 | `Wolf/MANIFEST.json` file list, diffed against the existing v2 structure | Proposed (user instruction authorizes the restructure itself; formal `Approved` status still pending) | Commits `62a05cf` through `7a27c6d` and this commit |

No decision above has been formally marked `Approved` by the owner yet — all remain `Proposed`, consistent with `08_DECISIONS/DECISIONS.md`'s rule that only the owner marks a document `Approved`.
| Move website/site to Cloudflare (Workers and D1), drop Vercel and Upstash | Owner instruction; Upstash database already gone (`06_OPERATIONS/INCIDENTS.md`); local Workers runtime tests | Proposed (owner directed; formal approval pending) | Branch `feat/cloudflare-migration`; supersedes the stay-on-Vercel-and-Upstash decision |
