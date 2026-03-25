import type { UseCase } from "@/shared/types/use-case";
import type { IRecipeRepository } from "../../domain";
import type { RecipeDTO } from "../dtos/RecipeDTO";

export type ListRecipesInput = null;
export type ListRecipesOutput = RecipeDTO[];
export type ListRecipesUseCase = UseCase<
    ListRecipesInput,
    ListRecipesOutput
>;

export class ListRecipes implements ListRecipesUseCase {
    private readonly recipes: IRecipeRepository;

    constructor(recipes: IRecipeRepository) {
        this.recipes = recipes;
    }

    async execute(): Promise<RecipeDTO[]> {
        const recipes = await this.recipes.list();

        return recipes.map((r) => r.toPrimitives());
    }
}
