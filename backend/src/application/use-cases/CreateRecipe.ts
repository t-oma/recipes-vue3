import {
    AuthorId,
    Recipe,
    RecipeDescription,
    RecipeId,
    RecipeIngredient,
    RecipeStep,
    RecipeTitle,
} from "@/domain";
import { Nutrients } from "@/domain/value-objects/Nutrients";

import type { IRecipeRepository } from "@/domain/ports/RecipeReposotory";
import type { UseCase } from "@/shared/types/use-case";
import type {
    IngredientDTO,
    RecipeDTO,
    StepDTO,
} from "../dtos/RecipeDTO";
import type { CalculateNutrients } from "../nutritionService";

export type CreateRecipeInput = {
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    steps: StepDTO[];
    authorId: string;
};
export type CreateRecipeOutput = RecipeDTO;
export type CreateRecipeUseCase = UseCase<
    CreateRecipeInput,
    CreateRecipeOutput
>;

export class CreateRecipe implements CreateRecipeUseCase {
    private readonly recipes: IRecipeRepository;
    private readonly idGen: { newId(): string };
    private readonly calculateNutrients: CalculateNutrients;

    constructor(
        recipes: IRecipeRepository,
        idGen: { newId(): string },
        calculateNutrients: CalculateNutrients
    ) {
        this.recipes = recipes;
        this.idGen = idGen;
        this.calculateNutrients = calculateNutrients;
    }

    async execute(
        input: CreateRecipeInput
    ): Promise<RecipeDTO> {
        const recipe = Recipe.create({
            id: RecipeId.from(this.idGen.newId()),
            authorId: AuthorId.from(input.authorId),
            title: RecipeTitle.from(input.title),
            description: RecipeDescription.from(
                input.description
            ),
            nutrients: Nutrients.from({
                protein: 0,
                fat: 0,
                carbohydrate: 0,
            }),
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
