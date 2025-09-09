import { createSlice } from "@reduxjs/toolkit";

import type { FormState } from "@/shared/types";

import type { CreateRecipeFormState } from "../validation";
import type { UserRecipeState } from "../types";
import { addFetchUserRecipeCases } from "../async-reducers";

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

const initialSliceState: UserRecipeState = {
  recipes: [],
  totalRecipeCount: 0,
  rowsPerPage: 10,
  currentPage: 1,
  status: {
    loadUserRecipes: "idle",
  },
  errors: {},
  formState: initialFormState,
};

const userRecipeSlice = createSlice({
  name: "userRecipes",
  initialState: initialSliceState,
  reducers: {},
  extraReducers: (builder) => {
    addFetchUserRecipeCases(builder);
  },
});

const userRecipeReducer = userRecipeSlice.reducer;

export { userRecipeReducer };
