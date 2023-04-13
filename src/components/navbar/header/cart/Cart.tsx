import React from 'react';
import clsxm from '../../../../utils/clsxm';
import type { BoxProps } from '../../../box/Box';
import { Box } from '../../../box/Box';
import { Bold, LargeBodyText } from '../../../typography/Typography';
import { CartItem } from './CartItem';
import { Button } from '../../../button/Button';
import { trpc } from '../../../../utils/trpc';

type CartProps = {
  className?: string;
} & BoxProps;

export const Cart = ({ className, ...props }: CartProps) => {
  const { data: cart } = trpc.cart.getCart.useQuery();
  const { items: cartItems } = cart || {};
  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;
  return (
    <Box
      className={clsxm(
        'absolute max-h-[80vh] w-screen overflow-y-auto pb-0 sm:w-[560px]',
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between ">
        <div className="mr-2">
          {cartItems?.map(cartItem => (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              itemId={cartItem.item.id}
              brand={cartItem.item.brand}
              name={cartItem.item.name}
              price={cartItem.item.price * cartItem.quantity}
              quantity={cartItem.quantity}
              src={cartItem.item.images[0]?.url ?? ''}
              size={cartItem.size.name}
              color={cartItem.color.name}
              className="border-b-[1px] border-primaryBlack py-4 first:pt-0 "
            />
          ))}
        </div>
        <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-8">
          <LargeBodyText>
            <Bold>Total: £{total}</Bold>
          </LargeBodyText>
          <Button variant="primary">Checkout</Button>
        </div>
      </div>
    </Box>
  );
};
