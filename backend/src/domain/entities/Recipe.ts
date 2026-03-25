import { AuthorId } from "../value-objects/AuthorId";
import { Description } from "../value-objects/Description";
import { Ingredient } from "../value-objects/Ingredient";
import { RecipeId } from "../value-objects/RecipeId";
import { Step } from "../value-objects/Step";
import { Title } from "../value-objects/Title";

export interface IRecipe {
    id: RecipeId;
    authorId: AuthorId;
    title: Title;
    description: Description;
    ingredients: Ingredient[];
    steps: Step[];
    createdAt: Date;
    updatedAt: Date;
}

export class Recipe {
    private _props: IRecipe;

    constructor(props: IRecipe) {
        this._props = props;

        this.ensureInvariants();
    }

    static create(input: {
        id: RecipeId;
        authorId: AuthorId;
        title: Title;
        description: Description;
        ingredients: Ingredient[];
        steps: Omit<Step, "order">[];
    }) {
        const now = new Date();
        const steps: Step[] = input.steps.map(
            (step, index) =>
                Step.from({
                    order: index + 1,
                    durationSec: step.durationSec,
                    description: step.description,
                })
        );

        return new Recipe({
            id: input.id,
            authorId: input.authorId,
            title: input.title,
            description: input.description,
            ingredients: input.ingredients,
            steps,
            createdAt: now,
            updatedAt: now,
        });
    }

    static rehydrate(p: {
        id: string;
        authorId: string;
        title: string;
        description: string;
        ingredients: Ingredient[];
        steps: Step[];
        createdAt: Date | string;
        updatedAt: Date | string;
    }) {
        return new Recipe({
            id: RecipeId.from(p.id),
            authorId: AuthorId.from(p.authorId),
            title: Title.from(p.title),
            description: Description.from(p.description),
            ingredients: p.ingredients,
            steps: p.steps,
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt),
        });
    }

    get id() {
        return this._props.id;
    }

    get authorId() {
        return this._props.authorId;
    }

    get title() {
        return this._props.title;
    }

    get description() {
        return this._props.description;
    }

    get ingredients() {
        return this._props.ingredients;
    }

    get steps() {
        return this._props.steps;
    }

    get createdAt() {
        return this._props.createdAt;
    }

    get updatedAt() {
        return this._props.updatedAt;
    }

    toPrimitives() {
        return {
            id: this._props.id.value,
            authorId: this._props.authorId.value,
            title: this._props.title.value,
            description: this._props.description.value,
            ingredients: this._props.ingredients.map(
                (i) => ({
                    name: i.name,
                    amount: i.amount,
                    units: i.units,
                })
            ),
            steps: this._props.steps.map((s) => ({
                order: s.order,
                durationSec: s.durationSec,
                description: s.description,
            })),
            createdAt: this._props.createdAt,
            updatedAt: this._props.updatedAt,
        };
    }

    private ensureInvariants() {
        if (this._props.ingredients.length === 0) {
            throw new Error(
                "Recipe must have at least one ingredient"
            );
        }
        if (this._props.steps.length === 0) {
            throw new Error(
                "Recipe must have at least one step"
            );
        }
    }
}
