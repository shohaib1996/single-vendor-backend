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
exports.BrandServices = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const ApiError_1 = require("../../errors/ApiError");
const createBrandIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryIds } = payload, brandData = __rest(payload, ["categoryIds"]);
    const result = yield prisma_1.default.brand.create({
        data: Object.assign(Object.assign({}, brandData), { categories: {
                connect: categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.map((id) => ({ id })),
            } }),
    });
    return result;
});
const getAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.findMany({
        include: {
            categories: true,
        },
    });
    return result;
});
const getSingleBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.brand.findUnique({
        where: {
            id,
        },
        include: {
            categories: true,
        },
    });
    return result;
});
const updateBrand = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryIds } = payload, brandData = __rest(payload, ["categoryIds"]);
    const isExist = yield prisma_1.default.brand.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Brand not found");
    }
    const result = yield prisma_1.default.brand.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign({}, brandData), { categories: {
                set: categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.map((id) => ({ id })),
            } }),
    });
    return result;
});
const deleteBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.brand.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.ApiError(404, "Brand not found");
    }
    const result = yield prisma_1.default.brand.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BrandServices = {
    createBrandIntoDB,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
};
