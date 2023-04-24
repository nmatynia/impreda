import React from 'react';
import { inferProcedureOutput } from '@trpc/server';
import clsxm from '../../utils/clsxm';
import { FilterPanel } from '../filter-panel/FilterPanel';
import { HistoryBundle } from './history-bundle/HistoryBundle';
import { HistoryItem } from './history-item/HistoryItem';
import { NotFound } from '../not-found/NotFound';
import { ListSkeleton } from '../skeletons/ListSkeleton';
import { OrderRouter } from '../../server/trpc/router/_app';

type Orders = inferProcedureOutput<OrderRouter['getAllOrders']> | undefined;
type OrderHistorySectionProps = {
  orders?: Orders;
  isLoading: boolean;
  className?: string;
};

export const OrderHistorySection = ({ className, orders, isLoading }: OrderHistorySectionProps) => {
  return (
    <section className={clsxm('flex flex-col', className)}>
      <FilterPanel sectionName="Order History" />
      <OrderHistoryContent orders={orders} isLoading={isLoading} />
    </section>
  );
};

const OrderHistoryContent = ({ isLoading, orders }: { isLoading: boolean; orders: Orders }) => {
  if (isLoading) {
    return <ListSkeleton />;
  }
  if (!orders) {
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
    <div className="z-10 my-6 flex flex-col gap-6">
      {orders?.map(order => {
        if (order.items.length === 1) {
          return <HistoryItem key={`order-${order.id}`} order={order} />;
        }
        return <HistoryBundle key={`order-${order.id}`} order={order} />;
      })}
    </div>
  );
};
