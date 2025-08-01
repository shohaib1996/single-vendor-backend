import { z } from "zod";

export const categoryValidationSchema = {
  createCategory: z.object({
    body: z.object({
      name: z.string(),
      slug: z.string(),
      parentId: z.string().optional(),
    }),
  }),
  updateCategory: z.object({
    body: z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      parentId: z.string().optional(),
    }),
  }),
};
