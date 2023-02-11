import React, { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={clsxm(
        'flex w-full flex-col items-center justify-center overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
