# Trove V2 — Deploy Runbook

> Sequenced commands. Run on your local machine where GitHub + Vercel auth already lives.

## Decisions locked

- **GitHub:** Tag current `main` as `v1-archive` (preserves V1 history), then force-push V2 to `main`.
- **Supabase:** Fresh project for V2. V1 stays on old project. No data migration.
- **Vercel:** Reuse same project (`prj_vxc2Wt8Sg1BeS7kcvHXubuyWWkBc`). Will rebuild from new `main`.

## Phase 0 — Prerequisites

```bash
# Install missing CLIs once
brew install gh
npm i -g vercel

gh auth login                 # GitHub
vercel login                  # Vercel
supabase login                # Supabase (already installed)
```

## Phase 1 — Archive V1

```bash
cd "/Users/dev/Documents/Projects [Computer Science]/VROE Labs/ledger"
# (or wherever your existing checkout lives)

git fetch origin
git checkout main
git pull origin main

# Tag current state
git tag -a v1-archive -m "V1 final state before V2 rewrite (2026-05-15)"
git push origin v1-archive

# Also push a v1-archive branch for easy browsing on GitHub
git checkout -b v1-archive
git push origin v1-archive
git checkout main
```

You now have:
- `tag v1-archive` — exact commit V1 was at.
- `branch v1-archive` — browsable on GitHub.

## Phase 2 — Create fresh Supabase project

1. Go to https://supabase.com/dashboard/new
2. Org: Vroe Labs.
3. Name: `trove-v2`. Region: `ap-northeast-1` (or your preference).
4. Strong DB password. Save it.
5. Wait ~2 minutes for provision.
6. SQL Editor → New query → paste contents of `Trove v2/supabase/schema.sql` → Run.
7. SQL Editor → paste contents of `Trove v2/supabase/seed.sql` → Run.
8. Authentication → Providers:
   - **Email**: enabled, confirm emails on.
   - **Google**: enabled. Add OAuth client (Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client). Authorized redirect: `https://<your-trove-domain>/auth/callback`.
9. Settings → API → copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## Phase 3 — Provision third-party services

### Stripe

```
https://dashboard.stripe.com
```

1. Products → Create:
   - **Trove Pro** — recurring, USD: $9/mo + $84/yr.
   - **Trove Team** — recurring, USD: $24/mo + $240/yr.
   Copy each price ID (`price_...`).
2. Settings → Billing → Customer Portal → enable plan switching, cancellation, invoice history.
3. Developers → Webhooks → Add endpoint:
   - URL: `https://<your-trove-domain>/api/stripe/webhook`
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.
   - Copy signing secret.

### Upstash Redis

```
https://console.upstash.com
```

Create a Redis DB (Global if you want low edge latency). Copy `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`.

### Resend

```
https://resend.com
```

Add `trove.vroelabs.com` as a domain. Add SPF + DKIM TXT records at your DNS provider. Verify. Copy API key → `RESEND_API_KEY`.

### PostHog

New project at https://us.posthog.com → Settings → Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`.

### Sentry

New project (Next.js) at https://sentry.io → DSN → `NEXT_PUBLIC_SENTRY_DSN`.

### Gemini

https://aistudio.google.com → Get API Key → `GEMINI_API_KEY`.

## Phase 4 — Replace ledger/ with Trove v2/ locally

```bash
cd "/Users/dev/Documents/Projects [Computer Science]/VROE Labs/Project Fintech"

# Clone fresh, working copy of the repo from origin (current V1)
cd ledger
git fetch origin
git checkout main
git pull origin main

# Wipe everything tracked, but keep .git
git rm -rf .
git clean -fdx -e node_modules

# Copy V2 over
cp -R "../Trove v2/." .

# Reinitialize if needed (don't if .git survived)
git status

git add -A
git commit -m "$(cat <<'EOF'
feat: V2 rewrite — Next.js App Router + shadcn + Supabase SSR

- Next.js 15 + React 19 + TypeScript strict
- Tailwind v3 + shadcn/ui with FT × Apple design system
- Supabase SSR auth + RLS on every table
- Stripe billing wired end-to-end with portal + webhooks
- AI insights via Gemini proxy with prompt sanitization
- Marketing site: home, features, pricing, about, contact, careers,
  security, integrations, case-studies, changelog, blog (MDX + RSS), docs
- Legal: privacy, terms, cookies, accessibility
- Auth: email/password + Google OAuth, MFA-ready
- Product: dashboard, transactions, analytics, subscriptions, budgets,
  goals, reports, notifications, search, support, full settings cluster
- Admin: overview, users, billing, feature flags, analytics
- API: typed, validated (zod), rate-limited (Upstash sliding window)
- SEO: robots, sitemap, llms.txt, manifest, JSON-LD
- Tests: Vitest unit + Playwright E2E + axe a11y
- CI: lint + typecheck + unit + build + E2E + CodeQL + Lighthouse

V1 archived at tag and branch v1-archive.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"

# Force push V2 as new main
git push --force origin main
```

> **If `git rm -rf .` makes you nervous:** alternative is to create a new orphan branch:
> ```bash
> git checkout --orphan v2
> git rm -rf .
> cp -R "../Trove v2/." .
> git add -A && git commit -m "feat: V2 rewrite"
> git push origin v2:main --force
> ```

## Phase 5 — Wire env vars in Vercel

```bash
cd path/to/checkout
vercel link --project prj_vxc2Wt8Sg1BeS7kcvHXubuyWWkBc

# Set every var (use --sensitive for secrets so they don't print in logs)
vercel env add NEXT_PUBLIC_APP_URL production            # https://trove.vroelabs.com
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production --sensitive
vercel env add STRIPE_SECRET_KEY production --sensitive
vercel env add STRIPE_WEBHOOK_SECRET production --sensitive
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_PRICE_ID_MONTHLY production
vercel env add STRIPE_PRICE_ID_YEARLY production
vercel env add RESEND_API_KEY production --sensitive
vercel env add RESEND_FROM_EMAIL production
vercel env add GEMINI_API_KEY production --sensitive
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production --sensitive
vercel env add NEXT_PUBLIC_POSTHOG_KEY production
vercel env add NEXT_PUBLIC_POSTHOG_HOST production       # https://us.i.posthog.com
vercel env add NEXT_PUBLIC_SENTRY_DSN production
vercel env add CRON_SECRET production --sensitive        # pre-generated: 8e2bfe468e4c52c1747e75ea620ee6826f1fe852796dc52a11497fb6e342acdc
```

Or skip the CLI and paste them in Vercel UI: Project → Settings → Environment Variables.

## Phase 6 — Deploy

The push in Phase 4 already triggered a Vercel build. Watch it at:

```
https://vercel.com/devpatel128s-projects/trove/deployments
```

If env vars were not set before the push, redeploy:

```bash
vercel --prod
```

## Phase 7 — Post-deploy verification

```bash
DOMAIN="https://trove-wine.vercel.app"   # or your custom domain

# Health
curl -s "$DOMAIN/api/health"             # → { status: "ok", ... }

# SEO files exist
curl -sI "$DOMAIN/robots.txt"   | head -3
curl -sI "$DOMAIN/sitemap.xml"  | head -3
curl -sI "$DOMAIN/llms.txt"     | head -3
curl -sI "$DOMAIN/manifest.webmanifest" | head -3

# Marketing pages return 200
for path in / /features /pricing /about /contact /security /blog /docs /privacy /terms; do
  echo "$path → $(curl -so /dev/null -w '%{http_code}' "$DOMAIN$path")"
done

# OG image renders
curl -sI "$DOMAIN/opengraph-image"

# Stripe webhook test
# (Dashboard → Webhooks → … → Send test event → customer.subscription.created)

# Cron registered
# (Vercel Dashboard → Cron tab → confirm 3 jobs)
```

## Phase 8 — DNS / custom domain

Already in place: `trove.vroelabs.com` → Vercel. After the deploy succeeds, hit it. If you only use `trove-wine.vercel.app`, skip.

## Rollback plan

If V2 deploy breaks prod:

```bash
# Option A: Vercel dashboard → Deployments → previous → "Promote to Production"

# Option B: revert main to V1
cd path/to/checkout
git fetch origin
git checkout main
git reset --hard v1-archive
git push --force origin main
```

V1 is recoverable in seconds because we tagged it.

## What you get

- **Repo:** `https://github.com/DevPatel128/Trove` (V2 on `main`, V1 on `v1-archive`).
- **App:** `https://trove-wine.vercel.app` (Vercel default) and `https://trove.vroelabs.com` (custom).
- **Admin:** `/admin` — sign in with an account where `profiles.role = 'owner'`. To promote yourself:
  ```sql
  update public.profiles set role = 'owner' where email = 'devpatel1286@gmail.com';
  ```
  (Run in Supabase SQL Editor.)
