/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { PrismaClient, PaymentStatus } from '@prisma/client';
import config from '../../config';

const prisma = new PrismaClient();

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

const createCheckoutSession = async (
  amount: number,
  currency: string,
  orderId: string,
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
    console.log('✅ Payment record created for orderId:', orderId);
  } else {
    console.log('ℹ️ Payment record already exists for orderId:', orderId);
  }

  const successUrl = `${config.BASE_URL}/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${config.BASE_URL}/api/v1/payment/cancel?orderId=${orderId}`;

  if (!successUrl.startsWith('http')) {
    throw new Error('Invalid BASE_URL, must start with http or https');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: { name: 'Order Payment' },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      orderId,
    },
  });

  return { url: session.url };
};

const updatePaymentStatus = async (
  orderId: string,
  status: PaymentStatus,
): Promise<any> => {
  const payment = await prisma.payment.findUnique({ where: { orderId } });

  if (!payment) {
    throw new Error(`❌ No payment found for orderId: ${orderId}`);
  }

  const updatedPayment = await prisma.payment.update({
    where: { orderId },
    data: {
      status,
      method: 'stripe',
      paidAt: status === PaymentStatus.COMPLETED ? new Date() : undefined,
    },
  });

  return updatedPayment;
};

const getCheckoutResult = async (sessionId: string) => {
  const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent.payment_method'],
  });

  const lineItemsPromise = stripe.checkout.sessions.listLineItems(sessionId);

  const [session, lineItems] = await Promise.all([
    sessionPromise,
    lineItemsPromise,
  ]);

  return { session, lineItems };
};

export const PaymentServices = {
  createCheckoutSession,
  updatePaymentStatus,
  getCheckoutResult,
};
