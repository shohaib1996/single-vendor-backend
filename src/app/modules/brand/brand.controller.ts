import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BrandServices } from './brand.services';

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.createBrandIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

const getAllBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await BrandServices.getAllBrands();

  res.status(200).json({
    success: true,
    message: 'Brands retrieved successfully',
    data: result,
  });
});

const getSingleBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandServices.getSingleBrand(id);

  res.status(200).json({
    success: true,
    message: 'Brand retrieved successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandServices.updateBrand(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BrandServices.deleteBrand(id);

  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully',
    data: result,
  });
});

export const BrandController = {
  createBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};