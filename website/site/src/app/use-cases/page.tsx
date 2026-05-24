import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Where Vero is useful first: apprenticeships, local hiring, repairs, creative work, and portable proof for people starting or switching careers.",
  alternates: { canonical: "/use-cases" },
};

const useCases = [
  {
    audience: "Students",
    title: "Turn first work into visible proof.",
    body: "A short apprenticeship, campus project, café shift, or weekend assignment becomes a signed record that can travel beyond one employer.",
    href: "/for-workers",
  },
  {
    audience: "Career switchers",
    title: "Build evidence in the new direction.",
    body: "Start with smaller, lower-risk work. Stack signed completions until the next hiring conversation has substance.",
    href: "/for-workers",
  },
  {
    audience: "Skilled local workers",
    title: "Make offline work legible.",
    body: "Repairs, kitchen work, beauty work, styling, delivery support, and service calls can become records a future client can inspect.",
    href: "/for-workers",
  },
  {
    audience: "SMBs",
    title: "Hire without betting on claims.",
    body: "Cafés, studios, homes, and small offices see completed work, dispute history, and repeat-client patterns before they commit.",
    href: "/for-businesses",
  },
  {
    audience: "Studios",
    title: "Keep a shared memory of trusted contributors.",
    body: "Repeat freelancers and short-term operators build a history across branches, projects, and managers.",
    href: "/for-businesses",
  },
  {
    audience: "Future platforms",
    title: "Read records without owning them.",
    body: "Exported records can be verified by systems that understand the same signed, chained format.",
    href: "/ecosystem",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Use cases</Eyebrow>
        <SectionTitle>Where proof changes the decision.</SectionTitle>
        <SectionLead>
          Vero starts where trust is local, records are missing, and both sides need a
          calmer way to know what happened before.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-paper p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-lift"
            >
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {item.audience}
              </span>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-tightish text-ink-900">
                {item.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {item.body}
              </p>
              <span className="mt-8 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                Read the fit →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Launch focus</Eyebrow>
            <SectionTitle className="!text-3xl md:!text-4xl">
              Bengaluru first. Fewer categories. Better records.
            </SectionTitle>
          </div>
          <div className="md:col-span-7 prose-vero space-y-5">
            <p>
              The first version is not a universal hiring market. It is a tighter
              proof layer for local work where verification changes the outcome.
            </p>
            <p>
              We are starting with categories where both sides already understand the
              value of a record: service work, apprenticeships, short shifts, creative
              assignments, and repeat local hiring.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <h2 className="font-display text-3xl font-medium tracking-tighter md:col-span-7 md:text-5xl">
            Join the use case you actually care about.
          </h2>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
            <LinkButton href="/waitlist?as=worker" size="lg">
              Worker waitlist
            </LinkButton>
            <LinkButton href="/waitlist?as=business" variant="secondary" size="lg">
              Business waitlist
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
