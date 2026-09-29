# VROE Labs — Global Compliance Matrix

> One document. Every major jurisdiction VROE Labs plans to operate in. Mapped to controls in code + policy.

This file is **operational**, not advisory. It tells engineers, designers, and writers what they must (and must not) ship in each region. For legal advice, consult counsel in the relevant jurisdiction.

**Last updated:** 2026-05-19. Review cadence: quarterly + on regulator change.

---

## How to use this file

1. Identify the user's region (auth, IP-based default, user-selected).
2. Look up the region in the matrix below.
3. Enforce the listed controls in the relevant surface (Vero, RIE, Trove, marketing).
4. Update the controls when this file changes.

If a feature touches PII, payments, identity, employment, health, children, or inheritance — **read the relevant section before merging**.

---

## Region matrix (per-law summary)

### 🇮🇳 India — Digital Personal Data Protection Act, 2023 (DPDP)
**Primary law for Vero.**

- **Lawful basis:** consent or specified legitimate uses.
- **Notice to data principals:** plain-language privacy notice + purpose specification at collection.
- **Consent:** must be free, specific, informed, unconditional, unambiguous. Withdrawable.
- **Data principal rights:** access, correction, erasure, grievance redressal, nominate.
- **Children (< 18):** verifiable parental consent. No tracking, no targeted advertising, no behavioral monitoring.
- **Significant data fiduciaries:** appoint a Data Protection Officer, conduct DPIAs, independent audits.
- **Cross-border transfers:** allowed unless restricted by gazette notification.
- **Breach notification:** to Data Protection Board + affected principals, within prescribed timeline.
- **Penalties:** up to ₹250 crore.

### 🇮🇳 India — IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
- **Grievance officer:** mandatory; name + contact + address published.
- **Response SLA:** 24h acknowledgement + 15-day resolution.
- **Significant social media intermediary (post-thresholds):** additional traceability requirements, chief compliance officer, monthly transparency report.
- **Voluntary verification badge:** must be supported if requested.

### 🇮🇳 India — RBI / NPCI for payments
- **PA (payment aggregator) license** required to hold customer funds. We use Razorpay (licensed PA) — Vero never holds funds.
- **Smart Collect / VPA escrow flow:** documented + auditable.
- **Two-factor authentication:** required for card-not-present transactions.

### 🇮🇳 India — Consumer Protection Act, 2019 + Misleading Ads Rules
- **No misleading earnings claims**, no "guaranteed income".
- **Pre-purchase clarity:** pricing, fees, refund policy visible before commit.
- **Endorsements:** material connections disclosed.

### 🇪🇺 EU + EEA + UK — General Data Protection Regulation (GDPR)
- **Lawful basis:** Article 6(1) — consent, contract, legal obligation, vital interests, public task, legitimate interests.
- **Special category data** (health, biometric, genetic, etc.) — Article 9 stricter basis.
- **Data subject rights:** access, rectification, erasure, restriction, portability, object, automated decision-making.
- **Children (< 16; member-state can lower to 13):** verifiable parental consent for processing.
- **DPO appointment** when processing scale triggers Article 37.
- **Records of processing:** Article 30.
- **DPIAs** for high-risk processing.
- **Cross-border transfers:** SCCs, adequacy decisions, BCRs.
- **Breach notification:** 72 hours to supervisory authority, individual notification if high risk.
- **Cookie banner:** prior, granular, freely-withdrawn consent (ePrivacy + EDPB guidance).
- **Penalties:** up to 4% of global annual turnover or €20M, whichever higher.

### 🇪🇺 EU — Digital Services Act (DSA)
- **Notice-and-action mechanisms** for illegal content.
- **Transparency reports.**
- **Statement of reasons** for moderation actions.
- **Recommender system transparency.**
- **Stricter obligations** for VLOPs (very large online platforms) — not us at launch.

### 🇪🇺 EU — Digital Markets Act (DMA)
- Not directly applicable to VROE Labs at launch (we are not a gatekeeper).
- Track if a product surface ever interacts with a gatekeeper's APIs (Apple, Google, Meta, Amazon, Microsoft, ByteDance).

### 🇬🇧 UK — UK GDPR + Data Protection Act 2018
- Largely mirrors EU GDPR with UK-specific supervision.
- **Age-Appropriate Design Code:** strong protection for under-18s.

### 🇺🇸 US — California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)
- **Notice at collection** with categories + purposes.
- **Right to know, delete, correct, opt-out of sale/share, limit use of sensitive personal information.**
- **Do Not Sell or Share My Personal Information** link + Global Privacy Control honored.
- **Sensitive personal information:** stricter use rules.
- **Children:** opt-in for sale/share for under 16; verifiable parental consent for under 13 (COPPA also applies).
- **Breach notification:** statutory timelines vary by state.

### 🇺🇸 US — COPPA (Children's Online Privacy Protection Act)
- Applies to under 13.
- **Verifiable parental consent** before collecting PII from a child.
- **Notice on the website** + parental access controls.
- Trove + RIE + Vero default: **no users under 13.** Onboarding gates age.

### 🇺🇸 US — State privacy laws beyond CA (VCDPA, CPA, CTDPA, UCPA, OCPA, etc.)
- Similar contours: notice, rights, opt-outs.
- Universal opt-out mechanism honored.
- Per-state minor age varies (13 to 16); use stricter.

### 🇨🇦 Canada — PIPEDA + provincial (Quebec Law 25)
- **Consent + accountability.**
- **Privacy management program** required.
- **Quebec Law 25:** stricter; explicit consent for cookies, DPO mandatory, BIA for AI systems.

### 🇦🇺 Australia — Privacy Act 1988
- 13 Australian Privacy Principles.
- **Notifiable Data Breaches scheme:** notice to OAIC + affected within 30 days when likely serious harm.

### 🇧🇷 Brazil — Lei Geral de Proteção de Dados (LGPD)
- Mirrors GDPR shape.
- **DPO mandatory** in many cases.
- **Cross-border transfers** via ANPD-approved mechanisms.

### 🇨🇳 China — Personal Information Protection Law (PIPL)
- **Data localization** for critical information infrastructure operators.
- **Cross-border transfer assessment** by CAC.
- **Separate consent** for sensitive personal information, cross-border transfer, automated decision-making.
- We treat China as a **gated launch** with separate infrastructure tier if pursued.

### 🇿🇦 South Africa — POPIA (Protection of Personal Information Act)
- Mirrors GDPR shape.
- **Information Officer registration** required.
- **Cross-border transfers** with safeguards.

### 🇸🇬 Singapore — PDPA
- **Do Not Call Registry** for marketing.
- **DPO mandatory.**
- Cross-border transfer obligations.

### 🇦🇪 UAE — PDPL (Federal Law No. 45 of 2021)
- Similar to GDPR.
- **DPO** in specific cases.
- **Health data + financial data + identifier data** stricter.

### 🇯🇵 Japan — APPI (Act on the Protection of Personal Information)
- **Cross-border transfer** consent + adequacy.
- **Sensitive data** stricter.
- **Anonymously processed information** rules.

### 🇰🇷 South Korea — PIPA
- **Strict consent** model.
- **Encryption mandatory** for resident registration numbers and certain categories.
- **Cross-border transfer** consent + adequacy.

### 🇮🇩 / 🇵🇭 / 🇹🇭 / 🇲🇾 / 🇻🇳 — ASEAN
- Indonesia (PDP Law), Philippines (Data Privacy Act), Thailand (PDPA), Malaysia (PDPA 2010), Vietnam (PDPD) — each tracked separately.
- **Common posture:** consent, rights, breach notification, DPO; specifics differ.

### 🇲🇽 / 🇨🇱 / 🇦🇷 — LATAM (selected)
- Mexico (LFPDPPP), Chile (Law 19.628 + reform), Argentina (PDPA) — GDPR-like patterns.

---

## Cross-cutting obligations (always, everywhere)

### Identification + auth
- **MFA optional** for users, **mandatory** for admins.
- **OTP not stored in plaintext;** stored hashed with short TTL.
- **Session cookies** `HttpOnly; Secure; SameSite=lax`.
- **Account recovery flows audited.**

### Encryption
- **In transit:** TLS 1.3.
- **At rest (PII):** AES-256-GCM with per-tenant DEKs wrapped by KMS-managed KEKs.
- **Trove vault:** zero-knowledge — server cannot decrypt.
- **Passwords:** Argon2id only.

### Data minimization
- Collect only what is necessary for the stated purpose.
- Retention schedules documented per data category.
- Deletion / anonymization on schedule + on request.

### Rights honoring
- **Access:** export user data in a portable, machine-readable format within 30 days (most regions). 7 days where law requires.
- **Erasure:** delete PII within 30 days. ALVED records anonymized (handle replaced) while preserving counterparty-facing integrity where law permits.
- **Correction:** allow user to correct.
- **Restriction:** allow user to restrict processing.
- **Objection:** allow user to object.
- **Portability:** machine-readable export (JSON-LD for ALVED).
- **Withdraw consent:** as easy as giving it.

### Children
- **Default:** users < 13 not permitted on any VROE Labs surface.
- **Age verification:** at signup + reaffirmation at key moments.
- **Where minors are permitted (regional):** parental consent flows, no targeted advertising, no behavioral monitoring, no profiling.

### Cookies + tracking
- **Strictly necessary:** no consent needed.
- **Performance / analytics:** consent banner with **reject-all** option, granular categories.
- **Marketing / advertising:** explicit opt-in.
- **No dark patterns** in the banner.
- **GPC** (Global Privacy Control) honored.

### Marketing communications
- **Opt-in** by default for transactional + marketing where law requires.
- **Unsubscribe** in every email.
- **DNC compliance** in regions where applicable.

### Payments
- **PCI DSS:** outsourced to Razorpay (India) / Stripe (international). VROE Labs never sees card data.
- **Strong Customer Authentication (PSD2 EEA / UK):** enforced via provider.
- **Refund policy:** clear, region-aware (India CPA, EU consumer rights).

### Inheritance / estate (Trove)
- **Not a legal will.** Marketing + product UI must say so.
- **Probate / estate law differs per jurisdiction.** Trove provides records + access plans, not legal validity.
- **Cross-border heirs** flagged; users advised to consult counsel.
- **Recovery via threshold scheme** is the user's choice; VROE Labs offers tooling, not guarantees.

### Employment / labor (Vero)
- **Vero is a marketplace + record platform, not an employer of record.**
- **Minimum wage compliance** enforced at the floor.
- **Workplace safety** + dispute mechanisms documented.
- **Verification of right to work** required for paid jobs (DigiLocker e-KYC India; equivalent abroad).
- **No misleading earnings claims.**

### Health-adjacent data (RIE)
- **No medical claims.**
- **Wearable data treated as personal information** with special-category care where law requires.
- **Heart rate, sleep, GPS routes** stored encrypted at rest, never sold.
- **HIPAA:** RIE is not a covered entity. We do not sell to covered entities without a BAA.

### AI / automated decision-making
- **No fully-automated, materially-impacting decisions** at launch.
- **Trust score** is explainable (signals visible to user).
- **Admin moderation** is human-decision with optional AI triage.
- **EU AI Act:** track scope as the product evolves; record-keeping + transparency for high-risk systems if any.

### Accessibility
- **WCAG 2.2 AA** target.
- **Public statement** at `/legal/accessibility`.
- **EAA (European Accessibility Act):** in force June 2025 — covered.

### Security operations
- **Encryption everywhere.**
- **Quarterly key rotation.**
- **Annual third-party security audit** post-GA.
- **SOC 2 Type I** post-launch.
- **Incident response** runbook + 72-hour breach notification ready.

### Government access
- **Subpoena / lawful request response runbook.**
- **Transparency report** post-GA.
- **Trove cannot produce plaintext** — by design. We comply with ciphertext + metadata requests.

---

## Per-product compliance shorthand

### Vero
- **Primary law:** DPDP (India). Secondary: CPA (India), IT Rules 2021, RBI/NPCI.
- **High-risk fields:** identity, employment, payments, location.
- **Required pages:** terms, privacy (with India edition), cookies, refund, grievance, acceptable use, accessibility.

### RIE
- **Primary law:** GDPR + CCPA. Secondary: DPDP for Indian users.
- **High-risk fields:** health-adjacent (heart rate, sleep), location (GPS routes).
- **Required pages:** terms, privacy (multi-region), cookies, accessibility.

### Trove
- **Primary law:** all of the above for users in each region. Strictest controls on data — zero-knowledge.
- **High-risk fields:** inheritance language, ciphertext export, recovery.
- **Required pages:** terms, privacy (multi-region), cookies, accessibility, **explicit "Trove is not a will" notice**.

---

## Engineering control map

| Control                         | Where it lives                                                |
| ------------------------------- | ------------------------------------------------------------- |
| Strict-Transport-Security       | `next.config.ts` per app                                      |
| CSP nonces                      | `apps/<app>/src/middleware.ts`                                |
| Cookie banner                   | `apps/marketing/src/components/cookies/*`                     |
| Right-to-access export          | `apps/<app>/src/app/api/me/export/route.ts`                   |
| Right-to-erasure                | `apps/<app>/src/app/api/me/delete/route.ts`                   |
| Grievance officer page          | `website/shared/legal/grievance.md` → `/legal/grievance`      |
| DPDP consent record             | `audit_log` table, `consent.*` actions                        |
| Cross-border transfer notice    | Privacy pages per region                                      |
| Age gate                        | `apps/<app>/src/app/(auth)/register/page.tsx`                 |
| Parental consent flow           | `apps/<app>/src/app/(auth)/parental-consent/page.tsx` (TBD)   |
| Universal opt-out (GPC)         | `apps/<app>/src/middleware.ts`                                |
| Subpoena response runbook       | `docs/runbooks/subpoena.md` (post-launch)                     |
| Encryption keys                 | KMS — never in code                                           |

---

## Review + audit

- **Quarterly review** of this document.
- **Annual third-party privacy audit** post-GA.
- **Region-specific counsel sign-off** before launching in that region.
- **Compliance owner** is the security lead. PRs touching this file require their approval.

---

## When the law changes

Track changes via:
- IAPP / OneTrust / Bird & Bird newsletters.
- Direct regulator publications (ANPD, ICO, CNIL, MeitY, CAC, OAIC, etc.).
- Subscription to a single legal tracking service (TBD).

A change to a law that affects a control requires:
1. Update of this file.
2. PRs to the affected surfaces.
3. Updated user notice if material.
4. Update of regional privacy pages.

