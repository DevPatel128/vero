import Link from "next/link";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-24">
      <Container size="prose" className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          404 · Not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-tighter text-ink-900 md:text-7xl">
          That record doesn’t exist.
        </h1>
        <p className="mt-6 text-lg text-ink-600">
          The page you tried to reach is not here, or has moved. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/" size="md">Home</LinkButton>
          <LinkButton href="/how-it-works" variant="secondary" size="md">
            How it works
          </LinkButton>
          <LinkButton href="/waitlist" variant="secondary" size="md">
            Join the waitlist
          </LinkButton>
        </div>
        <p className="mt-12 text-sm text-ink-500">
          Looking for something specific?{" "}
          <Link href="/contact" className="underline decoration-accent underline-offset-4">
            Tell us
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
