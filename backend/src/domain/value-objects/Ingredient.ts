import { z } from "zod/v4";

const schema = z.object({
    name: z.string().trim().max(120).min(3),
    amount: z.number().positive().or(z.literal("по вкусу")),
    units: z.string().trim().max(100),
});

export type Props = z.infer<typeof schema>;

export class Ingredient {
    private props: Props;

    private constructor(props: Props) {
        this.props = props;
    }

    static from(input: {
        name: string;
        amount: number | "по вкусу";
        units: string;
    }) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new Error("Invalid RecipeIngridient");
        }

        return new Ingredient(result.data);
    }

    get name() {
        return this.props.name;
    }

    get amount() {
        return this.props.amount;
    }

    get units() {
        return this.props.units;
    }
}
