import { z } from "zod";

export const StreamSchema = z.object({
  name: z.string().min(2, {
    message: "Stream name must be at least 2 characters.",
  }),
  thumbnailUrl: z.string().optional(),
});

export type StreamValidator = z.infer<typeof StreamSchema>;
