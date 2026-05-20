import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Team", robots: { index: false, follow: false } };

const seed = [
  { name: "Dev Patel", email: "dev@vroelabs.com", role: "owner", joined: "2026-01-04" },
];

export default function TeamPage() {
  return (
    <Card>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="font-serif text-xl">Team members</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Share Trove with your partner, family, or co-founder.</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Invite</Button>
      </div>
      {seed.length === 0 ? (
        <EmptyState title="No team members yet" description="Invite anyone with an email." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead>Joined</TableHead><TableHead></TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {seed.map((m) => (
              <TableRow key={m.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback>{m.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="gold">{m.role}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>
                <TableCell className="text-right"><Button size="sm" variant="ghost">Manage</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
