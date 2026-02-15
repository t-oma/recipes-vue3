import * as z from "zod/v4";

export const createRecipeSchema = z.object({
    title: z
        .string()
        .refine((val) => val.length >= 3, {
            error: "Too short!",
        })
        .refine((val) => val.length < 100, {
            error: "Too long!",
        }),
    description: z
        .string()
        .refine((val) => val.length < 3000, {
            error: "Too long!",
        }),
    ingredients: z
        .string()
        .array()
        .refine((val) => val.length < 100, {
            error: "Too many items!",
        }),
    instructions: z
        .string()
        .refine((val) => val.length < 3000, {
            error: "Too long!",
        }),
});
