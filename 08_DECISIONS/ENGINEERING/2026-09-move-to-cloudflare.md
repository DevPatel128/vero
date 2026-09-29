# Move website/site to Cloudflare (Workers and D1); drop Vercel and Upstash

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-29

**Status:** Proposed (the owner directed this move; formal approval still to be marked)

**Decision**

Host `website/site` on Cloudflare Workers through the OpenNext adapter, store waitlist entries and rate-limit counters in Cloudflare D1, and deploy through Cloudflare Workers Builds connected to GitHub. Vercel and Upstash are no longer used. Supabase is reserved for the product app, not this site. Supersedes `2026-09-stay-on-vercel-upstash.md`.

**Why**

The owner's stack is GitHub, Cloudflare and Supabase. The Upstash database was already gone (`06_OPERATIONS/INCIDENTS.md`), so the waitlist was down, and keeping two extra vendors only to serve a pre-launch site adds cost and vendor surface.

**Impact**

One fewer vendor pair to secure and disclose (`/legal/sub-processors` now lists Cloudflare and Resend). Data model moves from Redis keys to SQL. The Mumbai region pin is lost (Workers has no per-region pin; the D1 database has an APAC location hint). Upstash-era waitlist data is not recoverable, so D1 starts empty.

**Evidence**

Built and tested on the local Workers runtime: signup, duplicate signup (no token returned), referral counting, stats, cross-origin rejection (403) and rate limiting (429 on the sixth join in 10 minutes). The OpenNext bundle also builds in CI.

**Alternatives**

Stay on Vercel with a new Upstash database (rejected: the owner no longer uses either). Cloudflare KV instead of D1 (rejected: no atomic claim or counters, which the signup flow needs). `vinext` instead of OpenNext (rejected: a reimplementation of Next, less proven than running the real `next build` output). Supabase for the waitlist (deferred to the product app).

**How**

`wrangler.jsonc` (binding `DB`, database `vero-waitlist`), `migrations/0001_init.sql`, `src/lib/waitlist/d1-store.ts`, `src/lib/ratelimit.ts`, `src/lib/cloudflare.ts`; remove `@upstash/*` and `vercel.json`; CI compiles the Workers bundle.

**Cost**

Engineering time. Ongoing cost depends on the Cloudflare plan in use, which is not recorded here.

**Lower-cost alternatives**

None that also remove Vercel and Upstash.

**Consequences**

Rate limiting uses fixed windows (a burst across a window boundary can briefly exceed the limit, unlike the previous sliding window) and still fails open. D1 Time Travel replaces the earlier lack of a backup path, with retention unconfirmed. Production stays broken until the Worker is connected in Cloudflare and deployed (owner action).

**Revisit condition**

If traffic outgrows D1's limits, or the product app's Supabase adoption makes a single data platform preferable.

**Approved by**

(pending)

**Date**

(pending)
