import React, { useMemo } from 'react';
import clsxm from '../../utils/clsxm';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { OrderType } from '../order-history-section/OrderHistorySection';
import { BodyText } from '../typography/Typography';

type HistoryBundleProps = {
  order: OrderType;
  showBuyer?: boolean;
  className?: string;
};
const HistoryBundle = ({ order, showBuyer, className }: HistoryBundleProps) => {
  const bundleName = useMemo(
    () => `Bundle: ${order.items[0]?.itemName} and ${order.items.length} more`,
    [order]
  );
  return (
    <>
      <RoundedBox
        className={clsxm(
          'flex w-full items-center justify-between',
          'bg-primaryBlack py-5 text-primaryWhite',
          className
        )}
      >
        <div className="flex flex-col gap-3">
          <BodyText>{bundleName}</BodyText>
          <div className="flex gap-24">
            <BodyText>Price: {order.items[0]?.itemPrice}</BodyText>
            <BodyText>Items: {order.items.length}</BodyText>
            <BodyText>Date: {order.date}</BodyText>
            {showBuyer && <BodyText>Buyer: {order.buyer}</BodyText>}
          </div>
        </div>
        <button className="flex cursor-pointer gap-2">
          <SvgIcon name="Eye" className="fill-primaryWhite" />
          <SvgIcon name="CaretDown" className="fill-primaryWhite" />
        </button>
      </RoundedBox>
    </>
  );
};

export default HistoryBundle;
