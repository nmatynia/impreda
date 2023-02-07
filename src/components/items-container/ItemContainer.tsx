import React, { ReactNode } from 'react';

export const ItemContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-8">{children}</div>;
};
