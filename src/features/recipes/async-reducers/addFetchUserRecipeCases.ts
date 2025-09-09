import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

import type { FilterOptions } from "@/shared/types";

import type { UserRecipeState } from "../types";
import { userRecipeService } from "../services";
import type { Recipe } from "../validation";

export const fetchUserRecipes = createAsyncThunk(
  "userRecipes/fetchAll",
  async (options: FilterOptions) => {
    return await userRecipeService.getUserRecipes(options);
  }
);

export const addFetchUserRecipeCases = (
  builder: ActionReducerMapBuilder<UserRecipeState>
) => {
  builder
    .addCase(fetchUserRecipes.pending, (state) => {
      state.status.loadUserRecipes = "loading";
      delete state.errors.loadUserRecipes;
    })
    .addCase(fetchUserRecipes.fulfilled, (state, action) => {
      state.status.loadUserRecipes = "success";
      state.recipes = action.payload as Recipe[];
    })
    .addCase(fetchUserRecipes.rejected, (state, action) => {
      state.status.loadUserRecipes = "error";

      const { message } = action.payload as { message: string };
      state.errors.loadUserRecipes = message;
    });
};
