import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line-faint bg-surface-1 text-ink-0">
      <div className="mx-auto max-w-content px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-7 w-7 text-ink-0" />
              <span className="font-display text-h6 font-medium tracking-tightish text-ink-0">
                {site.name}
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-1">
              {site.shortDescription}
            </p>
            <p className="mt-8 font-mono text-micro text-ink-3">
              A {site.parent} product · {site.legal.jurisdiction}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <FooterCol title="Product" items={nav.footer.product} />
            <FooterCol title="Audiences" items={nav.footer.audiences} />
            <FooterCol title="Trust" items={nav.footer.trust} />
            <FooterCol title="Company" items={nav.footer.company} />
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line-faint pt-8 lg:grid-cols-12 lg:items-center">
          <p className="font-mono text-micro text-ink-3 lg:col-span-5">
            © {new Date().getFullYear()} {site.parent}. Records belong to the people who earned them.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-caption text-ink-2 lg:col-span-7 lg:justify-end">
            <li>
              <Link href="/status" className="inline-flex items-center gap-2 hover:text-ink-0">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {site.launchStatus}
              </Link>
            </li>
            {nav.footer.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink-0">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="font-mono text-micro text-ink-3">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link href={item.href} className="text-sm text-ink-1 transition-colors hover:text-ink-0">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
