import { IFilterOption, IFilterOptionCreatePayload } from "./filterOption.interface";
import prisma from "../../lib/prisma";

const createFilterOption = async (payload: IFilterOptionCreatePayload): Promise<IFilterOption> => {
  return await prisma.filterOption.create({ data: payload });
};

const getFilterOptions = async (categoryId?: string): Promise<IFilterOption[]> => {
  const where: any = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  return await prisma.filterOption.findMany({ where });
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
