import React from 'react';
import Box from '../components/box/Box';
import RoundedBox from '../components/box/RoundedBox';
import HistoryItem from '../components/history-item/HistoryItem';
import { SvgIcon } from '../components/icons/SvgIcon';
import { BodyText, Bold, LargeBodyText } from '../components/typography/Typography';
import UserAccountBox from '../components/user-account-box/UserAcountBox';

//TODO: Consider saving total in the database instead of calculating it every time on client
export type OrderType = {
  items: {
    itemName: string;
    itemPrice: number;
  }[];
  date: string;
};

const orderHistory: OrderType[] = [
  {
    items: [{ itemName: 'Balenciaga Jacket', itemPrice: 700 }],
    date: '2021-10-10'
  },
  {
    items: [{ itemName: 'Vetements T-shirt', itemPrice: 300 }],
    date: '2021-10-10'
  },
  {
    items: [
      { itemName: 'Vetements T-shirt', itemPrice: 300 },
      { itemName: 'Balenciaga Jacket', itemPrice: 700 }
    ],
    date: '2021-10-10'
  }
];

const account = () => {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <UserAccountBox />
      <RoundedBox className="mt-16 flex w-full items-center justify-between">
        <LargeBodyText>Order History</LargeBodyText>
        <button className="cursor-pointer">
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </button>
      </RoundedBox>
      <div className="mt-6 flex flex-col gap-6">
        {orderHistory.map((order, idx) => {
          return order.items.length < 2 && <HistoryItem key={`order-${idx}`} order={order} />;
        })}
      </div>
    </div>
  );
};

export default account;
