import React from 'react';
import { websiteName } from '../../../utils/constants';
import { SvgIcon } from '../../icons/SvgIcon';
import { LogoText } from '../../typography/Typography';
import Cart from './cart/Cart';

export const Header = () => {
  return (
    <div className="relative my-5 flex w-full items-center justify-end">
      <LogoText className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 select-none">
        {websiteName}
      </LogoText>
      <div className="mr-7 flex items-center gap-6 justify-self-end">
        <SvgIcon name="Search" className="h-5 w-5 cursor-pointer" />
        <div className="relative h-fit w-fit">
          <SvgIcon name="Cart" className="h-5 w-5 cursor-pointer" />
          <Cart className="right-0 mt-3" />
        </div>
        <SvgIcon name="Person" className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};
