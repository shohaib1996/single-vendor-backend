import prisma from "../../lib/prisma";
import { ApiError } from "../../errors/ApiError";

const createBrandIntoDB = async (payload: IBrand) => {
  const { categoryIds, ...brandData } = payload;

  const result = await prisma.brand.create({
    data: {
      ...brandData,
      categories: {
        connect: categoryIds?.map((id) => ({ id })),
      },
    },
  });
  return result;
};

import { IBrand, IBrandQuery } from "./brand.interface";

const getAllBrands = async (query: IBrandQuery) => {
  const { page, limit, searchTerm } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = {};

  if (searchTerm) {
    where.name = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  const brands = await prisma.brand.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      categories: true,
    },
  });

  const total = await prisma.brand.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: brands,
  };
};

const getSingleBrand = async (id: string) => {
  const result = await prisma.brand.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });
  return result;
};

const updateBrand = async (id: string, payload: Partial<IBrand>) => {
  const { categoryIds, ...brandData } = payload;

  const isExist = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(404, "Brand not found");
  }

  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: {
      ...brandData,
      categories: {
        set: categoryIds?.map((id) => ({ id })),
      },
    },
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
    throw new ApiError(404, "Brand not found");
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
