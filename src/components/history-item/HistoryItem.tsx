import React from 'react';
import { OrderType } from '../../pages/account';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';
type HistoryItemProps = {
  order: OrderType;
};
const HistoryItem = ({ order }: HistoryItemProps) => {
  return (
    <div>
      <RoundedBox className="flex w-full items-center justify-between bg-primaryBlack text-primaryWhite">
        <div className="flex flex-col">
          <BodyText>{order.items[0]?.itemName}</BodyText>
          <div className="flex gap-24">
            <BodyText>Price: {order.items[0]?.itemPrice}</BodyText>
            <BodyText>Date: {order.date}</BodyText>
          </div>
        </div>
        <SvgIcon name="Eye" className="fill-primaryWhite" />
      </RoundedBox>
    </div>
  );
};

export default HistoryItem;
