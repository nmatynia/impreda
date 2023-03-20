import React from 'react';
import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import type { OrderType } from '../order-history-section/OrderHistorySection';
import { BodyText } from '../typography/Typography';

type HistoryItemProps = {
  order: OrderType;
  showBuyer?: boolean;
  className?: string;
};

export const HistoryItem = ({ order, showBuyer = false, className }: HistoryItemProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'flex w-full items-center justify-between',
        'bg-primaryBlack py-5 text-primaryWhite',
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <BodyText>{order.items[0]?.itemName}</BodyText>
        <div className="flex gap-4 whitespace-pre sm:gap-24">
          <BodyText>Price: {order.items[0]?.itemPrice}£</BodyText>
          <BodyText>Date: {order.date}</BodyText>
          {showBuyer && <BodyText>Buyer: {order.buyer}</BodyText>}
        </div>
      </div>
      <button className="cursor-pointer">
        <SvgIcon name="Eye" className="ml-2 fill-primaryWhite" />
      </button>
    </RoundedBox>
  );
};
