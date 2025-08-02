"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const wishlist_services_1 = require("./wishlist.services");
const createWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_services_1.WishlistService.createWishlist(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    res.status(201).json({ success: true, data: result });
}));
const getWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_services_1.WishlistService.getWishlist(req.user.id);
    res.status(200).json({ success: true, data: result });
}));
const deleteWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield wishlist_services_1.WishlistService.deleteWishlist(req.params.id);
    res.status(200).json({ success: true, message: "Wishlist item deleted" });
}));
exports.WishlistController = {
    createWishlist,
    getWishlist,
    deleteWishlist,
};
