import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { recipeService } from "../services";
import type { RecipeState } from "../types";
import type { RootState } from "@/store";
import type { FilterOptions } from "@/shared/types";

export const searchRecipes = createAsyncThunk(
  "recipes/search",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const recipeState = state.recipes;
    const { query, lastQuery, results } = recipeState.search;
    const parsedQuery = query.trim();

    if (parsedQuery.length === 0 || parsedQuery === lastQuery) {
      const recipes = results;
      const currentPage = recipeState.currentPage;
      const totalRecipeCount = recipeState.totalRecipeCount;

      return { recipes, currentPage, totalRecipeCount };
    }

    const limit = recipeState.rowsPerPage;
    const offset = (recipeState.search.currentPage - 1) * limit;
    const filter: FilterOptions = { limit, offset };

    const res = await recipeService.search(parsedQuery, filter);

    if (res.status === "success" && res.data) {
      const { recipes, total, skip } = res.data;
      const currentPage = Math.ceil(skip / recipeState.rowsPerPage);
      const totalRecipeCount = total;

      return { recipes, currentPage, totalRecipeCount };
    } else return rejectWithValue(res.message);
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
      const { recipes, currentPage, totalRecipeCount } = action.payload;
      state.status.searchRecipes = "success";
      state.search.results = recipes;
      state.search.currentPage = currentPage;
      state.search.totalRecipeCount = totalRecipeCount;

      if (state.search.query === "") return;
      state.search.lastQuery = state.search.query.trim();
    })
    .addCase(searchRecipes.rejected, (state, action) => {
      state.status.searchRecipes = "error";
      state.errors.searchRecipes = action.payload as string;
    });
};
