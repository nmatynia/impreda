import Image from 'next/image';
import React from 'react';
import clsxm from '../../../../utils/clsxm';
import { BodyText, Bold } from '../../../typography/Typography';
import { Dot } from '../../../dot/Dot';

export type CartItemProps = {
  src: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export const CartItem = ({
  src,
  brand,
  name,
  price,
  quantity,
  size,
  color,
  className
}: CartItemProps & { className?: string }) => {
  return (
    <div className={clsxm('flex w-full justify-between bg-primaryWhite', className)}>
      <div className="flex basis-full gap-4 overflow-hidden">
        <Image
          src={src}
          alt={name}
          className="h-12 w-12 shrink-0 select-none object-contain"
          width={48}
          height={48}
        />
        <div className="flex w-auto flex-col flex-nowrap justify-between overflow-hidden overflow-ellipsis whitespace-nowrap">
          <BodyText className="overflow-hidden overflow-ellipsis">
            <Bold className="overflow-hidden overflow-ellipsis">{brand}</Bold>
          </BodyText>
          <div className="flex gap-2 overflow-hidden">
            <BodyText>{size}</BodyText>
            <Dot />
            <BodyText>{color}</BodyText>
            <Dot />
            <BodyText className="overflow-hidden overflow-ellipsis">{name}</BodyText>
          </div>
        </div>
      </div>

      <div className="flex min-w-fit basis-auto flex-col flex-nowrap justify-between whitespace-nowrap pl-4">
        <BodyText>Price: £{price}</BodyText>
        <BodyText>Quantity: {quantity}</BodyText>
      </div>
    </div>
  );
};
