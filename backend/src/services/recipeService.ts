import Recipe, { IRecipe } from '../models/Recipe';
import { createError } from '../middleware/errorHandler';

export interface CreateRecipeData {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  authorId: string;
}

export interface RecipeResponse {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const mapRecipeToResponse = (recipe: IRecipe): RecipeResponse => {
  const author = recipe.author as any;
  return {
    id: recipe._id.toString(),
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    author: {
      id: author._id?.toString() || author.toString(),
      name: author.name || 'Unknown',
    },
    createdAt: recipe.createdAt,
    updatedAt: recipe.updatedAt,
  };
};

export const getAllRecipes = async (): Promise<RecipeResponse[]> => {
  const recipes = await Recipe.find().populate('author', 'name');
  return recipes.map(mapRecipeToResponse);
};

export const getRecipeById = async (id: string): Promise<RecipeResponse> => {
  const recipe = await Recipe.findById(id).populate('author', 'name');
  
  if (!recipe) {
    throw createError('Recipe not found', 404);
  }
  
  return mapRecipeToResponse(recipe);
};

export const createRecipe = async (data: CreateRecipeData): Promise<RecipeResponse> => {
  const { title, description, ingredients, instructions, authorId } = data;
  
  const recipe = await Recipe.create({
    title,
    description,
    ingredients,
    instructions,
    author: authorId,
  });
  
  const populatedRecipe = await Recipe.findById(recipe._id).populate('author', 'name');
  
  if (!populatedRecipe) {
    throw createError('Failed to create recipe', 500);
  }
  
  return mapRecipeToResponse(populatedRecipe);
};
