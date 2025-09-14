import { createSlice } from "@reduxjs/toolkit";

import type { FormState } from "@/shared/types";

import type { CreateRecipeFormState } from "./validation";
import type { RecipeState } from "./types";
import { addFetchRecipesCases } from "./thunks";
import type { RootState } from "@/store";

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
  recipes: [],
  totalRecipeCount: 0,
  rowsPerPage: 10,
  currentPage: 1,
  status: {
    loadRecipes: "idle",
  },
  errors: {},
  formState: initialFormState,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialSliceState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchRecipesCases(builder);
  },
});

const recipeReducer = recipeSlice.reducer;

const selectRecipes = (state: RootState) => state.recipes.recipes;

export { recipeReducer, selectRecipes };
