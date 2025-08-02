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
exports.CartService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = payload;
    let cart = yield prisma_1.default.cart.findUnique({ where: { userId } });
    if (!cart) {
        cart = yield prisma_1.default.cart.create({ data: { userId } });
    }
    const cartItem = yield prisma_1.default.cartItem.findFirst({
        where: { cartId: cart.id, productId },
    });
    if (cartItem) {
        yield prisma_1.default.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: cartItem.quantity + quantity },
        });
    }
    else {
        yield prisma_1.default.cartItem.create({
            data: { cartId: cart.id, productId, quantity },
        });
    }
    const updatedCart = yield prisma_1.default.cart.findUnique({ where: { userId }, include: { items: true } });
    return updatedCart;
});
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cart.findUnique({ where: { userId }, include: { items: true } });
});
const updateCartItem = (cartItemId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
    });
});
const deleteCartItem = (cartItemId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.cartItem.delete({ where: { id: cartItemId } });
});
exports.CartService = {
    createCart,
    getCart,
    updateCartItem,
    deleteCartItem,
};
