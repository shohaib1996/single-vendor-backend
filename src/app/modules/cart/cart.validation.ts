import { z } from 'zod';

const create = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  }),
});

const update = z.object({
  body: z.object({
    quantity: z.number().int().positive(),
  }),
});

export const CartValidation = {
  create,
  update,
};
