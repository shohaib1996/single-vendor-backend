import prisma from "../../lib/prisma";
import { IProduct, IProductQuery } from "./product.interface";
import { ApiError } from "../../errors/ApiError";

const createProductIntoDB = async (payload: IProduct) => {
  const result = await prisma.product.create({
    data: payload,
  });
  return result;
};

const getAllProducts = async (query: IProductQuery) => {
  const { page, limit, categoryId, featured, searchTerm, ...filters } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 12;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (featured) {
    where.featured = featured === "true";
  }

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

  // Handle brand filter
  if (filters.brand) {
    const brands = (filters.brand as string).split(',').map(b => b.trim());
    where.AND.push({
      brand: {
        name: {
          in: brands,
          mode: "insensitive",
        },
      },
    });
    delete filters.brand;
  }

  // Handle price range filter
  const priceRangeMin = parseFloat(filters.priceRangeMin as string);
  const priceRangeMax = parseFloat(filters.priceRangeMax as string);

  if (!isNaN(priceRangeMin) || !isNaN(priceRangeMax)) {
    const priceFilter: any = {};
    if (!isNaN(priceRangeMin)) {
      priceFilter.gte = priceRangeMin;
    }
    if (!isNaN(priceRangeMax)) {
      priceFilter.lte = priceRangeMax;
    }
    where.AND.push({ price: priceFilter });
    delete filters.priceRangeMin;
    delete filters.priceRangeMax;
  }

  // Handle dynamic filters for product specifications
  const specFilters = Object.entries(filters).map(([key, value]) => ({
    specifications: {
      some: {
        key: {
          equals: key,
          mode: "insensitive",
        },
        value: {
          in: (value as string).split(',').map(v => v.trim()),
          mode: "insensitive",
        },
      },
    },
  }));

  if (specFilters.length > 0) {
    where.AND.push(...specFilters);
  }

  // If no conditions in AND, remove it to avoid empty AND clause
  if (where.AND.length === 0) {
    delete where.AND;
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
      specifications: true,
      reviews: true,
      questions: {
        include: {
          answer: true,
        },
      },
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
    throw new ApiError(404, "Product not found");
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
    throw new ApiError(404, "Product not found");
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
