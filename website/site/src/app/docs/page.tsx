import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Vero public documentation for the record model, waitlist, trust posture, security, and future API surfaces.",
  alternates: { canonical: "/docs" },
};

const docs = [
  { label: "How records work", href: "/how-it-works" },
  { label: "Trust model", href: "/trust" },
  { label: "Security posture", href: "/security" },
  { label: "API status", href: "/docs/api" },
  { label: "Responsible disclosure", href: "/legal/responsible-disclosure" },
  { label: "Privacy notice", href: "/legal/privacy" },
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Docs</Eyebrow>
        <SectionTitle>Public documentation, before the API opens.</SectionTitle>
        <SectionLead>
          Vero is pre-launch. These docs explain the public surfaces that exist now
          and the records/API direction without exposing unfinished endpoints.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-ink-100 bg-paper p-6 text-base font-medium text-ink-900 hover:shadow-card"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
