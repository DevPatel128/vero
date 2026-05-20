# Changelog

All notable changes to Trove are documented here. See [/changelog](https://trove.vroelabs.com/changelog) for the public version.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2026-05-14

### Major
- Full rewrite on Next.js 15 App Router + React 19 + TypeScript strict.
- Tailwind v3 + shadcn/ui with FT × Apple design system.
- Supabase SSR auth + RLS on every table; service-role keys server-only.
- Stripe billing wired end-to-end with portal + webhooks.
- Cron jobs for subscription detection, weekly digests, cleanup.
- PostHog + Sentry + Resend integrated.
- Full marketing site: home, features, pricing, about, contact, careers, security, integrations, case studies, changelog, blog (MDX + RSS), docs.
- Legal: privacy, terms, cookies, accessibility statement.
- Auth: email/password + Google OAuth, magic-link friendly.
- Product: dashboard, transactions, analytics, subscriptions, budgets, goals, reports, notifications, search, support, full settings cluster (profile, billing, notifications, team, API keys, audit log).
- Admin: overview, users, billing, feature flags, analytics.
- API: typed, validated (zod), rate-limited (Upstash sliding window).
- SEO: robots, sitemap, llms.txt, manifest, JSON-LD (Organization + SoftwareApplication + Article), per-page OG.
- Tests: Vitest unit, Playwright E2E, axe a11y suite.
- CI: lint + typecheck + unit + build + E2E + CodeQL + Lighthouse.

## [1.4.0] — 2026-05-10

### Added
- Recurring detection (90-day window) with top-5 quick-fill chips.
- Weekly AI digest email (Mondays 9am local).
- PostHog product analytics.

## [1.3.0] — 2026-05-01

### Added
- react-hook-form + zod validation on profile + transaction forms.
- Upstash Redis distributed rate limiting.
- Server-side JWT verification on Netlify Functions.

## [1.2.0] — 2026-04-18

### Added
- Seven-section landing page.
- Gold T monogram favicon.
- 14 stroke-icon React components.
