"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerValidation = void 0;
const zod_1 = require("zod");
const createProductAnswerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z.string().min(1, { message: "Answer is required" }),
        questionId: zod_1.z.string().min(1, { message: "Question ID is required" }),
        adminId: zod_1.z.string().min(1, { message: "Admin ID is required" }),
    }),
});
const updateProductAnswerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        answer: zod_1.z.string().optional(),
        questionId: zod_1.z.string().optional(),
        adminId: zod_1.z.string().optional(),
    }),
});
exports.ProductAnswerValidation = {
    createProductAnswerZodSchema,
    updateProductAnswerZodSchema,
};
