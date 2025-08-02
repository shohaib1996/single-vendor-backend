"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandValidationSchema = void 0;
const zod_1 = require("zod");
exports.brandValidationSchema = {
    createBrand: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string(),
            categoryIds: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    }),
    updateBrand: zod_1.z.object({
        body: zod_1.z.object({
            name: zod_1.z.string().optional(),
            categoryIds: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    }),
};
