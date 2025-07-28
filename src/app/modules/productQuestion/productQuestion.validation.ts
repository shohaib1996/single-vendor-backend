import { z } from 'zod';

const createProductQuestionZodSchema = z.object({
  body: z.object({
    question: z.string({
      required_error: 'Question is required',
    }),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    productId: z.string({
      required_error: 'Product ID is required',
    }),
  }),
});

const updateProductQuestionZodSchema = z.object({
  body: z.object({
    question: z.string().optional(),
    userId: z.string().optional(),
    productId: z.string().optional(),
  }),
});

export const ProductQuestionValidation = {
  createProductQuestionZodSchema,
  updateProductQuestionZodSchema,
};
