import type { ServerResponse } from "../types";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestConfig = {
  url: string;
  method: Method;
  body?: string;
  withCredentials?: boolean;
};

const sendApiRequest = async <T>(config: ApiRequestConfig) => {
  const { url, withCredentials, ...otherOptions } = config;
  const headers = { "Content-Type": "application/json" };
  const credentials: RequestCredentials = withCredentials ? "include" : "omit";

  const res = await fetch(url, { ...otherOptions, headers, credentials });
  return (await res.json()) as ServerResponse<T>;
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
