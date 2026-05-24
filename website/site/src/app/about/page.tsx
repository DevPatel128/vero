import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vero is built by VROE Labs to repair the link between work and credibility. We are starting in Bengaluru in 2027 — exact date to be announced.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    h: "Proof before promotion",
    b: "We do not market our way around the substance. Either the platform earns the trust it asks for, or it does not.",
  },
  {
    h: "Trust before scale",
    b: "We will not pretend to launch everywhere. Density beats breadth in a trust business.",
  },
  {
    h: "Clarity before complexity",
    b: "If a feature cannot be explained in one short sentence, it is not ready.",
  },
  {
    h: "People before metrics",
    b: "We will not optimise our way into a product that is good for the dashboard and bad for the worker.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>About</Eyebrow>
        <SectionTitle>
          We are repairing the link between work and credibility.
        </SectionTitle>
        <SectionLead>
          Vero is a product by VROE Labs. We are a small team, building from Bengaluru, starting with one city and four categories of work. We would rather do one place well than every place poorly.
        </SectionLead>
      </Section>

      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>The problem we are working on</Eyebrow>
            <SectionTitle className="!text-3xl md:!text-4xl">
              Work is invisible until it is signed.
            </SectionTitle>
          </div>
          <div className="md:col-span-7 prose-vero space-y-5">
            <p>
              In most parts of the labour market, the people who get the next opportunity are the people who can prove the last one. Beginners cannot. The skilled cannot, if their work has lived in homes, kitchens, workshops, or on hard drives. And the people who do the hiring are forced to gamble on claims.
            </p>
            <p>
              Vero is a small intervention in that loop. Each completed job becomes a signed, chained record. Workers carry their record forward. Businesses hire from a pool whose history is already proof.
            </p>
            <p>
              We are not a job board. We are not a freelance bidding pit. We are a trust infrastructure for the people who already do good work and have no easy way to show it.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>How we make decisions</Eyebrow>
        <SectionTitle>Four small commitments.</SectionTitle>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.h}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card"
            >
              <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                {v.h}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                {v.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="warm">
        <Eyebrow>The company</Eyebrow>
        <SectionTitle className="!text-3xl md:!text-4xl">
          VROE Labs.
        </SectionTitle>
        <SectionLead>
          VROE Labs is the company behind Vero. We are a long-horizon team building tools where credibility is portable across the work people do, the discipline they keep, and the value they create. Vero is the first product. Others are under construction.
        </SectionLead>

        <div className="mt-10">
          <LinkButton href="/ecosystem" variant="secondary">
            See the long-term vision
          </LinkButton>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              If any of this resonates, join early.
            </h2>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" size="lg">
              Join the waitlist
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
