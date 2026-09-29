# Rollbacks

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Cloudflare Workers documentation (versions and rollbacks); 05_ENGINEERING/DEPLOYMENT.md

## How production deploys

The Cloudflare Worker `vero` is connected to `DevPatel128/vero` through Workers Builds (root directory `website/site`). A push to `main` builds and deploys to production; other branches get preview builds only. Each deploy is a numbered Worker version.

## Rollback ladder, cheapest first

1. **Cloudflare version rollback.** `npx wrangler rollback` (from `website/site`), or Workers & Pages, Worker `vero`, Deployments, Rollback in the dashboard. Cloudflare keeps the 100 most recent versions, and the rollback becomes the active deployment immediately with no rebuild. Use this first for anything caused by the most recent deploy.
2. **`git revert` a single commit.** If the branch is structured as small, independently revertable commits, revert just the offending commit and push. CI runs, then a human approves the merge to `main` as usual.
3. **Revert the merge commit.** Last resort, for when several commits together caused the problem.

## What a rollback does not fix

A rollback changes code only. Bindings and data are untouched: the D1 database `vero-waitlist` keeps its current contents, and Cloudflare refuses to roll back to a version whose bindings no longer exist. Problems caused by data or a deleted resource need a fix to that resource (for D1, see `06_OPERATIONS/BACKUPS.md`).

## Rule

Before rolling back, check `06_OPERATIONS/INCIDENTS.md` for whether the problem is actually caused by the latest deploy, or by something external (a broken third-party dependency, an expired credential) that a rollback will not fix.
