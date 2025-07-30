import { z } from 'zod';

export const brandValidationSchema = {
  createBrand: z.object({
    body: z.object({
      name: z.string(),
      categoryIds: z.array(z.string()).optional(),
    }),
  }),
  updateBrand: z.object({
    body: z.object({
      name: z.string().optional(),
      categoryIds: z.array(z.string()).optional(),
    }),
  }),
};
