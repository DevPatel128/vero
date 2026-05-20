import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatPct, slugify, truncate, getInitials } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and dedupes Tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", false && "text-lg", "font-bold")).toBe("text-sm font-bold");
  });
});

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1234)).toBe("$1,234");
  });
});

describe("formatPct", () => {
  it("formats with default 1 fraction digit", () => {
    expect(formatPct(45.678)).toBe("45.7%");
  });
});

describe("slugify", () => {
  it("converts text to URL-safe slug", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
    expect(slugify("  Multiple   spaces  ")).toBe("multiple-spaces");
  });
});

describe("truncate", () => {
  it("returns original when shorter than max", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });
  it("truncates with ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hell…");
  });
});

describe("getInitials", () => {
  it("returns up to two initials", () => {
    expect(getInitials("Maya Reed")).toBe("MR");
    expect(getInitials("dev patel kumar")).toBe("DP");
  });
});
