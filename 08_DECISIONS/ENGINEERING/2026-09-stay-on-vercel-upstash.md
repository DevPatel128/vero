# Stay on Vercel and Upstash; defer Cloudflare and Supabase

> Status: Proposed · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-22

**Status:** Proposed

**Decision**

Keep `website/site` deployed on Vercel with Upstash Redis as the waitlist store. Do not adopt Cloudflare or Supabase for the marketing site until a specific requirement justifies it.

**Why should we make this change?**

`05_ENGINEERING/INFRASTRUCTURE/CLOUDFLARE.md` and `05_ENGINEERING/DATA/SUPABASE-AND-DATA.md` (carried over unedited from `The Framework.`) name Cloudflare and Supabase as the default infrastructure and data platform. The site as built, deployed, and working today uses Vercel and Upstash. `01_PRINCIPLES/PRINCIPLES.md` rule 21 says to prefer the lowest-cost solution that meets requirements; `05_ENGINEERING/FOUNDATION` repeats the same rule for architecture.

**Impact**

No migration, no new vendor, no new recurring cost. The framework's Cloudflare/Supabase sections remain as generic engineering guidance to apply if a real requirement appears (for example, if `application/` — currently archived, unreviewed, and Supabase-based — is ever revived).

**Evidence**

Vercel project `vero` is the live production deployment (confirmed via the Vercel connector: auto-deploys `main`, domains, deployment history). `website/site/package.json` depends on `@upstash/redis` and `@upstash/ratelimit`, already wired into the waitlist store and, as of this PR, the rate limiter.

**Alternatives**

Migrate to Cloudflare Pages/Workers and Supabase now, to match the framework's named stack exactly. Rejected: no requirement the current stack fails to meet, migration cost and risk (re-deploy, re-point DNS, re-implement the Upstash-specific atomic-write logic added in this PR) with zero corresponding user or business value today.

**How**

No implementation needed; this decision documents the status quo and gives it explicit authority so it is not silently re-litigated later.

**Cost**

$0 incremental. Avoids the cost of a migration with no offsetting benefit.

**Lower-cost alternatives**

This is already the lowest-cost option: keep what is deployed and working.

**Cost justification**

Trivially justified: zero cost, zero risk, matches the framework's own "lowest justified cost" rule.

**Reason**

The framework's infrastructure sections are written as defaults for a new build, not a mandate to migrate an already-shipped, already-working site. Vercel and Upstash satisfy the site's actual requirements today.

**Consequences**

`05_ENGINEERING/INFRASTRUCTURE/CLOUDFLARE.md` and `05_ENGINEERING/DATA/SUPABASE-AND-DATA.md` stay as-is (they are generic rules, not Vero-specific facts) but should not be read as describing what `website/site` runs on; this decision is the authoritative note on that.

**Revisit condition**

A concrete requirement Vercel/Upstash cannot meet at reasonable cost: for example, a WAF/DDoS need beyond Vercel's built-in protection, or a relational-data need beyond a key-value waitlist store.

**Approved by**

(pending)

**Date**

(pending)
