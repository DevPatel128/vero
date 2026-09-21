# 09 — Growth Engine

## North star metric
**Verified records minted per active user per month.** This is the only metric that compounds the moat. Everything else is supporting.

## Activation
A user is **activated** when they complete their first verified record. Time to first record:
- **Worker target:** 14 days from signup.
- **Business target:** 7 days from signup.

If activation is missed, the user is in our re-engagement loop until they activate or 60 days elapse.

## Retention
**Definition:** a user who minted a record in the prior 30 days mints another in the current 30 days.
**Target at GA:** 45% month-over-month.

Retention hooks:
- Streak (verified records per week) — quiet, not gamified.
- Repeat-booking nudge to past clients.
- Category expansion suggestion based on prior records.

## Viral loops
1. **Counterparty join** — every job invites the counterparty to sign. Many sign before signing up. The signing flow is the easiest signup on the internet.
2. **Public profile share** — workers share `/u/{handle}` as their portfolio. Each share is a recruitment ad.
3. **Verifiable employment letter** — PDFs include a tasteful "Verified by Vero" footer + a link to the public profile.

## SEO strategy
- **Programmatic SEO** at city × neighborhood × category granularity:
  - `/jobs/bengaluru/whitefield/cafe-shift`
  - `/jobs/bengaluru/hsr-layout/barista`
  - `/jobs/bengaluru/koramangala/dog-walker`
- Pages are SSG + ISR with live job count, recent records (anonymized), local FAQ.
- Each page has Organization + ItemList JSON-LD.
- Sitemaps split per category to avoid 50k-URL limits.

## AEO / answer-engine strategy
- FAQ sections on every page wrapped in `FAQPage` schema.
- Each page answers one canonical question phrased as a search.
- Markdown is structured with H2 question + paragraph answer for snippet capture.

## LLMO / LLM discoverability
- `llms.txt` at the root of marketing surface lists canonical pages.
- Public ALVED JSON-LD is the canonical machine-readable face of the product. LLMs ingest it cleanly.
- Page copy is robust without JavaScript — server-rendered first.
- No content gated behind login that should be public.

## Brand-driven growth
- Long-form journalism: "How a verified café shift led to a sponsorship in Whitefield". Real stories, real workers, edited like a magazine.
- Photography-led documentary content — local worksites, named workers (with permission).

## Partnerships (post-launch)
- Vocational colleges — externship-as-record.
- SMB chambers of commerce — verified hiring portals.
- Government skill programs — opt-in record export.

## Conversion optimization principles
- **Same headline across ads + landing page** — match-rate above 90%.
- **One CTA above the fold.** Two-action variant is split-tested only when a clear hypothesis exists.
- **Trust signals near the CTA** — verified record count, city ticker, partner logos when real.

## Anti-growth practices we refuse
- Buying email lists.
- Dark patterns in onboarding.
- Forcing notifications.
- Hidden upsells.
- Fake counters.

## Measurement stack
- **PostHog** — product events.
- **Plausible** — privacy-light pageviews.
- **Vercel Analytics** — web-vitals + speed.
- **Looker** (or Hex/Metabase) — exec dashboards.

## Growth loop quality bar
Each loop must pass:
- Does it generate verified records (the moat)?
- Does it preserve user trust?
- Does it preserve compliance?
- Does it work without dark patterns?

If no, the loop does not ship.

