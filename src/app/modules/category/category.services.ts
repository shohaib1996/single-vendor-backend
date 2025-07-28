import prisma from '../../lib/prisma';
import { ICategory } from './category.interface';
import { ApiError } from '../../errors/ApiError';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    },
  });
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      children: true,
      parent: true,
    },
  });
  return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Category not found');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Category not found');
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};