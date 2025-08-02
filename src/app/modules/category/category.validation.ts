import { z } from "zod";

export const categoryValidationSchema = {
  createCategory: z.object({
    body: z.object({
      name: z.string(),
      slug: z.string(),
      icon: z.string().optional(),
      description: z.string().optional(),
      parentId: z.string().optional(),
    }),
  }),
  updateCategory: z.object({
    body: z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      icon: z.string().optional(),
      description: z.string().optional(),
      parentId: z.string().optional(),
    }),
  }),
};
