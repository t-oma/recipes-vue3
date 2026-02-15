import { Router } from "express";
import authRoutes from "./auth";
import recipeRoutes from "./recipes";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/recipes", recipeRoutes);

router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

export default router;
