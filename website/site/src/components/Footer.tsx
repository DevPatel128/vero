import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-100 bg-paper-warm">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-7 w-7 text-ink-900" />
              <span className="font-display text-xl tracking-tightish text-ink-900">
                {site.name}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-600">
              {site.tagline} A verified proof-of-work identity, beginning in {site.launchCity}, {site.launchWindow}.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ink-400">
              A {site.parent} product
            </p>
          </div>

          <FooterCol title="Product" items={nav.footer.product} />
          <FooterCol title="Company" items={nav.footer.company} />
          <FooterCol title="Ecosystem" items={nav.footer.ecosystem} />
          <FooterCol title="Legal" items={nav.footer.legal} />
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-ink-100 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {site.parent}. All rights reserved. Records you create are owned by you.
          </p>
          <div className="flex items-center gap-5 text-xs text-ink-500">
            <Link href="/status" className="hover:text-ink-800">
              <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-caution" />
              Pre-launch · 2027 · TBA
            </Link>
            <Link href="/investors" className="hover:text-ink-800">
              Investors
            </Link>
            <Link href="/press" className="hover:text-ink-800">
              Press
            </Link>
            <Link href="/contact" className="hover:text-ink-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="text-sm text-ink-700 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
