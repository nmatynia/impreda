import React, { useState } from 'react';
import clsxm from '../../utils/clsxm';
import { trpc } from '../../utils/trpc';
import { ItemListFilterPanel } from '../filter-panel/ItemListFilterPanel';
import { ListItemSkeleton } from '../list-item-skeleton/ListItemSkeleton';
import { ItemListItem } from './item-list-item/ItemListItem';

type ItemListSectionProps = {
  className?: string;
};
export const ItemListSection = ({ className }: ItemListSectionProps) => {
  const [loading, setLoading] = useState(true);
  const { data: items } = trpc.items.getListItems.useQuery(undefined, {
    onSuccess: () => setLoading(false)
  });

  return (
    <section className={clsxm('flex flex-col', className)}>
      <ItemListFilterPanel sectionName="Item List" />
      <div className="z-10 my-6 flex flex-col gap-6">
        {loading ? (
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
