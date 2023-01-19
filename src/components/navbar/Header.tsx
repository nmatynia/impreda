import React from 'react';
import { websiteName } from '../../utils/constants';
import { SvgIcon } from '../icons/SvgIcon';
import { LogoText } from '../typography/Typography';

export const Header = () => {
  return (
    <div className="items-centet my-5 flex w-full justify-end">
      <LogoText className="absolute right-1/2 translate-x-1/2 select-none">{websiteName}</LogoText>
      <div className="mr-7 flex items-center gap-6 justify-self-end">
        <SvgIcon name="Search" className="h-5 w-5 cursor-pointer" />
        <SvgIcon name="Cart" className="h-5 w-5 cursor-pointer" />
        <SvgIcon name="Person" className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};
