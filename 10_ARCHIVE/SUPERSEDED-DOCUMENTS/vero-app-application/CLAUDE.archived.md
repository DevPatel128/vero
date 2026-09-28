# VERO Application — Agent Contract

This is the standalone Next.js application for VERO. Independent from the marketing website. Independent from RIE, Trove, and all other VROE Labs products. No monorepo, no shared packages.

Read the root `/CLAUDE.md` first for full product context. This file covers application-specific rules.

---

## What This App Is

A Next.js 16 web application that runs VERO — the verified proof-of-work identity platform. Workers complete real jobs, both sides sign, permanent records are created. India-first, mobile-first, DPDP-compliant.

**This app is NOT:**
- The marketing website (that's `/website/site/`, deployed separately)
- A monorepo or workspace package
- A dependent on `@rie/crypto` or any shared internal library
- Part of any Turborepo or pnpm workspace

**This app deploys independently on its own Vercel project.**

---

## Critical Rules

1. **Independence:** No imports from outside `/application/`. No shared `@rie/*` or `@vroe/*` packages.
2. **Read Next.js 16 docs first:** This is NOT the Next.js you may know. Read `node_modules/next/dist/docs/` before writing routes, layouts, or data-fetching code. Many patterns from training data are outdated.
3. **Mobile-first:** Every screen ships responsive at 375px, 768px, 1440px. Test on all three.
4. **Security non-negotiable:** Argon2id (`@node-rs/argon2`), Supabase RLS on every table, Zod on every API input, CSRF on state-changing routes, rate limiting on auth.
5. **Design tokens locked:** Use only the OKLCH tokens defined in `globals.css`. Never `#000`, never `#fff`, never gradient text, never neon/purple/holographic.
6. **No premature complexity:** Don't add microservices, don't add a queue layer, don't add Redis caching unless something measurably needs it.
7. **Decision hierarchy:** user trust & safety → product clarity → philosophy → brand → technical correctness → performance → polish → convenience.

---

## Tech Stack (locked)

| Layer | Package | Version |
|-------|---------|--------|
| Framework | `next` | 16.x |
| Language | `typescript` | 5.x |
| UI runtime | `react` + `react-dom` | 19.x |
| Styling | `tailwindcss` | 4.x (CSS-first, `@theme` in globals.css) |
| Components | `shadcn/ui` (via CLI) | latest |
| Icons | `lucide-react` | 1.x |
| Animation | `framer-motion` | 12.x |
| Smooth scroll | `lenis` | 1.x |
| Auth backend | `@supabase/supabase-js` + `@supabase/ssr` | 2.x / 0.10.x |
| Password hashing | `@node-rs/argon2` | 2.x (Argon2id, 64MB memory, 3 iter, 4 parallelism) |
| JWT (custom) | `jose` | 6.x (RS256 only) |
| Validation | `zod` | 4.x |
| Rate limit | `@upstash/redis` + `@upstash/ratelimit` | latest |
| Payments | `razorpay` | 2.x |
| Email | `resend` | 6.x |
| Analytics | `posthog-js` + `posthog-node` | latest |
| Error tracking | `@sentry/nextjs` | 10.x |
| Utility | `clsx` + `tailwind-merge` + `class-variance-authority` | latest |

**Package manager:** `npm` (matches the website).
**Deployment:** Vercel — separate project from the marketing site.

---

## Available Claude Code Skills

Use these skills when their trigger condition matches the task. Do not invoke skills not listed here.

### Design & UI

| Skill | When to use |
|-------|-------------|
| `ui-ux-pro-max` | Any UI/UX build, page layout, component design, accessibility check, design audit, mobile responsiveness work |
| `soft-skill` | When a page or component needs to feel premium/expensive — VERO's default vibe |
| `minimalist-skill` | Specific minimalist style work |
| `brutalist-skill` | Specific brutalist style work (rare — VERO is not brutalist) |
| `redesign-skill` | Redesigning an existing screen or flow |
| `taste-skill` / `gpt-tasteskill` | Design taste evaluation, judging visual quality |
| `21st` | Component search and inspiration from 21st.dev catalog |
| `motion` | Animation library decisions, transitions, micro-interactions |
| `lenis` | Smooth-scroll implementation (already a dep) |
| `emil-design-eng` | Design-engineering crossover, polished interaction work |

### Image & Visual Generation

| Skill | When to use |
|-------|-------------|
| `imagegen-frontend-web` | Web UI mockup generation, hero illustrations, marketing imagery |
| `imagegen-frontend-mobile` | Mobile screen mockups (Phase 2 prep) |
| `brandkit` | Brand asset generation, logo concepting, identity boards |
| `image-to-code-skill` | Convert design mockup into Next.js + Tailwind code |
| `stitch-skill` | Stitch UI generation tasks |

### Building & Coding

| Skill | When to use |
|-------|-------------|
| `anthropic-skills:coder` | Any coding task — feature build, bug fix, refactor, architecture decision |
| `anthropic-skills:donna` | Personal assistant coordination across multi-step work |
| `claude-api` | Any Claude API / Anthropic SDK integration (not Claude Code itself) |
| `output-skill` | Content / presentation generation |
| `carousel` / `carousel-design` / `carousel-copy` / `carousel-idea` | Carousel content generation |

### Strategy & Ideation

| Skill | When to use |
|-------|-------------|
| `idea` / `idea-strategist` / `idea-engineer` / `idea-marketing` / `idea-legal` / `idea-operations` / `idea-orchestrator` / `idea-risk-precheck` / `idea-batch` | Strategy and ideation sessions |
| `anthropic-skills:wolf` | Research analyst work |

### Verification & Quality

| Skill | When to use |
|-------|-------------|
| `verify` | After building a feature — confirm it works end-to-end in the running app |
| `code-review` | Before marking any PR or major change as done |
| `security-review` | Before any auth, payment, escrow, dispute, or trust-system code ships |
| `run` | Launch and observe the running app for a manual check |
| `impeccable` | Highest-quality output mode |

### Utility & Meta

| Skill | When to use |
|-------|-------------|
| `caveman:caveman` / `caveman:caveman-review` / `caveman:caveman-commit` / `caveman:caveman-help` / `caveman:compress` | Token-efficient communication mode |
| `update-config` | Settings.json changes, hooks, permissions |
| `keybindings-help` | Keybinding customization |
| `fewer-permission-prompts` | Reduce permission prompt friction |
| `loop` | Recurring task on an interval |
| `schedule` | Cron-style scheduled remote agent |
| `init` / `review` | Init or review commands |

### Anthropic Bundled

| Skill | When to use |
|-------|-------------|
| `anthropic-skills:skill-creator` | Create a new skill |
| `anthropic-skills:consolidate-memory` | Memory cleanup |
| `anthropic-skills:setup-cowork` | Cowork setup |
| `anthropic-skills:docx` / `anthropic-skills:xlsx` / `anthropic-skills:pdf` / `anthropic-skills:pptx` | Office document generation |

---

## Folder Structure

```
application/
  src/
    app/                     Next.js 16 App Router pages
      (auth)/                Route group: login, signup, verify
      (worker)/              Route group: worker-facing flows
      (business)/            Route group: business-facing flows
      (shared)/              Route group: job view, messaging, profile
      api/                   API routes (auth, jobs, payments, disputes)
      globals.css            Design tokens (@theme directive)
      layout.tsx             Root layout
      page.tsx               Landing / redirect to login
    components/
      ui/                    shadcn/ui base components
      forms/                 Form components + Zod schemas
      layout/                Header, Footer, Nav, Sidebar
    lib/
      supabase/              Client, server, admin clients
      crypto/                argon2 + jose wrappers
      payments/              Razorpay helpers
      validations/           Shared Zod schemas
      utils.ts               cn() helper for shadcn
    hooks/                   useUser, useJob, useEscrow, etc.
    types/                   TypeScript interfaces
  migrations/                SQL migrations for Supabase
  public/                    Static assets
  CLAUDE.md                  This file
  AGENTS.md                  Next.js 16 agent hints (do not delete)
  README.md                  Setup instructions
  next.config.ts             Next.js config
  postcss.config.mjs         Tailwind v4 PostCSS config
  tsconfig.json              TypeScript config
  package.json               Dependencies
  .env.example               Env var template
  .env.local                 Actual env vars (gitignored)
```

---

## Security Non-Negotiables

| Requirement | Implementation |
|------------|----------------|
| Password hashing | `@node-rs/argon2`, Argon2id, 64MB memory, 3 iterations, 4 parallelism |
| Session tokens | Supabase Auth handles natively (JWT with HS256 or RS256 depending on Supabase project config) |
| Custom token signing | `jose`, RS256 only — never HS256 |
| Token expiry | 15min access, 7d refresh |
| CSRF | Tokens on all state-changing endpoints, 30min TTL, one-time use |
| Rate limit | `@upstash/ratelimit` — 5 auth/15min, 10 signup/hr |
| Input validation | `zod` on every API boundary, every form |
| DB access control | Supabase RLS on every table, no exceptions |
| Soft deletes | `deleted_at` column on `users` (DPDP right to erasure) |
| Audit logs | Permanent retention, 7-year minimum |
| PII handling | Never in URL params, never in client bundles |

---

## Design Tokens (Locked)

Defined in `src/app/globals.css` via Tailwind v4 `@theme` directive.

**Dark (default):**
- `--surface-0` to `--surface-2` — tinted graphite layers
- `--ink-0` to `--ink-3` — text + rule hierarchy
- `--accent` — champagne (≤10% of viewport)
- `--accent-glow` — focus rings only
- `--signal` — verification cyan (trust marks only)

**Type scale:** modular 1.250 — `micro 0.75rem → mega 6.5rem`. Hero h1 uses `clamp(2.75rem, 6.4vw + 0.5rem, 7rem)`.

**Fonts:**
- `Geist Sans` (variable) — display + body
- `Geist Mono` — IDs / hashes / timestamps only
- `Spectral` italic — pull quotes only (1–2 per page max)

**Motion:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo), 180ms / 320ms / 600ms timing. Transform + opacity only. Respect `prefers-reduced-motion`.

**Banned:** pure black/white, gradient text, purple, neon, holographic, drop caps, tracked-uppercase mono kickers, "trusted by [logos]" strips, 3-up icon grids.

---

## Routing Conventions

Next.js 16 App Router. Route groups in parens (do not appear in URL).

- `/` → landing (redirects to `/login` if not authed, `/dashboard` if authed)
- `/(auth)/login` → login screen
- `/(auth)/signup` → signup
- `/(auth)/verify` → email/phone verification
- `/(worker)/dashboard` → worker dashboard
- `/(worker)/profile` → worker profile setup + view
- `/(worker)/opportunities` → opportunity board
- `/(worker)/jobs/[id]` → active job view
- `/(business)/dashboard` → business dashboard
- `/(business)/post-job` → job posting flow
- `/(business)/hire/[applicantId]` → review applicant
- `/(shared)/job/[id]` → shared job view
- `/(shared)/messages/[threadId]` → message thread
- `/admin/*` → role-gated admin panel
- `/api/*` → server endpoints (auth, jobs, payments, disputes, signatures)

---

## Database Tables (Supabase)

```
users, profiles, career_paths, opportunities, bookings,
reviews, messages, verifications, trust_scores,
portfolio_items, dispute_cases, payments, referrals,
badges, cities, ambassador_profiles, notifications,
audit_logs, user_consents, refresh_tokens
```

RLS policies defined per table in `migrations/`.

---

## Code Conventions

- Server components by default. Add `"use client"` only when necessary (state, effects, browser APIs).
- One component per file. PascalCase filenames for components.
- Co-locate Zod schemas with the route or form that uses them.
- No magic strings — all enum-like values in `types/` or as const arrays.
- No barrel files (`index.ts` re-exports) unless they reduce real friction.
- Comments only when WHY is non-obvious. Never narrate WHAT the code does.
- No TODO comments without a tracked task.
- Strict TypeScript. No `any`. Prefer `unknown` + narrowing.

---

## Performance Targets

- Lighthouse Performance ≥ 90 (mobile)
- Lighthouse Accessibility ≥ 95
- Lighthouse SEO ≥ 95
- First Contentful Paint < 1.5s on 3G
- Time to Interactive < 3s on 3G
- Bundle size: keep initial JS under 200KB compressed

---

## Verification Before Marking Work Done

- `npm run build` passes with zero errors
- `npm run typecheck` passes with zero errors
- `npm run lint` passes
- The feature works in the running dev server (`npm run dev`)
- Responsive at 375px, 768px, 1440px
- No console errors or warnings in browser
- For auth/payment/trust code: `security-review` skill invoked first

---

## What This App Does Not Do (Phase 1)

- No native mobile app (Phase 2)
- No AI matching (Phase 2+)
- No blockchain credentials (Phase 5)
- No bidding (ever)
- No anonymous accounts (ever)
- No social feed (ever)
- No paid placement in search (ever)
