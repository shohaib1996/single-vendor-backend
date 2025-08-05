import { ProductSpecification } from "@prisma/client";

export type IProductSpecification = ProductSpecification;

export type IProductSpecificationCreatePayload = {
  key: string;
  value: string;
  productId: string;
}[];

export type IProductSpecificationUpdatePayload = Partial<{
  key: string;
  value: string;
  productId: string;
}>;

export type IProductSpecificationQuery = {
  productId?: string;
  page?: string;
  limit?: string;
};
