import { z } from "zod";

export const userValidationSchema = {
  createUser: z.object({
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      address: z.string().optional(),
      phone: z.string().optional(),
      avatarUrl: z.string().optional(),
    }),
  }),
  updateUser: z.object({
    body: z.object({
      name: z.string().optional(),
      address: z.string().optional(),
      phone: z.string().optional(),
      avatarUrl: z.string().optional(),
    }),
  }),
  loginUser: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
};
