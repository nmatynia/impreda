import React from 'react';
import clsxm from '../../utils/clsxm';
import { FilterPanel } from '../filter-panel/FilterPanel';
import { HistoryBundle } from './history-bundle/HistoryBundle';
import { HistoryItem } from './history-item/HistoryItem';
import { trpc } from '../../utils/trpc';

// TODO: Consider saving total in the database instead of calculating it every time on client
type OrderHistorySectionProps = {
  className?: string;
};
export const OrderHistorySection = ({ className }: OrderHistorySectionProps) => {
  const { data: orders } = trpc.order.getCurrentUserOrders.useQuery();
  console.log(orders);
  return (
    <section className={clsxm('flex flex-col', className)}>
      <FilterPanel sectionName="Order History" />
      <div className="z-10 my-6 flex flex-col gap-6">
        {orders?.map(order => {
          if (order.items.length === 1) {
            return <HistoryItem key={`order-${order.id}`} order={order} />;
          }
          return <HistoryBundle key={`order-${order.id}`} order={order} />;
        })}
      </div>
    </section>
  );
};
