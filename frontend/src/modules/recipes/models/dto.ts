import type { Ingredient, MacroGrams, Step } from "./types";

export type DishDTO = {
  id: string;
  image: { alt: string; src: string };
  title: string;
  description: string;
  macronutrients: MacroGrams;
  ingredients: Ingredient[];
  steps: Step[];
};
