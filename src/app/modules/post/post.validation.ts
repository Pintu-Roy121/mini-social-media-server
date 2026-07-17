import z from "zod";
import { PostVisibility } from "./post.interface";

export const postCreateZodSchema = z.object({
  text: z.string().trim().min(1, "text is required"),
  image: z.string().optional(),
  visibility: z
    .enum(Object.values(PostVisibility) as [string])
    .default(PostVisibility.PUBLIC),
});
