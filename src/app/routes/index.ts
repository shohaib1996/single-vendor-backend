import express from "express";
import { UserRoutes } from "../modules/users/user.routes";

const router = express.Router();

import { CategoryRoutes } from "../modules/category/category.routes";
import { BrandRoutes } from "../modules/brand/brand.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { ProductQuestionRoutes } from "../modules/productQuestion/productQuestion.routes";
import { ProductAnswerRoutes } from "../modules/productAnswer/productAnswer.routes";
import { FilterOptionRoutes } from "../modules/filterOption/filterOption.routes";
import { ProductSpecificationRoutes } from "../modules/productSpecification/productSpecification.routes";
import { WishlistRoutes } from "../modules/wishlist/wishlist.routes";
import { CartRoutes } from "../modules/cart/cart.routes";

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/product-questions",
    route: ProductQuestionRoutes,
  },
  {
    path: "/product-answers",
    route: ProductAnswerRoutes,
  },
  {
    path: "/filter-options",
    route: FilterOptionRoutes,
  },
  {
    path: "/product-specifications",
    route: ProductSpecificationRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
