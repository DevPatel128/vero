# Product Experience

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-23
> Sources: Documents/4, 9; 10_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §§7, 16; 04_DESIGN/ (design system, canonical for visual rules — not duplicated here)

## Experience promise

Calm, premium, trustworthy, and legible. A worker or business should always know what step they are on, why it matters, and what happens next. Nothing about the product should feel like it is trying to keep someone scrolling, or hide what it does with their money or data.

## Mental model

VERO is a five-step chain, repeated for every job: **verify once → agree scope (and fund escrow, if paid) → do the work → both sides sign → the record is permanent and yours.** A new user should be able to explain this back after reading the homepage. See `Documents/4. How VERO Works — The User Experience.md` for the full walkthrough of both the worker and business side of each step.

## Experience hierarchy

1. **What do I need to know?** Whether I am a worker or a business, and what the current job's status is (applied, in progress, awaiting signature, disputed, complete).
2. **What should I do?** One primary action per screen: apply, fund escrow, submit deliverable, sign, respond to a dispute.
3. **Why does it matter?** Every consequential step (funding escrow, signing) explains in plain language what it commits the user to.
4. **Details.** Full job history, endorsement detail, dispute evidence — available but not forced on the primary path.
5. **Advanced controls.** Record export, account deletion, notification preferences.

## Core journey

Discovery (marketing site, waitlist) → First value (first completed, signed job) → Habit (repeat jobs, growing record) → Deeper value (endorsements, trust tier growth, repeat clients) → Long-term outcome (a portable record used outside VERO in hiring decisions).

The waitlist itself is the only step of this journey currently live in production (`website/site`); everything from "first value" onward describes the product as specified in `Documents/4` and `Documents/6`, not yet built.

## Information architecture

- **Public marketing** (`website/site`): what VERO is, why it matters, how it works, trust and security posture, pricing, waitlist.
- **Worker experience** (specified, not yet built): identity verification, career-path/profile setup, job discovery, active-job workspace, signed public work-record page.
- **Business experience** (specified, not yet built): business verification, job posting, applicant review against verified history, hire dashboard.
- **Shared**: in-job messaging, dispute flow, notifications.

Each concept has one home; `02_PRODUCT/PRODUCT.md` is where product scope is decided, this file is how it should feel, `04_DESIGN/` is the visual system, `05_ENGINEERING/` is how it is built.

## Progressive disclosure

- **Appears immediately:** current job status, the one action needed next, trust-standing summary.
- **Appears only when useful:** dispute evidence and mediation detail, full endorsement history, referral mechanics.
- **Always available through navigation:** full signed job history, account and privacy settings, help and dispute-policy pages.

## Interaction principles

From `01_PRINCIPLES/PRINCIPLES.md` and `Documents/4`:

- One clear primary action per screen (apply, sign, fund).
- No bidding UI, ever — applying to a job is a single screen, no price negotiation at apply time.
- Escrow status is always visible once a job is funded.
- A dual-signature step explains, before the user commits, what confirming will do (release payment, finalize the record).
- Disputes are recoverable: every step logged, both sides can present evidence, nothing is decided unilaterally by the platform without a defined process.

## AI experience

Per `Documents/10`'s stated intent for the (unbuilt) matching and verification layer:

- **What AI can do:** check that a delivered artifact plausibly matches the agreed scope; detect duplicate accounts or coordinated gaming patterns; summarize a long job history.
- **What AI cannot do:** write a worker's profile, generate a review or endorsement, or decide who gets hired.
- **What requires research:** any claim about AI detection accuracy should be evidence-backed before it is stated publicly (`01_PRINCIPLES/PRINCIPLES.md` rule 6, "never fabricate").
- **How uncertainty is shown:** not yet specified — a gap. Should be defined before any AI-assisted verification ships.
- **How users correct AI:** not yet specified — a gap.
- **How user data grounds answers:** not yet specified — a gap.

This section is intentionally incomplete. `Documents/10` describes AI's intended role at a product level; no interaction design exists yet for it.

## Notifications

Per `Documents/9` ("What VERO Will Not Do"): no spammy re-engagement notifications, no fake urgency. Notifications should be limited to events that require the user's attention or action: application received, hired, escrow funded, completion-signature requested, dispute raised, dispute resolved.

## Accessibility

Full standard: `04_DESIGN/ACCESSIBILITY.md`. Product-experience-level requirement: every step in the five-step job flow must be completable via keyboard and screen reader; the dual-signature action in particular must have an unambiguous accessible name (not just a color or icon) since it is financially and legally consequential.

## Trust

- Escrow state is shown, not implied: funded, held, released, disputed.
- Every action that moves money or creates a permanent record is a deliberate step, never a side effect of another action.
- The trust-standing display shows the contributing signals (completion rate, punctuality, repeat clients, disputes), not a single opaque score, per `Documents/5` and the ALVED anti-black-box principle in the old `CLAUDE.md` §11.
- Dispute status and history are visible to both involved parties; outcomes affecting trust standing are shown in summary form without exposing the other party's private evidence, per `Documents/15`.

## Change decision

For meaningful experience changes, use the framework in `01_PRINCIPLES/PRINCIPLES.md`: why, impact, how, cost, and whether the cost is justified against the simplest experience that delivers the required outcome.

## Quality gate

A feature is not experience-complete until it is understandable without documentation — consistent with the archived root `CLAUDE.md` §16's onboarding philosophy of minimal, well-explained friction.
