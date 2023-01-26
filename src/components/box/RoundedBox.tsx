import React, { ReactNode } from 'react';
import clsxm from '../../utils/clsxm';
import { LargeBodyText } from '../typography/Typography';
import Box from './Box';

const RoundedBox = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return <Box className={clsxm('rounded-xl', className)}>{children}</Box>;
};

export default RoundedBox;
