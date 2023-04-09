import React from 'react';
import clsxm from '../../utils/clsxm';
import { trpc } from '../../utils/trpc';
import { ItemListFilterPanel } from '../filter-panel/ItemListFilterPanel';
import { ListItemSkeleton } from '../list-item-skeleton/ListItemSkeleton';
import { ItemListItem } from './item-list-item/ItemListItem';

type ItemListSectionProps = {
  className?: string;
};
export const ItemListSection = ({ className }: ItemListSectionProps) => {
  const { data: items, isLoading } = trpc.items.getListItems.useQuery();

  return (
    <section className={clsxm('flex flex-col', className)}>
      <ItemListFilterPanel sectionName="Item List" />
      <div className="z-10 my-6 flex flex-col gap-6">
        {isLoading ? (
          <>
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </>
        ) : (
          items?.map(item => {
            return <ItemListItem item={item} key={`item-${item.id}`} />;
          })
        )}
      </div>
    </section>
  );
};
