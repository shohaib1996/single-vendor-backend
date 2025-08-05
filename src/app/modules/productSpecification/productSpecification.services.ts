import prisma from "../../lib/prisma";
import {
  IProductSpecification,
  IProductSpecificationCreatePayload,
  IProductSpecificationQuery,
  IProductSpecificationUpdatePayload,
} from "./productSpecification.interface";

const createProductSpecification = async (payload: IProductSpecificationCreatePayload) => {
  return await prisma.productSpecification.createMany({ data: payload });
};

const getProductSpecifications = async (query: IProductSpecificationQuery) => {
  const { productId, page, limit } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = {};

  if (productId) {
    where.productId = productId;
  }

  const specifications = await prisma.productSpecification.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  const total = await prisma.productSpecification.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: specifications,
  };
};

const getProductSpecification = async (id: string): Promise<IProductSpecification | null> => {
  return await prisma.productSpecification.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });
};

const updateProductSpecification = async (
  id: string,
  payload: IProductSpecificationUpdatePayload
): Promise<IProductSpecification> => {
  return await prisma.productSpecification.update({ where: { id }, data: payload });
};

const deleteProductSpecification = async (id: string): Promise<IProductSpecification> => {
  return await prisma.productSpecification.delete({ where: { id } });
};

export const ProductSpecificationService = {
  createProductSpecification,
  getProductSpecifications,
  getProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
};
