import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsxm from '../../utils/clsxm';
import { Button } from '../button/Button';
import { SmallBodyText } from '../typography/Typography';
import { OptionType, SelectFreeForm, isOptionArray } from '../select-free-from/SelectFreeForm';
import {
  colorOptions,
  fabricOptions,
  sexOptions,
  sizeOptions,
  sortByOptions
} from '../../utils/constants';

type FilterMenuProps = {
  className?: string;
};

export const FilterMenu = ({ className }: FilterMenuProps) => {
  // TODO Handle incorrect keys
  // TODO Add category filter
  const router = useRouter();
  const {
    sortBy: defaultSortByValue,
    gender: defaultGenderValue,
    color: defaultColorValue,
    size: defaultSizeValue,
    fabric: defaultFabricValue,
    category: defaultCategoryValue
  } = router.query;

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

  const handleResetFilters = () => {
    setSortBy(undefined);
    setGender(undefined);
    setColor(undefined);
    setSize(undefined);
    setFabric(undefined);
  };

  useEffect(() => {
    if (!router.isReady) return;

    const buildDefaultSelectedOptions = (
      defaultValue: string | string[] | undefined,
      options: OptionType[]
    ) => {
      if (!defaultValue || Array.isArray(defaultValue)) {
        return undefined;
      }
      return defaultValue
        ?.split(',')
        .map(value => options.find(option => option.key === value) as OptionType);
    };
    setGender(buildDefaultSelectedOptions(defaultGenderValue, sexOptions));
    setColor(buildDefaultSelectedOptions(defaultColorValue, colorOptions));
    setSortBy(buildDefaultSelectedOptions(defaultSortByValue, sortByOptions));
    setSize(buildDefaultSelectedOptions(defaultSizeValue, sizeOptions));
    setFabric(buildDefaultSelectedOptions(defaultFabricValue, fabricOptions));
  }, [
    router.isReady,
    defaultColorValue,
    defaultFabricValue,
    defaultGenderValue,
    defaultSizeValue,
    defaultSortByValue
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    const buildQuery = (key: string, value: OptionType | OptionType[] | undefined) => {
      if (!value) {
        return '';
      }
      if (isOptionArray(value)) {
        return `${key}=${value.map(item => item.key).join(',')}&`;
      }
      return `${key}=${value.key}&`;
    };

    const query =
      buildQuery('sortBy', sortBy) +
      buildQuery('gender', gender) +
      buildQuery('color', color) +
      buildQuery('size', size) +
      buildQuery('fabric', fabric);

    if (query) {
      router.push(`/shop?${query}`);
    } else {
      router.push(`/shop`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, gender, color, size, fabric]);

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
        <SelectFreeForm
          onChange={handleSortByFilter}
          value={sortBy}
          label="Sort by"
          name="sortBy"
          options={sortByOptions}
        />

        <SelectFreeForm
          onChange={handleColorFilter}
          value={color}
          label="Color"
          name="color"
          multiple
          options={colorOptions}
        />
        <SelectFreeForm
          onChange={handleSizeFilter}
          value={size}
          label="Size"
          name="size"
          multiple
          options={sizeOptions}
        />

        <SelectFreeForm
          multiple
          onChange={handleGenderFilter}
          value={gender}
          label="Gender"
          name="gender"
          options={sexOptions}
        />
        <SelectFreeForm
          onChange={handleFabricFilter}
          value={fabric}
          label="Fabric"
          name="fabric"
          multiple
          options={fabricOptions}
        />
        <Button variant="primary" className="mt-4 bg-red-500" onClick={handleResetFilters}>
          <SmallBodyText>Reset filters</SmallBodyText>
        </Button>
      </div>
    </Transition>
  );
};
