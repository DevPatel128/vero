"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Starts "dark" to match the server render (no access to localStorage or
  // matchMedia there), then corrects itself from the client-only effect
  // below. Reading real theme in the initializer would make the client's
  // first render diverge from the server's and cause a hydration mismatch.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("vero-theme") as "dark" | "light" | null;
    const initial: "dark" | "light" =
      saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only theme resolution; see comment above
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    if (typeof window !== "undefined") window.localStorage.setItem("vero-theme", next);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-reveal ease-out",
        scrolled
          ? "border-b border-line-faint backdrop-blur-glass bg-surface-0/70"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-6 text-ink-0" />
          <span className="font-display text-lead font-medium tracking-precise text-ink-0">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-pill px-3.5 py-2 text-caption text-ink-1 transition-colors hover:bg-surface-2/60 hover:text-ink-0",
                pathname === item.href && "bg-surface-2/60 text-ink-0",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-ink-1 hover:border-line-strong hover:text-ink-0"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            href="/#apply"
            className="btn-magnetic inline-flex h-10 items-center gap-1.5 rounded-pill bg-accent px-4 text-caption font-medium text-accent-ink hover:shadow-glow"
          >
            Apply
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line text-ink-0 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
            <span className={cn("h-px bg-current transition", open && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px bg-current transition", open && "opacity-0")} />
            <span className={cn("h-px bg-current transition", open && "-translate-y-[7px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line-faint bg-surface-0/95 backdrop-blur-glass lg:hidden">
          <nav className="mx-auto max-w-content px-5 py-6 sm:px-8" aria-label="Mobile">
            <ul className="grid gap-1">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base font-medium text-ink-0",
                      pathname === item.href ? "bg-surface-2" : "hover:bg-surface-2/60",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 border-t border-line-faint pt-6">
              <Link
                href="/#apply"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-pill bg-accent text-sm font-medium text-accent-ink"
              >
                Apply for early access
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line text-ink-1"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
