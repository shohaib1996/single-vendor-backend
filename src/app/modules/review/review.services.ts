import { PrismaClient, Review } from "@prisma/client";
import { IReviewQuery } from "./review.interface";

const prisma = new PrismaClient();

const createReview = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({ data: payload });
  return result;
};

const getAllReviews = async (query: IReviewQuery) => {
  const { page, limit, searchTerm } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          productId: searchTerm,
        },
        {
          product: {
            name: {
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

  const reviews = await prisma.review.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      user: {
        select: {
          name: true,
        },
      },
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  const total = await prisma.review.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: reviews,
  };
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({ where: { id } });
  return result;
};

const updateReview = async (id: string, payload: Partial<Review>): Promise<Review> => {
  const result = await prisma.review.update({ where: { id }, data: payload });
  return result;
};

const deleteReview = async (id: string): Promise<Review> => {
  const result = await prisma.review.delete({ where: { id } });
  return result;
};

export const ReviewServices = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
