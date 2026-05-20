import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { WaitlistForm } from "@/components/WaitlistForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Reserve your spot. Bengaluru opens in 2027 — exact date to be announced. Workers join free. Founding-member perks for the first 1,000.",
  alternates: { canonical: "/waitlist" },
};

const perks = [
  {
    h: "Founding member badge",
    b: "The first 1,000 to join carry a permanent founding-member mark on their profile.",
  },
  {
    h: "Move up by referring",
    b: "Every friend who joins through your link moves you up 5 spots. Stack up to 100 spots.",
  },
  {
    h: "Pioneer wall",
    b: "Top referrers get an invitation to the Pioneer wall — public, opt-in only.",
  },
  {
    h: "Early access at launch",
    b: "Highest-referring founders get the first wave of access in Bengaluru.",
  },
];

export default function Page() {
  return (
    <div className="pt-16 pb-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Waitlist
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
              Your record begins with one signature.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              {site.name} opens in {site.launchCity} in {site.launchWindow}. Join
              the waitlist and you will get a personal page with your queue
              position, a referral link, and your founding-member tier.
            </p>

            <div className="mt-10 rounded-3xl border border-ink-100 bg-paper p-7 shadow-card md:p-9">
              <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-paper-warm" />}>
                <WaitlistForm />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-ink-950 p-8 text-paper">
                <p className="text-xs uppercase tracking-[0.22em] text-accent-glow">
                  What you get
                </p>
                <h2 className="mt-4 font-display text-2xl font-medium tracking-tightish">
                  Real perks. No theatre.
                </h2>
                <ul className="mt-6 space-y-5">
                  {perks.map((p) => (
                    <li key={p.h}>
                      <h3 className="font-display text-base font-medium tracking-tightish text-paper">
                        {p.h}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-300">
                        {p.b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-100 bg-paper-warm p-7">
                <h3 className="font-display text-lg font-medium tracking-tightish text-ink-900">
                  Honest about pre-launch
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  We will not invent numbers. We will not fake urgency. If we
                  push the launch, we will email you and offer a one-click
                  unsubscribe.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
