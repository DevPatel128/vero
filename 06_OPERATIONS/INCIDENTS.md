# Incidents

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: this PR's site audit (2026-09-21/22); Vercel runtime logs (via the Vercel MCP connector, historical)

## When something breaks

1. Check `GET /api/health` on the live site — reports whether the waitlist store is reachable, with no user data in the response.
2. Check Worker `vero` logs (Cloudflare dashboard, Workers Observability) and `GET /api/health`.
3. If the last deploy is the cause, roll back the Worker version — see `06_OPERATIONS/ROLLBACKS.md`.
4. Record the incident below once resolved.

## Log

### 2026-09-21 — Waitlist store unreachable in production

**Detected:** during this PR's audit, not by any alert (none existed). `GET /api/waitlist/stats` on the production URL returned 500. Vercel runtime logs showed `fetch failed ... getaddrinfo ENOTFOUND` against the configured Upstash REST host — the Redis database no longer resolves, meaning it was likely deleted or the URL/token in Vercel's environment variables is stale.

**Impact:** `/api/waitlist/join` (the actual signup endpoint) very likely failed the same way, since it uses the same store — not independently confirmed by a real signup attempt, to avoid writing test data through an unverified path. The `/status` page's waitlist indicator hard-coded "Operational" throughout, so the outage was invisible to visitors and to the team.

**Root cause:** not conclusively determined. Most likely: the Upstash database was deleted, paused for inactivity, or its credentials were rotated without updating Vercel's environment variables.

**Fix (this PR):**
- Added `GET /api/health`, a real liveness check for the store.
- `/status` now calls it and shows Operational/Degraded honestly instead of a hard-coded string.
- The store now fails fast and loudly if `UPSTASH_REDIS_REST_URL`/`_TOKEN` are missing entirely when running on Vercel, instead of silently falling back to a file store that cannot write on Vercel's read-only filesystem.
- `/api/waitlist/stats` now returns a clean 503 instead of an unhandled 500 when the store errors.

**Not fixed by this PR (human action required):** the Upstash database itself needs to be restored or re-created, and `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` need to be set correctly in Vercel for both Production and Preview environments. Until that happens, `/api/health` will correctly report the store as unreachable.

**Resolution path (2026-09-29):** the owner's stack no longer includes Vercel or Upstash. The site moves to Cloudflare Workers with a D1 database (`08_DECISIONS/ENGINEERING/2026-09-move-to-cloudflare.md`), so the Upstash database is not being restored. The D1 database starts empty; waitlist data from the Upstash era is lost.

**Status:** mitigated 2026-09-29. The Worker `vero` is deployed at https://vero.dvpatel.workers.dev with D1. Verified live: `/api/health` 200, `/api/waitlist/stats` 200, a signup created position 1 in D1 (read back through the Cloudflare API), a duplicate returned no token, and a cross-origin POST returned 403. The test row was deleted. The old Vercel URL still serves the broken Upstash build until the Vercel project is deleted, and the canonical domain (`vero.work`) is not yet attached to the Worker. Close fully when the public URL points at Cloudflare.

## Rule

Record every incident here, even minor ones, with what was detected, the impact, the root cause (or "not conclusively determined"), the fix, and what remains open. Do not close an entry until the underlying cause is actually addressed, not just the symptom.
