import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { WishlistService } from "./wishlist.services";

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.createWishlist({
    ...req.body,
    userId: req.user!.id,
  });
  res.status(201).json({ success: true, data: result });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await WishlistService.getWishlist(req.user!.id);
  res.status(200).json({ success: true, data: result });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  await WishlistService.deleteWishlist(req.params.id);
  res.status(200).json({ success: true, message: "Wishlist item deleted" });
});

const getAllWishlistItems = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user; // Assuming req.user is populated by auth middleware
  const query = { ...req.query };

  if (user && user.role !== 'ADMIN') {
    query.userId = user.id;
  }

  const result = await WishlistService.getAllWishlistItems(query);

  res.status(200).json({
    success: true,
    message: "Wishlist items retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const WishlistController = {
  createWishlist,
  getWishlist,
  deleteWishlist,
  getAllWishlistItems,
};
