import { ProductSpecification } from "@prisma/client";

export type IProductSpecification = ProductSpecification;

export type IProductSpecificationCreatePayload = {
  key: string;
  value: string;
  productId: string;
};
