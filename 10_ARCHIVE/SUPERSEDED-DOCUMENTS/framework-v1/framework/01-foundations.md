# 01 — Foundations

The framework rests on six beliefs. If you reject any of them, the framework will feel like overkill and you should not use it.

## 1. Multi-product monorepos compound
Three products in one repo with shared tokens, types, and CI are cheaper to maintain than three repos. Cross-product features (composed identity, shared trust, joint analytics) become trivial. The cost is discipline — every change has more readers.

## 2. Copy lives separate from code
Engineers should not write marketing copy. Marketers should not edit `.tsx`. The framework enforces a `/website/<product>/` folder of plain Markdown that engineers pull into `/apps/marketing/`. This split saves a lot of fights and lets non-technical contributors operate in their own room.

## 3. AI agents need context, not cleverness
Agents perform poorly when they have to infer the product's brand, tone, philosophy, and architecture from code alone. They perform well when given a structured, single-purpose-per-file context pack. We codify this as the 21-file pack.

## 4. Trust is a non-functional requirement
For products that touch identity, payments, value, health, or work — trust is the moat. The framework treats security, compliance, accessibility, and performance as gate-level concerns. Not "nice to have".

## 5. Documentation depth is a multiplier
README.md + CLAUDE.md per folder feels excessive on day 1. By day 90, an engineer or agent can land in any folder and become productive in 10 minutes. That compounding is the framework's quietest superpower.

## 6. International from day 1
Even an India-first product should be designed to launch in another region without rewriting policy, copy, or controls. The compliance matrix is a list of switches, not a rewrite plan. The framework forces this thinking early.

---

## Anti-patterns the framework rejects

- **Hand-built per-product setups** that drift apart.
- **Monolithic `docs/` folders** that nobody reads.
- **One README to rule them all** — readers tune it out.
- **Inline brand copy in code** — non-technical contributors are blocked.
- **Compliance as an afterthought** — by the time it's needed, it's a rewrite.
- **AI agents as "smart enough to figure it out"** — they aren't; document the contract.

## What the framework does **not** do

- Pick a programming language for you. It assumes TypeScript by default but only weakly.
- Pick a database. It assumes Postgres + Supabase by default but weakly.
- Tell you what your product is. That comes from the research prompt + your founders.
- Replace counsel. The compliance matrix is operational; it is not legal advice.

## When **not** to use this framework

- You have one product and no plans for a second.
- You ship copy + code together by design (e.g., a docs site is the product).
- Your audience does not span jurisdictions and never will.
- You don't use AI agents and don't plan to.

