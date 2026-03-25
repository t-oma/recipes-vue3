import { createRecipeRepository } from "@/adapter/out/mongo/recipeRepository";
import { createMongooseUserRepository } from "@/repositories/implementations/mongooseUserRepository";

import { calculateNutrients } from "../application/nutritionService";
import { createAuthService } from "./authService";
import { createRecipeService } from "./recipeService";

const userRepo = createMongooseUserRepository();
const recipeRepo = createRecipeRepository();

export const authService = createAuthService(userRepo);
export const recipeService = createRecipeService(
    recipeRepo,
    calculateNutrients
);
