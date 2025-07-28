import { PrismaClient, Review } from '@prisma/client';

const prisma = new PrismaClient();

const createReview = async (payload: Review): Promise<Review> => {
  const result = await prisma.review.create({ data: payload });
  return result;
};

const getAllReviews = async (): Promise<Review[]> => {
  const result = await prisma.review.findMany();
  return result;
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({ where: { id } });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>,
): Promise<Review> => {
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
