"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const router = express_1.default.Router();
const category_routes_1 = require("../modules/category/category.routes");
const brand_routes_1 = require("../modules/brand/brand.routes");
const product_routes_1 = require("../modules/product/product.routes");
const order_routes_1 = require("../modules/order/order.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const review_routes_1 = require("../modules/review/review.routes");
const productQuestion_routes_1 = require("../modules/productQuestion/productQuestion.routes");
const productAnswer_routes_1 = require("../modules/productAnswer/productAnswer.routes");
const filterOption_routes_1 = require("../modules/filterOption/filterOption.routes");
const productSpecification_routes_1 = require("../modules/productSpecification/productSpecification.routes");
const wishlist_routes_1 = require("../modules/wishlist/wishlist.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/categories",
        route: category_routes_1.CategoryRoutes,
    },
    {
        path: "/brands",
        route: brand_routes_1.BrandRoutes,
    },
    {
        path: "/products",
        route: product_routes_1.ProductRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.OrderRoutes,
    },
    {
        path: "/payment",
        route: payment_routes_1.PaymentRoutes,
    },
    {
        path: "/reviews",
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: "/product-questions",
        route: productQuestion_routes_1.ProductQuestionRoutes,
    },
    {
        path: "/product-answers",
        route: productAnswer_routes_1.ProductAnswerRoutes,
    },
    {
        path: "/filter-options",
        route: filterOption_routes_1.FilterOptionRoutes,
    },
    {
        path: "/product-specifications",
        route: productSpecification_routes_1.ProductSpecificationRoutes,
    },
    {
        path: "/wishlist",
        route: wishlist_routes_1.WishlistRoutes,
    },
    {
        path: "/cart",
        route: cart_routes_1.CartRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
