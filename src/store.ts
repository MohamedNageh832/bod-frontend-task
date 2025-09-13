import { configureStore } from "@reduxjs/toolkit";
import { recipeReducer } from "./features/recipes";
import { globalSearchReducer } from "./features/global-search";

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    globalSearch: globalSearchReducer,
  },
});

const dispatch = store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, dispatch };
export type { RootState, AppDispatch };
