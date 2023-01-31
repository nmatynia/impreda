import Link from 'next/link';
import React from 'react';
import ButtonSwitch from '../../button-switch/ButtonSwitch';
import { BodyText, SmallBodyText } from '../../typography/Typography';
import ClothingMenu from './clothing-menu/ClothingMenu';
import CollectionsMenu from './collections-menu/CollectionsMenu';

export const ItemHeader = () => {
  return (
    <div className="flex w-full justify-around border-y-[1px] border-primaryBlack py-2 uppercase">
      <ButtonSwitch elementToOpen={open => <ClothingMenu isOpen={open} position="center" />}>
        <SmallBodyText className="cursor-pointer select-none hover:underline">
          Clothing
        </SmallBodyText>
      </ButtonSwitch>

      <ButtonSwitch elementToOpen={open => <CollectionsMenu isOpen={open} position="center" />}>
        <SmallBodyText className="cursor-pointer select-none hover:underline">
          Collections
        </SmallBodyText>
      </ButtonSwitch>

      <SmallBodyText className="cursor-pointer select-none hover:underline">
        <Link href="/new-arrivals">New Arrivals</Link>
      </SmallBodyText>

      <SmallBodyText className="cursor-pointer select-none hover:underline">
        <Link href="/sale">Sale</Link>
      </SmallBodyText>
    </div>
  );
};
