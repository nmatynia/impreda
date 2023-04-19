import React from 'react';
import { inferProcedureOutput } from '@trpc/server/dist/core/types';
import { ItemContainer } from '../items-container/ItemContainer';
import { ItemsRouter } from '../../server/trpc/router/_app';
import { ItemCard } from '../item-card/ItemCard';
import { NotFound } from '../not-found/NotFound';
import { ItemsCardsSkeleton } from '../skeletons/ItemsCardsSkeleton';

type ItemCardSectionProps = {
  isLoading: boolean;
  items: inferProcedureOutput<ItemsRouter['getItems']> | undefined;
};
const ItemCardSection = ({ isLoading, items }: ItemCardSectionProps) => {
  return (
    <ItemContainer>
      <ItemContainerContent isLoading={isLoading} items={items} />
    </ItemContainer>
  );
};

export default ItemCardSection;

export const ItemContainerContent = ({
  isLoading,
  items
}: {
  isLoading: boolean;
  items: inferProcedureOutput<ItemsRouter['getItems']> | undefined;
}) => {
  if (isLoading) {
    return <ItemsCardsSkeleton />;
  }

  if (!items || items.length === 0) {
    return (
      <NotFound
        title="We couldn't find any item that you're looking for."
        subtitle="Explore our exquisite selection products and find something equally special."
      />
    );
  }

  return (
    <>
      {items.map(item => (
        <ItemCard {...item} key={item.id} />
      ))}
    </>
  );
};
