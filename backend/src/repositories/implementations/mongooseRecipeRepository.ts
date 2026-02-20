import Recipe, { ToObjectId } from "@/models/Recipe";

import type {
    CreateRecipeData,
    IRecipeRepository,
    UpdateRecipeData,
} from "@/repositories/interfaces/IRecipeRepository";

export const createMongooseRecipeRepository =
    (): IRecipeRepository => ({
        findAllWithAuthor: async () => {
            return Recipe.find()
                .populate("author", "name")
                .sort({ updatedAt: -1 });
        },

        findByIdWithAuthor: async (id: string) => {
            return Recipe.findById(id).populate(
                "author",
                "name"
            );
        },

        create: async (data: CreateRecipeData) => {
            return Recipe.create({
                title: data.title,
                description: data.description,
                nutrients: data.nutrients,
                ingredients: data.ingredients,
                steps: data.steps,
                author: ToObjectId(data.author),
            });
        },

        updateById: async (
            id: string,
            data: UpdateRecipeData
        ) => {
            return Recipe.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
        },
    });
