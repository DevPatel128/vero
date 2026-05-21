import { z } from "zod";

export const joinSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(255)
    .email("Enter a valid email."),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.enum(["worker", "business"]),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  useCase: z.string().trim().max(500).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  referredBy: z.string().trim().max(64).optional().or(z.literal("")),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
  // Consent — must be true
  consent: z
    .union([z.boolean(), z.string()])
    .refine(
      (v) => v === true || v === "on" || v === "true",
      "You must agree to the privacy notice.",
    ),
});

export type JoinInput = z.infer<typeof joinSchema>;

