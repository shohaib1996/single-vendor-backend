import { Wishlist } from "@prisma/client";

export type IWishlist = Wishlist;

export type IWishlistCreatePayload = {
  userId: string;
  productId: string;
};
