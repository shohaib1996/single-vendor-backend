"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().positive(),
    }),
});
exports.CartValidation = {
    create,
    update,
};
