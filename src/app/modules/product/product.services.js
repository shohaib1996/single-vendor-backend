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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = require("../../errors/ApiError");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.create({
        data: payload,
    });
    return result;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, categoryId } = query, filters = __rest(query, ["page", "limit", "categoryId"]);
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const where = {};
    if (categoryId) {
        // a recursive function to get all sub category ids
        const getAllSubCategoryIds = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield prisma_1.default.category.findUnique({
                where: { id: categoryId },
                include: { children: true },
            });
            if (!category) {
                return [];
            }
            let ids = [category.id];
            if (category.children && category.children.length > 0) {
                for (const child of category.children) {
                    const childIds = yield getAllSubCategoryIds(child.id);
                    ids = ids.concat(childIds);
                }
            }
            return ids;
        });
        const categoryIds = yield getAllSubCategoryIds(categoryId);
        where.categoryId = { in: categoryIds };
    }
    // Handle dynamic filters for product specifications
    const specFilters = Object.entries(filters).map(([key, value]) => ({
        specifications: {
            some: {
                key: {
                    equals: key,
                    mode: "insensitive",
                },
                value: {
                    contains: value,
                    mode: "insensitive",
                },
            },
        },
    }));
    if (specFilters.length > 0) {
        where.AND = specFilters;
    }
    const products = yield prisma_1.default.product.findMany({
        where,
        skip,
        take: limitNumber,
        include: {
            category: true,
            brand: true,
            specifications: true,
        },
    });
    const total = yield prisma_1.default.product.count({
        where,
    });
    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: products,
    };
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            brand: true,
        },
    });
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Product not found");
    }
    const result = yield prisma_1.default.product.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.product.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Product not found");
    }
    const result = yield prisma_1.default.product.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
