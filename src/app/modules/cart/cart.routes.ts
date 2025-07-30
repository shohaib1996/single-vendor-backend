import express from 'express';
import { CartController } from './cart.controller';
import validateRequest from '../../middleware/validateRequest';
import { CartValidation } from './cart.validation';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth([Role.USER]),
  validateRequest(CartValidation.create),
  CartController.createCart,
);
router.get('/', auth([Role.USER]), CartController.getCart);
router.patch(
  '/:id',
  auth([Role.USER]),
  validateRequest(CartValidation.update),
  CartController.updateCartItem,
);
router.delete('/:id', auth([Role.USER]), CartController.deleteCartItem);

export const CartRoutes = router;
