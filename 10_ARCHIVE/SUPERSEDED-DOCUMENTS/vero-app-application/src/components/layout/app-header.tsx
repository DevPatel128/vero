"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  email?: string | null;
  role?: "worker" | "business" | "admin" | null;
}

export function AppHeader({ email, role }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const navItems =
    role === "business"
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/post-job", label: "Post a job" },
          { href: "/hires", label: "Hires" },
        ]
      : [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/opportunities", label: "Opportunities" },
          { href: "/profile", label: "Profile" },
        ];

  return (
    <header className="sticky top-0 z-10 border-b border-ink-3/20 bg-surface-0/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="size-2 rounded-pill bg-accent" aria-hidden />
            <span className="text-sm font-medium tracking-tight">VERO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-pill px-3 py-1.5 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-surface-2 text-ink-0"
                    : "text-ink-2 hover:bg-surface-1 hover:text-ink-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {email && (
            <span className="hidden md:block font-mono text-xs text-ink-2">
              {email}
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
