import { z } from "zod";

export const createPostItSchema = z.object({
  title: z.string().default(""),
  content: z
    .string({
      required_error: "El contenido es requerido",
    })
    .nonempty(),
  tags: z.array(z.string()).default([]),
  favourite: z.boolean().default(false),
  color: z
    .enum(["neutral", "red", "blue", "orange", "green", "yellow", "purple"])
    .default("neutral"),
});
