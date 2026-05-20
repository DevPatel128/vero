import Link from "next/link";
import { siteConfig, footerNav } from "@/lib/site";
import { TroveMark } from "@/components/marketing/trove-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-trove-cream">
      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <TroveMark className="h-8 w-8" />
              <span className="font-serif text-2xl tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
            <p className="mt-6 text-xs text-muted-foreground">
              <span className="font-medium text-trove-ink">{siteConfig.legalName}</span>
              {" · "}
              <Link href={`mailto:${siteConfig.email}`} className="link-ft">{siteConfig.email}</Link>
            </p>
          </div>

          {(["product", "company", "resources", "legal"] as const).map((group) => (
            <div key={group}>
              <h4 className="eyebrow mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {footerNav[group].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-trove-ink transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Built remotely · {siteConfig.location}</span>
            <span aria-hidden="true">·</span>
            <Link href="/security" className="hover:text-trove-ink">SOC 2 in progress</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
