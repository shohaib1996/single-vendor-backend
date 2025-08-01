import { Request, Response } from "express";
import { PaymentServices } from "./payment.services";
import catchAsync from "../../utils/catchAsync";

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const { amount, currency, orderId } = req.body;

  if (!amount || !currency || !orderId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: amount, currency, or orderId",
    });
  }

  const result = await PaymentServices.createCheckoutSession(amount, currency, orderId);

  res.status(200).json({
    success: true,
    message: "Checkout session created successfully",
    data: result,
  });
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "Missing session_id in query params",
    });
  }

  const { session } = await PaymentServices.getCheckoutResult(sessionId);

  const orderId = session.metadata?.orderId;

  if (orderId && session.payment_status === "paid") {
    await PaymentServices.updatePaymentStatus(orderId, "COMPLETED");
  } else {
    console.warn("⚠️ No valid orderId found or payment not completed.");
  }

  res.status(200).json({
    success: true,
    message: "Payment successful",
    data: session,
  });
});

const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.query.orderId as string;

  if (orderId) {
    await PaymentServices.updatePaymentStatus(orderId, "FAILED");
  } else {
    console.warn("⚠️ orderId missing in cancel route query params.");
  }

  res.status(200).json({
    success: true,
    message: "Payment canceled",
  });
});

export const PaymentController = {
  createCheckoutSession,
  paymentSuccess,
  paymentCancel,
};
