import { z } from "zod";

export const authResponseSchema = z.object({
  accessToken: z.string(),
  message: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;