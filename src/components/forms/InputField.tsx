import React from 'react';
import type { InputProps } from '../input/Input';
import { Input } from '../input/Input';
import { Field } from './Field';

export const InputField = ({ name, ...props }: InputProps & { name: string }) => {
  return <Field name={name}>{field => <Input {...props} {...field} />}</Field>;
};
