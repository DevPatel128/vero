import { describe, it, expect } from "vitest";
import { classify, categoryColor, categoryEmoji } from "@/lib/categories";

describe("classify", () => {
  it.each([
    ["Uber Trip 123", "Transport"],
    ["NETFLIX.COM", "Subscriptions"],
    ["Trader Joe's #122", "Food"],
    ["Coursera Inc", "Education"],
    ["Robinhood Securities", "Investments"],
    ["Random unknown merchant", "Other"],
  ])("classifies %s → %s", (merchant, expected) => {
    expect(classify(merchant)).toBe(expected);
  });
});

describe("categoryColor / categoryEmoji", () => {
  it("returns sensible defaults for unknown categories", () => {
    expect(categoryColor("Nonsense")).toBe("#595959");
    expect(categoryEmoji("Nonsense")).toBe("•");
  });
});
