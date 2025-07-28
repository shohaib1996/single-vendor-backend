import { Router } from "express";
import { signup, signin } from "./user.controllers";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
