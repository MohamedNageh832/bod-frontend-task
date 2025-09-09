import type { FilterOptions } from "@/shared/types";
import { fetchRecipes } from "../../api";

export const getUserRecipes = async (options: FilterOptions) => {
  // TODO: handle errors and post validation
  // ! Build the validate util

  try {
    const allRecipes = await fetchRecipes(options);

    //   const isValidResponse =
    return allRecipes.filter((r) => r.userId === 1);
  } catch (err) {
    return { message: "" };
  }
};
