import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

import type { FilterOptions } from "@/shared/types";

import type { UserRecipeState } from "../types";
import { recipeService } from "../services";
import type { Recipe } from "../validation";

export const fetchRecipes = createAsyncThunk(
  "userRecipes/fetchRecipes",
  async (options: FilterOptions | undefined, { rejectWithValue }) => {
    const response = await recipeService.getRecipes(options);

    if (response.status === "success") return response.data?.recipes;
    else return rejectWithValue(response.message);
  }
);

export const addFetchUserRecipesCases = (
  builder: ActionReducerMapBuilder<UserRecipeState>
) => {
  builder
    .addCase(fetchRecipes.pending, (state) => {
      state.status.loadUserRecipes = "loading";
      delete state.errors.loadUserRecipes;
    })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.status.loadUserRecipes = "success";
      state.recipes = action.payload as Recipe[];
    })
    .addCase(fetchRecipes.rejected, (state, action) => {
      state.status.loadUserRecipes = "error";

      const message = action.payload as string;
      state.errors.loadUserRecipes = message;
    });
};
