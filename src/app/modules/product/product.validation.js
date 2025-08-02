"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = {
    createProduct: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string(),
            description: zod_1.z.string(),
            price: zod_1.z.number(),
            stock: zod_1.z.number().int(),
            images: zod_1.z.array(zod_1.z.string().url()),
            featured: zod_1.z.boolean().optional(),
            isDiscountActive: zod_1.z.boolean().optional(),
            discountPercentage: zod_1.z.number().optional(),
            discountedPrice: zod_1.z.number().optional(),
            discountValidUntil: zod_1.z.string().datetime().optional(),
            categoryId: zod_1.z.string().optional(),
            brandId: zod_1.z.string().optional(),
        }),
    }),
    updateProduct: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            price: zod_1.z.number().optional(),
            stock: zod_1.z.number().int().optional(),
            images: zod_1.z.array(zod_1.z.string().url()).optional(),
            featured: zod_1.z.boolean().optional(),
            isDiscountActive: zod_1.z.boolean().optional(),
            discountPercentage: zod_1.z.number().optional(),
            discountedPrice: zod_1.z.number().optional(),
            discountValidUntil: zod_1.z.string().datetime().optional(),
            categoryId: zod_1.z.string().optional(),
            brandId: zod_1.z.string().optional(),
        }),
    }),
};
