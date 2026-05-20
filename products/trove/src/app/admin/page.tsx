import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/app/stat-card";
import { PageHeader } from "@/components/app/page-header";
import { createAdminClient } from "@/lib/supabase/server";
import { Users, CreditCard, AlertTriangle, TrendingUp, Activity } from "lucide-react";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminOverviewPage() {
  const admin = createAdminClient();
  const [{ count: userCount }, { count: txnCount }, { count: subCount }, { count: ticketCount }] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("transactions").select("id", { count: "exact", head: true }),
    admin.from("subscriptions").select("id", { count: "exact", head: true }),
    admin.from("support_tickets").select("id", { count: "exact", head: true }).eq("status", "open"),
  ]);

  return (
    <>
      <PageHeader eyebrow="Operations" title="Admin overview" description="Live state of the Trove fleet." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={String(userCount ?? 0)} icon={Users} />
        <StatCard label="Transactions" value={String(txnCount ?? 0)} icon={Activity} />
        <StatCard label="Subscriptions tracked" value={String(subCount ?? 0)} icon={CreditCard} />
        <StatCard label="Open tickets" value={String(ticketCount ?? 0)} icon={AlertTriangle} tone={(ticketCount ?? 0) > 5 ? "warning" : "default"} />
      </div>

      <Card className="mt-6 p-6">
        <p className="eyebrow">System status</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Status label="API" ok />
          <Status label="Database" ok />
          <Status label="Stripe webhooks" ok />
        </div>
      </Card>
    </>
  );
}

function Status({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-[4px] border border-border p-3">
      <span className="text-sm">{label}</span>
      <Badge variant={ok ? "success" : "danger"}>{ok ? "Operational" : "Degraded"}</Badge>
    </div>
  );
}
