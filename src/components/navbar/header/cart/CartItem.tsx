import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import clsxm from '../../../../utils/clsxm';
import { BodyText, Bold } from '../../../typography/Typography';
import { Dot } from '../../../dot/Dot';
import { SvgIcon } from '../../../icons/SvgIcon';
import { trpc } from '../../../../utils/trpc';

export type CartItemProps = {
  id: string;
  itemId: string;
  src: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export const CartItem = ({
  id,
  itemId,
  src,
  brand,
  name,
  price,
  quantity,
  size,
  color,
  className
}: CartItemProps & { className?: string }) => {
  const utils = trpc.useContext();
  const { mutateAsync: removeFromCart } = trpc.cart.removeFromCart.useMutation({
    onSuccess: () => {
      utils.cart.invalidate();
    }
  });
  const itemLink = `/item/${itemId}`;
  return (
    <div className={clsxm('relative flex w-full justify-between bg-primaryWhite', className)}>
      <div className="mr-3 flex items-center" />
      <div className="flex basis-full gap-4 overflow-hidden">
        <Link href={itemLink} className="shrink-0">
          <Image
            src={src}
            alt={name}
            className="h-12 w-12 select-none object-contain"
            width={48}
            height={48}
          />
        </Link>
        <div className="flex w-auto flex-col flex-nowrap justify-between overflow-hidden overflow-ellipsis whitespace-nowrap">
          <div className="flex gap-2">
            <BodyText className="overflow-hidden overflow-ellipsis">
              <Link href={itemLink}>
                <Bold>{brand}</Bold>
              </Link>
            </BodyText>
            <button
              type="button"
              className={clsxm('flex items-center justify-center', 'cursor-pointer rounded-full')}
              onClick={() => removeFromCart({ cartItemId: id })}
            >
              <SvgIcon name="Trash" className="h-[14px] w-[14px] fill-primaryBlack" />
            </button>
          </div>
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
