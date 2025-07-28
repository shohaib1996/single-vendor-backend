import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

import { CategoryRoutes } from '../modules/category/category.routes';
import { BrandRoutes } from '../modules/brand/brand.routes';

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;