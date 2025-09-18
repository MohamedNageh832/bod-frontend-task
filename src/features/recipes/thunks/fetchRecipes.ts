import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

import type { RecipeState } from "../types";
import { recipeService } from "../services";
import type { Recipe } from "../validation";

type ReturnValue = {
  recipes: Recipe[];
  total: number;
};

type Args = {
  page?: number;
  limit?: number;
} | void;

export const fetchRecipes = createAsyncThunk<ReturnValue, Args>(
  "recipes/fetchRecipes",
  async (config, { rejectWithValue }) => {
    const page = config && config.page ? config.page : 1;
    const limit = config && config.limit ? config.limit : 10;
    const offset = Math.max(limit * (page - 1), 0);
    const response = await recipeService.getRecipes({ limit, offset });

    if (response.status === "success" && response.data) {
      const { recipes, total } = response.data;

      return { recipes, total };
    } else return rejectWithValue(response.message);
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
      const { recipes, total } = action.payload;

      state.status.loadRecipes = "success";
      state.recipes = recipes;
      state.totalRecipeCount = total;
    })
    .addCase(fetchRecipes.rejected, (state, action) => {
      state.status.loadRecipes = "error";

      const message = action.payload as string;
      state.errors.loadRecipes = message;
    });
};
