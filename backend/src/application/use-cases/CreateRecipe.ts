import {
    AuthorId,
    Recipe,
    RecipeDescription,
    RecipeId,
    RecipeIngredient,
    RecipeStep,
    RecipeTitle,
} from "@/domain";

import type { IRecipeRepository } from "@/domain/ports/RecipeReposotory";
import type { UseCase } from "@/shared/types/use-case";
import type {
    IngredientDTO,
    RecipeDTO,
    StepDTO,
} from "../dtos/RecipeDTO";

export type CreateRecipeInput = {
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    steps: StepDTO[];
    author: string;
};

export class CreateRecipe implements UseCase<
    CreateRecipeInput,
    RecipeDTO
> {
    constructor(
        private readonly recipes: IRecipeRepository,
        private readonly idGen: { newId(): string }
    ) {}

    async execute(
        input: CreateRecipeInput
    ): Promise<RecipeDTO> {
        const recipe = Recipe.create({
            id: RecipeId.from(this.idGen.newId()),
            authorId: AuthorId.from(input.author),
            title: RecipeTitle.from(input.title),
            description: RecipeDescription.from(
                input.description
            ),
            ingredients: input.ingredients.map((i) =>
                RecipeIngredient.from(i)
            ),
            steps: input.steps.map((s) =>
                RecipeStep.from(s)
            ),
        });

        await this.recipes.create(recipe);

        return recipe.toPrimitives();
    }
}
