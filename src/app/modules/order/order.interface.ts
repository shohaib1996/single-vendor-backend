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
