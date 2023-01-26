import Link from 'next/link';
import React from 'react';
import ButtonSwitch from '../../button-switch/ButtonSwitch';
import { BodyText } from '../../typography/Typography';
import ClothingMenu from './clothing-menu/ClothingMenu';
import CollectionsMenu from './collections-menu/CollectionsMenu';

export const ItemHeader = () => {
  return (
    <div className="flex w-full justify-around border-y-[1px] border-primaryBlack uppercase">
      <ButtonSwitch elementToOpen={open => <ClothingMenu isOpen={open} position="center" />}>
        <BodyText className="cursor-pointer select-none hover:underline">Clothing</BodyText>
      </ButtonSwitch>

      <ButtonSwitch elementToOpen={open => <CollectionsMenu isOpen={open} position="center" />}>
        <BodyText className="cursor-pointer select-none hover:underline">Collections</BodyText>
      </ButtonSwitch>

      <BodyText className="cursor-pointer select-none hover:underline">
        <Link href="/new-arrivals">New Arrivals</Link>
      </BodyText>

      <BodyText className="cursor-pointer select-none hover:underline">
        <Link href="/sale">Sale</Link>
      </BodyText>
    </div>
  );
};
