import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidationSchema } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(productValidationSchema.createProduct),
  ProductController.createProduct,
);

router.get(
  '/',
  ProductController.getAllProducts,
);

router.get(
  '/:id',
  ProductController.getSingleProduct,
);

router.patch(
  '/:id',
  validateRequest(productValidationSchema.updateProduct),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  ProductController.deleteProduct,
);

export const ProductRoutes = router;