import React from 'react';
import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import type { OrderType } from '../order-history-section/OrderHistorySection';
import { BodyText } from '../typography/Typography';

type HistoryItemProps = {
  order: OrderType;
  showBuyer?: boolean;
  showDate?: boolean;
  className?: string;
};

export const HistoryItem = ({
  order,
  showBuyer = false,
  showDate = true,
  className
}: HistoryItemProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'flex w-full items-center justify-between',
        'bg-primaryBlack py-5 text-primaryWhite',
        className
      )}
    >
      <div className="flex w-[calc(100%-28px)] basis-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <SvgIcon name="Box" className="w-3 flex-shrink-0 fill-primaryWhite sm:w-4" />
          <BodyText className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
            {order.items[0]?.itemName}
          </BodyText>
        </div>

        <div className="grid grid-cols-2 whitespace-pre xs:grid-cols-3">
          <BodyText>Price: {order.items[0]?.itemPrice}£</BodyText>
          {showDate && <BodyText>Date: {order.date}</BodyText>}
          {showBuyer && <BodyText>Buyer: {order.buyer}</BodyText>}
        </div>
      </div>
      <button type="button" className="cursor-pointer">
        <SvgIcon name="Eye" className="ml-2 fill-primaryWhite" />
      </button>
    </RoundedBox>
  );
};
