import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidationSchema.createUser),
  UserController.createUser,
);
router.post(
  '/signin',
  validateRequest(userValidationSchema.loginUser),
  UserController.loginUser,
);

export const UserRoutes = router;