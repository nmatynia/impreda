import React, { ReactNode } from 'react';

export const ItemContainer = ({ children }: { children: ReactNode }) => {
  return <div className="grid w-full grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">{children}</div>;
};
