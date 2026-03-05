import { z } from "zod/v4";

export const AVAILABLE_INGRIDIENT_UNITS = [
    "г",
    "кг",
    "шт",
] as const;

export type Units =
    (typeof AVAILABLE_INGRIDIENT_UNITS)[number];

const schema = z.object({
    title: z.string().trim().max(120).min(3),
    amount: z.number().positive(),
    units: z.literal(AVAILABLE_INGRIDIENT_UNITS),
});

export type Props = z.infer<typeof schema>;

export class Ingredient {
    private constructor(private readonly props: Props) {}

    static from(input: {
        title: string;
        amount: number;
        units: string;
    }) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new Error("Invalid RecipeIngridient");
        }

        return new Ingredient(result.data);
    }

    get title() {
        return this.props.title;
    }

    get amount() {
        return this.props.amount;
    }

    get units() {
        return this.props.units;
    }
}
