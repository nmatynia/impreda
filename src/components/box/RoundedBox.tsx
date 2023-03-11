import React, { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';
import { Box } from './Box';

export const RoundedBox = ({
  children,
  className
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <Box className={clsxm('rounded-xl', className)}>{children}</Box>;
};
