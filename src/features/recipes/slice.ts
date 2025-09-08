import type { MultiStepFormState } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import type { CreateRecipeInput } from "./validation";

const initialFormState: MultiStepFormState<CreateRecipeInput> = {
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
  currentStep: 1,
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
