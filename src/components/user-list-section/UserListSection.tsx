import React from 'react';
import clsxm from '../../utils/clsxm';
import { trpc } from '../../utils/trpc';
import { UserListFilterPanel } from '../filter-panel/UserListFilterPanel';
import { ListItemSkeleton } from '../list-item-skeleton/ListItemSkeleton';
import { UserListItem } from './user-list-item/UserListItem';

type UserListSectionProps = {
  className?: string;
};
export const UserListSection = ({ className }: UserListSectionProps) => {
  const { data: users, isLoading } = trpc.user.getAllUsers.useQuery();

  return (
    <section className={clsxm('flex flex-col', className)}>
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
