import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

const legalNav = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Refund", href: "/legal/refund" },
  { label: "Acceptable use", href: "/legal/acceptable-use" },
  { label: "Accessibility", href: "/legal/accessibility" },
  { label: "Grievance officer", href: "/legal/grievance" },
  { label: "Responsible disclosure", href: "/legal/responsible-disclosure" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-16 pb-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                Legal
              </p>
              <nav className="mt-5 space-y-1" aria-label="Legal pages">
                {legalNav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-paper-warm hover:text-ink-900"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <article className="lg:col-span-9 prose-vero">{children}</article>
        </div>
      </Container>
    </div>
  );
}

