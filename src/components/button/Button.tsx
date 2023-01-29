import React, { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';
type ButtonProps = {
  children: ReactNode;
  variant: ButtonVariant;
  className?: string;
};
type ButtonVariant = 'primary' | 'outlined';

const buttonVariant = {
  primary: 'bg-primaryBlack text-primaryWhite',
  outlined: 'border-[1px] border-primaryBlack text-primaryBlack'
};

const Button = ({ children, variant = 'primary', className }: ButtonProps) => {
  return (
    <button className={clsxm('rounded-md px-8 py-2', buttonVariant[variant], className)}>
      {children}
    </button>
  );
};

export default Button;
