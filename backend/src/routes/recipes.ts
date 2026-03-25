import { Router } from "express";
import { recipeController } from "@/adapter/in/controllers";

import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createRecipeSchema } from "../schemas/recipe";

const router: Router = Router();

router.get("/", recipeController.getAll);
router.get("/:id", recipeController.getById);
router.post(
    "/",
    authenticate,
    validate(createRecipeSchema),
    recipeController.create
);

export default router;
