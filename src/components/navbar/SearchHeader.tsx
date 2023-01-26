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
        ' absolute z-10 flex w-full items-center border-b-[1px] border-primaryBlack bg-primaryWhite',
        isOpen || 'hidden'
      )}
    >
      <SvgIcon name="Search" className="ml-16 h-[18px] w-[18px] " />
      <input
        type="text"
        className="ml-32 w-full uppercase focus-within:outline-none"
        placeholder="Search Products"
      />
    </div>
  );
};
