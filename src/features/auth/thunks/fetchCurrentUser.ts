import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";
import type { User } from "../validation";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { AuthState } from "../types";

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    const res = await authService.fetchCurrentUser();

    if (res.status === "error") return rejectWithValue(res.message);
    return res.data as User;
  }
);

export const addFetchCurrentUserCases = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(fetchCurrentUser.pending, (state) => {
      state.status.fetchCurrentUser = "loading";
      delete state.errors.fetchCurrentUser;
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.status.fetchCurrentUser = "success";
      state.user = action.payload;
    })
    .addCase(fetchCurrentUser.rejected, (state, action) => {
      state.status.fetchCurrentUser = "error";
      const errorMsg = (action.payload as string) || "An error occured";
      state.errors.fetchCurrentUser = errorMsg;
    });
};
