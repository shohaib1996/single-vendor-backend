import prisma from "../../lib/prisma";
import { ICategory } from "./category.interface";
import { ApiError } from "../../errors/ApiError";

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    where: {
      parentId: null, // Only fetch top-level categories
    },
    include: {
      children: true, // Still include their direct subcategories
      brands: true, // Include associated brands
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
      brands: true, // Include associated brands
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
    throw new ApiError(404, "Category not found");
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
    throw new ApiError(404, "Category not found");
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

const getDescendantCategoryIds = async (categoryId: string): Promise<string[]> => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { children: true },
  });

  if (!category) {
    return [];
  }

  let descendantIds: string[] = [category.id];
  if (category.children && category.children.length > 0) {
    for (const child of category.children) {
      const childDescendants = await getDescendantCategoryIds(child.id);
      descendantIds = descendantIds.concat(childDescendants);
    }
  }
  return descendantIds;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getDescendantCategoryIds,
};
