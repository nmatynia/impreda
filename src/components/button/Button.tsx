import type { ButtonHTMLAttributes, ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { Loader } from '../loader/Loader';

type ButtonVariant = 'primary' | 'outlined';
type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonVariant = {
  primary: 'bg-primaryBlack text-primaryWhite border-[1px] border-primaryBlack',
  outlined:
    'border-[1px] border-primaryBlack text-primaryBlack hover:bg-primaryBlack hover:text-primaryWhite [&:hover>*]:text-primaryWhite'
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
      type="button"
      className={clsxm(
        'relative w-fit rounded-md px-8 py-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        buttonVariant[variant],
        isLoading && 'cursor-progress',
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <Loader className={clsxm('top-[6px] h-[14px] w-[14px]', loaderVariant[variant])} />
          <div className={clsxm('flex gap-2', isLoading ? 'opacity-0' : '')}>{children}</div>
        </>
      ) : (
        children
      )}
    </button>
  );
};
