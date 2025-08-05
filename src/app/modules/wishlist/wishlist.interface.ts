import { Wishlist } from "@prisma/client";

export type IWishlist = Wishlist;

export type IWishlistCreatePayload = {
  userId: string;
  productId: string;
};

export type IWishlistQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  userId?: string; // To filter by user for non-admin users
};
