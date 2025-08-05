/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { IUser, IUserQuery } from "./user.interface";
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



const getAllUsers = async (query: IUserQuery) => {
  const { page, limit, searchTerm } = query;

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const where: any = { AND: [] };

  if (searchTerm) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // If no conditions in AND, remove it to avoid empty AND clause
  if (where.AND.length === 0) {
    delete where.AND;
  }

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limitNumber,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      phone: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  const total = await prisma.user.count({
    where,
  });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: users,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  updateUserIntoDB,
  getProfile,
  getAllUsers,
};
