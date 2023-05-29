import React, { ReactNode } from 'react';
import { SmallBodyText } from '../typography/Typography';
import clsxm from '../../utils/clsxm';

type TooltipAlignment = 'left' | 'right' | 'center';
const tooltipAlignment: { [k in TooltipAlignment]: string } = {
  left: 'left-0',
  right: 'right-0',
  center: 'left-1/2 transform -translate-x-1/2'
};

type TooltipProps = {
  children: ReactNode;
  text: string;
  className?: string;
  alignment?: TooltipAlignment;
};

const Tooltip = ({ children, text, className, alignment = 'center' }: TooltipProps) => {
  return (
    <div className="relative w-full text-primaryBlack [&:hover>span]:block">
      {children}
      <span
        className={clsxm(
          'absolute top-[calc(100%+12px)] z-10 hidden w-full  bg-primaryWhite p-1 text-center',
          tooltipAlignment[alignment],
          className
        )}
      >
        <SmallBodyText>{text}</SmallBodyText>
      </span>
    </div>
  );
};

export default Tooltip;
