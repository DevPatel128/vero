# Vero — pre-launch website

> The marketing + waitlist + investor surface for **Vero** (a VROE Labs product).
> Pre-launch. Public-safe. Hides all internal stack + infra details.

This is a fresh Next.js app inside `Website/site/`. It reads its philosophy from the
context pack at `/Vero/vero/docs/context-pack/` (00 overview, 01 philosophy, 02 brand,
14 copywriting tone, 15 roadmap) and the `/Vero/Website/CLAUDE.md` agent contract.

## Quick start

```sh
cd "Vero/Website/site"
npm install
cp .env.example .env.local   # edit if you want to wire email + investor inbox
npm run dev
# open http://localhost:3000
```

Build:

```sh
npm run build
npm run start
```

## What this site is

A grand pre-launch surface that does six jobs:

1. **Explainer** — 8-second understanding of what Vero is.
2. **Marketing + SEO + AEO + LLMO** — discoverable on Google, Perplexity, ChatGPT, Claude, Gemini.
3. **Waitlist machine** — file-backed referral queue, founding-member tiers, share cards.
4. **Storytelling** — manifesto, about, why-now, build philosophy.
5. **Investor surface (gated)** — discreet footer link → request form. No public deck.
6. **Ecosystem hint** — single `/ecosystem` page introducing VROE Labs + RIE + Trove + ALVED protocol.

## Routes (high level)

- `/` — home (hero + problem + how it works + features + personas + FAQ + final CTA)
- `/how-it-works` — five-step explainer + record card examples
- `/features` — record / standing / money + safety / verification
- `/for-workers`, `/for-businesses` — persona-specific pages
- `/pricing` — plans + comparison table + pricing FAQ
- `/about`, `/manifesto`, `/why-now` — story surfaces
- `/trust`, `/security` — trust posture + public-safe security statement
- `/faq` — FAQPage JSON-LD
- `/press`, `/contact`, `/status`
- `/ecosystem` — VROE Labs umbrella + ALVED protocol (RIE + Trove hinted, vision-led)
- `/investors` — gated (noindex). Deck behind email request form.
- `/waitlist` — sign-up form, role toggle, honeypot, consent checkbox
- `/waitlist/[token]` — personal page (position, tier, referral link, share cards)
- `/legal/*` — privacy, terms, cookies, refund, acceptable use, accessibility, grievance officer, responsible disclosure
- System: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/manifest.webmanifest`, `/.well-known/security.txt`
- `/api/waitlist/join`, `/api/waitlist/stats`, `/api/investors/request`

## What is intentionally **not** disclosed publicly

Per the founder direction:

- No naming of internal vendors (DB, hosting, KMS, email provider, etc.)
- No internal architecture diagrams
- No employee org chart
- No real-time metrics on the marketing surface
- No mention of MSG91 / Razorpay / DigiLocker outside the security page (and even there only when context is right)

The `/security` page is the only marketing surface that uses generic, public-safe descriptions of crypto + identity verification, without naming specific vendors.

## Waitlist storage

Default: **file-backed JSON** at `data/waitlist.json` (gitignored).

This is intentional. The waitlist is a single dependency interface (`WaitlistStore`) so it can be swapped for Supabase / Postgres later by writing one new module. The contract is in `src/lib/waitlist/types.ts`.

For production, set `WAITLIST_STORE=supabase` + the Supabase env vars, and add the corresponding `supabase-store.ts` implementation.

## Email

The `sendEmail` helper logs to console in dev (no provider needed). Set `RESEND_API_KEY` in `.env.local` to enable real sending.

## Design tokens

- Type: Fraunces (display) + Inter (sans).
- Palette: warm paper / deep ink / accent green. Trust-first, calm-premium.
- Components: bespoke (no third-party UI lib). Buttons, cards, sections, hero, record cards.
- Motion: subtle. Honours `prefers-reduced-motion`.

## Build status

```
✓ Compiled successfully
✓ 35 routes generated
```

## Where to take this next

1. Wire a real email provider via `RESEND_API_KEY`.
2. Move waitlist to Supabase by adding `src/lib/waitlist/supabase-store.ts` + flipping the export in `src/lib/waitlist/index.ts`.
3. Add per-page OG images via `next/og`.
4. Hook up real analytics (PostHog or Plausible) — privacy-light.
5. Lighthouse pass + axe-playwright when CI is added.

