import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../types";
import type { SignInInput } from "../validation";

type Payload = Partial<SignInInput>;

export const updateSignInValue = (
  state: AuthState,
  action: PayloadAction<Payload>
) => {
  const props = action.payload;
  const keys = Object.keys(props) as (keyof SignInInput)[];

  keys.forEach((key) => {
    const value = props[key] as SignInInput[typeof key];

    state.signInFormState.values[key] = value;
    delete state.signInFormState.errors[key];
  });
};
