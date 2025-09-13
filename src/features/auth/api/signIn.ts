import { apiPost } from "@/shared/api";
import type { SignInInput, SignInResponse } from "../validation";
import { ROUTES } from "@/shared/constants";

export const signIn = async (credentials: SignInInput) => {
  return await apiPost<SignInResponse>(ROUTES.auth.api.signIn, {
    body: credentials,
  });
};
