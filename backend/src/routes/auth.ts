import { Router } from "express";
import { authController } from "@/controllers";

import { validate } from "../middleware/validate";
import {
    loginSchema,
    registerSchema,
} from "../schemas/auth";

const router: Router = Router();

router.post(
    "/register",
    validate(registerSchema),
    authController.register
);
router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

export default router;
