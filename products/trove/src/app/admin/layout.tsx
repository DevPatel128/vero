import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-trove-gold/40 bg-trove-cream">
        <div className="container-wide flex h-14 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-trove-goldDeep" />
            <span className="font-mono text-sm uppercase tracking-widest">Trove · Admin</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/admin" className="rounded-[4px] px-3 py-1.5 hover:bg-trove-surface">Overview</Link>
            <Link href="/admin/users" className="rounded-[4px] px-3 py-1.5 hover:bg-trove-surface">Users</Link>
            <Link href="/admin/billing" className="rounded-[4px] px-3 py-1.5 hover:bg-trove-surface">Billing</Link>
            <Link href="/admin/feature-flags" className="rounded-[4px] px-3 py-1.5 hover:bg-trove-surface">Flags</Link>
            <Link href="/admin/analytics" className="rounded-[4px] px-3 py-1.5 hover:bg-trove-surface">Analytics</Link>
          </nav>
          <Badge variant="gold">Restricted</Badge>
        </div>
      </header>
      <main id="main" className="container-wide py-8">{children}</main>
    </div>
  );
}
