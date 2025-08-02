"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const filterOption_controller_1 = require("./filterOption.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const filterOption_validation_1 = require("./filterOption.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(filterOption_validation_1.FilterOptionValidation.create), filterOption_controller_1.FilterOptionController.createFilterOption);
router.get("/", filterOption_controller_1.FilterOptionController.getFilterOptions);
router.get("/:id", filterOption_controller_1.FilterOptionController.getFilterOption);
router.patch("/:id", (0, validateRequest_1.default)(filterOption_validation_1.FilterOptionValidation.update), filterOption_controller_1.FilterOptionController.updateFilterOption);
router.delete("/:id", filterOption_controller_1.FilterOptionController.deleteFilterOption);
exports.FilterOptionRoutes = router;
