"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionValidation = void 0;
const zod_1 = require("zod");
const createProductQuestionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string().min(1, { message: "Question is required" }),
        userId: zod_1.z.string().min(1, { message: "User ID is required" }),
        productId: zod_1.z.string().min(1, { message: "Product ID is required" }),
    }),
});
const updateProductQuestionZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        productId: zod_1.z.string().optional(),
    }),
});
exports.ProductQuestionValidation = {
    createProductQuestionZodSchema,
    updateProductQuestionZodSchema,
};
