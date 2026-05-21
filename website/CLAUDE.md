# CLAUDE.md — Agent Contract for `/website`

This file is loaded by Claude / Cursor / Gemini / Codex agents when they work inside `/website`. Read it before editing anything.

> If anything below conflicts with `/AGENTS.md`, `/CLAUDE.md`, or the product-specific context pack at `/apps/<product>/docs/context-pack/`, **the more specific file wins**. The chain is: root → product app → product context pack → this file.

---

## Mission

This folder produces the **marketing surface** for VROE Labs. Your job, as an agent, is:

1. Write or edit Markdown / MDX copy that another agent (or engineer) will paste into `/apps/marketing/src/app/...`.
2. Keep the voice **calm, premium, trust-first** — the kind of writing Stripe, Linear, Notion, Patagonia would publish. Never Marketing Speak (capital M).
3. Optimize copy for four channels in this priority order: **human readability → SEO → AEO → LLMO**. Never sacrifice the first for the others.

---

## Hard rules

1. **Never overpromise.** If a feature is post-launch, label it `(coming Q3 2026)` or similar. We are pre-launch infrastructure; trust is the product.
2. **Never invent product behavior.** If the brief or context pack doesn't say it, don't ship it. Ask. Use the context pack at `/apps/<product>/docs/context-pack/` as the source of truth for product behavior.
3. **Never store binaries here.** Image / video assets go in `/apps/<product>/public/`. This folder is text + structured data only.
4. **Never touch `/apps/marketing/src/...` from inside this folder.** This folder is the input. Engineer pulls it out.
5. **Never use the words** _just, simply, easily, effortlessly, revolutionize, disrupt, AI-powered_ unless the context pack explicitly tells you to. They erode trust.
6. **Comply with every jurisdiction** listed in [`/docs/COMPLIANCE.md`](../docs/COMPLIANCE.md). When in doubt, run the claim past the compliance matrix.
7. **Respect product separation.** Vero copy lives in `website/vero/`. Trove copy in `website/trove/`. Never write Vero copy into the Trove folder, even if the products share the ALVED protocol.

---

## Workflow (every task)

1. **Load context (in this exact order):**
   - `/AGENTS.md`
   - `/CLAUDE.md`
   - `/website/CLAUDE.md` (this file)
   - `/apps/<product>/docs/context-pack/00-project-overview.md`
   - `/apps/<product>/docs/context-pack/01-product-philosophy.md`
   - `/apps/<product>/docs/context-pack/02-brand-system.md`
   - `/apps/<product>/docs/context-pack/14-copywriting-tone.md`
   - The specific files relevant to the page (see "File map" in the product's context-pack README)
2. **Confirm the page exists** in `website/<product>/pages/` or create it from the template at `website/_framework/templates/page.md`.
3. **Write the copy** in Markdown with frontmatter.
4. **Generate the JSON-LD** if the page warrants it (Organization, SoftwareApplication, Article, FAQ, BreadcrumbList).
5. **Update the SEO assets** in `website/<product>/seo/` (title, description, keyword target).
6. **Run the self-checks** below.

## Self-checks before you say "done"

- Headline is ≤ 60 chars, descriptive, search-friendly, not jargon-y.
- Meta description is 140–160 chars, summarizes the page, contains the primary keyword once.
- Every CTA matches a real route in `/apps/marketing/src/app/`.
- Every product claim maps to a roadmap milestone in `/apps/<product>/docs/context-pack/15-roadmap.md`.
- Every legal-sensitive claim (data, payments, KYC, employment, financial, health) has a corresponding entry in `/docs/COMPLIANCE.md`.
- FAQ section, if present, is wrapped in `FAQPage` JSON-LD.
- The copy passes the **paste-into-ChatGPT test**: paste the file into a fresh chat and ask "what is this product?" — the answer must be accurate.

---

## Frontmatter contract

Every Markdown copy file uses this frontmatter:

```yaml
---
slug: features
product: vero            # one of: vero | rie | trove | vroe
title: "Vero — features that build trust"
description: "Short, 140–160 char description. Primary keyword once."
ogImage: "/og/vero-features.png"
priority: 0.8            # for sitemap
changefreq: monthly      # for sitemap
publishedAt: 2026-05-19
updatedAt: 2026-05-19
schema:
  - type: SoftwareApplication
  - type: BreadcrumbList
keywords:
  - proof of work
  - apprenticeship platform
  - verified work
aeo:
  primaryQuestion: "What is Vero?"
  answer: "Vero is a verified proof-of-work identity platform..."
status: draft | review | approved | published
---
```

If you cannot fill a field, write `null` and flag it in your handoff note. Do not invent values.

---

## When you don't know

If the brief and context pack don't tell you something, the answer is one of:

1. **Ask the human.** Use the `AskUserQuestion` tool with a tight, multiple-choice question.
2. **Pull from the context pack.** Specifically `00-project-overview.md`, `01-product-philosophy.md`, `02-brand-system.md`, `14-copywriting-tone.md`.
3. **Defer.** Mark `TBD` and explain why in your handoff.

Never guess at:
- Pricing
- Launch dates
- Compliance language
- Anything legal
- Anything that mentions money, employment, identity, health, or children.

---

## Definition of done

A piece of copy is done when:

- It compiles into the `/apps/marketing` build with no warnings.
- Lighthouse on the page scores ≥ 95 on SEO, ≥ 90 on Performance.
- The page is reachable from at least one other page (no orphans).
- The page is in the sitemap.
- The page is in `apps/marketing/src/app/llms.txt` if it adds factual information about a product.
- A human reviewer signs off in PR.

---

## Last line

You are writing for a serious, calm, premium brand that competes with Stripe, Linear, Patagonia, Notion. Read every sentence twice before shipping. If anything feels noisy, it probably is — cut it.

