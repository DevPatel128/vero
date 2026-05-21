import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press kit for Vero - boilerplate, founder bios, logo lockups, screenshots. Press contact: press@vero.app.",
  alternates: { canonical: "/press" },
};

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Press</Eyebrow>
        <SectionTitle>Use anything below. Credit appreciated.</SectionTitle>
        <SectionLead>
          For interviews, deeper conversations, or to request high-resolution assets, write to{" "}
          <a className="underline decoration-accent underline-offset-4" href={`mailto:${site.contact.press}`}>
            {site.contact.press}
          </a>
          .
        </SectionLead>
      </Section>

      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Boilerplate</Eyebrow>
            <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
              One paragraph
            </h2>
          </div>
          <div className="md:col-span-8 prose-vero">
            <p>
              Vero is a verified proof-of-work identity platform, opening in Bengaluru in 2027 (exact date to be announced - follow our socials). Each job a professional completes becomes a signed, chained record on their profile - jointly signed by the professional and the person who hired them, tamper-evident, exportable, and portable. Professionals join free. Vero is a product by VROE Labs.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Short copy</Eyebrow>
            <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
              One sentence
            </h2>
          </div>
          <div className="md:col-span-8 prose-vero">
            <p>
              Vero turns every job you complete into a verified record, signed by you and the person who hired you.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Facts</Eyebrow>
            <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
              For fact-checking
            </h2>
          </div>
          <ul className="md:col-span-8 space-y-3 text-base leading-relaxed text-ink-700">
            <li>
              <strong className="text-ink-900">Company:</strong> VROE Labs
            </li>
            <li>
              <strong className="text-ink-900">Product:</strong> Vero
            </li>
            <li>
              <strong className="text-ink-900">Protocol:</strong> ALVED (Authentic Ledger of Validated Evolution Data)
            </li>
            <li>
              <strong className="text-ink-900">Headquarters:</strong> Bengaluru, India
            </li>
            <li>
              <strong className="text-ink-900">Launch:</strong> 2027, Bengaluru - exact date to be announced (follow our socials) - Whitefield, HSR Layout, Koramangala, Sarjapur, Electronic City
            </li>
            <li>
              <strong className="text-ink-900">Pricing:</strong> Professionals free. Businesses from ₹2,499/mo. Flat 5% on escrowed paid work.
            </li>
          </ul>
        </div>
      </Section>

      <Section>
        <Eyebrow>Assets</Eyebrow>
        <SectionTitle>Logos and screenshots.</SectionTitle>
        <SectionLead>
          High-resolution logo lockups (light, dark, monochrome) and product screenshots are available on request. Write to{" "}
          <a className="underline decoration-accent underline-offset-4" href={`mailto:${site.contact.press}`}>
            {site.contact.press}
          </a>
          . Pre-launch screenshots are watermarked.
        </SectionLead>
      </Section>
    </>
  );
}

