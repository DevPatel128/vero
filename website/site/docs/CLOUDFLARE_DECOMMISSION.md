# Cloudflare decommission (2026-10-13)

## What happened

On 2026-10-13 all Vero resources were removed from Cloudflare. The site is no longer hosted publicly. The code stays in this GitHub repository and in the local copy on the maintainer's Mac.

Removed from Cloudflare:

- Worker `vero` (including `vero.dvpatel.workers.dev` and version history)
- D1 database `vero-waitlist` (id `a6ad6778-5bb5-44c7-bb5e-74034620c31c`)
- Worker secret `RESEND_API_KEY` (went with the Worker)

Before deletion, the D1 database was exported to `backups/vero-waitlist-2026-10-13.sql`. At that time the `entries` table (waitlist signups) had **0 rows**, so no signups were lost. The backup holds the schema and one rate-limit row. The schema is also in `migrations/0001_init.sql`.

The Workers Builds git integration (which deployed on push to `main`) was disconnected as part of the removal. The canonical domain `vero.work` had never been attached to the Worker.

## Why

The goal was to reduce load and usage on the Cloudflare account while the project is paused. This is a pause, not an abandonment: nothing was deleted from the repo, and the project can be brought back.

## Where everything lives now

- Code: this repository (`DevPatel128/vero`), app in `website/site/`.
- Local copy: the maintainer's Mac, same folder as this repo.
- Data: no production data existed (empty waitlist). Schema backup in `website/site/backups/`.

## Run locally (demo)

Requires Node 24.

```bash
cd website/site
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without `RESEND_API_KEY`, emails are logged to the console and the waitlist uses a local JSON store. For the Workers runtime with a local D1:

```bash
npx wrangler d1 migrations apply vero-waitlist --local
npm run preview
```

## Restore to Cloudflare

1. `npx wrangler login`.
2. `npx wrangler d1 create vero-waitlist`, then put the new `database_id` in `wrangler.jsonc` (the old id is dead).
3. `npx wrangler d1 migrations apply vero-waitlist --remote` (or `npx wrangler d1 execute vero-waitlist --remote --file backups/vero-waitlist-2026-10-13.sql`).
4. `npx wrangler secret put RESEND_API_KEY`.
5. `npm run deploy`.
6. Optionally reconnect Workers Builds in the Cloudflare dashboard (set `NEXT_PUBLIC_SITE_URL` as a build variable) and attach the `vero.work` domain.
