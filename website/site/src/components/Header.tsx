import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/60 bg-paper/75 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-ink-600 transition-colors duration-200 hover:bg-ink-100/50 hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/waitlist"
            className="hidden rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-all duration-300 hover:bg-accent hover:shadow-lift active:scale-95 sm:inline-block"
          >
            Reserve Early Access
          </Link>
          <Link
            href="/waitlist"
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-transform active:scale-95 sm:hidden"
            aria-label="Reserve Early Access"
          >
            Reserve
          </Link>
        </div>
      </div>
    </header>
  );
}

