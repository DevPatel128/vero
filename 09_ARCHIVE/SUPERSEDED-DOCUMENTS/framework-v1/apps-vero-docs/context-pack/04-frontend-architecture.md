# 04 — Frontend Architecture

## Stack
- **Next.js 16** (App Router, React 19). Server Components by default. Client islands where state matters.
- **TypeScript 5** strict.
- **Tailwind CSS v4** with `@theme` tokens imported from `@vroe/config/tailwind/tokens.css`.
- **shadcn/ui** primitives + custom Vero components from `@vroe/ui`.
- **Zod 4** for all input validation.
- **lucide-react** for icons.
- **TanStack Query** for client-side fetching where SSR is impractical (rare).

## App Router layout
```
apps/vero/src/app/
├── (marketing)/          → public landing, ALVED public profile
├── (auth)/               → login, register, forgot, OTP, KYC
├── (app)/                → authenticated product surface
│   ├── home/
│   ├── discover/         → search jobs, filter by neighborhood + category
│   ├── job/[id]/         → job detail + apply
│   ├── proofs/           → user's proof records
│   ├── wallet/           → balance + escrow + payouts
│   ├── me/               → profile
│   ├── settings/
│   └── admin/            → admin panel, role-gated
├── u/[handle]/           → public ALVED profile (SSG/ISR)
├── api/                  → edge handlers for OTP, auth, ALVED export
└── layout.tsx
```

## Rendering strategy
- **Static + ISR**: public profile pages, ALVED JSON-LD endpoints, marketing.
- **Server Components**: dashboards, lists.
- **Client Components**: forms, real-time chat, charts.
- **Streaming**: long pages stream with React 19 Suspense.
- **Edge**: OTP issuance, profile JSON-LD, search auto-suggest.

## Routing rules
- Authenticated routes wrapped in middleware that checks JWT cookie + RS256 verification.
- Admin routes additionally check role claim.
- Public ALVED profile has no auth.
- KYC-gated routes redirect to `/onboarding/kyc` if missing DigiLocker attestation.

## State management
- URL state for filters, search, pagination.
- Form state in local component state or `react-hook-form` (when complex).
- Cross-component state only where it must persist (auth, locale).
- No Redux. No global mutable store. If you reach for one, ask first.

## Components
- All shared primitives in `@vroe/ui`.
- Each component file in `packages/ui/src/components/` exports a Vero-flavored wrapper over a shadcn primitive.
- A component is shared if and only if it is used by ≥ 2 apps. Otherwise it lives in the app.

## Styling
- Tailwind utility classes for layout.
- Reusable patterns extracted into `cva` variant configs in `@vroe/ui`.
- No CSS-in-JS runtime libraries.
- Tokens live in `tokens.css` — never duplicate a value in a component.

## Forms
- `react-hook-form` + `zod` resolver.
- Server actions for mutations where useful.
- Inline validation. Server validates again — never trust the client.

## Performance discipline
- LCP < 2.5s.
- CLS < 0.05.
- TTI < 5s on mid-range Android.
- Bundle budgets enforced in CI.

## Testing
- **Unit** — Vitest.
- **Component** — Playwright + Storybook.
- **E2E** — Playwright.
- **Visual regression** — Chromatic.
- **a11y** — axe-playwright on every page in CI.

## Image handling
- Next.js `<Image>` only. No raw `<img>` for assets.
- AVIF + WebP. Responsive sizes generated.
- Profile photos through Cloudflare Images.

## Internationalization
- English first. Hindi + Kannada at GA for Bengaluru.
- Strings stored in `messages/{locale}.json` per app.
- Route-level locale detection via Next.js i18n routing.

## Error boundaries
- Per-route error boundary. Reports to Sentry. Renders calm fallback UI.

## Code style
- ESLint + Prettier from `@vroe/config`.
- TSConfig from `@vroe/config/tsconfig/nextjs.json`.
- File names — lowercase kebab. Component files — PascalCase only for components.

## Anti-patterns we reject
- Bringing in a UI kit that isn't shadcn-compatible.
- Adding state libraries before need.
- Importing private internals of `@vroe/ui` instead of public exports.
- Component sprawl — if a component has > 250 lines, split it.

