import { configureStore } from "@reduxjs/toolkit";
import { recipeReducer } from "./features/recipes";
import { globalSearchReducer } from "./features/global-search";
import { authReducer } from "./features/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    globalSearch: globalSearchReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
