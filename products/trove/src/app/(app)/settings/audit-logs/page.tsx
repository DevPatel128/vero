import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Audit log", robots: { index: false, follow: false } };

export default async function AuditLogPage() {
  const supabase = await createClient();
  const { data: logs = [] } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(100);
  const list = logs ?? [];

  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="font-serif text-xl">Audit log</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Every action on your account. Last 100 events.</p>
      </div>
      {list.length === 0 ? (
        <EmptyState title="No events yet" description="As you use Trove, events will appear here." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow><TableHead>When</TableHead><TableHead>Action</TableHead><TableHead>Resource</TableHead><TableHead>IP</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {list.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="text-sm text-muted-foreground">{formatDate(l.created_at, { dateStyle: "short", timeStyle: "short" })}</TableCell>
                <TableCell><Badge variant="secondary">{l.action}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{l.resource_type}{l.resource_id ? `:${l.resource_id.slice(0, 8)}` : ""}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{l.ip ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
