/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import prisma from "../../lib/prisma";
import { ApiError } from "../../errors/ApiError";
import { generateToken } from "../../utils/generateToken";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, address, phone, avatarUrl } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, 12);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      avatarUrl,
    },
  });

  return result;
};

const loginUser = async (payload: IUser) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = generateToken({
    id: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  });

  return {
    user: isUserExist,
    accessToken,
  };
};

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const getProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  updateUserIntoDB,
  getProfile
};
