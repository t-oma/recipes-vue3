import { z } from "zod/v4";

const schema = z.object({
    protein: z.number(),
    fat: z.number(),
    carbohydrate: z.number(),
});

export type Props = z.infer<typeof schema>;

export class Nutrients {
    private readonly _props: Props;

    private constructor(props: Props) {
        this._props = props;
    }

    static from(input: {
        protein: number;
        fat: number;
        carbohydrate: number;
    }) {
        const result = schema.safeParse(input);
        if (!result.success) {
            throw new Error("Invalid RecipeNutrients");
        }

        return new Nutrients(result.data);
    }

    get protein() {
        return this._props.protein;
    }

    get fat() {
        return this._props.fat;
    }

    get carbohydrate() {
        return this._props.carbohydrate;
    }
}
