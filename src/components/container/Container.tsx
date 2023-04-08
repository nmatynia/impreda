import type { ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  fullSize?: boolean;
};

export const Container = ({ children, className, fullSize }: ContainerProps) => {
  return (
    <div
      className={clsxm(
        'mx-auto flex w-fit flex-col items-center justify-center overflow-hidden',
        'py-16 px-4',
        fullSize && 'h-full w-full justify-start py-0 px-0',
        className
      )}
    >
      {children}
    </div>
  );
};
