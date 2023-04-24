import React from 'react';
import type { SelectProps } from '../select/Select';
import { Select } from '../select/Select';
import { Field } from './Field';

export const SelectField = ({
  name,
  className,
  ...props
}: Omit<SelectProps, 'defaultValue'> & { name: string }) => {
  return (
    <Field name={name} className={className}>
      {(field, fieldState, formState) => (
        <Select
          {...props}
          {...field}
          isInvalid={!!fieldState.error}
          defaultValue={formState?.defaultValues?.[name]}
        />
      )}
    </Field>
  );
};
