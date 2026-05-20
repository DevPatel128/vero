"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftRight, BarChart3, FileBarChart, LayoutDashboard, LogOut, PiggyBank, Plus, Repeat, Settings, Target, User } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search Trove… (transactions, pages, actions)" />
      <CommandList>
        <CommandEmpty>Nothing matched. Try another search.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {[
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, shortcut: "G D" },
            { label: "Transactions", href: "/transactions", icon: ArrowLeftRight, shortcut: "G T" },
            { label: "Analytics", href: "/analytics", icon: BarChart3, shortcut: "G A" },
            { label: "Subscriptions", href: "/subscriptions", icon: Repeat },
            { label: "Budgets", href: "/budgets", icon: PiggyBank },
            { label: "Goals", href: "/goals", icon: Target },
            { label: "Reports", href: "/reports", icon: FileBarChart },
          ].map((i) => (
            <CommandItem key={i.href} onSelect={() => go(i.href)}>
              <i.icon className="h-4 w-4" />
              <span>{i.label}</span>
              {i.shortcut && <CommandShortcut>{i.shortcut}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go("/transactions?new=1")}>
            <Plus className="h-4 w-4" /> New transaction
          </CommandItem>
          <CommandItem onSelect={() => go("/budgets?new=1")}>
            <Plus className="h-4 w-4" /> New budget
          </CommandItem>
          <CommandItem onSelect={() => go("/goals?new=1")}>
            <Plus className="h-4 w-4" /> New goal
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem onSelect={() => go("/settings/profile")}><User className="h-4 w-4" /> Profile</CommandItem>
          <CommandItem onSelect={() => go("/settings")}><Settings className="h-4 w-4" /> Settings</CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); document.forms[0]?.requestSubmit?.(); }}>
            <LogOut className="h-4 w-4" /> Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
