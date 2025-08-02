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
exports.BrandController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const brand_services_1 = require("./brand.services");
const createBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_services_1.BrandServices.createBrandIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "Brand created successfully",
        data: result,
    });
}));
const getAllBrands = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_services_1.BrandServices.getAllBrands();
    res.status(200).json({
        success: true,
        message: "Brands retrieved successfully",
        data: result,
    });
}));
const getSingleBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_services_1.BrandServices.getSingleBrand(id);
    res.status(200).json({
        success: true,
        message: "Brand retrieved successfully",
        data: result,
    });
}));
const updateBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_services_1.BrandServices.updateBrand(id, req.body);
    res.status(200).json({
        success: true,
        message: "Brand updated successfully",
        data: result,
    });
}));
const deleteBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield brand_services_1.BrandServices.deleteBrand(id);
    res.status(200).json({
        success: true,
        message: "Brand deleted successfully",
        data: result,
    });
}));
exports.BrandController = {
    createBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
};
