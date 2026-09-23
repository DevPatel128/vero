# Responsive

> Status: Draft · Owner: Dev Patel · Version: 1 · Last updated: 2026-09-23
> Sources: 09_ARCHIVE/SUPERSEDED-DOCUMENTS/CLAUDE.md.pre-framework §§7, 18; website/site/tailwind.config.ts (verified 2026-09-22)

## Principle

Mobile-first. Design and build for one-handed use, small screens, slow networks, and lower-end Android devices first; treat desktop as an expansion of the mobile layout, not the other way around.

## Breakpoints (as implemented)

`website/site/tailwind.config.ts` does not override Tailwind's default `screens` map, so the live site uses Tailwind's defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px. No product-specific breakpoint has been defined; if one becomes necessary, add it to `tailwind.config.ts` and record why in `08_DECISIONS/DESIGN/`.

## Requirements

- Touch-first interaction: large tap targets, no interaction that depends on hover alone.
- Sticky, reachable primary actions on mobile rather than actions buried at the bottom of a long scroll.
- Compact, collapsible sections for long content on small screens.
- Minimal input friction: correct input types/`inputMode` on form fields (verified in code: the waitlist email field uses `type="email"` and `inputMode="email"`).
- Layouts must not depend on JavaScript for the content to be visible — see `04_DESIGN/DESIGN-SYSTEM.md`'s note on the hero LCP fix, which was exactly this failure mode (content invisible without JS).

## Performance budget

No formal, measured performance budget exists in this repo as of 2026-09-23. `Documents/12`'s Phase-2+ metrics name explicit *targets* — Lighthouse Performance 90+ on mobile, Accessibility 95+, 99.9%+ uptime — but these are `TARGET`, not measured values; no Lighthouse run is recorded against the current site in this repo. Treat any specific performance number stated elsewhere as a target until a measurement is attached to it.

## Known gap

No Lighthouse CI or bundle-size budget check exists in `05_ENGINEERING/CI-CD/DEPLOYMENT.md`'s pipeline as of this PR. A baseline measurement should be taken before setting an enforced budget, per `05_ENGINEERING/PERFORMANCE/PERFORMANCE.md`'s "measure before optimizing" rule.
