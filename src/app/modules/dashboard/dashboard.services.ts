import { OrderStatus, Role } from "@prisma/client";
import prisma from "../../lib/prisma";

const getAnalytics = async () => {
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: OrderStatus.DELIVERED,
    },
  });

  const totalOrders = await prisma.order.count();
  const totalCustomers = await prisma.user.count({
    where: {
      role: Role.USER,
    },
  });
  const totalProducts = await prisma.product.count();
  const pendingOrders = await prisma.order.count({
    where: {
      status: OrderStatus.PENDING,
    },
  });
  const outOfStock = await prisma.product.count({
    where: {
      stock: {
        equals: 0,
      },
    },
  });
  const newCustomers = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  });
  const unansweredQuestions = await prisma.productQuestion.count({
    where: {
      answer: {
        is: null,
      },
    },
  });

  // Chart data
  const salesOverTime = await prisma.order.groupBy({
    by: ["createdAt"],
    _sum: {
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const orderStatusDistribution = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const topSellingProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  const topSellingProductIds = topSellingProducts.map((p) => p.productId);
  const topSellingProductDetails = await prisma.product.findMany({
    where: {
      id: {
        in: topSellingProductIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const topSellingProductsWithNames = topSellingProducts.map((item) => ({
    ...item,
    product: topSellingProductDetails.find((p) => p.id === item.productId),
  }));

  const topCategoriesBySalesRaw = await prisma.orderItem.findMany({
    include: {
      product: {
        select: {
          categoryId: true,
        },
      },
    },
  });

  const categorySalesMap = new Map<string, number>();
  topCategoriesBySalesRaw.forEach((item) => {
    if (item.product?.categoryId) {
      const currentSales = categorySalesMap.get(item.product.categoryId) || 0;
      categorySalesMap.set(item.product.categoryId, currentSales + item.price);
    }
  });

  const topCategoriesBySales = Array.from(categorySalesMap.entries())
    .sort(([, salesA], [, salesB]) => salesB - salesA)
    .slice(0, 5)
    .map(([categoryId, totalSales]) => ({ categoryId, totalSales }));

  const topCategoryIds = topCategoriesBySales.map((c) => c.categoryId);
  const topCategoryDetails = await prisma.category.findMany({
    where: {
      id: {
        in: topCategoryIds,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  const topCategoriesBySalesWithNames = topCategoriesBySales.map((item) => ({
    ...item,
    category: topCategoryDetails.find((c) => c.id === item.categoryId),
  }));

  const userRegistrationTrend = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const paymentMethodDistribution = await prisma.payment.groupBy({
    by: ["method"],
    _count: {
      method: true,
    },
  });

  return {
    totalRevenue: totalRevenue._sum.total,
    totalOrders,
    totalCustomers,
    totalProducts,
    pendingOrders,
    outOfStock,
    newCustomers,
    unansweredQuestions,
    salesOverTime,
    orderStatusDistribution,
    topSellingProducts: topSellingProductsWithNames,
    topCategoriesBySales: topCategoriesBySalesWithNames,
    userRegistrationTrend,
    paymentMethodDistribution,
  };
};

export const DashboardServices = {
  getAnalytics,
};
