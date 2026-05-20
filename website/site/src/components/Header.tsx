import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label={`${site.name} home`}
        >
          <Logo className="h-6 w-6 text-ink-900" />
          <span className="font-display text-lg tracking-tightish text-ink-900">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/waitlist"
            className="hidden rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent sm:inline-block"
          >
            Join the waitlist
          </Link>
          <Link
            href="/waitlist"
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper sm:hidden"
            aria-label="Join the waitlist"
          >
            Join
          </Link>
        </div>
      </div>
    </header>
  );
}
