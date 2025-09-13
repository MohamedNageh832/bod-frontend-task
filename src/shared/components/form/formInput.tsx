import type { ComponentProps, FC } from "react";
import { Input } from "../ui";
import { cn } from "@/shared/utils";

type FormInputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export const FormInput: FC<FormInputProps> = (props) => {
  const { id, label, error, className, ...otherProps } = props || {};

  return (
    <section className="flex flex-col gap-3">
      <section className="flex flex-col gap-2">
        {label && <label htmlFor={id}>{label}</label>}
        <Input
          id={id}
          {...otherProps}
          className={cn(className, error && "border-destructive border-2")}
        />
      </section>

      {error && <p className="text-sm text-destructive font-bold">{error}</p>}
    </section>
  );
};
