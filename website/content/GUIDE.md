# Product Guides — Browse by Interest

Start here if you're **not** writing code.

---

## 🔐 Vero — Proof of Work Identity

**What:** Platform proving you've done real work (not just credentials).

**Start here:**
- `/products/vero/README.md` — What Vero is
- `/products/vero/pages/` — Public-facing copy (homepage, features, pricing, etc.)
- `/products/vero/copy/` — Reusable messaging blocks

**Questions:**
- "What can Vero do?" → See `/products/vero/pages/`
- "How should we talk about Vero?" → See `/products/vero/README.md`

---

## 🎓 RIE — Proof of Discipline Apprenticeships

**What:** Apprenticeship platform for verifying work discipline & mastery.

**Start here:**
- `/products/rie/README.md` — What RIE is
- `/products/rie/pages/` — Public-facing copy
- `/products/rie/copy/` — Messaging

---

## 📚 Trove — Credential & Knowledge Aggregation

**What:** Single portal for all your verified credentials, work history, skills.

**Start here:**
- `/products/trove/README.md` — What Trove is
- `/products/trove/pages/` — Public-facing copy
- `/products/trove/copy/` — Messaging

---

## 🤝 Shared Content

Used across all products:
- `/shared/pages/legal/` — Terms, privacy, compliance
- `/shared/README.md` — Voice & tone for all products

---

## 📋 How Content Flows

```
You write here        →    Engineers paste here        →    Website
/products/<product>/   →    /apps/marketing/src/app/   →    posthog.com
```

Engineers pull copy from this folder and add it to the live website. You stay here. ✅

---

## ⚡ Quick Tasks

**"I want to update the Vero homepage copy"**
→ Edit `/products/vero/pages/home.md`

**"I need to write a blog post about RIE"**
→ Add to `/products/rie/blog/my-post.md`

**"The SEO title is wrong"**
→ Fix in `/products/<product>/seo/metadata.md`

**"We're launching a new feature"**
→ Add to `/products/<product>/pages/features.md` with `(coming Q3 2026)` if not live yet

---

## 🚫 Things NOT to Do

❌ Don't edit `/apps/marketing/` directly — changes belong here  
❌ Don't put images here — they go in `/apps/<product>/public/`  
❌ Don't make wild claims (check roadmap first)  
❌ Don't use: "just", "simply", "easily", "revolutionize", "disrupt"  

---

## 💬 Still Lost?

1. Read `/INDEX.md` (the main guide)
2. Check `/products/<product>/README.md` (product-specific)
3. Slack `#marketing` or ping the product owner

