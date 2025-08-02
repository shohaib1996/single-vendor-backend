"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)([client_1.Role.USER]), (0, validateRequest_1.default)(cart_validation_1.CartValidation.create), cart_controller_1.CartController.createCart);
router.get("/", (0, auth_1.default)([client_1.Role.USER]), cart_controller_1.CartController.getCart);
router.patch("/:id", (0, auth_1.default)([client_1.Role.USER]), (0, validateRequest_1.default)(cart_validation_1.CartValidation.update), cart_controller_1.CartController.updateCartItem);
router.delete("/:id", (0, auth_1.default)([client_1.Role.USER]), cart_controller_1.CartController.deleteCartItem);
exports.CartRoutes = router;
