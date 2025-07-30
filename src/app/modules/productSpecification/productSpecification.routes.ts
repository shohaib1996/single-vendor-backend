import express from 'express';
import { ProductSpecificationController } from './productSpecification.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductSpecificationValidation } from './productSpecification.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductSpecificationValidation.create),
  ProductSpecificationController.createProductSpecification,
);
router.get('/', ProductSpecificationController.getProductSpecifications);
router.get('/:id', ProductSpecificationController.getProductSpecification);
router.patch(
  '/:id',
  validateRequest(ProductSpecificationValidation.update),
  ProductSpecificationController.updateProductSpecification,
);
router.delete('/:id', ProductSpecificationController.deleteProductSpecification);

export const ProductSpecificationRoutes = router;
