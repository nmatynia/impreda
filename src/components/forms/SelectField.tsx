import React from 'react';
import type { SelectProps } from '../select/Select';
import { Select } from '../select/Select';
import { Field } from './Field';

export const SelectField = ({
  name,
  ...props
}: Omit<SelectProps, 'defaultValue'> & { name: string }) => {
  return (
    <Field name={name}>
      {(field, fieldState, formState) => (
        <Select {...props} {...field} defaultValue={formState?.defaultValues?.[name]} />
      )}
    </Field>
  );
};
