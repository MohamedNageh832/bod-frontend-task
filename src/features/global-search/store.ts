import { createSlice } from "@reduxjs/toolkit";
import type { GlobalSearchState } from "./types";
import * as reducers from "./reducers";
import { addExecuteSearchCases } from "./thunks";
import type { RootState } from "@/store";

const initialState: GlobalSearchState = {
  query: "",
  results: [],
  error: null,
  isSearching: false,
  isSearchbarFocused: false,
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers,
  extraReducers: (builder) => {
    addExecuteSearchCases(builder);
  },
});

export const { actions: globalSearchActions } = globalSearchSlice;

const globalSearchReducer = globalSearchSlice.reducer;

const selectQuery = (state: RootState) => state.globalSearch.query;
const selectIsSearching = (state: RootState) => state.globalSearch.isSearching;
const selectError = (state: RootState) => state.globalSearch.error;
const selectResults = (state: RootState) => state.globalSearch.results;

export {
  globalSearchReducer,
  selectQuery,
  selectIsSearching,
  selectError,
  selectResults,
};
