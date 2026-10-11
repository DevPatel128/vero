# LEGAL.md

Not legal advice. AI drafts this file; a human approves it before launch. `scripts/legal-check.sh` reads the two tables marked "checked".
Filled from the code in `website/site/` and its production build on 2026-10-11. Anything not verifiable from code is `UNKNOWN`.

## Business
- **Legal name:** UNKNOWN · **Address:** UNKNOWN (the contact and grievance pages say a Bengaluru address will be published before launch) · **Contact:** hello@vero.work (from `src/lib/site.ts`)
- **Grievance / privacy contact:** name UNKNOWN ("to be designated before public launch" on `/legal/grievance`), email grievance@vero.work
- **Jurisdictions served:** UNKNOWN (privacy notices exist for India, EU and US) · **Governing law:** UNKNOWN
- **Age rule:** terms say "working age in your jurisdiction"; not enforced at signup (no age field)
- **Paid:** no (pre-launch, no payments in code) · **Refund window:** n/a until paid · **Cancel path:** n/a (no accounts)

## Legal pages (checked: each Path must exist in the build, unless Status is n/a)
| Page | Path | Status |
|---|---|---|
| Privacy policy | /legal/privacy | live |
| Privacy notice, India | /legal/privacy/in | live |
| Privacy notice, EU | /legal/privacy/eu | live |
| Privacy notice, US | /legal/privacy/us | live |
| Terms of service | /legal/terms | live |
| Acceptable use | /legal/acceptable-use | live |
| Cookies | /legal/cookies | live |
| Refund and cancellation | /legal/refund | live (describes launch commitments; nothing is sold yet) |
| Grievance officer | /legal/grievance | live (name and address not yet published) |
| Sub-processors | /legal/sub-processors | live |
| Accessibility | /legal/accessibility | live |
| Security | /legal/security | live |
| Responsible disclosure | /legal/responsible-disclosure | live |
| Contact (legal name, address, email) | /contact | live (emails only; legal name and address missing) |

## Third parties (checked: every external host the build loads must be listed)
The built pages load no third-party host: fonts (Geist, Geist Mono, Spectral) come from `next/font/google`, which downloads them at build time and serves them from the site's own origin. Social links in the footer are plain links, not embeds.
| Host | What | Data it gets | Licence / terms | Needs consent |
|---|---|---|---|---|
| api.resend.com | Resend email API, called server-side from `src/lib/email.ts` only when `RESEND_API_KEY` is set | recipient email, subject, body (waitlist confirmation with personal token URL; investor request details) | Resend terms | no (needed to deliver the requested email) |
| Cloudflare (Workers, D1) | Hosting and database for the Worker `vero` | every request (IP, user agent); all stored data below | Cloudflare terms | no (hosting) |
Whether Cloudflare injects Web Analytics or other scripts at the edge is UNKNOWN (dashboard setting, not in code).

## Data map
| Data | Why (feature) | Lawful basis / consent | Retention | Where stored | Shared with |
|---|---|---|---|---|---|
| Email, role (required); name, city, use case, source, referred-by code (optional) | Waitlist join (`POST /api/waitlist/join`, D1 table `entries`) | Consent checkbox, required by `joinSchema` | Privacy page says until unsubscribe or launch + 1 year; no deletion job exists in code | Cloudflare D1 `vero-waitlist` | Resend (confirmation email), when configured |
| Position, referral code, referral count, joined_at, token | Waitlist page `/waitlist/[token]` and referrals | Same as above | Same as above | D1 `entries` | Token is sent in the confirmation email via Resend |
| Name, email, firm, role, stage, thesis | Investor materials request (`POST /api/investors/request`) | NDA checkbox, required | Not stored by the app; sent as email only. Privacy page says 2 years from last contact (applies to the inbox) | Investor inbox (mail provider UNKNOWN) | Resend, when configured |
| IP address, and investor email address | Rate limiting (`rate_limits` keys `join:<ip>`, `investor-ip:<ip>`, `investor-email:<email>`) | Legitimate interest (abuse prevention) | Expired windows deleted about 2 days later (best-effort cleanup in `src/lib/ratelimit.ts`) | D1 `rate_limits` | none |
| Request logs (IP, user agent, time) | Worker observability (`observability.enabled` in `wrangler.jsonc`) | Legitimate interest | Privacy page says up to 30 days; actual Cloudflare log retention UNKNOWN | Cloudflare | none |
| Theme preference (`vero-theme`) | Light/dark toggle | Strictly necessary preference, browser `localStorage` only | Until cleared by the user | Visitor's browser | none |

Delete and export: no self-serve path exists yet; requests go to the privacy or grievance email and are handled manually in D1. Answer requests within 30 days (GDPR allows 1 month; CCPA 45 days).

## Assets
| Asset (font, image, icon, video) | Source | Licence | Proof (link or receipt) |
|---|---|---|---|
| Geist, Geist Mono | Google Fonts via `next/font/google` | SIL Open Font License 1.1 | https://github.com/vercel/geist-font |
| Spectral | Google Fonts via `next/font/google` | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Spectral |
| Illustrations and logo | Hand-written SVG/React in `src/components/` | Own work (assumed; author not recorded) | this repo |
| `public/favicon.svg` | this repo | Own work (assumed) | this repo |

## Launch checklist (each line: done, n/a with reason, or open)
- [ ] Privacy policy, terms, refund and cookie sections match the data map above. **Open:** the privacy page claims session and CSRF cookies, but the site sets none and uses `localStorage` for the theme; it gives investor-request retention but the app stores none; it promises unsubscribe but no unsubscribe mechanism exists.
- [x] No non-essential cookie or tracker before opt-in. No analytics or tracker in the code; edge-injected scripts UNKNOWN.
- [ ] Forms: consent boxes unticked; link to privacy; marketing opt-in separate from terms. Open: not verified in the rendered forms for this rollout.
- [ ] Data minimization: every field in the data map has a feature that uses it. Open: `city`, `use_case` and `source` have no consumer in code beyond storage.
- [x] Every SDK and script audited: no third-party browser script in the build (legal-check).
- [ ] No dark patterns. Open: not reviewed for this rollout.
- [x] No hidden fees: n/a, nothing is sold.
- [ ] No fake or invented reviews or testimonials; every claim has evidence. Open: not reviewed for this rollout.
- [ ] Accessibility: `alt` on every image passes legal-check; contrast, keyboard and axe in e2e not checked.
- [ ] Business details (legal name, address, contact) on the contact page and in the footer. Open: legal name and address are UNKNOWN.
- [ ] Age rule enforced at signup. Open: no age check.
- [ ] Marketing email: unsubscribe link, one-click `List-Unsubscribe` header, postal address. Open: `email.ts` sends plain text with no unsubscribe header.
- [x] Every font and image has a licence row above.
- [ ] Data deletion and export work end to end and are tested. Open: manual only.

## Regional notes (checked 2026-10-11 from secondary sources; recheck before launch)
- **EU/UK GDPR + ePrivacy:** privacy notice, lawful basis, rights requests within 1 month, consent before non-essential cookies.
- **India DPDP Act 2023 + Rules 2025:** notified Nov 2025. Notice, consent, rights, breach notice and verifiable parental consent for under-18s apply from about 13 May 2027.
- **US COPPA (amended):** under-13 data needs verifiable parental consent; full compliance due 22 Apr 2026. CAN-SPAM: honour unsubscribe within 10 business days. FTC rule bans fake reviews and testimonials. CCPA applies above its thresholds.
- **EU Accessibility Act:** applies since 28 Jun 2025 to e-commerce and consumer services. Microenterprise service providers (<10 staff and ≤€2M turnover or balance sheet) are exempt; still meet WCAG to avoid ADA-style claims elsewhere.
- **India dark patterns:** consumer-protection guidelines (2023) ban 13 patterns, including drip pricing, false urgency and subscription traps.
- **Email providers:** Gmail and Yahoo require one-click unsubscribe from bulk senders (5,000+ a day).
