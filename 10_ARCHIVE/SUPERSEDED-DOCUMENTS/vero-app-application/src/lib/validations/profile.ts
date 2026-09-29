import { z } from "zod";

export const CAREER_CATEGORIES = [
  "culinary",
  "creative",
  "family",
  "ops",
  "fitness",
  "events",
] as const;

export const CITY_ZONES = [
  "whitefield",
  "hsr-layout",
  "koramangala",
  "sarjapur",
  "electronic-city",
] as const;

export const profileSchema = z.object({
  displayName: z.string().min(2).max(60).optional().or(z.literal("")),
  bio: z.string().max(600).optional().or(z.literal("")),
  careerPath: z.string().min(1, "Pick a career path"),
  skills: z
    .array(z.string().min(1).max(40))
    .min(1, "Add at least one skill")
    .max(12, "Maximum 12 skills"),
  city: z.literal("bengaluru"),
  zone: z.enum(CITY_ZONES, { message: "Pick a zone" }),
});

export type ProfileInput = z.infer<typeof profileSchema>;
