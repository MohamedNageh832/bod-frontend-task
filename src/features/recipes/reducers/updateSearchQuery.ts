import type { PayloadAction } from "@reduxjs/toolkit";
import type { RecipeState } from "../types";

export const updateSearchQuery = (
  state: RecipeState,
  action: PayloadAction<string>
) => {
  state.search.query = action.payload;
  state.status.searchRecipes = "idle";
};
