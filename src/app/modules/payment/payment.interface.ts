import { Payment, PaymentStatus } from "@prisma/client";

export type IPayment = Payment;

export type IPaymentQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string; // For searching by user email, name, or payment ID
};

export type IPaymentUpdatePayload = Partial<{
  status: PaymentStatus;
  method: string;
  paidAt: Date;
}>;
