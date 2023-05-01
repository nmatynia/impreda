import type { ReactNode } from 'react';
import React from 'react';
import { Transition } from '@headlessui/react';
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
    <Transition
      show={isOpen}
      className="z-20"
      leave="transition-all duration-200"
      leaveFrom="opactiy-100"
      leaveTo="opacity-0"
      enter="transition-all duration-200"
      enterFrom="opacity-0"
      enterTo="opactiy-100"
    >
      <div
        className={clsxm(
          'z-20 w-max overflow-hidden border-[1px] border-primaryBlack bg-primaryWhite p-8',
          className,
          positionVariant[position]
        )}
      >
        {children}
      </div>
    </Transition>
  );
};
