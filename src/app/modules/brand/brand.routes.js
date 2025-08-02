"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("./brand.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const brand_validation_1 = require("./brand.validation");
const router = express_1.default.Router();
router.post("/create-brand", (0, validateRequest_1.default)(brand_validation_1.brandValidationSchema.createBrand), brand_controller_1.BrandController.createBrand);
router.get("/", brand_controller_1.BrandController.getAllBrands);
router.get("/:id", brand_controller_1.BrandController.getSingleBrand);
router.patch("/:id", (0, validateRequest_1.default)(brand_validation_1.brandValidationSchema.updateBrand), brand_controller_1.BrandController.updateBrand);
router.delete("/:id", brand_controller_1.BrandController.deleteBrand);
exports.BrandRoutes = router;
