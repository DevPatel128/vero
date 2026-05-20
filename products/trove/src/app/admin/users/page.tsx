import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/app/page-header";
import { createAdminClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Users · Admin", robots: { index: false, follow: false } };

export default async function AdminUsersPage() {
  const admin = createAdminClient();
  const { data: users = [] } = await admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(100);
  const list = users ?? [];

  return (
    <>
      <PageHeader eyebrow="Operations" title="Users" description="Most recent 100. Search coming soon." />
      <Card>
        <Table>
          <TableHeader>
            <TableRow><TableHead>Email</TableHead><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Onboarded</TableHead><TableHead>Created</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {list.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-mono text-xs">{u.email}</TableCell>
                <TableCell>{u.full_name ?? "—"}</TableCell>
                <TableCell><Badge variant={u.role === "owner" ? "gold" : u.role === "admin" ? "secondary" : "outline"}>{u.role}</Badge></TableCell>
                <TableCell>{u.onboarding_complete ? <Badge variant="success">Yes</Badge> : <Badge variant="warning">No</Badge>}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(u.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
