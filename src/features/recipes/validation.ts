import { DIFFICULITY } from "@/shared/constants";
import z from "zod";
import { CUISINE, MEAL_TYPE } from "./constants";
import type { Override } from "@/shared/types";
import { validate } from "@/shared/utils";

const createRecipeSchema = z.object({
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

const recipeSchema = createRecipeSchema.extend({
  id: z.number(),
  userId: z.number(),
  reviewCount: z.number(),
  rating: z.number().nullable(),
});

type CreateRecipeFormState = Override<
  z.infer<typeof createRecipeSchema>,
  {
    prepTimeMinutes: number | null;
    cookTimeMinutes: number | null;
    servings: number | null;
    difficulty: (typeof DIFFICULITY)[number] | null;
    cuisine: (typeof CUISINE)[number] | null;
    caloriesPerServing: number | null;
  }
>;

const validateCreateRecipeInput = (data: unknown) =>
  validate(createRecipeSchema, data);

const validateRecipe = (data: unknown) => validate(recipeSchema, data);

type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
type Recipe = z.infer<typeof recipeSchema>;

export {
  createRecipeSchema,
  recipeSchema,
  validateCreateRecipeInput,
  validateRecipe,
};
export type { CreateRecipeFormState, CreateRecipeInput, Recipe };
