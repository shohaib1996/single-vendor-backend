import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/create-checkout-session", PaymentController.createCheckoutSession);

router.get("/success", PaymentController.paymentSuccess);

router.get("/cancel", PaymentController.paymentCancel);

router.get("/", PaymentController.getAllPayments);
router.patch("/:id", PaymentController.updatePayment);

export const PaymentRoutes = router;
