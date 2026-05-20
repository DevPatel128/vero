"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

const schema = z.object({
  subject: z.string().min(4).max(200),
  body: z.string().min(20).max(4000),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
});
type FormValues = z.infer<typeof schema>;

export function SupportTicketForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "normal" },
  });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Couldn't submit. Try email instead.");
      return;
    }
    toast.success("Ticket submitted. We'll be in touch.");
    router.push("/support");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" {...register("subject")} placeholder="In one line — what's going on?" />
        {errors.subject && <p className="text-xs text-trove-danger">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Describe the issue</Label>
        <Textarea id="body" rows={8} {...register("body")} placeholder="Steps to reproduce, expected vs actual, screenshots if helpful…" />
        {errors.body && <p className="text-xs text-trove-danger">{errors.body.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Priority</Label>
        <Select value={watch("priority")} onValueChange={(v) => setValue("priority", v as FormValues["priority"])}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent (security/data loss)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>Submit ticket</Button>
    </form>
  );
}
