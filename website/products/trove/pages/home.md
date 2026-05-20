---
slug: home
product: trove
route: /trove
title: "Trove — a private vault for what matters"
description: "Trove keeps a private, encrypted record of the valuable things in your home. You decide what to capture. You decide who can open it when it matters."
ogImage: "/og/trove-home.png"
priority: 1.0
changefreq: weekly
publishedAt: 2026-05-19
updatedAt: 2026-05-19
schema:
  - type: SoftwareApplication
  - type: Organization
  - type: BreadcrumbList
keywords:
  - private digital vault
  - household asset record
  - digital inheritance
  - zero-knowledge vault
  - heirlooms tracker
aeo:
  primaryQuestion: "What is Trove?"
  answer: "Trove is a zero-knowledge private vault for valuable things in your home — heirlooms, art, watches, documents. You capture items, write their stories, and designate who can open the vault when it matters. The server cannot decrypt your vault."
status: draft
---

# Trove. A private vault for what matters.

Most of what you own that has meaning will outlive you. Trove is the vault that holds the record — what it is, where it came from, what it's worth, who should inherit it — without showing any of it to anyone, not even us.

> Launching Q2 2027.

[Reserve a vault](/trove/waitlist)

---

## What lives in a Trove

The watch your grandfather wore. The painting in the hallway. The wine in the cellar. The papers in the filing cabinet. The locked drawer of small things. Everything you would call _important_ — kept in one place, with one passphrase, in one record.

You take a photo. You write the story. Trove encrypts both before they leave your device.

---

## Zero-knowledge, in plain English

The vault is locked by a passphrase **you** choose. The key for opening the vault is built from your passphrase using a one-way function. We never see the passphrase. We never see the key. We never see the items.

If you lose the passphrase, we cannot recover it. There is no back door. This is the same trade-off as a safety deposit box: privacy at the cost of forgetting being final.

Read the full explanation on [`/trove/zero-knowledge`](/trove/zero-knowledge).

---

## Heirs, designed for dignity

You designate one or more **heirs**. While you are alive, heirs do not see what is in your vault — they only know they have been designated. When the right conditions are met — verified inactivity, multiple attesters, a date you chose — the vault unlocks for them.

Trove is **not** a legal will. It is a record. Pair it with a real will from a real lawyer. We will tell you that on every page.

Learn more on [`/trove/heirs`](/trove/heirs).

---

## What a Trove record can do

- Capture an item — photo, story, provenance, valuation, location.
- Sign it with your private key for tamper-evidence.
- Export to an insurance-friendly format.
- Share a single record without revealing the rest of the vault.
- Time-lock — release after a date.
- Condition-lock — release if heirs co-attest inactivity.

---

## Pricing

- **Free** — up to 25 items, 1 heir, single-condition unlock.
- **Pro** — unlimited items, multi-heir, multi-condition, institutional export.

Full pricing on [`/trove/pricing`](/trove/pricing).

---

## What Trove is not

- Not a will.
- Not a bank.
- Not a probate service.
- Not insurance.
- Not advice.

Trove is the **record**. Everything else is a job for a lawyer, a bank, an executor, an insurer, or a financial advisor — and Trove plays nicely with all of them via export.

---

## Frequently asked

### Can VROE Labs see what's in my vault?
No. The encryption keys are derived on your device from your passphrase. The server stores ciphertext and the metadata needed to chain records — nothing readable.

### What if I lose my passphrase?
We cannot reset it. The vault becomes inaccessible. This is the same trade-off as a safety deposit box. We recommend a Trove-supported recovery plan — a recovery passphrase split between trusted contacts using a threshold scheme.

### Is Trove a substitute for a legal will?
No. Trove is a record + access plan. Keep a real will from a real lawyer.

### How do heirs claim the vault?
The unlock conditions are set by you when you designate heirs. They can include date thresholds, co-attestation of inactivity, or both. Heirs follow the unlock procedure documented on [`/trove/heirs`](/trove/heirs).

### Can Trove be used by collectors or institutions?
Yes. Trove Pro supports insurance-friendly exports, provenance trails, and institutional handoff.

> Full FAQ on [`/trove/faq`](/trove/faq).

---

## Read next

- [Zero-knowledge in plain English](/trove/zero-knowledge)
- [Heirs](/trove/heirs)
- [Security](/trove/security)
- [ALVED](/alved)
