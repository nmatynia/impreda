import React from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, SmallBodyText } from '../typography/Typography';
import { Button } from '../button/Button';

export type OptionType<T = object> = { name: string; key: string } & T;
export const isOptionArray = (
  value: OptionType | OptionType[] | undefined
): value is OptionType[] => Array.isArray(value);

export type SelectFreeFormProps = {
  className?: string;
  label: string;
  options: OptionType[];
  multiple?: boolean;
  value: OptionType & OptionType[];
  onChange: (value: OptionType & OptionType[]) => void;
  //   isLoading?: boolean;
} & Partial<ControllerRenderProps<FieldValues, string>>;

/**
 * @param name - The name of the select. Need for react-hook-form.
 * @param label - The label for the select.
 * @param options - The options to display in the select.
 * @param defaultValue - The default value of the select. If multiple is true, this must be an array of values.
 * @param multiple - If true, the user can select multiple options.
 */

// eslint-disable-next-line react/display-name
export const SelectFreeForm = ({
  label,
  options,
  className,
  multiple,
  onChange: handleChange,
  value
}: SelectFreeFormProps) => {
  // if (isLoading) {
  //   return <div className={clsxm('h-[33.p]] animate-pulse bg-primaryBlack/50', className)} />;
  // }
  const handleClickOnOption = (option: OptionType) => {
    if (multiple) {
      if (Array.isArray(value)) {
        const index = value.findIndex(item => item.key === option.key);
        if (index === -1) {
          handleChange([...value, option]);
        } else {
          const newSelected = [...value];
          newSelected.splice(index, 1);
          handleChange(newSelected);
        }
      } else {
        handleChange([option]);
      }
    } else {
      handleChange(option);
    }
  };

  const selectedButtonVariant = (option: OptionType) => {
    if (isOptionArray(value)) {
      return value.find(item => item.key === option.key) ? 'primary' : 'outlined';
    }
    return value?.key === option.key ? 'primary' : 'outlined';
  };
  const selectedIconVariant = (option: OptionType) => {
    if (isOptionArray(value)) {
      return value.find(item => item.key === option.key) && 'rotate-[135deg]';
    }
    return value?.key === option.key && 'rotate-[135deg]';
  };
  return (
    <div className="flex flex-col gap-4">
      {label && (
        <BodyText as="label" aria-label={label}>
          {label}
        </BodyText>
      )}
      <div className={clsxm('flex w-full flex-wrap gap-3', className)}>
        {options.map(option => (
          <Button
            className="flex items-center gap-1 px-4 "
            key={option.key}
            variant={selectedButtonVariant(option)}
            onClick={() => handleClickOnOption(option)}
          >
            {multiple && (
              <SvgIcon
                name="Plus"
                className={clsxm(
                  'h-3 w-3 transition-transform duration-200 md:h-4 md:w-4',
                  selectedIconVariant(option)
                )}
              />
            )}
            <SmallBodyText>{option.name}</SmallBodyText>
          </Button>
        ))}
      </div>
    </div>
  );
};
