import React from 'react';
import type { TextAreaProps } from '../text-area/TextArea';
import { TextArea } from '../text-area/TextArea';
import { Field } from './Field';

export const TextAreaField = ({ name, ...props }: TextAreaProps & { name: string }) => {
  return <Field name={name}>{field => <TextArea {...props} {...field} />}</Field>;
};
