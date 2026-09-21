# 02 — Brand System

## Brand promise
**Calm, premium, useful, local.** Stripe meets Patagonia meets Linear. Quiet confidence. Never shouty.

## Voice
- Sentences breathe. White space matters.
- Specific is trustworthy. _"5% escrow"_ beats _"low fees"_.
- Plain. A 14-year-old should follow it.
- Honest about timeline. _"Q3 2026"_, never _"soon"_.
- Local-first. Bengaluru is mentioned by name where relevant.
- Never use the words: _just, simply, easily, effortlessly, revolutionize, disrupt, AI-powered, unleash_.

## Wordmark
Lowercase `vero`. Set in the brand display type. Tracking tight. Never set in caps. Never set in script.

## Color
Tailwind tokens live in `/packages/config/tailwind/tokens.css`. The OKLCH palette:

- **Base** — paper white / ink near-black. Used as canvas + text.
- **Trust blue** — deep, slightly desaturated. Used for primary CTAs and verified marks.
- **Proof green** — quiet, sage-leaning. Used for confirmation states and ALVED record signals.
- **Caution amber** — only for warnings.
- **Critical red** — only for destructive or compliance-critical UI.
- **Neutral greys** — five steps for borders, surfaces, secondary text.

No gradients used as decoration. Gradients used only on the wordmark or for the hero canvas when it is sparing.

## Typography
- **Display** — a contemporary humanist serif or grotesque (Söhne, Inter Tight, Faktum). Set tight, set quiet.
- **Body** — system stack with Inter / SF Pro fallback.
- **Mono** — JetBrains Mono / SF Mono for record hashes, code, ALVED IDs.
- **Scale** — modular scale 1.2 on mobile, 1.25 on tablet, 1.333 on desktop.

## Spacing + radius
- Spacing on a 4px grid. Larger gaps are multiples of 8.
- Border radius is 8 / 12 / 16 / 24. We do not use pill buttons except for tags.
- Cards have 1px borders, never floating shadows in default state.

## Motion
- **Default:** ease-out 200ms.
- **Important transitions:** ease-out 320ms.
- **Hero / canvas:** ease-in-out 480ms maximum.
- **Reduced motion:** strict. Honored via `prefers-reduced-motion`.

Motion is used to confirm cause-and-effect, not to entertain. Never animate to draw attention.

## Imagery
- **People:** real workers at real worksites. Not stock photography. Locally photographed wherever possible.
- **Product:** screenshots of the real product, lightly cropped. Never invented screenshots.
- **Documentary:** treat the brand more like a magazine than a startup pitch deck. Long captions are fine.
- **Iconography:** outlined, 1.5px stroke, rounded line caps. Lucide is the source set.

## Tone in different surfaces
| Surface          | Register                                 |
| ---------------- | ---------------------------------------- |
| Marketing site   | Quiet, confident, specific               |
| Onboarding       | Friendly, brief, encouraging             |
| Empty states     | Useful, kind                             |
| Error states     | Clear, calm, never apologetic-overdone   |
| Push / email     | Restrained. No emoji. No urgency theater |
| Admin            | Direct. Bureaucratic-clean.              |
| Legal pages      | Plain English. Numbered clauses. Cite law. |

## Brand do / don't
**Do**
- Use the word _proof_. Use the word _trust_. Use the word _record_.
- Name places — Whitefield, HSR Layout, etc.
- Show the product, not a generic illustration.

**Don't**
- Use emoji in default body copy.
- Use exclamation points outside legal "no!" contexts.
- Use generic stock photography.
- Mix the wordmark with any tagline lockup that isn't approved.
- Refer to Vero in ALL CAPS, ever.

## Co-marks with RIE / Trove / VROE Labs
- **VROE Labs** is the parent. Footer + about page only.
- **Vero × RIE × Trove** lockup used on the umbrella site only.
- **ALVED protocol** has its own lockup — small, technical, footer.

