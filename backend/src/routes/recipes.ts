import { Router } from "express";

import * as recipeController from "../controllers/recipeController";
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
