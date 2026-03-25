import { z } from "zod/v4";

const schema = z.string().trim().max(2000);

export class Description {
    private constructor(public readonly value: string) {}

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid RecipeDescription");
        }

        return new Description(result.data);
    }
}
