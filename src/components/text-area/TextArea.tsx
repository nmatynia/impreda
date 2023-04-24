import type { ForwardedRef, InputHTMLAttributes } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { BodyText } from '../typography/Typography';

export type TextAreaProps = {
  label?: string;
  placeholder: string;
  className?: string;
  innerClassName?: string;
  password?: boolean;
  color?: InputColorVariant;
  isInvalid?: boolean;
  isLoading?: boolean;
} & InputHTMLAttributes<HTMLTextAreaElement>;

type InputColorVariant = 'black' | 'white';

const colorVariant = {
  white: 'text-primaryWhite border-primaryWhite placeholder:text-gray-400',
  black:
    'text-primaryBlack placeholder:text-gray-400 focus-within:border-primaryBlack border-gray-400'
};

// eslint-disable-next-line react/display-name
export const TextArea = React.forwardRef(
  (
    {
      label,
      placeholder,
      className,
      innerClassName,
      color = 'black',
      isInvalid = false,
      isLoading,
      ...rest
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    if (isLoading) {
      return <div className={clsxm('h-32 w-80 animate-pulse bg-primaryBlack/50', className)} />;
    }
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
            colorVariant[color],
            isInvalid &&
              'border-red-500 placeholder:text-red-500 focus-within:placeholder:text-primaryBlack',
            innerClassName
          )}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
