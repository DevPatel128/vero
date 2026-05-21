import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "You’re in",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="flex min-h-[60vh] items-center py-24">
      <Container size="prose" className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          Thank you
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tighter text-ink-900 md:text-6xl">
          You are <span className="text-trust">#4,201</span> in line.
        </h1>
        <p className="mt-6 text-lg text-ink-600">
          A confirmation email is on its way. Check your inbox for your official queue
          position and a personal referral link.
        </p>

        <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-ink-100 bg-paper p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover">
          <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900">
            Want to jump 50 spots?
          </h2>
          <p className="mb-6 mt-2 text-sm leading-relaxed text-ink-600">
            Share your referral link on WhatsApp. Every friend who joins moves you up 50 spots.
          </p>
          <a
            href="https://api.whatsapp.com/send?text=I%20just%20secured%20my%20early%20access%20spot%20for%20Vero.%20The%20resume%20is%20dead.%20Join%20me%3A%20https%3A%2F%2Fvero.app%2Fwaitlist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[#128C7E] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Share to WhatsApp
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/manifesto" variant="secondary" size="md">
            Read the manifesto
          </LinkButton>
          <LinkButton href="/how-it-works" variant="secondary" size="md">
            How it works
          </LinkButton>
          <LinkButton href="/" variant="ghost" size="md">
            ← Back home
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}
