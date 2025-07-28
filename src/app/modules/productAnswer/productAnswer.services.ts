import { PrismaClient, ProductAnswer } from '@prisma/client';

const prisma = new PrismaClient();

const createProductAnswer = async (payload: ProductAnswer): Promise<ProductAnswer> => {
  const result = await prisma.productAnswer.create({ data: payload });
  return result;
};

const getAllProductAnswers = async (): Promise<ProductAnswer[]> => {
  const result = await prisma.productAnswer.findMany();
  return result;
};

const getSingleProductAnswer = async (id: string): Promise<ProductAnswer | null> => {
  const result = await prisma.productAnswer.findUnique({ where: { id } });
  return result;
};

const updateProductAnswer = async (
  id: string,
  payload: Partial<ProductAnswer>,
): Promise<ProductAnswer> => {
  const result = await prisma.productAnswer.update({ where: { id }, data: payload });
  return result;
};

const deleteProductAnswer = async (id: string): Promise<ProductAnswer> => {
  const result = await prisma.productAnswer.delete({ where: { id } });
  return result;
};

export const ProductAnswerServices = {
  createProductAnswer,
  getAllProductAnswers,
  getSingleProductAnswer,
  updateProductAnswer,
  deleteProductAnswer,
};
