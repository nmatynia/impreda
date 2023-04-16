import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
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
import { EditUserDetailsForm } from '../../components/forms/EditUserDetailsForm';
import {
  UserDetailsSchema,
  UserDetailsType
} from '../../components/user-account-box/UserAcountBox';
import { Button } from '../../components/button/Button';
import { SvgIcon } from '../../components/icons/SvgIcon';

// TODO: Clean up this code, especially the hardcoded part
const CheckoutPage = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<number>(1);
  const { data: cart } = trpc.cart.getCart.useQuery();
  const { items: cartItems } = cart || {};

  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;
  const totalWithShipping = total + (selectedDeliveryOption === 1 ? 3.5 : 4.5);

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
    onSuccess: () => {
      utils.order.invalidate();
      utils.cart.invalidate();
    }
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
  const [isEditing, setIsEditing] = useState(false);
  const handleEnableEditing = () => setIsEditing(true);
  const handleDisableEditing = () => {
    setIsEditing(false);
    reset();
  };

  const handleOrder = async () => {
    await createOrder();
    router.push('/checkout/thank-you');
  };

  return (
    <div className={clsxm('mx-auto max-w-3xl px-4')}>
      <RoundedBox className={clsxm('relative my-16 w-full overflow-visible p-0')}>
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Checkout</LargeBodyText>
        </div>
        <LargeBodyText className="mb-6 mt-16 px-8">Choose Your Shipping Carrier</LargeBodyText>
        {/* This part of code doesn't do anything on the backend also the only place in the codebase */}
        <div className="flex w-full flex-col gap-6 px-8 md:flex-row">
          <button
            type="button"
            className={clsxm(
              'flex w-full cursor-pointer gap-4 border-[1px] p-2 md:w-1/2',
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
              'flex w-full cursor-pointer gap-4 border-[1px] p-2 md:w-1/2',
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
        <div className="mb-6 mt-16 flex items-center gap-5 px-8">
          <LargeBodyText>User details</LargeBodyText>
          <button type="button" className="cursor-pointer" onClick={handleEnableEditing}>
            <SvgIcon name="Edit" className="fill-primaryBlack" />
          </button>
        </div>
        <EditUserDetailsForm
          user={user}
          onSubmit={handleSubmit(onSubmit)}
          className="pt-0"
          isEditing={isEditing}
          handleDisableEditing={handleDisableEditing}
          {...methods}
        />

        <div className="m-7 mb-0 flex flex-col">
          <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-7">
            <div className="flex flex-col gap-1">
              <LargeBodyText>
                <Bold>Total: £{totalWithShipping}</Bold>
              </LargeBodyText>
              <SmallBodyText>*shipping included</SmallBodyText>
            </div>
            <Button variant="primary" onClick={handleOrder}>
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
