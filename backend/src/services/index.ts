import { createMongooseRecipeRepository } from "@/repositories/implementations/mongooseRecipeRepository";
import { createMongooseUserRepository } from "@/repositories/implementations/mongooseUserRepository";

import { createAuthService } from "./authService";
import { calculateNutrients } from "./nutritionService";
import { createRecipeService } from "./recipeService";

const userRepo = createMongooseUserRepository();
const recipeRepo = createMongooseRecipeRepository();

export const authService = createAuthService(userRepo);
export const recipeService = createRecipeService(
    recipeRepo,
    calculateNutrients
);
