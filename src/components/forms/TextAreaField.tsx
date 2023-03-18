import React from 'react';
import { TextArea, TextAreaProps } from '../text-area/TextArea';
import { Field } from './Field';

export const TextAreaField = ({ name, ...props }: TextAreaProps & { name: string }) => {
  return <Field name={name}>{(field, fieldState) => <TextArea {...props} {...field} />}</Field>;
};
