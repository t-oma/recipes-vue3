import type { macrosWithDisplayInfo } from "./helpers";

export const MACRO_KEYS = [
  "protein",
  "fat",
  "carbs",
] as const;
export type MacroKey = (typeof MACRO_KEYS)[number];

export const MACRO_LABELS = {
  protein: "Білки",
  fat: "Жири",
  carbs: "Вуглеводи",
} satisfies Record<MacroKey, string>;

export type MacroGrams = Record<MacroKey, number>;
export type MacroPercents = Record<MacroKey, number>;

export type Ingredient =
  | {
      title: string;
      amount: number;
      units: "g" | "зубчики";
    }
  | { title: string };

export type Step = {
  durationSec: number;
  description: string;
};

export type MacrosWithDisplayInfo = ReturnType<
  typeof macrosWithDisplayInfo
>;

export type Dish = {
  id: string;
  image: { alt: string; src: string };
  title: string;
  slug: string;
  description: string;
  macronutrients: MacrosWithDisplayInfo;
  ingredients: Ingredient[];
  steps: Step[];
};
