import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { WEBSITE_NAME } from '../../../utils/constants';
import { SvgIcon } from '../../icons/SvgIcon';
import { BodyText, LogoText, SmallBodyText } from '../../typography/Typography';
import { Cart } from './cart/Cart';
import { ButtonSwitch } from '../../button-switch/ButtonSwitch';
import { AccountMenu } from './account-menu/AccountMenu';
import { trpc } from '../../../utils/trpc';
import { ClothingMenu } from '../item-header/clothing-menu/ClothingMenu';

type HeaderProps = {
  handleShowSearch: () => void;
};

export const Header = ({ handleShowSearch }: HeaderProps) => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { data: cart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: isLoggedIn
  });
  const { items: cartItems } = cart || {};
  const itemsCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="relative my-5 flex w-full items-center justify-between ">
      <div className="ml-7 flex items-center gap-10 sm:ml-14">
        <LogoText className="select-none">
          <Link href="/">{WEBSITE_NAME}</Link>
        </LogoText>
        <div className="hidden items-center gap-6 sm:flex">
          <ButtonSwitch
            isHoverable
            elementToOpen={open => <ClothingMenu isOpen={open} position="right" />}
          >
            <BodyText className="cursor-pointer select-none uppercase hover:underline">
              Clothing
            </BodyText>
          </ButtonSwitch>
          <Link
            href="/shop?sortBy=newest "
            className="flex cursor-pointer select-none items-center hover:underline"
          >
            <BodyText className="uppercase">New Arrivals</BodyText>
          </Link>
        </div>
      </div>
      <div className="mr-7 flex items-center gap-6 justify-self-end sm:mr-14">
        <SvgIcon
          id="searchButton"
          name="Search"
          className="h-5 w-5 cursor-pointer"
          onClick={handleShowSearch}
        />
        <ButtonSwitch
          elementToOpen={open => <Cart className="mt-6 md:mt-3" isOpen={open} />}
          className="static md:relative"
        >
          <div className="relative h-fit w-fit">
            <SvgIcon name="Cart" className="h-5 w-5 cursor-pointer" />
            <div className="absolute top-3 -right-1 flex h-4 w-4 items-center justify-center rounded-full  bg-primaryWhite">
              <SmallBodyText className="md:text-[10px]">{itemsCount}</SmallBodyText>
            </div>
          </div>
        </ButtonSwitch>
        <ButtonSwitch elementToOpen={open => <AccountMenu className="mt-3" isOpen={open} />}>
          <SvgIcon name="Person" className="h-6 w-6 cursor-pointer" />
        </ButtonSwitch>
      </div>
    </div>
  );
};
