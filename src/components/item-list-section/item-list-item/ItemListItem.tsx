import Image from 'next/image';
import React from 'react';
import { ImageType } from '../../../types/types';
import clsxm from '../../../utils/clsxm';
import { RoundedBox } from '../../box/RoundedBox';
import { SvgIcon } from '../../icons/SvgIcon';
import { BodyText } from '../../typography/Typography';

type ItemListItemProps = {
  className?: string;
  item: ItemListItem;
};

type ItemListItem = {
  brand: string;
  name: string;
  views: number;
  price: number;
  savedBy: number;
  images: ImageType[];
};

export const ItemListItem = ({ className, item }: ItemListItemProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'flex w-full items-center justify-between',
        'overflow-hidden bg-primaryBlack py-5 text-primaryWhite',
        className
      )}
    >
      <div className="flex w-[calc(100%-20px)] basis-full items-center gap-4 overflow-hidden">
        <div className="relative aspect-square h-[52px] bg-primaryWhite">
          <Image src={item.images[0]?.url ?? ''} fill className="object-contain" alt="Item Image" />
        </div>
        <div className="flex w-[calc(100%-68px)] basis-full flex-col gap-3">
          <BodyText className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap ">
            {item.brand} {item.name}
          </BodyText>
          <div className="grid w-full whitespace-pre xs:grid-cols-2 sm:grid-cols-3">
            <BodyText>Price: {item.price}£</BodyText>
            <BodyText>Views: {item.views}</BodyText>
            <BodyText className="hidden sm:block">Favorites: {item.savedBy}</BodyText>
          </div>
        </div>
      </div>
      <button type="button" className="basis-5 cursor-pointer">
        <SvgIcon name="Edit" className="ml-5 fill-primaryWhite" />
      </button>
    </RoundedBox>
  );
};
