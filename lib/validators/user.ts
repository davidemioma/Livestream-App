import { z } from "zod";

export const UserSchema = z.object({
  bio: z.string().optional(),
});

export type UserValidator = z.infer<typeof UserSchema>;
