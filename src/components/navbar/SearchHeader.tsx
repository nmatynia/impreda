import React from 'react';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';
//* https://github.com/jeancroy/FuzzySearch
//TODO Enhance it
export const SearchHeader = () => {
  return (
    <div className="flex items-center border-b-[1px] border-primaryBlack">
      <SvgIcon name="Search" className="ml-16 h-[18px] w-[18px] " />
      <input
        type="text"
        className="ml-32 w-full uppercase focus-within:outline-none"
        placeholder="Search Products"
      />
    </div>
  );
};
