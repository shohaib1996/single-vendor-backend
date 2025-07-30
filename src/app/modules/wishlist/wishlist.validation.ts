import { z } from 'zod';

const create = z.object({
  body: z.object({
    productId: z.string(),
  }),
});

export const WishlistValidation = {
  create,
};
