# Contributing

> Trove is closed-source for now. This document is for collaborators inside Vroe Labs.

## Branches

- `main` — production. Protected. Required: green CI, 1 review.
- `dev` — staging. Auto-deployed to a preview URL.
- `feat/*`, `fix/*`, `chore/*` — per-task branches off `dev`.

## Commit messages

Conventional Commits. Subject ≤ 50 chars. Body explains the *why*.

```
feat(auth): add Google OAuth
fix(transactions): preserve filter when paginating
chore(deps): bump next 15.1.2 → 15.1.3
docs(architecture): clarify cron schedule
```

## Local checks before pushing

```bash
npm run lint
npm run typecheck
npm run test
```

E2E and a11y are run in CI. You can run them locally with `npm run test:e2e` and `npm run test:a11y` if you've installed Playwright browsers.

## Style

- **TypeScript strict.** No `any`. Use `unknown` and narrow.
- **No comments** unless the *why* is non-obvious. Identifiers should do the explaining.
- **No emojis** in code, commits, PRs.
- **shadcn-first.** If you need a primitive, extend `src/components/ui/*`, don't bring in a new library.
- **Server-only.** Modules that touch secrets import `server-only` at the top.
- **Zod at boundaries.** All API bodies validated. No trust of client input.

## Adding a database migration

1. Edit `supabase/schema.sql` (it's idempotent — `if not exists`, `drop policy if exists`, etc.).
2. Test locally via `supabase db reset`.
3. Open a PR. CODEOWNERS will review.

## Adding a new page

- Marketing → `src/app/(marketing)/<slug>/page.tsx`. Add to `sitemap.ts` if not already covered.
- Product → `src/app/(app)/<slug>/page.tsx`. Will be auth-gated by middleware automatically.
- Admin → `src/app/admin/<slug>/page.tsx`. Role-gated by layout.

## Security

Don't commit `.env.local`. Use Vercel for prod secrets. Open security issues privately (`security@trove.vroelabs.com`).
