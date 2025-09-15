import type { FilterOptions } from "@/shared/types";
import * as api from "../../api";
import { validateRecipe, type Recipe } from "../../validation";

export const search = async (q: string, options?: FilterOptions) => {
  const res = await api.searchRecipes(q, options);

  if (res.status === "error" || !res.data) return res;

  const validRecipes = res.data.recipes.reduce((prev, curr) => {
    const { isValid, cleanBody } = validateRecipe(curr);
    if (isValid && cleanBody) prev.push(cleanBody);
    return prev;
  }, [] as Recipe[]);

  res.data.recipes = validRecipes;

  return res;
};
