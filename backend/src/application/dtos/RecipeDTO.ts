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
    name: string;
    amount: number | "по вкусу";
    units: string;
};

export type StepDTO = {
    order: number;
    duration: `${number} мин` | `${number} сек`;
    description: string;
};
