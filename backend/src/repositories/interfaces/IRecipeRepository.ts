import type {
    IRecipe,
    RecipeIngridient,
    RecipeNutrients,
    RecipeStep,
} from "@/repositories/models/Recipe";

export interface CreateRecipeData {
    title: string;
    description: string;
    nutrients: RecipeNutrients;
    ingredients: RecipeIngridient[];
    steps: RecipeStep[];
    author: string;
}

export interface UpdateRecipeData {
    nutrients?: RecipeNutrients;
}

export interface IRecipeRepository {
    findAllWithAuthor(): Promise<IRecipe[]>;
    findByIdWithAuthor(id: string): Promise<IRecipe | null>;
    create(data: CreateRecipeData): Promise<IRecipe>;
    updateById(
        id: string,
        data: UpdateRecipeData
    ): Promise<IRecipe | null>;
}
