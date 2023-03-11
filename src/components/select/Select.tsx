import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';

type SelectProps = {
  className?: string;
  label: string;
  options: { name: string; id: string }[];
};

export const Select = ({ className, label, options }: SelectProps) => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={clsxm('relative', className)}>
        {label && <BodyText>{label}</BodyText>}
        <Listbox.Button
          className={clsxm(
            'relative w-full cursor-pointer',
            'border-b-[1px] pb-2 pr-10 text-left ',
            'border-gray-400 text-primaryBlack placeholder:text-gray-400',
            'focus-visible:border-b-primaryBlack focus-visible:outline-0',
            '[&:focus-visible>*>*]:text-primaryBlack',
            'text-xs sm:text-sm'
          )}
        >
          <span className="block truncate">{selected?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SvgIcon name="ChevronDown" className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
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
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-100' : 'text-primaryBlack'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {person.name}
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
};
