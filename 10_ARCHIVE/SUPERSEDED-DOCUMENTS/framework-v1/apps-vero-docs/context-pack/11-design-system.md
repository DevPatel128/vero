# 11 — Design System

## Source of truth
- Tokens — `/packages/config/tailwind/tokens.css` (`@theme` directives).
- Components — `/packages/ui/src/components/`.
- Variants — `cva` configs per component.
- Storybook — under `/packages/ui/storybook/`.

## Design tokens
| Token       | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `--color-bg-base` | Paper white in light, near-black in dark                           |
| `--color-fg-base` | Ink near-black in light, paper white in dark                        |
| `--color-trust`   | Primary CTA + verified marks                                        |
| `--color-proof`   | Confirmation + ALVED record signals                                 |
| `--color-caution` | Warnings                                                            |
| `--color-critical`| Destructive / compliance-critical                                   |
| `--color-muted-1..5` | Border + secondary text gradients                                |
| `--radius-1..4`   | 8 / 12 / 16 / 24                                                    |
| `--space-1..12`   | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192 / 256          |
| `--font-display`  | Display family                                                      |
| `--font-body`     | Body family                                                         |
| `--font-mono`     | Mono family                                                         |
| `--ease-out`      | cubic-bezier(0.16, 1, 0.3, 1)                                       |

## Components (canonical)
- **Button** — variants: primary, secondary, ghost, destructive, link. Sizes: sm, md, lg. States: idle, hover, active, focus-visible, disabled, loading.
- **Input** — variants: text, email, phone, otp, search. Inline error, helper text, prefix / suffix slots.
- **Card** — variants: surface, raised, outlined.
- **Modal / Dialog** — focus-trap, ESC to close, click outside opt-in.
- **Drawer** — mobile-first slide-up.
- **Toast** — top-right desktop, bottom-center mobile. Auto-dismiss 5s.
- **Skeleton** — for loading content.
- **Empty State** — illustration + headline + body + CTA.
- **Error State** — same structure, error palette.
- **Avatar** — initials fallback, verified mark variant.
- **Badge** — for trust badges, category tags.
- **Chip** — for filters, removable.
- **Table** — header sticky, row hover, mobile becomes cards.
- **Pagination** — `← prev | 1 2 3 ... | next →`.
- **Tabs** — underline style, keyboard navigable.
- **Stepper** — for onboarding + multi-step forms.
- **Bottom Tab Bar** — worker app navigation.
- **Top Nav** — business app navigation.
- **Command Palette** — `cmd+k`, fuzzy search.
- **Search Input** — with auto-suggest dropdown.
- **Trust Panel** — composite, shows signals.
- **Record Card** — composite, shows an ALVED record.
- **Record Timeline** — composite, shows the user's chain.

## Dark mode
- Toggleable + system-preference.
- Never invert a color blindly. Each token has explicit light + dark values.

## Accessibility-safe contrast
- Text ≥ 4.5:1.
- UI ≥ 3:1.
- Verified mark is a shape + color, never color-alone.

## Composition rules
- Components compose by passing children. No deeply nested props.
- Compound components (`Card.Header`, `Card.Body`) where structure matters.
- Polymorphic `asChild` pattern via Radix Slot.

## Visual rules
- No drop shadows in default state. Shadows used only for elevated surfaces (modal, popover, dropdown).
- 1px borders preferred over shadows.
- Spacing is consistent. No arbitrary pixel values.
- Icons all from `lucide-react`. No mixed sets.

## Motion
- Default 200ms ease-out.
- Important 320ms ease-out.
- Reduced motion overrides all.

## Theming
- Each app imports `tokens.css` once via `globals.css`.
- Per-app overrides allowed for brand color, not for spacing / radius / type.

## Storybook
- Every shared component has a story.
- Each story includes default, hover, focus, error, dark.
- Visual regression via Chromatic in CI.

## Anti-patterns
- Introducing a new shadow style.
- Hard-coding a hex color in a component.
- Bringing in a different icon library.
- Using `important` in CSS.
- Inventing a one-off spacing scale.

