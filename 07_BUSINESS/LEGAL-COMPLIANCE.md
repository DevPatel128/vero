# Legal / Compliance: DPDP Act 2023 status

> Status: Draft · Owner: Dev Patel · Version: 2 · Last updated: 2026-09-28
> Sources: Documents/15; website/site/src/app/legal/* (verified against live code, 2026-09-22); 03_RESEARCH/RESEARCH.md R-008
> Moved from `05_ENGINEERING/SECURITY/VERO-COMPLIANCE-DPDP.md` to `07_BUSINESS/LEGAL-COMPLIANCE.md` when this repo adopted the Wolf v3 layout (Wolf places compliance under BUSINESS, not ENGINEERING), content unchanged

## Rule

This file records what the repo says about DPDP compliance and what is actually implemented. It does not constitute legal advice or a compliance sign-off — DPDP Act 2023 interpretation needs human/legal review, per `00_START_HERE/AI_OPERATING_RULES.md` ("the AI is not the final authority for ... legal approval").

## What the DPDP Act requires (as described in this repo's own sources, not independently re-verified against the statute's text)

Per `Documents/15. VERO Privacy and Compliance Summary.md`: consent before processing personal data (withdrawable), purpose limitation, data minimization, accuracy/correction rights, storage limitation, right to erasure, right to portability, and a defined grievance-redress process.

## Implemented today, in `website/site`

- Soft-delete pattern, audit-log retention intent, and no-PII-in-URLs are stated policy goals in the archived `CLAUDE.md` §17/§26, but the live site has **no user accounts and no `user_consents` table** — it only collects waitlist entries (email, name, role, city, free-text use-case) into Upstash Redis. There is nothing to soft-delete or audit-log yet in production; the compliance machinery described in `Documents/15` applies to the unbuilt core product.
- The waitlist join form has a consent checkbox (`WaitlistForm.tsx`, `name="consent"`, required) linking to `/legal/privacy` — this is the one piece of DPDP-relevant UI that is actually live.
- This PR's security fixes (rate limiting, atomic writes, no PII in the URL query string, reduced PII in server logs — see the `fix(security)` and `fix(reliability)` commits in this PR's history) reduce the waitlist's own data-handling risk, independent of the broader DPDP program.

## Grievance and rights-response SLAs — resolved to the live site

Three figures existed across sources (`/legal/grievance` and `website/shared/CLAUDE.md`: 15 days; `Documents/15`: 30 days; an archived, never-deployed draft `/privacy` page: 30 days plus a 7-day rights window). Per the tie-break recorded in `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` (the live site is what users actually see, so documents follow it), **15 days is the canonical grievance-response figure**. The other figures are historical drafts and are not in force. This is a documentation reconciliation, not legal advice; the owner should still have counsel confirm the figure before launch.

## Live claims corrected

- `/legal/sub-processors` now names the vendors that actually process waitlist data (now Cloudflare and Resend; it originally named Vercel and Upstash). It previously said none were in use.
- `/security` no longer claims hardware-backed KMS, encryption-at-rest specifics, live identity verification, live payments or a live append-only audit log. It now says these are designed for the launch product and not live.

## What this means for now

Until counsel confirms the figures, do not cite a specific SLA number or infrastructure claim from this repo in an external DPDP compliance statement — cite the live page the user will actually see, and flag it as pending review if asked.
