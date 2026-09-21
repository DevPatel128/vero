# VERO Application

Standalone Next.js 16 application for VERO — the verified proof-of-work identity platform.

This is **not** part of any monorepo. It deploys independently on Vercel, separate from the marketing site at `/website/site/`.

---

## Quick start

```bash
cd application
cp .env.example .env.local   # fill in real values
npm install
npm run dev
```

Then open http://localhost:3000

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Production build (runs typecheck + Turbopack) |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check without emitting |

---

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Language:** TypeScript (strict)
- **Styling:** TailwindCSS 4 (CSS-first config in `globals.css`)
- **Components:** shadcn/ui patterns (CVA + custom)
- **Icons:** lucide-react
- **Animation:** Framer Motion + Lenis
- **Backend:** Supabase (Auth + PostgreSQL + Storage + Realtime)
- **Password hashing:** `@node-rs/argon2` (Argon2id)
- **JWT:** `jose` (RS256 only)
- **Validation:** Zod
- **Rate limit:** Upstash Redis + `@upstash/ratelimit`
- **Payments:** Razorpay (India)
- **Email:** Resend
- **Analytics:** PostHog
- **Errors:** Sentry

---

## Folder structure

See `CLAUDE.md` for the full agent contract and folder map.

```
src/
  app/                Next.js routes (App Router)
    (auth)/           Login, signup, verify
    api/              Server endpoints
    globals.css       Design tokens
    layout.tsx
    page.tsx
  components/
    ui/               Base components (Button, Input, etc.)
    forms/            Form components + Zod schemas
    layout/           Header, Footer, Nav
  lib/
    supabase/         client.ts · server.ts · admin.ts
    crypto/           password.ts · tokens.ts
    payments/         razorpay.ts
    validations/      auth.ts (+ more)
    ratelimit.ts
    utils.ts          cn() helper
  hooks/
  types/
migrations/           SQL migrations for Supabase
public/
```

---

## Database setup

Run the initial schema against your Supabase project:

1. Create a Supabase project
2. Open SQL Editor in the Supabase dashboard
3. Paste contents of `migrations/001_initial_schema.sql` and run
4. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

The migration creates 20 tables with RLS policies. See `CLAUDE.md` for the table list.

---

## Security

Non-negotiable security requirements live in `CLAUDE.md` and the root `/CLAUDE.md` section 17.

Quick reference:
- Argon2id password hashing (`src/lib/crypto/password.ts`)
- RS256 JWT signing via `jose` (`src/lib/crypto/tokens.ts`)
- Zod validation on all API inputs (`src/lib/validations/`)
- RLS policies on every table (`migrations/`)
- Rate limiting on auth (`src/lib/ratelimit.ts`)
- DPDP Act 2023 compliant: soft deletes, audit logs, consent tracking

---

## Deployment

Deploy to Vercel as a **separate project** from the marketing site.

```bash
vercel deploy   # first time, follow prompts
vercel --prod   # production
```

Set env vars in Vercel project settings — never in source.

---

## What to build next

See `CLAUDE.md` and root `/CLAUDE.md` section 19 for the phased roadmap.

Immediate next steps from the Build Order:
1. Wire up auth API routes (`src/app/api/auth/*`) — signup, login, verify, refresh, logout
2. Worker onboarding flow
3. Opportunity board + apply flow
4. Job execution + dual-signature
5. Worker public record page
6. Business onboarding + posting
7. Business dashboard + hire flow
8. Razorpay escrow integration
9. Dispute flow
10. Admin route group (role-gated)
