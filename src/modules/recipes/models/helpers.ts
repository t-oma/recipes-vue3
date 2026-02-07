import { clamp, slugify } from "@/shared/utils";

import { MACRO_KEYS, MACRO_LABELS } from "./types";
import type { DishDTO } from "./dto";
import type {
  Dish,
  MacroGrams,
  MacroPercents,
} from "./types";

export function getMacroPercents(grams: MacroGrams): {
  total: number;
  percents: MacroPercents;
} {
  const total = MACRO_KEYS.reduce(
    (sum, k) => sum + grams[k],
    0,
  );

  const percents = MACRO_KEYS.reduce((acc, k) => {
    acc[k] = total === 0 ? 0 : (grams[k] / total) * 100;
    return acc;
  }, {} as MacroPercents);

  return { total, percents };
}

export function macrosWithDisplayInfo(macros: MacroGrams) {
  const { total, percents } = getMacroPercents(macros);

  return MACRO_KEYS.map((key) => ({
    key,
    label: MACRO_LABELS[key],
    amount: macros[key],
    percentage: parseInt(
      clamp(
        Number.isFinite(percents[key]) ? percents[key] : 0,
        0,
        100,
      ).toFixed(0),
      10,
    ),
    total,
  }));
}

export function mapDishDTO(dish: DishDTO): Dish {
  return {
    id: dish.id,
    image: dish.image,
    title: dish.title,
    slug: slugify(dish.title),
    description: dish.description,
    macronutrients: macrosWithDisplayInfo(
      dish.macronutrients,
    ),
    ingredients: dish.ingredients,
    steps: dish.steps,
  };
}
