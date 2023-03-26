import Link from 'next/link';
import React from 'react';
import { ButtonSwitch } from '../../button-switch/ButtonSwitch';
import { BodyText } from '../../typography/Typography';
import { ClothingMenu } from './clothing-menu/ClothingMenu';
import { CollectionsMenu } from './collections-menu/CollectionsMenu';

export const ItemHeader = () => {
  return (
    <div className="flex w-full items-center justify-around border-y-[1px] border-primaryBlack py-2">
      <ButtonSwitch elementToOpen={open => <ClothingMenu isOpen={open} position="right" />}>
        <BodyText className="cursor-pointer select-none uppercase hover:underline">
          Clothing
        </BodyText>
      </ButtonSwitch>

      <ButtonSwitch elementToOpen={open => <CollectionsMenu isOpen={open} position="right" />}>
        <BodyText className="cursor-pointer select-none uppercase hover:underline">
          Collections
        </BodyText>
      </ButtonSwitch>

      <BodyText className="cursor-pointer select-none uppercase hover:underline">
        <Link href="/new-arrivals">New Arrivals</Link>
      </BodyText>

      <BodyText className="cursor-pointer select-none uppercase hover:underline">
        <Link href="/sale">Sale</Link>
      </BodyText>
    </div>
  );
};
