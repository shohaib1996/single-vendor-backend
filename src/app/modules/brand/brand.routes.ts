import express from 'express';
import { BrandController } from './brand.controller';
import validateRequest from '../../middleware/validateRequest';
import { brandValidationSchema } from './brand.validation';

const router = express.Router();

router.post(
  '/create-brand',
  validateRequest(brandValidationSchema.createBrand),
  BrandController.createBrand,
);

router.get(
  '/',
  BrandController.getAllBrands,
);

router.get(
  '/:id',
  BrandController.getSingleBrand,
);

router.patch(
  '/:id',
  validateRequest(brandValidationSchema.updateBrand),
  BrandController.updateBrand,
);

router.delete(
  '/:id',
  BrandController.deleteBrand,
);

export const BrandRoutes = router;