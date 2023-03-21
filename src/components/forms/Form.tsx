import type { ReactNode } from 'react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

type FormProps<Values extends object> = {
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
} & UseFormReturn<Values>;

export const Form = <Values extends object>({
  children,
  className,
  onSubmit,
  ...rest
}: FormProps<Values>) => {
  return (
    <FormProvider {...rest}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
