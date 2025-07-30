import { FilterOption, FilterType } from '@prisma/client';

export type IFilterOption = FilterOption;

export type IFilterOptionCreatePayload = {
  name: string;
  type: FilterType;
  options?: string[];
  unit?: string;
  categoryId: string;
};
