"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/settings", label: "General" },
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/billing", label: "Billing" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/team", label: "Team" },
  { href: "/settings/api-keys", label: "API keys" },
  { href: "/settings/audit-logs", label: "Audit log" },
];

export function SettingsNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Settings sections" className="lg:sticky lg:top-24 lg:self-start">
      <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:pb-0">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "block whitespace-nowrap rounded-[4px] px-3 py-2 text-sm transition-colors",
                  active ? "bg-trove-surface text-trove-ink" : "text-muted-foreground hover:bg-trove-surface/60 hover:text-trove-ink",
                )}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
