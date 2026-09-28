# Deploy runbook

Production deploys go to Vercel. India region (`bom1`) is locked in `vercel.json` for latency.

## Prereqs

- Vercel account with the org you intend to host under
- GitHub repo with this monorepo pushed
- DNS access for `vroe.app`, `vero.app`, `rie.app`, `trove.vroe.app`

## Marketing site (vroe.app) — ship first

1. **Import on Vercel**
   - Vercel → New Project → import the GitHub repo.
   - Framework Preset: **Next.js**
   - Root Directory: **`apps/marketing`**
   - Build command: **leave default** (Vercel reads `apps/marketing/vercel.json`)
   - Install command: **`cd ../.. && pnpm install --frozen-lockfile`** (already in `vercel.json`)

2. **Env vars** (Project → Settings → Environment Variables)
   ```
   NEXT_PUBLIC_SITE_URL=https://vroe.app
   NEXT_PUBLIC_POSTHOG_KEY=phc_…
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   SENTRY_DSN=https://…@sentry.io/…
   NEXT_PUBLIC_SENTRY_DSN=https://…@sentry.io/…
   RESEND_API_KEY=re_…              # optional, for real waitlist forwarding
   ```

3. **Domain** — Project → Settings → Domains → add `vroe.app` and `www.vroe.app`. Update nameservers per Vercel's instructions.

4. **Verify** — push to `main`, Vercel auto-deploys. Confirm:
   - `https://vroe.app` returns 200 with the new Vero hero
   - `https://vroe.app/robots.txt` returns the robots file
   - `https://vroe.app/sitemap.xml` returns the sitemap
   - `https://vroe.app/llms.txt` returns the LLM index
   - `https://vroe.app/feed.xml` returns the RSS feed
   - `https://vroe.app/legal/grievance` is reachable (DPDP requirement)

## Vero (vero.app) — ship with launch #1

1. Vercel → New Project → same repo, **Root Directory = `apps/vero`**.
2. Env vars from `apps/vero/.env.example`:
   ```
   NEXT_PUBLIC_SITE_URL=https://vero.app
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   JWT_PRIVATE_KEY=                  # openssl genrsa -out private.pem 2048
   JWT_PUBLIC_KEY=                   # openssl rsa -in private.pem -pubout -out public.pem
   ENCRYPTION_KEY=                   # openssl rand -hex 32
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   RAZORPAY_WEBHOOK_SECRET=
   RESEND_API_KEY=
   MSG91_AUTH_KEY=
   MSG91_TEMPLATE_ID=
   DIGILOCKER_CLIENT_ID=
   DIGILOCKER_CLIENT_SECRET=
   R2_ACCOUNT_ID=
   R2_ACCESS_KEY_ID=
   R2_SECRET_ACCESS_KEY=
   R2_BUCKET=vero-proofs
   ```
3. Domain: add `vero.app` + `www.vero.app`.
4. Verify `https://vero.app/login` reaches the OTP form.

## RIE (rie.app) — ship with launch #2

Same recipe, Root Directory `apps/rie`. Env from `apps/rie/.env.example`.

## Trove (trove.vroe.app) — ship with launch #3

Same recipe, Root Directory `apps/trove`. Env from `apps/trove/.env.example`.

## GitHub Actions secrets (optional preview/prod workflows)

The `preview.yml` and `production.yml` workflows are gated. To enable them set:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID    # per-app — duplicate the workflow if you want all four
```

Without these secrets, Vercel's native GitHub integration handles deploys (recommended for solo founders).

## Post-deploy checks

```bash
# Marketing
curl -fsS https://vroe.app | head -n 5
curl -fsS https://vroe.app/robots.txt
curl -fsS https://vroe.app/llms.txt

# Security headers
curl -sI https://vroe.app | grep -i -E "strict-transport|x-frame|x-content|referrer|content-security"

# Sitemap
curl -fsS https://vroe.app/sitemap.xml | head -n 10
```

## Rollback

Vercel keeps every deploy. Project → Deployments → pick a previous one → "Promote to Production".

## DNS records cheat-sheet

```
vroe.app           A      76.76.21.21
www.vroe.app       CNAME  cname.vercel-dns.com
vero.app           A      76.76.21.21
rie.app            A      76.76.21.21
trove.vroe.app     CNAME  cname.vercel-dns.com
```

(Vercel will give you the exact target IPs/CNAMEs in the UI; the above is current at time of writing.)

