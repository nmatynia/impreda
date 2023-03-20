import type { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { Loader } from '../loader/Loader';
type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonVariant = 'primary' | 'outlined';

const buttonVariant = {
  primary: 'bg-primaryBlack text-primaryWhite',
  outlined: 'border-[1px] border-primaryBlack text-primaryBlack'
};

const loaderVariant = {
  primary: 'text-primaryWhite',
  outlined: 'text-primaryBlack'
};

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsxm(
        'relative w-fit rounded-md px-8 py-2',
        buttonVariant[variant],
        isLoading && 'cursor-progress',
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <Loader className={clsxm('h-[14px] w-[14px]', loaderVariant[variant])} />}
      <div className={isLoading ? 'opacity-0' : ''}>{children}</div>
    </button>
  );
};
