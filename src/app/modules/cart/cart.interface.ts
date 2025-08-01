import { Cart, CartItem } from "@prisma/client";

export type ICart = Cart & { items: CartItem[] };
export type ICartItem = CartItem;

export type ICartItemCreatePayload = {
  userId: string;
  productId: string;
  quantity: number;
};
