export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDiscountActive: boolean;
  discountPercentage?: number;
  discountedPrice?: number;
  discountValidUntil?: Date;
  categoryId?: string;
  brandId?: string;
};

export type IProductQuery = {
  page?: string;
  limit?: string;
  categoryId?: string;
  brandId?: string;
  featured?: string;
  isDiscountActive?: string;
  // for dynamic filter
  [key: string]: unknown;
};
