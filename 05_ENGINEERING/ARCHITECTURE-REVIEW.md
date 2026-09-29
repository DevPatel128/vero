# Architecture Review

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-28
> Source: Wolf v3 framework, `05_ENGINEERING/ARCHITECTURE-REVIEW.md` (imported unchanged apart from this header and "Applied in this repo")

Ask:
- What requirement requires this?
- Can the current architecture satisfy it?
- Is the component necessary?
- What security boundary/failure modes are added?
- What latency/cost are added?
- How is it observed and removed?
- Is a modular monolith sufficient?
- Does Kubernetes solve a demonstrated problem?

Fitness: correctness, security, reliability, performance, cost, operability, maintainability and recovery.

## Applied in this repo

`website/site` is a single Next.js app on Cloudflare Workers (OpenNext) with Cloudflare D1 as its only data store — a modular monolith, and sufficient for a pre-launch waitlist site (`08_DECISIONS/ENGINEERING/2026-09-move-to-cloudflare.md`: Cloudflare only for hosting and data; Supabase reserved for the product app). No orchestration platform is in use or proposed; nothing in the current scope demonstrates a need for one. The one component this PR removed because it failed this test: Sentry and PostHog, present as dependencies but never mounted into `layout.tsx` — cost (bundle weight, a dependency to maintain) with no observed benefit (`08_DECISIONS/ENGINEERING/2026-09-remove-sentry-posthog.md`).
