import type { PayloadAction } from "@reduxjs/toolkit";
import type { GlobalSearchState } from "../types";

export const updateQuery = (
  state: GlobalSearchState,
  action: PayloadAction<string>
) => {
  state.error = null;
  state.query = action.payload;
};
