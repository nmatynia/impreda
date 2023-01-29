import React from 'react';
import clsxm from '../../utils/clsxm';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { OrderType } from '../order-history-section/OrderHistorySection';
import { BodyText, SmallBodyText } from '../typography/Typography';

type HistoryItemProps = {
  order: OrderType;
  showBuyer?: boolean;
  className?: string;
};

const HistoryItem = ({ order, showBuyer = false, className }: HistoryItemProps) => {
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
          <SmallBodyText>Price: {order.items[0]?.itemPrice}£</SmallBodyText>
          <SmallBodyText>Date: {order.date}</SmallBodyText>
          {showBuyer && <SmallBodyText>Buyer: {order.buyer}</SmallBodyText>}
        </div>
      </div>
      <button className="cursor-pointer">
        <SvgIcon name="Eye" className="ml-2 fill-primaryWhite" />
      </button>
    </RoundedBox>
  );
};

export default HistoryItem;
