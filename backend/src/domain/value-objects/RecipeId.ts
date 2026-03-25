import { z } from "zod/v4";

const schema = z.string().trim();

export class RecipeId {
    private _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid RecipeId");
        }

        return new RecipeId(result.data);
    }

    get value() {
        return this._value;
    }
}
