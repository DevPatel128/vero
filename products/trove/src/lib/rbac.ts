export type Role = "user" | "admin" | "owner";

export type Permission =
  | "transactions:read" | "transactions:write" | "transactions:delete"
  | "subscriptions:read" | "subscriptions:write"
  | "budgets:read" | "budgets:write"
  | "goals:read" | "goals:write"
  | "reports:export"
  | "team:invite" | "team:remove"
  | "billing:manage"
  | "admin:users" | "admin:flags" | "admin:audit";

const matrix: Record<Role, Permission[]> = {
  user: [
    "transactions:read", "transactions:write", "transactions:delete",
    "subscriptions:read", "subscriptions:write",
    "budgets:read", "budgets:write",
    "goals:read", "goals:write",
    "reports:export",
    "billing:manage",
  ],
  admin: [
    "transactions:read",
    "subscriptions:read",
    "budgets:read",
    "goals:read",
    "reports:export",
    "team:invite", "team:remove",
    "admin:users", "admin:flags", "admin:audit",
  ],
  owner: [
    "transactions:read", "transactions:write", "transactions:delete",
    "subscriptions:read", "subscriptions:write",
    "budgets:read", "budgets:write",
    "goals:read", "goals:write",
    "reports:export",
    "team:invite", "team:remove",
    "billing:manage",
    "admin:users", "admin:flags", "admin:audit",
  ],
};

export function can(role: Role, perm: Permission): boolean {
  return matrix[role]?.includes(perm) ?? false;
}

export function assertCan(role: Role, perm: Permission): asserts role is Role {
  if (!can(role, perm)) throw new Error(`Forbidden: role ${role} lacks ${perm}`);
}
