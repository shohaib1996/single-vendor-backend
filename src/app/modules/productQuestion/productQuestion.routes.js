"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productQuestion_controller_1 = require("./productQuestion.controller");
const validateRequest_1 = __importDefault(require("../../../app/middleware/validateRequest"));
const productQuestion_validation_1 = require("./productQuestion.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(productQuestion_validation_1.ProductQuestionValidation.createProductQuestionZodSchema), productQuestion_controller_1.ProductQuestionController.createProductQuestion);
router.get("/", productQuestion_controller_1.ProductQuestionController.getAllProductQuestions);
router.get("/:id", productQuestion_controller_1.ProductQuestionController.getSingleProductQuestion);
router.patch("/:id", (0, validateRequest_1.default)(productQuestion_validation_1.ProductQuestionValidation.updateProductQuestionZodSchema), productQuestion_controller_1.ProductQuestionController.updateProductQuestion);
router.delete("/:id", productQuestion_controller_1.ProductQuestionController.deleteProductQuestion);
exports.ProductQuestionRoutes = router;
