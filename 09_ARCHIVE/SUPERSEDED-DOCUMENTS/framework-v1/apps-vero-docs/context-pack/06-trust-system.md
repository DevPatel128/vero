# 06 — Trust System

## Trust philosophy
Trust is the product. The trust system is the unfair advantage. It must be transparent enough for users to understand and sophisticated enough to be hard to game.

## Trust signals (inputs)
The trust score is composed of independent signals. We never expose a single opaque number.

1. **Verified completions** — count of ALVED records minted with both signatures.
2. **Attendance reliability** — % of accepted jobs the worker showed up to.
3. **Cancellation rate** — measured on a 90-day rolling window.
4. **Dispute outcome rate** — % of disputes resolved in the worker's favor.
5. **Repeat-booking ratio** — same client booking again.
6. **Counterparty quality** — quality of the businesses that hired the worker.
7. **Evidence quality** — % of records with media evidence + counterparty signature.
8. **Consistency over time** — gaps + irregularity penalize gently.
9. **Identity verification** — DigiLocker e-KYC, phone, optional address.
10. **Community signals** — peer attestations, verified vouches.

Each signal is normalized and surfaced individually on the user's trust panel.

## Display
- **Worker side:** they see the inputs and the deltas.
- **Business side:** they see a calm summary plus the underlying ALVED records.
- **Public profile:** counts of verified records by category, not a number.

## Trust score formula (illustrative)
The actual weights live in `lib/trust/weights.ts` and are tuned with usage. The shape is a weighted sum with soft caps to prevent any one signal from dominating. The score updates nightly + on the events that change it.

## Anti-abuse rules
The trust system can be attacked. Protect against:
- **Fake accounts** — phone + DigiLocker required for paid work.
- **Review abuse** — only counterparties of a real job can attest.
- **Collusion** — repeat short loops between a small set of users flagged for review.
- **Trust farming** — micro-tasks below a threshold do not count.
- **Duplicate identity** — phone + Aadhaar hash (via DigiLocker e-KYC) dedup.
- **Spam referrals** — referral credit only after the invitee completes a verified job.
- **Malicious uploads** — file scan + size + type validation.
- **Dispute manipulation** — disputes go to admin queue; both parties heard.

## Identity layers
1. **Anonymous** — can browse, cannot apply.
2. **Phone-verified** — can apply to unpaid apprenticeships.
3. **KYC-verified (DigiLocker)** — can be paid, can mint paid records.
4. **Business-verified** — GST or PAN match, can post paid jobs.

## Dispute flow
1. Either party opens a dispute on a job within 7 days of completion.
2. Both parties post evidence.
3. Admin reviews within 72 hours.
4. Outcome attached to both ALVED records — _disputed_ becomes a permanent flag.
5. Trust deltas applied based on outcome.

## Decay
- Records older than 24 months count at 50% weight for the trust score (but stay visible on the profile).
- Inactivity is not penalized.

## Public vs private
- Users choose the visibility of each record.
- Trust score is **computed using all records** (public + private) but **displayed using only public records**.
- A user can choose to share a private record with a specific recruiter via a signed link.

## Trust UX
- The worker's profile shows _what gets them hired_ — completions per category, repeat ratio, on-time rate.
- Never display the score as the headline. The headline is _what they did_.
- Show the next-rung milestone — _"3 more verified café shifts → 'Trusted Café Worker' badge"_.

## Cross-product trust
A user who has verified discipline records on RIE can opt into composing them into the Vero trust score — but only signals that make sense (e.g., consistency, not gym lifts). Cross-product trust is read-scoped.

## Trust outcomes we want
- A worker with 6 months of verified records is more hireable than a random LinkedIn profile.
- A new worker is not punished — they have a clear path to their first record.
- A bad actor cannot fake-farm a high score in a week.
- A user understands why their score moved when it moves.

