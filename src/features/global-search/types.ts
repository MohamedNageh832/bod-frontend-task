import type { Recipe } from "@/features/recipes";

type GlobalSearchState = {
  query: string;
  error: string | null;
  isSearching: boolean;
  results: Recipe[];
  isSearchbarFocused: boolean;
};

export type { GlobalSearchState };
