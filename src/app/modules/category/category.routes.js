"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post("/create-category", (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.createCategory), category_controller_1.CategoryController.createCategory);
router.get("/", category_controller_1.CategoryController.getAllCategories);
router.get("/:id", category_controller_1.CategoryController.getSingleCategory);
router.patch("/:id", (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.updateCategory), category_controller_1.CategoryController.updateCategory);
router.delete("/:id", category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
