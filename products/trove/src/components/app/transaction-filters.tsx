"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/categories";

export function TransactionFilters({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const search = useSearchParams();

  const set = (key: string, value: string | null) => {
    const params = new URLSearchParams(search?.toString() ?? "");
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.replace(`?${params.toString()}`);
  };

  const active = Object.keys(initial).filter((k) => initial[k]).length;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          defaultValue={initial.search ?? ""}
          onChange={(e) => set("search", e.target.value || null)}
          placeholder="Search merchants…"
          className="pl-9"
        />
      </div>
      <Select value={initial.category ?? "all"} onValueChange={(v) => set("category", v === "all" ? null : v)}>
        <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {CATEGORIES.map((c) => (<SelectItem key={c.name} value={c.name}>{c.emoji} {c.name}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select value={initial.direction ?? "all"} onValueChange={(v) => set("direction", v === "all" ? null : v)}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="debit">Spending</SelectItem>
          <SelectItem value="credit">Income</SelectItem>
        </SelectContent>
      </Select>
      {active > 0 && (
        <Button variant="ghost" size="sm" onClick={() => router.replace("?")}>
          <X className="h-3 w-3" /> Clear
        </Button>
      )}
    </div>
  );
}
