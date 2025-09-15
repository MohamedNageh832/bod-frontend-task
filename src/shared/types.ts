type FetchStatus = "idle" | "loading" | "success" | "error";

type FormErrors<T> = Partial<
  {
    formError: string;
  } & Record<keyof T, string>
>;

type FormState<T> = {
  values: T;
  status: FetchStatus;
  errors: FormErrors<T>;
};

type Override<T, U> = Omit<T, keyof U> & U;

type ServerResponse<T> = {
  status: "success" | "error";
  message: string;
  errors?: Partial<Record<keyof T, string>> & { formError?: string };
  data?: T;
};

type FilterOptions = {
  limit?: number;
  offset?: number;
};

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export type {
  FetchStatus,
  FormErrors,
  FormState,
  Override,
  ServerResponse,
  FilterOptions,
  ValidationErrors,
};
