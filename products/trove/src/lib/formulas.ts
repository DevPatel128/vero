/**
 * Trove financial formulas.
 * Mirrors public.financial_health_score() in SQL for client-side preview.
 */

export interface Transaction {
  amount: number;
  category: string;
  direction: "debit" | "credit";
  occurred_at: string;
}

export const GROWTH_CATEGORIES = ["Investments", "Education", "Health"] as const;
export const CONSUMPTION_CATEGORIES = ["Food", "Leisure", "Travel", "Utilities"] as const;

export function totalExpense(txns: Transaction[]): number {
  return txns.filter((t) => t.direction === "debit").reduce((sum, t) => sum + t.amount, 0);
}

export function totalIncome(txns: Transaction[]): number {
  return txns.filter((t) => t.direction === "credit").reduce((sum, t) => sum + t.amount, 0);
}

export function categoryTotal(txns: Transaction[], categories: readonly string[]): number {
  return txns
    .filter((t) => t.direction === "debit" && categories.includes(t.category))
    .reduce((sum, t) => sum + t.amount, 0);
}

export function savingsEfficiency(txns: Transaction[]): number {
  const expense = totalExpense(txns);
  if (expense === 0) return 0;
  const growth = categoryTotal(txns, GROWTH_CATEGORIES);
  return (growth / expense) * 100;
}

export function growthVsConsumption(txns: Transaction[]): number {
  const growth = categoryTotal(txns, GROWTH_CATEGORIES);
  const consumption = categoryTotal(txns, CONSUMPTION_CATEGORIES);
  if (consumption === 0) return growth > 0 ? 1 : 0;
  return growth / consumption;
}

export function financialHealthScore(txns: Transaction[]): number {
  const expense = totalExpense(txns);
  if (expense === 0) return 50;
  const savings = savingsEfficiency(txns);
  const ratio = Math.min(growthVsConsumption(txns), 1);
  const score = savings * 0.6 + ratio * 40;
  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

export function scoreBand(score: number): { label: string; color: "danger" | "warning" | "success" | "gold" } {
  if (score <= 15) return { label: "At risk", color: "danger" };
  if (score <= 30) return { label: "Building", color: "warning" };
  if (score <= 50) return { label: "Healthy", color: "success" };
  return { label: "Elite", color: "gold" };
}

export function netCashFlow(txns: Transaction[]): number {
  return totalIncome(txns) - totalExpense(txns);
}

export function spendByCategory(txns: Transaction[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const t of txns) {
    if (t.direction !== "debit") continue;
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
  }
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
}

export function monthlySpend(txns: Transaction[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const t of txns) {
    if (t.direction !== "debit") continue;
    const key = t.occurred_at.slice(0, 7);
    map.set(key, (map.get(key) ?? 0) + t.amount);
  }
  return map;
}
