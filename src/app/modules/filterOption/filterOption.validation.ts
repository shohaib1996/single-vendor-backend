import { z } from "zod";
import { FilterType } from "@prisma/client";

const create = z.object({
  body: z.union([
    z.object({
      name: z.string(),
      type: z.nativeEnum(FilterType),
      options: z.array(z.string()).optional(),
      unit: z.string().optional(),
      categoryId: z.string(),
    }),
    z.array(z.object({
      name: z.string(),
      type: z.nativeEnum(FilterType),
      options: z.array(z.string()).optional(),
      unit: z.string().optional(),
      categoryId: z.string(),
    })),
  ]),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    type: z.nativeEnum(FilterType).optional(),
    options: z.array(z.string()).optional(),
    unit: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const FilterOptionValidation = {
  create,
  update,
};
