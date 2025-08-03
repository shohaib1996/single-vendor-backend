import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";
import { Role } from "@prisma/client";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/signup", validateRequest(userValidationSchema.createUser), UserController.createUser);
router.post("/signin", validateRequest(userValidationSchema.loginUser), UserController.loginUser);

router.patch("/:id", validateRequest(userValidationSchema.updateUser), UserController.updateUser);

router.get("/profile", auth([Role.USER, Role.ADMIN]), UserController.getProfile);

export const UserRoutes = router;
