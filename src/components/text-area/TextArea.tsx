import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import clsxm from '../../utils/clsxm';
import { BodyText } from '../typography/Typography';

export type TextAreaProps = {
  label?: string;
  placeholder: string;
  className?: string;
  innerClassName?: string;
  password?: boolean;
  color?: InputColorVariant;
  isValid?: boolean;
} & InputHTMLAttributes<HTMLTextAreaElement>;

type InputColorVariant = 'black' | 'white';

const colorVariant = {
  white: 'text-primaryWhite border-primaryWhite placeholder:text-gray-400',
  black:
    'text-primaryBlack placeholder:text-gray-400 focus-within:border-primaryBlack border-gray-400'
};

export const TextArea = React.forwardRef(
  (
    {
      label,
      placeholder,
      className,
      innerClassName,
      password,
      color = 'black',
      isValid = true,
      type,
      ...rest
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={clsxm('relative flex w-80 flex-col gap-1  ', className)}>
        {label && <BodyText as="label">{label}</BodyText>}
        <textarea
          placeholder={placeholder}
          maxLength={250}
          rows={3}
          className={clsxm(
            'w-full resize-none',
            'text-xs sm:text-sm',
            'flex-1 bg-transparent focus-within:outline-none',
            'border-[1px] p-2',
            !isValid && 'border-b-red-400 text-red-400 placeholder:text-red-400',
            colorVariant[color],
            innerClassName
          )}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
