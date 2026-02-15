import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const recipeSchema: Schema = new Schema(
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
        ingredients: {
            type: [String],
            required: true,
            validate: {
                validator: (v: string[]) => v.length > 0,
                message:
                    "Recipe must have at least one ingredient",
            },
        },
        instructions: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IRecipe>(
    "Recipe",
    recipeSchema
);
