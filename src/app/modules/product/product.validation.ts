import { z } from "zod";

export const productValidationSchema = {
  createProduct: z.object({
    body: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      stock: z.number().int(),
      images: z.array(z.string().url()),
      featured: z.boolean().optional(),
      isDiscountActive: z.boolean().optional(),
      discountPercentage: z.number().optional(),
      discountedPrice: z.number().optional(),
      discountValidUntil: z.string().datetime().optional(),
      categoryId: z.string().optional(),
      brandId: z.string().optional(),
    }),
  }),
  updateProduct: z.object({
    body: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      stock: z.number().int().optional(),
      images: z.array(z.string().url()).optional(),
      featured: z.boolean().optional(),
      isDiscountActive: z.boolean().optional(),
      discountPercentage: z.number().optional(),
      discountedPrice: z.number().optional(),
      discountValidUntil: z.string().datetime().optional(),
      categoryId: z.string().optional(),
      brandId: z.string().optional(),
    }),
  }),
};
