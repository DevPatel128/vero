# ARCHIVED: vero-app (application/)

Status: Archived. Not deployed. Not reviewed against `05_ENGINEERING/`.
Archived: 2026-09-21. Owner: Dev Patel.

This is the product-app prototype (Next.js 16, Supabase, argon2, jose, Razorpay, Resend).
It had no git history before this archive. It is kept so the work is not lost.

Rules:

- Do not treat anything here as current truth or an approved decision.
- `CLAUDE.archived.md` and `AGENTS.archived.md` are the old agent contracts. They are renamed so agents do not load them.
- `package.json`, `package-lock.json`, `eslint.config.mjs` and `.gitignore` carry an `.archived` suffix so dependency tooling ignores this folder.
- To revive it: move it out of `10_ARCHIVE/`, drop the `.archived` suffixes, and open a proposal in `08_DECISIONS/` first. It uses `@node-rs/argon2` and `jose` directly; the older `@rie/crypto` rule conflicts with that (see `08_DECISIONS/ENGINEERING/`).
