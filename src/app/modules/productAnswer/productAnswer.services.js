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
exports.ProductAnswerServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProductAnswer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productAnswer.create({ data: payload });
    return result;
});
const getAllProductAnswers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productAnswer.findMany();
    return result;
});
const getSingleProductAnswer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productAnswer.findUnique({ where: { id } });
    return result;
});
const updateProductAnswer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productAnswer.update({ where: { id }, data: payload });
    return result;
});
const deleteProductAnswer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.productAnswer.delete({ where: { id } });
    return result;
});
exports.ProductAnswerServices = {
    createProductAnswer,
    getAllProductAnswers,
    getSingleProductAnswer,
    updateProductAnswer,
    deleteProductAnswer,
};
