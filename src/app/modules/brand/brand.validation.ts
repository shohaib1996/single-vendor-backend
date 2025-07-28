import { z } from 'zod';

export const brandValidationSchema = {
  createBrand: z.object({
    body: z.object({
      name: z.string(),
    }),
  }),
  updateBrand: z.object({
    body: z.object({
      name: z.string().optional(),
    }),
  }),
};