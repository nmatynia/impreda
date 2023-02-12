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
        'mx-auto flex w-fit flex-col items-center justify-center overflow-hidden',
        'py-16 px-4',
        className
      )}
    >
      {children}
    </div>
  );
};