import React from 'react';
import { Input, InputProps } from '../input/Input';
import Field from './Field';

const InputField = ({ name, ...props }: InputProps & { name: string }) => {
  return (
    <Field name={name}>
      {(field, fieldState) => <Input {...props} {...field} />}
    </Field>
  );
};

export default InputField;