import { PrismaClient, PaymentStatus } from "@prisma/client";
import config from "../../config";
import { sendEmail } from "../email/email.utils";
import { getInvoiceEmailTemplate } from "../email/email.template";
import { IPaymentQuery, IPaymentUpdatePayload } from "./payment.interface";
import { ApiError } from "../../errors/ApiError";
import Stripe from "stripe";

const prisma = new PrismaClient();

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
});

const createCheckoutSession = async (
  amount: number,
  currency: string,
  orderId: string
): Promise<any> => {
  // Check if Payment already exists
  const existingPayment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!existingPayment) {
    await prisma.payment.create({
      data: {
        orderId,
        status: PaymentStatus.PENDING,
      },
    });
    console.log("✅ Payment record created for orderId:", orderId);
  } else {
    console.log("ℹ️ Payment record already exists for orderId:", orderId);
  }

  const successUrl = `${config.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${config.BASE_URL}/cancel?orderId=${orderId}`;

  if (!successUrl.startsWith("http")) {
    throw new Error("Invalid BASE_URL, must start with http or https");
  }

  const session = await stripe.checkout.sessions.create({
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
};

const updatePaymentStatus = async (orderId: string, status: PaymentStatus): Promise<any> => {
  const payment = await prisma.payment.findUnique({ where: { orderId } });

  if (!payment) {
    throw new Error(`❌ No payment found for orderId: ${orderId}`);
  }

  const updatedPayment = await prisma.payment.update({
    where: { orderId },
    data: {
      status,
      method: "stripe",
      paidAt: status === PaymentStatus.COMPLETED ? new Date() : undefined,
    },
  });

  if (status === PaymentStatus.COMPLETED) {
    const order = await prisma.order.findUnique({
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
      const emailHtml = getInvoiceEmailTemplate(order, "Paid");
      await sendEmail(order?.user?.email, "Payment Successful - Your Invoice", emailHtml);
    }
  }

  return updatedPayment;
};

const getCheckoutResult = async (sessionId: string) => {
  const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  });

  const lineItemsPromise = stripe.checkout.sessions.listLineItems(sessionId);

  const [session, lineItems] = await Promise.all([sessionPromise, lineItemsPromise]);

  return { session, lineItems };
};

const getAllPayments = async (query: IPaymentQuery) => {
  const { page, limit, searchTerm } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          id: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          order: {
            user: {
              email: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
        {
          order: {
            user: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    });
  }

  // If no conditions in AND, remove it to avoid empty AND clause
  if (where.AND.length === 0) {
    delete where.AND;
  }

  const payments = await prisma.payment.findMany({
    where,
    skip,
    take: limitNumber,
    orderBy: {
      paidAt: "desc", // Newest payments first
    },
    include: {
      order: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.payment.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: payments,
  };
};

const updatePayment = async (id: string, payload: IPaymentUpdatePayload) => {
  const isExist = await prisma.payment.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, "Payment not found");
  }

  const result = await prisma.payment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const PaymentServices = {
  createCheckoutSession,
  updatePaymentStatus,
  getCheckoutResult,
  getAllPayments,
  updatePayment,
};
