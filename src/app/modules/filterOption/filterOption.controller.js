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
exports.FilterOptionController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const filterOption_services_1 = require("./filterOption.services");
const createFilterOption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield filterOption_services_1.FilterOptionService.createFilterOption(req.body);
    res.status(201).json({ success: true, data: result });
}));
const getFilterOptions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield filterOption_services_1.FilterOptionService.getFilterOptions();
    res.status(200).json({ success: true, data: result });
}));
const getFilterOption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield filterOption_services_1.FilterOptionService.getFilterOption(req.params.id);
    res.status(200).json({ success: true, data: result });
}));
const updateFilterOption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield filterOption_services_1.FilterOptionService.updateFilterOption(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
}));
const deleteFilterOption = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield filterOption_services_1.FilterOptionService.deleteFilterOption(req.params.id);
    res.status(200).json({ success: true, message: "Filter option deleted" });
}));
exports.FilterOptionController = {
    createFilterOption,
    getFilterOptions,
    getFilterOption,
    updateFilterOption,
    deleteFilterOption,
};
