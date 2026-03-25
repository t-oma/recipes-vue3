import RecipeModel from "@/adapter/out/mongo/models/RecipeModel";
import {
    IRecipeRepository,
    Recipe,
    RecipeIngredient,
    RecipeStep,
} from "@/domain";

export const createRecipeRepository =
    (): IRecipeRepository => ({
        list: async () => {
            const models = await RecipeModel.find()
                .populate("author", "name")
                .sort({ updatedAt: -1 });

            if (!models) {
                return [];
            }

            return models.map((m) =>
                Recipe.rehydrate({
                    id: m._id.toString(),
                    authorId: m.authorId.toString(),
                    title: m.title,
                    description: m.description,
                    ingredients: m.ingredients.map((i) =>
                        RecipeIngredient.from({
                            name: i.name,
                            amount: i.amount,
                            units: i.units,
                        })
                    ),
                    steps: m.steps.map((s) =>
                        RecipeStep.from({
                            order: s.order,
                            durationSec: s.duration,
                            description: s.description,
                        })
                    ),
                    createdAt: m.createdAt,
                    updatedAt: m.updatedAt,
                })
            );
        },

        findById: async (id: string) => {
            const model = await RecipeModel.findById(
                id
            ).populate("author", "name");

            if (!model) {
                return null;
            }

            const ingredients: RecipeIngredient[] =
                model.ingredients.map((i) => {
                    return RecipeIngredient.from({
                        name: i.name,
                        amount: i.amount,
                        units: i.units,
                    });
                });

            const steps: RecipeStep[] = model.steps.map(
                (s) => {
                    return RecipeStep.from({
                        order: s.order,
                        durationSec: s.duration,
                        description: s.description,
                    });
                }
            );

            return Recipe.rehydrate({
                id: model._id.toString(),
                authorId: model.authorId.toString(),
                title: model.title,
                description: model.description,
                ingredients: ingredients,
                steps: steps,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
            });
        },

        create: async (recipe: Recipe) => {
            const model = await RecipeModel.create(
                recipe.toPrimitives()
            );

            const ingredients: RecipeIngredient[] =
                model.ingredients.map((i) => {
                    return RecipeIngredient.from({
                        name: i.name,
                        amount: i.amount,
                        units: i.units,
                    });
                });

            const steps: RecipeStep[] = model.steps.map(
                (s) => {
                    return RecipeStep.from({
                        order: s.order,
                        durationSec: s.duration,
                        description: s.description,
                    });
                }
            );

            return Recipe.rehydrate({
                id: model._id.toString(),
                authorId: model.authorId.toString(),
                title: model.title,
                description: model.description,
                ingredients: ingredients,
                steps: steps,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
            });
        },

        update: async (id: string, recipe: Recipe) => {
            const model =
                await RecipeModel.findByIdAndUpdate(
                    id,
                    { $set: recipe },
                    { new: true }
                );

            if (!model) {
                return null;
            }

            const ingredients: RecipeIngredient[] =
                model.ingredients.map((i) => {
                    return RecipeIngredient.from({
                        name: i.name,
                        amount: i.amount,
                        units: i.units,
                    });
                });

            const steps: RecipeStep[] = model.steps.map(
                (s) => {
                    return RecipeStep.from({
                        order: s.order,
                        durationSec: s.duration,
                        description: s.description,
                    });
                }
            );

            return Recipe.rehydrate({
                id: model._id.toString(),
                authorId: model.authorId.toString(),
                title: model.title,
                description: model.description,
                ingredients: ingredients,
                steps: steps,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
            });
        },
    });
