import { apiGet } from "@/shared/api";
import { ROUTES } from "@/shared/constants";

import type { Recipe } from "../validation";
import type { FilterOptions } from "@/shared/types";

type Response = { recipes: Recipe[] };

export const fetchRecipes = async (options: FilterOptions = {}) => {
  const limit = Math.min(options.limit || 20, 50);
  const page = options?.page || 1;
  const offset = (page - 1) * limit;

  const response = await apiGet<Response>(
    `${ROUTES.recipes.api.getAll}?limit=${limit}&skip=${offset}`
  );

  return response;
};
