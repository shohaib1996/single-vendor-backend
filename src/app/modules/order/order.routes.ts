import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { orderValidationSchema } from "./order.validation";
import { Role } from "@prisma/client";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create-order",
  validateRequest(orderValidationSchema.createOrder),
  OrderController.createOrder
);

router.get("/", auth([Role.ADMIN, Role.USER]), OrderController.getAllOrders);

router.get("/:id", OrderController.getSingleOrder);

router.patch(
  "/:id",
  validateRequest(orderValidationSchema.updateOrder),
  OrderController.updateOrder
);

router.delete("/:id", OrderController.deleteOrder);

export const OrderRoutes = router;
