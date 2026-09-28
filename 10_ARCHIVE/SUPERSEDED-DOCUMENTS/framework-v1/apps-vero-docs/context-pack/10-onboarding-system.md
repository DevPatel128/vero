# 10 — Onboarding System

## Principle
Onboarding asks for the **minimum** required to do the next thing. Never more. Each screen explains _why_ we need the field.

## Worker onboarding
1. **Phone** — E.164 with India dial code locked. _Why:_ we send your OTP and job updates here.
2. **OTP verify** — 6-digit, auto-advance.
3. **Name + neighborhood** — first name, last initial, neighborhood selector (Whitefield / HSR / Koramangala / Sarjapur / Electronic City + free text fallback).
4. **Category interest** — pick up to 3.
5. **KYC** — DigiLocker e-KYC, optional at signup, required before first paid job. Modal explains the why.
6. **Photo** — optional. Encouraged for higher response rate. We tell them so.

After: land on `/home` with one suggested job and one apprenticeship.

## Business onboarding
1. **Email** — we send your OTP here.
2. **OTP verify.**
3. **Business name + role** — owner / hiring manager / staff.
4. **Business type** — café / household / SMB / startup / other.
5. **GST / PAN** — required for paid posting, optional for browsing. We explain why.
6. **First job** — guided posting in 5 fields with smart category suggestions.

After: land on `/business/home` with a single CTA — _"Approve workers for your job."_

## Re-onboarding (returning lapsed users)
- Show what's new since they left in a single screen.
- Restore their last incomplete action.
- Never repeat steps already completed.

## Empty-state copy in onboarding
- _"No jobs in Whitefield yet. Vero launches there Q3 2026. Join the waitlist to be notified the moment your neighborhood opens."_

## KYC sub-flow
1. Worker initiates → modal explains DigiLocker + how to revoke.
2. Worker is redirected to DigiLocker → returns with a signed attestation.
3. Vero verifies the attestation signature.
4. KYC attestation record is added to the worker's profile.
5. Worker returns to the next step.

## Failure paths
- **Phone delivery failed** → retry OTP via email.
- **DigiLocker down** → KYC step deferred, user can complete other onboarding first.
- **Wrong OTP 3×** → cooldown, fallback to email OTP.
- **Network drop mid-onboarding** → state persisted; resume on next load.

## What we never ask for at onboarding
- Aadhaar number (DigiLocker handles this).
- Bank account (we collect this at first payout, not at signup).
- Education history (we capture it later if relevant).
- Photo with face front + side (we are not a KYC theater).

## Time-to-first-value
Worker — see 3 relevant jobs in their neighborhood within 60 seconds of landing.
Business — see suggested workers within 90 seconds of posting a job.

## Onboarding events emitted
- `onboarding.started`, `onboarding.phone_verified`, `onboarding.kyc_started`, `onboarding.kyc_completed`, `onboarding.activated`.

## Empty-onboarding fallbacks
- If we can't verify the phone, allow email-OTP as a pre-launch fallback (Bengaluru → outside Bengaluru only).
- If a user lands without geolocation, default to Whitefield with a banner to change.

## Accessibility
- Each step is keyboard-navigable.
- Forms have visible labels and inline errors.
- Progress shown ("Step 2 of 5").
- Skip-to-content on every screen.

## Anti-patterns
- Multi-step modal sequences that can't be backed out.
- Forced notification permission prompts (we ask later, in context).
- Pop-ups that block the next step.
- Sales-y copy in onboarding flows.

