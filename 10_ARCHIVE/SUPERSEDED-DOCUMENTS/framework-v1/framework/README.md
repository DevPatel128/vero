# The VROE Labs Framework

> A reusable framework for building **enterprise-grade, AI-friendly, multi-product** monorepos. Born from VROE Labs (Vero · RIE · Trove · ALVED). Generalized so anyone can apply it to any product line.

This folder contains:
- The **patterns** that make the framework work (`01–06`).
- The **two prompts** that drive the build (research / MVP) in `prompts/`.
- The **templates** you copy when you start a new product (`templates/`).

If you adopt this framework, you get:
- A consistent monorepo that AI agents can navigate without hand-holding.
- A copy → code separation that lets non-technical and technical teammates work in parallel.
- Compliance scoped per region by default.
- A reusable design system + token contract across every surface.
- Per-product context packs that future you (and future agents) will love.

---

## The framework in one diagram

```
                          ┌────────────────────────────┐
                          │       MASTER_PROMPT        │
                          │  (one prompt, every step)  │
                          └──────────────┬─────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
   ┌──────────▼─────────┐    ┌───────────▼───────────┐   ┌──────────▼─────────┐
   │  Deep Research     │    │   Framework Patterns  │   │  Build Plan        │
   │  (idea → spec)     │    │   in `framework/`     │   │  (research → MVP)  │
   └────────────────────┘    └───────────────────────┘   └────────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
   ┌──────────▼────────┐    ┌────────────▼────────────┐   ┌────────▼────────┐
   │  /apps/<product>  │    │ /apps/<product>/docs/   │   │  /website/      │
   │   (code)          │    │ context-pack/ (21 files)│   │  <product>/     │
   │                   │    │                         │   │  (copy)         │
   └───────────────────┘    └─────────────────────────┘   └─────────────────┘
              │                          │                          │
              └──────────────────────────┴──────────────────────────┘
                                         │
                          ┌──────────────▼─────────────┐
                          │  /docs/COMPLIANCE.md       │
                          │  Global compliance matrix  │
                          └────────────────────────────┘
```

## Files in this folder

| File                                  | Purpose                                                      |
| ------------------------------------- | ------------------------------------------------------------ |
| `README.md` (this file)               | Map                                                          |
| `01-foundations.md`                   | The principles behind the framework                          |
| `02-context-pack-pattern.md`          | The 21-file context-pack pattern                             |
| `03-readme-claudemd-pattern.md`       | README.md + CLAUDE.md per folder; max-depth rule             |
| `04-independent-folders-pattern.md`   | Why apps + website + packages + docs are separate            |
| `05-compliance-pattern.md`            | Region-aware compliance, controls map                        |
| `06-quality-bar.md`                   | The Apple-grade quality bar                                  |
| `prompts/research-mvp.md`             | The deep research prompt (verbatim from the founder brief)   |
| `prompts/mvp-build.md`                | The MVP build prompt (verbatim from the founder brief)       |
| `templates/context-pack/`             | Copyable 21-file scaffold for a new product                  |
| `templates/website/`                  | Copyable marketing-folder scaffold for a new product         |

## How to use the framework for a new product

1. Pick a product slug (e.g., `aria`).
2. Create `apps/aria/`, `apps/aria/docs/context-pack/`, `website/aria/` from `templates/`.
3. Run the **research prompt** on the founder's raw idea → produces the strategic spec.
4. Fill the context pack with the spec.
5. Run the **MVP prompt** with the spec inputs → scaffolds the actual app.
6. Wire it into the monorepo (turbo + vercel + ports + DNS).
7. Update `docs/COMPLIANCE.md` if new regions or sensitive data classes are introduced.
8. Update `docs/ARCHITECTURE.md` to reflect the new product in the topology.

## How the framework treats AI agents

Agents are first-class readers. Every folder has a `README.md` (for humans) and a `CLAUDE.md` (for agents). Context packs are written so a cold agent can become productive in one read.

The framework lets you mix:
- **Claude** (Code, agents, API).
- **Cursor / Codex.**
- **Gemini.**
- **Antigravity / Paperclip.**

Each will land on the same `CLAUDE.md` + context pack and behave consistently.

## Compliance posture

The framework requires `docs/COMPLIANCE.md` to exist + to be referenced from every product CLAUDE.md. Marketing copy with legal weight (PII, payments, identity, employment, health, children, inheritance) is gated by the compliance matrix.

