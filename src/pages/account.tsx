import React from 'react';
import Box from '../components/box/Box';
import RoundedBox from '../components/box/RoundedBox';
import HistoryItem from '../components/history-item/HistoryItem';
import { SvgIcon } from '../components/icons/SvgIcon';
import OrderHistorySection from '../components/order-history-section/OrderHistorySection';
import { BodyText, Bold, LargeBodyText } from '../components/typography/Typography';
import UserAccountBox from '../components/user-account-box/UserAcountBox';

const account = () => {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <UserAccountBox />
      <OrderHistorySection />
    </div>
  );
};

export default account;
