import { z } from "zod";
import { OrderStatus } from "@prisma/client";

const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const orderValidationSchema = {
  createOrder: z.object({
    body: z.object({
      userId: z.string(),
      orderItems: z.array(orderItemSchema),
    }),
  }),
  updateOrder: z.object({
    body: z.object({
      status: z.nativeEnum(OrderStatus).optional(),
    }),
  }),
};
