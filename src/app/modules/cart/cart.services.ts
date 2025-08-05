import prisma from "../../lib/prisma";
import { ICart, ICartItem, ICartItemCreatePayload, ICartQuery } from "./cart.interface";

const createCart = async (payload: ICartItemCreatePayload): Promise<ICart> => {
  const { userId, productId, quantity } = payload;

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId},
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  return updatedCart as ICart;
};

const getCart = async (userId: string): Promise<ICart | null> => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        }
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              brand: true,
              images: true,
            },
          },
        },
      },
    },
  });
};

const getAllCartItems = async (query: ICartQuery) => {
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

  const cartItems = await prisma.cart.findMany({
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
      items: {
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
      },
    },
  });

  const total = await prisma.cart.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: cartItems,
  };
};

const updateCartItem = async (cartItemId: string, quantity: number): Promise<ICartItem> => {
  return await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
};

const deleteCartItem = async (cartItemId: string): Promise<ICartItem> => {
  return await prisma.cartItem.delete({ where: { id: cartItemId } });
};

export const CartService = {
  createCart,
  getCart,
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
};
