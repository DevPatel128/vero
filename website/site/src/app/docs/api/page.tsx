import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "API reference",
  description:
    "Vero API reference status. Public APIs are not open yet; the signed-record API will be documented after the Bengaluru pilot.",
  alternates: { canonical: "/docs/api" },
};

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>API reference</Eyebrow>
        <SectionTitle>The public API is not open yet.</SectionTitle>
        <SectionLead>
          Vero will expose signed record verification and export surfaces after the
          pilot proves the model. We are not publishing an API contract before the
          trust semantics are stable.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="rounded-3xl border border-ink-100 bg-paper p-8">
          <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
            Planned surfaces.
          </h2>
          <ul className="mt-6 grid gap-4 text-base text-ink-700 md:grid-cols-2">
            <li>Public record verification</li>
            <li>Signed record export</li>
            <li>Profile JSON-LD</li>
            <li>Webhook delivery logs for businesses</li>
          </ul>
          <div className="mt-8">
            <LinkButton href="/newsletter" variant="secondary">
              Get API updates
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
