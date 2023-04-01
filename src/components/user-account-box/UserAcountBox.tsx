import React from 'react';
import { z } from 'zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../../utils/trpc';
import { RoundedBox } from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';
import { EditUserDetailsForm } from '../forms/EditUserDetailsForm';

export const UserDetailsSchema = z.object({
  name: z.string().min(1).max(50).nullish(),
  address: z.string().min(3).max(50).nullish(),
  city: z.string().min(3).max(50).nullish(),
  zipCode: z.string().min(1).max(50).nullish(),
  cardNumber: z.string().min(16).max(19).nullish(),
  phoneNumber: z.string().min(9).max(10).nullish()
});

export type UserDetailsType = z.infer<typeof UserDetailsSchema>;

export const UserAccountBox = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const handleEnableEditing = () => setIsEditing(true);
  const handleDisableEditing = () => {
    setIsEditing(false);
    reset();
  };
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
    handleDisableEditing();
  };

  return (
    <RoundedBox className="mt-16 w-full p-0">
      <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
        <LargeBodyText>User Account</LargeBodyText>
        <button type="button" className="cursor-pointer" onClick={handleEnableEditing}>
          <SvgIcon name="Edit" className="fill-primaryBlack" />
        </button>
      </div>
      <EditUserDetailsForm
        user={user}
        onSubmit={handleSubmit(onSubmit)}
        handleDisableEditing={handleDisableEditing}
        isEditing={isEditing}
        {...methods}
      />
    </RoundedBox>
  );
};
