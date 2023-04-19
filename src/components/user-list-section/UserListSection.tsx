import React from 'react';
import { inferProcedureOutput } from '@trpc/server';
import clsxm from '../../utils/clsxm';
import { UserListFilterPanel } from '../filter-panel/UserListFilterPanel';
import { UserListItem } from './user-list-item/UserListItem';
import { UserDetailsDialog } from './user-details-dialog/UserDetailsDialog';
import { UserRouter } from '../../server/trpc/router/_app';
import { ListSkeleton } from '../skeletons/ListSkeleton';
import { NotFound } from '../not-found/NotFound';

type User = inferProcedureOutput<UserRouter['getAllUsers']> | undefined;

type UserListSectionProps = {
  className?: string;
  users: User;
  isLoading: boolean;
};
export const UserListSection = ({ users, isLoading, className }: UserListSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
  };
  const handleOpenDialog = (id: string) => {
    setSelectedUserId(id);
    setIsDialogOpen(true);
  };

  return (
    <section className={clsxm('flex flex-col', className)}>
      {selectedUserId && (
        <UserDetailsDialog
          isDialogOpen={isDialogOpen}
          selectedUserId={selectedUserId}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      <UserListFilterPanel sectionName="User List" />
      <UserListContent users={users} isLoading={isLoading} handleOpenDialog={handleOpenDialog} />
    </section>
  );
};

const UserListContent = ({
  isLoading,
  users,
  handleOpenDialog
}: {
  isLoading: boolean;
  users: User;
  handleOpenDialog: (id: string) => void;
}) => {
  if (isLoading) {
    return <ListSkeleton />;
  }
  if (!users) {
    return (
      <div className="z-10 my-6 flex flex-col gap-6">
        <NotFound
          className="max-w-lg"
          title="The user list is empty"
          subtitle="It seems like nobody registered yet."
        />
      </div>
    );
  }
  return (
    <div className="z-10 my-6 flex flex-col gap-6">
      {users?.map(({ id, name, joinDate, totalSpent, totalPurchases }) => {
        return (
          <UserListItem
            handlePreviewUser={() => handleOpenDialog(id)}
            name={name ?? 'Unknown'}
            joinDate={joinDate}
            totalSpent={totalSpent}
            totalPurchases={totalPurchases}
            key={id}
          />
        );
      })}
    </div>
  );
};
