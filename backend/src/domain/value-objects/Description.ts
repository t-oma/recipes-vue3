import { z } from "zod/v4";

const schema = z.string().trim().max(2000);

export class Description {
    private _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid RecipeDescription");
        }

        return new Description(result.data);
    }

    get value() {
        return this._value;
    }
}
