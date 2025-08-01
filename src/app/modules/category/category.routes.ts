import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidationSchema } from "./category.validation";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(categoryValidationSchema.createCategory),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getSingleCategory);

router.patch(
  "/:id",
  validateRequest(categoryValidationSchema.updateCategory),
  CategoryController.updateCategory
);

router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
