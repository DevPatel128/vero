# 00 — Vero Project Overview

## Purpose
Vero is a verified proof-of-work identity platform under VROE Labs. It helps young people, beginners, students, career switchers, skilled workers, households, startups, cafés, creators, and local businesses build real-world credibility through verified work. It is not a job board. It is not a freelancing marketplace. It is trust infrastructure for apprenticeships, gigs, proof-of-work identity, and career growth.

## Core idea
People do not need another app that only lists opportunities. They need a system that helps them become more employable, more trustworthy, more experienced, and more visible through real execution. Vero solves this by combining three layers — work opportunities, verification, and reputation growth. Each completed job or apprenticeship strengthens the user's identity, not just their income.

## Brand architecture
- Parent: **VROE Labs**
- Product: **Vero**
- Protocol: **ALVED** (Authentic Ledger of Validated Evolution Data)

ALVED is the conceptual ledger behind all proof-of-work records. It can be implemented with a normal database first and extended with a tamper-evident chain later. The important thing is that the user has a traceable, credible work identity that accumulates over time.

## Product mission
Help youth gain experience before full-time careers. Make real work more accessible. Build trust through proof. Give users a way to show progress, not just claims. Build a marketplace where repeat work, reliability, and competence compound into opportunity.

## Market positioning
Vero is:
- proof-of-work identity infrastructure
- apprenticeship ecosystem
- verified opportunity platform
- reputation graph
- trust-first local marketplace

Vero is **not** entertainment social media, and is **not** a noisy gig app. The product is calm, premium, and useful.

## Launch strategy
First city: **Bengaluru**. First launch neighborhoods: **Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City**. The product is dense, local, and trust-driven at the start. The website and app must make users feel that this is a real, focused launch, not an abstract global fantasy.

## User outcome
The user should leave the website or app with one thought: _"This is a serious system that can help me build my future."_

## Build principles
- trust before scale
- proof before promotion
- clarity before complexity
- mobile-first before desktop polish
- simple architecture before clever architecture
- user growth through real work, not vanity
- stable foundations before feature sprawl

## What Vero must become
A system where:
- work history is credible
- skill growth is visible
- references are verified
- trust is measurable
- reputation is portable
- youth can start small and grow upward
- clients can hire with confidence
- apprenticeships and gigs both work
- social contribution and earning coexist

## Non-negotiables
- no fake engagement
- no noisy social feed
- no low-trust reputation system
- no unclear verification process
- no broken onboarding
- no black-box trust score
- no confusing payment flow
- no overcomplicated UX

## ICP — who Vero is for
- **Workers** — youth (17–25), students, career switchers, skilled informal workers (cooks, drivers, electricians, designers, dog walkers, caretakers), people without LinkedIn-ready resumes.
- **Businesses** — households, cafés, restaurants, retail, tutoring centers, salons, repair shops, startups under 50 people, SMBs that hire 2–20 people.
- **Indirect** — schools, colleges, vocational programs that need verified externship records for students.

## Repo-level reality check
- **Stack today:** Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript strict + Zod 4. Dev API routes are mocks that issue demo sessions for local development.
- **Stack post-launch:** Supabase Auth (MSG91 phone OTP webhook + email OTP via Resend), Postgres 16 with RLS, Razorpay (Smart Collect for escrow), DigiLocker e-KYC, Cloudflare R2 for media.
- **Crypto:** `@vroe/crypto` reuses the proven crypto from RIE — Argon2id passwords, RS256 JWT, ECDSA P-256 attestation signatures, AES-256-GCM per-tenant DEK wrapped by KMS-managed KEK.

## Long-term vision
Vero should become the place where practical career identity is built through real-world contribution. The platform should remain human, local, trustworthy, scalable. Every feature should strengthen the core narrative: real work builds real credibility.

