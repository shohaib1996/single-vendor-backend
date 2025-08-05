import prisma from "../../lib/prisma";
import { IWishlist, IWishlistCreatePayload, IWishlistQuery } from "./wishlist.interface";

const createWishlist = async (payload: IWishlistCreatePayload): Promise<IWishlist> => {
  return await prisma.wishlist.create({ data: payload });
};

const getWishlist = async (userId: string): Promise<IWishlist[]> => {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
        },
      },
    },
  });
};

const getAllWishlistItems = async (query: IWishlistQuery) => {
  const { page, limit, searchTerm, userId } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (userId) {
    where.AND.push({ userId: userId });
  }

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          user: {
            email: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  // If no conditions in AND, remove it to avoid empty AND clause
  if (where.AND.length === 0) {
    delete where.AND;
  }

  const wishlistItems = await prisma.wishlist.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
        },
      },
    },
  });

  const total = await prisma.wishlist.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: wishlistItems,
  };
};

const deleteWishlist = async (id: string): Promise<IWishlist> => {
  return await prisma.wishlist.delete({ where: { id } });
};

export const WishlistService = {
  createWishlist,
  getWishlist,
  getAllWishlistItems,
  deleteWishlist,
};
