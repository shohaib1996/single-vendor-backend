import { PrismaClient, ProductQuestion } from '@prisma/client';

const prisma = new PrismaClient();

const createProductQuestion = async (payload: ProductQuestion): Promise<ProductQuestion> => {
  const result = await prisma.productQuestion.create({ data: payload });
  return result;
};

const getAllProductQuestions = async (): Promise<ProductQuestion[]> => {
  const result = await prisma.productQuestion.findMany();
  return result;
};

const getSingleProductQuestion = async (id: string): Promise<ProductQuestion | null> => {
  const result = await prisma.productQuestion.findUnique({ where: { id } });
  return result;
};

const updateProductQuestion = async (
  id: string,
  payload: Partial<ProductQuestion>,
): Promise<ProductQuestion> => {
  const result = await prisma.productQuestion.update({ where: { id }, data: payload });
  return result;
};

const deleteProductQuestion = async (id: string): Promise<ProductQuestion> => {
  const result = await prisma.productQuestion.delete({ where: { id } });
  return result;
};

export const ProductQuestionServices = {
  createProductQuestion,
  getAllProductQuestions,
  getSingleProductQuestion,
  updateProductQuestion,
  deleteProductQuestion,
};
