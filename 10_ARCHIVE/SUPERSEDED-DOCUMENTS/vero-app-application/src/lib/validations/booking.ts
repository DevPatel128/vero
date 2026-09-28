import { z } from "zod";

export const applySchema = z.object({
  opportunityId: z.string().uuid("Invalid opportunity"),
  message: z.string().min(10, "Add a short note").max(800).optional().or(z.literal("")),
});

export const hireSchema = z.object({
  bookingId: z.string().uuid(),
});

export const signSchema = z.object({
  bookingId: z.string().uuid(),
  side: z.enum(["worker", "business"]),
});

export const submitWorkSchema = z.object({
  bookingId: z.string().uuid(),
  note: z.string().max(1000).optional().or(z.literal("")),
});

export type ApplyInput = z.infer<typeof applySchema>;
export type HireInput = z.infer<typeof hireSchema>;
export type SignInput = z.infer<typeof signSchema>;
