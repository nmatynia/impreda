import { Transition } from '@headlessui/react';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import clsxm from '../../utils/clsxm';
import { Button } from '../button/Button';
import { SmallBodyText } from '../typography/Typography';
import { OptionType, SelectFreeForm, isOptionArray } from '../select-free-from/SelectFreeForm';
import {
  COLOR_OPTIONS,
  FABRIC_OPTIONS,
  SEX_OPTIONS,
  SIZE_OPTIONS,
  SORT_OPTIONS
} from '../../utils/constants';
import { trpc } from '../../utils/trpc';

type ShopFilterMenuProps = {
  className?: string;
  isOpen: boolean;
};

export const ShopFilterMenu = ({ className, isOpen }: ShopFilterMenuProps) => {
  const router = useRouter();
  const {
    sortBy: defaultSortByValue,
    gender: defaultGenderValue,
    color: defaultColorValue,
    size: defaultSizeValue,
    fabric: defaultFabricValue,
    category: defaultCategoryValue
  } = router.query;

  const { data: categories, isFetched: isCategoriesFetched } =
    trpc.categories.getAllCategories.useQuery();
  const categoryOptions: OptionType[] = useMemo(
    () =>
      categories?.map(category => ({
        name: category.name,
        key: category.name.toLowerCase()
      })) ?? [],
    [categories]
  );

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
  const [category, setCategory] = React.useState<OptionType | OptionType[] | undefined>(undefined);
  const handleCategoryFilter = (value: OptionType | OptionType[]) => {
    setCategory(value);
  };

  const handleResetFilters = () => {
    setSortBy(undefined);
    setGender(undefined);
    setColor(undefined);
    setSize(undefined);
    setCategory(undefined);
    setFabric(undefined);
  };

  useEffect(() => {
    if (!router.isReady || !isCategoriesFetched) return;

    const buildDefaultSelectedOptions = (
      defaultValue: string | string[] | undefined,
      options: OptionType[]
    ) => {
      if (!defaultValue || Array.isArray(defaultValue)) {
        return undefined;
      }
      return defaultValue
        ?.split(',')
        .map(value => options.find(option => option.key === value) as OptionType)
        .filter(value => value !== undefined);
    };
    setGender(buildDefaultSelectedOptions(defaultGenderValue, SEX_OPTIONS));
    setColor(buildDefaultSelectedOptions(defaultColorValue, COLOR_OPTIONS));
    setSortBy(buildDefaultSelectedOptions(defaultSortByValue, SORT_OPTIONS));
    setSize(buildDefaultSelectedOptions(defaultSizeValue, SIZE_OPTIONS));
    setFabric(buildDefaultSelectedOptions(defaultFabricValue, FABRIC_OPTIONS));
    setCategory(buildDefaultSelectedOptions(defaultCategoryValue, categoryOptions));
  }, [
    router.isReady,
    isCategoriesFetched,
    categoryOptions,
    defaultColorValue,
    defaultFabricValue,
    defaultGenderValue,
    defaultSizeValue,
    defaultCategoryValue,
    defaultSortByValue
  ]);

  useEffect(() => {
    if (!router.isReady || !isCategoriesFetched) return;
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
      buildQuery('category', category) +
      buildQuery('fabric', fabric);

    if (query) {
      router.push(`/shop?${query}`);
    } else {
      router.push(`/shop`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, gender, color, size, fabric, category]);

  return (
    <Transition
      show={isOpen}
      className="overflow-hidden"
      leave="transition-all duration-1000"
      leaveFrom="opacity-100 max-h-[1000px]"
      leaveTo="opacity-0 max-h-0"
      enter="transition-all duration-1000"
      enterFrom="opacity-0 max-h-0"
      enterTo="opacity-100 max-h-[1000px]"
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
          options={SORT_OPTIONS}
        />

        <SelectFreeForm
          onChange={handleColorFilter}
          value={color}
          label="Color"
          name="color"
          multiple
          options={COLOR_OPTIONS}
        />
        <SelectFreeForm
          onChange={handleSizeFilter}
          value={size}
          label="Size"
          name="size"
          multiple
          options={SIZE_OPTIONS}
        />

        <SelectFreeForm
          multiple
          onChange={handleGenderFilter}
          value={gender}
          label="Gender"
          name="gender"
          options={SEX_OPTIONS}
        />
        <SelectFreeForm
          multiple
          onChange={handleCategoryFilter}
          value={category}
          label="Category"
          name="category"
          options={categoryOptions}
        />
        <SelectFreeForm
          onChange={handleFabricFilter}
          value={fabric}
          label="Fabric"
          name="fabric"
          multiple
          options={FABRIC_OPTIONS}
        />
        <Button
          variant="primary"
          className="mt-4 border-none bg-red-500 hover:bg-red-600"
          onClick={handleResetFilters}
        >
          <SmallBodyText>Reset filters</SmallBodyText>
        </Button>
      </div>
    </Transition>
  );
};
