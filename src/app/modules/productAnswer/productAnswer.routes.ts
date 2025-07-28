import express from 'express';
import { ProductAnswerController } from './productAnswer.controller';
import validateRequest from '../../../app/middleware/validateRequest';
import { ProductAnswerValidation } from './productAnswer.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductAnswerValidation.createProductAnswerZodSchema),
  ProductAnswerController.createProductAnswer,
);

router.get(
  '/',
  ProductAnswerController.getAllProductAnswers,
);

router.get(
  '/:id',
  ProductAnswerController.getSingleProductAnswer,
);

router.patch(
  '/:id',
  validateRequest(ProductAnswerValidation.updateProductAnswerZodSchema),
  ProductAnswerController.updateProductAnswer,
);

router.delete(
  '/:id',
  ProductAnswerController.deleteProductAnswer,
);

export const ProductAnswerRoutes = router;
