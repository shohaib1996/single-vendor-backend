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
exports.ProductQuestionController = void 0;
const productQuestion_services_1 = require("./productQuestion.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createProductQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productQuestion_services_1.ProductQuestionServices.createProductQuestion(req.body);
    res.status(200).json({
        success: true,
        message: "Product question created successfully",
        data: result,
    });
}));
const getAllProductQuestions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productQuestion_services_1.ProductQuestionServices.getAllProductQuestions();
    res.status(200).json({
        success: true,
        message: "Product questions retrieved successfully",
        data: result,
    });
}));
const getSingleProductQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productQuestion_services_1.ProductQuestionServices.getSingleProductQuestion(id);
    res.status(200).json({
        success: true,
        message: "Product question retrieved successfully",
        data: result,
    });
}));
const updateProductQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productQuestion_services_1.ProductQuestionServices.updateProductQuestion(id, req.body);
    res.status(200).json({
        success: true,
        message: "Product question updated successfully",
        data: result,
    });
}));
const deleteProductQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productQuestion_services_1.ProductQuestionServices.deleteProductQuestion(id);
    res.status(200).json({
        success: true,
        message: "Product question deleted successfully",
        data: result,
    });
}));
exports.ProductQuestionController = {
    createProductQuestion,
    getAllProductQuestions,
    getSingleProductQuestion,
    updateProductQuestion,
    deleteProductQuestion,
};
