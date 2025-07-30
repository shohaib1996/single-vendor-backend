import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CartService } from './cart.services';

const createCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.createCart({
    ...req.body,
    userId: req.user!.id,
  });
  res.status(201).json({ success: true, data: result });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.getCart(req.user!.id);
  res.status(200).json({ success: true, data: result });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.updateCartItem(
    req.params.id,
    req.body.quantity,
  );
  res.status(200).json({ success: true, data: result });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  await CartService.deleteCartItem(req.params.id);
  res.status(200).json({ success: true, message: 'Cart item deleted' });
});

export const CartController = {
  createCart,
  getCart,
  updateCartItem,
  deleteCartItem,
};
