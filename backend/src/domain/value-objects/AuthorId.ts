import { z } from "zod/v4";

const schema = z.string().trim();

export class AuthorId {
    private _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid AuthorId");
        }

        return new AuthorId(result.data);
    }

    get value() {
        return this._value;
    }
}
