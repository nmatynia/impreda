import { Transition } from '@headlessui/react';
import { Filter } from '@trpc/server';
import React from 'react';
import clsxm from '../../utils/clsxm';
import Box from '../box/Box';
import Button from '../button/Button';
import FilterButton from '../filter-button/FilterButton';
import { BodyText } from '../typography/Typography';
type FilterMenuProps = {
  className?: string;
  isOpen: boolean;
};

const FilterMenu = ({ className, isOpen }: FilterMenuProps) => {
  return (
    <Transition
      show={isOpen}
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Box className={clsxm('flex w-fit flex-col gap-6 shadow-lg', className)}>
        <div className="flex gap-6">
          <FilterButton filterName="Sort by" />
          <FilterButton filterName="Brand" />
        </div>

        <div className="flex gap-6">
          <FilterButton filterName="Color" />
          <FilterButton filterName="Size" />
        </div>

        <div className="flex gap-6">
          <FilterButton filterName="Gender" />
          <FilterButton filterName="Season" />
        </div>
        <Button variant="primary" className="mt-4">
          <BodyText>Reset filters</BodyText>
        </Button>
      </Box>
    </Transition>
  );
};

export default FilterMenu;
