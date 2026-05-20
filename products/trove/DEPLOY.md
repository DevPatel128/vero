# Deployment

## Targets

- **Primary:** Vercel (`trove.vroelabs.com`)
- **Database & Auth:** Supabase
- **Payments:** Stripe
- **Email:** Resend
- **Rate limiting:** Upstash Redis
- **Observability:** PostHog + Sentry

## Step 1 — Supabase

1. Create a project at https://supabase.com/dashboard
2. Open the SQL editor and run `supabase/schema.sql` once.
3. Seed feature flags: run `supabase/seed.sql`.
4. **Auth → Providers**: enable Email and Google. Set redirect URL to `${APP_URL}/auth/callback`.
5. **Auth → Email templates**: customize confirmation + reset emails to use Trove branding (optional — defaults work).
6. **Storage**: optional bucket `avatars` for profile photos.
7. Note the **Project URL** and the **anon** + **service_role** keys.

## Step 2 — Stripe

1. Create products: **Trove Pro** with monthly and yearly prices ($9 / $84).
2. Optionally create **Trove Team** ($24 / $240).
3. Configure the **Customer Portal** in Settings → Billing → Customer Portal — enable plan switching and cancellation.
4. **Webhooks**: add an endpoint at `${APP_URL}/api/stripe/webhook` subscribed to `customer.subscription.*` and `invoice.payment_failed`. Copy the signing secret.

## Step 3 — Upstash Redis

Create a Redis database, copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## Step 4 — Resend

Verify your sending domain (`trove.vroelabs.com`). Set `RESEND_FROM_EMAIL` to `"Trove <hello@trove.vroelabs.com>"`. Sandbox sender `onboarding@resend.dev` works until then.

## Step 5 — PostHog + Sentry

- PostHog project key → `NEXT_PUBLIC_POSTHOG_KEY`.
- Sentry DSN → `NEXT_PUBLIC_SENTRY_DSN`. Auth token + org + project for source maps.

## Step 6 — Gemini

Create an API key at https://aistudio.google.com → `GEMINI_API_KEY`.

## Step 7 — Vercel

1. Import the GitHub repo at https://vercel.com/new.
2. Framework preset: **Next.js** (auto-detected).
3. Add every variable from `.env.example` in Project → Settings → Environment Variables.
4. Generate a random `CRON_SECRET` and add it.
5. Hit deploy. First production deploy creates the cron jobs from `vercel.json`.
6. After deploy: assign the custom domain `trove.vroelabs.com` (or whichever).

## Step 8 — DNS

- Set the apex A/AAAA or CNAME per Vercel's domain dashboard.
- TLS is automatic via Let's Encrypt.
- HSTS is enforced via the response header configured in `next.config.ts`.

## Post-deploy checklist

- [ ] `https://trove.vroelabs.com/` returns 200 and renders.
- [ ] `https://trove.vroelabs.com/sitemap.xml`, `/robots.txt`, `/llms.txt` return 200.
- [ ] `/api/health` returns `{ status: "ok" }`.
- [ ] OAuth login round-trips successfully.
- [ ] Stripe webhook test event delivers a 200.
- [ ] Cron jobs registered (check Vercel → Cron tab).
- [ ] PostHog receives pageviews.
- [ ] Sentry receives a deliberate test error.
- [ ] Lighthouse score ≥ 90 on `/`, `/pricing`, `/features`.

## Rollback

```bash
# Promote a previous deployment via Vercel CLI:
vercel rollback <deployment-url>
```

Or use the Vercel dashboard → Deployments → ⋯ → Promote to Production.

## Staging

Vercel Preview Deployments are created automatically for every PR. They use the same `Preview` environment variables (configurable separately in Vercel).
