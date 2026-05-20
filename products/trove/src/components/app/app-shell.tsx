"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronsUpDown, LayoutDashboard, ArrowLeftRight, TrendingUp, Repeat, PiggyBank, Target, FileBarChart, Settings, Search, LogOut, LifeBuoy, ShieldCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TroveMark } from "@/components/marketing/trove-mark";
import { CommandPalette } from "@/components/app/command-palette";
import { cn, getInitials } from "@/lib/utils";

interface AppUser { id: string; name: string; email: string; avatar?: string | null; role: "user" | "admin" | "owner" }

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/budgets", label: "Budgets", icon: PiggyBank },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/reports", label: "Reports", icon: FileBarChart },
];

export function AppShell({ user, children }: { user: AppUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [mobileNav, setMobileNav] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(true); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center px-5 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <TroveMark className="h-6 w-6" />
            <span className="font-serif text-lg tracking-tight">Trove</span>
          </Link>
        </div>
        <SidebarNav pathname={pathname} role={user.role} />
        <div className="border-t border-border p-3">
          <UserMenu user={user} />
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-border bg-background/90 backdrop-blur-md px-4 md:px-6">
          <Sheet open={mobileNav} onOpenChange={setMobileNav}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <div className="flex h-16 items-center px-5 border-b border-border">
                <Link href="/dashboard" onClick={() => setMobileNav(false)} className="flex items-center gap-2">
                  <TroveMark className="h-6 w-6" /><span className="font-serif text-lg tracking-tight">Trove</span>
                </Link>
              </div>
              <SidebarNav pathname={pathname} role={user.role} onNavigate={() => setMobileNav(false)} />
            </SheetContent>
          </Sheet>

          <button
            onClick={() => setCmdOpen(true)}
            className="hidden md:flex items-center gap-2 rounded-[4px] border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:bg-trove-surface w-72"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search transactions, settings…</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>

          <div className="flex-1" />

          <Button asChild variant="ghost" size="icon" aria-label="Notifications">
            <Link href="/notifications">
              <Bell className="h-4 w-4" />
            </Link>
          </Button>
          <div className="lg:hidden">
            <UserMenu user={user} compact />
          </div>
        </header>

        <main id="main" className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}

function SidebarNav({ pathname, role, onNavigate }: { pathname: string; role: "user" | "admin" | "owner"; onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex-1 overflow-y-auto p-3 space-y-1">
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm transition-colors",
              active ? "bg-trove-surface text-trove-ink" : "text-muted-foreground hover:bg-trove-surface/60 hover:text-trove-ink",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
            {active && <span className="ml-auto h-1 w-1 rounded-full bg-trove-gold" />}
          </Link>
        );
      })}

      <div className="my-4 border-t border-border" />

      <Link
        href="/settings"
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm",
          pathname.startsWith("/settings") ? "bg-trove-surface text-trove-ink" : "text-muted-foreground hover:bg-trove-surface/60 hover:text-trove-ink",
        )}
      >
        <Settings className="h-4 w-4" /> Settings
      </Link>
      <Link
        href="/support"
        onClick={onNavigate}
        className={cn("group flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm",
          pathname.startsWith("/support") ? "bg-trove-surface text-trove-ink" : "text-muted-foreground hover:bg-trove-surface/60 hover:text-trove-ink",
        )}
      >
        <LifeBuoy className="h-4 w-4" /> Support
      </Link>
      {(role === "admin" || role === "owner") && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="group flex items-center gap-2 rounded-[4px] px-3 py-2 text-sm text-muted-foreground hover:bg-trove-surface/60 hover:text-trove-ink"
        >
          <ShieldCheck className="h-4 w-4" /> Admin <Badge variant="gold" className="ml-auto">{role}</Badge>
        </Link>
      )}
    </nav>
  );
}

function UserMenu({ user, compact }: { user: AppUser; compact?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-[4px] px-2 py-1.5 text-left hover:bg-trove-surface",
            compact && "w-auto p-1",
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar ?? undefined} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          {!compact && (
            <>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/settings/profile">Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings/billing">Billing</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings/notifications">Notifications</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/settings/api-keys">API keys</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/auth/signout" method="post">
          <button type="submit" className="flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-sm hover:bg-trove-surface">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
