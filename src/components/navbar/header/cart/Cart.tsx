import React from 'react';
import { useSession } from 'next-auth/react';
import clsxm from '../../../../utils/clsxm';
import type { BoxProps } from '../../../box/Box';
import { Box } from '../../../box/Box';
import { Bold, LargeBodyText, SmallBodyText } from '../../../typography/Typography';
import { CartItem } from './CartItem';
import { trpc } from '../../../../utils/trpc';
import { NotFound } from '../../../not-found/NotFound';
import { LinkButton } from '../../../link/LinkButton';

type CartProps = {
  className?: string;
} & BoxProps;

export const Cart = ({ className, ...props }: CartProps) => {
  return (
    <Box
      className={clsxm(
        'absolute max-h-[80vh] w-screen overflow-y-auto pb-0 sm:w-[560px]',
        className
      )}
      {...props}
    >
      <CartContent />
    </Box>
  );
};

const CartContent = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { data: cart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: isLoggedIn
  });
  const { items: cartItems } = cart || {};

  const isCartNotEmpty = cartItems && cartItems.length > 0;
  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;
  return (
    <div className="flex flex-col justify-between ">
      <div className="mr-2">
        {isCartNotEmpty ? (
          cartItems?.map(cartItem => (
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
          ))
        ) : (
          <NotFound
            title={
              isLoggedIn
                ? 'It seems your shopping cart is empty at the moment.'
                : "It seems you haven't logged in yet."
            }
            subtitle={
              isLoggedIn
                ? 'Visit our shopping page to explore our amazing item selection and fill your cart with your desired items'
                : 'Login to your account to start shopping.'
            }
            className="border-b-[1px] border-primaryBlack"
          />
        )}
      </div>
      <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-8">
        <div className="flex flex-col gap-1">
          <LargeBodyText>
            <Bold>Total: £{total}</Bold>
          </LargeBodyText>
          <SmallBodyText>+ shipping</SmallBodyText>
        </div>

        <LinkButton variant="primary" href={isLoggedIn ? '/cart' : '/login'}>
          {isLoggedIn ? 'Go to cart' : 'Login'}
        </LinkButton>
      </div>
    </div>
  );
};
