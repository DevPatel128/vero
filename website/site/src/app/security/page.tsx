import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Vero treats security as the substrate, not a feature. A short public statement of our posture: signed records, encryption-at-rest, no biometric retention, responsible-disclosure path.",
  alternates: { canonical: "/security" },
};

const posture = [
  {
    h: "Records are signed and chained",
    b: "The launch product is designed so every record carries two signatures and references the record before it on the same worker, making tampering detectable.",
  },
  {
    h: "Data is encrypted in transit and at rest",
    b: "All traffic to this site is served over TLS. Encryption at rest and key management for the launch product are being designed; we will publish specifics once they are implemented, not before.",
  },
  {
    h: "Identity verified, biometrics not stored",
    b: "The launch product is designed so that we retain a verification result, not the underlying scans or biometric data. Identity verification is not live yet.",
  },
  {
    h: "No card data on our servers",
    b: "Payments are not live. When they launch, they will be processed by a regulated Indian payment provider and we will not handle raw card numbers.",
  },
  {
    h: "Audit log",
    b: "The launch product is designed to record every trust-affecting action (sign, dispute outcome, account suspension) in an append-only log that internal operators cannot edit.",
  },
  {
    h: "Compliance with India's DPDP Act 2023",
    b: "The waitlist collects consent before storing your details. Access, correction, erasure and grievance requests are handled through the contact details on our legal pages.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Security</Eyebrow>
        <SectionTitle>Security is the substrate, not a feature.</SectionTitle>
        <SectionLead>
          A plain-language statement of the choices we make. Vero is pre-launch: only the waitlist is live today, and items marked as designed describe what the launch product is built to do. The vendors that process waitlist data are listed on our sub-processors page.
        </SectionLead>
      </Section>

      <Section tone="warm">
        <div className="grid gap-6 md:grid-cols-2">
          {posture.map((p) => (
            <div
              key={p.h}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card"
            >
              <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                {p.h}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                {p.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Reporting a vulnerability</Eyebrow>
            <SectionTitle className="!text-3xl md:!text-4xl">
              Found something? Tell us first.
            </SectionTitle>
          </div>
          <div className="md:col-span-7 prose-vero space-y-5">
            <p>
              We welcome responsible disclosure. If you believe you have found a security issue in Vero, please report it before publishing.
            </p>
            <p>
              Email <a className="underline decoration-accent underline-offset-4" href={`mailto:${site.contact.security}`}>{site.contact.security}</a>.
              We acknowledge reports within two business days and aim for a fix or mitigation within thirty days for confirmed issues.
            </p>
            <p>
              We do not currently offer a public bounty. We will recognise contributions in a Hall of Fame after launch and discuss bounties as we mature.
            </p>
            <LinkButton href="/legal/responsible-disclosure" variant="secondary">
              Read the full policy
            </LinkButton>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter md:text-5xl">
              A record worth carrying needs a platform worth trusting.
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
