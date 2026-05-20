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
    b: "Every record carries two cryptographic signatures and references the record that came before it on the same worker. Tampering is detectable. The platform cannot quietly rewrite history.",
  },
  {
    h: "Data is encrypted in transit and at rest",
    b: "TLS 1.3 everywhere. Sensitive data is encrypted at rest with industry-standard authenticated encryption. Keys are managed in a hardware-backed key management service, not in code.",
  },
  {
    h: "Identity verified, biometrics not stored",
    b: "Workers verify their identity using government-supported digital documents. We retain the verification result. We do not retain the underlying scans or biometric data.",
  },
  {
    h: "No card data on our servers",
    b: "Payments and escrow are processed by a regulated Indian payment provider. We never touch raw card numbers. PCI scope sits with the provider.",
  },
  {
    h: "Audit log",
    b: "Every trust-affecting action — sign, dispute outcome, account suspension — is recorded in an append-only log. Internal operators cannot edit history.",
  },
  {
    h: "Compliance with India's DPDP Act 2023",
    b: "Lawful basis. Consent recorded. Withdrawal of consent honoured. Data principal rights — access, correction, erasure, grievance — all supported. Grievance Officer details on the relevant legal page.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Security</Eyebrow>
        <SectionTitle>Security is the substrate, not a feature.</SectionTitle>
        <SectionLead>
          A short, plain-language statement of the choices we make. We do not list specific vendors or internal architecture publicly. We do publish what every user is entitled to expect.
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
