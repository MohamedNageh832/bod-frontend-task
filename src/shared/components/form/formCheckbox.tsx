import type { CheckboxProps } from "@radix-ui/react-checkbox";
import type { FC } from "react";
import { Checkbox } from "../ui";

type FormCheckboxProps = CheckboxProps & {
  label?: string;
};

export const FormCheckbox: FC<FormCheckboxProps> = (props) => {
  const { id, label, ...otherProps } = props || {};

  return (
    <section className="flex items-center gap-1">
      <Checkbox id={id} {...otherProps} />
      {label && <label htmlFor={id}>{label}</label>}
    </section>
  );
};
