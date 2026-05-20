"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Valid email please"),
  topic: z.enum(["general", "sales", "support", "press", "security"]),
  message: z.string().min(20, "A bit more detail helps").max(2000),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: "general" },
  });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Couldn't send. Try again or email hello@trove.vroelabs.com directly.");
      return;
    }
    toast.success("Got it. We'll be in touch shortly.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Maya Reed" autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" placeholder="you@email.com" autoComplete="email" />
        </Field>
      </div>
      <Field label="Topic" error={errors.topic?.message}>
        <Select value={watch("topic")} onValueChange={(v) => setValue("topic", v as FormValues["topic"], { shouldValidate: true })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="sales">Sales / Team plan</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="press">Press</SelectItem>
            <SelectItem value="security">Security disclosure</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <Textarea {...register("message")} rows={6} placeholder="Tell us what's on your mind…" />
      </Field>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">By submitting, you agree to our <a href="/privacy" className="link-ft">privacy policy</a>.</p>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>Send message</Button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-trove-danger" role="alert">{error}</p>}
    </div>
  );
}
