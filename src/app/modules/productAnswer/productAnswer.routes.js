"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productAnswer_controller_1 = require("./productAnswer.controller");
const validateRequest_1 = __importDefault(require("../../../app/middleware/validateRequest"));
const productAnswer_validation_1 = require("./productAnswer.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(productAnswer_validation_1.ProductAnswerValidation.createProductAnswerZodSchema), productAnswer_controller_1.ProductAnswerController.createProductAnswer);
router.get("/", productAnswer_controller_1.ProductAnswerController.getAllProductAnswers);
router.get("/:id", productAnswer_controller_1.ProductAnswerController.getSingleProductAnswer);
router.patch("/:id", (0, validateRequest_1.default)(productAnswer_validation_1.ProductAnswerValidation.updateProductAnswerZodSchema), productAnswer_controller_1.ProductAnswerController.updateProductAnswer);
router.delete("/:id", productAnswer_controller_1.ProductAnswerController.deleteProductAnswer);
exports.ProductAnswerRoutes = router;
