import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';

export type OptionType<T = object> = { name: string; key: string } & T;

export type SelectProps = {
  placeholder: string;
  className?: string;
  name: string;
  label: string;
  options: OptionType[];
  defaultValue?: OptionType | OptionType[];
  multiple?: boolean;
} & Partial<ControllerRenderProps<FieldValues, string>>;

/**
 * @param placeholder - The placeholder for the select.
 * @param name - The name of the select. Need for react-hook-form.
 * @param label - The label for the select.
 * @param options - The options to display in the select.
 * @param defaultValue - The default value of the select. If multiple is true, this must be an array of values.
 * @param multiple - If true, the user can select multiple options.
 */
// eslint-disable-next-line react/display-name
export const Select = React.forwardRef(
  (
    { className, label, options, name, defaultValue, multiple, placeholder, ...rest }: SelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <Listbox
        name={name}
        defaultValue={defaultValue}
        multiple={multiple}
        ref={ref}
        by="key"
        {...rest}
      >
        <div className={clsxm('relative', className)}>
          {label && <BodyText as="label">{label}</BodyText>}
          <Listbox.Button
            className={clsxm(
              'relative w-full cursor-pointer',
              'border-b-[1px] pr-16 pb-2 text-left ',
              'border-gray-400 text-primaryBlack placeholder:text-gray-400',
              'focus-visible:border-b-primaryBlack focus-visible:outline-0',
              '[&:focus-visible>*>*]:text-primaryBlack',
              'text-xs sm:text-sm'
            )}
          >
            {({ value, open }) => {
              if (multiple) {
                return (
                  <ButtonMultipleContent placeholder={placeholder} value={value} isOpen={open} />
                );
              }
              return <ButtonSingleContent placeholder={placeholder} value={value} isOpen={open} />;
            }}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsxm(
                'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white',
                'border-[1px] border-gray-400 py-1 text-base shadow-sm focus:outline-none',
                'text-xs sm:text-sm'
              )}
            >
              {options.map(option => (
                <Listbox.Option
                  key={option.key}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100' : 'text-primaryBlack'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primaryBlack">
                          <SvgIcon name="Check" className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    );
  }
);

const ButtonMultipleContent = ({
  value,
  isOpen,
  placeholder
}: {
  value: OptionType[];
  isOpen: boolean;
  placeholder: string;
}) => {
  const displayedValue = value.length > 0 ? value.map(v => v.name).join(', ') : placeholder;
  return (
    <>
      <span className="block truncate">{displayedValue}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 bottom-2 flex items-center gap-2 pr-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primaryBlack text-xs text-primaryWhite sm:text-sm">
          {value.length}
        </div>
        <ChevronIcon isOpen={isOpen} />
      </span>
    </>
  );
};

const ButtonSingleContent = ({
  value,
  isOpen,
  placeholder
}: {
  value: OptionType;
  isOpen: boolean;
  placeholder: string;
}) => (
  <>
    <span className="block truncate">{value?.name ?? placeholder}</span>
    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronIcon isOpen={isOpen} />
    </span>
  </>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <SvgIcon
    name="ChevronDown"
    className={clsxm(
      'h-4 w-4 text-gray-400',
      'transition-all duration-300 ease-in-out',
      isOpen && 'rotate-180 transform'
    )}
    aria-hidden="true"
  />
);
