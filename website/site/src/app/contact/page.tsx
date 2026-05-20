import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Vero — general, press, support, security, grievance, investors. We reply.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "General", value: site.contact.general, note: "Anything not covered below." },
  { label: "Support", value: site.contact.support, note: "Help with your account or a record." },
  { label: "Press", value: site.contact.press, note: "Bios, boilerplate, interviews." },
  {
    label: "Security",
    value: site.contact.security,
    note: "Responsible disclosure. PGP key on the security page.",
  },
  {
    label: "Grievance officer (India)",
    value: site.contact.grievance,
    note: "Statutory grievance contact under India IT Rules 2021.",
  },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Contact</Eyebrow>
        <SectionTitle>We answer the emails we receive.</SectionTitle>
        <SectionLead>
          Choose the closest channel below. Replies usually arrive within two business days. Statutory grievances are answered within fifteen days, as required.
        </SectionLead>
      </Section>

      <Section tone="warm">
        <ul className="grid gap-6 md:grid-cols-2">
          {channels.map((c) => (
            <li
              key={c.label}
              className="rounded-2xl border border-ink-100 bg-paper p-7 shadow-card"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {c.label}
              </p>
              <a
                href={`mailto:${c.value}`}
                className="mt-3 inline-block font-display text-xl font-medium tracking-tightish text-ink-900 underline decoration-ink-300 decoration-1 underline-offset-4 hover:decoration-accent"
              >
                {c.value}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {c.note}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="prose-vero max-w-prose">
          <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
            Other ways to reach us
          </h2>
          <p>
            For investors and partnerships, please use the gated request form linked from the footer. We do not publish a phone line during pre-launch. We will provide a Bengaluru office address before public launch.
          </p>
          <p>
            Press kit, boilerplate, and bios are on the{" "}
            <a href="/press" className="underline decoration-accent underline-offset-4">
              press
            </a>{" "}
            page.
          </p>
        </div>
      </Section>
    </>
  );
}
