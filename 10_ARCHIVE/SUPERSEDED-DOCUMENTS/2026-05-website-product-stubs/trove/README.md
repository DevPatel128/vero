# Trove — Marketing Surface

Marketing copy + SEO + AEO + LLMO assets for **Trove**, the zero-knowledge value ledger for households.

> Product brief in one line: **"Every valuable thing you own. One private vault. Heirs who can open it when it matters."**

Product context: [`/apps/trove/docs/context-pack/`](../../apps/trove/docs/context-pack/).

## Folder map

```
trove/
├── pages/
│   ├── home.md
│   ├── features.md
│   ├── how-it-works.md
│   ├── pricing.md
│   ├── for-families.md
│   ├── for-collectors.md
│   ├── heirs.md
│   ├── zero-knowledge.md
│   ├── security.md
│   ├── about.md
│   ├── contact.md
│   └── faq.md
├── copy/
├── schema/
├── seo/
├── blog/
└── assets/
```

## Pages (priority order)

| Page              | Route                       | Purpose                                                                  |
| ----------------- | --------------------------- | ------------------------------------------------------------------------ |
| Home              | `/trove`                    | What Trove is, what zero-knowledge means, who needs it                   |
| Features          | `/trove/features`           | Item capture, heirs, time-lock, insurance export, provenance trail       |
| How it works      | `/trove/how-it-works`       | Set passphrase → capture items → designate heirs → time-lock conditions  |
| For families      | `/trove/for-families`       | Persona #1: parents, multi-generation households                          |
| For collectors    | `/trove/for-collectors`     | Persona #2: art, watches, antiques, rare assets                          |
| Heirs             | `/trove/heirs`              | How heir designation works without revealing the vault while you're alive |
| Zero-knowledge    | `/trove/zero-knowledge`     | The crypto in plain English: we never see your stuff                     |
| Security          | `/trove/security`           | Vault key derivation, threat model, what we can and can't do             |
| Pricing           | `/trove/pricing`            | Freemium. Pro for >10 heirs / institutional export.                       |
| About             | `/trove/about`              |                                                                          |
| Contact           | `/trove/contact`            |                                                                          |
| FAQ               | `/trove/faq`                | Schema-wrapped                                                           |

## Voice + tone

- **Quiet, careful, grown-up.** Trove is for adults thinking about loss, legacy, succession. Tone should respect that.
- **Plain about crypto.** Zero-knowledge is the killer feature, but explain it without saying "blockchain", "decentralized", "Web3". Just: _"we cannot decrypt your vault. The math doesn't allow it. Here's why in 100 words..."_
- **No fear-mongering.** Don't sell heir designation through panic ("what happens if you die tomorrow?!"). Sell it through dignity ("when your family needs this, it'll be there").
- **No financial advice.** Trove is a vault, not an advisor.

## SEO targets (top 5)

1. _"private digital vault"_
2. _"household asset tracker"_
3. _"digital inheritance planning"_
4. _"zero-knowledge personal vault"_
5. _"family heirloom record"_

Full list in [`seo/keywords.md`](seo/keywords.md).

## Compliance notes

- **Estate / inheritance language is legally sensitive.** Trove does not produce a will. It produces a record. Make this distinction on every page that mentions heirs.
- **Cross-border inheritance laws differ.** Never write "your heirs will inherit X". Write "your designated heirs will gain access to your vault under the conditions you set".
- **Children-as-heirs requires parental controls.** See `/docs/COMPLIANCE.md` for COPPA, DPDP minor provisions.
- **Insurance export** is a feature, not a guarantee. Don't promise insurance acceptance — list it as an "export format insurers commonly accept".

## How to contribute + handoff

Same workflow as Vero / RIE. Engineer pulls into `apps/marketing/src/app/trove/<route>/page.tsx`.

