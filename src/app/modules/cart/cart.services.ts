import prisma from "../../lib/prisma";
import { ICart, ICartItem, ICartItemCreatePayload } from "./cart.interface";

const createCart = async (payload: ICartItemCreatePayload): Promise<ICart> => {
  const { userId, productId, quantity } = payload;

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
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
  return await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
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
  updateCartItem,
  deleteCartItem,
};
