import { apiGet } from "@/shared/api";
import type { RecipeResponse } from "../types";
import { ROUTES } from "@/shared/constants";
import type { FilterOptions } from "@/shared/types";

export const searchRecipes = async (
  query: string,
  options: FilterOptions = {}
) => {
  const limit = options.limit || 20;
  const offset = options.offset || 0;

  const url = `${ROUTES.recipes.api.search(
    query
  )}&skip=${offset}&limit=${limit}`;

  const result = await apiGet<RecipeResponse>(url);

  return result;
};
