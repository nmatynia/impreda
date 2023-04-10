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
    <Box className={clsxm('absolute w-screen sm:w-[440px]', className)} {...props}>
      <div className="flex flex-col justify-between">
        <div className="mr-2 max-h-[500px] overflow-y-auto">
          {cartItems?.map(cartItem => (
            <CartItem
              key={cartItem.id}
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
        <div className="flex items-center justify-between pt-8">
          <LargeBodyText>
            <Bold>Total: £{total}</Bold>
          </LargeBodyText>
          <Button variant="primary">Checkout</Button>
        </div>
      </div>
    </Box>
  );
};
