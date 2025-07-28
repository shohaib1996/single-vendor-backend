import { z } from 'zod';

const createProductAnswerZodSchema = z.object({
  body: z.object({
    answer: z.string({
      required_error: 'Answer is required',
    }),
    questionId: z.string({
      required_error: 'Question ID is required',
    }),
    adminId: z.string({
      required_error: 'Admin ID is required',
    }),
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
