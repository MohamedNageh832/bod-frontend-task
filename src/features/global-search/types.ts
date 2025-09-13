import type { Recipe } from "@/features/recipes";

type GlobalSearchState = {
  query: string;
  error: string | null;
  isSearching: boolean;
  results: Recipe[];
};

export type { GlobalSearchState };
