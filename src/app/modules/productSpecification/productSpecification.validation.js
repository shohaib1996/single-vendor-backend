"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecificationValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string(),
        value: zod_1.z.string(),
        productId: zod_1.z.string(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string().optional(),
        value: zod_1.z.string().optional(),
        productId: zod_1.z.string().optional(),
    }),
});
exports.ProductSpecificationValidation = {
    create,
    update,
};
