export type RecipeDTO = {
    id: string;
    authorId: string;
    title: string;
    description: string;
    ingredients: IngredientDTO[];
    steps: StepDTO[];
    createdAt: Date;
    updatedAt: Date;
};

export type IngredientDTO = {
    title: string;
    amount: number;
    units: string;
};

export type StepDTO = {
    order: number;
    durationSec: number;
    description: string;
};
