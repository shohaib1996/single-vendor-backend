import express from 'express';
import { FilterOptionController } from './filterOption.controller';
import validateRequest from '../../middleware/validateRequest';
import { FilterOptionValidation } from './filterOption.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(FilterOptionValidation.create),
  FilterOptionController.createFilterOption,
);
router.get('/', FilterOptionController.getFilterOptions);
router.get('/:id', FilterOptionController.getFilterOption);
router.patch(
  '/:id',
  validateRequest(FilterOptionValidation.update),
  FilterOptionController.updateFilterOption,
);
router.delete('/:id', FilterOptionController.deleteFilterOption);

export const FilterOptionRoutes = router;
