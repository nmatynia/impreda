import type { RefObject } from 'react';
import React, { useEffect } from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
//* https://github.com/jeancroy/FuzzySearch
// TODO Enhance it
type SearchHeaderProps = {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
  navRef: RefObject<HTMLElement>;
};
export const SearchHeader = ({ isOpen, setIsOpen, navRef }: SearchHeaderProps) => {
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!navRef?.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [navRef, setIsOpen]);

  return (
    <div
      className={clsxm(
        ' absolute z-10 flex w-full items-center border-y-[1px] border-primaryBlack bg-primaryWhite py-2',
        isOpen || 'hidden'
      )}
    >
      <SvgIcon name="Search" className="ml-8 h-[16px] w-[16px] md:ml-16 " />
      <input
        type="text"
        className="mx-8 flex-1 text-xs uppercase focus-within:outline-none sm:text-sm md:mr-32 md:ml-20"
        placeholder="Search Products"
      />
    </div>
  );
};
