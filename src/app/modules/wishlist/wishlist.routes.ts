import express from "express";
import { WishlistController } from "./wishlist.controller";
import validateRequest from "../../middleware/validateRequest";
import { WishlistValidation } from "./wishlist.validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth([Role.USER]),
  validateRequest(WishlistValidation.create),
  WishlistController.createWishlist
);
router.get("/", auth([Role.USER]), WishlistController.getWishlist);
router.delete("/:id", auth([Role.USER]), WishlistController.deleteWishlist);

export const WishlistRoutes = router;
