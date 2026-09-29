# Deployment History

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Vercel MCP connector (read-only checks during this session), `06_OPERATIONS/ROLLBACKS.md`

No deployment has been triggered by this branch's work. `chore/framework-alignment` has not been pushed to GitHub or merged; production (`main`, Vercel project `vero`) is unchanged from before this session started.

Last known production deployment at the start of this session: `dpl_FUWRCECNCHDGGovL1DbZuo8RKUYW`, built from `main` at commit `551e2cb`, flagged as a rollback candidate (see `06_OPERATIONS/INCIDENTS.md` for why — the waitlist store outage that deployment predates detecting).

Once this branch is pushed, Vercel will build it as an SSO-protected preview only, per its Git-connected project settings (`00_START_HERE`'s plan-era note: "production = `main` only"). Nothing in this branch's docs-only commits (everything from `deca210` onward) changes that.

As of 2026-09-29 the branch is pushed as PR #15 and Vercel builds a preview for it. Production (`main`) is unchanged and still affected by the Upstash outage.
