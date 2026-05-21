import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Why now",
  description:
    "Three shifts make Vero possible now: a credential crisis on existing platforms, India's verified-identity infrastructure, and the rise of small, local work.",
  alternates: { canonical: "/why-now" },
};

const shifts = [
  {
    year: "Now",
    title: "A credential crisis",
    body: "Social platforms have made it cheap to claim, expensive to verify. Hiring managers are losing time to fraudulent resumes and AI-written portfolios. The market wants proof, not posts.",
  },
  {
    year: "Now",
    title: "Verified identity, in India, in minutes",
    body: "India's digital identity stack — Aadhaar-linked verification, DigiLocker, e-sign — is now mature enough to make per-worker verification fast, lawful, and low-friction. The tooling that used to take a quarter to build is available off the shelf.",
  },
  {
    year: "Now",
    title: "The rise of small, local work",
    body: "Cafés, studios, repair shops, households and SMBs are the silent majority of Indian work. They cannot afford bad hires and they are underserved by enterprise tools. A platform that respects small work and treats it as a real record finally has a home.",
  },
  {
    year: "Soon",
    title: "Portable credentials across the stack",
    body: "Verifiable Credentials and signed records are moving from research to deployment. The work you do on Vero is designed to be readable by the next decade of work apps — not trapped behind a login.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Why now</Eyebrow>
        <SectionTitle>Three shifts made this possible.</SectionTitle>
        <SectionLead>
          A trust infrastructure for real work could not have shipped five years ago. Today, three things have changed. None of them by themselves; all of them together.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!py-16">
        <ol className="space-y-12">
          {shifts.map((s, i) => (
            <li
              key={s.title}
              className="grid gap-6 border-t border-ink-200 pt-8 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Shift {i + 1} · {s.year}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-700">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              The window is now. We are building inside it.
            </h2>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <LinkButton href="/waitlist" size="lg">Join the waitlist</LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}

