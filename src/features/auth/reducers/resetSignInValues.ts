import { createInitialSignInFormState } from "../store";
import type { AuthState } from "../types";

export const resetSignInValues = (state: AuthState) => {
  state.signInFormState = createInitialSignInFormState();
};
