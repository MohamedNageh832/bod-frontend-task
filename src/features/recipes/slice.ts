import type { FormState } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import type { CreateRecipeFormState } from "./validation";

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

const initialSliceState = {
  recipes: [],
  formState: initialFormState,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialSliceState,
  reducers: {},
});

export { recipeSlice };
