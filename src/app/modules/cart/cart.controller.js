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
exports.CartController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cart_services_1 = require("./cart.services");
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_services_1.CartService.createCart(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    res.status(201).json({ success: true, data: result });
}));
const getCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_services_1.CartService.getCart(req.user.id);
    res.status(200).json({ success: true, data: result });
}));
const updateCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_services_1.CartService.updateCartItem(req.params.id, req.body.quantity);
    res.status(200).json({ success: true, data: result });
}));
const deleteCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_services_1.CartService.deleteCartItem(req.params.id);
    res.status(200).json({ success: true, message: "Cart item deleted" });
}));
exports.CartController = {
    createCart,
    getCart,
    updateCartItem,
    deleteCartItem,
};
