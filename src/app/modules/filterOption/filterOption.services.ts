import { IFilterOption, IFilterOptionCreatePayload, IFilterOptionQuery } from "./filterOption.interface";
import prisma from "../../lib/prisma";

const createFilterOption = async (payload: IFilterOptionCreatePayload | IFilterOptionCreatePayload[]): Promise<IFilterOption | { count: number }> => {
  if (Array.isArray(payload)) {
    const result = await prisma.filterOption.createMany({ data: payload });
    return { count: result.count };
  } else {
    return await prisma.filterOption.create({ data: payload });
  }
};

const getFilterOptions = async (query: IFilterOptionQuery) => {
  const { page, limit, searchTerm, categoryId } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (categoryId) {
    where.AND.push({ categoryId });
  }

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          category: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            slug: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (where.AND.length === 0) {
    delete where.AND;
  }

  const filterOptions = await prisma.filterOption.findMany({
    where,
    skip,
    take: limitNumber,
    include: {
      category: true,
    },
  });

  const total = await prisma.filterOption.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: filterOptions,
  };
};

const getFilterOption = async (id: string): Promise<IFilterOption | null> => {
  return await prisma.filterOption.findUnique({ where: { id } });
};

const updateFilterOption = async (
  id: string,
  payload: Partial<IFilterOptionCreatePayload>
): Promise<IFilterOption> => {
  return await prisma.filterOption.update({ where: { id }, data: payload });
};

const deleteFilterOption = async (id: string): Promise<IFilterOption> => {
  return await prisma.filterOption.delete({ where: { id } });
};

export const FilterOptionService = {
  createFilterOption,
  getFilterOptions,
  getFilterOption,
  updateFilterOption,
  deleteFilterOption,
};
