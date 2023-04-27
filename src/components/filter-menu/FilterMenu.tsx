import { Transition } from '@headlessui/react';
import React from 'react';
import clsxm from '../../utils/clsxm';
import { Box } from '../box/Box';
import { Button } from '../button/Button';
import { FilterButton } from '../filter-button/FilterButton';
import { BodyText } from '../typography/Typography';
import { Select } from '../select/Select';

type FilterMenuProps = {
  className?: string;
  isOpen: boolean;
};

export const FilterMenu = ({ className, isOpen }: FilterMenuProps) => {
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [gender, setGender] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string | null>(null);
  const [size, setSize] = React.useState<string | null>(null);
  const [fabric, setFabric] = React.useState<string | null>(null);
  return (
    <Transition
      show={isOpen}
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Box className={clsxm('flex w-fit flex-col gap-6 shadow-lg', className)}>
        <div className="flex gap-6">
          <Select
            onChange={setSortBy}
            value={sortBy}
            label="Sort by"
            name="sortBy"
            placeholder="Select"
            options={[
              {
                key: '1',
                name: 'Price: Low to High'
              },
              {
                key: '2',
                name: 'Price: High to Low'
              },
              {
                key: '3',
                name: 'Newest'
              },
              {
                key: '4',
                name: 'Oldest'
              }
            ]}
          />
          <Select
            onChange={setGender}
            value={gender}
            label="Gender"
            name="gender"
            placeholder="Select"
            options={[
              {
                key: '1',
                name: 'Men'
              },
              {
                key: '2',
                name: 'Women'
              },
              {
                key: '3',
                name: 'Unisex'
              }
            ]}
          />
        </div>

        <div className="flex gap-6">
          <FilterButton filterName="Color" />
          <FilterButton filterName="Size" />
        </div>

        <div className="flex gap-6">
          <FilterButton filterName="Gender" />
          <FilterButton filterName="Season" />
        </div>
        <Button variant="primary" className="mt-4 w-full">
          <BodyText>Reset filters</BodyText>
        </Button>
      </Box>
    </Transition>
  );
};
