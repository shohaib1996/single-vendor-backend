import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    rating: z.number()
      .int('Rating must be an integer')
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating must be at most 5' }),
    comment: z.string()
      .min(1, { message: 'Comment is required' }),
    userId: z.string()
      .min(1, { message: 'User ID is required' }),
    productId: z.string()
      .min(1, { message: 'Product ID is required' }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().optional(),
    userId: z.string().optional(),
    productId: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
