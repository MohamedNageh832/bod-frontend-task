import type { TableColumn } from "./types";

const CUISINE = [
  "Italian",
  "Asian",
  "American",
  "Mexican",
  "Mediterranean",
  "Pakistani",
  "Japanese",
  "Moroccan",
  "Korean",
  "Greek",
  "Thai",
  "Indian",
  "Turkish",
  "Smoothie",
  "Russian",
  "Lebanese",
  "Brazilian",
] as const;

const MEAL_TYPE = [
  "Dinner",
  "Lunch",
  "Snack",
  "Dessert",
  "Side Dish",
  "Appetizer",
  "Snacks",
  "Breakfast",
  "Beverage",
] as const;

const TABLE_COLUMNS: TableColumn = {
  image: {
    text: "Image",
    value: "image",
  },
  name: {
    text: "Name",
    value: "name",
  },
  ingredients: {
    text: "Ingredients",
    value: "ingredients",
  },
  instructions: {
    text: "Instructions",
    value: "instructions",
  },
  prepTimeMinutes: {
    text: "Preparation Time (Minutes)",
    value: "prepTimeMinutes",
  },
  cookTimeMinutes: {
    text: "Cooking Time (Minutes)",
    value: "cookTimeMinutes",
  },
  servings: {
    text: "Servings",
    value: "servings",
  },
  rating: {
    text: "Rating",
    value: "rating",
  },
  difficulty: {
    text: "Difficulty",
    value: "difficulty",
  },
  cuisine: {
    text: "Cuisine",
    value: "cuisine",
  },
  caloriesPerServing: {
    text: "Calories Per Serving",
    value: "caloriesPerServing",
  },
  tags: {
    text: "Tags",
    value: "tags",
  },
  mealType: {
    text: "Meal Type",
    value: "mealType",
  },
  reviewCount: {
    text: "Review Count",
    value: "reviewCount",
  },
};

export { CUISINE, MEAL_TYPE, TABLE_COLUMNS };
