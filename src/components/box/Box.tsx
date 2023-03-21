import type { ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';

type PositionVariant = 'left' | 'center' | 'right';

const positionVariant = {
  right: 'left-0',
  center: 'left-1/2 transform -translate-x-1/2',
  left: 'right-0'
};
export type BoxProps = {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  position?: PositionVariant; // If needed add more options
};
export const Box = ({ className, children, isOpen = true, position = 'left' }: BoxProps) => {
  return (
    <div
      className={clsxm(
        'z-20 w-max overflow-hidden border-[1px] border-primaryBlack bg-primaryWhite p-8',
        className,
        isOpen || 'hidden',
        positionVariant[position]
      )}
    >
      {children}
    </div>
  );
};
