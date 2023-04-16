import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { LinkButton } from '../../components/link/LinkButton';
import { EditUserDetailsForm } from '../../components/forms/EditUserDetailsForm';
import {
  UserDetailsSchema,
  UserDetailsType
} from '../../components/user-account-box/UserAcountBox';
import { Button } from '../../components/button/Button';

const CheckoutPage = () => {
  const { data: cart } = trpc.cart.getCart.useQuery();
  const { items: cartItems } = cart || {};
  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<number>();

  const utils = trpc.useContext();
  const { data: user } = trpc.user.getCurrent.useQuery(undefined, {
    onSuccess: data => {
      if (data) reset(data);
    },
    refetchOnWindowFocus: false
  });

  const { mutateAsync: updateUser } = trpc.user.updateCurrentUser.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
    }
  });

  const { mutateAsync: createOrder } = trpc.order.createOrder.useMutation({
    // onSuccess: () => {
    //   utils.order.invalidate();
    // }
  });

  const methods = useForm<UserDetailsType>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: user?.name,
      address: user?.address,
      city: user?.city,
      zipCode: user?.zipCode,
      cardNumber: user?.cardNumber,
      phoneNumber: user?.phoneNumber
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<UserDetailsType> = async (data, e) => {
    e?.preventDefault();
    await updateUser(data);
  };

  return (
    <div className={clsxm('mx-auto max-w-3xl px-4')}>
      <RoundedBox className={clsxm('relative my-16 w-full overflow-visible p-0')}>
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Checkout</LargeBodyText>
        </div>

        {/* This part of code doesn't do anything on the backend also the only place in the codebase */}
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

        <EditUserDetailsForm user={user} onSubmit={handleSubmit(onSubmit)} isEditing {...methods} />

        <div className="m-7 mb-0 flex flex-col">
          <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-7">
            <div className="flex flex-col gap-1">
              <LargeBodyText />
              <Bold>Total: £{total}</Bold> <SmallBodyText>+ shipping</SmallBodyText>
            </div>
            <Button
              variant="primary"
              onClick={() => createOrder({ address: 'address', city: 'City', zipCode: 'zipCode' })}
            >
              Order the item
            </Button>
          </div>
        </div>
      </RoundedBox>
    </div>
  );
};

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login' }, props: {} };
  }

  return {
    props: {}
  };
};
