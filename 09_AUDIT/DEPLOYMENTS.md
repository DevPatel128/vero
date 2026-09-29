# Deployment History

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Vercel MCP connector (read-only checks during this session), `06_OPERATIONS/ROLLBACKS.md`

No production deployment has been triggered by this branch's work. `chore/framework-alignment` is pushed but not merged; production (`main`, Vercel project `vero`) is unchanged from before this session started.

Last known production deployment at the start of this session: `dpl_FUWRCECNCHDGGovL1DbZuo8RKUYW`, built from `main` at commit `551e2cb`, flagged as a rollback candidate (see `06_OPERATIONS/INCIDENTS.md` for why — the waitlist store outage that deployment predates detecting).

Vercel builds this branch as an SSO-protected preview only, per its Git-connected project settings (`00_START_HERE`'s plan-era note: "production = `main` only"). Nothing in this branch's docs-only commits (everything from `deca210` onward) changes that.

As of 2026-09-29 the branch is pushed as PR #15 and Vercel builds a preview for it. Production (`main`) is unchanged and still affected by the Upstash outage.

2026-09-29: PR #15 merged to `main` and deployed to production on Vercel. The Cloudflare migration (`feat/cloudflare-migration`) replaces that hosting once the Worker is connected in Cloudflare; until then production remains on Vercel with the Upstash outage.
