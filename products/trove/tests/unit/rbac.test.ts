import { describe, it, expect } from "vitest";
import { can } from "@/lib/rbac";

describe("rbac.can", () => {
  it("allows users to manage their own transactions", () => {
    expect(can("user", "transactions:write")).toBe(true);
  });

  it("forbids users from admin actions", () => {
    expect(can("user", "admin:users")).toBe(false);
  });

  it("allows admins to read everything", () => {
    expect(can("admin", "transactions:read")).toBe(true);
    expect(can("admin", "admin:flags")).toBe(true);
  });

  it("forbids admins from writing financial data they don't own", () => {
    expect(can("admin", "transactions:write")).toBe(false);
  });

  it("grants owner everything", () => {
    expect(can("owner", "billing:manage")).toBe(true);
    expect(can("owner", "admin:audit")).toBe(true);
    expect(can("owner", "transactions:write")).toBe(true);
  });
});
