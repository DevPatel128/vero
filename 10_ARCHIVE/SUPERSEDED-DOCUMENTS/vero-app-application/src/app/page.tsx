import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3">
          <div className="size-2 rounded-pill bg-accent" aria-hidden />
          <span className="text-sm font-medium tracking-tight">VERO</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Get started
            </Button>
          </Link>
        </nav>
      </header>

      <section className="flex flex-1 flex-col items-start justify-center px-6 py-16 md:px-12 md:py-32 max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2 mb-6">
          01 / Proof-of-work identity
        </p>

        <h1
          className="font-semibold leading-[0.95] tracking-tighter text-ink-0 mb-8"
          style={{ fontSize: "clamp(2.75rem, 6.4vw + 0.5rem, 7rem)" }}
        >
          LinkedIn shows claims.
          <br />
          <span className="text-ink-1">VERO shows proof.</span>
        </h1>

        <p className="max-w-[60ch] text-lg leading-relaxed text-ink-1 mb-12">
          A verified work record that belongs to you. Every job signed by both
          sides. Every signature permanent. Built for the workers, freelancers,
          and operators who do real work — and want it to count.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/signup">
            <Button variant="primary" size="lg">
              Join early access
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="secondary" size="lg">
              See how it works
            </Button>
          </Link>
        </div>

        <p className="mt-16 font-mono text-xs text-ink-2">
          Bengaluru pilot · Phase 1
        </p>
      </section>

      <footer className="border-t border-ink-3/20 px-6 py-8 md:px-12">
        <div className="flex flex-col gap-2 text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© VROE Labs · VERO</span>
          <span className="font-mono">
            Verified work · Signed records · India-first
          </span>
        </div>
      </footer>
    </main>
  );
}
