# Vero — pre-launch website

> The marketing and waitlist surface for **Vero** (a VROE Labs product). Pre-launch.

This is a Next.js 16 app. It is the code that Vercel builds and deploys; nothing outside `website/site/` affects the live site. Product context and brand rules live in the repo root documentation system: start at [`00_START_HERE/README.md`](../../00_START_HERE/README.md), and see [`website/CLAUDE.md`](../CLAUDE.md) for the copy contract for this folder.

## Quick start

```sh
cd website/site
npm ci
cp .env.example .env.local   # fill in what you need; see below
npm run dev
# open http://localhost:3000
```

Build:

```sh
npm run build
npm run start
```

Checks:

```sh
npm run typecheck
npm run lint
npm test        # Playwright, starts its own dev server
```

## Routes (high level)

- `/` — home
- `/how-it-works`, `/features`, `/for-workers`, `/for-professionals`, `/for-businesses` — explainer and persona pages
- `/pricing`, `/about`, `/manifesto`, `/why-now`, `/trust`, `/security`, `/faq`, `/press`, `/contact`, `/status`
- `/investors` — gated, noindex. Deck behind an email request form, not public.
- `/waitlist`, `/waitlist/[token]`, `/waitlist/thanks`
- `/legal/*` — privacy, terms, cookies, refund, acceptable use, accessibility, grievance officer, responsible disclosure, sub-processors, security
- System routes: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/manifest.webmanifest`, `/.well-known/security.txt`
- API: `/api/waitlist/join`, `/api/waitlist/stats`, `/api/investors/request`

## Waitlist storage

`src/lib/waitlist/index.ts` picks the store: **Upstash Redis** (`src/lib/waitlist/upstash-store.ts`) when `UPSTASH_REDIS_REST_URL` is set, otherwise a **local JSON file** at `data/waitlist.json` (`src/lib/waitlist/file-store.ts`, gitignored, for local dev only — it does not work on Vercel's read-only filesystem). Production must always have both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` set. The store contract is `WaitlistStore` in `src/lib/waitlist/types.ts`; a new backend is one new module plus a line in `index.ts`.

## Email

`src/lib/email.ts` calls the Resend API when `RESEND_API_KEY` is set, and otherwise logs to the console. No other provider is wired in.

## Design tokens

Type: Geist Sans (headings and body), Geist Mono (hashes, IDs, timestamps), Spectral italic (pull-quotes only). Palette: OKLCH graphite neutrals with one champagne accent and a verification-cyan signal color, defined in `src/app/globals.css` and `tailwind.config.ts`. Full rules: [`04_DESIGN/DESIGN-SYSTEM.md`](../../04_DESIGN/DESIGN-SYSTEM.md).

## Observability

There is no error-tracking or analytics provider wired into this app today.

## Environment variables

See `.env.example` for the full list with comments. Never commit `.env.local` or any real credential; only `.env.example` (placeholders) is tracked.

## Security headers

Defined once, in `next.config.ts`. `vercel.json` does not duplicate them.
