"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productSpecification_controller_1 = require("./productSpecification.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const productSpecification_validation_1 = require("./productSpecification.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(productSpecification_validation_1.ProductSpecificationValidation.create), productSpecification_controller_1.ProductSpecificationController.createProductSpecification);
router.get("/", productSpecification_controller_1.ProductSpecificationController.getProductSpecifications);
router.get("/:id", productSpecification_controller_1.ProductSpecificationController.getProductSpecification);
router.patch("/:id", (0, validateRequest_1.default)(productSpecification_validation_1.ProductSpecificationValidation.update), productSpecification_controller_1.ProductSpecificationController.updateProductSpecification);
router.delete("/:id", productSpecification_controller_1.ProductSpecificationController.deleteProductSpecification);
exports.ProductSpecificationRoutes = router;
