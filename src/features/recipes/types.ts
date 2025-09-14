import type { FetchStatus, FormState } from "@/shared/types";
import type { CreateRecipeFormState, Recipe } from "./validation";

type RecipeProp = keyof Omit<Recipe, "id" | "userId">;
type TableColumn = Record<RecipeProp, { value: RecipeProp; text: string }>;

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
  visibleTableColumns: RecipeProp[];
};

type RecipeResponse = { recipes: Recipe[] };

export type { RecipeState, RecipeResponse, TableColumn, RecipeProp };
