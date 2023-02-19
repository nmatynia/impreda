import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import clsxm from '../../utils/clsxm';

type InputProps = {
  placeholder: string;
  className?: string;
  password?: boolean;
  color?: InputColorVariant;
  isValid?: boolean;
  value?: string;
  fieldName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

type InputColorVariant = 'black' | 'white';

const colorVariant = {
  white: 'text-primaryWhite placeholder:text-primaryWhite border-primaryWhite',
  black:
    'text-primaryBlack placeholder:text-gray-400 focus-within:border-primaryBlack border-gray-400'
};

//TODO - add error message
export const Input = ({
  placeholder,
  className,
  password,
  color = 'black',
  isValid = true,
  onChange,
  value,
  fieldName,
  ...rest
}: InputProps) => {
  const { register } = useFormContext();
  return (
    <input
      placeholder={placeholder}
      type={password ? 'password' : 'text'}
      className={clsxm(
        'text-base',
        'flex-1 bg-transparent focus-within:outline-none',
        'border-b-[1px] pb-2',
        !isValid && 'border-b-red-400 text-red-400 placeholder:text-red-400',
        '',
        colorVariant[color],
        className
      )}
      {...(fieldName && register(fieldName))}
      {...rest}
    />
  );
};
