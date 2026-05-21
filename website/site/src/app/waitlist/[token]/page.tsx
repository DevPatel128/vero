import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { waitlist, effectivePosition, tierFor, tierLabel } from "@/lib/waitlist";
import { site } from "@/lib/site";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Your waitlist spot",
  robots: { index: false, follow: false },
};

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const entry = await waitlist.findByToken(token);
  if (!entry) notFound();

  const position = effectivePosition(entry);
  const tier = tierLabel(tierFor(entry.position));
  const refUrl = `${site.url}/waitlist?ref=${entry.referralCode}`;
  const shareText = `I just joined the ${site.name} waitlist. Proof of work, not posts about work. Bengaluru opens ${site.launchWindow}.`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(refUrl)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    refUrl,
  )}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${refUrl}`)}`;

  return (
    <div className="pt-16 pb-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              You’re in
            </p>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tighter text-ink-900 md:text-6xl">
              {entry.name ? `Welcome, ${entry.name.split(" ")[0]}.` : "Welcome."}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              You joined as a <strong>{entry.role}</strong>. We will be in
              touch as {site.launchCity} opens in {site.launchWindow}.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-ink-100 bg-paper p-6 shadow-card">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-500">
                  Position
                </p>
                <p className="mt-3 font-display text-4xl font-medium tracking-tighter text-ink-900">
                  #{position.toLocaleString()}
                </p>
                {entry.referralCount > 0 && (
                  <p className="mt-1 text-xs text-trust">
                    Moved up {entry.referralCount * 5} from referrals
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-ink-100 bg-paper p-6 shadow-card">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-500">
                  Tier
                </p>
                <p className="mt-3 font-display text-2xl font-medium tracking-tightish text-ink-900">
                  {tier}
                </p>
                <p className="mt-1 text-xs text-ink-500">
                  {tier === "Founding member"
                    ? "Permanent badge on your profile."
                    : tier === "Pioneer"
                    ? "Early access at launch."
                    : "Access in the first wave after pioneers."}
                </p>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-paper p-6 shadow-card">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-500">
                  Referrals
                </p>
                <p className="mt-3 font-display text-4xl font-medium tracking-tighter text-ink-900">
                  {entry.referralCount}
                </p>
                <p className="mt-1 text-xs text-ink-500">+5 spots each</p>
              </div>
            </div>

            <section className="mt-12 rounded-3xl border border-ink-100 bg-paper p-7 shadow-card">
              <h2 className="font-display text-2xl font-medium tracking-tightish text-ink-900">
                Move up the line
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                Every friend who joins through your link moves you up 5 spots.
                Refer 3 to jump 15. Refer 10 to jump 50.
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <code className="block flex-1 truncate rounded-xl bg-paper-warm px-4 py-3 font-mono text-sm text-ink-800">
                  {refUrl}
                </code>
                <CopyButton text={refUrl} label="Copy link" />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper hover:bg-accent"
                >
                  Share on X
                </a>
                <a
                  href={liUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-paper-warm px-4 py-2 text-sm font-medium text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300"
                >
                  Share on LinkedIn
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-paper-warm px-4 py-2 text-sm font-medium text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300"
                >
                  Share on WhatsApp
                </a>
              </div>

              <p className="mt-6 text-xs text-ink-500">
                Your referral code:{" "}
                <span className="font-mono text-ink-700">
                  {entry.referralCode}
                </span>
              </p>
            </section>

            <section className="mt-10 prose-vero max-w-prose">
              <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
                What happens next
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-6 text-base leading-relaxed text-ink-700">
                <li>You will get a confirmation email at {entry.email}.</li>
                <li>
                  We will send a short note every couple of weeks until launch
                  - what we built, what is next.
                </li>
                <li>
                  Closer to {site.launchWindow}, you will get an invitation in
                  order of position.
                </li>
                <li>
                  At any point, one click unsubscribes. We will not lose your
                  spot for it.
                </li>
              </ol>
            </section>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-ink-950 p-8 text-paper">
                <p className="text-xs uppercase tracking-[0.22em] text-accent-glow">
                  Read while you wait
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="/manifesto"
                      className="font-display text-base font-medium tracking-tightish text-paper hover:text-accent-glow"
                    >
                      The manifesto →
                    </a>
                    <p className="text-ink-300">Why we exist, in one essay.</p>
                  </li>
                  <li>
                    <a
                      href="/how-it-works"
                      className="font-display text-base font-medium tracking-tightish text-paper hover:text-accent-glow"
                    >
                      How a record is made →
                    </a>
                    <p className="text-ink-300">Five steps. Two signatures.</p>
                  </li>
                  <li>
                    <a
                      href="/ecosystem"
                      className="font-display text-base font-medium tracking-tightish text-paper hover:text-accent-glow"
                    >
                      The long-term vision →
                    </a>
                    <p className="text-ink-300">Vero, RIE, Trove. One protocol.</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-100 bg-paper-warm p-7">
                <h3 className="font-display text-lg font-medium tracking-tightish text-ink-900">
                  Keep this link
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Bookmark this page. It is your personal status. We will not
                  share or index it.
                </p>
                <p className="mt-3 text-xs text-ink-500">
                  Joined {new Date(entry.joinedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <LinkButton href="/" variant="ghost" size="md">
                ← Back to home
              </LinkButton>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

