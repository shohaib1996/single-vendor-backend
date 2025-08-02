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
exports.CategoryServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = require("../../errors/ApiError");
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.create({
        data: payload,
    });
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({
        include: {
            children: true,
            parent: true,
        },
    });
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
        include: {
            children: true,
            parent: true,
        },
    });
    return result;
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Category not found");
    }
    const result = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
