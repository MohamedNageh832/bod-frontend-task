import type { FC, ReactNode } from "react";

type FormErrorProps = {
  children: ReactNode;
};

export const FormError: FC<FormErrorProps> = (props) => {
  const { children } = props || {};

  return (
    <p className="p-3 rounded-lg text-sm text-center bg-destructive text-secondary">
      {children}
    </p>
  );
};
