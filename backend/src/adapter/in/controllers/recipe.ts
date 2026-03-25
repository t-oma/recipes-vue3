import { NextFunction, Request, Response } from "express";
import { createError } from "@/middleware/errorHandler";

import type { CreateRecipeUseCase } from "@/application/use-cases/CreateRecipe";
import type { GetRecipeByIDUseCase } from "@/application/use-cases/GetRecipeByID";
import type { ListRecipesUseCase } from "@/application/use-cases/ListRecipes";

export const createRecipeController = (
    listRecipes: ListRecipesUseCase,
    getRecipeById: GetRecipeByIDUseCase,
    createRecipe: CreateRecipeUseCase
) => ({
    getAll: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const recipes = await listRecipes.execute(null);
            res.json(recipes);
        } catch (error) {
            next(error);
        }
    },

    getById: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const recipe = await getRecipeById.execute({
                id: id as string,
            });

            res.json(recipe);
        } catch (error) {
            next(error);
        }
    },

    create: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {
                title,
                description,
                ingredients,
                steps,
            } = req.body;
            const userId = req.user?.userId;

            if (!userId) {
                throw createError(
                    "User not authenticated",
                    401
                );
            }

            const recipe = await createRecipe.execute({
                title,
                description,
                ingredients: Array.isArray(ingredients)
                    ? ingredients
                    : [ingredients],
                steps,
                authorId: userId,
            });

            res.status(201).json(recipe);
        } catch (error) {
            next(error);
        }
    },
});
