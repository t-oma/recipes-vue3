import { NextFunction, Request, Response } from "express";
import { createError } from "@/middleware/errorHandler";
import { recipeService } from "@/services";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const recipes = await recipeService.getAll();
        res.json(recipes);
    } catch (error) {
        next(error);
    }
};

export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const recipe = await recipeService.getById(
            id as string
        );
        res.json(recipe);
    } catch (error) {
        next(error);
    }
};

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, description, ingredients, steps } =
            req.body;
        const userId = req.user?.userId;

        if (!userId) {
            throw createError(
                "User not authenticated",
                401
            );
        }

        const recipe = await recipeService.create({
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
};
