import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsxm from '../../utils/clsxm';
import { Button } from '../button/Button';
import { SmallBodyText } from '../typography/Typography';
import { OptionType, SelectFreeForm, isOptionArray } from '../select-free-from/SelectFreeForm';
import { colorOptions, sexOptions, sortByOptions } from '../../utils/constants';

type FilterMenuProps = {
  className?: string;
};

export const FilterMenu = ({ className }: FilterMenuProps) => {
  const router = useRouter();
  const {
    sortBy: defaultSortByValue,
    gender: defaultGenderValue,
    color: defaultColorValue
  } = router.query;
  console.log(defaultGenderValue);

  const isOpen = true;

  useEffect(() => {
    // TODO handle if somebody is so smart to provide array there
    console.log('TEST!!!!');
    if (defaultGenderValue)
      setGender(
        (defaultGenderValue as string | undefined)
          ?.split(',')
          .map(key => sexOptions.find(option => option.key === key) as OptionType)
      );
  }, [defaultGenderValue]);

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
    router.push(`/shop`);
  };
  useEffect(() => {
    // TODO enhance this stuff with additional undefined checks
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

    const query = `${sortByQuery || ''}${genderQuery || ''}${colorQuery || ''}${sizeQuery || ''}${
      fabricQuery || ''
    }`;
    router.push(`/shop?${query}`);
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
        <div className="flex gap-6">
          <SelectFreeForm
            onChange={handleSortByFilter}
            value={sortBy}
            label="Sort by"
            name="sortBy"
            options={sortByOptions}
          />
        </div>

        <div className="flex gap-6">
          <SelectFreeForm
            onChange={handleColorFilter}
            value={color}
            label="Color"
            name="color"
            options={colorOptions}
          />
        </div>

        <div className="flex gap-6">
          <SelectFreeForm
            multiple
            onChange={handleGenderFilter}
            value={gender}
            label="Gender"
            name="gender"
            options={sexOptions}
          />
        </div>
        <Button variant="primary" className="mt-4 bg-red-500" onClick={handleResetFilters}>
          <SmallBodyText>Reset filters</SmallBodyText>
        </Button>
      </div>
    </Transition>
  );
};
