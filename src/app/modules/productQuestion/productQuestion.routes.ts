import express from "express";
import { ProductQuestionController } from "./productQuestion.controller";
import validateRequest from "../../../app/middleware/validateRequest";
import { ProductQuestionValidation } from "./productQuestion.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ProductQuestionValidation.createProductQuestionZodSchema),
  ProductQuestionController.createProductQuestion
);

router.get("/", ProductQuestionController.getAllProductQuestions);

router.get("/:id", ProductQuestionController.getSingleProductQuestion);

router.patch(
  "/:id",
  validateRequest(ProductQuestionValidation.updateProductQuestionZodSchema),
  ProductQuestionController.updateProductQuestion
);

router.delete("/:id", ProductQuestionController.deleteProductQuestion);

export const ProductQuestionRoutes = router;
