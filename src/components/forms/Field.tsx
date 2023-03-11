import React, { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useController,
  UseFormStateReturn
} from 'react-hook-form';

type FieldProps = {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
    formState?: UseFormStateReturn<FieldValues>
  ) => ReactNode;
  name: string;
};

//TODO - add error message
export const Field = ({ name, children }: FieldProps) => {
  const { field, fieldState, formState } = useController({ name });
  return <>{children(field, fieldState, formState)}</>;
};
