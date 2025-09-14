import { tokenService } from "../services";
import type { AuthState } from "../types";

export const signOut = (state: AuthState) => {
  state.user = null;
  tokenService.clear();
};
