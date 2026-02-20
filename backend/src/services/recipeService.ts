import { isObjectIdOrHexString } from "mongoose";
import { createError } from "@/middleware/errorHandler";
import { isUser } from "@/utils/helpers";

import { calculateNutrients } from "./nutritionService";
import type {
    IRecipe,
    RecipeIngridient,
    RecipeNutrients,
    RecipeStep,
} from "@/models/Recipe";
import type {
    IRecipeRepository,
    CreateRecipeData as RepoCreateRecipeData,
} from "@/repositories";

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

export const createRecipeService = (
    repo: IRecipeRepository
) => ({
    getAll: async (): Promise<RecipeResponse[]> => {
        const recipes = await repo.findAllWithAuthor();
        return recipes.map(mapRecipeToResponse);
    },

    getById: async (
        id: string
    ): Promise<RecipeResponse> => {
        const recipe = await repo.findByIdWithAuthor(id);

        if (!recipe) {
            throw createError("Recipe not found", 404);
        }

        return mapRecipeToResponse(recipe);
    },

    create: async (
        data: CreateRecipeData
    ): Promise<RecipeResponse> => {
        const {
            title,
            description,
            ingredients,
            steps,
            authorId,
        } = data;

        if (!isObjectIdOrHexString(authorId)) {
            throw createError(
                `Wrong authorID: ${authorId}`,
                400
            );
        }

        const recipeData: RepoCreateRecipeData = {
            title,
            description,
            nutrients: {
                protein: 0,
                fat: 0,
                carbohydrate: 0,
            },
            ingredients,
            steps,
            author: authorId,
        };

        const recipe = await repo.create(recipeData);

        setImmediate(async () => {
            try {
                const nutrients =
                    await calculateNutrients(ingredients);
                if (nutrients) {
                    await repo.updateById(
                        recipe._id.toString(),
                        { nutrients }
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to calculate nutrients:",
                    error
                );
            }
        });

        const populatedRecipe =
            await repo.findByIdWithAuthor(
                recipe._id.toString()
            );

        if (!populatedRecipe) {
            throw createError(
                "Failed to create recipe",
                500
            );
        }

        return mapRecipeToResponse(populatedRecipe);
    },
});
