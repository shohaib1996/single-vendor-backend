import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getProfile(req.user!.id);

  res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  updateUser,
  getProfile
};
