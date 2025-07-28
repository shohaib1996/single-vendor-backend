import prisma from '../../lib/prisma';
import { IProduct } from './product.interface';
import { ApiError } from '../../errors/ApiError';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const getAllProducts = async () => {
  const result = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
    },
  });
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      brand: true,
    },
  });
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Product not found');
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Product not found');
  }

  const result = await prisma.product.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};