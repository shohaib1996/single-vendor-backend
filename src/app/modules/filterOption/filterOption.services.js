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
exports.FilterOptionService = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const createFilterOption = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.filterOption.create({ data: payload });
});
const getFilterOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.filterOption.findMany();
});
const getFilterOption = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.filterOption.findUnique({ where: { id } });
});
const updateFilterOption = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.filterOption.update({ where: { id }, data: payload });
});
const deleteFilterOption = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.filterOption.delete({ where: { id } });
});
exports.FilterOptionService = {
    createFilterOption,
    getFilterOptions,
    getFilterOption,
    updateFilterOption,
    deleteFilterOption,
};
