import React from 'react';
import { Select, SelectProps } from '../select/Select';
import Field from './Field';

const SelectField = ({ name, ...props }: Omit<SelectProps, 'defaultValue'> & { name: string }) => {
  return (
    <Field name={name}>
      {(field, fieldState, formState) => (
        <Select {...props} {...field} defaultValue={formState?.defaultValues?.[name]} />
      )}
    </Field>
  );
};

export default SelectField;
