import React from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, SmallBodyText } from '../typography/Typography';

type FilterButtonProps = {
  filterName: string;
  className?: string;
};
const FilterButton = ({ filterName, className }: FilterButtonProps) => {
  return (
    <div
      className={clsxm(
        'flex w-28 cursor-pointer justify-between p-3 sm:w-36',
        'border-[1px] border-primaryBlack bg-primaryWhite',
        className
      )}
    >
      <SmallBodyText>{filterName}</SmallBodyText>
      <SvgIcon name="ChevronDown" className="h-4 w-4" />
    </div>
  );
};

export default FilterButton;
