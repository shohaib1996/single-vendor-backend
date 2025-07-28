import { z } from 'zod';

export const userValidationSchema = {
  createUser: z.object({
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  loginUser: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
};