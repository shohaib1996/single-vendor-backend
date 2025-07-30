import prisma from '../../lib/prisma';
import { IProduct, IProductQuery } from './product.interface';
import { ApiError } from '../../errors/ApiError';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const getAllProducts = async (query: IProductQuery) => {
  const { page, limit, categoryId, ...filters } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = {};

  if (categoryId) {
    // a recursive function to get all sub category ids
    const getAllSubCategoryIds = async (categoryId: string) => {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        include: { children: true },
      });

      if (!category) {
        return [];
      }

      let ids = [category.id];
      if (category.children && category.children.length > 0) {
        for (const child of category.children) {
          const childIds = await getAllSubCategoryIds(child.id);
          ids = ids.concat(childIds);
        }
      }
      return ids;
    };

    const categoryIds = await getAllSubCategoryIds(categoryId);
    where.categoryId = { in: categoryIds };
  }

  // Handle dynamic filters for product specifications
  const specFilters = Object.entries(filters).map(([key, value]) => ({
    specifications: {
      some: {
        key: {
          equals: key,
          mode: 'insensitive',
        },
        value: {
          contains: value as string,
          mode: 'insensitive',
        },
      },
    },
  }));

  if (specFilters.length > 0) {
    where.AND = specFilters;
  }

  const products = await prisma.product.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      category: true,
      brand: true,
      specifications: true,
    },
  });

  const total = await prisma.product.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: products,
  };
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