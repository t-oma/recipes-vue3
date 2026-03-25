import { authService, recipeService } from "@/services";

import { createAuthController } from "./authController";
import { createRecipeController } from "./recipeController";

export const authController =
    createAuthController(authService);
export const recipeController =
    createRecipeController(recipeService);
