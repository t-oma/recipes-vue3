import type { Recipe } from "../entities/Recipe";

export interface IRecipeRepository {
    list(): Promise<Recipe[]>;
    getById(id: string): Promise<Recipe | null>;
    create(recipe: Recipe): Promise<Recipe>;
    update(
        id: string,
        recipe: Recipe
    ): Promise<Recipe | null>;
}
