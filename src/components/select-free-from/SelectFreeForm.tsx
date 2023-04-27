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
export const SelectFreeForm = React.forwardRef(
  ({ label, options, className, multiple, onChange: handleChange, value }: SelectFreeFormProps) =>
    // ref: React.ForwardedRef<HTMLSelectElement>
    {
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
      return (
        <div className="flex flex-col gap-4">
          {label && (
            <BodyText as="label" aria-label={label}>
              {label}
            </BodyText>
          )}
          <div className={clsxm('flex w-full gap-3', className)}>
            {options.map(option => (
              <Button
                key={option.key}
                variant={selectedButtonVariant(option)}
                onClick={() => handleClickOnOption(option)}
              >
                <SmallBodyText>{option.name}</SmallBodyText>
              </Button>
            ))}
          </div>
        </div>
      );
    }
);
