import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllDocs } from "@/lib/mdx";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();
  const docs = await getAllDocs();

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is an AI-powered financial operating system built by ${siteConfig.legalName}. It helps users centralize bank accounts, track subscriptions, analyze spending behavior, generate AI-powered financial insights, and project future cash flows. Target audience: Gen Z professionals, founders, freelancers, students, remote workers.

## Key facts

- **Founded by:** ${siteConfig.founder} (${siteConfig.legalName})
- **Live URL:** ${siteConfig.url}
- **Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase (Postgres + Auth), Stripe, PostHog, Resend, Sentry, Google Gemini
- **Pricing:** Free (individuals), Pro ($9/mo or $84/yr), Team ($24/mo)
- **Security:** Read-only bank access via Plaid; AES-256 at rest; TLS 1.3 in transit; SOC 2 Type II in progress (Q3 2026); GDPR + CCPA compliant
- **Privacy:** Never sells user data. AI provider does not train on user data.

## Core features

- Unified financial dashboard (multi-account aggregation)
- AI-powered insights (plain-language summaries)
- Subscription tracker (auto-detection)
- Smart categorization (96.4% accuracy)
- Budgets, goals, financial health score (0–100)
- Reports & exports (PDF, CSV)
- Multi-currency, dark mode, mobile-first
- Audit logs, role-based access, API keys

## Financial Health Score formula

Score = (Savings Efficiency × 0.6) + (min(Growth Ratio, 1) × 40), clamped 0–100. Where Savings Efficiency = (Investments + Education + Health) / Total Expense × 100, and Growth Ratio = Growth Spend / (Food + Leisure + Travel + Utilities). 30-day rolling window.

## Documentation

${docs.map((d) => `- [${d.title}](${siteConfig.url}/docs/${d.slug}): ${d.description}`).join("\n")}

## Blog posts

${posts.slice(0, 10).map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}) (${p.date}): ${p.description}`).join("\n")}

## Contact

- General: ${siteConfig.email}
- Support: ${siteConfig.supportEmail}
- Security: security@trove.vroelabs.com
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
