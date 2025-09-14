import type { PayloadAction } from "@reduxjs/toolkit";
import type { RecipeState } from "../types";
import type { CreateRecipeInput, Recipe } from "../validation";
import { TABLE_COLUMNS } from "../constants";

type Payload = Partial<Record<keyof CreateRecipeInput, boolean>>;

const sortedColumns = Object.keys(TABLE_COLUMNS) as (keyof Recipe)[];

export const updateVisibleColumns = (
  state: RecipeState,
  action: PayloadAction<Payload>
) => {
  const keys = Object.keys(action.payload) as (keyof CreateRecipeInput)[];

  keys.forEach((newCol) => {
    const isChecked = action.payload[newCol];
    const isVisible = state.visibleTableColumns.includes(newCol);

    if (isChecked && !isVisible) {
      for (let i = 0; i < state.visibleTableColumns.length; i++) {
        const currentColumn = state.visibleTableColumns[i];

        const currentColumnOrder = sortedColumns.indexOf(currentColumn);
        const newColumnOrder = sortedColumns.indexOf(newCol);

        if (newColumnOrder < currentColumnOrder) {
          state.visibleTableColumns.splice(i, 0, newCol);
          break;
        } else if (i === state.visibleTableColumns.length - 1) {
          state.visibleTableColumns.push(newCol);
          break;
        }
      }
    } else if (!isChecked && isVisible) {
      const index = state.visibleTableColumns.indexOf(newCol);
      state.visibleTableColumns.splice(index, 1);
    }
  });
};
