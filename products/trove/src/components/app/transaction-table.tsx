import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { categoryEmoji } from "@/lib/categories";
import type { Database } from "@/types/database.types";

type Tx = Database["public"]["Tables"]["transactions"]["Row"];

export function TransactionTable({ rows }: { rows: Tx[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Merchant</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="text-sm text-muted-foreground">{formatDate(r.occurred_at, { month: "short", day: "numeric" })}</TableCell>
            <TableCell>
              <p className="font-medium">{r.merchant}</p>
              {r.description && <p className="text-xs text-muted-foreground line-clamp-1">{r.description}</p>}
            </TableCell>
            <TableCell><Badge variant="secondary">{categoryEmoji(r.category)} {r.category}</Badge></TableCell>
            <TableCell>
              {r.status === "pending"
                ? <Badge variant="warning">Pending</Badge>
                : <Badge variant="success">Posted</Badge>}
            </TableCell>
            <TableCell className={`text-right number-tabular font-medium ${r.direction === "credit" ? "text-trove-success" : ""}`}>
              {r.direction === "credit" ? "+" : "−"}{formatCurrency(Number(r.amount))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
