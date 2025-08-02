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
exports.PaymentController = void 0;
const payment_services_1 = require("./payment.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createCheckoutSession = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency, orderId } = req.body;
    if (!amount || !currency || !orderId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: amount, currency, or orderId",
        });
    }
    const result = yield payment_services_1.PaymentServices.createCheckoutSession(amount, currency, orderId);
    res.status(200).json({
        success: true,
        message: "Checkout session created successfully",
        data: result,
    });
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            message: "Missing session_id in query params",
        });
    }
    const { session } = yield payment_services_1.PaymentServices.getCheckoutResult(sessionId);
    const orderId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.orderId;
    if (orderId && session.payment_status === "paid") {
        yield payment_services_1.PaymentServices.updatePaymentStatus(orderId, "COMPLETED");
    }
    else {
        console.warn("⚠️ No valid orderId found or payment not completed.");
    }
    res.status(200).json({
        success: true,
        message: "Payment successful",
        data: session,
    });
}));
const paymentCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.query.orderId;
    if (orderId) {
        yield payment_services_1.PaymentServices.updatePaymentStatus(orderId, "FAILED");
    }
    else {
        console.warn("⚠️ orderId missing in cancel route query params.");
    }
    res.status(200).json({
        success: true,
        message: "Payment canceled",
    });
}));
exports.PaymentController = {
    createCheckoutSession,
    paymentSuccess,
    paymentCancel,
};
