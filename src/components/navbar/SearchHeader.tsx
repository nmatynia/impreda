import React, { RefObject, useEffect, useRef } from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';
//* https://github.com/jeancroy/FuzzySearch
//TODO Enhance it
type SearchHeaderProps = {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
  navRef: RefObject<HTMLElement>;
};
export const SearchHeader = ({ isOpen, setIsOpen, navRef }: SearchHeaderProps) => {
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (!navRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [navRef, setIsOpen]);

  return (
    <div
      className={clsxm(
        ' absolute z-10 flex w-full items-center border-b-[1px] border-primaryBlack bg-primaryWhite py-2',
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
