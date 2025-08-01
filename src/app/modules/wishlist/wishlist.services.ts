import prisma from "../../lib/prisma";
import { IWishlist, IWishlistCreatePayload } from "./wishlist.interface";

const createWishlist = async (payload: IWishlistCreatePayload): Promise<IWishlist> => {
  return await prisma.wishlist.create({ data: payload });
};

const getWishlist = async (userId: string): Promise<IWishlist[]> => {
  return await prisma.wishlist.findMany({ where: { userId } });
};

const deleteWishlist = async (id: string): Promise<IWishlist> => {
  return await prisma.wishlist.delete({ where: { id } });
};

export const WishlistService = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
