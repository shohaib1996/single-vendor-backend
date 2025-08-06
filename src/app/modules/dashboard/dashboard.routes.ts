import { Router } from "express";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/analytics", DashboardController.getAnalytics);

export const DashboardRoutes = router;
