import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
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
  id: string;
  brand: string;
  name: string;
  views: number;
  price: number;
  savedBy: number;
  images: ImageType[];
};

export const ItemListItem = ({ className, item }: ItemListItemProps) => {
  const itemLink = `/item/${item.id}`;
  return (
    <RoundedBox
      className={clsxm(
        'flex w-full items-center justify-between',
        'overflow-hidden bg-primaryBlack py-5 text-primaryWhite',
        className
      )}
    >
      <div className="flex w-[calc(100%-20px)] basis-full items-center gap-4 overflow-hidden">
        <Link
          className="relative aspect-square h-[52px] cursor-pointer bg-primaryWhite"
          href={itemLink}
        >
          <Image src={item.images[0]?.url ?? ''} fill className="object-contain" alt="Item Image" />
        </Link>
        <div className="flex w-[calc(100%-68px)] basis-full flex-col gap-3">
          <BodyText className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap ">
            <Link href={itemLink}>
              {item.brand} {item.name}
            </Link>
          </BodyText>
          <div className="grid w-full whitespace-pre xs:grid-cols-2 sm:grid-cols-3">
            <BodyText>Price: {item.price}£</BodyText>
            <BodyText>Views: {item.views}</BodyText>
            <BodyText className="hidden sm:block">Favorites: {item.savedBy}</BodyText>
          </div>
        </div>
      </div>
      <Link href={`/admin/item-creator?id=${item.id}`} className="basis-5 cursor-pointer">
        <SvgIcon name="Edit" className="ml-5 fill-primaryWhite" />
      </Link>
    </RoundedBox>
  );
};
