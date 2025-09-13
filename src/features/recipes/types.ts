import type { FetchStatus, FormState } from "@/shared/types";
import type { CreateRecipeFormState, Recipe } from "./validation";

type RecipeState = {
  recipes: Recipe[];
  totalRecipeCount: number;
  rowsPerPage: number;
  currentPage: number;
  status: {
    loadRecipes: FetchStatus;
  };
  errors: Partial<Record<keyof RecipeState["status"], string>>;
  formState: FormState<CreateRecipeFormState>;
};

type RecipeResponse = { recipes: Recipe[] };

export type { RecipeState, RecipeResponse };
