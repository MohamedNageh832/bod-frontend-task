import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { recipeService } from "../services";
import type { RecipeState } from "../types";
import type { RootState } from "@/store";
import type { FilterOptions } from "@/shared/types";
import type { Recipe } from "../validation";

type ReturnValue = {
  searchResults: Recipe[];
  totalResults: number;
};

type Args = {
  q: string;
  page?: number;
  limit?: number;
};

export const searchRecipes = createAsyncThunk<ReturnValue, Args>(
  "recipes/search",
  async (config, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const recipeState = state.recipes;

    const limit = config.limit || 10;
    const page = config.page || 1;
    const offset = Math.max(limit * (page - 1), 0);
    const parsedQuery = config.q.trim();

    if (parsedQuery.length === 0) {
      const searchResults = recipeState.search.results;
      const totalResults = recipeState.search.totalResults;

      return { searchResults, totalResults };
    }

    const filter: FilterOptions = { limit, offset };

    const res = await recipeService.search(parsedQuery, filter);

    if (res.status === "success" && res.data) {
      const { recipes, total } = res.data;
      return { searchResults: recipes, totalResults: total };
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const addSearchRecipesCases = (
  builder: ActionReducerMapBuilder<RecipeState>
) => {
  builder
    .addCase(searchRecipes.pending, (state) => {
      state.status.searchRecipes = "loading";
    })
    .addCase(searchRecipes.fulfilled, (state, action) => {
      const { searchResults, totalResults } = action.payload;
      state.status.searchRecipes = "success";
      state.search.results = searchResults;
      state.search.totalResults = totalResults;

      if (state.search.query === "") return;
      state.search.lastQuery = state.search.query.trim();
    })
    .addCase(searchRecipes.rejected, (state, action) => {
      state.status.searchRecipes = "error";
      state.errors.searchRecipes = action.payload as string;
    });
};
