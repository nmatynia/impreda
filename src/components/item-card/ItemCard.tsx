import Image from 'next/image';
import React from 'react';
import DefaultTeeImg from '../../../public/images/default-tee.webp';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, Bold, SmallBodyText } from '../typography/Typography';

export type ItemCardProps = {
  className?: string;
  brand: string;
  name: string;
  price: number;
  saved: boolean;
};

export const ItemCard = ({ name, price, saved, brand, className }: ItemCardProps) => {
  return (
    <div className="relative flex h-80 w-64 select-none flex-col justify-between p-6">
      <div className="flex justify-end">
        {true ? <SvgIcon name="Bookmark" /> : <SvgIcon name="BookmarkFill" />}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <SmallBodyText>
            <Bold>{brand}</Bold>
          </SmallBodyText>
          <SmallBodyText>{name}</SmallBodyText>
        </div>
        <div>
          <SmallBodyText>{price}£</SmallBodyText>
        </div>
      </div>
      <Image src={DefaultTeeImg.src} alt="holder" fill className="absolute -z-10 object-cover" />
    </div>
  );
};
