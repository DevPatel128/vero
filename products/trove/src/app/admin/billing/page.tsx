import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { createAdminClient } from "@/lib/supabase/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Billing · Admin", robots: { index: false, follow: false } };

export default async function AdminBillingPage() {
  const admin = createAdminClient();
  const { data: rows = [] } = await admin.from("subscriptions_billing").select("*").order("created_at", { ascending: false }).limit(100);
  const list = rows ?? [];
  const pro = list.filter((r) => r.plan === "pro").length;
  const team = list.filter((r) => r.plan === "team").length;
  const mrr = pro * 9 + team * 24;

  return (
    <>
      <PageHeader eyebrow="Revenue" title="Billing" description="MRR and active subscriptions." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="MRR" value={formatCurrency(mrr)} tone="gold" />
        <StatCard label="Pro subscribers" value={String(pro)} />
        <StatCard label="Team subscribers" value={String(team)} />
      </div>

      <Card className="mt-6">
        <div className="p-5 border-b border-border"><p className="font-serif text-lg">Most recent</p></div>
        <Table>
          <TableHeader>
            <TableRow><TableHead>User</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead><TableHead>Renews</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {list.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.user_id.slice(0, 12)}…</TableCell>
                <TableCell><Badge variant={r.plan === "pro" ? "gold" : r.plan === "team" ? "secondary" : "outline"}>{r.plan}</Badge></TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.current_period_end ? formatDate(r.current_period_end) : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
