import React, { useState } from 'react';
import RoundedBox from '../box/RoundedBox';
import FilterMenu from '../filter-menu/FilterMenu';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';
type FilterSectionProps = {
  sectionName: string;
};
const FilterPanel = ({ sectionName = 'Filters' }: FilterSectionProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <RoundedBox className="mt-16 flex w-full items-center justify-between">
      <LargeBodyText>{sectionName}</LargeBodyText>
      <div className="relative cursor-pointer">
        <button onClick={handleOpenMenu}>
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </button>
        {<FilterMenu className="absolute top-9 right-1/2" isOpen={openMenu} />}
      </div>
    </RoundedBox>
  );
};

export default FilterPanel;
