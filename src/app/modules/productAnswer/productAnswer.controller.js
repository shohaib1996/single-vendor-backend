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
exports.ProductAnswerController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const productAnswer_services_1 = require("./productAnswer.services");
const createProductAnswer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productAnswer_services_1.ProductAnswerServices.createProductAnswer(req.body);
    res.status(200).json({
        success: true,
        message: "Product answer created successfully",
        data: result,
    });
}));
const getAllProductAnswers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productAnswer_services_1.ProductAnswerServices.getAllProductAnswers();
    res.status(200).json({
        success: true,
        message: "Product answers retrieved successfully",
        data: result,
    });
}));
const getSingleProductAnswer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productAnswer_services_1.ProductAnswerServices.getSingleProductAnswer(id);
    res.status(200).json({
        success: true,
        message: "Product answer retrieved successfully",
        data: result,
    });
}));
const updateProductAnswer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productAnswer_services_1.ProductAnswerServices.updateProductAnswer(id, req.body);
    res.status(200).json({
        success: true,
        message: "Product answer updated successfully",
        data: result,
    });
}));
const deleteProductAnswer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield productAnswer_services_1.ProductAnswerServices.deleteProductAnswer(id);
    res.status(200).json({
        success: true,
        message: "Product answer deleted successfully",
        data: result,
    });
}));
exports.ProductAnswerController = {
    createProductAnswer,
    getAllProductAnswers,
    getSingleProductAnswer,
    updateProductAnswer,
    deleteProductAnswer,
};
