import type { FetchStatus, FormState } from "@/shared/types";
import type { SignInInput, SignUpInput, User } from "./validation";

type SignUpFormState = FormState<SignUpInput>;
type SignInFormState = FormState<SignInInput>;

type AuthState = {
  user: User | null;
  signUpFormState: SignUpFormState;
  signInFormState: SignInFormState;
  status: {
    fetchCurrentUser: FetchStatus;
  };
  errors: Partial<Record<keyof AuthState["status"], string>>;
};

export type { SignUpFormState, SignInFormState, AuthState };
