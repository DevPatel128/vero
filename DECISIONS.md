# DECISIONS.md
Never delete an entry. Supersede it with a new one.

None of the 2026-09 decisions was formally marked Approved by the owner; they were recorded as Proposed (owner-directed where noted). Full records: archive `Vero-docs-v3/08_DECISIONS/` (see "Archive" below).

| Date | Decision | Why | Options rejected | Trade-off | Files | Review |
|---|---|---|---|---|---|---|
| 2026-09-22 | Adopt "The Framework" (v2) and a numbered docs layout; archive old docs instead of deleting | ~10 competing entry points, 4 directories without git history, contradictory facts, blank templates | Keep old layout alongside (adds an eleventh entry point); delete old material | One-time effort | docs only | Superseded 2026-09-28 |
| 2026-09-22 | Stay on Vercel and Upstash | Lowest cost while the site worked | Migrate to Cloudflare and Supabase then | — | — | Superseded 2026-09-29 |
| 2026-09-22 | Remove Sentry and PostHog from `website/site` | Installed but never mounted; contradicted the no-third-party-analytics claim on `/legal/cookies` | Wire them up (a privacy decision needing a human) | Site has no error tracking or analytics | `package.json`, removed `sentry.*.config.ts`, `Providers.tsx` | When a real monitoring need appears; update `/legal/cookies` if analytics is added |
| 2026-09-22 | `@rie/crypto` versus direct libraries (`@node-rs/argon2`, `jose`): open, not decided | Old policy mandated `@rie/crypto`, which does not exist; the prototype used direct libraries | (a) build `@rie/crypto`, (b) standardize on direct libraries, (c) defer | Deferred | archived prototype only | Before any auth code ships |
| 2026-09-28 | Adopt Wolf v3 layout (00_START_HERE to 10_ARCHIVE, adds 09_AUDIT) | Owner instruction | Keep v2; run both layouts | Larger one-time effort | docs only | Superseded 2026-10-09 |
| 2026-09-29 | Move `website/site` to Cloudflare Workers (OpenNext) and D1; drop Vercel and Upstash; Supabase reserved for the product app | Owner stack is GitHub, Cloudflare, Supabase; Upstash database was already gone | New Upstash database; Cloudflare KV (no atomic claims or counters); vinext (less proven); Supabase for the waitlist | Fixed-window rate limits (bursts across a window edge), still fail open; no region pin (D1 APAC hint); Upstash data lost | `wrangler.jsonc`, `migrations/0001_init.sql`, `src/lib/waitlist/d1-store.ts`, `src/lib/ratelimit.ts`, `src/lib/cloudflare.ts` | If traffic outgrows D1, or the product app makes one data platform preferable |
| 2026-09-29 | Tie-break for contradictions: the live site wins; where it is silent, the newer and more detailed source wins | Repo going public | — | Owner can reopen any item | — | On new founder input |
| 2026-09-29 | Roadmap numbering: `Documents/13` (Phase 0 = pre-launch) | Newer, more detailed | Archived CLAUDE.md §19 numbering | — | `PRODUCT.md` | — |
| 2026-09-29 | Phase 1 targets: `Documents/13`/`14` figures, labelled projections | Same tie-break | `Documents/6` (200+ records, 50+ businesses) | Larger, unvalidated targets | `GROWTH.md` | — |
| 2026-09-29 | Pricing: live `/pricing` (Worker free, Business ₹2,499 per month, Studio custom, 5% escrow) | Live site is what customers see | `Documents/8` three tiers | Unvalidated price | `GROWTH.md` | — |
| 2026-09-29 | DPDP grievance SLA: 15 days (live `/legal/grievance`) | Live site is binding | 30 days (`Documents/15`); 30/7 days (unshipped draft) | Not legal advice; counsel must confirm before launch | `PRODUCT.md` | Before launch |
| 2026-09-29 | Keep both `/for-workers` and `/for-professionals` | Different content, not duplicates | Redirect one to the other | Terminology still mixed | site pages | When terminology is settled |
| 2026-09-29 | Student-identity framing (`Context/`) archived as superseded | Conflicts with the worker/business marketplace and the "AI-powered" ban | Merge into product docs | — | archive | Reverse if it was a real pivot |
| 2026-10-09 | Adopt WOLF 1.0.5 kit; move still-needed facts into the root kit docs; archive the v3 folders, `SUMMARY.md`, `Documents/` and stale website guides | Owner decision: one shared framework; "archive the old frameworks and things which are not needed" | Keep v3 folders beside the kit (two sources of truth) | Long-form history leaves the repo (still in git history and the central archive) | root docs, `.claude/`, `scripts/`, `sell/` | If a needed fact is found missing, restore it from the archive into the kit doc |

## Open questions (not decided)
- Launch date: "Q3 2026" in `src/lib/site.ts` versus "2027" on `/status`.
- Formal owner approval of every 2026-09 row above.
- Code comment in `website/site/next.config.ts` says CSP is "a separate decision (see 08_DECISIONS)"; no CSP enforcement decision was ever recorded. This table is now the home for it.

## Archive
Superseded v3 docs are copied, unchanged, to the owner's local archive `Archives/2026-10-09-wolf-migration/Vero-docs-v3/` (from `origin/main` at `76bb242`) and remain in this repo's git history (`git show 76bb242:<path>`). References such as `Documents/13` mean the founder narrative files `Documents/1` to `Documents/15` (2026-05), and `09_AUDIT/...` or `08_DECISIONS/...` mean the v3 folders, all in that archive.
