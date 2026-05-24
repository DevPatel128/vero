import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Get Vero build notes: signed-work infrastructure, launch updates, product decisions, and Bengaluru pilot notes from VROE Labs.",
  alternates: { canonical: "/newsletter" },
};

const issues = [
  "What we shipped",
  "What we learned from workers and businesses",
  "What changed in the trust model",
  "What is still not ready",
];

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-12">
        <Eyebrow>Newsletter</Eyebrow>
        <SectionTitle>Build notes without launch theatre.</SectionTitle>
        <SectionLead>
          A restrained update stream for people who want to follow Vero before the
          Bengaluru pilot opens.
        </SectionLead>
      </Section>

      <Section tone="warm" className="!pt-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-ink-100 bg-paper p-7 shadow-card">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-paper-warm" />}>
                <WaitlistForm />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-medium tracking-tighter text-ink-900">
              What arrives in your inbox.
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {issues.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-ink-100 bg-paper p-6 text-base text-ink-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-500">
              We use the waitlist email list for launch notes and build digests. Every
              email has an unsubscribe link. No pre-checked boxes. No borrowed lists.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
