import { apiGet } from "@/shared/api";
import { ROUTES } from "@/shared/constants";

import type { FilterOptions } from "@/shared/types";
import type { RecipeResponse } from "../types";

export const fetchRecipes = async (options: FilterOptions = {}) => {
  const limit = options.limit || 20;
  const offset = options.offset || 0;

  const response = await apiGet<RecipeResponse>(
    `${ROUTES.recipes.api.getAll}?limit=${limit}&skip=${offset}`
  );

  return response;
};
