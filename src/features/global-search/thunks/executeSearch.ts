import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { globalSearchService } from "../services";
import type { GlobalSearchState } from "../types";
import type { RecipeResponse } from "@/features/recipes";

export const executeSearch = createAsyncThunk(
  "globalSearch/search",
  async (q: string, { rejectWithValue }) => {
    const response = await globalSearchService.search(q);

    if (response.status === "success") return response.data as RecipeResponse;
    else return rejectWithValue(response.message);
  }
);

export const addExecuteSearchCases = (
  builder: ActionReducerMapBuilder<GlobalSearchState>
) => {
  builder
    .addCase(executeSearch.pending, (state) => {
      state.isSearching = true;
    })
    .addCase(executeSearch.fulfilled, (state, action) => {
      state.isSearching = false;
      const { recipes } = action.payload as RecipeResponse;

      state.results = recipes;
    })
    .addCase(executeSearch.rejected, (state, action) => {
      state.isSearching = false;
      state.results = [];
      state.error = action.payload as string;
    });
};
