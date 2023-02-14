import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsxm from '../../utils/clsxm';
type ButtonProps = {
  children: ReactNode;
  variant: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonVariant = 'primary' | 'outlined';

const buttonVariant = {
  primary: 'bg-primaryBlack text-primaryWhite',
  outlined: 'border-[1px] border-primaryBlack text-primaryBlack'
};

const Button = ({ children, variant = 'primary', className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsxm('w-fit rounded-md px-8 py-2', buttonVariant[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
