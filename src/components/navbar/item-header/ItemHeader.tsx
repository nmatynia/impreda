import Link from 'next/link';
import React from 'react';
import { ButtonSwitch } from '../../button-switch/ButtonSwitch';
import { BodyText } from '../../typography/Typography';
import { ClothingMenu } from './clothing-menu/ClothingMenu';
import clsxm from '../../../utils/clsxm';

export const ItemHeader = ({ className }: { className: string }) => {
  return (
    <div
      className={clsxm(
        'flex h-12 w-full items-center justify-around border-t-[1px] border-primaryBlack',
        className
      )}
    >
      <ButtonSwitch elementToOpen={open => <ClothingMenu isOpen={open} position="right" />}>
        <BodyText className="cursor-pointer select-none uppercase hover:underline">
          Clothing
        </BodyText>
      </ButtonSwitch>

      <BodyText className="cursor-pointer select-none uppercase hover:underline">
        <Link href="/new-arrivals">New Arrivals</Link>
      </BodyText>
    </div>
  );
};
