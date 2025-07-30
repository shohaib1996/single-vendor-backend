import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { WishlistService } from './wishlist.services';

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
  res.status(200).json({ success: true, message: 'Wishlist item deleted' });
});

export const WishlistController = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
