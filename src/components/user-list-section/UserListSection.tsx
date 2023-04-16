import React from 'react';
import clsxm from '../../utils/clsxm';
import { trpc } from '../../utils/trpc';
import { UserListFilterPanel } from '../filter-panel/UserListFilterPanel';
import { ListItemSkeleton } from '../skeletons/ListItemSkeleton';
import { UserListItem } from './user-list-item/UserListItem';
import { UserDetailsDialog } from './user-details-dialog/UserDetailsDialog';

type UserListSectionProps = {
  className?: string;
};
export const UserListSection = ({ className }: UserListSectionProps) => {
  const { data: users, isLoading } = trpc.user.getAllUsers.useQuery();

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
      <div className="z-10 my-6 flex flex-col gap-6">
        {isLoading ? (
          <>
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </>
        ) : (
          users?.map(({ id, name, joinDate, totalSpent, totalPurchases }) => {
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
          })
        )}
      </div>
    </section>
  );
};
