import React from 'react';
import clsxm from '../../utils/clsxm';
import { isDark } from '../../utils/helpers/isDark';

type ColorIndicatorProps = {
  className?: string;
  hex: string;
  available: number;
  name: string;
};

export const ColorIndicator = ({ hex, available, name, className }: ColorIndicatorProps) => {
  const outOfStock = available === 0;
  return (
    <button
      type="button"
      disabled={outOfStock}
      className={clsxm(
        'relative flex aspect-square w-5 items-center justify-center rounded-sm border-[1px] border-primaryBlack',
        'cursor-pointer',
        outOfStock && 'hover: cursor-not-allowed',
        className
      )}
      style={{ backgroundColor: hex }}
      title={name}
    >
      {outOfStock && (
        <div
          className={clsxm(
            'absolute w-[141.42%] rotate-45 border-t-[1px]',
            isDark(hex) ? 'border-primaryWhite' : 'border-primaryBlack'
          )}
        />
      )}
    </button>
  );
};
