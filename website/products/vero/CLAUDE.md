# CLAUDE.md — `/website/vero` agent contract

Inherits from `/website/CLAUDE.md`. Adds Vero-specific behavior.

## Source of truth

Before editing **anything** in this folder, read **in this exact order**:

1. `/AGENTS.md`
2. `/CLAUDE.md`
3. `/website/CLAUDE.md`
4. `/apps/vero/docs/context-pack/00-project-overview.md`
5. `/apps/vero/docs/context-pack/01-product-philosophy.md`
6. `/apps/vero/docs/context-pack/02-brand-system.md`
7. `/apps/vero/docs/context-pack/14-copywriting-tone.md`
8. The page-specific files for your task (see "File map" in the context pack)

If any of these conflict, **the deepest file wins** (this file > /website > root).

## Vero-specific hard rules

1. **Vero is not LinkedIn, not Urban Company, not a job board, not a freelance bidding war.** If your copy could be on those sites, rewrite it.
2. **Vero is India-first.** Bengaluru is the launch city. Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City are launch neighborhoods. Never write "global" or "worldwide" on a Vero page until cleared.
3. **Workers are free. Always.** Vero monetizes the SMB side and the 5% escrow fee. Never write copy that implies workers pay.
4. **5% escrow fee is a deliberate counter-position to Urban Company's 25%.** Mention it. Don't shy from it.
5. **ALVED is a protocol, not a feature.** Talk about it as something Vero _publishes_, not something Vero _owns_.
6. **DPDP Act 2023 applies.** Any data-collection language must comply.
7. **MSG91 / Razorpay / DigiLocker** are mentioned by name on the security page only. Other pages just say "verified phone OTP", "Indian payment partner", "DigiLocker-based ID verification".
8. **No claims about earnings**, no "make ₹X per week", no income guarantees. Indian advertising compliance + DPDP + consumer protection forbid it.

## Tone calibration

Read this paragraph. This is the Vero voice:

> Vero is a proof-of-work platform. Each completed job becomes a verified record on your profile, signed by you and the person who hired you. Over time, those records compose into a real, portable work identity — not claims, not posts, just things you did. We are starting in Bengaluru in Q3 2026.

Now read this. This is **not** the Vero voice:

> 🚀 Vero is revolutionizing how India works! 💼 Join thousands of users already earning more with our AI-powered platform! 🤖✨ Sign up today and unlock your potential! 🔓

If your draft is closer to the second, start over.

## Self-checks

After writing or editing, run through every check in `/website/CLAUDE.md` plus:

- The word **trust** appears on the page (Vero is a trust product).
- The word **proof** appears on the page (Vero is a proof product).
- The page explains _what records look like_ if asked, or links to `/alved`.
- The page explains _who pays_ if asked, or links to `/vero/pricing`.
- Workers, beginners, students, career switchers are addressed by name on at least one page in the site.
- Bengaluru / India context is present at least once (unless the page is universal like `/alved`).

## Handoff

When done, your output should be:

1. The Markdown file in `pages/` or `copy/`.
2. The JSON-LD block in `schema/`.
3. A note in `seo/meta.md` updating the meta title + description.
4. A note in `seo/sitemap-entries.yaml` updating priority / changefreq.
5. A line in `seo/llms.txt.fragment` if the page contains new factual information.
6. A summary handoff (≤ 5 bullets) listing every file you touched and what's left for the engineer.
