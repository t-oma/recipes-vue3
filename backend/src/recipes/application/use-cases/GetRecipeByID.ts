import type { UseCase } from "@/shared/use-case";
import type { IRecipeRepository } from "../../domain";
import type { RecipeDTO } from "../dtos/RecipeDTO";

export type GetRecipeByIDInput = {
    id: string;
};

export class GetRecipeByID implements UseCase<
    GetRecipeByIDInput,
    RecipeDTO
> {
    constructor(
        private readonly recipes: IRecipeRepository
    ) {}

    async execute(
        input: GetRecipeByIDInput
    ): Promise<RecipeDTO> {
        const recipe = await this.recipes.getById(input.id);

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        return recipe.toPrimitives();
    }
}
