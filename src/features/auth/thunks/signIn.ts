import type { RootState } from "@/store";
import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { authService } from "../services";
import type { SignInInput, User } from "../validation";
import type { AuthState } from "../types";
import type { ValidationErrors } from "@/shared/types";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const credentials = state.auth.signInFormState.values;

    const res = await authService.signIn(credentials);

    if (res.status === "error") return rejectWithValue(res.errors);

    return res.data as User;
  }
);

export const addSignInCases = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(signIn.pending, (state) => {
      state.signInFormState.status = "loading";
      state.signInFormState.errors = {};
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.signInFormState.status = "success";
      state.user = action.payload;
    })
    .addCase(signIn.rejected, (state, action) => {
      state.signInFormState.status = "error";

      state.signInFormState.errors =
        (action.payload as ValidationErrors<SignInInput>) || {};
    });
};
