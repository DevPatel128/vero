import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";
import { EcosystemConstellation } from "@/components/illustrations/EcosystemConstellation";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "The ecosystem",
  description:
    "Vero is the first surface of a longer thesis at VROE Labs. Two more products are being built on the same shared protocol - quietly, in the background.",
  alternates: { canonical: "/ecosystem" },
};

const principles = [
  {
    h: "One protocol, many surfaces",
    b: "Vero and what comes next emit records in the same open format. A credential you build in one is readable by the others.",
  },
  {
    h: "User owns the record",
    b: "Records belong to the person they describe, not the platform that hosts them. Every record is exportable in a portable, signed format.",
  },
  {
    h: "Built to be verified, not trusted",
    b: "Anyone holding the public key can verify a signature. Anyone holding the chain can check continuity. The platform is not a privileged party.",
  },
  {
    h: "Local before global",
    b: "We open in one city. We expand only when the trust model holds. Depth in a place beats breadth across a map.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-10">
        <Reveal>
          <Eyebrow>{site.parent} · Long-term vision</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Vero is the first move. Not the last.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLead>
            We are building a small family of products that share one shape underneath.
            Vero is the first to ship. Two more are taking form in the background.
          </SectionLead>
        </Reveal>
      </Section>

      {/* THE HINT - the image does the talking */}
      <Section tone="warm" className="!py-16">
        <Reveal>
          <Eyebrow>What is being built</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tighter text-ink-900 md:text-5xl">
            One protocol. Three surfaces. Quietly connected.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <EcosystemConstellation className="mx-auto" />
        </Reveal>

        <Reveal delay={0.25} className="mt-12 flex justify-center">
          <p className="max-w-xl text-center text-base leading-relaxed text-ink-500">
            We are not announcing the others today. We will, when each is ready to be
            taken seriously. The shape of a Vero record is the shape they will use.
          </p>
        </Reveal>
      </Section>

      {/* Principles */}
      <Section>
        <Reveal>
          <Eyebrow>How we make decisions</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Four principles that shape every product.</SectionTitle>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.1}>
          {principles.map((p) => (
            <StaggerItem
              key={p.h}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card transition-shadow duration-300 hover:shadow-lift"
            >
              <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                {p.h}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{p.b}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Quiet protocol note - ALVED folded in, not announced */}
      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>The substrate</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle className="!text-3xl md:!text-4xl">
                A shared, open format underneath.
              </SectionTitle>
            </Reveal>
          </div>
          <Reveal
            delay={0.1}
            className="md:col-span-7 prose-vero space-y-5"
          >
            <p>
              Each Vero record carries the subject, the surface, the category, the
              timestamp, the verifier, and the cryptographic signatures of the parties
              involved. Records are chained by hash, so the order and content of a
              person&apos;s history cannot be quietly rewritten.
            </p>
            <p>
              {site.parent} maintains the reference implementation. The specification is
              meant to outlive any single product - including ours. Other companies will
              be able to read records, issue records, and verify chains without asking
              our permission.
            </p>
            <p>
              We are not making a marketing event out of it. The protocol earns the right
              to a name when it has earned the right to be relied on. For now it is the
              ground the products stand on.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Honest closing note */}
      <Section>
        <Reveal>
          <div className="prose-vero max-w-prose">
            <Eyebrow>Why share this now</Eyebrow>
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
              A small note on the long arc.
            </h2>
            <p>
              We are pre-launch. Vero is the first product to ship, and we are honest
              about that. The two surfaces in the constellation above are not live, and
              we will not pretend otherwise.
            </p>
            <p>
              We are sharing the shape, not the features. The shape is what makes Vero
              worth building first - it is the same shape the rest of the family will
              use. The protocol is one. The products will be three.
            </p>
            <p>
              If you join Vero now, the credentials you build will be readable by the
              products that come next - without re-onboarding, without re-verifying, and
              without surrendering ownership of your record to any one company.
            </p>
            <p>That is the bet. That is what {site.parent} is building.</p>
          </div>
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
                The first record. The longest carry.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" size="lg">
              Begin with Vero
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

