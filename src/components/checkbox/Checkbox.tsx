import type { ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { Typography } from '../typography/Typography';

type CheckboxProps = {
  className?: string;
  label: ReactNode;
};
export const Checkbox = ({ className, label }: CheckboxProps) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        value=""
        className={clsxm(
          'h-4 w-4 flex-shrink-0 rounded',
          'border-neutral-500 bg-primaryWhite accent-neutral-800 ring-1 ring-inset  ring-primaryWhite',
          'mr-2',
          className
        )}
      />
      <Typography as="label" className="ml-2 text-sm font-medium text-primaryWhite">
        {label}
      </Typography>
    </div>
  );
};
