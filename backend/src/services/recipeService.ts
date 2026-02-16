import Recipe, {
    IRecipe,
    type RecipeIngridient,
    type RecipeNutrients,
    type RecipeStep,
} from "../models/Recipe";
import { createError } from "../middleware/errorHandler";
import { isUser } from "../utils/helpers";

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

export const getAllRecipes = async (): Promise<
    RecipeResponse[]
> => {
    const recipes = await Recipe.find().populate(
        "author",
        "name"
    );
    return recipes.map(mapRecipeToResponse);
};

export const getRecipeById = async (
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

export const createRecipe = async (
    data: CreateRecipeData
): Promise<RecipeResponse> => {
    const {
        title,
        description,
        ingredients,
        steps,
        authorId,
    } = data;

    const recipe = await Recipe.create({
        title,
        description,
        nutrients: {
            protein: 50,
            fat: 130,
            carbohydrate: 60,
        },
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
