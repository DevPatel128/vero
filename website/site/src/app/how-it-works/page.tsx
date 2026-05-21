import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { RecordCard } from "@/components/RecordCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SignatureFlow } from "@/components/illustrations/SignatureFlow";
import { EscrowFlow } from "@/components/illustrations/EscrowFlow";
import { PhoneMockup } from "@/components/illustrations/PhoneMockup";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a Vero record is created: apply, do the work, both parties sign, the record is minted, chained, and yours forever.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "01",
    title: "Apply or get matched",
    body: "Workers browse small, real, local work — apprenticeships, gigs, repair calls, shifts. Businesses post a brief or request a specific verified worker. No bidding war.",
    detail: "Matches are filtered by neighbourhood, category, time window, and what is genuinely in scope for a worker’s standing today.",
  },
  {
    n: "02",
    title: "Scope is agreed in writing",
    body: "Before work starts, both sides agree on what counts as completion. That clarity is what makes the later signature meaningful.",
    detail: "Escrow on paid work is funded at this point. The worker can see the money is real. The client knows it is held safely.",
  },
  {
    n: "03",
    title: "The work happens",
    body: "In a kitchen, a café, a home, a workshop, a desk. People show up. The hours pass. The job ends.",
    detail: "If something goes wrong, the dispute path is well-lit. Most things never reach it.",
  },
  {
    n: "04",
    title: "Both parties sign",
    body: "Worker confirms completion. Client confirms completion. Both signatures are required. Neither side can sign alone.",
    detail: "Each signature is cryptographic and tied to the verified identity on each account. The platform does not sign on anyone’s behalf.",
  },
  {
    n: "05",
    title: "The record is minted",
    body: "A small, signed document is created. It links to the record before it for that worker. It cannot be edited after the fact.",
    detail: "The worker chooses whether the record is public, shared, or private. The record is exportable and portable. It is theirs.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-16">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionTitle>Small on the surface. Serious underneath.</SectionTitle>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionLead>
                Five steps. Two signatures. One record. Vero is built so the platform
                cannot quietly help or harm any worker&apos;s history — the rules are the
                same for everyone, including us.
              </SectionLead>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </Section>

      <Section tone="warm" className="!py-12">
        <Reveal>
          <Eyebrow>The signature</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle className="!text-2xl md:!text-4xl">
            Two parties. One artefact. Both required.
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <SignatureFlow className="mx-auto max-w-4xl" />
        </Reveal>
      </Section>

      <Section className="!py-16">
        <Stagger as="ol" className="space-y-14" stagger={0.08}>
          {steps.map((s) => (
            <StaggerItem
              key={s.n}
              as="li"
              className="grid gap-8 border-t border-ink-200 pt-10 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tightish text-ink-900">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-9 space-y-4">
                <p className="text-lg leading-relaxed text-ink-700">{s.body}</p>
                <p className="text-sm leading-relaxed text-ink-500">
                  <span className="font-medium uppercase tracking-[0.18em] text-ink-400">
                    Detail
                  </span>{" "}
                  · {s.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="warm">
        <Reveal>
          <Eyebrow>Escrow flow</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>Funded. Held. Released — on the record.</SectionTitle>
        </Reveal>
        <Reveal delay={0.15} className="mt-12">
          <EscrowFlow className="mx-auto max-w-4xl" />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>What a record looks like</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle>A small thing, made to last.</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLead>
            The cards below are illustrative of the shape. Each record carries the
            verifier, the date, both signatures, an optional measurable detail, and a
            chain reference to the record that came before it.
          </SectionLead>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          <StaggerItem>
            <RecordCard
              category="Apprenticeship"
              title="Three days assisting a stylist in HSR"
              verifier="Verified by Lila T., owner"
              date="May 2026"
              signers={[
                { initials: "LT", role: "Verifier" },
                { initials: "AS", role: "Subject" },
              ]}
              metric={{ value: "24 hrs", label: "0 missed shifts" }}
            />
          </StaggerItem>
          <StaggerItem>
            <RecordCard
              category="Repair"
              title="Tap replacement · Koramangala · 2BHK"
              verifier="Verified by Mr. Bhat"
              date="May 2026"
              signers={[
                { initials: "RB", role: "Client" },
                { initials: "VK", role: "Worker" },
              ]}
              metric={{ value: "₹650", label: "Released from escrow" }}
            />
          </StaggerItem>
          <StaggerItem>
            <RecordCard
              category="Design"
              title="Menu refresh for Electronic City bakery"
              verifier="Verified by Bake & Co."
              date="May 2026"
              signers={[
                { initials: "BC", role: "Client" },
                { initials: "PD", role: "Worker" },
              ]}
            />
          </StaggerItem>
        </Stagger>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
                Begin a record that compounds.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-xl text-ink-300">
                We open in Bengaluru in 2027 — exact date to be announced. Join the
                waitlist and you will get your queue position and a personal referral
                link.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" size="lg">
              Join the waitlist
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

