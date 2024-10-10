import { z } from "zod";

export const MovieCreateScheme = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(30000),
  ageRating: z.enum(["0", "6", "12", "16", "18"] as const),
  language: z.string().min(2).max(255),
});

export type MovieCreateValues = z.infer<typeof MovieCreateScheme>;
