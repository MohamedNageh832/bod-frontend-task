import type { ServerResponse } from "../types";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestConfig = {
  url: string;
  method: Method;
  body?: string;
  withCredentials?: boolean;
};

const sendApiRequest = async <T>(
  config: ApiRequestConfig
): Promise<ServerResponse<T>> => {
  const { url, withCredentials, ...otherOptions } = config;
  const headers = { "Content-Type": "application/json" };
  const credentials: RequestCredentials = withCredentials ? "include" : "omit";

  try {
    const res = await fetch(url, { ...otherOptions, headers, credentials });
    if (!res.ok)
      return {
        status: "error",
        message: "Invalid response",
      };

    const data = await res.json();

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

export const apiGet = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ url, method: "GET", ...config });

export const apiPost = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ url, method: "POST", ...config });

export const apiPut = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ url, method: "PUT", ...config });

export const apiPatch = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ url, method: "PATCH", ...config });

export const apiDelete = <T>(
  url: string,
  config?: Omit<ApiRequestConfig, "url" | "method">
) => sendApiRequest<T>({ url, method: "DELETE", ...config });
