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
exports.ProductQuestionServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProductQuestion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productQuestion.create({ data: payload });
    return result;
});
const getAllProductQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productQuestion.findMany();
    return result;
});
const getSingleProductQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productQuestion.findUnique({ where: { id } });
    return result;
});
const updateProductQuestion = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productQuestion.update({ where: { id }, data: payload });
    return result;
});
const deleteProductQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productQuestion.delete({ where: { id } });
    return result;
});
exports.ProductQuestionServices = {
    createProductQuestion,
    getAllProductQuestions,
    getSingleProductQuestion,
    updateProductQuestion,
    deleteProductQuestion,
};
