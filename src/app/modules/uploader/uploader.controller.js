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
exports.UploaderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const uploader_utils_1 = require("./uploader.utils");
const uploadFiles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const imageUrls = [];
    if (!files || files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No files were uploaded.",
        });
    }
    for (const file of files) {
        const result = yield (0, uploader_utils_1.sendImageToCloudinary)(file.filename, file.path);
        imageUrls.push(result.secure_url);
    }
    res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: imageUrls,
    });
}));
exports.UploaderController = {
    uploadFiles,
};
