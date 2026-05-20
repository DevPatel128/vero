"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Wallet, Link2, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/toast";
import { TroveMark } from "@/components/marketing/trove-mark";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "About you",    icon: Sparkles },
  { id: 2, label: "Currency",     icon: DollarSign },
  { id: 3, label: "First account", icon: Wallet },
  { id: 4, label: "Connect data", icon: Link2 },
];

export function OnboardingFlow({ initialName, currency }: { initialName: string; currency: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialName);
  const [curr, setCurr] = useState(currency || "USD");
  const [income, setIncome] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [submitting, setSubmitting] = useState(false);

  const progress = (step / STEPS.length) * 100;

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const finish = async () => {
    setSubmitting(true);
    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, currency: curr, monthly_income: Number(income) || 0, account: { name: accountName, type: accountType } }),
    });
    if (!res.ok) {
      toast.error("Couldn't complete setup. Try again.");
      setSubmitting(false);
      return;
    }
    router.push("/dashboard?welcome=1");
  };

  return (
    <div className="min-h-dvh bg-background flex items-center px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-10">
          <TroveMark className="h-7 w-7" />
          <span className="font-serif text-xl tracking-tight">Trove</span>
        </div>

        <Progress value={progress} className="mb-2" />
        <div className="mb-10 flex justify-between text-xs text-muted-foreground">
          {STEPS.map((s) => (
            <div key={s.id} className={cn("flex items-center gap-1.5", step >= s.id && "text-trove-ink")}>
              {step > s.id ? <Check className="h-3 w-3" /> : <s.icon className="h-3 w-3" />}
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <Card className="p-8 md:p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="display-serif text-3xl tracking-tight">Welcome to Trove.</h2>
                <p className="mt-2 text-muted-foreground">Let's get you set up in under three minutes.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maya Reed" autoFocus />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="display-serif text-3xl tracking-tight">Pick your currency.</h2>
                <p className="mt-2 text-muted-foreground">You can change this later. Multi-currency is a Pro feature.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Primary currency</Label>
                <Select value={curr} onValueChange={setCurr}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["USD","EUR","GBP","INR","CAD","AUD","JPY","SGD"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Monthly take-home income (optional)</Label>
                <Input id="income" type="number" inputMode="decimal" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="5000" />
                <p className="text-xs text-muted-foreground">Used for cash-flow math. Edit anytime.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="display-serif text-3xl tracking-tight">Add a first account.</h2>
                <p className="mt-2 text-muted-foreground">Doesn't have to be every account. Start with one.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account name</Label>
                <Input id="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Chase Checking" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Type</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="credit">Credit card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="display-serif text-3xl tracking-tight">Bring in your data.</h2>
                <p className="mt-2 text-muted-foreground">Two ways. Both work. Skip if you'd rather start clean.</p>
              </div>
              <div className="grid gap-3">
                <Card className="p-5 hover:bg-trove-cream cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg">Connect a bank (Plaid)</p>
                      <p className="text-sm text-muted-foreground">Read-only. 12,000+ U.S. banks. 30 seconds.</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
                <Card className="p-5 hover:bg-trove-cream cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg">Import a CSV</p>
                      <p className="text-sm text-muted-foreground">From any bank. Drop the file later.</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 1}>Back</Button>
            {step < STEPS.length ? (
              <Button onClick={next} disabled={step === 1 && !name.trim()}>Continue <ChevronRight className="h-4 w-4" /></Button>
            ) : (
              <Button onClick={finish} loading={submitting} disabled={submitting}>Finish setup</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
