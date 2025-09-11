import { configureStore } from "@reduxjs/toolkit";
import { userRecipeReducer } from "./features/recipes";
import { globalSearchReducer } from "./features/global-search";

const store = configureStore({
  reducer: {
    userRecipes: userRecipeReducer,
    globalSearch: globalSearchReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
