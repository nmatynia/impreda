import React from 'react';
import clsxm from '../../utils/clsxm';
import { Box } from '../box/Box';
import { ButtonSwitch } from '../button-switch/ButtonSwitch';
import { FilterMenu } from '../filter-menu/FilterMenu';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';
type FilterSectionProps = {
  sectionName: string;
  className?: string;
};
export const ShopFilterPanel = ({ sectionName = 'Filters', className }: FilterSectionProps) => {
  return (
    <Box
      className={clsxm(
        'flex w-full items-center justify-between overflow-visible border-t-0',
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
    </Box>
  );
};
