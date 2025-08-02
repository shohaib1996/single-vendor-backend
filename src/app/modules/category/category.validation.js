"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.categoryValidationSchema = {
    createCategory: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string(),
            slug: zod_1.z.string(),
            icon: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            parentId: zod_1.z.string().optional(),
        }),
    }),
    updateCategory: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().optional(),
            slug: zod_1.z.string().optional(),
            icon: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            parentId: zod_1.z.string().optional(),
        }),
    }),
};
