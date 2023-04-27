import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsxm from '../../utils/clsxm';
import { Box } from '../box/Box';
import { Button } from '../button/Button';
import { FilterButton } from '../filter-button/FilterButton';
import { BodyText } from '../typography/Typography';
import { Select } from '../select/Select';
import { OptionType, SelectFreeForm, isOptionArray } from '../select-free-from/SelectFreeForm';

type FilterMenuProps = {
  className?: string;
};

export const FilterMenu = ({ className }: FilterMenuProps) => {
  const router = useRouter();
  const isOpen = true;
  const [sortBy, setSortBy] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleSortByFilter = (value: OptionType | OptionType[]) => {
    setSortBy(value);
  };
  const [gender, setGender] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleGenderFilter = (value: OptionType | OptionType[]) => {
    setGender(value);
  };
  const [color, setColor] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleColorFilter = (value: OptionType | OptionType[]) => {
    setColor(value);
  };

  const [size, setSize] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleSizeFilter = (value: OptionType | OptionType[]) => {
    setSize(value);
  };
  const [fabric, setFabric] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleFabricFilter = (value: OptionType | OptionType[]) => {
    setFabric(value);
  };

  useEffect(() => {
    if (!sortBy && !gender && !color && !size && !fabric) {
      return;
    }
    const sortByQuery = isOptionArray(sortBy)
      ? `sortBy=${sortBy.map(item => item.key).join(',')}&`
      : sortBy?.key && `sortBy=${sortBy.key}&`;

    const genderQuery = isOptionArray(gender)
      ? `gender=${gender.map(item => item.key).join(',')}&`
      : gender?.key && `gender=${gender.key}&`;

    const colorQuery = isOptionArray(color)
      ? `color=${color.map(item => item.key).join(',')}&`
      : color?.key && `color=${color.key}&`;

    const sizeQuery = isOptionArray(size)
      ? `size=${size.map(item => item.key).join(',')}&`
      : size?.key && `size=${size.key}&`;

    const fabricQuery = isOptionArray(fabric)
      ? `fabric=${fabric.map(item => item.key).join(',')}&`
      : fabric?.key && `fabric=${fabric.key}&`;

    const query = `${sortByQuery || ''}${genderQuery || ''}${colorQuery || ''}${
      sizeQuery || ''
    } || ${fabricQuery || ''}`;
    router.push(`/shop?${query}`);
  }, [sortBy, gender, color, size, fabric, router]);
  return (
    <Transition
      show={isOpen}
      leave="transition-all duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsxm(
          'flex w-full flex-col gap-6 border-[1px] border-t-0 border-primaryBlack p-8',
          className
        )}
      >
        <div className="flex gap-6">
          <SelectFreeForm
            multiple
            onChange={handleSortByFilter}
            value={sortBy}
            label="Sort by"
            name="sortBy"
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
          {/* <Select
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
          /> */}
        </div>

        <div className="flex gap-6">
          <SelectFreeForm
            multiple
            onChange={handleGenderFilter}
            value={gender}
            label="Sort by"
            name="sortBy"
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
        </div>

        <div className="flex gap-6">
          <SelectFreeForm
            multiple
            onChange={handleGenderFilter}
            value={gender}
            label="Gender"
            name="gender"
            options={[
              {
                key: 'men',
                name: 'Men'
              },
              {
                key: 'women',
                name: 'Women'
              },
              {
                key: 'unisex',
                name: 'Unisex'
              }
            ]}
          />
        </div>
        <Button variant="primary" className="mt-4">
          <BodyText>Reset filters</BodyText>
        </Button>
      </div>
    </Transition>
  );
};
