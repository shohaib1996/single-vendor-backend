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
exports.ProductSpecificationController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const productSpecification_services_1 = require("./productSpecification.services");
const createProductSpecification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productSpecification_services_1.ProductSpecificationService.createProductSpecification(req.body);
    res.status(201).json({ success: true, data: result });
}));
const getProductSpecifications = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productSpecification_services_1.ProductSpecificationService.getProductSpecifications();
    res.status(200).json({ success: true, data: result });
}));
const getProductSpecification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productSpecification_services_1.ProductSpecificationService.getProductSpecification(req.params.id);
    res.status(200).json({ success: true, data: result });
}));
const updateProductSpecification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productSpecification_services_1.ProductSpecificationService.updateProductSpecification(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
}));
const deleteProductSpecification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productSpecification_services_1.ProductSpecificationService.deleteProductSpecification(req.params.id);
    res.status(200).json({ success: true, message: "Product specification deleted" });
}));
exports.ProductSpecificationController = {
    createProductSpecification,
    getProductSpecifications,
    getProductSpecification,
    updateProductSpecification,
    deleteProductSpecification,
};
