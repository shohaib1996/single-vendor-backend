import { z } from "zod";

const createProductQuestionZodSchema = z.object({
  body: z.object({
    question: z.string().min(1, { message: "Question is required" }),
    userId: z.string().min(1, { message: "User ID is required" }),
    productId: z.string().min(1, { message: "Product ID is required" }),
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
