# PRODUCT.md

Vero (written VERO in product copy) is a VROE Labs product. Status on 2026-10-09: pre-launch. Only the marketing site and waitlist (`website/site`) are live. The core product below is specified but not built. Long-form history of these facts: the archived v3 docs (see `DECISIONS.md`, "Archive").

## Brief
- **User:** three groups. Workers and professionals aged 18 to 28 who are high-agency (students, freelancers, tradespeople, creatives) and need to prove capability. Businesses (SMBs, cafés, studios, startups, agencies) who need to hire without guessing. Solo clients who need one trustworthy person for one job. These segments come from founder documents and are not validated by interviews (ASSUMPTION).
- **Problem (in their words):** UNKNOWN. No user interviews are recorded. Founder framing: nobody can reliably answer "did this person actually do what they say they did?" Resumes are self-report, gig ratings measure satisfaction and price, portfolios can be faked with AI, and reputation stays locked in the platform that hosted the work.
- **Today they:** use resumes, LinkedIn (self-reported), bidding marketplaces (Fiverr, Upwork), Urban Company (platform-owned profiles), or word of mouth.
- **Outcome we promise:** "LinkedIn shows claims. VERO shows proof." Every job produces a permanent record signed by both the worker and the client. The record belongs to the worker and is exportable. Businesses hire from verified history and pay through escrow.
- **Why now:** AI makes fake credentials cheap; project-based work is growing; India has a large young workforce without hiring-trust infrastructure. All three are unsourced claims (UNVERIFIED).
- **Different because:** no bidding, ever; dual signature (neither side can create or deny a record alone); worker-owned, portable record; 5% escrow fee against the 20% to 25% commissions the founder documents attribute to Fiverr, Upwork and Urban Company (competitor figures UNVERIFIED).
- **Non-goals:** bidding or price negotiation (never); social feed or follow system; any fee or subscription for workers (never); anonymous accounts (never); AI-generated profiles, reviews or endorsements; speculative tokens or crypto-first branding (never). Not in Phase 1: blockchain credentials, enterprise API, public leaderboards, native mobile app, AI job matching.
- **North Star metric:** share of active workers with 3 or more signed records in their first 90 days. Targets (PROJECTION): 15% by month 3, 25% by month 6, 40% by month 12 after launch.
- **Falsifiers (we are wrong if):** workers will not complete verification and dual signing to own a record; businesses do not trust a peer-signed record more than a resume or reference; dual signing is easy to game at scale (collusive pairs, fake jobs); a 5% fee is either too high to win share or too low to fund verification and dispute operations.
- **Go / pivot / kill thresholds:** rework the product (not the marketing) if, 6 months after launch, fewer than 20% of active workers have a verified job, the dispute rate stays above 15%, the repeat hire rate is below 10%, fraud or gaming is common, or workers do not value their records. PMF signal: 40% or more of workers with 2+ jobs answer "very disappointed" (Sean Ellis test).

## Phases (Documents/13 numbering, chosen 2026-09-29)
Phase 0 pre-launch (current: site and waitlist live). Phase 1 Bengaluru pilot, months 1 to 6 after launch: zones Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City; six category groups (Creative, Culinary, Family Support, Business Operations, Fitness Coaching, Event Logistics). Phase 2 categories, native app, ambassadors (months 6 to 12). Phase 3 cities: Delhi NCR, Mumbai, Pune, Hyderabad, Chennai, one at a time (months 12 to 24). Phase 4 recruiter and education layer (18 to 30). Phase 5 blockchain-anchored credentials, optional smart-contract escrow (24 to 36). Phase 6 and 7 international and partner ecosystem (year 3+).
Advancement rule: a phase advances when its scope ships and trust is stable (disputes and fraud low), never on a date. Quality beats expansion. Workers come first. No premature complexity. Brand and trust principles do not change between phases.
**Launch date: UNKNOWN.** The site says "Q3 2026" in `src/lib/site.ts` and "2027" on `/status`. Unreconciled.

## Pages (live, website mode)
### P1 /waitlist and /api/waitlist/join — Done
- P1.1 Given a valid email, role (`worker` or `business`) and ticked consent, when the form posts from the same origin, then a row is created in D1 and the response is 201 with the token, position and tier.
- P1.2 Given an email already on the list, when it is submitted again, then the response is 200 with `created: false` and no token.
- P1.3 Given a cross-origin POST, then the response is 403 `invalid_origin`.
- P1.4 Given more than 5 joins from one IP in 10 minutes, then the response is 429 with `Retry-After: 600`.
- P1.5 Given a filled honeypot field or invalid input, then the response is 422 and nothing is stored.
- P1.6 Position shown = join position minus 5 per referral (minimum 1). Tiers: Founding member (first 1,000), Pioneer (to 5,000), then Early.
- States: success (thanks page, personal page `/waitlist/[token]`, noindex) · error (500 `server_error`) · denied (403, 429).
### P2 /investors and /api/investors/request — Done
- P2.1 Given name, email, firm and NDA agreement, when posted from the same origin, then the inbox gets the request and the requester gets an acknowledgement (201).
- P2.2 Limits: 3 per IP per hour, 2 per email per 24 hours (429 with `Retry-After: 3600`). `/investors` is noindex.
### P3 /status and /api/health — Done
- P3.1 `/api/health` returns 200 `{ok:true}` when the store is reachable, else 503 `{ok:false}`, with no user data. `/status` shows Operational or Degraded from it, never a hard-coded value.
### P4 /pricing — Done
- P4.1 Shows Worker: Free. Business: ₹2,499 per month (5% escrow on paid work). Studio: Custom. This live page is the pricing source of truth (decision 2026-09-29).
### P5 Content and legal pages — Done
- Home, how-it-works, features, for-workers, for-professionals (different content, both kept), for-businesses, trust, security, manifesto, why-now, faq, about, press, contact, and `/legal/*` (privacy with EU, IN and US editions, terms, cookies, refund, grievance, responsible disclosure, sub-processors, accessibility, acceptable use, security). Grievance response SLA on the live page: 15 days.

## Features (core product — Next, not built)
### F1 Identity verification — Next
- F1.1 Workers sign up with phone and email and verify by phone OTP; a government ID (DigiLocker) is optional and raises the trust tier; ID is required for paid work.
- F1.2 Businesses sign up with name, phone and email; a GST number gives a verified business tier.
- F1.3 Anonymous accounts cannot create records.
### F2 Job posting and application — Next
- F2.1 A business creates a job with category, scope, budget, city zone, timeline and pay type (fixed or day rate).
- F2.2 A worker applies on a single screen, with scope and pay visible, and no bidding or negotiation.
- F2.3 The business sees applicants' signed history and trust standing and chooses directly (no blind matching in Phase 1).
### F3 Escrow — Next
- F3.1 The business funds escrow (Razorpay in the specification) before work starts; escrow status is always visible (funded, held, released, disputed).
- F3.2 On dual signature the worker receives the agreed amount minus 2.5%; Vero keeps 2.5% from each side (5% total).
### F4 Dual-signature record — Next
- F4.1 A record exists only after both worker and client sign. Before signing, the screen explains what signing does (releases payment, finalizes the record).
- F4.2 Records are permanent and linked to earlier records; later disputes or reversals are added, never edited in place.
- F4.3 Each record is public, shared or private; private records still count toward standing. Records export as signed JSON-LD.
### F5 Trust standing — Next
- F5.1 Standing shows its signals, not one opaque score: completion rate, punctuality, repeat-client rate, cancellation rate, dispute rate and outcomes, endorsements weighted by the endorser's record, verified specialisations, consistency over time.
### F6 Disputes — Next
- F6.1 Three tiers: direct (both upload evidence), mediated (a Vero mediator proposes), formal review (binding, logged permanently, affects the bad-faith party's standing). Every step is logged.
### F7 Messaging, notifications, admin — Next
- F7.1 One real-time thread per job. Email only for: application received, hired, escrow funded, completion requested, dispute raised or resolved. No re-engagement spam, no fake urgency.
- F7.2 Internal admin panel for the verification queue, disputes and moderation.
- States for every flow: loading · empty · error · success · denied.

## Design tokens (implemented in `website/site/src/app/globals.css` and `tailwind.config.ts`)
- Type: Geist Sans (almost everything), Geist Mono (hashes, IDs, signatures, timestamps only), Spectral italic (pull-quotes, 1 to 2 per page, never headings). Scale (rem): micro 0.75, caption 0.8125, body 1, lead 1.125, h6 1.25, h5 1.5625, h4 1.953, h3 2.441, h2 3.052, h1 3.815, display 4.768, mega 6.5. Body line 62 to 72 characters. No italic headlines, no tracked-uppercase eyebrows, no drop caps.
- Color (OKLCH, dark default; light mode inverts lightness under the same names): surface-0 `0.142 0.006 240`, surface-1 `0.176 0.007 240`, surface-2 `0.212 0.007 240`, surface-3 `0.252 0.008 240`; ink-0 `0.965 0.004 95`, ink-1 `0.78 0.005 240`, ink-2 `0.56 0.005 240`, ink-3 `0.38 0.006 240`; accent `0.81 0.07 92` (champagne, at most about 10% of a screen); accent-glow `0.87 0.10 92`; signal `0.74 0.085 200` (cyan, verification marks only); caution `0.76 0.12 60`. Never pure black or white.
- Space: 8-point grid; section rhythm 24 / 48 / 96 / 144 / 192 px. Breakpoints: Tailwind defaults (640, 768, 1024, 1280, 1536).
- Radius: xs 3, sm 6, default 10, md 12, lg 16, xl 22, 2xl 28, pill 999 (px). Shadows: hairline, card, lift, glow. Motion: `out` cubic-bezier(0.16, 1, 0.3, 1), `micro` cubic-bezier(0.22, 1, 0.36, 1); 180 / 320 / 600 ms. Animate transform and opacity only; honor reduced motion fully; never hide LCP content behind an entrance animation.
- Banned: gradient text, purple, neon or holographic color, glassy 3D, "trusted by" logo strips, big-number metric strips, three-up icon card grids, chatbot popups, decorative Lottie.
- Known gap: classes such as `text-ink-900`, `bg-paper`, `bg-trust`, `bg-ink-950` have no token and render with inherited color. Contrast is not measured; no screen-reader pass recorded.
- Tone: calm, precise, human. Do: short declarative sentences, real numbers only, CTAs like "Join early access", "Post your first job". Don't: just, simply, easily, effortlessly, revolutionize, disrupt, "AI-powered", "solutions", game-changer, 10x, next-generation; em dashes in running copy; "Learn more", "Click here", "Submit", "Get started"; earnings claims; "global" or "worldwide". Names: VROE Labs (company), VERO (product), ALVED (Authentic Ledger of Validated Evolution Data, the shared open trust protocol).
