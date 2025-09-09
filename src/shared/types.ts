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

type ServerResponse<T> = T;

type FilterOptions = {
  limit?: number;
  page?: number;
};

export type {
  FetchStatus,
  FormErrors,
  FormState,
  Override,
  ServerResponse,
  FilterOptions,
};
