import { z } from "zod/v4";

const schema = z.string().trim().max(120).min(3);

export class Title {
    private constructor(public readonly value: string) {}

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid RecipeTitle");
        }

        return new Title(result.data);
    }
}
