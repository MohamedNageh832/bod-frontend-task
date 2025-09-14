import { searchRecipes } from "@/features/recipes";

export const search = async (q: string) => {
  const res = await searchRecipes(q);

  return res;
};
