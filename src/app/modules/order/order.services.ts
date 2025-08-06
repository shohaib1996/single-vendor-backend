import prisma from "../../lib/prisma";
import { IOrder, IOrderQuery, IOrderUpdatePayload } from "./order.interface";
import { ApiError } from "../../errors/ApiError";
import { sendEmail } from "../email/email.utils";
import { getInvoiceEmailTemplate } from "../email/email.template";

const createOrderIntoDB = async (payload: IOrder) => {
  const { userId, orderItems } = payload;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let total = 0;

  const orderData = await prisma.$transaction(
    async (transaction) => {
      const createdOrder = await transaction.order.create({
        data: {
          userId,
          total: 0, // Temporary total, will be updated later
        },
      });

      for (const item of orderItems) {
        const product = await transaction.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new ApiError(404, `Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new ApiError(400, `Insufficient stock for product ${product.name}`);
        }

        await transaction.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        await transaction.orderItem.create({
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
      const updatedOrder = await transaction.order.update({
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

      await transaction.payment.create({
        data: {
          orderId: createdOrder.id,
          status: "PENDING",
        },
      });

      // Delete cart items after successful order creation
      const userCart = await transaction.cart.findUnique({
        where: { userId },
      });

      if (userCart) {
        await transaction.cartItem.deleteMany({
          where: {
            cartId: userCart.id,
          },
        });
      }

      return updatedOrder;
    },
    { timeout: 30000 }
  );

  // Fetch the full order details for the email
  const fullOrderDetails = await prisma.order.findUnique({
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
      payment: true,
    },
  });

  if (fullOrderDetails) {
    const emailHtml = getInvoiceEmailTemplate(fullOrderDetails, "Pending");
    await sendEmail("batikromeye@gmail.com", "Your Order Confirmation", emailHtml);
  }

  return orderData;
};

const getAllOrders = async (query: IOrderQuery) => {
  const { page, limit, userId, searchTerm } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (userId) {
    where.AND.push({ userId: userId });
  }

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          userId: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          user: {
            email: {
              contains: searchTerm,
              mode: "insensitive",
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

  const orders = await prisma.order.findMany({
    where,
    skip,
    take: limitNumber,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });

  const total = await prisma.order.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: orders,
  };
};

const getSingleOrder = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
      payment: true,
    },
  });
  return result;
};

const updateOrder = async (id: string, payload: IOrderUpdatePayload) => {
  const isExist = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, "Order not found");
  }

  const { ...updateData } = payload;

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: updateData,
  });
  return result;
};

const deleteOrder = async (id: string) => {
  const isExist = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, "Order not found");
  }

  const result = await prisma.order.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
