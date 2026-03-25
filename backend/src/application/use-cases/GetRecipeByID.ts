import type { UseCase } from "@/shared/types/use-case";
import type { IRecipeRepository } from "../../domain";
import type { RecipeDTO } from "../dtos/RecipeDTO";

export type GetRecipeByIDInput = {
    id: string;
};
export type GetRecipeByIDOutput = RecipeDTO;
export type GetRecipeByIDUseCase = UseCase<
    GetRecipeByIDInput,
    GetRecipeByIDOutput
>;

export class GetRecipeByID implements GetRecipeByIDUseCase {
    private readonly recipes: IRecipeRepository;

    constructor(recipes: IRecipeRepository) {
        this.recipes = recipes;
    }

    async execute(
        input: GetRecipeByIDInput
    ): Promise<RecipeDTO> {
        const recipe = await this.recipes.findById(
            input.id
        );

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        return recipe.toPrimitives();
    }
}
