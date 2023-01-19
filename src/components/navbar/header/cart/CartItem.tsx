import Image from 'next/image';
import React from 'react';
import clsxm from '../../../../utils/clsxm';
import { BodyText, Bold } from '../../../typography/Typography';

export type CartItemProps = {
  src: string;
  designer: string;
  name: string;
  price: number;
  quantity: number;
};

const CartItem = ({
  src,
  designer,
  name,
  price,
  quantity,
  className
}: CartItemProps & { className?: string }) => {
  return (
    <div className={clsxm('flex w-full justify-between bg-primaryWhite', className)}>
      <div className="flex gap-4">
        <Image src={src} alt={name} className="select-none object-contain" width={48} height={48} />
        <div className="flex min-w-fit flex-col flex-nowrap justify-between whitespace-nowrap">
          <BodyText>
            <Bold>{designer}</Bold>
          </BodyText>
          <BodyText>{name}</BodyText>
        </div>
      </div>

      <div className="flex min-w-fit flex-col flex-nowrap justify-between whitespace-nowrap">
        <BodyText>Price: £{price}</BodyText>
        <BodyText>Quantity: {quantity}</BodyText>
      </div>
    </div>
  );
};

export default CartItem;
