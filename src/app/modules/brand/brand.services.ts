import prisma from '../../lib/prisma';
import { IBrand } from './brand.interface';
import { ApiError } from '../../errors/ApiError';

const createBrandIntoDB = async (payload: IBrand) => {
  const result = await prisma.brand.create({
    data: payload,
  });
  return result;
};

const getAllBrands = async () => {
  const result = await prisma.brand.findMany();
  return result;
};

const getSingleBrand = async (id: string) => {
  const result = await prisma.brand.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBrand = async (id: string, payload: Partial<IBrand>) => {
  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Brand not found');
  }

  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBrand = async (id: string) => {
  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, 'Brand not found');
  }

  const result = await prisma.brand.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BrandServices = {
  createBrandIntoDB,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};