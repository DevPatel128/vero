import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { InvestorRequestForm } from "@/components/InvestorRequestForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Vero is pre-launch. Materials, thesis, and traction are available on request to qualified investors.",
  alternates: { canonical: "/investors" },
};

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Investors</Eyebrow>
        <SectionTitle>
          A long-horizon bet on portable credibility.
        </SectionTitle>
        <SectionLead>
          {site.name} is the first product under {site.parent}. We are pre-launch.
          We share the thesis, structure, and traction privately with investors
          who are aligned with the long arc. Request access below.
        </SectionLead>
      </Section>

      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 prose-vero">
            <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
              What you will see
            </h2>
            <ul className="mt-4 space-y-2 text-base text-ink-700">
              <li>The deck — thesis, market, why now, why us.</li>
              <li>A walkthrough of the product in its current form.</li>
              <li>Traction details — waitlist composition, pilot conversations.</li>
              <li>The path from Vero to the broader {site.parent} stack.</li>
              <li>Use of funds + 18-month plan.</li>
            </ul>

            <h3 className="mt-10 font-display text-xl font-medium tracking-tightish text-ink-900">
              What we ask in return
            </h3>
            <p>
              We share materials with investors we have either met or who come
              warmly introduced. We respond to all serious requests within five
              business days. We do not share materials with aggregators,
              syndicates without a lead, or research firms.
            </p>

            <h3 className="mt-10 font-display text-xl font-medium tracking-tightish text-ink-900">
              Prefer email?
            </h3>
            <p>
              Write to{" "}
              <a
                className="underline decoration-accent underline-offset-4"
                href={`mailto:${site.contact.investors}`}
              >
                {site.contact.investors}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-ink-100 bg-paper p-8 shadow-card">
              <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
                Request the deck
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Tell us a little about your firm and we will send a link to the
                materials. No public download.
              </p>

              <div className="mt-8">
                <InvestorRequestForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
