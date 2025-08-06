import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(10, "Post must be at least 10 characters long")
    .max(2500, "Post must not exceed 2500 characters")
    .trim(),
});
