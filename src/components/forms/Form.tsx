import React, { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
type FormProps = {
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
} & UseFormReturn;

const Form = ({ children, className, onSubmit, ...rest }: FormProps) => {
  return (
    <FormProvider {...rest}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
