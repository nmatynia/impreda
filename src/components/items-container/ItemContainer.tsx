import type { ReactNode } from 'react';
import React from 'react';
import clsxm from '../../utils/clsxm';

export const ItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={clsxm(
        'grid w-full grid-cols-2 md:grid-cols-3 2xl:grid-cols-4',
        'gap-x-[1px] border-r-[2px]'
      )}
    >
      {children}
    </div>
  );
};
