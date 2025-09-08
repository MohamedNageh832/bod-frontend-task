import { DIFFICULITY } from "@/shared/constants";
import z from "zod";
import { CUISINE, MEAL_TYPE } from "./constants";

const baseRecipeSchema = z.object({
  name: z.string().min(3),
  ingredients: z.array(z.string().min(2)).min(2),
  instructions: z.array(z.string().min(2)).min(2),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.enum(DIFFICULITY),
  cuisine: z.enum(CUISINE),
  caloriesPerServing: z.number(),
  tags: z.array(z.union([z.enum(CUISINE), z.string()])),
  image: z.url().nullable(),
  mealType: z.array(z.enum(MEAL_TYPE)),
});

const createRecipeInputSchema = baseRecipeSchema.extend({
  prepTimeMinutes: z.number().nullable(),
  cookTimeMinutes: z.number().nullable(),
  servings: z.number().nullable(),
  difficulty: z.enum(DIFFICULITY).nullable(),
  cuisine: z.enum(CUISINE).nullable(),
  caloriesPerServing: z.number().nullable(),
});

const recipeSchema = baseRecipeSchema.extend({
  id: z.number(),
  userId: z.number(),
  reviewCount: z.number(),
  rating: z.number().nullable(),
});

type BaseRecipe = z.infer<typeof baseRecipeSchema>;
type CreateRecipeInput = z.infer<typeof createRecipeInputSchema>;
type Recipe = z.infer<typeof recipeSchema>;

export { baseRecipeSchema, createRecipeInputSchema, recipeSchema };
export type { BaseRecipe, CreateRecipeInput, Recipe };
