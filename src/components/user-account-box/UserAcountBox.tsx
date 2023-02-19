import React from 'react';
import { trpc } from '../../utils/trpc';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, Bold, LargeBodyText } from '../typography/Typography';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../button/Button';
import { Input } from '../input/Input';

export const UserDetailsSchema = z.object({
  name: z.string().min(1).max(50).nullish(),
  address: z.string().min(3).max(50).nullish(),
  city: z.string().min(3).max(50).nullish(),
  zipCode: z.string().min(1).max(50).nullish(),
  cardNumber: z.string().min(16).max(19).nullish(),
  phoneNumber: z.string().min(9).max(10).nullish()
});

type UserDetailsType = z.infer<typeof UserDetailsSchema>;

const UserAccountBox = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const handleEnableEditing = () => setIsEditing(true);
  const handleDisableEditing = () => {
    setIsEditing(false);
    reset();
  };
  const utils = trpc.useContext();
  const { data } = trpc.user.getCurrent.useQuery(undefined, {
    onSuccess: data => {
      if (data) reset(data);
    },
    refetchOnWindowFocus: false
  });

  const { mutateAsync: updateUser } = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
    }
  });

  const methods = useForm<UserDetailsType>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: data?.name,
      address: data?.address,
      city: data?.city,
      zipCode: data?.zipCode,
      cardNumber: data?.cardNumber,
      phoneNumber: data?.phoneNumber
    }
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit: SubmitHandler<UserDetailsType> = async (data, e) => {
    e?.preventDefault();
    await updateUser(data);
    handleDisableEditing();
  };

  return (
    <RoundedBox className="mt-16 w-full p-0">
      <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
        <LargeBodyText>User Account</LargeBodyText>
        <button className="cursor-pointer" onClick={handleEnableEditing}>
          <SvgIcon name="Edit" className="fill-primaryBlack" />
        </button>
      </div>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-7 p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7 sm:flex-row sm:gap-14">
            <div className="flex flex-col gap-7">
              <div>
                <BodyText>Name:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter name'} fieldName="name" />
                ) : (
                  <BodyText>
                    <Bold>{data?.name ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
              <div>
                <BodyText>Address:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter address'} fieldName="address" />
                ) : (
                  <BodyText>
                    <Bold>{data?.address ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
              <div>
                <BodyText>City:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter city'} fieldName="city" />
                ) : (
                  <BodyText>
                    <Bold>{data?.city ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
              <div>
                <BodyText>Zip code:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter zip code'} fieldName="zipCode" />
                ) : (
                  <BodyText>
                    <Bold>{data?.zipCode ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div>
                <BodyText>Card Details:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter card details'} fieldName="cardDetails" />
                ) : (
                  <BodyText>
                    <Bold>{data?.cardNumber ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
              <div>
                <BodyText>Phone Number:</BodyText>
                {isEditing ? (
                  <Input placeholder={'Enter phone number'} fieldName="phoneNumber" />
                ) : (
                  <BodyText>
                    <Bold>{data?.phoneNumber ?? '----'}</Bold>
                  </BodyText>
                )}
              </div>
            </div>
          </div>
          {isEditing && (
            // Prevents clicking Cancel button on enter in the form
            <div className="flex flex-row-reverse justify-start gap-3">
              <Button type="submit">Save</Button>
              <Button variant="outlined" onClick={handleDisableEditing}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </RoundedBox>
  );
};

export default UserAccountBox;
