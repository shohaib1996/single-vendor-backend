import { Request, Response } from "express";

import { ProductQuestionServices } from "./productQuestion.services";
import catchAsync from "../../utils/catchAsync";

const createProductQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductQuestionServices.createProductQuestion(req.body);

  res.status(200).json({
    success: true,
    message: "Product question created successfully",
    data: result,
  });
});

const getAllProductQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductQuestionServices.getAllProductQuestions();

  res.status(200).json({
    success: true,
    message: "Product questions retrieved successfully",
    data: result,
  });
});

const getSingleProductQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductQuestionServices.getSingleProductQuestion(id);

  res.status(200).json({
    success: true,
    message: "Product question retrieved successfully",
    data: result,
  });
});

const updateProductQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductQuestionServices.updateProductQuestion(id, req.body);

  res.status(200).json({
    success: true,
    message: "Product question updated successfully",
    data: result,
  });
});

const deleteProductQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductQuestionServices.deleteProductQuestion(id);

  res.status(200).json({
    success: true,
    message: "Product question deleted successfully",
    data: result,
  });
});

export const ProductQuestionController = {
  createProductQuestion,
  getAllProductQuestions,
  getSingleProductQuestion,
  updateProductQuestion,
  deleteProductQuestion,
};
