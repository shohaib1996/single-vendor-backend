import { OrderStatus } from "@prisma/client";

export type IOrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type IOrder = {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  orderItems: IOrderItem[];
};

export type IOrderQuery = {
  page?: string;
  limit?: string;
  userId?: string;
  searchTerm?: string;
};

export type IOrderUpdatePayload = Omit<Partial<IOrder>, "userId" | "orderItems">;
