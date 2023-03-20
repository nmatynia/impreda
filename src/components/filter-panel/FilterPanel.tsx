import React from 'react';
import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';
import { ButtonSwitch } from '../button-switch/ButtonSwitch';
import { FilterMenu } from '../filter-menu/FilterMenu';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';
type FilterSectionProps = {
  sectionName: string;
  className?: string;
};
export const FilterPanel = ({ sectionName = 'Filters', className }: FilterSectionProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'mt-16 flex w-full items-center justify-between overflow-visible',
        className
      )}
    >
      <LargeBodyText>{sectionName}</LargeBodyText>
      <div className="relative cursor-pointer">
        <ButtonSwitch
          elementToOpen={open => <FilterMenu className="absolute top-9 right-1/2" isOpen={open} />}
        >
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </ButtonSwitch>
      </div>
    </RoundedBox>
  );
};
