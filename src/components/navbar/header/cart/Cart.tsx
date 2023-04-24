import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & BoxProps;

export const Cart = ({ className, isOpen, setIsOpen, ...props }: CartProps) => {
  return (
    <Box
      className={clsxm(
        'absolute max-h-[80vh] w-screen overflow-y-auto pb-0 sm:w-[560px]',
        className
      )}
      isOpen={isOpen}
      {...props}
    >
      <CartContent buttonLink="/cart" buttonText="Go to cart" setIsOpen={setIsOpen} />
    </Box>
  );
};

const CartContent = ({
  buttonLink,
  buttonText,
  setIsOpen
}: {
  buttonLink: string;
  buttonText: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const {
    data: cart,
    isRefetching,
    isFetched,
    isFetchedAfterMount
  } = trpc.cart.getCart.useQuery(undefined, {
    refetchOnWindowFocus: false
  });
  console.log({ isRefetching, isFetched, isFetchedAfterMount });
  useEffect(() => {
    if (isRefetching && router.pathname !== '/cart') setIsOpen(true);
  }, [isRefetching, setIsOpen, router]);
  const { items: cartItems } = cart || {};
  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;
  return (
    <div className="flex flex-col justify-between ">
      <div className="mr-2">
        {cartItems && cartItems.length > 0 ? (
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
            title="It seems your shopping cart is empty at the moment."
            subtitle="Visit our shopping page to explore our amazing item selection and fill your cart with your desired items"
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
        <LinkButton variant="primary" href={buttonLink}>
          {buttonText}
        </LinkButton>
      </div>
    </div>
  );
};
