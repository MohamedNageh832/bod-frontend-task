import { ZodError, type output, type ZodType } from "zod";

type ValidationResult<S extends ZodType> = {
  isValid: boolean;
  cleanBody?: output<S>;
  errors?: Partial<Record<keyof S, string>>;
};

export const validate = <S extends ZodType>(schema: S, data: unknown) => {
  const result: ValidationResult<S> = { isValid: false };

  try {
    const cleanBody = schema.parse(data);

    result.isValid = true;
    result.cleanBody = cleanBody;
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.issues.reduce((prev, curr) => {
        const key = curr.path[0] as keyof S;
        prev[key] = curr.message;

        return prev;
      }, {} as Partial<Record<keyof S, string>>);

      result.isValid = false;
      result.errors = errors;
    }
  }

  return result;
};
