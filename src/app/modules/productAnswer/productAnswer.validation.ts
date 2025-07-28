import { z } from 'zod';

const createProductAnswerZodSchema = z.object({
  body: z.object({
    answer: z.string()
      .min(1, { message: 'Answer is required' }),
    questionId: z.string()
      .min(1, { message: 'Question ID is required' }),
    adminId: z.string()
      .min(1, { message: 'Admin ID is required' }),
  }),
});

const updateProductAnswerZodSchema = z.object({
  body: z.object({
    answer: z.string().optional(),
    questionId: z.string().optional(),
    adminId: z.string().optional(),
  }),
});

export const ProductAnswerValidation = {
  createProductAnswerZodSchema,
  updateProductAnswerZodSchema,
};
