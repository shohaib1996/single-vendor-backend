"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = require("../../errors/ApiError");
const generateToken_1 = require("../../utils/generateToken");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address, phone, avatarUrl } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.ApiError(400, "User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const result = yield prisma_1.default.user.create({
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
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.ApiError(400, "Invalid credentials");
    }
    const accessToken = (0, generateToken_1.generateToken)({
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    });
    return {
        user: isUserExist,
        accessToken,
    };
});
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    loginUser,
    updateUserIntoDB,
};
