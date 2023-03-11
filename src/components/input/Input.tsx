import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import clsxm from '../../utils/clsxm';

export type InputProps = {
  placeholder: string;
  className?: string;
  password?: boolean;
  color?: InputColorVariant;
  isValid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

type InputColorVariant = 'black' | 'white';

//TODO - input color variants based on field state (isDirty etc.)
const colorVariant = {
  white: 'text-primaryWhite border-primaryWhite placeholder:text-gray-400',
  black:
    'text-primaryBlack placeholder:text-gray-400 focus-within:border-primaryBlack border-gray-400'
};

export const Input = React.forwardRef(
  (
    { placeholder, className, password, color = 'black', isValid = true, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        placeholder={placeholder}
        type={password ? 'password' : 'text'}
        className={clsxm(
          'text-xs sm:text-sm',
          'flex-1 bg-transparent focus-within:outline-none',
          'border-b-[1px] pb-2',
          !isValid && 'border-b-red-400 text-red-400 placeholder:text-red-400',
          '',
          colorVariant[color],
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);
