"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const orderItemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    price: zod_1.z.number().positive(),
});
exports.orderValidationSchema = {
    createOrder: zod_1.z.object({
        body: zod_1.z.object({
            userId: zod_1.z.string(),
            orderItems: zod_1.z.array(orderItemSchema),
        }),
    }),
    updateOrder: zod_1.z.object({
        body: zod_1.z.object({
            status: zod_1.z.nativeEnum(client_1.OrderStatus).optional(),
        }),
    }),
};
