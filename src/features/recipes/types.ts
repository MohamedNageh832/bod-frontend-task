import type { FetchStatus, FormState } from "@/shared/types";
import type { CreateRecipeFormState, Recipe } from "./validation";

type RecipeProp = keyof Omit<Recipe, "id" | "userId">;
type TableColumn = Record<RecipeProp, { value: RecipeProp; text: string }>;

type RecipeState = {
  search: {
    query: string;
    results: Recipe[];
    lastQuery: string;
    currentPage: number;
    totalRecipeCount: number;
  };
  recipes: Recipe[];
  totalRecipeCount: number;
  rowsPerPage: number;
  currentPage: number;
  status: {
    loadRecipes: FetchStatus;
    searchRecipes: FetchStatus;
  };
  errors: Partial<Record<keyof RecipeState["status"], string>>;
  formState: FormState<CreateRecipeFormState>;
  visibleTableColumns: RecipeProp[];
};

type RecipeResponse = {
  recipes: Recipe[];
  limit: number;
  skip: number;
  total: number;
};

export type { RecipeState, RecipeResponse, TableColumn, RecipeProp };
