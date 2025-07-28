import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required',
    }).int().min(1).max(5),
    comment: z.string({
      required_error: 'Comment is required',
    }),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    productId: z.string({
      required_error: 'Product ID is required',
    }),
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
