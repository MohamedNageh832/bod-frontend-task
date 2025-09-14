import type { FilterOptions } from "@/shared/types";
import { fetchRecipes } from "../../api";
import { validateRecipe } from "../../validation";

export const getRecipes = async (options?: FilterOptions) => {
  const response = await fetchRecipes(options);

  if (response.data) {
    response.data.recipes = response.data?.recipes.filter(
      (r) => validateRecipe(r).isValid
    );
  }

  return response;
};
