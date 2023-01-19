import React, { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';

type BoxProps = {
  className?: string;
  children?: ReactNode;
};
const Box = ({ className, children }: BoxProps) => {
  return (
    <div className={clsxm('w-max border-[1px] border-primaryBlack bg-primaryWhite p-8', className)}>
      {children}
    </div>
  );
};

export default Box;
