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
      <div className="flex gap-4">
        <Image
          src={src}
          alt={name}
          className="h-12 w-12 select-none object-contain"
          width={48}
          height={48}
        />
        <div className="flex min-w-fit flex-col flex-nowrap justify-between whitespace-nowrap">
          <BodyText>
            <Bold>{brand}</Bold>
          </BodyText>
          <div className="flex gap-2">
            <BodyText>{name}</BodyText>
            <Dot />
            <BodyText>{size}</BodyText>
            <Dot />
            <BodyText>{color}</BodyText>
          </div>
        </div>
      </div>

      <div className="flex min-w-fit flex-col flex-nowrap justify-between whitespace-nowrap">
        <BodyText>Price: £{price}</BodyText>
        <BodyText>Quantity: {quantity}</BodyText>
      </div>
    </div>
  );
};
