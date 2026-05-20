import Link from "next/link";
import { TroveMark } from "@/components/marketing/trove-mark";
import { siteConfig } from "@/lib/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      <div className="flex flex-col">
        <header className="border-b border-border">
          <div className="container-wide flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <TroveMark className="h-7 w-7" />
              <span className="font-serif text-xl tracking-tight">{siteConfig.name}</span>
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-trove-ink">← Back to site</Link>
          </div>
        </header>
        <main id="main" className="flex-1 flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </main>
        <footer className="border-t border-border">
          <div className="container-wide flex h-14 items-center justify-between text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-trove-ink">Privacy</Link>
              <Link href="/terms" className="hover:text-trove-ink">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
      <aside className="hidden lg:flex relative bg-trove-ink text-trove-cream items-center">
        <div className="container-wide py-20">
          <p className="eyebrow text-trove-gold">From the desk</p>
          <blockquote className="mt-6 max-w-md font-serif text-3xl leading-tight">
            "The first financial dashboard that doesn't feel like a chore. Trove gave my Sundays back."
          </blockquote>
          <p className="mt-6 text-sm text-trove-cream/80">— Arjun T., founder · pilot member</p>

          <div className="mt-16 grid grid-cols-3 gap-px bg-trove-cream/10 max-w-md">
            {[
              { k: "Pilot members", v: "200" },
              { k: "Subs found", v: "$84/mo" },
              { k: "Avg setup", v: "4:38" },
            ].map((s) => (
              <div key={s.k} className="bg-trove-ink p-4">
                <p className="font-serif text-2xl text-trove-gold">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-trove-cream/70">{s.k}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
