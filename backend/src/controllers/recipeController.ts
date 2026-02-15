import { Request, Response, NextFunction } from 'express';
import * as recipeService from '../services/recipeService';
import { createError } from '../middleware/errorHandler';

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id as string);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const userId = req.user?.userId;
    
    if (!title || !description || !ingredients || !instructions) {
      throw createError('All fields are required', 400);
    }
    
    if (!userId) {
      throw createError('User not authenticated', 401);
    }
    
    const recipe = await recipeService.createRecipe({
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions,
      authorId: userId,
    });
    
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};
