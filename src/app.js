"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./app/interfaces");
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = require("./app/middleware/notFound");
const uploader_routes_1 = require("./app/modules/uploader/uploader.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});
app.use("/api/v1", routes_1.default);
app.use("/api/v1", uploader_routes_1.UploaderRoutes);
app.use(notFound_1.notFound);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
