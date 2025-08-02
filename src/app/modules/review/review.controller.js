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
exports.ReviewController = void 0;
const review_services_1 = require("./review.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.ReviewServices.createReview(req.body);
    res.status(200).json({
        success: true,
        message: "Review created successfully",
        data: result,
    });
}));
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.ReviewServices.getAllReviews();
    res.status(200).json({
        success: true,
        message: "Reviews retrieved successfully",
        data: result,
    });
}));
const getSingleReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_services_1.ReviewServices.getSingleReview(id);
    res.status(200).json({
        success: true,
        message: "Review retrieved successfully",
        data: result,
    });
}));
const updateReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_services_1.ReviewServices.updateReview(id, req.body);
    res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: result,
    });
}));
const deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_services_1.ReviewServices.deleteReview(id);
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        data: result,
    });
}));
exports.ReviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
