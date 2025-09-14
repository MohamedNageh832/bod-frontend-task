import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

import type { FilterOptions } from "@/shared/types";

import type { RecipeState } from "../types";
import { recipeService } from "../services";
import type { Recipe } from "../validation";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (options: FilterOptions | undefined, { rejectWithValue }) => {
    const response = await recipeService.getRecipes(options);

    if (response.status === "success") return response.data?.recipes;
    else return rejectWithValue(response.message);
  }
);

export const addFetchRecipesCases = (
  builder: ActionReducerMapBuilder<RecipeState>
) => {
  builder
    .addCase(fetchRecipes.pending, (state) => {
      state.status.loadRecipes = "loading";
      delete state.errors.loadRecipes;
    })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.status.loadRecipes = "success";
      state.recipes = action.payload as Recipe[];
    })
    .addCase(fetchRecipes.rejected, (state, action) => {
      state.status.loadRecipes = "error";

      const message = action.payload as string;
      state.errors.loadRecipes = message;
    });
};
