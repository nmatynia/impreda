import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogModal } from '../../dialog/DialogModal';
import { SvgIcon } from '../../icons/SvgIcon';
import { EditUserDetailsForm } from '../../forms/EditUserDetailsForm';
import { trpc } from '../../../utils/trpc';
import { UserDetailsSchema, UserDetailsType } from '../../user-account-box/UserAcountBox';

export const UserDetailsDialog = ({
  selectedUserId,
  isDialogOpen,
  handleCloseDialog
}: {
  selectedUserId: string;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEnableEditing = () => setIsEditing(true);
  const handleDisableEditing = () => {
    setIsEditing(false);
    reset();
  };
  const utils = trpc.useContext();

  const { data: user } = trpc.user.getUserById.useQuery(selectedUserId, {
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
    <DialogModal
      title="User's details"
      isOpen={isDialogOpen}
      handleCloseDialog={handleCloseDialog}
      actionElement={
        <button type="button">
          <SvgIcon name="Edit" onClick={handleEnableEditing} />
        </button>
      }
      className="w-[calc(100vw-4rem)] max-w-3xl whitespace-nowrap"
    >
      <EditUserDetailsForm
        user={user}
        onSubmit={handleSubmit(onSubmit)}
        handleDisableEditing={handleDisableEditing}
        isEditing={isEditing}
        {...methods}
      />
    </DialogModal>
  );
};
