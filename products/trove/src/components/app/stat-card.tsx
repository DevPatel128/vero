import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon?: LucideIcon;
  tone?: "default" | "gold" | "success" | "warning" | "danger";
}

export function StatCard({ label, value, delta, icon: Icon, tone = "default" }: StatCardProps) {
  return (
    <div className="card-flat p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />}
      </div>
      <p className={cn("mt-3 font-serif text-3xl tracking-tight number-tabular", {
        "text-trove-goldDeep": tone === "gold",
        "text-trove-success": tone === "success",
        "text-trove-warning": tone === "warning",
        "text-trove-danger": tone === "danger",
      })}>{value}</p>
      {delta && (
        <p className={cn("mt-1 text-xs", delta.positive ? "text-trove-success" : "text-trove-danger")}>
          {delta.positive ? "+" : ""}{delta.value}
        </p>
      )}
    </div>
  );
}
