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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = require("../../errors/ApiError");
const email_utils_1 = require("../email/email.utils");
const email_template_1 = require("../email/email.template");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderItems } = payload;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    let total = 0;
    const orderData = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield transaction.order.create({
            data: {
                userId,
                total: 0, // Temporary total, will be updated later
            },
        });
        for (const item of orderItems) {
            const product = yield transaction.product.findUnique({
                where: {
                    id: item.productId,
                },
            });
            if (!product) {
                throw new ApiError_1.ApiError(404, `Product with ID ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new ApiError_1.ApiError(400, `Insufficient stock for product ${product.name}`);
            }
            yield transaction.product.update({
                where: {
                    id: item.productId,
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
            yield transaction.orderItem.create({
                data: {
                    orderId: createdOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                },
            });
            total += item.quantity * item.price;
        }
        // Update the order total
        const updatedOrder = yield transaction.order.update({
            where: {
                id: createdOrder.id,
            },
            data: {
                total,
            },
            include: {
                orderItems: true,
            },
        });
        yield transaction.payment.create({
            data: {
                orderId: createdOrder.id,
                status: "PENDING",
            },
        });
        return updatedOrder;
    }));
    // Fetch the full order details for the email
    const fullOrderDetails = yield prisma_1.default.order.findUnique({
        where: {
            id: orderData.id,
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
    if (fullOrderDetails) {
        const emailHtml = (0, email_template_1.getInvoiceEmailTemplate)(fullOrderDetails, "Pending");
        yield (0, email_utils_1.sendEmail)("batikromeye@gmail.com", "Your Order Confirmation", emailHtml);
    }
    return orderData;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Order not found");
    }
    // Exclude userId and orderItems from payload to avoid type conflict
    const { userId, orderItems } = payload, updateData = __rest(payload, ["userId", "orderItems"]);
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: updateData,
    });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Order not found");
    }
    const result = yield prisma_1.default.order.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
};
