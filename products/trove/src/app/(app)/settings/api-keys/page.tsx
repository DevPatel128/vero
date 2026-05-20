import type { Metadata } from "next";
import { Plus, KeyRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "API keys", robots: { index: false, follow: false } };

export default async function ApiKeysPage() {
  const supabase = await createClient();
  const { data: keys = [] } = await supabase.from("api_keys").select("*").is("revoked_at", null).order("created_at", { ascending: false });
  const list = keys ?? [];

  return (
    <Card>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="font-serif text-xl">API keys</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">For programmatic access to your data. Pro plan and above.</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Create key</Button>
      </div>
      {list.length === 0 ? (
        <EmptyState
          icon={<KeyRound className="h-8 w-8" />}
          title="No API keys yet"
          description="Generate a key to read transactions, manage budgets, or subscribe to webhooks."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead>Prefix</TableHead><TableHead>Scopes</TableHead><TableHead>Last used</TableHead><TableHead>Created</TableHead><TableHead></TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {list.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="font-medium">{k.name}</TableCell>
                <TableCell><code className="font-mono text-xs">{k.key_prefix}…</code></TableCell>
                <TableCell><div className="flex gap-1">{(k.scopes ?? []).map((s: string) => (<Badge key={s} variant="secondary">{s}</Badge>))}</div></TableCell>
                <TableCell className="text-sm text-muted-foreground">{k.last_used_at ? formatDate(k.last_used_at) : "Never"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(k.created_at)}</TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Revoke</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
