import { z } from "zod/v4";

const schema = z.string().trim();

export class AuthorId {
    private constructor(public readonly value: string) {}

    static from(value: string) {
        const result = schema.safeParse(value);
        if (!result.success) {
            throw new Error("Invalid AuthorId");
        }

        return new AuthorId(result.data);
    }
}
