# 03 — UI / UX Rules

## North star
A first-time user should understand what Vero does within 6 seconds of the home page loading. A logged-in worker should be able to find their next job in 2 taps. A logged-in client should be able to post a job in 5 fields.

## Layout
- **Mobile-first.** 360px width is the design baseline. Tablet and desktop are progressive enhancements.
- **One primary action per screen.** Secondary actions are visually de-emphasized.
- **Above the fold:** the one thing the user came for. Never push it under a banner, never under a promo.
- **Max content width:** 1120px on desktop. Wider only for full-bleed canvases.

## Navigation
- Worker app: bottom tab bar (Home, Discover, Proofs, Wallet, Me).
- Business app: top nav (Jobs, Workers, Messages, Settings).
- No hamburger menu on mobile primary navigation.
- Breadcrumbs on every nested page.

## Forms
- One field per screen for sensitive flows (onboarding, KYC).
- Inline validation. Errors near the field, in calm copy. _"Pin is 6 digits"_ not _"Invalid input"_.
- Phone number field uses MSG91-compatible E.164. India dial code defaults locked.
- Auto-advance after OTP digits filled.
- Never show password fields. We use OTP everywhere.

## Empty states
Every empty state explains _why it is empty_ and _what to do next_. Examples:
- _"No verified jobs in your area yet. Vero launches in Whitefield first — check back Q3 2026."_
- _"You have no proofs yet. Finish your first job to mint one."_

## Loading states
- Skeletons, not spinners, for content.
- Spinners only when the user just performed an action.
- Pages render with the structure first, then progressively fill.

## Error states
- Network errors get a calm retry, not a stack trace.
- 404 page is hand-written with route suggestions.
- 500 page links to status.

## Accessibility (WCAG 2.2 AA target)
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI elements.
- Focus rings visible on every interactive element.
- Skip-to-content link on every page.
- `prefers-reduced-motion` and `prefers-contrast: more` honored.
- All form inputs have associated labels.
- Touch targets ≥ 44×44px.
- Dynamic content announced via aria-live where appropriate.
- Watch view (200–320px) supported via narrowest breakpoint.

## Trust signals on every page
- Verified worker / business mark must be unambiguous.
- ALVED record visualization is consistent across product (same color, same icon, same chip shape).
- Date + counterparty must be visible on every record.

## Microcopy
- Buttons are verbs. _"Apply"_, _"Sign job"_, _"Mint record"_, _"Settle escrow"_.
- Headings name the screen. _"Your proofs"_ not _"Welcome to Vero!"_.
- Confirmation modals quote the destructive action back to the user.

## Data display
- Money is shown to two decimals in INR by default. International users see their local currency where applicable, with the INR equivalent in parentheses.
- Dates use the user's locale. Timestamps for records are shown in ISO 8601 next to the friendly date.
- Trust score is shown only in user contexts where it makes sense — never as a vanity badge on the public profile.

## State machine
Every key screen has a finite, named set of states:
- **Initial** — first load, user has no data.
- **Loading** — fetching.
- **Empty** — fetched, nothing to show.
- **Filled** — normal.
- **Partial** — some content fetched, more loading.
- **Error** — connection or server.
- **Forbidden** — auth or RLS denied.

Engineering keeps these in `app/<route>/states.tsx`.

## Cross-product UX consistency
Vero, RIE, Trove use the same design tokens, same component primitives, same iconography. A user moving from Vero to Trove should feel the same calm.

