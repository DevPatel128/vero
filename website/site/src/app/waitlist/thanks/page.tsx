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
          You’re in.
        </h1>
        <p className="mt-6 text-lg text-ink-600">
          A confirmation email is on its way. Check your inbox for your queue
          position and a personal referral link.
        </p>
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
