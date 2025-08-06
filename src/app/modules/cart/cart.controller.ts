import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CartService } from "./cart.services";

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
  const result = await CartService.updateCartItem(req.params.id, req.body.quantity);
  res.status(200).json({ success: true, data: result });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  await CartService.deleteCartItem(req.params.id);
  res.status(200).json({ success: true, message: "Cart item deleted" });
});

const getAllCartItems = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user; // Assuming req.user is populated by auth middleware
  const query = { ...req.query };

  if (user && user.role !== "ADMIN") {
    query.userId = user.id;
  }

  const result = await CartService.getAllCartItems(query);

  res.status(200).json({
    success: true,
    message: "Cart items retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const CartController = {
  createCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  getAllCartItems,
};
