import React, { ForwardedRef, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import clsxm from '../../utils/clsxm';
import { BodyText } from '../typography/Typography';

export type InputProps = {
  label?: string;
  placeholder: string;
  className?: string;
  innerClassName?: string;
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
    {
      label,
      placeholder,
      className,
      innerClassName,
      password,
      color = 'black',
      isValid = true,
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={clsxm('flex w-80 flex-col', className)}>
        {label && <BodyText as="label">{label}</BodyText>}
        <input
          placeholder={placeholder}
          type={password ? 'password' : 'text'}
          className={clsxm(
            'w-full',
            'text-xs sm:text-sm',
            'flex-1 bg-transparent focus-within:outline-none',
            'border-b-[1px] pb-2',
            !isValid && 'border-b-red-400 text-red-400 placeholder:text-red-400',
            '',
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
