"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.userValidationSchema.createUser), user_controller_1.UserController.createUser);
router.post("/signin", (0, validateRequest_1.default)(user_validation_1.userValidationSchema.loginUser), user_controller_1.UserController.loginUser);
router.patch("/:id", (0, validateRequest_1.default)(user_validation_1.userValidationSchema.updateUser), user_controller_1.UserController.updateUser);
exports.UserRoutes = router;
