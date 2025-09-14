import { tokenService } from "@/features/auth";
import type { Override, ServerResponse } from "../types";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ApiRequestConfig = Override<
  RequestInit,
  {
    url: string;
    method: Method;
    body?: unknown;
    withCredentials?: boolean;
  }
>;

const sendApiRequest = async <T>(
  config: ApiRequestConfig
): Promise<ServerResponse<T>> => {
  const { url, withCredentials, ...otherOptions } = config;
  otherOptions.headers = {
    ...(config.headers || {}),
    "Content-Type": "application/json",
  };

  const credentials: RequestCredentials = withCredentials ? "include" : "omit";
  const body =
    typeof config.body === "string" ? config.body : JSON.stringify(config.body);

  try {
    const res = await fetch(url, {
      ...otherOptions,
      credentials,
      body,
    });
    const data = await res.json();

    if (!res.ok) {
      throw Error(data.message || "Invalid response");
    }

    return {
      status: "success",
      message: "Data retrieved successfully",
      data,
    };
  } catch (err) {
    if (err instanceof TypeError) {
      return {
        status: "error",
        message: err.message,
      };
    }

    return {
      status: "error",
      message: `${err}`,
    };
  }
};

const apiGet = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ ...config, url, method: "GET" });

const apiPost = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ ...config, url, method: "POST" });

const apiPut = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ ...config, url, method: "PUT" });

const apiPatch = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ ...config, url, method: "PATCH" });

const apiDelete = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ ...config, url, method: "DELETE" });

const sendSecureApiRequest = async <T>(config: ApiRequestConfig) => {
  const accessToken = tokenService.getAccessToken();
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await sendApiRequest<T>(config);

  if (res.status === "error" && res.message === "unauthorized") {
    const refreshToken = tokenService.getRefreshToken();
    config.body = { ...(config.body || {}), refreshToken };
    const res = await sendApiRequest<RefreshTokenResponse>(config);

    if (res.status === "error" || !res.data) return res;

    tokenService.setAccessToken(res.data.accessToken);
    tokenService.setRefreshToken(res.data.refreshToken);

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${res.data.accessToken}`,
    };
    return sendApiRequest<T>(config);
  } else return res;
};

const apiSecureGet = async <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendSecureApiRequest<T>({ ...config, method: "GET", url });

const apiSecurePost = async <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendSecureApiRequest<T>({ ...config, method: "POST", url });

const apiSecurePut = async <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendSecureApiRequest<T>({ ...config, method: "PUT", url });

const apiSecurePatch = async <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendSecureApiRequest<T>({ ...config, method: "PATCH", url });

const apiSecureDelete = async <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendSecureApiRequest<T>({ ...config, method: "DELETE", url });

export {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  apiSecureGet,
  apiSecurePost,
  apiSecurePut,
  apiSecurePatch,
  apiSecureDelete,
};
