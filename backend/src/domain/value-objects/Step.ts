import { z } from "zod/v4";

const schema = z.object({
    order: z.number().positive(),
    durationSec: z.templateLiteral([
        z.number(),
        z.enum([" мин", " сек"]),
    ]),
    description: z.string().trim().max(1000).min(3),
});

export type Props = z.infer<typeof schema>;

export class Step {
    private _props: Props;

    private constructor(props: Props) {
        this._props = props;
    }

    static from(input: {
        order: Props["order"];
        durationSec: Props["durationSec"];
        description: Props["description"];
    }) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new Error("Invalid RecipeStep");
        }

        return new Step(result.data);
    }

    get order() {
        return this._props.order;
    }

    get durationSec() {
        return this._props.durationSec;
    }

    get description() {
        return this._props.description;
    }
}
