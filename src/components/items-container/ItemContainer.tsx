import React, { ReactNode } from 'react';

export const ItemContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-wrap items-center justify-center gap-8">{children}</div>;
};
