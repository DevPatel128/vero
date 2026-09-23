# Rollbacks

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: Vercel MCP connector (project `vero`, verified 2026-09-21); 05_ENGINEERING/CI-CD/DEPLOYMENT.md

## How production deploys

Vercel project `vero` is Git-connected to `DevPatel128/vero`. Every push to `main` deploys straight to production; every other branch or PR gets a preview deployment only. Root directory for the build is `website/site`.

## Rollback ladder, cheapest first

1. **Vercel Instant Rollback.** One click in the Vercel dashboard (or via the Vercel API/MCP connector) to point production traffic at a previous, already-built deployment. No rebuild, near-instant. Use this first for anything caused by the most recent deploy.
2. **`git revert` a single commit.** If the branch is structured as small, independently revertable commits (the convention this PR's own history follows), revert just the offending commit and push — CI runs, then a human approves the merge to `main` as usual.
3. **Revert the merge commit.** Last resort, for when several commits together caused the problem and isolating one revert is not practical.

## Known rollback candidates

As of 2026-09-21, the Vercel deployment history flags two earlier production deployments as rollback candidates (deployments that can be instantly restored): the one before commit `b431071` (the Upstash migration) and the one before that. Check current candidates in the Vercel dashboard before relying on a specific one, since this list changes with every new production deploy.

## What a rollback does not fix

Rolling back the deployment does not fix external-state problems like the Upstash outage recorded in `06_OPERATIONS/INCIDENTS.md` — that requires fixing the Upstash database and Vercel's environment variables directly, regardless of which code revision is live.

## Rule

Before rolling back, check `06_OPERATIONS/INCIDENTS.md` for whether the problem is actually caused by the latest deploy, or by something external (a broken third-party dependency, an expired credential) that a rollback will not fix.
