import React, { Fragment, ReactNode } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { BodyText } from '../typography/Typography';
import clsxm from '../../utils/clsxm';

type FieldProps = {
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
    formState?: UseFormStateReturn<FieldValues>
  ) => ReactNode;
  name: string;
  className?: string;
};

// TODO - add error message
export const Field = ({ name, className, children }: FieldProps) => {
  const { field, fieldState, formState } = useController({ name });
  console.log(field.name, ' ', fieldState.error);
  return (
    <div className={clsxm('flex flex-col gap-1', className)}>
      {children(field, fieldState, formState)}
      <BodyText className="text-red-500">{fieldState.error?.message}</BodyText>
    </div>
  );
};
