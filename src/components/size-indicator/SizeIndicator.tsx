import React from 'react';
import clsxm from '../../utils/clsxm';
import type { TypographyVariant } from '../typography/Typography';
import { variantToClasses as typographyVariants } from '../typography/Typography';

type SizeIndicatorProps = {
  name: string;
  variant?: 'primary' | 'outlined';
  textVariant?: TypographyVariant;
  available: number;
  selected?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const sizeIndicatorVariants = {
  primary: {
    default: 'bg-primaryBlack text-primaryWhite',
    outOufStock: 'border-primaryWhite border-t-[1.5px]'
  },
  outlined: {
    default:
      'border-[1px] border-primaryBlack text-primaryBlack enabled:hover:bg-primaryBlack enabled:hover:text-primaryWhite',
    outOufStock: 'border-primaryBlack'
  }
};

export const SizeIndicator = ({
  name,
  variant = 'primary',
  available,
  className,
  textVariant = 'body',
  selected,
  ...props
}: SizeIndicatorProps) => {
  const outOfStock = available === 0;
  return (
    <button
      type="button"
      disabled={outOfStock}
      className={clsxm(
        'relative flex aspect-square w-7 items-center justify-center  rounded-md p-1',
        'cursor-pointer overflow-hidden',
        outOfStock && 'hover: cursor-not-allowed',
        typographyVariants[textVariant],
        sizeIndicatorVariants[variant].default,
        selected &&
          !outOfStock &&
          sizeIndicatorVariants[variant === 'primary' ? 'outlined' : 'primary'].default,
        className
      )}
      {...props}
    >
      {outOfStock && (
        <div
          className={clsxm(
            'absolute w-[141.42%] rotate-45 border-t-[1px]',
            sizeIndicatorVariants[variant].outOufStock
          )}
        />
      )}
      {name}
    </button>
  );
};
