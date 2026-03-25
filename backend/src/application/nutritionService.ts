import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { nutrientsSchema } from "../services/recipeService";
import type { RecipeIngridient } from "@/adapter/out/mongo/models/RecipeModel";
import type { Nutrients } from "../services/recipeService";

export type CalculateNutrients = typeof calculateNutrients;

export async function calculateNutrients(
    ingridients: RecipeIngridient[]
): Promise<Nutrients | null> {
    const client = new OpenAI({
        apiKey: process.env["OPENAI_API_KEY"],
    });

    const ingredientsList = ingridients
        .map((i) => {
            if (i.amount === "по вкусу")
                return `${i.name} - по вкусу`;
            return `${i.name} - ${i.amount}${i.units}`;
        })
        .join("\n");

    const response = await client.responses.parse({
        model: "gpt-5-mini",
        input: [
            {
                role: "system",
                content:
                    "Ти дієтолог. Розраховуй нутрієнти для рецептів." +
                    "Повертай ТІЛЬКИ JSON без markdown: {protein, fat, carbohydrate)",
            },
            {
                role: "user",
                content: `Розрахуй білки, жири, вуглеводи (в грамах) для інгредієнтів: \n${ingredientsList}`,
            },
        ],
        text: {
            format: zodTextFormat(
                nutrientsSchema,
                "nutrients"
            ),
        },
    });

    return response.output_parsed;
}
