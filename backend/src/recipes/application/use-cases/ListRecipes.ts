import type { UseCase } from "@/shared/use-case";
import type { IRecipeRepository } from "../../domain";
import type { RecipeDTO } from "../dtos/RecipeDTO";

export class ListRecipes implements UseCase<
    null,
    RecipeDTO[]
> {
    constructor(
        private readonly recipes: IRecipeRepository
    ) {}

    async execute(): Promise<RecipeDTO[]> {
        const recipes = await this.recipes.list();

        return recipes.map((r) => r.toPrimitives());
    }
}
