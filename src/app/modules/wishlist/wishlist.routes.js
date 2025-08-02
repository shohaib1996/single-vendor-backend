"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const wishlist_validation_1 = require("./wishlist.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)([client_1.Role.USER]), (0, validateRequest_1.default)(wishlist_validation_1.WishlistValidation.create), wishlist_controller_1.WishlistController.createWishlist);
router.get("/", (0, auth_1.default)([client_1.Role.USER]), wishlist_controller_1.WishlistController.getWishlist);
router.delete("/:id", (0, auth_1.default)([client_1.Role.USER]), wishlist_controller_1.WishlistController.deleteWishlist);
exports.WishlistRoutes = router;
