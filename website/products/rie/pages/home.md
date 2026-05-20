---
slug: home
product: rie
route: /rie
title: "RIE — proof of discipline"
description: "RIE turns your discipline — fitness, content, gaming — into a cryptographic record only you can write and anyone can verify."
ogImage: "/og/rie-home.png"
priority: 1.0
changefreq: weekly
publishedAt: 2026-05-19
updatedAt: 2026-05-19
schema:
  - type: SoftwareApplication
  - type: Organization
  - type: BreadcrumbList
keywords:
  - proof of discipline
  - verified workout
  - cryptographic streak
  - writing streak tracker
  - gaming proof of skill
aeo:
  primaryQuestion: "What is RIE?"
  answer: "RIE is a proof-of-discipline platform. It signs your training sessions, writing days, or gaming hours with a cryptographic key paired to your devices, so the record is yours and verifiable by anyone you choose to show it to."
status: draft
---

# RIE. Discipline you can prove.

Streaks on most apps are stories. On RIE, they are records.

Every session is signed by the device you trained on, then chained to your record. Nobody — including RIE — can fake a session for you. Nobody can edit yesterday's. Discipline is the unfair advantage. Now it has a receipt.

> Launching Q4 2026.

[Join the early access list](/rie/waitlist)

---

## Three surfaces. One record.

- **Fitness.** Lifts, runs, rides, rows, climbs. Paired to your watch, ring, or platform.
- **Content.** Writing days, code commits, ship rate. Paired to your editor or repo.
- **Gaming.** Ranked sessions, hours, accomplishments. Paired to the game's verified API.

Mix as many as you like. Your record is one timeline.

---

## How an RIE session is signed

1. **Pair your device** — watch, ring, repo, account. One-time, cryptographic.
2. **Train, write, or play.**
3. **The device signs the session.** The session is hashed, chained, and added to your record. Public if you want it. Private if you don't.

That's the entire flow. No selfies of your gym mirror. No screenshots that can be edited.

---

## Why discipline needs proof

Discipline is what compounds. Talent is what gets you started. The internet rewards talk; the world rewards work. RIE makes the work legible.

The record is for:

- you, to see what you actually did
- the coach who wants to verify the lift before periodizing
- the editor who wants to check the ship rate
- the league that wants the rank without screenshots
- the employer, sponsor, or scholarship that wants the discipline pattern, not the highlight reel.

---

## What makes a record un-fakeable

- The device key never leaves the device unencrypted.
- The session signature includes the prev-hash, so reordering is impossible.
- The verifier is named in the record — your watch, your repo, your game.
- Multi-attester records can carry signatures from witnesses (a coach, an opponent).

We publish the spec at [`/alved`](/alved). Read the math if you want.

---

## Pricing

- **Free core.** Pair one surface. Mint records. Keep the streak.
- **Pro.** Unlock multi-surface, multi-attester, API export, deeper analytics.

Full pricing on [`/rie/pricing`](/rie/pricing).

---

## Frequently asked

### Does RIE replace my fitness app?
No. RIE reads from your fitness app via verified webhooks. Keep what you use.

### Can RIE see my heart rate, GPS route, or private writing?
By default RIE stores a hash of the session, the verifier, and your chosen metric. Raw data lives where you keep it. Encrypted at rest if you opt in to deeper storage.

### What happens if I lose the device I paired?
Re-pair with a new device. Your record continues. Past records remain signed by the old key.

### Is RIE a coaching app?
No. RIE is the record layer. Bring your coach.

### How does RIE protect streaks from gaming?
Sessions must be signed by a paired device. Backdating is rejected. We publish the exact rules.

> Full FAQ on [`/rie/faq`](/rie/faq).

---

## Read next

- [How it works](/rie/how-it-works)
- [Streaks](/rie/streaks) — and how RIE protects them
- [Trust](/rie/trust)
- [Security](/rie/security)
- [ALVED](/alved)
