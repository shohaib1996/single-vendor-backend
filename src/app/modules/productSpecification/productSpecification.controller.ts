import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductSpecificationService } from "./productSpecification.services";

const createProductSpecification = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductSpecificationService.createProductSpecification(req.body);
  res.status(201).json({ success: true, data: result });
});

const getProductSpecifications = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductSpecificationService.getProductSpecifications();
  res.status(200).json({ success: true, data: result });
});

const getProductSpecification = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductSpecificationService.getProductSpecification(req.params.id);
  res.status(200).json({ success: true, data: result });
});

const updateProductSpecification = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductSpecificationService.updateProductSpecification(
    req.params.id,
    req.body
  );
  res.status(200).json({ success: true, data: result });
});

const deleteProductSpecification = catchAsync(async (req: Request, res: Response) => {
  await ProductSpecificationService.deleteProductSpecification(req.params.id);
  res.status(200).json({ success: true, message: "Product specification deleted" });
});

export const ProductSpecificationController = {
  createProductSpecification,
  getProductSpecifications,
  getProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
};
