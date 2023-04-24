import React from 'react';
import { inferProcedureOutput } from '@trpc/server/dist/core/types';
import clsxm from '../../utils/clsxm';
import { ItemListFilterPanel } from '../filter-panel/ItemListFilterPanel';
import { ItemListItem } from './item-list-item/ItemListItem';
import { ItemsRouter } from '../../server/trpc/router/_app';
import { NotFound } from '../not-found/NotFound';
import { ListSkeleton } from '../skeletons/ListSkeleton';

type Items = inferProcedureOutput<ItemsRouter['getListItems']> | undefined;
type ItemListSectionProps = {
  items: Items;
  isLoading: boolean;
  className?: string;
};
export const ItemListSection = ({ items, isLoading, className }: ItemListSectionProps) => {
  return (
    <section className={clsxm('flex flex-col', className)}>
      <ItemListFilterPanel sectionName="Item List" />
      <ItemListContent items={items} isLoading={isLoading} />
    </section>
  );
};

const ItemListContent = ({ isLoading, items }: { isLoading: boolean; items: Items }) => {
  if (isLoading) {
    return <ListSkeleton />;
  }
  if (!items) {
    return (
      <div className="z-10 my-6 flex flex-col gap-6">
        <NotFound
          className="max-w-lg"
          title="The item list is empty"
          subtitle="It seems like no items have been added yet."
        />
      </div>
    );
  }
  return (
    <div className="z-10 my-6 flex max-h-[29rem] flex-col gap-6 overflow-y-auto">
      {items.map(item => {
        return <ItemListItem item={item} key={`item-${item.id}`} />;
      })}
    </div>
  );
};
