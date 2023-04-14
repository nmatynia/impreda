import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { RoundedBox } from '../../components/box/RoundedBox';
import {
  BodyText,
  Bold,
  LargeBodyText,
  SmallBodyText
} from '../../components/typography/Typography';
import clsxm from '../../utils/clsxm';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';
import { CartItem } from '../../components/navbar/header/cart/CartItem';
import { SvgIcon } from '../../components/icons/SvgIcon';
import { NotFound } from '../../components/not-found/NotFound';
import { LinkButton } from '../../components/link/LinkButton';
import { Checkbox } from '../../components/checkbox/Checkbox';

const ItemCreator = () => {
  const { data: cart } = trpc.cart.getCart.useQuery();
  const { items: cartItems } = cart || {};
  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<number>();

  return (
    <div className={clsxm('mx-auto max-w-3xl px-4')}>
      <RoundedBox className={clsxm('relative my-16 w-full overflow-visible p-0')}>
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Checkout</LargeBodyText>
        </div>

        {/* This part of code doesn't do anything on the backend */}
        <div className="mt-6 flex w-full flex-col gap-6 p-4 md:flex-row">
          <button
            type="button"
            className={clsxm(
              'flex w-1/2 cursor-pointer gap-4 border-[1px] p-2',
              'border-primaryBlack text-primaryBlack',
              selectedDeliveryOption === 1 && 'border-none bg-primaryBlack text-primaryWhite'
            )}
            onClick={() => setSelectedDeliveryOption(1)}
          >
            <div className="flex flex-col items-start p-4">
              <BodyText>
                <Bold>Standard delivery</Bold>
              </BodyText>

              <BodyText>Cost: £3</BodyText>
              <BodyText>Estimated: Tomorrow, 18:00</BodyText>
            </div>
          </button>
          <button
            type="button"
            className={clsxm(
              'flex w-1/2 cursor-pointer gap-4 border-[1px] p-2',
              'border-primaryBlack text-primaryBlack',
              selectedDeliveryOption === 2 && 'border-none bg-primaryBlack text-primaryWhite'
            )}
            onClick={() => setSelectedDeliveryOption(2)}
          >
            <div className="flex flex-col items-start p-4">
              <BodyText>
                <Bold>Premium delivery</Bold>
              </BodyText>

              <BodyText>Cost: £4.50</BodyText>
              <BodyText>Estimated: Tomorrow, 9:00</BodyText>
            </div>
          </button>
        </div>

        <div className="m-7 mb-0 flex flex-col">
          <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-7">
            <div className="flex flex-col gap-1">
              <LargeBodyText />
              <Bold>Total: £{total}</Bold> <SmallBodyText>+ shipping</SmallBodyText>
            </div>
            <LinkButton variant="primary" href="/checkout">
              Order the item
            </LinkButton>
          </div>
        </div>
      </RoundedBox>
    </div>
  );
};

export default ItemCreator;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login' }, props: {} };
  }

  return {
    props: {}
  };
};
