import type { Metadata } from "next";
import { Section, Eyebrow, SectionTitle, SectionLead } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";
import { AnnouncementCalendar } from "@/components/illustrations/AnnouncementCalendar";
import { BlurIn } from "@/components/motion/BlurIn";
import { WordReveal } from "@/components/motion/LetterSplit";
import { MaskReveal } from "@/components/motion/MaskReveal";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Vero is pre-launch. Our public launch target is 2027 in Bengaluru — exact date to be announced. Follow our socials for the call.",
  alternates: { canonical: "/status" },
};

export default function Page() {
  return (
    <>
      <Section className="!pt-24 !pb-16">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <BlurIn>
              <Eyebrow>Status</Eyebrow>
            </BlurIn>
            <h1 className="mt-2 font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
              <WordReveal text="Pre-launch. Date to be announced." />
            </h1>
            <BlurIn delay={0.2}>
              <SectionLead>
                We are not yet open to the public. The waitlist is live. The public app
                opens in {site.launchCity} in {site.launchWindow}. We will announce the
                exact date through our socials.
              </SectionLead>
            </BlurIn>

            <BlurIn delay={0.3} className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ink-100 bg-paper p-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-trust">
                  <span className="h-2 w-2 rounded-full bg-trust" />
                  Waitlist: Operational
                </span>
                <p className="mt-3 text-sm text-ink-600">
                  Sign-ups are flowing. Confirmation emails are delivering.
                </p>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-paper p-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-caution">
                  <span className="h-2 w-2 rounded-full bg-caution" />
                  Public app: TBA
                </span>
                <p className="mt-3 text-sm text-ink-600">
                  Opens in {site.launchCity} in {site.launchWindow}. Exact date to be
                  announced on our socials.
                </p>
              </div>
            </BlurIn>
          </div>

          <MaskReveal className="md:col-span-5 flex justify-center md:justify-end" from="down">
            <AnnouncementCalendar />
          </MaskReveal>
        </div>
      </Section>

      <Section tone="warm">
        <Eyebrow>How you will hear about it</Eyebrow>
        <SectionTitle className="!text-2xl md:!text-4xl">
          Watch the channels we actually post on.
        </SectionTitle>
        <p className="mt-6 max-w-xl text-base text-ink-600">
          We will not bury the date in a press release. When we set the launch day, we
          will post it on these accounts first. Then we will email everyone on the
          waitlist.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "X / Twitter", href: site.social.x },
            { label: "LinkedIn", href: site.social.linkedin },
            { label: "Instagram", href: site.social.instagram },
            { label: "YouTube", href: site.social.youtube },
          ].map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-paper px-5 py-4 text-sm font-medium text-ink-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card"
              >
                {s.label}
                <span
                  aria-hidden
                  className="text-ink-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <BlurIn>
          <p className="text-sm text-ink-500">
            After launch, a live status dashboard will be available with per-service
            uptime and incident history.
          </p>
        </BlurIn>
        <div className="mt-8">
          <LinkButton href="/waitlist" size="md">
            Join the waitlist
          </LinkButton>
        </div>
      </Section>
    </>
  );
}

