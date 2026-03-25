import { z } from "zod/v4";

const schema = z.string().trim().max(120).min(3);

export class Title {
    private _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid RecipeTitle");
        }

        return new Title(result.data);
    }

    get value() {
        return this._value;
    }
}
