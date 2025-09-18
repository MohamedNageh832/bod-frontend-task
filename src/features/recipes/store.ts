import { createSlice } from "@reduxjs/toolkit";

import type { FormState } from "@/shared/types";

import type { CreateRecipeFormState } from "./validation";
import type { RecipeState } from "./types";
import { addFetchRecipesCases, addSearchRecipesCases } from "./thunks";
import type { RootState } from "@/store";
import * as reducers from "./reducers";

const initialFormState: FormState<CreateRecipeFormState> = {
  values: {
    name: "",
    ingredients: [],
    instructions: [],
    prepTimeMinutes: null,
    cookTimeMinutes: null,
    servings: null,
    difficulty: null,
    cuisine: null,
    caloriesPerServing: null,
    tags: [],
    image: null,
    mealType: [],
  },
  status: "idle",
  errors: {},
};

const initialSliceState: RecipeState = {
  search: {
    query: "",
    results: [],
    lastQuery: "",
    totalResults: 0,
  },
  recipes: [],
  totalRecipeCount: 0,
  status: {
    loadRecipes: "idle",
    searchRecipes: "idle",
  },
  errors: {},
  formState: initialFormState,
  visibleTableColumns: ["name", "prepTimeMinutes", "rating", "difficulty"],
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialSliceState,
  reducers,
  extraReducers: (builder) => {
    addFetchRecipesCases(builder);
    addSearchRecipesCases(builder);
  },
});

export const { updateVisibleColumns } = recipeSlice.actions;

const recipeReducer = recipeSlice.reducer;
const selectSearch = (state: RootState) => state.recipes.search;
const selectVisibleColumns = (state: RootState) =>
  state.recipes.visibleTableColumns;
const selectRecipes = (state: RootState) => state.recipes.recipes;
const selectTotalRecipesCount = (state: RootState) =>
  state.recipes.totalRecipeCount;
const selectStatus = (state: RootState) => state.recipes.status;
const selectErrors = (state: RootState) => state.recipes.errors;

export {
  recipeReducer,
  selectRecipes,
  selectVisibleColumns,
  selectSearch,
  selectTotalRecipesCount,
  selectStatus,
  selectErrors,
};
