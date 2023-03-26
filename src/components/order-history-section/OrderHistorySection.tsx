import React from 'react';
import clsxm from '../../utils/clsxm';
import { FilterPanel } from '../filter-panel/FilterPanel';
import { HistoryBundle } from '../history-bundle/HistoryBundle';
import { HistoryItem } from '../history-item/HistoryItem';

// TODO: Consider saving total in the database instead of calculating it every time on client
// TODO: Possibly display itemDesigner as well
export type OrderType = {
  id: string;
  items: {
    itemName: string;
    itemPrice: number;
  }[];
  date: string;
  buyer: string;
};

const orderHistory: OrderType[] = [
  {
    id: '21',
    items: [{ itemName: 'Balenciaga Jacket', itemPrice: 700 }],
    date: '2021-10-10',
    buyer: 'John Doe'
  },
  {
    id: '123',
    items: [{ itemName: 'Vetements T-shirt', itemPrice: 300 }],
    date: '2021-10-10',
    buyer: 'John Doe'
  },
  {
    id: '231',
    items: [
      { itemName: 'Vetements T-shirt', itemPrice: 300 },
      { itemName: 'Balenciaga Jacket', itemPrice: 700 },
      { itemName: 'Vetements T-shirt', itemPrice: 300 },
      { itemName: 'Balenciaga Jacket', itemPrice: 700 },
      { itemName: 'Vetements T-shirt', itemPrice: 300 },
      { itemName: 'Balenciaga Jacket', itemPrice: 700 }
    ],
    date: '2021-10-10',
    buyer: 'James Charles'
  }
];

type OrderHistorySectionProps = {
  className?: string;
};
export const OrderHistorySection = ({ className }: OrderHistorySectionProps) => {
  return (
    <section className={clsxm('flex flex-col', className)}>
      <FilterPanel sectionName="Order History" />
      <div className="z-10 my-6 flex flex-col gap-6">
        {orderHistory.map(order => {
          if (order.items.length === 1) {
            return <HistoryItem key={`order-${order.id}`} order={order} />;
          }
          return <HistoryBundle key={`order-${order.id}`} order={order} />;
        })}
      </div>
    </section>
  );
};
