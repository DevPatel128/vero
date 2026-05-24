import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeadline, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Why now — Vero",
  description:
    "India has 15 million freelancers, the world's most advanced digital identity stack, and a credential crisis driven by AI-generated portfolios. The window to fix this is now.",
  alternates: { canonical: "/why-now" },
};

export default function WhyNowPage() {
  return (
    <>
      {/* Header */}
      <Section className="!pt-24 !pb-16">
        <div className="max-w-[56ch]">
          <Reveal>
            <Eyebrow>Why now</Eyebrow>
            <SectionHeadline className="mt-3">
              Three things changed. All at once. Right now.
            </SectionHeadline>
            <SectionLead>
              A platform like Vero could not have been built five years ago. The
              identity infrastructure did not exist. The problem was not visible
              enough. The tools were not ready. Today, all three have changed — and
              they changed at the same time.
            </SectionLead>
          </Reveal>
        </div>
      </Section>

      {/* Stats strip */}
      <Section tone="raised" rule="bottom">
        <Stagger as="ul" className="grid gap-y-6 gap-x-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {stats.map((s) => (
            <StaggerItem as="li" key={s.label} className="border-t border-line-faint pt-6">
              <p className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-tighter text-accent">
                {s.value}
              </p>
              <p className="mt-3 text-body text-ink-1">{s.label}</p>
              <p className="mt-1 font-mono text-caption text-ink-3">{s.source}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Three shifts */}
      <Section tone="base" rule="bottom">
        <Stagger as="ol" className="space-y-0">
          {shifts.map((s, i) => (
            <StaggerItem
              as="li"
              key={s.title}
              className="grid gap-8 border-t border-line-faint py-14 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-caption text-accent">
                  Shift {i + 1}
                </span>
                <p className="mt-2 font-mono text-micro text-ink-3">{s.timing}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-h3 font-medium leading-snug tracking-tightish text-ink-0">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-lead text-ink-1">{s.body}</p>
                {s.detail && (
                  <p className="mt-4 max-w-[62ch] text-body text-ink-2">{s.detail}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* What this creates */}
      <Section tone="raised" rule="bottom">
        <Reveal>
          <Eyebrow>What this adds up to</Eyebrow>
          <SectionHeadline className="mt-3">
            The window is now. We are building inside it.
          </SectionHeadline>
          <SectionLead>
            India has the largest pool of unverified talent in the world and the
            infrastructure to finally do something about it. The market is ready.
            The tools exist. The need is urgent. Vero is the platform built for
            this exact moment.
          </SectionLead>
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.07}>
          {implications.map((imp) => (
            <StaggerItem
              as="li"
              key={imp.title}
              className="border border-line-faint p-7 transition-colors hover:border-line"
            >
              <h3 className="font-display text-h5 font-medium tracking-tightish text-ink-0">
                {imp.title}
              </h3>
              <p className="mt-3 text-body text-ink-1">{imp.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA */}
      <Section tone="inverse">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-balance text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.06] tracking-tighter text-ink-inverse">
                The window is open. We are building inside it.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" variant="inverse" size="lg">
              Join the waitlist
            </LinkButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

const stats = [
  {
    value: "15M+",
    label: "Freelancers in India — second largest pool in the world",
    source: "NASSCOM / India Staffing Federation",
  },
  {
    value: "23.5M",
    label: "Platform gig workers expected by 2030",
    source: "NITI Aayog, 2022",
  },
  {
    value: "1.4B",
    label: "Aadhaar enrollments — identity verification now costs almost nothing",
    source: "UIDAI, 2024",
  },
  {
    value: "3 in 5",
    label: "Job applications in India contain at least one false or embellished claim",
    source: "AuthBridge Annual Screening Report",
  },
];

const shifts = [
  {
    timing: "Happening now",
    title: "AI has made the credential crisis visible — and urgent.",
    body: "For the last decade, credential fraud was a quiet problem. A faked resume here, an exaggerated portfolio there. In 2024, AI changed the scale of the problem overnight.",
    detail:
      "Anyone can generate a polished case study, a convincing work sample, or a fictional project history in minutes. Hiring managers know this. The result is that even genuine portfolios are viewed with suspicion — and talented people without strong networks get dismissed faster than ever. The problem is not going away. It is accelerating.",
  },
  {
    timing: "Now ready",
    title: "India's digital identity infrastructure is mature enough to build on.",
    body: "Five years ago, verifying someone's identity quickly, cheaply, and legally in India required months of work and expensive third-party integrations. Today, that infrastructure is off the shelf.",
    detail:
      "Aadhaar-linked verification, DigiLocker for document access, and e-sign have been deployed at a scale no other country has matched. A worker in Bengaluru can verify their identity on their phone in under three minutes. That changes what is possible for a platform like Vero — and it changes it now, not in five years.",
  },
  {
    timing: "Growing fast",
    title: "India's gig economy is the largest untapped trust problem in the world.",
    body: "India has 15 million freelancers and over 7 million platform gig workers today. By 2030, that number is expected to triple. Almost none of this workforce has a verified track record.",
    detail:
      "Cafés, repair shops, households, studios, and SMBs across India hire informally every day. They get burned by bad hires. Workers take jobs for clients who disappear without paying. Both sides need a system they can trust — and no one has built it for this market yet.",
  },
  {
    timing: "Coming soon",
    title: "Portable credentials are about to become the standard everywhere.",
    body: "The work you do on Vero is designed to be readable outside Vero. Verifiable credentials, signed records, and portable work histories are moving from research into production across the tech industry.",
    detail:
      "Vero is building for the moment those standards arrive — so that the record you build today is not locked to this platform but travels with you into whatever comes next.",
  },
];

const implications = [
  {
    title: "For workers: the first verifiable track record.",
    body: "For the first time, a carpenter in Whitefield and a designer in Koramangala can build a work history that speaks for itself — not just a profile that claims things.",
  },
  {
    title: "For businesses: a verified pool from day one.",
    body: "Instead of screening a hundred unverified applications, businesses on Vero start with a pool whose history is already signed and legible.",
  },
  {
    title: "For India: trust infrastructure that scales.",
    body: "The credential gap is not just an individual problem. It is an economic one. Talent goes unrecognised. Bad hires cost money. Vero is building the layer that fixes this.",
  },
];
