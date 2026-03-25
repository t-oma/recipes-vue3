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
    constructor(private props: IRecipe) {
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
        return this.props.id;
    }

    get authorId() {
        return this.props.authorId;
    }

    get title() {
        return this.props.title;
    }

    get description() {
        return this.props.description;
    }

    get ingredients() {
        return this.props.ingredients;
    }

    get steps() {
        return this.props.steps;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    toPrimitives() {
        return {
            id: this.props.id.value,
            authorId: this.props.authorId.value,
            title: this.props.title.value,
            description: this.props.description.value,
            ingredients: this.props.ingredients.map(
                (i) => ({
                    title: i.title,
                    amount: i.amount,
                    units: i.units as string,
                })
            ),
            steps: this.props.steps.map((s) => ({
                order: s.order,
                durationSec: s.durationSec,
                description: s.description,
            })),
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }

    private ensureInvariants() {
        if (this.props.ingredients.length === 0) {
            throw new Error(
                "Recipe must have at least one ingredient"
            );
        }
        if (this.props.steps.length === 0) {
            throw new Error(
                "Recipe must have at least one step"
            );
        }
    }
}
