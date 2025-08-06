import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { DashboardServices } from "./dashboard.services";

const getAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardServices.getAnalytics();
  res.status(200).json({
    success: true,
    message: "Successfully fetched analytics",
    data: result,
  });
});

export const DashboardController = {
  getAnalytics,
};
