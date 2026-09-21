# VROE Labs — Architecture

## Overview

VROE Labs is a verification-infrastructure company. We ship three products on one open protocol.

```
                        ┌─────────────────────────┐
                        │  ALVED protocol (spec)  │
                        │  packages/types/alved.ts │
                        └────────────┬────────────┘
                                     │
        ┌────────────────────────────┼────────────────────────────┐
        │                            │                            │
┌───────▼──────┐            ┌────────▼─────────┐         ┌────────▼─────────┐
│   apps/vero  │            │   apps/rie       │         │  apps/trove      │
│  Work proofs │            │  Discipline      │         │  Value ledger    │
│  vero.app    │            │  rie.app         │         │  trove.vroe.app  │
└──────────────┘            └──────────────────┘         └──────────────────┘
        │                            │                            │
        └────────────┬───────────────┴────────────┬───────────────┘
                     │                            │
              ┌──────▼──────┐              ┌──────▼──────┐
              │ packages/ui │              │packages/types│
              └─────────────┘              └─────────────┘

                    ┌─────────────────────────────┐
                    │   apps/marketing (vroe.app) │
                    │   Pre-launch + brand surface│
                    └─────────────────────────────┘
```

## Workspace layout

- **`apps/marketing`** — pure marketing site. Server components, ISR, edge waitlist endpoint. No DB.
- **`apps/vero`** — full product. Phone-OTP auth, escrow flow, proof minting, public profiles, ALVED export API.
- **`apps/rie`** — full product. Email-OTP auth, device pairing, session ingest, leaderboards, ALVED export API.
- **`apps/trove`** — full product. Email-OTP + vault-passphrase (zero-knowledge), item capture, heir designation.
- **`packages/ui`** — design system. Calm-premium Linear × Stripe × Patagonia vibe.
- **`packages/types`** — `ALVED` record + attestation + trust shapes; product registry.
- **`packages/config`** — base tsconfig (`base.json`, `nextjs.json`, `library.json`), eslint presets, Tailwind v4 tokens.

## ALVED protocol

Every product emits records of the same shape (`packages/types/src/alved.ts`):

```ts
interface AlvedRecord {
  id: string;             // ULID
  subject: string;        // user handle
  surface: "work" | "discipline" | "value";
  category: string;       // e.g. home-chef / weight-training / household-asset
  occurredAt: string;     // ISO 8601 UTC
  geo?: { city; neighborhood?; country };
  metric?: { value; unit };
  verifier?: { handle; role };
  attestations: AlvedAttestation[];  // ECDSA P-256
  visibility: "public" | "shared" | "private";
  bodyHash: string;       // sha256
  prevHash: string;       // chains to previous record per subject
}
```

- **Chained:** each subject has an append-only chain. Body-hash + prev-hash → tamper-evident.
- **LLM-citable:** JSON-LD with stable `@context` URI. Public profiles expose `/u/{handle}.jsonld`.
- **Selectively disclosed:** Trove items default to `private`; sharing reveals one record without exposing chain.

## Frontend architecture

- **Next.js 16 App Router** — server components by default. Client islands for interactive pieces.
- **Streaming** — long pages use React 19 streaming for fast TTFB.
- **CSP + security headers** — set per-app in `next.config.ts`. Production-grade defaults: HSTS, X-Frame-Options DENY, strict referrer, scoped CSP.
- **Tailwind v4** — tokens via `@theme` in `packages/config/tailwind/tokens.css`. Imported once per app's `globals.css`. OKLCH palette.
- **Responsive from watch (200px) to desktop (1536px+)** — breakpoint scale defined in tokens.
- **Accessibility** — WCAG 2.2 AA target. `prefers-reduced-motion` + `prefers-contrast: more` honored. Skip-to-content link + visible focus rings everywhere.

## Backend (planned)

Backend services are NOT in this repo yet — current API routes are edge handlers with mock auth.
Production plan:

- **Supabase** — Postgres 16, RLS, Auth (phone OTP via MSG91 webhook, email OTP via Resend).
- **ALVED minting service** — Node service that takes a counterparty-signed record, validates signatures via `@vroe/crypto` (extracted from RIE codebase), chains it onto Postgres append-only table, returns canonical JSON-LD.
- **Razorpay PA pattern** — escrow via Razorpay Smart Collect. Vero never holds funds.
- **R2 / S3** — proof media. Per-tenant DEK wrapped by KMS-managed KEKs.
- **Upstash Redis** — rate-limit, OTP store, OAuth state.

## Deployment topology

| App       | Domain               | Vercel project   | Region |
| --------- | -------------------- | ---------------- | ------ |
| marketing | vroe.app             | vroe-marketing   | bom1   |
| vero      | vero.app             | vroe-vero        | bom1   |
| rie       | rie.app              | vroe-rie         | bom1   |
| trove     | trove.vroe.app       | vroe-trove       | bom1   |

Each app has its own `vercel.json`. Root `vercel.json` defaults to the marketing app for the auto-detected GitHub integration. Other apps are linked separately in the Vercel UI with `Root Directory` set to the app folder.

## CI/CD

- **`ci.yml`** — lint, typecheck, build, audit on every PR.
- **`preview.yml`** — Vercel preview on every PR (gated on `VERCEL_TOKEN` secret).
- **`production.yml`** — Vercel production deploy on push to `main`.

## Observability

- **Sentry** — client + server + edge configs in `apps/marketing/`. Other apps inherit the same pattern. Gated on `SENTRY_DSN` env.
- **PostHog** — funnel + product analytics + session replay (masked inputs). Gated on `NEXT_PUBLIC_POSTHOG_KEY`.
- **Vercel Analytics** — RUM web-vitals.

## Cross-product identity flow

```
Vero account ──┐
               │  ALVED bridge (read-scoped OAuth)
RIE account ───┼─────────────────────────────────────►  Single public profile
               │                                        with composed records
Trove vault ───┘
```

A user can keep accounts entirely separate. If they choose to link, ALVED records compose into one canonical public view, available at `vero.app/u/{handle}` with cross-product JSON-LD.

