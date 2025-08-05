import { Cart, CartItem } from "@prisma/client";

export type ICart = Cart & { items: CartItem[] };
export type ICartItem = CartItem;

export type ICartItemCreatePayload = {
  userId: string;
  productId: string;
  quantity: number;
};

export type ICartQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  userId?: string; // To filter by user for non-admin users
};
