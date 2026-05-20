import { describe, it, expect } from "vitest";
import { financialHealthScore, savingsEfficiency, growthVsConsumption, scoreBand, netCashFlow, spendByCategory } from "@/lib/formulas";

const t = (cat: string, amount: number, direction: "debit" | "credit" = "debit") => ({
  amount,
  category: cat,
  direction,
  occurred_at: "2026-05-01T00:00:00Z",
});

describe("financialHealthScore", () => {
  it("returns 50 when there is no expense", () => {
    expect(financialHealthScore([])).toBe(50);
  });

  it("rewards growth-heavy spending", () => {
    const score = financialHealthScore([t("Investments", 800), t("Health", 200)]);
    expect(score).toBeGreaterThan(80);
  });

  it("penalises consumption-only spending", () => {
    const score = financialHealthScore([t("Food", 500), t("Leisure", 500)]);
    expect(score).toBeLessThan(15);
  });

  it("clamps to [0, 100]", () => {
    expect(financialHealthScore([t("Food", 1)])).toBeGreaterThanOrEqual(0);
    expect(financialHealthScore([t("Investments", 100_000)])).toBeLessThanOrEqual(100);
  });
});

describe("savingsEfficiency", () => {
  it("returns growth/total expense ratio as percent", () => {
    const eff = savingsEfficiency([t("Investments", 100), t("Food", 100)]);
    expect(eff).toBeCloseTo(50, 1);
  });
});

describe("growthVsConsumption", () => {
  it("returns 1 when no consumption and growth > 0", () => {
    expect(growthVsConsumption([t("Investments", 100)])).toBe(1);
  });

  it("returns ratio when both present", () => {
    expect(growthVsConsumption([t("Investments", 50), t("Food", 100)])).toBe(0.5);
  });
});

describe("scoreBand", () => {
  it("classifies bands correctly", () => {
    expect(scoreBand(10).color).toBe("danger");
    expect(scoreBand(20).color).toBe("warning");
    expect(scoreBand(40).color).toBe("success");
    expect(scoreBand(80).color).toBe("gold");
  });
});

describe("netCashFlow", () => {
  it("subtracts expense from income", () => {
    const net = netCashFlow([t("Salary", 1000, "credit"), t("Food", 250)]);
    expect(net).toBe(750);
  });
});

describe("spendByCategory", () => {
  it("groups and sorts descending", () => {
    const grouped = spendByCategory([t("Food", 100), t("Travel", 300), t("Food", 50)]);
    const entries = Array.from(grouped.entries());
    expect(entries[0]).toEqual(["Travel", 300]);
    expect(entries[1]).toEqual(["Food", 150]);
  });
});
