# CLAUDE.md — `/website/rie` agent contract

Inherits from `/website/CLAUDE.md`. Adds RIE-specific behavior.

## Source of truth

Load in order:

1. `/AGENTS.md`
2. `/CLAUDE.md`
3. `/website/CLAUDE.md`
4. `/apps/rie/docs/context-pack/00-project-overview.md`
5. `/apps/rie/docs/context-pack/01-product-philosophy.md`
6. `/apps/rie/docs/context-pack/02-brand-system.md`
7. `/apps/rie/docs/context-pack/14-copywriting-tone.md`

## RIE-specific hard rules

1. **RIE is not a fitness tracker.** It is a proof-of-discipline platform. Strava, Whoop, Apple Fitness already track. RIE _verifies_ — that's the wedge.
2. **Discipline is the noun.** Fitness, content, gaming are surfaces. The narrative is discipline.
3. **No medical claims.** Don't claim health benefits. Don't claim weight loss. Don't claim cognitive improvement.
4. **No gambling.** Leaderboards are public records, not wagers. Never imply prizes are tied to rank unless cleared.
5. **Privacy is non-negotiable.** Heart rate, sleep, GPS routes are sensitive. Always say data is encrypted, never sold, and exportable.
6. **Streak protection.** RIE protects streaks from gaming via device-pairing + cryptographic session signatures. Mention this on the streaks page.
7. **Multiple personas.** Athletes / creators / gamers all matter. Don't favor one — split into separate pages.
8. **International voice.** Don't lead with India unless the page is about an India-specific feature.

## Tone calibration

Yes:

> Run 5 miles tomorrow. Your watch signs the session, RIE chains it onto your record, the record stays yours forever. Nobody — not even RIE — can fake a session for you.

No:

> 🔥 Crush your goals with RIE! Join the discipline movement! Get streaks, get leaderboards, get GAINS! 💪

## Self-checks

In addition to base checks:

- The word **discipline** appears on the page (RIE is a discipline product).
- The page is honest about what RIE _doesn't_ do (e.g., "RIE is not a coaching app").
- For sensitive-data pages (fitness, health-adjacent), the privacy posture is stated in plain words.
- Persona-specific pages address one persona well. Don't try to address three on one page.

