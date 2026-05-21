import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "LinkedIn shows claims. Vero shows proof. A short manifesto on why we are building a verified record system for real work - and why we are beginning small.",
  alternates: { canonical: "/manifesto" },
};

export default function Page() {
  return (
    <article className="pt-24 pb-24">
      <Container size="prose" className="prose-vero">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          Manifesto
        </p>
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tighter text-ink-900 md:text-6xl">
          Proof of work, not posts about work.
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-ink-700">
          LinkedIn shows what people claim. Vero shows what people did.
        </p>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <p>
            We have built an internet where it is easier to publish a title than to earn one. Profiles fill with self-descriptions. Endorsements arrive from strangers. Anyone can author the story of who they are. The result is that we have grown collectively suspicious of all of it, and the people who lose most are the ones with the least social cover - students, switchers, skilled hands without portfolios, anyone who needs the first opportunity to make the second one possible.
          </p>
          <p>
            The truth is small and stubborn. Reputation is not a slogan. It is a record. It is the cumulative trace of things you actually did, with people who actually watched you do them, kept over time, hard to fake. Reputation is what you carry forward. Posts are not it.
          </p>
          <p>
            Vero is a place to keep that trace.
          </p>
        </section>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
            A record, not a rating.
          </h2>
          <p>
            We do not give people a number on a scale. We give them a sequence of signed completions. Each one carries a date, a category, a verifier, and two signatures. Each one is chained to the one before it. The platform cannot quietly help one professional or quietly harm another - the rules are the same for everyone, including us.
          </p>
          <p>
            If a record looks too good, it is more easily checked. If a record is real, it stands.
          </p>
        </section>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
            Small work counts.
          </h2>
          <p>
            The world has been built to disrespect small work. A two-week apprenticeship, a single weekend shift, a one-off repair. These are how careers begin. They are also how careers are quietly continued during the hard months. Vero treats small work as a real entry in the record, not a footnote. Because it is.
          </p>
        </section>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
            Trust is local before it is global.
          </h2>
          <p>
            We are launching in Bengaluru. Five neighbourhoods. 2027 - exact date to be announced, follow our socials for the call. We are not pretending otherwise. A platform that promises everything to everyone usually serves no one. We will earn the right to expand by working with the professionals and businesses in front of us, in person, in this city, until the trust model proves itself.
          </p>
        </section>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
            What we promise.
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Professionals will never pay to use Vero.</li>
            <li>No record will ever be silently edited.</li>
            <li>You can take your record with you, in a portable, signed format.</li>
            <li>The platform fee will stay where it is - well below the market.</li>
            <li>If we cannot keep these promises, we will say so before we break them.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-base leading-relaxed text-ink-700">
          <p>
            If any of that resonates, join early. We are building this with the people who join first.
          </p>
        </section>

        <div className="mt-12">
          <LinkButton href="/waitlist" size="lg">
            Join the waitlist
          </LinkButton>
        </div>
      </Container>
    </article>
  );
}

