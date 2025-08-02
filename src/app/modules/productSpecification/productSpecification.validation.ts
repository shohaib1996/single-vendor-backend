import { z } from "zod";

const create = z.object({
  body: z.object({
    key: z.string(),
    value: z.string(),
    productId: z.string(),
  }),
});

const update = z.object({
  body: z.object({
    key: z.string().optional(),
    value: z.string().optional(),
    productId: z.string().optional(),
  }),
});

export const ProductSpecificationValidation = {
  create,
  update,
};
