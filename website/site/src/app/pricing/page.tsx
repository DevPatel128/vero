import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Workers join free. Always. Businesses pay a simple SaaS subscription. Escrow on paid work is a flat 5% — well below the market.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    name: "Worker",
    price: "Free",
    sub: "Always free. No credit card.",
    bullets: [
      "Sign every job you complete",
      "Carry every record forward",
      "Public, shared, or private records",
      "Trust standing across categories",
      "Dispute support included",
    ],
    cta: { label: "Join as a worker", href: "/waitlist?as=worker" },
  },
  {
    name: "Business",
    price: "₹2,499",
    suffix: "/ mo",
    sub: "Recommended for SMBs",
    highlight: true,
    bullets: [
      "Unlimited roles",
      "Repeat-worker invites",
      "Priority dispute response",
      "Verified business mark",
      "Standard 5% escrow on paid work",
    ],
    cta: { label: "Join the waitlist", href: "/waitlist?as=business" },
  },
  {
    name: "Studio",
    price: "Custom",
    sub: "Higher volume",
    bullets: [
      "Multiple branches",
      "Roles + scheduling integration",
      "Workforce analytics",
      "Dedicated success contact",
      "Custom escrow terms",
    ],
    cta: { label: "Talk to founders", href: "/contact" },
  },
];

const comparison = [
  { row: "Worker fee", vero: "Free", others: "Often free, but withheld earnings" },
  { row: "Platform commission", vero: "5% escrow on paid work", others: "20–30% typical" },
  { row: "Identity verification", vero: "Included", others: "Often paid add-on" },
  { row: "Portable record", vero: "Yes — exportable, signed, yours", others: "Typically locked in-platform" },
  { row: "Trust signal", vero: "Multi-signal trust graph", others: "Single star rating" },
  { row: "Dispute path", vero: "Documented, on record", others: "Opaque or absent" },
];

const faqs = [
  {
    q: "Do workers pay anything to use Vero?",
    a: "No. We do not charge workers. Not a subscription, not a per-record fee, not a withdrawal fee. The platform is free to use, and your record is free to keep, forever.",
  },
  {
    q: "What is the 5% escrow fee for?",
    a: "It funds the escrow infrastructure, the dispute team, the identity verification step, and basic fraud cover. It is below the 20–30% common in the gig market.",
  },
  {
    q: "What about taxes?",
    a: "Prices shown are pre-tax. GST applies for Indian customers. Subscription invoices, escrow receipts, and tax-compliant statements are issued automatically.",
  },
  {
    q: "Can I cancel a business plan any time?",
    a: "Yes. Monthly plans cancel monthly. Annual plans are refunded pro-rata in the first 30 days. Your verified records and standing remain.",
  },
  {
    q: "What if I post a role and nobody takes it?",
    a: "There is no failure cost. The role simply expires. Your subscription is for access and verification, not for guaranteed hires.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Pricing</Eyebrow>
        <SectionTitle>
          Free for workers. Below-market for businesses.
        </SectionTitle>
        <SectionLead>
          We monetise the side that benefits most from verification: businesses hiring with confidence. Workers never pay.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                p.highlight
                  ? "border-accent bg-ink-950 text-paper shadow-lift"
                  : "border-ink-100 bg-paper"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent-glow px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-950">
                  Recommended
                </span>
              )}
              <h3
                className={`font-display text-2xl font-medium tracking-tightish ${
                  p.highlight ? "text-paper" : "text-ink-900"
                }`}
              >
                {p.name}
              </h3>
              <p
                className={`mt-1 text-xs uppercase tracking-[0.16em] ${
                  p.highlight ? "text-accent-glow" : "text-ink-500"
                }`}
              >
                {p.sub}
              </p>
              <p
                className={`mt-6 font-display text-3xl ${
                  p.highlight ? "text-paper" : "text-ink-900"
                }`}
              >
                {p.price}
                {p.suffix && (
                  <span className="ml-1 text-base text-ink-400">{p.suffix}</span>
                )}
              </p>
              <ul
                className={`mt-6 space-y-3 text-sm ${
                  p.highlight ? "text-ink-200" : "text-ink-700"
                }`}
              >
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className="text-accent-glow">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <LinkButton
                href={p.cta.href}
                size="md"
                variant={p.highlight ? "primary" : "secondary"}
                className="mt-8"
              >
                {p.cta.label}
              </LinkButton>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>How we compare</Eyebrow>
        <SectionTitle>Same job, different posture.</SectionTitle>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="py-4 pr-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
                  Item
                </th>
                <th className="py-4 pr-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  Vero
                </th>
                <th className="py-4 pr-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
                  Typical gig platform
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r) => (
                <tr key={r.row} className="border-b border-ink-100">
                  <td className="py-5 pr-4 font-display text-base text-ink-900">
                    {r.row}
                  </td>
                  <td className="py-5 pr-4 text-base text-ink-800">{r.vero}</td>
                  <td className="py-5 pr-4 text-sm text-ink-500">{r.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="warm">
        <Eyebrow>Pricing FAQ</Eyebrow>
        <SectionTitle>What people ask before joining.</SectionTitle>

        <dl className="mt-10 divide-y divide-ink-200 border-y border-ink-200">
          {faqs.map((f) => (
            <div key={f.q} className="grid gap-4 py-7 md:grid-cols-12">
              <dt className="md:col-span-5 font-display text-lg font-medium tracking-tightish text-ink-900">
                {f.q}
              </dt>
              <dd className="md:col-span-7 text-base leading-relaxed text-ink-700">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              Reserve your spot before Bengaluru opens.
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <LinkButton href="/waitlist" size="lg">Join the waitlist</LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}

