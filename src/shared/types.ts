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

type MultiStepFormState<T> = {
  values: T;
  status: FetchStatus;
  errors: FormErrors<T>;
  currentStep: number;
};

export type { FetchStatus, FormErrors, FormState, MultiStepFormState };
