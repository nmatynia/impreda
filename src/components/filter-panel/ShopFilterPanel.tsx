import React from 'react';
import clsxm from '../../utils/clsxm';
import { Box } from '../box/Box';
import { ShopFilterMenu } from '../filter-menu/ShopFilterMenu';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';

type FilterSectionProps = {
  sectionName: string;
  className?: string;
};
export const ShopFilterPanel = ({ sectionName = 'Filters', className }: FilterSectionProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex h-fit w-full flex-col">
      <Box
        className={clsxm(
          'flex w-full items-center justify-between overflow-visible border-t-0',
          className
        )}
      >
        <LargeBodyText>{sectionName}</LargeBodyText>
        <button className="relative cursor-pointer" onClick={handleToggleMenu} type="button">
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </button>
      </Box>
      <ShopFilterMenu isOpen={isMenuOpen} />
    </div>
  );
};
