import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help",
  description:
    "Help for Vero waitlist members, workers, businesses, privacy requests, security reports, and investor or press contact.",
  alternates: { canonical: "/help" },
};

const links = [
  { label: "Waitlist questions", href: "/faq" },
  { label: "Worker basics", href: "/for-workers" },
  { label: "Business basics", href: "/for-businesses" },
  { label: "Privacy requests", href: "/legal/privacy" },
  { label: "Security reports", href: "/legal/responsible-disclosure" },
  { label: "Contact", href: "/contact" },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Help</Eyebrow>
        <SectionTitle>Start with the public answer.</SectionTitle>
        <SectionLead>
          Vero is pre-launch, so support is small and direct. Most questions route to
          the pages below. Anything sensitive should go by email.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-ink-100 bg-paper p-6 text-base font-medium text-ink-900 hover:shadow-card"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-600">
          Support email:{" "}
          <a className="underline decoration-accent" href={`mailto:${site.contact.support}`}>
            {site.contact.support}
          </a>
        </p>
      </Section>
    </>
  );
}
