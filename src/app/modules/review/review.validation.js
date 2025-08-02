"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number()
            .int("Rating must be an integer")
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating must be at most 5" }),
        comment: zod_1.z.string().min(1, { message: "Comment is required" }),
        userId: zod_1.z.string().min(1, { message: "User ID is required" }),
        productId: zod_1.z.string().min(1, { message: "Product ID is required" }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().int().min(1).max(5).optional(),
        comment: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        productId: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
