import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductAnswerServices } from './productAnswer.services';

const createProductAnswer = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductAnswerServices.createProductAnswer(req.body);

  res.status(200).json({
    success: true,
    message: 'Product answer created successfully',
    data: result,
  });
});

const getAllProductAnswers = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductAnswerServices.getAllProductAnswers();

  res.status(200).json({
    success: true,
    message: 'Product answers retrieved successfully',
    data: result,
  });
});

const getSingleProductAnswer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductAnswerServices.getSingleProductAnswer(id);

  res.status(200).json({
    success: true,
    message: 'Product answer retrieved successfully',
    data: result,
  });
});

const updateProductAnswer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductAnswerServices.updateProductAnswer(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Product answer updated successfully',
    data: result,
  });
});

const deleteProductAnswer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductAnswerServices.deleteProductAnswer(id);

  res.status(200).json({
    success: true,
    message: 'Product answer deleted successfully',
    data: result,
  });
});

export const ProductAnswerController = {
  createProductAnswer,
  getAllProductAnswers,
  getSingleProductAnswer,
  updateProductAnswer,
  deleteProductAnswer,
};
