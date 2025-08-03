import prisma from "../../lib/prisma";
import {
  IProductSpecification,
  IProductSpecificationCreatePayload,
} from "./productSpecification.interface";

const createProductSpecification = async (payload: IProductSpecificationCreatePayload) => {
  return await prisma.productSpecification.createMany({ data: payload });
};

const getProductSpecifications = async (): Promise<IProductSpecification[]> => {
  return await prisma.productSpecification.findMany();
};

const getProductSpecification = async (id: string): Promise<IProductSpecification | null> => {
  return await prisma.productSpecification.findUnique({ where: { id } });
};

const updateProductSpecification = async (
  id: string,
  payload: Partial<IProductSpecificationCreatePayload>
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
