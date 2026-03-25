import { model, Schema } from "mongoose";

import { USER_DOCUMENT_NAME } from "./UserModel";
import type { ObjectId } from "mongoose";
import type { Prettify } from "@/shared/types/utility";
import type { MongoID } from ".";

export type RecipeIngridient = Prettify<{
    name: string;
    amount: number | "по вкусу";
    units: string;
}>;

export type RecipeStep = Prettify<{
    order: number;
    description: string;
    duration: `${number} мин` | `${number} сек`;
}>;

export type RecipeNutrients = Prettify<{
    protein: number;
    fat: number;
    carbohydrate: number;
}>;

export type IRecipe = Prettify<
    {
        title: string;
        description: string;
        nutrients: RecipeNutrients;
        ingredients: RecipeIngridient[];
        steps: RecipeStep[];
        authorId: ObjectId;
        createdAt: Date;
        updatedAt: Date;
    } & MongoID
>;

const nutrientsSchema = new Schema<RecipeNutrients>(
    {
        protein: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
        carbohydrate: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const ingridientSchema = new Schema<RecipeIngridient>(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: function (v: number | string) {
                    return (
                        typeof v === "number" ||
                        v === "по вкусу"
                    );
                },
                message:
                    'Amount must be a number or "по вкусу"',
            },
        },
        units: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const stepSchema = new Schema<RecipeStep>(
    {
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const recipeSchema = new Schema<IRecipe>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        nutrients: nutrientsSchema,
        ingredients: {
            type: [ingridientSchema],
            required: true,
            validate: {
                validator: (v: string[]) => v.length > 0,
                message:
                    "Recipe must have at least one ingredient",
            },
        },
        steps: {
            type: [stepSchema],
            required: true,
            validate: {
                validator: (v: RecipeStep[]) =>
                    v.length > 0,
                message:
                    "Recipe must have at least one step",
            },
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: USER_DOCUMENT_NAME,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const RECIPE_DOCUMENT_NAME = "Recipe" as const;

export function ToObjectId(
    id: string
): Schema.Types.ObjectId {
    return id as unknown as Schema.Types.ObjectId;
}

export default model<IRecipe>(
    RECIPE_DOCUMENT_NAME,
    recipeSchema
);
