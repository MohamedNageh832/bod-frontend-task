import {
  validateSignInInput,
  validateSignInResponse,
  type SignInInput,
} from "../../validation";
import * as api from "../../api";
import type { ServerResponse } from "@/shared/types";
import { tokenService } from "..";

export const signIn = async (credentials: SignInInput) => {
  const validation = validateSignInInput(credentials);

  if (!validation.isValid || !validation.cleanBody) {
    return {
      status: "error",
      errors: validation.errors,
    } as ServerResponse<SignInInput>;
  }

  const res = await api.signIn(validation.cleanBody);
  const responesValidation = validateSignInResponse(res.data);

  if (!responesValidation.isValid || !responesValidation.cleanBody) {
    const errorMsg = res.message || "An error ocurred. Try again later";

    return {
      status: "error",
      data: undefined,
      message: errorMsg,
      errors: { formError: errorMsg },
    };
  } else {
    const { accessToken, refreshToken, ...user } = responesValidation.cleanBody;

    tokenService.setAccessToken(accessToken);
    tokenService.setRefreshToken(refreshToken);

    return {
      status: "success",
      message: res.message,
      data: user,
    };
  }
};
