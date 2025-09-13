import { createSlice } from "@reduxjs/toolkit";
import type { AuthState, SignInFormState, SignUpFormState } from "./types";
import { addFetchCurrentUserCases, addSignInCases } from "./thunks";
import type { RootState } from "@/store";
import * as reducers from "./reducers";

const initialSignUpFormState: SignUpFormState = {
  values: {
    firstName: "",
    lastName: "",
    gender: "male",
    password: "",
    repeatPassword: "",
    username: "",
    email: "",
    image: "",
  },
  status: "idle",
  errors: {},
};

const initialSignInFormState: SignInFormState = {
  values: {
    username: "",
    password: "",
  },
  status: "idle",
  errors: {},
};

const initialState: AuthState = {
  user: null,
  signUpFormState: initialSignUpFormState,
  signInFormState: initialSignInFormState,
  status: {
    fetchCurrentUser: "idle",
  },
  errors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers: (builder) => {
    addSignInCases(builder);
    addFetchCurrentUserCases(builder);
  },
});

const authReducer = authSlice.reducer;
export const { updateSignInValue, signOut } = authSlice.actions;

const selectSignUpFormState = (state: RootState) => state.auth.signUpFormState;
const selectSignInFormState = (state: RootState) => state.auth.signInFormState;
const selectUser = (state: RootState) => state.auth.user;
const selectStatus = (state: RootState) => state.auth.status;

export {
  authReducer,
  selectSignUpFormState,
  selectSignInFormState,
  selectUser,
  selectStatus,
};
