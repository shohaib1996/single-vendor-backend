import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user; // Assuming req.user is populated by auth middleware
  let userId: string | undefined;

  if (user && user.role !== 'ADMIN') {
    userId = user.id;
  }

  const result = await OrderServices.getAllOrders(userId);

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrder(id);

  res.status(200).json({
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrder(id, req.body);

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrder(id);

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
