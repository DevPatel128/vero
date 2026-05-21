import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Vero — what it is, who pays, how records work, when it launches, and where it operates.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    section: "Product",
    items: [
      {
        q: "What exactly is Vero?",
        a: "Vero is a verified proof-of-work identity platform. Every job you complete becomes a signed, chained record on your profile, jointly signed by you and the person who hired you.",
      },
      {
        q: "Is it a job board?",
        a: "No. Vero is a record-keeping and trust system. It includes a way to find local work, but the record is the product. A typical job board ends when you get the job. Vero begins there.",
      },
      {
        q: "Is it a freelance bidding marketplace?",
        a: "No. There is no race-to-the-bottom bidding. Roles are posted with a clear scope and a fair rate. Matching is filtered by neighbourhood, category, and a worker's verified standing.",
      },
    ],
  },
  {
    section: "Workers",
    items: [
      {
        q: "Do workers pay anything?",
        a: "No. Workers do not pay to use Vero, to create records, to keep records, or to export them. Workers are free, always.",
      },
      {
        q: "What does my record look like?",
        a: "A small signed document. It carries the date, category, verifier, both signatures, an optional measurable detail, and a chain reference to the record before it. Each record is exportable in a portable, signed format.",
      },
      {
        q: "Is my record public?",
        a: "It depends on the visibility flag you choose per record — public, shared, or private. Private records still count toward your standing on the platform; they are not visible publicly.",
      },
      {
        q: "Can I take my record elsewhere?",
        a: "Yes. Every record is exportable in a portable, signed format. The credentials you build on Vero can be read by other products that speak the same protocol.",
      },
    ],
  },
  {
    section: "Businesses",
    items: [
      {
        q: "How much do businesses pay?",
        a: "Plans start at free for occasional hires. The recommended plan is ₹2,499 per month, plus a flat 5% on escrowed paid work. See the full pricing page for details.",
      },
      {
        q: "Why 5% escrow?",
        a: "5% is well below the 20–30% common in the gig market. It funds escrow infrastructure, the dispute team, the identity verification step, and basic fraud cover. It does not change by category or city.",
      },
      {
        q: "Do you handle taxes?",
        a: "Prices are pre-tax. GST applies for Indian customers. Invoices, escrow receipts, and tax-compliant statements are issued automatically.",
      },
    ],
  },
  {
    section: "Trust + safety",
    items: [
      {
        q: "How do I know a worker is real?",
        a: "Workers verify their identity using government-supported digital documents before earning. Every record they hold is signed by a real client. Repeat-offender accounts are removed from the trust graph.",
      },
      {
        q: "What if there is a dispute?",
        a: "Disputes follow a documented path: evidence collected, small review team responds quickly, outcome recorded on both sides. Nothing is resolved silently.",
      },
      {
        q: "Can records be deleted?",
        a: "A worker can revoke a record's public visibility but cannot edit the underlying record. The chain remains intact. Erasure under DPDP / GDPR is honoured by anonymising the personal fields while preserving counterparty verifiability.",
      },
    ],
  },
  {
    section: "Launch",
    items: [
      {
        q: "When does Vero open?",
        a: "We are opening in Bengaluru in 2027. The exact date is to be announced — follow our socials for the call. Five neighbourhoods to start — Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City.",
      },
      {
        q: "Will Vero expand beyond Bengaluru?",
        a: "Yes — once the trust model proves itself locally. We will not expand on a schedule. We will expand when we can verify and support the next city well.",
      },
      {
        q: "How do I join early?",
        a: "Sign up for the waitlist. You will get a personal page with your queue position and a referral link. Inviting others moves you up the line.",
      },
    ],
  },
];

export default function Page() {
  // FAQ JSON-LD for AEO / LLMO
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Section className="!pt-24 !pb-12">
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle>Short answers to common questions.</SectionTitle>
        <SectionLead>
          If something is missing, write to us. We will reply, and we will add the answer here.
        </SectionLead>
      </Section>

      {groups.map((g, i) => (
        <Section key={g.section} tone={i % 2 === 0 ? "warm" : "paper"}>
          <Eyebrow>{g.section}</Eyebrow>
          <dl className="mt-8 divide-y divide-ink-200 border-y border-ink-200">
            {g.items.map((item) => (
              <div key={item.q} className="grid gap-4 py-7 md:grid-cols-12">
                <dt className="md:col-span-5 font-display text-lg font-medium tracking-tightish text-ink-900">
                  {item.q}
                </dt>
                <dd className="md:col-span-7 text-base leading-relaxed text-ink-700">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              Still have questions? Write to us.
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <LinkButton href="/contact" size="lg">Contact us</LinkButton>
            <LinkButton href="/waitlist" variant="secondary" size="lg">
              Join the waitlist
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}

