import React from 'react';
import OrderHistorySection from '../components/order-history-section/OrderHistorySection';
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
