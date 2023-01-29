import { Transition } from '@headlessui/react';
import React, { useMemo } from 'react';
import clsxm from '../../utils/clsxm';
import RoundedBox from '../box/RoundedBox';
import HistoryItem from '../history-item/HistoryItem';
import { SvgIcon } from '../icons/SvgIcon';
import { OrderType } from '../order-history-section/OrderHistorySection';
import { BodyText, SmallBodyText } from '../typography/Typography';

type HistoryBundleProps = {
  order: OrderType;
  showBuyer?: boolean;
  className?: string;
};
const HistoryBundle = ({ order, showBuyer, className }: HistoryBundleProps) => {
  const [open, setOpen] = React.useState(false);
  const handleExpandBundle = () => {
    setOpen(!open);
  };
  const bundleName = useMemo(
    () => `Bundle: ${order.items[0]?.itemName} and ${order.items.length} more`,
    [order]
  );

  //TODO: Consider making this logic on backend
  const total = useMemo(() => order.items.reduce((acc, item) => acc + item.itemPrice, 0), [order]);

  return (
    <div>
      <RoundedBox
        className={clsxm(
          'flex w-full items-center justify-between',
          'mb-6 bg-primaryBlack py-5 text-primaryWhite',
          className
        )}
      >
        <div className="flex flex-col gap-3">
          <BodyText>{bundleName}</BodyText>
          <div className="flex gap-4 sm:gap-24">
            <SmallBodyText>Price: {total}£</SmallBodyText>
            <SmallBodyText>Items: {order.items.length}</SmallBodyText>
            <SmallBodyText>
              Date: <span className="whitespace-pre">{order.date}</span>
            </SmallBodyText>
            {showBuyer && <SmallBodyText>Buyer: {order.buyer}</SmallBodyText>}
          </div>
        </div>
        <div className="ml-2 flex gap-2">
          <button className="cursor-pointer">
            <SvgIcon name="Eye" className="fill-primaryWhite" />
          </button>
          <button
            className={clsxm(
              'transform cursor-pointer transition-transform duration-500 ease-in-out',
              open && 'rotate-180'
            )}
            onClick={handleExpandBundle}
          >
            <SvgIcon name="CaretDown" className="fill-primaryWhite" />
          </button>
        </div>
      </RoundedBox>
      <Transition
        style={{ direction: 'rtl' }}
        className="flex flex-col overflow-y-auto"
        show={open}
        enter="transition-all duration-1000"
        enterFrom="opacity-0 max-h-0"
        enterTo={`opacity-100 translate-y-0 max-h-[600px]`}
        leave="transition-all duration-1000"
        leaveFrom="opacity-100 translate-y-0 max-h-[600px]"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="flex flex-col gap-6" style={{ direction: 'ltr' }}>
          {order.items.map(item => {
            const itemOrder = {
              ...order,
              items: [item]
            };
            return <HistoryItem order={itemOrder} className="ml-auto w-[90%]" />;
          })}
        </div>
      </Transition>
    </div>
  );
};

export default HistoryBundle;
