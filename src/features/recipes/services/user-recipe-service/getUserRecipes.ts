import type { FilterOptions } from "@/shared/types";
import { fetchRecipes } from "../../api";
import { validateRecipe } from "../../validation";

export const getUserRecipes = async (options?: FilterOptions) => {
  const response = await fetchRecipes(options);

  if (response.status === "error") {
    throw Error("Unable to fetch recipes. Try again later");
  }

  return response.data?.recipes.filter((r) => {
    const { isValid } = validateRecipe(r);
    return isValid;
  });
};
