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
exports.PaymentServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const stripe_1 = __importDefault(require("stripe"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const email_utils_1 = require("../email/email.utils");
const email_template_1 = require("../email/email.template");
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
});
const createCheckoutSession = (amount, currency, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if Payment already exists
    const existingPayment = yield prisma.payment.findUnique({
        where: { orderId },
    });
    if (!existingPayment) {
        yield prisma.payment.create({
            data: {
                orderId,
                status: client_1.PaymentStatus.PENDING,
            },
        });
        console.log("✅ Payment record created for orderId:", orderId);
    }
    else {
        console.log("ℹ️ Payment record already exists for orderId:", orderId);
    }
    const successUrl = `${config_1.default.BASE_URL}/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${config_1.default.BASE_URL}/api/v1/payment/cancel?orderId=${orderId}`;
    if (!successUrl.startsWith("http")) {
        throw new Error("Invalid BASE_URL, must start with http or https");
    }
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: currency,
                    product_data: { name: "Order Payment" },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            orderId,
        },
    });
    return { url: session.url };
});
const updatePaymentStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield prisma.payment.findUnique({ where: { orderId } });
    if (!payment) {
        throw new Error(`❌ No payment found for orderId: ${orderId}`);
    }
    const updatedPayment = yield prisma.payment.update({
        where: { orderId },
        data: {
            status,
            method: "stripe",
            paidAt: status === client_1.PaymentStatus.COMPLETED ? new Date() : undefined,
        },
    });
    if (status === client_1.PaymentStatus.COMPLETED) {
        const order = yield prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (order) {
            const emailHtml = (0, email_template_1.getInvoiceEmailTemplate)(order, "Paid");
            yield (0, email_utils_1.sendEmail)("batikromeye@gmail.com", "Payment Successful - Your Invoice", emailHtml);
        }
    }
    return updatedPayment;
});
const getCheckoutResult = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent.payment_method"],
    });
    const lineItemsPromise = stripe.checkout.sessions.listLineItems(sessionId);
    const [session, lineItems] = yield Promise.all([sessionPromise, lineItemsPromise]);
    return { session, lineItems };
});
exports.PaymentServices = {
    createCheckoutSession,
    updatePaymentStatus,
    getCheckoutResult,
};
