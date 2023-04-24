import React from 'react';
import type { InputProps } from '../input/Input';
import { Input } from '../input/Input';
import { Field } from './Field';

export const InputField = ({ name, className, ...props }: InputProps & { name: string }) => {
  return (
    <Field name={name} className={className}>
      {(field, fieldState) => <Input isInvalid={!!fieldState.error} {...props} {...field} />}
    </Field>
  );
};
