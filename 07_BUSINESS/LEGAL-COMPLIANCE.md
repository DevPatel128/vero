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

## Known contradiction — grievance and rights-response SLAs

**CONFLICT**, not resolved here (also recorded in `08_DECISIONS/PRODUCT/2026-09-open-contradictions.md` item 4):

- `website/site/src/app/legal/grievance` and `website/shared/CLAUDE.md` state a **15-day** grievance-response SLA.
- `Documents/15` states **30 days** for the same grievance-response commitment, and also states standard data-rights requests (access, correction, portability) get a response "within 30 days."
- An untracked draft `/privacy` page found during this PR's audit (archived, never deployed — see `09_ARCHIVE/SUPERSEDED-DOCUMENTS/website-legal-pages-mobile-app/`) stated a 30-day grievance response and a separate 7-day rights-response window, differing from both of the above.

This is a real compliance commitment, not marketing copy. It needs a human legal decision, then a single edit to whichever live page is wrong — not an AI-picked default.

## Other live claims needing review

Found during this PR's site audit, not resolved here:

- `website/site/src/app/legal/sub-processors` states no production sub-processors are in use, while Vercel, Upstash, and (when configured) Resend already process signup data in production.
- `website/site/src/app/security` (the marketing trust page) makes claims about hardware-backed KMS and encryption at rest that go beyond what the current waitlist-only implementation actually does.

## What this means for now

Until the contradiction above is resolved and the two claims just above are reviewed, do not cite a specific SLA number or infrastructure claim from this repo in an external DPDP compliance statement — cite the live page the user will actually see, and flag it as pending review if asked.
