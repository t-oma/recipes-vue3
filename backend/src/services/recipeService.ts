import { createError } from "@/middleware/errorHandler";
import Recipe, { IRecipe } from "@/models/Recipe";
import { isUser } from "@/utils/helpers";

import { calculateNutrients } from "./nutritionService";
import type {
    RecipeIngridient,
    RecipeNutrients,
    RecipeStep,
} from "@/models/Recipe";

export interface CreateRecipeData {
    title: string;
    description: string;
    ingredients: RecipeIngridient[];
    steps: RecipeStep[];
    authorId: string;
}

export interface RecipeResponse {
    id: string;
    title: string;
    description: string;
    nutrients: RecipeNutrients;
    ingredients: RecipeIngridient[];
    steps: RecipeStep[];
    author: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const mapRecipeToResponse = (
    recipe: IRecipe
): RecipeResponse => {
    const author = recipe.author;

    return {
        id: recipe._id.toString(),
        title: recipe.title,
        description: recipe.description,
        nutrients: recipe.nutrients,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        author: isUser(author)
            ? {
                  id: author._id.toString(),
                  name: author.name,
              }
            : {
                  id: author.toString(),
                  name: "Unknown",
              },
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
    };
};

export const getAll = async (): Promise<
    RecipeResponse[]
> => {
    const recipes = await Recipe.find().populate(
        "author",
        "name"
    );
    return recipes.map(mapRecipeToResponse);
};

export const getById = async (
    id: string
): Promise<RecipeResponse> => {
    const recipe = await Recipe.findById(id).populate(
        "author",
        "name"
    );

    if (!recipe) {
        throw createError("Recipe not found", 404);
    }

    return mapRecipeToResponse(recipe);
};

export const create = async (
    data: CreateRecipeData
): Promise<RecipeResponse> => {
    const {
        title,
        description,
        ingredients,
        steps,
        authorId,
    } = data;

    const nutrients = await calculateNutrients(ingredients);
    console.log(nutrients);

    const recipe = await Recipe.create({
        title,
        description,
        nutrients,
        ingredients,
        steps,
        author: authorId,
    });

    const populatedRecipe = await Recipe.findById(
        recipe._id
    ).populate("author", "name");

    if (!populatedRecipe) {
        throw createError("Failed to create recipe", 500);
    }

    return mapRecipeToResponse(populatedRecipe);
};
