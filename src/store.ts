import { configureStore } from "@reduxjs/toolkit";
import { userRecipeReducer } from "./features/recipes";

const store = configureStore({
  reducer: {
    userRecipes: userRecipeReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
