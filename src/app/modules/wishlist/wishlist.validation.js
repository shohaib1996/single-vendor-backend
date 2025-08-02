"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
    }),
});
exports.WishlistValidation = {
    create,
};
