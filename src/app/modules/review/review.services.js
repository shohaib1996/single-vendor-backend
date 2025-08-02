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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.review.create({ data: payload });
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.review.findMany();
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.review.findUnique({ where: { id } });
    return result;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.review.update({ where: { id }, data: payload });
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.review.delete({ where: { id } });
    return result;
});
exports.ReviewServices = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
