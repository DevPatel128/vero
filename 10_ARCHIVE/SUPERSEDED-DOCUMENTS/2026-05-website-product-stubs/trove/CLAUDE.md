# CLAUDE.md — `/website/trove` agent contract

Inherits from `/website/CLAUDE.md`. Adds Trove-specific behavior.

## Source of truth

Load in order:

1. `/AGENTS.md`
2. `/CLAUDE.md`
3. `/website/CLAUDE.md`
4. `/apps/trove/docs/context-pack/00-project-overview.md`
5. `/apps/trove/docs/context-pack/01-product-philosophy.md`
6. `/apps/trove/docs/context-pack/02-brand-system.md`
7. `/apps/trove/docs/context-pack/12-security-rules.md`
8. `/apps/trove/docs/context-pack/14-copywriting-tone.md`

## Trove-specific hard rules

1. **Trove is zero-knowledge.** The server cannot decrypt the vault. If you write copy that implies otherwise, you have introduced a security vulnerability via the marketing site. Cut it.
2. **Vault passphrase is non-recoverable.** Be honest. "We cannot reset your passphrase. If you lose it, the vault is lost." This is a feature, not a bug. Compare to a safety deposit box.
3. **Heirs designation is not a will.** Trove produces a record + a time-locked / condition-locked access plan. It does not replace a legal will.
4. **Privacy first, scale second.** Don't write growth-y copy. Write protection-y copy.
5. **Children + minors handled separately.** Anything addressed to children, or where children are heirs, must follow COPPA + DPDP minor rules. See `/docs/COMPLIANCE.md`.
6. **Insurance / institutional export is a feature, not a guarantee.** Never promise the recipient accepts the format. Always say "an export format institutions commonly accept".
7. **No blockchain / Web3 / crypto-coin language.** Trove uses cryptography, not a cryptocurrency. Keep the distinction visible.

## Tone calibration

Yes:

> Trove is a private vault for the valuable things in your home. You capture them. You write the story behind each one. You designate who can open the vault when it matters. We can never see inside.

No:

> 🔐 Trove uses cutting-edge blockchain technology to revolutionize inheritance! 🚀 Your heirs will inherit instantly thanks to our patented Web3 protocol!

## Self-checks

- **Plain-English crypto** — zero-knowledge is explained without jargon at least once on the page.
- **Honest about non-recoverable passphrase** — no page implies password reset.
- **No legal-will claim** — the page distinguishes between Trove records and a legal will.
- **Heir privacy** — copy preserves that heirs do not see the vault while the owner is alive.
- **The word _dignity_ is fine on this product** — Trove is about taking care of what matters. Other products would feel weird here. Trove can.

