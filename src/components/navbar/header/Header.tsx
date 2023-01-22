import React from 'react';
import { websiteName } from '../../../utils/constants';
import { SvgIcon } from '../../icons/SvgIcon';
import { LogoText } from '../../typography/Typography';
import Cart from './cart/Cart';
import ButtonSwitch from '../../button-switch/ButtonSwitch';
import AccountMenu from './account-menu/AccountMenu';
import Link from 'next/link';

type HeaderProps = {
  handleShowSearch: () => void;
};

export const Header = ({ handleShowSearch }: HeaderProps) => {
  return (
    <div className="relative my-5 flex w-full items-center justify-between md:justify-end">
      <LogoText className="ml-7 select-none sm:ml-14 md:absolute md:top-1/2 md:right-1/2 md:ml-0 md:-translate-y-1/2 md:translate-x-1/2">
        <Link href="/">{websiteName}</Link>
      </LogoText>
      <div className="mr-7 flex items-center gap-6 justify-self-end">
        <SvgIcon name="Search" className="h-5 w-5 cursor-pointer" onClick={handleShowSearch} />
        <ButtonSwitch elementToOpen={open => <Cart className="mt-3" isOpen={open} />}>
          <SvgIcon name="Cart" className="h-5 w-5 cursor-pointer" />
        </ButtonSwitch>
        <ButtonSwitch elementToOpen={open => <AccountMenu className="mt-3" isOpen={open} />}>
          <SvgIcon name="Person" className="h-6 w-6 cursor-pointer" />
        </ButtonSwitch>
      </div>
    </div>
  );
};
