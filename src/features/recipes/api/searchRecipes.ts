import { apiGet } from "@/shared/api";
import type { RecipeResponse } from "../types";
import { ROUTES } from "@/shared/constants";

export const searchRecipes = async (query: string) => {
  const result = await apiGet<RecipeResponse>(ROUTES.recipes.api.search(query));

  return result;
};
