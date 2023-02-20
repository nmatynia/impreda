import React, { ReactNode } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useController
} from 'react-hook-form';

type FieldProps = {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => ReactNode;
  name: string;
};

//TODO - add error message
const Field = ({ name, children }: FieldProps) => {
  const { field, fieldState } = useController({ name });
  return <>{children(field, fieldState)}</>;
};

export default Field;
