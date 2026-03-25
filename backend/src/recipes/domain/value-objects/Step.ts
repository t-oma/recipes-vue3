import { z } from "zod/v4";

const schema = z.object({
    order: z.number().positive(),
    durationSec: z.number().positive(),
    description: z.string().trim().max(1000).min(3),
});

export type Props = z.infer<typeof schema>;

export class Step {
    private constructor(private readonly props: Props) {}

    static from(input: {
        order: number;
        durationSec: number;
        description: string;
    }) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new Error("Invalid RecipeStep");
        }

        return new Step(result.data);
    }

    get order() {
        return this.props.order;
    }

    get durationSec() {
        return this.props.durationSec;
    }

    get description() {
        return this.props.description;
    }
}
