import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../../app/middleware/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

router.get(
  '/',
  ReviewController.getAllReviews,
);

router.get(
  '/:id',
  ReviewController.getSingleReview,
);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);

router.delete(
  '/:id',
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
