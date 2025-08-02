"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptionValidation = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.nativeEnum(client_1.FilterType),
        options: zod_1.z.array(zod_1.z.string()).optional(),
        unit: zod_1.z.string().optional(),
        categoryId: zod_1.z.string(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        type: zod_1.z.nativeEnum(client_1.FilterType).optional(),
        options: zod_1.z.array(zod_1.z.string()).optional(),
        unit: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.FilterOptionValidation = {
    create,
    update,
};
