import Image from 'next/image';
import React from 'react';
import clsxm from '../../../utils/clsxm';
import RoundedBox from '../../box/RoundedBox';
import { SvgIcon } from '../../icons/SvgIcon';
import { ItemProps } from '../../item-card/ItemCard';
import { BodyText } from '../../typography/Typography';
type ItemListItemProps = {
  className?: string;
  item: ItemProps;
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
      <div className="flex w-full max-w-[50%] gap-4 sm:max-w-max">
        <div className="relative aspect-square h-[52px] bg-primaryWhite">
          <Image src={item.images[0]} fill className="object-contain" />
        </div>
        <div className="flex w-full flex-col gap-3">
          <BodyText className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap ">
            {item.brand} {item.name}
          </BodyText>
          <div className="flex w-fit gap-4 whitespace-pre sm:gap-24">
            <BodyText>Price: {item.price}£</BodyText>
            <BodyText>Views: {item.views}</BodyText>
            <BodyText className="hidden sm:block">Favorites: {item.saved}</BodyText>
          </div>
        </div>
      </div>
      <button className="cursor-pointer">
        <SvgIcon name="Edit" className="ml-5 fill-primaryWhite" />
      </button>
    </RoundedBox>
  );
};
