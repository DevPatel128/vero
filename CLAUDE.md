# CLAUDE.md — VROE Labs Master Context

For Claude Code / AI agents working in this repo. Read this file first. Always.

---

## 1. Agent Instructions

### Task Routing

| Task | Load sections | Key constraint |
|------|--------------|----------------|
| **Frontend** | 6, 7, 9, 17, 18 | Mobile-first, shadcn/ui, no heavy libs |
| **Backend** | 10, 11, 12, 20, 21 | Supabase/Postgres, RLS, auditability |
| **Security / Auth** | 3, 11, 12, 17 | @rie/crypto only, never DIY |
| **Brand / Copy** | 5, 6, 8 | Calm, premium, no startup slang |
| **Design** | 6, 7, 8 | DESIGN.md tokens (colors / type / motion) |
| **Roadmap / Scope** | 19, 26 | Phases, no premature expansion |
| **Pricing** | 25 | Workers free, businesses SaaS + 5% escrow |
| **Trust / ALVED** | 11 | Multi-signal, explainable, anti-gaming |

### Critical Rules

1. **Crypto:** Use `@rie/crypto` only. Never DIY JWT, hashing, or encryption.
2. **ALVED:** All identity/trust logic uses shared protocol.
3. **India compliance:** DPDP Act 2023 mandatory. Passwords = Argon2id. JWTs = RS256.
4. **Security implementation status:** Phase 1–4 complete. See section 17.
5. **No speculative architecture.** Build the simplest thing that works. Complexity arrives when value justifies it.
6. **Decision hierarchy:** user trust & safety → product clarity → philosophy → brand consistency → technical correctness → performance → visual polish → convenience.

### Products Root

```
/website/site/         → Next.js marketing site (live, do not break)
/products/vero/        → Turborepo (apps/, packages/, services/)  [not yet built]
/products/rie/         → Express API + Expo mobile                [not yet built]
/products/trove/       → Data provenance                          [not yet built]
```

### First Time?

1. Read sections 2–4 (overview, mission, philosophy)
2. Navigate to relevant product
3. Load sections by task type (see routing table above)

---

## 2. Product Overview — VROE Labs

**VROE Labs** builds three proof-based products sharing trust infrastructure:

| Product | What it is | Status |
|---------|-----------|--------|
| **Vero** | Proof-of-work identity — verified worker credentials | Pre-launch website live |
| **RIE** | Proof-of-discipline — fitness, content, gaming proof | Standalone Express + Expo |
| **Trove** | Proof-of-provenance — supply chain / data integrity | Early stage |

All share **ALVED protocol** (trust graph) and **@rie/crypto** (auth, encryption).

### Folder Map

| Folder | Purpose |
|--------|---------|
| `/website/` | Marketing site + landing (Next.js 16, Tailwind, Vercel) |
| `/products/vero/` | Turborepo: Next.js + React + Tailwind |
| `/products/rie/` | Express+TS API + Expo mobile |
| `/products/trove/` | Supabase app |

### How They Connect

```
Vero (worker proof) ←→ RIE (discipline proof) ←→ Trove (data provenance)
            ↓
    ALVED Protocol (shared trust graph)
            ↓
    @rie/crypto (auth + encryption)
```

**Cross-vertical trust is the moat.** Identity in Vero → discipline in RIE → data provenance in Trove.

### Key Decisions

1. **ALVED Protocol:** Public spec before ship. Competitive wedge.
2. **Crypto reuse:** `@rie/crypto` across all products. Single source of truth.
3. **India-first:** DPDP Act 2023 compliance, Razorpay PA, DigiLocker ID.
4. **Monetization:** SMB SaaS + 5% escrow (vs Urban Company's 25%).

---

## 3. Product Mission — VERO

### What It Is

VERO is verified proof-of-work freelance and apprenticeship infrastructure. A two-sided trust marketplace where execution is the only credential that counts. Operators build a portable, signed work history. Clients hire from a pool whose record is already proof.

**Category:** reputation infrastructure, not a job board.

### Core Narrative

- LinkedIn shows claims. VERO shows proof.
- Talent is common. Verified execution is rare.
- Execution compounds. Work becomes identity. Proof matters more than presentation.

### Users

**Primary (18–28, high-agency):** ambitious students, creators, operators, developers, designers, editors, marketers, athletes, founders, young freelancers.

**Secondary:** startups, agencies, recruiters, local businesses, ecosystem partners.

**Decision moment:**
- Operator must feel: "I need to be early. This is the future of work."
- Business must feel: "I can finally hire by proof, not presentation."
- Investor must feel: "Category-defining infrastructure, not a marketplace."

### Launch Strategy

First city: **Bengaluru.** First zones: Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City. Dense, local, trust-driven from day one.

### Non-Negotiables

- No fake engagement
- No noisy social feed
- No low-trust reputation system
- No unclear verification process
- No broken onboarding
- No black-box trust score
- No confusing payment flow
- No overcomplicated UX

### Build Principles

Trust before scale → proof before promotion → clarity before complexity → mobile-first → simple architecture → user growth through real work → stable foundations before feature sprawl.

---

## 4. Philosophy & Strategic Principles

### Core Belief

LinkedIn shows claims. VERO shows proof. This sentence shapes every product decision.

### Philosophy Pillars

1. Proof over claims
2. Trust over noise
3. Growth over vanity
4. Execution over aesthetics alone
5. Practicality over abstraction
6. Local trust over broad but shallow reach
7. Reputation earned through consistency
8. Identity built through verified work

### Feature Decision Filter

Before adding any feature, ask:
- Does this increase trust?
- Does this improve proof?
- Does this help growth?
- Does this reduce confusion?
- Does this make the product more useful in the real world?
- Does this preserve calm, premium UX?

If any answer is no, do not add the feature.

### What Is Rewarded

Completed work, punctuality, repeat clients, skill growth, verified portfolios, high-quality references, reliable behavior, consistency over time, positive dispute resolution, community contribution.

### Strategic Anti-References (must not feel like)

- Fiverr / Upwork (bidding war, dopamine UX)
- Generic SaaS landing pages (hero-metric template, identical card grids)
- Crypto / web3 hype (neon gradients, holographic visuals)
- AI-slop futurism (purple gradient, glowing chips)
- LinkedIn / Behance (vanity portfolio)
- Startup cliché (3-up icon grids, "10x your output")

### Reference Companies (feel like)

Stripe (clarity), Linear (interaction), Apple (precision), Financial Times (editorial confidence), Patagonia (restraint), Notion (calm).

### Planning Persona

The role is a principal product architect and company operator. Think end-to-end: build, sell, ship, support, measure, govern. No generic founder advice. No surface-level market notes. No planning without pricing or revenue.

---

## 5. Brand System

### Brand Attributes

Calm, premium, trustworthy, intelligent, practical, youth-oriented, human, modern, progressive, focused.

### Messaging Hierarchy

1. What VERO is
2. Why it matters
3. Why it is different
4. How it works
5. Why it is safe
6. How to join

### Brand Narrative

Not "we built another app." The story: "we are building the infrastructure where real work becomes career identity." This makes the brand bigger than a marketplace.

### Naming Logic

- VROE Labs = company
- VERO = product
- ALVED = protocol (Authentic Ledger of Validated Evolution Data)

Use names consistently. Clear naming is part of trust.

### Brand Guardrails

- No cartoonish visuals
- No clutter, no aggressive popups, no dark patterns
- No fake scarcity, no confusing metaphors
- No technical jargon without explanation

### Brand Promise

VERO helps people move from uncertainty to verified capability. A way to build a future that is visible, trusted, and earned.

### Theme Lock (Shared Across Products)

**Immutable across the family:**
- Core tone principles
- Baseline typography scale + spacing rhythm
- Accessibility standards
- Motion timing discipline
- Neutral system surfaces
- Shared trust language

**May vary by product:**
- Accent color
- Product-specific illustrations
- Small layout emphasis differences

---

## 6. Design System

### Visual Goals

Calm, intelligent, premium, modern, minimal, app-like, trustworthy. Design IS the product for pre-launch.

### Color (OKLCH, brand register)

Strategy: **Committed-but-quiet.** Tinted graphite neutrals carry 85% of the surface. One champagne signal color carries the brand voice. Verification cyan appears only at trust-system marks.

**Dark (default scene: operator, late evening, considering a career pivot):**

```css
--surface-0: oklch(0.14 0.005 240)   /* graphite base */
--surface-1: oklch(0.17 0.006 240)   /* raised */
--surface-2: oklch(0.21 0.006 240)   /* card */
--ink-0:     oklch(0.96 0.004 240)   /* primary text */
--ink-1:     oklch(0.78 0.005 240)   /* secondary */
--ink-2:     oklch(0.56 0.005 240)   /* tertiary / mono */
--ink-3:     oklch(0.38 0.006 240)   /* disabled / rule */
--accent:    oklch(0.78 0.06 95)     /* restrained warm metallic (champagne) */
--accent-glow: oklch(0.85 0.09 95)  /* focus + key marks only */
--signal:    oklch(0.72 0.08 200)    /* verification cyan, used sparingly */
```

**Light (default scene: client, weekday morning, evaluating a hire):**

```css
--surface-0: oklch(0.985 0.003 95)
--surface-1: oklch(0.965 0.004 95)
--surface-2: oklch(0.94 0.005 95)
--ink-0:     oklch(0.16 0.006 240)
--ink-1:     oklch(0.32 0.006 240)
--ink-2:     oklch(0.5 0.006 240)
--ink-3:     oklch(0.7 0.006 240)
--accent:    oklch(0.5 0.07 95)
--accent-glow: oklch(0.62 0.09 95)
--signal:    oklch(0.46 0.09 200)
```

**Color rules:**
- Never `#000` or `#fff`
- Accent ≤ 10% of any viewport
- Verification cyan only for trust-system marks (signature, hash, escrow)

### Typography

**Anti-editorial-typographic escape.** The reflex for a "trust/serious/infrastructure" brief is display-serif headlines + italic + tracked-uppercase mono labels. Saturated lane. Refuse it.

Voice words: precise, infrastructural, earned. (Not "elegant", not "warm".)

| Role | Font | Usage |
|------|------|-------|
| **Primary** | Geist Sans (Vercel, OFL) | Variable 400/500/600/700, -0.018em display, -0.005em body. Hero + all headings. |
| **Editorial accent** | Spectral (Production Type, OFL) | Italic 500 only. **1–2 manifesto-grade pull-quotes per page max.** Never headings, never kicker labels. |
| **Mono** | Geist Mono | Hashes, IDs, signature glyphs, timestamps only. Never decoratively. |

**Type scale (rem, modular 1.250):**
micro 0.75 / caption 0.8125 / body 1 / lead 1.125 / h6 1.25 / h5 1.5625 / h4 1.953 / h3 2.441 / h2 3.052 / h1 3.815 / display 4.768 / mega 6.5

Hero h1: `clamp(2.75rem, 6.4vw + 0.5rem, 7rem)`. Body line length: 62–72ch.

**Banned in this project:**
- Tracked-uppercase mono section-kickers above every heading
- Display italic in headings
- Ruled separator lines above every section title
- Drop caps

### Elevation

| Layer | Style |
|-------|-------|
| Layer 0 | `--surface-0` (page) |
| Layer 1 | `--surface-1` + border 1px `--ink-3` @ 22% opacity |
| Layer 2 | `--surface-2` + border 1px `--ink-3` @ 30% + shadow `0 1px 0 0 oklch(0 0 0 / 0.04), 0 40px 60px -30px oklch(0 0 0 / 0.32)` |
| Glass | Hero / verification-system reveal only. `backdrop-filter: blur(24px) saturate(140%)`. Borders required. |

### Motion

- Curves: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) primary. `cubic-bezier(0.22, 1, 0.36, 1)` for micro-interactions.
- Durations: 180ms (micro) / 320ms (reveal) / 600ms (scene change) / 1100ms (execution-graph node birth)
- Never animate layout (width/height/top/left). Transform + opacity + filter only.
- Magnetic CTAs: 12px translate radius, 240ms snap, 1.02 scale.
- Respect `prefers-reduced-motion`.

### Spacing

8pt grid. Major rhythm: 24 / 48 / 96 / 144 / 192. Vary deliberately for cadence. Never uniform section padding.

### Borders + Radii

Borders: 1px hairlines, `--ink-3` low-opacity. No 2px+ side stripes.
Radii: 4 (input), 12 (card), 20 (panel), 999 (pill). No mixed radii in one composition.

### Component Banlist

- No card grids of 4 identical icon+title+body tiles
- No "trusted by" logo strip below hero
- No big-number metric strip (8M users / 99.99% / 5x)
- No gradient text
- No purple. No neon. No holographic anything.
- No floating Lottie chatbot

### Acceptable Signature Moves

- Hero living execution graph (nodes appear over time, hashes stamp edges)
- Editorial pull-quotes in display serif at 4–6rem, single column
- Hairline numbered section markers (01 / 02 / 03 in mono)
- Inline signature glyphs (W ✕ C) flanking key trust statements
- Asymmetric two-column layouts with deliberate negative space

### Cards

Core visual building block. Easy to scan, tactile, support icons/stats/steps/highlights, adapt well to mobile, clear hierarchy.

### Buttons

Primary CTA, secondary CTA, subtle tertiary, disabled, loading states, accessible focus states.

### Accessibility

WCAG AA minimum, AAA on body. Visible focus rings (2px accent-glow, 4px offset). Keyboard reachable in source order. Reduced-motion full bypass. Semantic landmarks (header / main / nav / footer / section + aria-labelledby).

---

## 7. UI/UX Rules

### Principles

Mobile-first, low cognitive load, clear hierarchy, clean spacing, minimal clutter, fast interaction feedback, accessible by default, simple navigation, predictable patterns, subtle motion only when useful.

### Layout

- Generous whitespace. Readable line lengths. No dense blocks of text.
- Break content into cards, sections, and steps.
- Consistent alignment. Balanced section heights. Rhythm across pages.

### Motion

Use for: page transitions, card reveals, small hover states, progress steps, trust growth visualization.
Avoid: jitter, overuse of parallax, flashy animations, motion that slows reading.

### Interaction

Every interactive element must: look clickable, respond instantly, show loading/disabled states, support mobile touch, have accessible focus states, show error states clearly, behave consistently. No dead buttons. No placeholder UI.

### Mobile

One-handed use, small screens, slow networks, low-end Android devices, touch-first interactions. Sticky bottom nav, large tap targets, compact readable sections, collapsible long content, minimal input friction.

### Information Design

Every page answers one of: What is this? / Why should I trust it? / How does it work? / How do I start? / What happens next?

### Final Rule

If a design choice does not improve clarity, trust, or usability, remove it.

---

## 8. Copywriting & Tone

### Tone Summary

Clear, calm, premium, intelligent, confident, human, trust-first, never hypey. Editorial cadence. Confident sentences. Short. No filler. Em dashes banned in copy.

### Voice Rules

- Never: just / simply / easily / effortlessly / revolutionize / disrupt / AI-powered
- Never: vague urgency, fake counts, startup superlatives, disruption without substance
- Yes: declarative statements, numbers when meaningful, pauses

### Good Themes

Build through action → trust through proof → progress through consistency → credibility through work → growth through real contribution.

### CTA Tone

Good: "Join early access" / "Explore career paths" / "See how it works" / "Build your profile" / "Become a verified contributor"

Bad: "Learn more" / "Submit" / "Continue" / "Let's go"

### Page-by-Page Style

| Page | Tone |
|------|------|
| Home | Bold, concise, reassuring |
| What is VERO | Explanatory and confident |
| Trust & Verification | Precise and safe |
| Career Paths | Practical and aspirational |
| Manifesto | Deep, calm, memorable |
| FAQ | Direct and helpful |

### Copy Quality Check

Before publishing any line: Is it clear? Is it useful? Is it credible? Does it fit the brand? Does it help the user act? If not, revise.

---

## 9. Frontend Architecture

### Stack

- Next.js 15, React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Lenis
- Optional: GSAP for storytelling sections; React Three Fiber only when effect clearly improves experience

### Architecture Principles

1. One component does one job
2. One file has one responsibility
3. Shared logic → reusable utilities or hooks
4. Page content is data-driven where possible
5. Keep client components minimal; server components preferred
6. Keep bundle size small. Prefer readability over cleverness.

### Folder Structure

```
app/          → pages and routes
components/   → reusable UI
data/         → copy and structured content
hooks/        → reusable logic
lib/          → utilities
styles/       → global tokens and shared styling
types/        → TypeScript interfaces
```

### State Strategy

Keep state local when possible. Global state only when necessary. Interactivity for: nav, accordion, form, theme, waitlist form, motion triggers.

### Data Strategy

Represent repeatable content as data arrays: career paths, FAQs, testimonials, roadmap items, trust signals, feature blocks.

### Performance Strategy

Minimize hydration → reduce client-side JS → lazy-load non-critical → optimize images → code-split heavy features → avoid unnecessary libraries → use static routes where appropriate.

### SEO

Each page: unique title, unique meta description, semantic structure, clean headings, shareable metadata, OpenGraph data.

### Future-App Compatibility

Reuse design language across marketing site → product app: cards, badges, step flows, trust visuals, profile structures, CTA components, modal patterns, form styles.

---

## 10. Backend Architecture

### Stack

Supabase Auth, PostgreSQL, Supabase Storage, Supabase Realtime, serverless functions, Razorpay (payments).

### Backend Modules

users, profiles, career_paths, opportunities, bookings, reviews, messages, portfolio_uploads, verifications, trust_scores, disputes, payments, notifications, referrals, ambassador_profiles, analytics_events, blockchain_records (when enabled).

### Design Rules

1. Normalize core data
2. Keep trust-related data auditable
3. Separate private and public profile data
4. Separate admin operations from user-facing flows
5. Protect sensitive data
6. Plan for data growth from the start

### Auth & Roles

Roles: user, client, ambassador, mentor, admin, moderator, operator.
Auth: email, phone, optional social login, optional wallet identity later.

### Realtime (Use Sparingly)

Messages, booking updates, dispute updates, trust notifications, admin review states. Do not over-subscribe on client.

### Security

Default to least privilege. Use row-level security. Never expose sensitive fields without reason. Protect admin routes.

### Rule

Build the simplest backend that can support trust. No distributed systems until needed.

---

## 11. Trust System — ALVED

**ALVED = Authentic Ledger of Validated Evolution Data**

The core moat. Makes the platform reliable for users, clients, and the business. Measures credibility without becoming opaque or easy to game.

### Trust Philosophy

Earned through real behavior, not claimed through profile copy. Every trust signal reflects a real-world action. Users must understand how credibility is built and how to improve it.

### Trust Signals (Multi-Signal, Never One Number)

Verified completions, attendance reliability, punctuality, cancellation rate, dispute rate, repeat-client ratio, proof quality, client ratings, endorsement quality, consistency over time, role-specific performance, background verification where needed.

### Category-Aware Trust

| Category | Emphasis |
|----------|---------- |
| Elder support | Safety, background checks, emergency support |
| Pet care | Reliability, repeat trust |
| Beauty & wellness | Portfolio proof, client ratings |
| Hospitality | Punctuality, professionalism |
| Fitness | Safety, verification |
| Creative | Portfolio, client satisfaction |

### Dispute Flow

1. User reports issue
2. Evidence collected
3. Automated checks run
4. Moderator review if needed
5. Decision recorded
6. Trust score updates if appropriate

Protects both sides. Does not assume every complaint is true.

### Client Credibility

Clients also have trust indicators: payment reliability, cancellation behavior, clarity of instructions, review history, dispute frequency, repeat booking consistency.

### Anti-Gaming

Resist: fake reviews, sybil accounts, trust farming, repeated low-value bookings, manipulated endorsements, collusive ratings, fake uploads. Use multiple independent indicators.

### Public vs Private Trust

Badges, categories, general reputation = public. Sensitive data = private.

### Long-Term

Eventually: portable proof-of-work identity, credibility graphs, verified career history portable beyond VERO.

---

## 12. Crypto System — @rie/crypto

**Never DIY. Always use `@rie/crypto`.**

### Approved Primitives

| Primitive | Spec |
|-----------|------|
| Password hashing | Argon2id — 64MB memory, 3 iterations, 4 parallelism |
| JWT signing | RS256 — 2048-bit RSA keys |
| Token expiry | 15min access, 7 days refresh |
| Key init | `initializeKeys()` at startup |

### API

```typescript
import { hashPassword, verifyPassword, createTokenPair, verifyAccessToken, initializeKeys } from '@rie/crypto'
```

### What Not to Implement by Hand

- Password hashing (use `hashPassword()`)
- JWT generation (use `createTokenPair()`)
- JWT verification (use `verifyAccessToken()`)
- Any encryption or signing

### Rule

No product invents its own crypto rules when a shared rule already exists.

---

## 13. Blockchain System

### Core Principle

VERO is a proof-of-work identity platform first. Blockchain is infrastructure, not the brand. Must remain mainstream-friendly and simple.

### Use Cases (In Priority Order)

1. Portable proof-of-work identity
2. On-chain reputation snapshots
3. Verifiable work certificates
4. Smart contract escrow
5. Stablecoin payments (USDC, USDT)
6. Reputation passport
7. Signed references and endorsements
8. Soulbound skill credentials (non-transferable)
9. Transparent dispute logs

### What Blockchain Must NOT Do

- No speculative token launch
- No crypto-first brand
- No NFT marketplace hype
- No complex wallet friction for beginners
- No unnecessary on-chain data exposure

### Escrow

Smart contract escrow for: milestone-based release, hold-and-release logic, dispute holds, transparent payout records, client and worker protection.

### Wallet UX

Support embedded wallets and familiar login flows. Mainstream users must not need deep crypto knowledge.

### Chain Preference

Low-fee, mainstream-friendly ecosystems. Stay flexible on chain/provider choice.

### Website Language

Explain as trust infrastructure, not speculative crypto. Calm, useful, clear.

---

## 14. Career Paths

### Launch Categories

| Group | Roles |
|-------|-------|
| **Culinary** | Home Chef, Baker, Meal Prep Assistant, Catering Assistant |
| **Creative** | Photographer, Videographer, Video Editor, Graphic Designer |
| **Family Support** | Personal Assistant for Family, Household Coordinator, Deep Cleaning Specialist, Kitchen Support |
| **Business Operations** | Store Assistant, Admin Support, Event Support, Inventory Assistant |
| **Fitness Coaching** | Fitness Coach, Personal Trainer Assistant, Yoga Assistant, Group Workout Assistant |
| **Event Logistics** | Event Setup, Coordination, Venue Operations, Guest Management Assistants |

### Expansion Categories (Next Phases)

Elderly Assistance (socially valuable, trust-heavy), Pet Care (Walker, Sitting, Grooming, Helper), Beauty & Wellness (Makeup, Salon, Nail, Skincare, Spa Assistants), Hospitality (Café, Front Desk, Restaurant Ops, Guest Experience, Event Hospitality).

### Field Expansion Rule

Deepen category quality before broadening category count. Add only categories that can be executed well, verified well, and trusted locally.

### User Flow Per Category

Explain the job → required skills → progression path → proof examples → how trust grows → entry-level opportunities → future unlocks.

---

## 15. Growth Engine

### Growth Philosophy

Growth through proof, progress, and social credibility. Not through addiction or vanity.

### Core Growth Loop

user completes work → earns proof + trust → shares progress → others see credibility → new users join → local density improves → more opportunities → network becomes more valuable.

### High-Value Growth Features

- Public proof-of-work profiles
- Shareable achievement cards (first verified work, trust milestone, completion, top-rated week)
- City reputation pages
- Career reputation levels
- Apprenticeship streaks
- Campus ambassador program
- "Verified by VERO" badges
- Real journey stories
- Early access referrals

### Campus Ambassador Program

Key early growth lever. Ambassadors: awareness, onboarding, local trust, community education, city activation, campus word of mouth. Track their contribution with credible status.

### Referral Design

Reward quality, not quantity. Track referral conversion, retention, trust of referred users, ambassador reliability. No spam incentive designs.

### City-Level Networks

Build reputational layers by city and neighborhood. Examples: top culinary contributors in Bengaluru, trusted hospitality assistants in HSR, verified creatives in Whitefield.

### Safety on Growth

Never manipulative. No endless scrolling, excessive notifications, gimmick rewards.

---

## 16. Onboarding System

### Philosophy

User should feel: this platform is for me → I understand what it does → I know why it is different → I can start without being overwhelmed → I can trust it.

### User Types

Apprentice, worker, beginner, student, career switcher, client, household, business, ambassador, mentor.

### Apprentice Flow

Welcome → career path choice → skill level → goals → identity verification → portfolio creation → micro-learning → skill assessment → trust profile activation.

### Client Flow

Business type → location → booking needs → budget → frequency → trust expectations → support requirements.

### Friction Rules

Ask only necessary questions. Show progress indicators. Make steps visually obvious. Avoid long forms. Allow skip-for-later where safe. Explain why data is needed. Keep first session short.

### Trust-Building During Onboarding

Show: verification steps, how trust works, what profile data does, how the platform protects users, what happens after signup.

### UI Patterns

Step cards, progress bars, selection chips, simple modals, clean form fields, success states, trust reassurance blocks.

### Completion Rule

By end of onboarding: clear identity type + clear path + clear next step + sense of trust + desire to continue.

---

## 17. Security Rules & Implementation

### Philosophy

Security is not separate from trust. Unsafe system = trust system failure.

### Core Priorities

Identity protection, safe auth, secure forms, safe uploads, anti-fraud rules, payment integrity, role-based access, trust protection, moderation safety.

### Mandatory Stack

| Concern | Requirement |
|---------|------------|
| Password hashing | Argon2id (64MB / 3 iter / 4 parallelism) |
| JWT signing | RS256 with 2048-bit RSA keys |
| Token expiry | 15min access / 7 days refresh |
| Input validation | Zod schemas on all endpoints |
| Rate limiting | 5 auth attempts/15min, 10 signups/hr |
| CSRF | Tokens on all state-changing endpoints (30min TTL, one-time use) |

### Input Validation Requirements

Email: valid format. Password (signup): min 12 chars, uppercase, number, special char. Name: 2–255 chars. OTP: exactly 6 digits. All fields validated at API boundary.

### DPDP Act 2023 Compliance

- Soft deletes (deleted_at) for user right-to-erasure
- Audit logs: 7-year minimum retention, permanent
- Consent tracking (Article 5)
- No PII in URL parameters
- No PII in client bundles

### Phase Implementation Status

| Phase | Status | Summary |
|-------|--------|---------|
| **Phase 1** | ✅ Complete | Removed hardcoded secrets/PII, all auth server-side, JWT in localStorage |
| **Phase 2** | ✅ Complete | @rie/crypto integrated, Argon2id + RS256 live |
| **Phase 3** | ✅ Complete | Zod validation, CSRF tokens, rate limiting |
| **Phase 4** | ✅ Complete | Audit logging, DB schema, soft deletes, consent tracking |

### DB Schema (Auth Service)

Tables: users (id, email, password_hash, email_verified, created_at, deleted_at), email_verifications (OTP + TTL), refresh_tokens (revocation support), audit_logs (compliance), waitlist_entries (PII + optional user link), user_consents (DPDP Article 5).

Migration: `/products/vero/services/auth/migrations/001_initial_schema.sql`

### Pre-Launch Security Checklist

**Critical:** No hardcoded passwords, no hardcoded PII, all auth server-side, Argon2id, RS256, CSRF tokens, rate limiting, Zod validation. ✅ All done.

**Post-Launch (TODO):** Password reset flow, email OTP sending, admin role verification, email integration (Resend/AWS SES), data export endpoint, account deletion workflow.

### Anti-Gaming (Trust Abuse)

Protect against: fake accounts, review abuse, collusion, trust farming, duplicate identities, spam referrals, malicious uploads, manipulation of dispute outcomes.

---

## 18. Performance Rules

### Philosophy

A premium product should feel instant, especially on mobile. Slow loading, heavy animations, and oversized bundles reduce credibility.

### Key Targets

Fast initial load, minimal layout shift, smooth scrolling, low memory/CPU usage, high Lighthouse scores, good low-end device support.

### Frontend Rules

Use static rendering where possible → reduce client-side JS → split code by route → lazy-load non-critical → avoid heavy dependencies → minimize DOM complexity.

### Images & Media

Optimized sizes, compressed, correct formats, lazy-load below-fold, no unnecessary autoplay.

### Motion & Rendering

Keep subtle, avoid large blur/heavy shadow effects, reduce repaint-heavy patterns, prefer transform + opacity animations.

### Mobile Performance

Must feel good on: low-end Android, slow networks, older browsers, small screens. Smaller bundles, touch-friendly, simple responsive layouts, fast image handling.

### Build Discipline

Performance considered during implementation, not after. If a feature makes the system meaningfully slower and benefit is marginal, rework or remove.

---

## 19. Roadmap

### Philosophy

Do not expand randomly. Deepen one layer before moving to the next. Every phase preserves trust, clarity, and local market fit.

### Phases

| Phase | Goals |
|-------|-------|
| **1 — Pre-launch website** | Explain VERO clearly, build waitlist, create buzz, collect early users, educate before launch, attract ambassadors |
| **2 — Bengaluru pilot** | Activate trust network in priority zones, onboard early users + clients, launch first career categories, test verification, refine onboarding, build repeat usage, handle disputes safely |
| **3 — Category expansion** | Add elder assistance, pet care, beauty & wellness, hospitality, tutoring, home repair, creator economy, digital business support — only after Phase 2 is stable |
| **4 — Trust & reputation maturity** | Better profile depth, verified milestones, stronger credibility systems, more robust client reliability tracking |
| **5 — Blockchain extension** | Portable credentials, transparent escrow, stablecoin rails, trust portability, verifiable certificates |
| **6 — Wider city expansion** | Expand after trust model proves locally. Dense local trust > shallow spread |
| **7 — Ecosystem growth** | Mentor network, employer network, education partners, city ambassador networks, portable reputation integrations |

### Phase Advancement Rule

A phase is ready when: trust is stable, users understand the product, clients are returning, disputes are manageable, category quality is strong, UX is clean, performance is stable.

### Expansion Rule

Do not add more categories, features, or cities than the team can verify and support well. Quality over expansion protects the brand.

### Future Scopes Rule

Reserve 25% of operating budget for research, validation, customer discovery, competitive scanning, and AI-assisted context maintenance. What stays fixed: theme lock, pricing guardrails, compliance posture, shared trust + crypto rules. What can evolve: product scope, enterprise features, region-specific pages, AI guidance, launch sequencing.

---

## 20. Database Schema

### Core Tables

users, profiles, career_paths, opportunities, bookings, reviews, messages, verifications, trust_scores, portfolio_items, dispute_cases, payments, referrals, badges, cities, ambassador_profiles, notifications, audit_logs.

### Key Design Rules

- Separate public profile data, private identity data, verification status, role metadata
- Trust: store score snapshots + contributing signals + timestamps + review context + dispute effects
- Booking records: who booked, who accepted, category, location/city, time/duration, payment state, completion state, review state, dispute state, proof attachments
- Portfolio: images, video links/uploads, descriptions, category tags, verification state, timestamps, related booking references
- Disputes: reason, evidence, timestamps, reviewer notes, decision, impact on trust/payment

### Performance

Index frequently queried fields. Normalize where it helps clarity. Denormalize only for justified performance gains. Archive stale/low-value data.

### Blockchain-Ready

Design fields so they can map to on-chain attestations or hashes without rewriting the whole schema.

### Privacy

Do not expose private fields broadly. Use role-aware access rules. Sensitive verification data must be protected.

---

## 21. API Architecture

### Philosophy

Clear naming, clear input, clear output, clear errors. Avoid cleverness that makes the system hard to debug.

### Core Conventions

Consistent resource names, predictable verbs, strict input validation, useful error messages, separated public/protected endpoints, stable response shapes.

### Resource Groups

auth, users, profiles, career-paths, opportunities, bookings, reviews, trust, verifications, disputes, payments, messages, referrals, ambassadors, analytics, admin.

### Route Principles

Noun-based resources. No duplicate functionality. Nested routes understandable. Pagination on growable lists. Explicit filters.

### Validation Per Endpoint

Required fields, types, lengths, allowed values, permissions, upload safety, payment state where relevant.

### Auth & Permissions

Every route checks: authentication, role, resource ownership, admin permissions, category-specific trust restrictions.

### Error Handling

Clear, actionable, safe, consistent, not overly technical for end users. (401 = "Invalid credentials", never leak internals.)

### Admin Endpoints

Isolated, logged, protected. Never mixed with public business logic casually.

### Realtime

Messages, booking updates, dispute changes, admin review states. Polling only if realtime is impractical.

---

## 22. Admin System

### Core Functions

Waitlist review, ambassador review, user verification review, trust dispute handling, content updates, category management, city management, feedback review, analytics monitoring, payment issue review, fraud flags, support escalation.

### Roles

Super admin, moderator, support operator, trust reviewer, growth operator, content manager, analytics reviewer.

### Moderation Workflow

Queue → evidence review → action → logging → resolution follow-up.

### Waitlist Management

Sort by city, sort by career interest, track referral source, prioritize ambassadors/partners, export useful data.

### Trust Operations

Inspect: verification state, dispute state, flagged users, suspicious patterns, repeated cancellation patterns, review quality.

### Analytics to Monitor

Signups, activation, career interest breakdowns, city concentration, referral quality, verification rates, repeat-use indicators, dispute rates.

### Safety

All admin actions logged. Sensitive actions require confirmation. This creates accountability.

---

## 23. Deployment

### Hosting

Vercel (current). Alternatives: Netlify, Cloudflare Pages. Choose what supports the stack cleanly.

### Environment Rules

Keep env vars organized and minimal. Separate: public values, private secrets, provider keys, admin-only keys. Never expose secrets to client.

### Build Process

Validate code → run lint/type checks → optimize assets → produce deployable output → fail clearly if wrong.

### Release Process

Develop → test locally → verify responsiveness → verify accessibility → verify content → verify performance → deploy → monitor → rollback if needed.

### Monitoring

Error rates, form success, page performance, traffic patterns, device compatibility, broken asset references, conversion behavior.

### SEO Deployment Checks

Metadata, routes, canonical logic, social previews verified before release.

---

## 24. AI Agent Rules & Change Policy

### Agent Contract

Any agent editing this repo must follow this context file. Read first. Follow context. Prefer existing structures over inventing new ones.

### Global Rules

- Read the project overview first
- Follow the product philosophy
- Respect the brand system
- Protect the trust model
- Preserve performance and simplicity
- Do not invent product directions casually
- Use context first, ask as few questions as possible
- Avoid duplicate work
- Keep outputs aligned with the VERO mission

### Build Discipline

Work from structured files. Avoid patchwork answers. Preserve naming consistency. Avoid random design choices. Avoid speculative architecture. Avoid complexity without need.

### Agent Behavior by Domain

**Frontend:** reusable components, clean layouts, subtle motion, reliable interactions, mobile-first, accessibility, no unnecessary libraries.

**Backend:** normalize data, strict access control, protect trust/moderation logic, predictable APIs, auditability, no overengineering.

**Trust/Security:** validate assumptions, protect identity data, avoid risky shortcuts, fraud prevention in mind, admin actions logged.

**Blockchain:** infrastructure first, no speculative tokens, mainstream usability, simple wallet flows, privacy-preserving.

**Content/Design:** calm and premium tone, no noisy language, clarity, trust narrative, understandable at a glance.

### Change Policy

Any AI-driven repo change should trigger a context-pack update (this file) in the same change set whenever feasible. If not possible, document the reason.

**What must be logged for AI changes:**
- Agent name + timestamp
- Files changed
- Summary of edits
- Reason for edits
- Relevant context section
- Verification status

### Refuse To

- Guess at pricing or regulation
- Invent product behavior not supported by context
- Drift away from current product reality
- Make silent AI edits without logging

### Anti-Confusion Rule

If this file already defines a system, do not reinvent it. Refine it. Extend only when extension fits existing logic.

---

## 25. Pricing & Revenue

### Vero Pricing Model

| Tier | Who | What | Cost |
|------|-----|------|------|
| **Workers** | Apprentices, gig workers | Full platform access, build proof-of-work profile | **Free** |
| **Businesses — SaaS** | SMBs, startups, agencies | Hire verified workers, access trust data | Subscription |
| **Escrow fee** | Both sides | Holds payment until work confirmed | **5%** |
| **Studio / Enterprise** | Higher-touch plans | Advanced analytics, repeat-hire tooling, premium workflows | Custom |

Workers never pay to build records. Monetization is on the side that benefits most from trust and verification: businesses hiring with confidence.

### Revenue Logic

Primary: Business SaaS subscriptions + Escrow fees on paid work.
Secondary: Higher-touch studio or enterprise plans.
Future: Advanced analytics, repeat-hire tooling, premium business workflows, institutional/partner pricing.

### Pricing Governance Rules

- Pricing must be justified by product value and market position
- Every product gets explicit pricing documentation
- Pricing changes must be reviewed against current product pages
- Floors and ceilings required — margin must not collapse
- Exceptions must be documented

### Country Pricing (India Anchor)

Use India as the first anchor market. Compare against real local market conditions. Adjust with hybrid formula (purchasing power + local competitor benchmarks + exchange rate + tax/regulatory constraints). Never use FX-only pricing. Document: base price, localized price, floor, ceiling, exception notes, review date.

### Anti-Patterns

- Hidden fees
- Ambiguous subscription promises
- Pricing that undercuts trust
- Revenue hidden behind product prose
- Monetization that weakens adoption

---

## 26. Compliance — DPDP Act 2023

### Mandatory (India-First)

- Passwords: Argon2id with 64MB memory, 3 iterations, 4 parallelism
- JWTs: RS256 with 2048-bit RSA keys
- Token expiry: 15min access, 7 days refresh
- Soft deletes: deleted_at column for right-to-erasure
- Audit logs: permanent retention, 7-year minimum
- Consent tracking: DPDP Act Article 5 (user_consents table)
- No PII in URL parameters
- No PII in client bundles

### Privacy Design Rules

- Distinguish between public proof-of-work data and private identity data
- Do not expose private data unnecessarily
- External links, embeds, and media must be reviewed
- Avoid third-party scripts without clear value
- Principle of least privilege: each role and process gets only the access it needs

### Regional Legal

Regional legal requirements override global convenience. Privacy page structure, data access/deletion expectations, and sensitive-data handling must be reviewed before launch in any new region.

### Post-Launch Compliance TODO

- Legal review of DPDP Act implementation
- Implement data retention policies
- Add user consent management UI
- Create data export endpoint (GDPR right to portability)
- Account deletion workflow

---

*Last updated: 2026-05-26. This file is the single source of truth for all project context. Update this file whenever product reality changes.*
