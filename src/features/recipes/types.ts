import type { FetchStatus, FormState } from "@/shared/types";
import type { CreateRecipeFormState, Recipe } from "./validation";

type UserRecipeState = {
  recipes: Recipe[];
  totalRecipeCount: number;
  rowsPerPage: number;
  currentPage: number;
  status: {
    loadUserRecipes: FetchStatus;
  };
  errors: Partial<Record<keyof UserRecipeState["status"], string>>;
  formState: FormState<CreateRecipeFormState>;
};

type RecipeResponse = { recipes: Recipe[] };

export type { UserRecipeState, RecipeResponse };
