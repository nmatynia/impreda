import React from 'react';
import clsxm from '../../utils/clsxm';
import RoundedBox from '../box/RoundedBox';
import HistoryBundle from '../history-bundle/HistoryBundle';
import HistoryItem from '../history-item/HistoryItem';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';

//TODO: Consider saving total in the database instead of calculating it every time on client
//TODO: Possibly display itemDesigner as well
export type OrderType = {
  items: {
    itemName: string;
    itemPrice: number;
  }[];
  date: string;
  buyer: string;
};

const orderHistory: OrderType[] = [
  {
    items: [{ itemName: 'Balenciaga Jacket', itemPrice: 700 }],
    date: '2021-10-10',
    buyer: 'John Doe'
  },
  {
    items: [{ itemName: 'Vetements T-shirt', itemPrice: 300 }],
    date: '2021-10-10',
    buyer: 'John Doe'
  },
  {
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
const OrderHistorySection = ({ className }: OrderHistorySectionProps) => {
  return (
    <section className={clsxm('flex flex-col', className)}>
      <RoundedBox className="mt-16 flex w-full items-center justify-between">
        <LargeBodyText>Order History</LargeBodyText>
        <button className="cursor-pointer">
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </button>
      </RoundedBox>
      <div className="my-6 flex flex-col gap-6">
        {orderHistory.map((order, idx) => {
          if (order.items.length === 1) {
            return <HistoryItem key={`order-${idx}`} order={order} />;
          } else {
            return <HistoryBundle key={`order-${idx}`} order={order} />;
          }
        })}
      </div>
    </section>
  );
};

export default OrderHistorySection;
